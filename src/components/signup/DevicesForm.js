import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Hue from "./devices/Hue";
import Shelly from "./devices/Shelly";
import Sensibo from "./devices/Sensibo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import HttpRequest from "../../utils/HttpRequest";
import useInput from "../../hooks/useInput";

// ? Checking Raspberry PI will be implemented

const DevicesForm = ({
  handlePreviousFormStage,
  handleCreateNativeBackend,
  handleNextFormStage,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  // const [selectedDevice, setSelectedDevice] = useState("");
  const [device, setDevice] = useState("");
  const [isDeviceValid, setIsDeviceValid] = useState(false);

  const [hue, setHue] = useState({
    bridges: [],
    lights: [],
  });

  const [sensibo, setSensibo] = useState({
    apiKey: null,
    devices: [],
  });

  const [shelly, setShelly] = useState({
    apiKey: null,
    devices: [],
  });

  const {
    state: {
      value: raspberrypiId,
      isValid: isRaspberrypiIdValid,
      isError: isRaspberrypiIdError,
      message: raspberrypiIdErrorMessage,
    },
    handleOnChange: raspberrypiIdOnChange,
    handleOnBlur: raspberrypiIdOnBlur,
  } = useInput();

  const handleDeviceOnChange = (e) => {
    setDevice(e.target.value);
    setIsDeviceValid(e.target.value !== "");
  };

  const handleClearSelectedDevice = () => setDevice("");

  const { data: checkRasppberry } = useQuery({
    queryKey: ["checkRasppberry", raspberrypiId],
    queryFn: () => {
      if (isRaspberrypiIdValid)
        return new HttpRequest("cloud").get(
          `setup/checkRasppberry/${raspberrypiId}`
        );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateNativeBackend({
      raspberrypiId,
      serverIp: "192.168.2.2",
      serverPort: 3001,
      hue,
      sensibo,
      shelly,
    });

    handleNextFormStage();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(
        isRaspberrypiIdValid &&
          ((hue.bridges.length !== 0 && hue.lights.length !== 0) ||
            (sensibo.apiKey && sensibo.devices.length !== 0) ||
            (shelly.apiKey && shelly.devices.length !== 0))
      );
    }, 100);

    return () => clearTimeout(identifier);
  }, [isRaspberrypiIdValid, isDeviceValid, hue, sensibo, shelly]);

  return (
    <form className="px-1" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-gray-600 font-bold mb-6">
        Finally, add smart devices
      </h1>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"raspberrypiId"}
          placeholder={"Raspberry PI Id"}
          label={"Raspberry PI Id"}
          value={raspberrypiId}
          onChange={raspberrypiIdOnChange}
          onBlur={raspberrypiIdOnBlur}
          isValid={isRaspberrypiIdError}
        />
        {isRaspberrypiIdError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{raspberrypiIdErrorMessage}</span>
          </p>
        )}
        {checkRasppberry?.status === "fail" && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{checkRasppberry.message}</span>
          </p>
        )}
      </div>

      <div className="mb-0">
        <select
          name="device"
          value={device}
          onChange={handleDeviceOnChange}
          className="form-select w-full border rounded border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition mb-4"
        >
          <option value={""}>Select Smart Device</option>
          <option value={"hue"}>Hue</option>
          <option value={"sensibo"}>Sensibo</option>
          <option value={"shelly"}>Shelly</option>
        </select>
      </div>

      <div className="mb-6">
        {device === "hue" && (
          <Hue
            setHue={setHue}
            handleClearSelectedDevice={handleClearSelectedDevice}
          />
        )}

        {device === "shelly" && (
          <Shelly
            setShelly={setShelly}
            handleClearSelectedDevice={handleClearSelectedDevice}
          />
        )}

        {device === "sensibo" && (
          <Sensibo
            setSensibo={setSensibo}
            handleClearSelectedDevice={handleClearSelectedDevice}
          />
        )}
      </div>

      <Button
        type={"button"}
        variant={"dark"}
        className={"w-full py-4 mb-3"}
        onClick={handlePreviousFormStage}
      >
        Go back
      </Button>

      <Button
        type={"submit"}
        variant={"primary"}
        className={"w-full py-4"}
        disabled={!isFormValid || checkRasppberry?.status === "fail"}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </form>
  );
};

export default DevicesForm;
