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
        <header className="relative mb-12 flex justify-center items-center text-center">
          <section className="absolute top-1/2 left-0 -translate-y-1/2">
            {location.pathname !== "/home" && location.pathname !== "/" && (
              <Link
                to={"/"}
                className={
                  " flex items-center gap-2 left-0 top-0 cursor-pointer"
                }
              >
                <FontAwesomeIcon icon={faAngleLeft} size="lg" className="" />
                <span className="font-bold">Back</span>
              </Link>
            )}
          </section>
          <section id="brand">
            <h1 className="text-6xl">
              <Link to={"/"}>ELLIE</Link>
            </h1>
            <p className="text-sm text-gray-500 font-semibold ">
              Smart Home Systems
            </p>
          </section>
        </header>
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default Layout;
