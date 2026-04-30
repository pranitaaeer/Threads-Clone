import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // Dark mode state from Redux
  const { darkMode } = useSelector((state) => state.service);

  const toggleLogin = () => {
    setLogin((pre) => !pre);
  };

  const handleLogin = async () => {
    const data = { email, password };
    await loginUser(data);
  };

  const handleRegister = async () => {
    const data = { userName, email, password };
    await signinUser(data);
  };

  useEffect(() => {
    if (signinUserData.isSuccess) {
      toast.success(signinUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: darkMode ? "dark" : "colored", // Theme aware toast
        transition: Bounce,
      });
    }
    if (signinUserData.isError) {
      toast.error(signinUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: darkMode ? "dark" : "colored",
        transition: Bounce,
      });
    }
  }, [signinUserData.isSuccess, signinUserData.isError, darkMode]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: darkMode ? "dark" : "colored",
        transition: Bounce,
      });
      navigate("/");
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: darkMode ? "dark" : "colored",
        transition: Bounce,
      });
    }
  }, [loginUserData.isSuccess, loginUserData.isError, darkMode]);

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"} bgcolor={darkMode ? "#121212" : "white"}>
        <Loading />
      </Stack>
    );
  }

  // Common styles for TextFields in Dark Mode
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: darkMode ? "white" : "inherit",
      "& fieldset": { borderColor: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.23)" },
      "&:hover fieldset": { borderColor: darkMode ? "white" : "rgba(0,0,0,0.87)" },
    },
    "& .MuiInputBase-input::placeholder": {
      color: darkMode ? "rgba(255,255,255,0.7)" : "inherit",
      opacity: 1,
    },
  };

  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          bgcolor: darkMode ? "#121212" : "white", // Background color change
          transition: "background-color 0.3s ease",
          ...(_700 && {
            backgroundImage: 'url("/register-bg.webp")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 600px",
          })
        }}
      >
        <Stack
          flexDirection={"column"}
          width={_700 ? "40%" : "90%"}
          gap={2}
          mt={_700 ? 20 : 0}
        >
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
            color={darkMode ? "white" : "black"} // Text color change
          >
            {login ? " Login with email" : " Register with email"}
          </Typography>

          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your userName..."
              onChange={(e) => setUserName(e.target.value)}
              sx={inputStyles}
            />
          )}
          <TextField
            variant="outlined"
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
            sx={inputStyles}
          />
          <TextField
            variant="outlined"
            type="password"
            placeholder="Enter your Password..."
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyles}
          />

          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: darkMode ? "#1db954" : "green", // Slightly different green for dark mode
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "blue",
                cursor: "pointer",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Login" : "  Sign Up"}
          </Button>

          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1.3rem" : "1rem"}
            alignSelf={"center"}
            color={darkMode ? "rgba(255,255,255,0.7)" : "black"} // Subtitle color change
          >
            {login ? "Don't have an account ?" : " Already have an account ?"}
            <span 
              className="login-link" 
              onClick={toggleLogin}
              style={{ color: darkMode ? "#4dabf5" : "blue", cursor: "pointer", marginLeft: "5px" }}
            >
              {login ? "Sign up" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;