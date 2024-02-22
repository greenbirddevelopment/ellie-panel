import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInput from "../../../hooks/useInput";
import Input from "../../ui/Input";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";

const Sensibo = ({ setSensibo, handleClearSelectedDevice }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    state: {
      value: sensiboApiKey,
      isValid: isSensiboApiKeyValid,
      isError: isSensiboApiKeyError,
      message: sensiboApiKeyErrorMessage,
    },
    handleOnChange: sensiboApiKeyOnChange,
    handleOnBlur: sensiboApiKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: sensiboDeviceId,
      isValid: isSensiboDeviceIdValid,
      isError: isSensiboDeviceIdError,
      message: sensiboDeviceIdErrorMessage,
    },
    handleOnChange: sensiboDeviceIdOnChange,
    handleOnBlur: sensiboDeviceIdOnBlur,
  } = useInput();

  const {
    state: { value: location, isValid: isLocationValid },
    handleOnChange: locationOnChange,
  } = useInput();

  const handleCreateSensibo = () => {
    setSensibo((prevState) => ({
      ...prevState,
      apiKey: sensiboApiKey,
      devices: [
        ...prevState.devices,
        {
          location,
          id: sensiboDeviceId,
        },
      ],
    }));

    handleClearSelectedDevice();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(
        isSensiboApiKeyValid && isSensiboDeviceIdValid && isLocationValid
      );
    }, 100);

    return () => clearTimeout(identifier);
  }, [isSensiboApiKeyValid, isSensiboDeviceIdValid, isLocationValid]);

  return (
    <>
      <div className="mb-4">
        <Input
          type={"text"}
          name={"sensibo-api-key"}
          placeholder={"Sensibo API Key"}
          label={"Sensibo API Key"}
          value={sensiboApiKey}
          onChange={sensiboApiKeyOnChange}
          onBlur={sensiboApiKeyOnBlur}
          isValid={isSensiboApiKeyError}
        />
        {isSensiboApiKeyError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{sensiboApiKeyErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name={"sensibo-device-id"}
          placeholder={"Sensibo Device Id"}
          label={"Sensibo Device Id"}
          value={sensiboDeviceId}
          onChange={sensiboDeviceIdOnChange}
          onBlur={sensiboDeviceIdOnBlur}
          isValid={isSensiboDeviceIdError}
        />
        {isSensiboDeviceIdError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{sensiboDeviceIdErrorMessage}</span>
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
        onClick={handleCreateSensibo}
        disabled={!isFormValid}
      >
        Add
      </Button>
    </>
  );
};

export default Sensibo;
