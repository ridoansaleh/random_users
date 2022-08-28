import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./sections/Filter";
import Users from "./sections/Users";
import { fetchUsers } from "./redux/userSlice";
import { isInclude } from "./utils";

function App() {
  const hasRendered = useRef(false);
  const [filters, setFilters] = useState({
    search: "",
    gender: "all",
  });
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  // const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (hasRendered.current === false && userStatus === "idle") {
      dispatch(fetchUsers());
    }
    hasRendered.current = true;
  }, [userStatus, dispatch]);

  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  useEffect(() => {
    if (users.length === 0) return;
    if (filters.search === "" && filters.gender === "") return;
    let keyword = filters.search;
    let selectedGender =
      filters.gender === "all" ? ["male", "female"] : [filters.gender];
    const filteredUsers = users.filter((user) => {
      return (
        (isInclude(user.username, keyword) ||
          isInclude(user.name, keyword) ||
          isInclude(user.email, keyword) ||
          isInclude(user.registered_date, keyword)) &&
        selectedGender.includes(user.gender)
      );
    });
    setDisplayedUsers(filteredUsers);
  }, [users, filters]);

  return (
    <main>
      <h1>Random Users</h1>
      <Filter filters={filters} onSetFilters={setFilters} />
      <Users loading={userStatus !== "succeeded"} data={displayedUsers} />
    </main>
  );
}

export default App;
