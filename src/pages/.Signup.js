import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Form, useNavigate, useHistory } from "react-router-dom";
import Input from "../components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AccordionList from "../components/ui/Accordion";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useSelector } from "react-redux";
import HttpRequest from "../utils/HttpRequest";
import { motion } from "framer-motion";

const AlertBox = ({ message, color }) => {
  return (
    <div
      className={`alert fixed top-0 left-0 w-full border text-white px-4 py-3 ${color}`}
      role="alert"
    >
      <strong className="font-bold">Info! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

const SignupPage = () => {
  // const handleNavigate = (route) => navigate(route);
  const currentUserState = useSelector((state) => state.currentUser);
  const [isFormValid, setIsFormValid] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [ipAddress, setIPAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const { currentUser } = currentUserState;

  const {
    state: {
      value: firstname,
      isValid: isFirstnameValid,
      isError: isFirstnameError,
      message: firstnameErrorMessage,
    },
    handleOnChange: firstnameOnChange,
    handleOnBlur: firstnameOnBlur,
  } = useInput();

  const {
    state: {
      value: lastname,
      isValid: isLastnameValid,
      isError: isLastnameError,
      message: lastnameErrorMessage,
    },
    handleOnChange: lastnameOnChange,
    handleOnBlur: lastnameOnBlur,
  } = useInput();

  const {
    state: {
      value: username,
      isValid: isUsernameValid,
      isError: isUsernameError,
      message: usernameErrorMessage,
    },
    handleOnChange: usernameOnChange,
    handleOnBlur: usernameOnBlur,
  } = useInput();

  const {
    state: {
      value: email,
      isValid: isEmailValid,
      isError: isEmailError,
      message: emailErrorMessage,
    },
    handleOnChange: emailOnChange,
    handleOnBlur: emailOnBlur,
  } = useInput();

  const {
    state: {
      value: password,
      isValid: isPasswordValid,
      isError: isPasswordError,
      message: passwordErrorMessage,
    },
    handleOnChange: passwordOnChange,
    handleOnBlur: passwordOnBlur,
  } = useInput();

  const {
    state: {
      value: confirmPassword,
      isValid: isConfirmPasswordValid,
      isError: isConfirmPasswordError,
      message: confirmPasswordErrorMessage,
    },
    handleOnChange: confirmPasswordOnChange,
    handleOnBlur: confirmPasswordOnBlur,
  } = useInput();

  const {
    state: {
      value: phone,
      isValid: isPhoneValid,
      isError: isPhoneError,
      message: phoneErrorMessage,
    },
    handlePhoneOnChange: phoneOnChange,
    // handleOnBlur: phoneOnBlur,
  } = useInput();

  const {
    state: { value: country, isValid: isCountryValid },
    handleCountryOnChange: countryOnChange,
  } = useInput();

  const {
    state: { value: region, isValid: isRegionValid },
    handleRegionOnChange: regionOnChange,
  } = useInput();

  const {
    state: { value: raspberrypiId },
    handleOnChange: raspberrypiIdOnChange,
  } = useInput();

  const {
    state: {
      value: deviceSelection,
      isValid: isDeviceSelectionValid,
      isError: isDeviceSelectionError,
      message: deviceSelectionErrorMessage,
    },
    handleOnChange: deviceSelectionOnChange,
    handleOnBlur: deviceSelectionOnBlur,
  } = useInput();

  const {
    state: {
      value: roomSelection,
      isValid: isRoomSelectionValid,
      isError: isRoomSelectionError,
      message: roomSelectionErrorMessage,
    },
    handleOnChange: roomSelectionOnChange,
    handleOnBlur: roomSelectionOnBlur,
  } = useInput();

  const {
    state: {
      value: bridgeId,
      isValid: isBridgeIdlValid,
      isError: isBridgeIdError,
      message: bridgeIdErrorMessage,
    },
    handleOnChange: bridgeIdOnChange,
    handleOnBlur: bridgeIdOnBlur,
  } = useInput();

  const {
    state: {
      value: lightId,
      isValid: isLightIdlValid,
      isError: isLightIdError,
      message: lightIdErrorMessage,
    },
    handleOnChange: lightIdOnChange,
    handleOnBlur: lightIdOnBlur,
  } = useInput();

  const {
    state: {
      value: applicationKey,
      isValid: isApplicationKeylValid,
      isError: isApplicationKeyError,
      message: applicationKeyErrorMessage,
    },
    handleOnChange: applicationKeyOnChange,
    handleOnBlur: applicationKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: apiKey,
      isValid: isApiKeylValid,
      isError: isApiKeyError,
      message: apiKeyErrorMessage,
    },
    handleOnChange: apiKeyOnChange,
    handleOnBlur: apiKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: sensiboApiKey,
      isValid: isSensiboApiKeylValid,
      isError: isSensiboApiKeyError,
      message: sensiboApiKeyErrorMessage,
    },
    handleOnChange: sensiboApiKeyOnChange,
    handleOnBlur: sensiboApiKeyOnBlur,
  } = useInput();

  const {
    state: {
      value: deviceId,
      isValid: isDeviceIdlValid,
      isError: isDeviceIdError,
      message: deviceIdErrorMessage,
    },
    handleOnChange: deviceIdOnChange,
    handleOnBlur: deviceIdOnBlur,
  } = useInput();

  const {
    state: {
      value: cloudUrl,
      isValid: isCloudUrllValid,
      isError: isCloudUrlError,
      message: cloudUrlErrorMessage,
    },
    handleOnChange: cloudUrlOnChange,
    handleOnBlur: cloudUrlOnBlur,
  } = useInput();

  const {
    state: {
      value: province,
      isValid: isProvinceValid,
      isError: isProvinceError,
      message: provinceErrorMessage,
    },
    handleOnChange: provinceOnChange,
    handleOnBlur: provinceOnBlur,
  } = useInput();

  const {
    state: {
      value: street,
      isValid: isStreetValid,
      isError: isStreetError,
      message: streetErrorMessage,
    },
    handleOnChange: streetOnChange,
    handleOnBlur: streetOnBlur,
  } = useInput();

  const {
    state: {
      value: houseNumber,
      isValid: isHouseNumberValid,
      isError: isHouseNumberError,
      message: houseNumberErrorMessage,
    },
    handleOnChange: houseNumberOnChange,
    handleOnBlur: houseNumberOnBlur,
  } = useInput();

  const {
    state: {
      value: houseName,
      isValid: isHouseNameValid,
      isError: isHouseNameError,
      message: houseNameErrorMessage,
    },
    handleOnChange: houseNameOnChange,
    handleOnBlur: houseNameOnBlur,
  } = useInput();

  const {
    state: {
      value: doorNumber,
      isValid: isDoorNumberlValid,
      isError: isDoorNumberError,
      message: doorNumberErrorMessage,
    },
    handleOnChange: doorNumberOnChange,
    handleOnBlur: doorNumberOnBlur,
  } = useInput();

  const handleDeleteDevice = (index) => {
    setDeviceList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleAddDevice = () => {
    if (deviceSelection === "hue") {
      if (lightId && applicationKey && bridgeId) {
        const newBridge = {
          [deviceSelection]: {
            roomSelection,
            lightId,
            applicationKey,
            bridgeId,
          },
        };

        setDeviceList((prevList) => [...prevList, newBridge]);
        console.log(deviceList);
        handleCancelBridge();
      } else {
        console.error("Please fill in all the required fields.");
      }
    }

    if (deviceSelection === "sensibo") {
      if (deviceId && apiKey && sensiboApiKey) {
        const newBridge = {
          [deviceSelection]: {
            roomSelection,
            deviceId,
            apiKey,
            sensiboApiKey,
          },
        };

        setDeviceList((prevList) => [...prevList, newBridge]);
        console.log(deviceList);
        handleCancelBridge();
      } else {
        console.error("Please fill in all the required fields.");
      }
    }

    if (deviceSelection === "shelly") {
      if (cloudUrl && apiKey) {
        const newBridge = {
          [deviceSelection]: {
            roomSelection,
            cloudUrl,
            apiKey,
          },
        };

        setDeviceList((prevList) => [...prevList, newBridge]);
        console.log(deviceList);
        handleCancelBridge();
      } else {
        console.error("Please fill in all the required fields.");
      }
    }
  };

  const handleCancelBridge = () => {
    deviceSelectionOnChange({ target: { name: "bridgeId", value: "" } });
    bridgeIdOnChange({ target: { name: "deviceSelection", value: "" } });
    applicationKeyOnChange({ target: { name: "applicationKey", value: "" } });
    lightIdOnChange({ target: { name: "lightId", value: "" } });

    roomSelectionOnChange({ target: { name: "roomSelection", value: "" } });
    deviceIdOnChange({ target: { name: "deviceId", value: "" } });
    apiKeyOnChange({ target: { name: "apiKey", value: "" } });
    sensiboApiKeyOnChange({ target: { name: "sensiboApiKey", value: "" } });

    apiKeyOnChange({ target: { name: "apiKey", value: "" } });
    cloudUrlOnChange({ target: { name: "cloudUrl", value: "" } });
  };

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser, navigate]);

  const codingGeo = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/geocoding`,
        {
          params: {
            country: country,
            city: region,
          },
          headers: {
            "X-Api-Key": "0IM1OGs36No1KIg69Tg75G4IiT5UvWVe8UrDaRnI",
          },
        }
      );

      const coordinates = response.data[0];
      const latitudeValue = coordinates.latitude;
      const longitudeValue = coordinates.longitude;
      return { latitudeValue, longitudeValue };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const submitForm = async () => {
    try {
      const { latitudeValue, longitudeValue } = await codingGeo();
      const formData = {
        user: {
          firstname: firstname,
          lastname: lastname,
          phone: phone.replace(/\s/g, ""),
          username: username,
          hash: password,
          email: email,
          password: password,
        },
        house: {
          name: houseName,
          location: {
            lat: latitudeValue,
            lng: longitudeValue,
          },
          city: region,
          province: province,
          country: country,
          street: street,
          houseNumber: houseNumber,
          doorNumber: doorNumber,
          houseLocations: deviceList.map((device) => ({
            key: device[Object.keys(device)[0]].roomSelection,
            name: device[Object.keys(device)[0]].roomSelection,
            type: device[Object.keys(device)[0]].roomSelection,
          })),
        },
        raspberrypiId: raspberrypiId,
        hue: {
          bridges: deviceList
            .filter((device) => device.hasOwnProperty("hue"))
            .map((device) => ({
              id: device.hue.bridgeId,
              ip: ipAddress,
              heuApplicationKey: device.hue.applicationKey,
            })),
          lights: deviceList
            .filter((device) => device.hasOwnProperty("hue"))
            .map((device) => ({
              properties: {},
              id: device.hue.lightId,
              bridgeId: device.hue.bridgeId,
              location: device.hue.roomSelection,
            })),
          locations: Object.assign(
            {},
            ...deviceList
              .filter((device) => device.hasOwnProperty("hue"))
              .map((device) => ({
                [device.hue.roomSelection]: {
                  bridgeId: device.hue.bridgeId,
                  partyMode: false,
                },
              }))
          ),
        },
        sensibo: {
          devices: deviceList
            .filter((device) => device.hasOwnProperty("sensibo"))
            .map((device) => ({
              id: device.sensibo.deviceId,
              location: device.sensibo.roomSelection,
            })),
          apiKey: deviceList.find((device) => device.hasOwnProperty("sensibo"))
            .sensibo?.apiKey,
        },
        shelly: {
          apiKey: deviceList.find((device) => device.hasOwnProperty("shelly"))
            .shelly.apiKey,
          cloudUrl: "https://shelly-90-eu.shelly.cloud",
          devices: deviceList
            .filter((device) => device.hasOwnProperty("shelly"))
            .map((device) => ({
              deviceId: device.shelly.deviceId,
              location: device.shelly.roomSelection,
              name: device.shelly.roomSelection,
              online: false,
            })),
        },
      };

      // const response = await axios.post(
      //   "http://localhost:8004/api/setup",
      //   formData
      // );
      // setIsSuccess(true);
      // console.log("data: ", response.data);
      // setTimeout(() => {
      //   window.location.href = "/home";
      // }, 5000);

      const response = await new HttpRequest("cloud").post("setup", formData);
      setIsSuccess(true);

      console.log("data: ", response.data);

      navigate("/");
    } catch (error) {
      setIsSuccess(false);

      console.log("hata: ", error);
    }
  };

  return (
    <motion.div>
      <div className="mb-4">
        <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
          <Input
            type={"text"}
            name={"firstname"}
            placeholder={"Firstname"}
            value={firstname}
            onChange={firstnameOnChange}
            onBlur={firstnameOnBlur}
            label="FirstName"
            isValid={isUsernameError}
          />
          <Input
            type={"text"}
            name={"lastname"}
            placeholder={"Lastname"}
            value={lastname}
            onChange={lastnameOnChange}
            onBlur={lastnameOnBlur}
            label="Lastname"
            isValid={isLastnameError}
          />
        </div>
        {isFirstnameError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{firstnameErrorMessage}</span>
          </p>
        )}
        {isLastnameError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{lastnameErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
          <Input
            type={"text"}
            name={"username"}
            placeholder={"@username"}
            value={username}
            onChange={usernameOnChange}
            onBlur={usernameOnBlur}
            label="@username"
            isValid={isUsernameError}
          />
          <Input
            type={"text"}
            name={"email"}
            placeholder={"Email"}
            value={email}
            onChange={emailOnChange}
            onBlur={emailOnBlur}
            label="Email adress"
            isValid={isEmailError}
          />
        </div>
        <div>
          {isUsernameError && (
            <p className="text-red-500 mt-2">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ms-2">{usernameErrorMessage}</span>
            </p>
          )}
          {isEmailError && (
            <p className="text-red-500 mt-2">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ms-2">{emailErrorMessage}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={passwordOnChange}
          onBlur={passwordOnBlur}
          label="Password"
          isValid={isPasswordError}
        />
        {isPasswordError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{passwordErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={confirmPasswordOnChange}
          onBlur={confirmPasswordOnBlur}
          label="Password Confirm"
          isValid={
            isConfirmPasswordError ||
            (isPasswordValid &&
              isConfirmPasswordValid &&
              password !== confirmPassword)
          }
        />
        {isConfirmPasswordError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{confirmPasswordErrorMessage}</span>
          </p>
        )}
        {isPasswordValid &&
          isConfirmPasswordValid &&
          password !== confirmPassword && (
            <p className="text-red-500 mt-2">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ms-2">Password doesn't match.</span>
            </p>
          )}
      </div>

      <div className="mb-4">
        <PhoneInput
          country={"tr"}
          value={phone || ""}
          inputProps={{ name: "phone" }}
          onChange={phoneOnChange}
          className="w-full"
          isValid={isPhoneValid || false}
          inputStyle={{
            width: "100%",
            height: 50,
          }}
        />
      </div>

      <div className="mb-4">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <CountryDropdown
            value={country}
            onChange={countryOnChange}
            isValid={isCountryValid}
            className="form-input lg:w-3/4 peer border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition lg:mb-0"
          />
          <RegionDropdown
            disableWhenEmpty={true}
            country={country}
            value={region}
            isValid={isRegionValid}
            onChange={regionOnChange}
            className="form-input lg:w-1/4 peer border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <Input
            type={"text"}
            name="province"
            value={province}
            onChange={provinceOnChange}
            placeholder={"Province"}
            label={"Province"}
            isValid={isProvinceError}
          />

          <Input
            type={"text"}
            name="street"
            value={street}
            onChange={streetOnChange}
            placeholder={"Street"}
            label={"Street"}
          />
        </div>
        {isProvinceError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{provinceErrorMessage}</span>
          </p>
        )}
        {isStreetError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{streetErrorMessage}</span>
          </p>
        )}
      </div>
      <div className="mb-4">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <Input
            type={"text"}
            name="houseNumber"
            value={houseNumber}
            onChange={houseNumberOnChange}
            placeholder={"House Number"}
            label={"House Number"}
            isValid={isHouseNameError}
          />

          <Input
            type={"text"}
            name="doorNumber"
            value={doorNumber}
            onChange={doorNumberOnChange}
            placeholder={"Door Number"}
            label={"Door Number"}
            isValid={isDoorNumberError}
          />
        </div>
        {isHouseNumberError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{houseNumberErrorMessage}</span>
          </p>
        )}
        {isDoorNumberError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{doorNumberErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name="houseName"
          value={houseName}
          onChange={houseNameOnChange}
          placeholder={"Enter a name for your house"}
          label={"Enter a name for your house"}
          isValid={isHouseNameError}
        />
        {isHouseNameError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{houseNameErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          type={"text"}
          name="raspberrypiId"
          value={raspberrypiId}
          onChange={raspberrypiIdOnChange}
          placeholder={"Raspberry PI Id"}
          label={"Raspberry PI Id"}
        />
      </div>

      <hr className="my-8" />

      <div className="mb-4">
        <select
          className="form-input peer w-full border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition"
          onChange={deviceSelectionOnChange}
          value={deviceSelection}
          onBlur={deviceSelectionOnBlur}
        >
          <option value="">Select Device</option>
          <option value="hue">Hue</option>
          <option value="sensibo">Sensibo</option>
          <option value="shelly">Shelly</option>
        </select>
        {isDeviceSelectionError && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{isDeviceSelectionError}</span>
          </p>
        )}
      </div>

      <div className="mb-4">
        {deviceSelection === "hue" && (
          <div id="for-hue">
            <select
              className="form-input peer w-full border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition mb-4"
              onChange={roomSelectionOnChange}
              value={roomSelection}
              onBlur={roomSelectionOnBlur}
            >
              <option value="">Select Room</option>
              <option value="living_room">Living room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="garden">Garden</option>
              <option value="garage">Garage</option>
              <option value="basement">Basement</option>
              <option value="attic">Attic</option>
              <option value="office">Office</option>
              <option value="dining_room">Dining Room</option>
              <option value="hallway">Hallway</option>
              <option value="stairs">Stairs</option>
              <option value="porch">Porch</option>
              <option value="front_yard">Front Yard</option>
              <option value="back_yard">Back Yard</option>
              <option value="side_yard">Side Yard</option>
              <option value="driveway">Driveway</option>
              <option value="sidewalk">Sidewalk</option>
              <option value="street">Street</option>
              <option value="parking_lot">Parking Lot</option>
              <option value="playground">Playground</option>
              <option value="park">Park</option>
              <option value="parking_space">Parking Space</option>
            </select>
            <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"lightId"}
                  placeholder={"Light Id"}
                  value={lightId}
                  onChange={lightIdOnChange}
                  onBlur={lightIdOnBlur}
                  label="Light Id"
                  isValid={isLightIdError}
                />
                {isLightIdError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{lightIdErrorMessage}</span>
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"applicationKey"}
                  placeholder={"Application Key"}
                  value={applicationKey}
                  onChange={applicationKeyOnChange}
                  onBlur={applicationKeyOnBlur}
                  label="Application Key"
                  isValid={isApplicationKeyError}
                />
                {isApplicationKeyError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{applicationKeyErrorMessage}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Input
                type={"text"}
                name={"bridgeId"}
                placeholder={"Bridge Id"}
                value={bridgeId}
                onChange={bridgeIdOnChange}
                onBlur={bridgeIdOnBlur}
                label="Bridge Id"
                isValid={isBridgeIdError}
              />
              {isBridgeIdError && (
                <p className="text-red-500 mt-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span className="ms-2">{bridgeIdErrorMessage}</span>
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <div
                  className="bg-black text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleAddDevice}
                >
                  Add
                </div>
                <div
                  className="bg-red-500 text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleCancelBridge}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}
        {deviceSelection === "sensibo" && (
          <div id="for-sensibo">
            <select
              className="form-input peer w-full border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition mb-4"
              onChange={roomSelectionOnChange}
              value={roomSelection}
              onBlur={roomSelectionOnBlur}
            >
              <option value="">Select Room</option>
              <option value="living_room">Living room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="garden">Garden</option>
              <option value="garage">Garage</option>
              <option value="basement">Basement</option>
              <option value="attic">Attic</option>
              <option value="office">Office</option>
              <option value="dining_room">Dining Room</option>
              <option value="hallway">Hallway</option>
              <option value="stairs">Stairs</option>
              <option value="porch">Porch</option>
              <option value="front_yard">Front Yard</option>
              <option value="back_yard">Back Yard</option>
              <option value="side_yard">Side Yard</option>
              <option value="driveway">Driveway</option>
              <option value="sidewalk">Sidewalk</option>
              <option value="street">Street</option>
              <option value="parking_lot">Parking Lot</option>
              <option value="playground">Playground</option>
              <option value="park">Park</option>
              <option value="parking_space">Parking Space</option>
            </select>
            <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"deviceId"}
                  placeholder={"Device Id"}
                  value={deviceId}
                  onChange={deviceIdOnChange}
                  onBlur={deviceIdOnBlur}
                  label="Device Id"
                  isValid={isDeviceIdError}
                />
                {isDeviceIdError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{deviceIdErrorMessage}</span>
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"apiKey"}
                  placeholder={"API Key"}
                  value={apiKey}
                  onChange={apiKeyOnChange}
                  onBlur={apiKeyOnBlur}
                  label="API Key"
                  isValid={isApiKeyError}
                />
                {isApiKeyError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{apiKeyErrorMessage}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Input
                type={"text"}
                name={"sensiboApiKey"}
                placeholder={"Sensibo API Key"}
                value={sensiboApiKey}
                onChange={sensiboApiKeyOnChange}
                onBlur={sensiboApiKeyOnBlur}
                label="Sensibo API Key"
                isValid={isSensiboApiKeyError}
              />
              {isSensiboApiKeyError && (
                <p className="text-red-500 mt-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span className="ms-2">{sensiboApiKeyErrorMessage}</span>
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <div
                  className="bg-black text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleAddDevice}
                >
                  Add
                </div>
                <div
                  className="bg-red-500 text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleCancelBridge}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}
        {deviceSelection === "shelly" && (
          <div id="for-shelly">
            <select
              className="form-input peer w-full border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition mb-4"
              onChange={roomSelectionOnChange}
              value={roomSelection}
              onBlur={roomSelectionOnBlur}
            >
              <option value="">Select Room</option>
              <option value="living_room">Living room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="garden">Garden</option>
              <option value="garage">Garage</option>
              <option value="basement">Basement</option>
              <option value="attic">Attic</option>
              <option value="office">Office</option>
              <option value="dining_room">Dining Room</option>
              <option value="hallway">Hallway</option>
              <option value="stairs">Stairs</option>
              <option value="porch">Porch</option>
              <option value="front_yard">Front Yard</option>
              <option value="back_yard">Back Yard</option>
              <option value="side_yard">Side Yard</option>
              <option value="driveway">Driveway</option>
              <option value="sidewalk">Sidewalk</option>
              <option value="street">Street</option>
              <option value="parking_lot">Parking Lot</option>
              <option value="playground">Playground</option>
              <option value="park">Park</option>
              <option value="parking_space">Parking Space</option>
            </select>
            <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"cloudUrl"}
                  placeholder={"Cloud URL"}
                  value={cloudUrl}
                  onChange={cloudUrlOnChange}
                  onBlur={cloudUrlOnBlur}
                  label="Cloud URL"
                  isValid={isCloudUrlError}
                />
                {isCloudUrlError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{cloudUrlErrorMessage}</span>
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <Input
                  type={"text"}
                  name={"apiKey"}
                  placeholder={"API Key"}
                  value={apiKey}
                  onChange={apiKeyOnChange}
                  onBlur={apiKeyOnBlur}
                  label="API Key"
                  isValid={isApiKeyError}
                />
                {isApiKeyError && (
                  <p className="text-red-500 mt-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="ms-2">{apiKeyErrorMessage}</span>
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <div
                  className="bg-black text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleAddDevice}
                >
                  Add
                </div>
                <div
                  className="bg-red-500 text-white p-3 mb-4 rounded-md cursor-pointer"
                  onClick={handleCancelBridge}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="my-8" />

      <div className="mb-4">
        {deviceList.length > 0 && (
          <AccordionList
            deviceList={deviceList}
            onDelete={handleDeleteDevice}
          />
        )}
      </div>

      <div>
        <Button
          type={"submit"}
          variant={"primary"}
          className={"w-full py-3 lg:py-4"}
          onClick={submitForm}
          disabled={true}
        >
          SIGNUP
        </Button>
      </div>
      {isSuccess && (
        <AlertBox
          message="Signup successful! Redirecting to home page..."
          color="bg-blue-400"
        />
      )}
      {isSuccess === false && (
        <AlertBox
          message="Signup failed! Try again please."
          color="bg-red-400"
        />
      )}
    </motion.div>
  );
};

export default SignupPage;
