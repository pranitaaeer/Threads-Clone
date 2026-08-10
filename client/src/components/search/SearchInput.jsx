import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchedUsers } from "../../redux/slice";
import { Bounce, toast } from "react-toastify";

const SearchInput = () => {
  const { darkMode } = useSelector((state) => state.service);
  const [query, setQuery] = useState("");
  const [searchUser, searchUserData] = useLazySearchUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        searchUser(query);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [query, searchUser]);

  // Handle API Response
  useEffect(() => {
    if (searchUserData.isSuccess && searchUserData.data) {
      dispatch(addToSearchedUsers(searchUserData.data.users));
    }
    if (searchUserData.isError && searchUserData.error) {
      toast.error(searchUserData.error.data?.msg || "Something went wrong", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [searchUserData.isSuccess, searchUserData.isError, searchUserData.data, searchUserData.error, dispatch]);

  return (
    <>
      <TextField
        sx={{
          width: "90%",
          maxWidth: "750px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            color: darkMode ? "whitesmoke" : "black",
            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search user..."
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ color: darkMode ? "whitesmoke" : "black" }}
            >
              <FaSearch />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchInput;