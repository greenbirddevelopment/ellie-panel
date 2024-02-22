import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import useInput from "../../../hooks/useInput";

const Shelly = ({ setShelly, handleClearSelectedDevice }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    state: {
      value: shellyApiKey,
      isValid: isShellyApiKeyValid,
      isError: isShellyApiKeyError,
      message: shellyApiKeyErrorMessage,
    },
    handleOnChange: shellyApiKeyOnChange,
    handleOnBlur: shellyApiKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: shellyDeviceId,
      isValid: isShellyDeviceIdValid,
      isError: isShellyDeviceIdError,
      message: shellyDeviceIdErrorMessage,
    },
    handleOnChange: shellyDeviceIdOnChange,
    handleOnBlur: shellyDeviceIdOnBlur,
  } = useInput();

  const {
    state: { value: location, isValid: isLocationValid },
    handleOnChange: locationOnChange,
  } = useInput();

  const handleCreateShelly = () => {
    setShelly((prevState) => ({
      ...prevState,
      apiKey: shellyApiKey,
      devices: [
        ...prevState.devices,
        {
          location,
          name: "Smart Plug",
          online: false,
          deviceId: shellyDeviceId,
        },
      ],
    }));

    handleClearSelectedDevice();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(
        isShellyApiKeyValid && isShellyDeviceIdValid && isLocationValid
      );
    }, 100);

    return () => clearTimeout(identifier);
  }, [isShellyApiKeyValid, isShellyDeviceIdValid, isLocationValid]);

  return (
    <>
      <div className="mb-4">
        <Input
          type={"text"}
          name={"shelly-api-key"}
          placeholder={"Shelly API Key"}
          label={"Shelly API Key"}
          value={shellyApiKey}
          onChange={shellyApiKeyOnChange}
          onBlur={shellyApiKeyOnBlur}
          isValid={isShellyApiKeyError}
        />
        {isShellyApiKeyError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{shellyApiKeyErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name={"shelly-device-id"}
          placeholder={"Shelly Device Id"}
          label={"Shelly Device Id"}
          value={shellyDeviceId}
          onChange={shellyDeviceIdOnChange}
          onBlur={shellyDeviceIdOnBlur}
          isValid={isShellyDeviceIdError}
        />
        {isShellyDeviceIdError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{shellyDeviceIdErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="mb-4">
          <select
            name="location"
            value={location}
            onChange={locationOnChange}
            className="form-select w-full border rounded border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition"
          >
            <option value={""}>Select Location</option>
            <option value={"living_room"}>Living Room</option>
            <option value={"bedroom"}>Bedroom</option>
            <option value={"bathroom"}>Bathroom</option>
            <option value={"kitchen"}>Kitchen</option>
          </select>
        </div>
      </div>

      <Button
        type={"button"}
        variant={"primary"}
        onClick={handleCreateShelly}
        disabled={!isFormValid}
      >
        Add
      </Button>
    </>
  );
};

export default Shelly;
