import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HouseForm from "../components/signup/HouseForm";
import UserForm from "../components/signup/UserForm";
import DevicesForm from "../components/signup/DevicesForm";
import HttpRequest from "../utils/HttpRequest";
import ErrorDialog from "../components/ui/ErrorDialog";
import Loading from "../components/ui/Loading";
import { filterNativeBackend } from "../utils/filterNativeBackend";
import { setupSliceActions } from "../store/setup-slice/setup-slice";
import ConfirmForm from "../components/signup/ConfirmForm";

const setup = (payload) => new HttpRequest("cloud").post("setup", payload);

const SignupPage = () => {
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentUserState = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const [currentFormStage, setCurrentFormState] = useState(0);
  const [remainingFormStage, setRemainingFormStage] = useState(3);
  const setupState = useSelector((state) => state.setup);
  const dispatch = useDispatch();

  const { user, house, nativeBackend } = setupState;

  console.log("user", user);
  console.log("house", house);
  console.log("nativeBackend", nativeBackend);

  const { currentUser } = currentUserState;

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  const handleNextFormStage = () => {
    setCurrentFormState(currentFormStage + 1);
    setRemainingFormStage(remainingFormStage - 1);
  };

  const handlePreviousFormStage = () => {
    setCurrentFormState(currentFormStage - 1);
    setRemainingFormStage(remainingFormStage + 1);
  };

  const handleCreateUser = (formData) =>
    dispatch(setupSliceActions.setUser(formData));

  const handleCreateHouse = (formData) =>
    dispatch(setupSliceActions.setHouse(formData));

  const handleCreateNativeBackend = (formData) => {
    const filteredNativeBackend = filterNativeBackend(formData);
    dispatch(setupSliceActions.setNativeBackend(filteredNativeBackend));
  };

  const mutationSetup = useMutation(setup, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorTitle("Error");
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setErrorDialog(true);
        setErrorTitle("Success");
        setErrorMessage(data.message);

        dispatch(setupSliceActions.setUser(null));
        dispatch(setupSliceActions.setHouse(null));
        dispatch(setupSliceActions.setNativeBackend(null));

        setTimeout(() => navigate("/"), 1200);
      }
    },
  });

  const handleSetup = () =>
    mutationSetup.mutate({ user, house, nativeBackend });

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <>
      <div className="signup">
        <div className="relative">
          <div className="flex items-center justify-between w-full z-40">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center font-bold bg-primary text-white rounded-full"
                style={{ width: "36px", height: "36px" }}
              >
                {1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center font-bold ${
                  currentFormStage >= 1 ? "bg-primary" : "bg-gray-400"
                } text-white rounded-full`}
                style={{ width: "36px", height: "36px" }}
              >
                {2}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center font-bold ${
                  currentFormStage >= 2 ? "bg-primary" : "bg-gray-400"
                } text-white rounded-full`}
                style={{ width: "36px", height: "36px" }}
              >
                {3}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center font-bold ${
                  currentFormStage >= 3 ? "bg-primary" : "bg-gray-400"
                } text-white rounded-full`}
                style={{ width: "36px", height: "36px" }}
              >
                {4}
              </span>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 w-full -z-10">
            <div className="relative">
              <motion.div
                animate={{
                  width:
                    currentFormStage === 0 ? "0%" : `${33 * currentFormStage}%`,
                }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="absolute top-0 left-0 rounded bg-primary z-10"
                style={{ height: 2 }}
              />
              <div
                className="bg-gray-400 absolute top-0 left-0 w-full"
                style={{ height: 2 }}
              />
            </div>
          </div>
        </div>
        <section className="flex overflow-hidden py-14">
          <motion.div
            animate={{ translateX: `-${currentFormStage * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="flex-1 min-w-full"
          >
            <UserForm
              handleNextFormStage={handleNextFormStage}
              handlePreviousFormStage={handlePreviousFormStage}
              handleCreateUser={handleCreateUser}
              setErrorDialog={setErrorDialog}
              setErrorTitle={setErrorTitle}
              setErrorMessage={setErrorMessage}
            />
          </motion.div>
          <motion.div
            animate={{ translateX: `-${currentFormStage * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="flex-1 min-w-full"
          >
            <HouseForm
              handleNextFormStage={handleNextFormStage}
              handlePreviousFormStage={handlePreviousFormStage}
              handleCreateHouse={handleCreateHouse}
            />
          </motion.div>
          <motion.div
            animate={{ translateX: `-${currentFormStage * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="flex-1 min-w-full"
          >
            <DevicesForm
              handlePreviousFormStage={handlePreviousFormStage}
              handleNextFormStage={handleNextFormStage}
              handleCreateNativeBackend={handleCreateNativeBackend}
            />
          </motion.div>
          <motion.div
            animate={{ translateX: `-${currentFormStage * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="flex-1 min-w-full"
          >
            <ConfirmForm
              handlePreviousFormStage={handlePreviousFormStage}
              handleSetup={handleSetup}
            />
          </motion.div>
        </section>
        <ErrorDialog
          show={errorDialog}
          handleErrorDialog={handleErrorDialog}
          title={errorTitle}
          message={errorMessage}
        />
        {mutationSetup.isLoading && <Loading />}
      </div>
    </>
  );
};

export default SignupPage;
