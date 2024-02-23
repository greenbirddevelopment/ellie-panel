import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

const ConfirmForm = ({ handlePreviousFormStage, handleSetup }) => {
  const setupState = useSelector((state) => state.setup);
  const [formattedHues, setFormattedHues] = useState([]);

  const { user, house, nativeBackend } = setupState;

  console.log("setup", { user, house, nativeBackend });

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSetup();
  };

  useEffect(() => {
    if (nativeBackend?.hue?.lights)
      setFormattedHues(
        nativeBackend.hue.lights.map((light, index) => ({
          bridgeId: light.bridgeId,
          lightId: light.id,
          location: light.location,
          hueApplicationKey: nativeBackend.hue.bridges[index].hueApplicationKey,
        }))
      );
  }, [nativeBackend]);

  return (
    <form className="px-1" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-gray-600 font-bold mb-4">
        Confirm & finish set up
      </h1>

      <div className="mb-4">
        <h1 className="text-lg font-bold mb-1">USER</h1>
        <ul>
          <li>Firstname: {user?.firstname}</li>
          <li>Lastname: {user?.lastname}</li>
          <li>Username: {user?.username}</li>
          <li>Email: {user?.email}</li>
          <li>Phone: {user?.phone}</li>
          <li>Password: {user?.password}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h1 className="text-lg font-bold mb-1">HOUSE</h1>
        <ul>
          <li>House name: {house?.name}</li>
          <li>City: {house?.city}</li>
          <li>Country: {house?.country}</li>
          <li>Province: {house?.province || "undefined"} </li>
        </ul>
      </div>

      <div className="mb-4">
        <h1 className="text-lg font-bold mb-2">DEVICES</h1>
        <ul>
          {formattedHues.length !== 0 && (
            <li className="py-2">
              <h1 className="text-lg font-semibold">HUE</h1>
              <ul>
                {formattedHues?.map((hue, index) => (
                  <li className="pb-4 border-b">
                    <p>Bridge Id: {hue.bridgeId}</p>
                    <p>Light Id: {hue.lightId}</p>
                    <p>Hue Application Key: {hue.hueApplicationKey}</p>
                    <p>Location: {hue.location}</p>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {nativeBackend?.shelly && (
            <li className="py-2">
              <h1 className="text-lg font-semibold">SHELLY</h1>
              <p>Api Key: {nativeBackend?.shelly?.apiKey}</p>
              {nativeBackend?.shelly?.devices.map((shelly) => (
                <li className="pb-4 border-b">
                  <p>Device Id: {shelly.deviceId}</p>
                  <p>Location: {shelly.location}</p>
                </li>
              ))}
            </li>
          )}

          {nativeBackend?.sensibo && (
            <li className="py-2">
              <h1 className="text-lg font-semibold">SENSIBO</h1>
              <p>Api Key: {nativeBackend?.sensibo?.apiKey}</p>
              {nativeBackend?.sensibo?.devices.map((sensibo) => (
                <li className="pb-4 border-b">
                  <p>Device Id: {sensibo.deviceId}</p>
                  <p>Location: {sensibo.location}</p>
                </li>
              ))}
            </li>
          )}
        </ul>
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
        // disabled={!isFormValid || checkRasppberry?.status === "fail"}
        onClick={handleSubmit}
      >
        Finish
      </Button>
    </form>
  );
};

export default ConfirmForm;
