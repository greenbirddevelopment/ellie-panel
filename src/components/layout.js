import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "./Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="App lg:my-24 overflow-hidden">
      <Container
        className={
          "lg:border lg:rounded lg:shadow lg:py-24 lg:px-16 overflow-hidden"
        }
      >
        <header className="mb-12 flex justify-center items-center ">
          <Container
            className={"relative flex items-center justify-center !w-full"}
          >
            {location.pathname !== "/home" && location.pathname !== "/" && (
              <Link
                to={"/"}
                className={
                  "absolute flex items-center gap-2 left-0 top-0 cursor-pointer back"
                }
              >
                <FontAwesomeIcon icon={faAngleLeft} size="lg" className="" />
                <span className="font-bold">Back</span>
              </Link>
            )}
            <section className="text-center ellie-header">
              <h1 id="brand" className="text-6xl">
                <Link to={"/"}>ELLIE</Link>
              </h1>
              <p className="text-sm text-gray-500 font-semibold">
                Smart Home Systems
              </p>
            </section>
          </Container>
        </header>
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default Layout;
