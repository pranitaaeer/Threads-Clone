import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleColorMode, toggleMainMenu, clearAuth } from "../../redux/slice";
import { useLogoutMeMutation } from "../../redux/service";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";

const MainMenu = () => {
  const { anchorE1, myInfo } = useSelector((state) => state.service);
  const navigate = useNavigate();
  const [logoutMe, logoutMeData] = useLogoutMeMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };

  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleColorMode());
  };

  const handleLogout = async () => {
    handleClose();
    await logoutMe();
  };

  useEffect(() => {
    if (logoutMeData.isSuccess) {
      // Clear Redux state
      dispatch(clearAuth());
      
      // Optionally clear localStorage if you store token there
      localStorage.removeItem('token');
      
      toast.warning(logoutMeData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      
      // Navigate to login after clearing state
      navigate("/login");
    }
    
    if (logoutMeData.isError) {
      toast.error(logoutMeData.error?.data?.msg || "Logout failed", {
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
  }, [logoutMeData.isSuccess, logoutMeData.isError, dispatch, navigate]);

  return (
    <>
      <Menu
        anchorEl={anchorE1}
        open={anchorE1 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;