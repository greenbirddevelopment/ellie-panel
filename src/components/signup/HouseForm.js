import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import useInput from "../../hooks/useInput";

const HouseForm = ({
  handleNextFormStage,
  handlePreviousFormStage,
  handleCreateHouse,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    state: {
      value: house,
      isValid: isHouseValid,
      isError: isHouseError,

      message: houseErrorMessage,
    },
    handleOnChange: houseOnChange,
    handleOnBlur: houseOnBlur,
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
    state: { value: province },
    handleOnChange: provinceOnChange,
  } = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateHouse({
      name: house,
      city: region,
      country,
      province,
    });

    handleNextFormStage();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(isHouseValid && isCountryValid && isRegionValid);
    }, 100);

    return () => clearTimeout(identifier);
  }, [isHouseValid, isCountryValid, isRegionValid]);

  return (
    <form onSubmit={handleSubmit} className="px-1">
      <h1 className="text-2xl text-gray-600 font-bold mb-6">
        Then, set up your smart home
      </h1>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"house"}
          placeholder={"Your house name"}
          label={"Your house name"}
          value={house}
          onChange={houseOnChange}
          onBlur={houseOnBlur}
          isValid={isHouseError}
        />
        {isHouseError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{houseErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <CountryDropdown
            value={country}
            onChange={countryOnChange}
            className="form-input lg:w-3/4 peer border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition lg:mb-0"
          />
          <RegionDropdown
            disableWhenEmpty={true}
            country={country}
            value={region}
            onChange={regionOnChange}
            className="form-input lg:w-1/4 peer border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 h-12 lg:h-14 transition"
          />
        </div>
      </div>

      <div className="mb-6">
        <Input
          type={"province"}
          name={"province"}
          placeholder={"Province"}
          label={"Province"}
          value={province}
          onChange={provinceOnChange}
        />
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
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Create & Continue
      </Button>
    </form>
  );
};

export default HouseForm;
