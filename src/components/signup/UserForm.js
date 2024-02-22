import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import HttpRequest from "../../utils/HttpRequest";
import Spinner from "../ui/Spinner";

const checkUser = (payload) =>
  new HttpRequest("cloud").post("users/check", payload);

const UserForm = ({
  handleNextFormStage,
  handleCreateUser,
  setErrorDialog,
  setErrorTitle,
  setErrorMessage,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);

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
      value: passwordConfirm,
      isValid: isPasswordConfirmValid,
      isError: isPasswordConfirmError,
      message: passwordConfirmErrorMessage,
    },
    handleOnChange: confirmPasswordOnChange,
    handleOnBlur: confirmPasswordOnBlur,
  } = useInput();

  const {
    state: { value: phone, isValid: isPhoneValid },
    handlePhoneOnChange: phoneOnChange,
  } = useInput();

  const mutationCheckUser = useMutation(checkUser, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorTitle("Error");
        setErrorMessage(data.message);
      } else {
        handleCreateUser({
          firstname,
          lastname,
          username,
          email,
          phone,
          password,
          passwordConfirm,
        });

        handleNextFormStage();
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutationCheckUser.mutate({ username, email, phone });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(
        isFirstnameValid &&
          isLastnameValid &&
          isUsernameValid &&
          isEmailValid &&
          isPasswordValid &&
          isPasswordConfirmValid &&
          isPhoneValid
      );
    }, 100);

    return () => clearTimeout(identifier);
  }, [
    isFirstnameValid,
    isLastnameValid,
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    isPasswordConfirmValid,
    isPhoneValid,
  ]);

  return (
    <form onSubmit={handleSubmit} className="px-1">
      <h1 className="text-2xl text-gray-600 font-bold mb-6">
        Let's start creating a user
      </h1>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"firstname"}
          placeholder={"Firstname"}
          label="Firstname"
          value={firstname}
          onChange={firstnameOnChange}
          onBlur={firstnameOnBlur}
          isValid={isFirstnameError}
        />
        {isFirstnameError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{firstnameErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"lastname"}
          placeholder={"Lastname"}
          label="Lastname"
          value={lastname}
          onChange={lastnameOnChange}
          onBlur={lastnameOnBlur}
          isValid={isLastnameError}
        />
        {isLastnameError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{lastnameErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"username"}
          placeholder={"@username"}
          label="username"
          value={username}
          onChange={usernameOnChange}
          onBlur={usernameOnBlur}
          isValid={isUsernameError}
        />
        {isUsernameError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{usernameErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <Input
          type={"text"}
          name={"email"}
          placeholder={"Email"}
          label="Email adress"
          value={email}
          onChange={emailOnChange}
          onBlur={emailOnBlur}
          isValid={isEmailError}
        />
        {isEmailError && (
          <p className="text-red-500 mt-1">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{emailErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <PhoneInput
          country={"tr"}
          value={phone || ""}
          inputProps={{ name: "phone" }}
          onChange={phoneOnChange}
          className="w-full rounded"
          isValid={isPhoneValid || false}
          inputStyle={{
            width: "100%",
            height: 60,
          }}
        />
      </div>

      <div className="mb-6">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={passwordOnChange}
          onBlur={passwordOnBlur}
          isValid={isPasswordError}
        />
        {isPasswordError && (
          <p className="text-red-500">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{passwordErrorMessage}</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Password Confirm"
          value={passwordConfirm}
          onChange={confirmPasswordOnChange}
          onBlur={confirmPasswordOnBlur}
          isValid={
            isPasswordConfirmError ||
            (isPasswordValid &&
              isPasswordConfirmValid &&
              password !== passwordConfirm)
          }
        />
        {isPasswordConfirmError && (
          <p className="text-red-500">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ms-2">{passwordConfirmErrorMessage}</span>
          </p>
        )}
        {isPasswordValid &&
          isPasswordConfirmValid &&
          password !== passwordConfirm && (
            <p className="text-red-500">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ms-2">Password doesn't match.</span>
            </p>
          )}
      </div>

      <Button
        type={"submit"}
        variant={"primary"}
        className={"w-full py-4"}
        disabled={!isFormValid || mutationCheckUser.isLoading}
        onClick={handleSubmit}
      >
        {mutationCheckUser.isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span>Checking</span>
            <Spinner size={"sm"} />
          </span>
        ) : (
          <span>Create & Continue</span>
        )}
      </Button>
    </form>
  );
};

export default UserForm;
