import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";

const HomePage = () => {
  const currentUserState = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const handleNavigate = (route) => navigate(route);

  const { currentUser } = currentUserState;

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser, navigate]);

  return (
    <>
      <div className="mb-4">
        <Button
          type={"button"}
          variant={"light"}
          className={"w-full py-4 lg:py-8"}
          onClick={() => handleNavigate("/signup")}
        >
          Signup a user
        </Button>
      </div>
      <div>
        <Button
          type={"button"}
          variant={"light"}
          className={"w-full py-4 lg:py-8"}
          onClick={() => handleNavigate("/search")}
        >
          Update an house
        </Button>
      </div>
    </>
  );
};

export default HomePage;
