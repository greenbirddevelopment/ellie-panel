import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/ui/Spinner";
import Input from "../components/ui/Input";
import HttpRequest from "../utils/HttpRequest";

const searchUsers = (username) =>
  new HttpRequest("cloud").get(`users/search/${username}`, username);

const SearchPage = () => {
  const navigate = useNavigate();

  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  const [searchValue, setSearchValue] = useState("");

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["getUser", searchValue],
    queryFn: () => {
      if (searchValue.length >= 1) return searchUsers(searchValue);
    },
    enabled: searchValue.length >= 1,
  });

  useEffect(() => {
    if (!currentUser) navigate("/home");
  }, [currentUser, navigate]);

  return (
    <>
      <Input
        type={"text"}
        name={"search"}
        placeholder={"Search a user"}
        icon={
          <FontAwesomeIcon
            icon={faSearch}
            size={"lg"}
            className="text-gray-500"
          />
        }
        label={"Search a user"}
        iconPosition={"right"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="mt-8">
        {isUsersLoading && (
          <center>
            <Spinner />
          </center>
        )}
        {users &&
          users?.status === "success" &&
          users?.data?.users &&
          users?.data?.users?.length >= 1 &&
          users?.data?.users?.map((user) => (
            <Link
              to={`/user/${user.username}`}
              className="flex text-center items-center justify-center rounded py-4 hover:bg-gray-200 gap-2"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>{user.username}</span>
            </Link>
          ))}
      </div>
    </>
  );
};

export default SearchPage;
