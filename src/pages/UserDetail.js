import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import HttpRequest from "../utils/HttpRequest";
import useInput from "../hooks/useInput";
import Spinner from "../components/ui/Spinner";
import Input from "../components/ui/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AccordionList from "../components/ui/Accordion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";

const getUser = (username) =>
  new HttpRequest("cloud").get(`users/${username}`, username);
const httpRequest = new HttpRequest("cloud");

const UserDetailPage = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  const params = useParams();
  const [deviceList, setDeviceList] = useState([]);
  const [userId, setUserId] = useState([]);
  const { username } = params;

  const {
    state: { value: firstnameValue },
    handleOnChange: firstnameValueOnChange,
  } = useInput();
  const {
    state: { value: lastnameValue },
    handleOnChange: lastnameValueOnChange,
  } = useInput();
  const {
    state: { value: usernameValue },
    handleOnChange: usernameValueOnChange,
  } = useInput();
  const {
    state: { value: emailValue },
    handleOnChange: emailValueOnChange,
  } = useInput();
  const {
    state: { value: phoneValue },
    handleOnChange: phoneValueOnChange,
  } = useInput();

  const {
    state: {
      value: password,
      isValid: isPasswordValid,
      isError: isPasswordError,
    },
    handleOnChange: passwordOnChange,
    handleOnBlur: passwordOnBlur,
  } = useInput();

  const {
    state: {
      value: confirmPassword,
      isValid: isConfirmPasswordValid,
      isError: isConfirmPasswordError,
    },
    handleOnChange: confirmPasswordOnChange,
    handleOnBlur: confirmPasswordOnBlur,
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

  const { data: user, isLoading: isUserLlading } = useQuery({
    queryKey: ["getSearchedUser", username],
    queryFn: () => {
      if (username) return getUser(username);
    },
  });

  console.log("user: ", user);

  console.log(deviceList);

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
            deviceId,
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

  console.log(deviceList);

  const updateUser = async () => {
    try {
      const formData = {
        user: {
          firstname: !firstnameValue
            ? user.data.user.firstname
            : firstnameValue,
          lastname: !lastnameValue ? user.data.user.lastname : lastnameValue,
          phone: !phoneValue.replace(/\s/g, "")
            ? user.data.user.phone.replace(/\s/g, "")
            : phoneValue.replace(/\s/g, ""),
          username: !usernameValue ? user.data.user.username : usernameValue,
          email: !emailValue ? user.data.user.email : emailValue,
        },
        house: {
          name: user.data.house.name,
        },
        raspberrypiId: user.data.nativeBackendId.raspberrypiId,

        hue: {
          bridges: deviceList
            .filter((device) => device.hasOwnProperty("hue"))
            .map((device) => ({
              id: device.hue.bridgeId,
              ip: user.data.devices.hueData.bridges[0].ip,
              hueApplicationKey: device.hue.applicationKey,
            })),
          lights: deviceList
            .filter((device) => device.hasOwnProperty("hue"))
            .map((device) => ({
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
                  groupId: Object.values(
                    user.data.nativeBackendId.hue.locations
                  )[0].groupId,
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
          cloudUrl: deviceList.find((device) => device.hasOwnProperty("shelly"))
            .shelly.cloudUrl,
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

      const response = await httpRequest.post(
        `users/update/${userId}`,
        formData
      );

      setIsSuccess(true);

      console.log("data: ", response);
      navigate("/");
    } catch (error) {
      setIsSuccess(false);
      console.log("hata: ", error);
    }
  };

  console.log("formData: ", deviceList);

  useEffect(() => {
    if (user && user.data && user.data.devices) {
      console.log(user.data.devices.hueData.bridges[0].hueApplicationKey);
      const hueDevicesData = user.data.devices.hueData;
      const {
        apiKey: shellyApiKey,
        devices: shellyDevices,
        cloudUrl,
      } = user.data.devices.shellyData || {};
      const { apiKey: sensiboApiKey, devices: sensiboDevices } =
        user.data.devices.sensiboData || {};
      const combinedDevices = [];
      if (hueDevicesData) {
        const { bridges, lights, locations } = hueDevicesData;
        if (bridges && lights && locations) {
          console.log(bridges);
          const processedHueDevices = lights.map((light) => {
            const { id: lightId, location: roomSelection, bridgeId } = light;
            console.log(light.lightId);
            const hueApplicationKey = bridges.find(
              (bridge) => bridge.hueApplicationKey
            );

            const applicationKey = hueApplicationKey.hueApplicationKey;
            return {
              roomSelection,
              lightId,
              applicationKey,
              bridgeId,
            };
          });
          combinedDevices.push(
            ...processedHueDevices.map((hueDevice) => ({ hue: hueDevice }))
          );
        } else {
          console.error("Hue data is incomplete or undefined.");
        }
      }
      if (shellyApiKey && shellyDevices && cloudUrl) {
        const processedShellyDevices = shellyDevices.map((device) => ({
          roomSelection: device.location,
          applicationKey: shellyApiKey,
          cloudUrl: cloudUrl,
        }));
        combinedDevices.push(
          ...processedShellyDevices.map((shellyDevice) => ({
            shelly: shellyDevice,
          }))
        );
      }
      if (sensiboApiKey && sensiboDevices) {
        const processedSensiboDevices = sensiboDevices.map((device) => ({
          roomSelection: device.location,
          apiKey: sensiboApiKey,
          deviceId: device.id,
        }));
        combinedDevices.push(
          ...processedSensiboDevices.map((sensiboDevice) => ({
            sensibo: sensiboDevice,
          }))
        );
      }

      setDeviceList(combinedDevices);
    }
    if (user && user.data && user.data.user) {
      setUserId(user.data.user.id);
    }
  }, [user]);

  useEffect(() => {
    if (!currentUser) navigate("/home");
  }, [currentUser, navigate]);

  return (
    <>
      {isUserLlading ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <div>
          <div className="flex items-center w-full gap-2 flex-col lg:flex-row">
            <Input
              type={"text"}
              name={"firstname"}
              placeholder={"firstname"}
              value={firstnameValue || user.data.user.firstname}
              onChange={firstnameValueOnChange}
              label={"Firstname"}
            />
            <Input
              type={"text"}
              name={"lastname"}
              placeholder={"lastname"}
              value={lastnameValue || user.data.user.lastname}
              onChange={lastnameValueOnChange}
              label={"Lastname"}
            />
          </div>

          <div className="flex items-center w-full gap-2 flex-col mt-5 lg:flex-row ">
            <Input
              type={"text"}
              name={"username"}
              placeholder={"username"}
              value={usernameValue || user.data.user.username}
              onChange={usernameValueOnChange}
              label={"Username"}
            />
            <Input
              type={"text"}
              name={"email"}
              placeholder={"email"}
              value={emailValue || user.data.user.email}
              onChange={emailValueOnChange}
              label={"Email"}
            />
          </div>
          <div className="mt-5">
            <PhoneInput
              country={"tr"}
              value={phoneValue || user.data.user.phone}
              onChange={(value, country) =>
                phoneValueOnChange({ target: { value } })
              }
              inputProps={{ name: "phoneValue" }}
              className="w-full"
              inputStyle={{
                width: "100%",
                height: 50,
              }}
            />
          </div>
          <div className="mt-5">
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
          <div className="mt-5">
            <div>
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
                          <span className="ms-2">
                            {applicationKeyErrorMessage}
                          </span>
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
                        name={"deviceId"}
                        placeholder={"Device Id"}
                        value={apiKey}
                        onChange={apiKeyOnChange}
                        onBlur={apiKeyOnBlur}
                        label="Device Id"
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
                        <span className="ms-2">
                          {sensiboApiKeyErrorMessage}
                        </span>
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
          </div>
          <div>
            <Button
              type={"submit"}
              variant={"primary"}
              className={"w-full py-3 lg:py-4"}
              onClick={updateUser}
            >
              {" "}
              UPDATE USER
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default UserDetailPage;
