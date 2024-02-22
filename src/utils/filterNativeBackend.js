export const filterNativeBackend = (nativeBackend) => {
  const filteredNativeBackend = { ...nativeBackend };

  if (
    filteredNativeBackend.hue?.bridges.length === 0 &&
    filteredNativeBackend.hue?.lights.length === 0
  )
    delete filteredNativeBackend.hue;

  if (
    !filteredNativeBackend.sensibo?.apiKey &&
    filteredNativeBackend.sensibo?.devices.length === 0
  )
    delete filteredNativeBackend.sensibo;

  if (
    !filteredNativeBackend.shelly?.apiKey &&
    filteredNativeBackend.shelly?.devices.length === 0
  )
    delete filteredNativeBackend.shelly;

  return filteredNativeBackend;
};
