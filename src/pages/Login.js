import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ErrorDialog from "../components/ui/ErrorDialog";
import Spinner from "../components/ui/Spinner";
import { userSliceActions } from "../store/user-slice/user-slice";
import HttpRequest from "../utils/HttpRequest";
import useInput from "../hooks/useInput";

const Login = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const currentUserState = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);

  const [errorDialog, setErrorDialog] = useState(false);

  const { currentUser } = currentUserState;

  const {
    state: { value: username, isValid: isUsernameValid },
    handleOnChange: usernameOnChange,
    handleOnBlur: usernameOnBlur,
  } = useInput();

  const {
    state: { value: password, isValid: isPasswordValid },
    handleOnChange: passwordOnChange,
    handleOnBlur: passwordOnBlur,
  } = useInput();

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(isUsernameValid && isPasswordValid);
    }, 100);

    return () => clearTimeout(identifier);
  }, [isUsernameValid, isPasswordValid]);

  useEffect(() => {
    if (actionData?.status === "fail") setErrorDialog(true);
    if (actionData?.status === "success") {
      if (actionData.token) {
        dispatch(userSliceActions.setCurrentUser(actionData.data.user));
        navigate("/home");
      }
    }
  }, [actionData, dispatch, navigate]);

  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [currentUser, navigate]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.75 }}
        >
          <Form method="POST">
            <div className="mb-4">
              <Input
                type={"text"}
                name={"admin-username"}
                placeholder={"@username (admin)"}
                value={username}
                onChange={usernameOnChange}
                onBlur={usernameOnBlur}
                label={"username (admin)"}
              />
            </div>
            <div className="mb-4">
              <Input
                type={"password"}
                name={"admin-password"}
                placeholder={"Password"}
                value={password}
                onChange={passwordOnChange}
                onBlur={passwordOnBlur}
                label={"Password"}
              />
            </div>
            <Button
              type={"submit"}
              variant={"primary"}
              className={"w-full py-4"}
              disabled={navigation.state === "submitting" || !isFormValid}
            >
              {navigation.state === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <span>LOGGING IN</span>
                  <Spinner size={"sm"} />
                </span>
              ) : (
                <span>LOGIN</span>
              )}
            </Button>
          </Form>
        </motion.div>
      </AnimatePresence>
      <ErrorDialog
        show={errorDialog}
        title={"Error"}
        message={actionData?.message}
        handleErrorDialog={handleErrorDialog}
      />
    </>
  );
};

// * React-Router action
export const action = async ({ request }) => {
  const formData = await request.formData();

  const admin = {
    username: formData.get("admin-username"),
    password: formData.get("admin-password"),
  };

  const data = await new HttpRequest("panel").post("user/login", admin);

  return data;
};

export default Login;
