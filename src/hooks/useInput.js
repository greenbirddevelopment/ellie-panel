import { useReducer } from "react";
import validator from "validator";
import { isValidPhoneNumber } from "libphonenumber-js";

const reducer = (state, action) => {
  const { type, name, payload } = action;
  switch (type) {
    case "onChange": {
      switch (name) {
        // * User operations
        case "firstname":
        case "lastname": {
          return {
            value: `${payload.slice(0, 1).toUpperCase()}${payload
              .slice(1)
              .toLowerCase()}`.replaceAll(/[0-9]/g, ""),
            isValid: payload.length >= 2 && payload.length <= 16,
          };
        }

        case "username": {
          return {
            value: payload.toLowerCase().trim(),
            isValid: payload.length >= 2 && payload.length <= 16,
          };
        }

        case "admin-username": {
          return {
            value: payload.toLowerCase().trim(),
            isValid: payload.length >= 16 && payload.length <= 48,
          };
        }

        case "email": {
          return {
            value: payload.toLowerCase().trim(),
            isValid: validator.isEmail(payload),
          };
        }

        case "password": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 8 && payload.length <= 32,
          };
        }

        case "admin-password": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 16 && payload.length <= 48,
          };
        }

        case "confirmPassword": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 8 && payload.length <= 32,
          };
        }

        case "phone": {
          return {
            value: payload.value,
            isValid: isValidPhoneNumber(payload.value, payload.countryCode),
          };
        }

        // * House operations
        case "house": {
          return {
            value: payload,
            isValid: payload.length >= 2 && payload.length <= 48,
          };
        }

        case "country": {
          return {
            value: payload,
            isValid: payload !== "",
          };
        }

        case "region": {
          return {
            value: payload,
            isValid: payload !== "",
          };
        }

        case "province": {
          return {
            value: `${payload.slice(0, 1).toUpperCase()}${payload
              .slice(1)
              .toLowerCase()}`,
          };
        }

        // * NativeBackend operations
        case "raspberrypiId": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "device": {
          return {
            value: payload,
            isValid: payload !== "",
          };
        }

        case "bridge-id": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "hue-application-key": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "lightId": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "shelly-api-key": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "shelly-device-id": {
          return {
            value: payload,
            isValid: payload.length >= 1,
          };
        }

        case "sensibo-api-key": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "sensibo-device-id": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }

        case "location": {
          return {
            value: payload,
            isValid: payload !== "",
          };
        }

        default:
          return {
            value: payload,
          };
      }
    }

    case "onBlur": {
      switch (name) {
        // * User operations
        case "firstname":
        case "lastname": {
          return {
            ...state,
            isError: !state.isValid,
            message:
              !state.isValid &&
              `${name.slice(0, 1).toUpperCase()}${name
                .slice(1)
                .toLowerCase()} must be 2 characters at least`,
          };
        }

        case "username": {
          return {
            ...state,
            isError: !state.isValid,
            message:
              !state.isValid && "@username must be between 2 and 16 characters",
          };
        }

        case "email": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Invalid email address",
          };
        }

        case "phone": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Invalid phone number",
          };
        }

        case "password": {
          return {
            ...state,
            isError: !state.isValid,
            message:
              !state.isValid && "Password must be between 8 and 32 characters",
          };
        }

        case "confirmPassword": {
          return {
            ...state,
            isError: !state.isValid,
            message: "Please confirm your password.",
          };
        }

        // * House operations
        case "house": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Invalid house name",
          };
        }

        // * NativeBackend operations
        case "raspberrypiId": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Raspberry PI Id must be 24 characters",
          };
        }

        case "bridge-id": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Bridge Id must be 16 characters",
          };
        }

        case "hue-application-key": {
          return {
            ...state,
            isError: !state.isValid,
            message:
              !state.isValid && "Hue Application Key must be 40 characters",
          };
        }

        case "lightId": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Light Id must be 36 characters",
          };
        }

        case "shelly-api-key": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Shelly API Key must be 64 characters",
          };
        }

        case "shelly-device-id": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Shelly device Id must be 12 characters",
          };
        }

        case "sensibo-api-key": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Sensibo Api Key must be 30 characters",
          };
        }

        case "sensibo-device-id": {
          return {
            ...state,
            isError: !state.isValid,
            message: !state.isValid && "Sensibo Device Id must be 8 characters",
          };
        }

        default: {
          return {
            ...state,
            isError: false,
            message: "",
          };
        }
      }
    }

    default: {
      throw new Error(`Unknown action type: ${type}`);
    }
  }
};

const initialState = {
  value: "",
  isValid: null,
  isError: null,
  message: "",
};

const useInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "onChange", name, payload: value });
  };

  const handlePhoneOnChange = (a, b, c, d) =>
    dispatch({
      type: "onChange",
      name: "phone",
      payload: { value: d, countryCode: b.countryCode },
    });

  const handleCountryOnChange = (value) =>
    dispatch({ type: "onChange", name: "country", payload: value });

  const handleRegionOnChange = (value) =>
    dispatch({ type: "onChange", name: "region", payload: value });

  const handleOnBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: "onBlur", name });
  };

  return {
    state,
    handleOnChange,
    handlePhoneOnChange,
    handleCountryOnChange,
    handleRegionOnChange,
    handleOnBlur,
  };
};

export default useInput;
