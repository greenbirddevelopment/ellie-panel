import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import useInput from "../../../hooks/useInput";

const Hue = ({ setHue, handleClearSelectedDevice }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    state: {
      value: bridgeId,
      isValid: isBridgeIdValid,
      isError: isBridgeIdError,
      message: bridgeIdErrorMessage,
    },
    handleOnChange: bridgeIdOnChange,
    handleOnBlur: bridgeIdOnBlur,
  } = useInput();

  const {
    state: {
      value: hueApplicationKey,
      isValid: isHueApplicationKeyValid,
      isError: isHueApplicationKeyError,
      message: hueApplicationKeyErrorMessage,
    },
    handleOnChange: hueApplicationKeyOnChange,
    handleOnBlur: hueApplicationKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: lightId,
      isValid: isLightIdValid,
      isError: isLightIdError,
      message: lightIdErrorMessage,
    },
    handleOnChange: lightIdOnChange,
    handleOnBlur: lightIdOnBlur,
  } = useInput();

  const {
    state: { value: location, isValid: isLocationValid },
    handleOnChange: locationOnChange,
  } = useInput();

  const handleCreateHue = () => {
    setHue((prevState) => ({
      ...prevState,
      bridges: [
        ...prevState.bridges,
        {
          id: bridgeId,
          ip: "192.168.0.105",
          hueApplicationKey,
        },
      ],
      lights: [
        ...prevState.lights,
        {
          id: lightId,
          bridgeId: bridgeId,
          location: location,
        },
      ],
    }));

    handleClearSelectedDevice();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(
        isBridgeIdValid &&
          isHueApplicationKeyValid &&
          isLightIdValid &&
          isLocationValid
      );
    }, 100);

    return () => clearTimeout(identifier);
  }, [
    isBridgeIdValid,
    isHueApplicationKeyValid,
    isLightIdValid,
    isLocationValid,
  ]);

  return (
    <>
      <div className="mb-4">
        <Input
          type={"text"}
          name={"bridge-id"}
          placeholder={"Bridge Id"}
          label={"Bridge Id"}
          value={bridgeId}
          onChange={bridgeIdOnChange}
          onBlur={bridgeIdOnBlur}
          isValid={isBridgeIdError}
        />
        {isBridgeIdError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{bridgeIdErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name={"hue-application-key"}
          placeholder={"Hue Application Key"}
          label={"Hue Application Key"}
          value={hueApplicationKey}
          onChange={hueApplicationKeyOnChange}
          onBlur={hueApplicationKeyOnBlur}
          isValid={isHueApplicationKeyError}
        />
        {isHueApplicationKeyError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{hueApplicationKeyErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name={"lightId"}
          placeholder={"Light Id"}
          label={"Light Id"}
          value={lightId}
          onChange={lightIdOnChange}
          onBlur={lightIdOnBlur}
          isValid={isLightIdError}
        />
        {isLightIdError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{lightIdErrorMessage}</span>
          </p>
        )}
      </div>

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

      <Button
        type={"button"}
        variant={"primary"}
        onClick={handleCreateHue}
        disabled={!isFormValid}
      >
        Add
      </Button>
    </>
  );
};

export default Hue;
