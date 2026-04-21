// import { Stack, useMediaQuery } from "@mui/material";
// import { GoHome } from "react-icons/go";
// import { IoIosSearch } from "react-icons/io";
// import { TbEdit } from "react-icons/tb";
// import { CiHeart } from "react-icons/ci";
// import { RxAvatar } from "react-icons/rx";
// import { FiArrowLeft } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addPostModal } from "../../redux/slice";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   console.log("myinfo",myInfo);
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _700 = useMediaQuery("(min-width:700px)");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showArrow, setShowArrow] = useState(false);

//   const checkArrow = () => {
//     if (window.location.pathname.includes("/post/") && _700) {
//       setShowArrow(true);
//       return;
//     }
//     setShowArrow(false);
//   };

//   const handleAddPost = () => {
//     dispatch(addPostModal(true));
//   };

//   const handleNavigate = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     checkArrow();
//   }, [window.location.pathname]);

//   return (
//     <>
//       <Stack
//         flexDirection={"row"}
//         maxWidth={"100%"}
//         justifyContent={"space-around"}
//         alignItems={"center"}
//       >
//         {showArrow ? (
//           <FiArrowLeft
//             size={_300 ? 32 : 24}
//             className="image-icon"
//             onClick={handleNavigate}
//             color={darkMode ? "white" : "black"}
//           />
//         ) : null}
//         <Link to={"/"} className="link">
//           <GoHome size={_300 ? 32 : 24} color={darkMode ? "white" : "black"} />
//         </Link>
//         <Link to={"/search"} className="link">
//           <IoIosSearch
//             size={_300 ? 32 : 24}
//             color={darkMode ? "white" : "black"}
//           />
//         </Link>
//         <TbEdit
//           size={_300 ? 32 : 24}
//           className="image-icon"
//           color={darkMode ? "white" : "black"}
//           onClick={handleAddPost}
//         />
//         <CiHeart size={_300 ? 32 : 24} color={darkMode ? "white" : "black"} />
//         <Link to={`/profile/threads/${myInfo?._id}`} className="link">
//           {
//             myInfo?.profilePic ? (
//               <img
//                 src={myInfo.profilePic}
//                 alt="avatar"
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                 }}
//               />
//             ) : (
//               <RxAvatar
//                 size={_300 ? 32 : 24}
//                 color={darkMode ? "white" : "black"}
//               />
//             )
//           }
//         </Link>
//       </Stack>
//     </>
//   );
// };

// export default Navbar;
import * as React from 'react';
import { 
  Stack, 
  useMediaQuery, 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  Typography 
} from "@mui/material";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPostModal } from "../../redux/slice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { darkMode, myInfo } = useSelector((state) => state.service);
  const isMobile = useMediaQuery("(max-width: 899px)");
  const _700 = useMediaQuery("(min-width:700px)");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showArrow, setShowArrow] = useState(false);
  const [value, setValue] = useState(0);

  const checkArrow = () => {
    if (window.location.pathname.includes("/post/") && _700) {
      setShowArrow(true);
      return;
    }
    setShowArrow(false);
  };

  const handleAddPost = () => {
    dispatch(addPostModal(true));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    checkArrow();
    if (location.pathname === "/") setValue(0);
    else if (location.pathname === "/search") setValue(1);
    else if (location.pathname.includes("/profile")) setValue(4);
    else if (location.pathname.includes("/notifications")) setValue(3);
  }, [location.pathname, _700]);

  // ========== DESKTOP NAVBAR (Horizontal) ==========
  if (!isMobile) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          width: "100%",
          py: 1,
        }}
      >
        {showArrow ? (
          <FiArrowLeft
            size={28}
            onClick={handleNavigate}
            color={darkMode ? "white" : "#1976d2"}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Box sx={{ width: 28 }} />
        )}
        
        <Link to={"/"} className="link">
          <GoHome 
            size={26} 
            color={location.pathname === "/" ? "#1976d2" : (darkMode ? "white" : "#666")}
          />
        </Link>
        
        <Link to={"/search"} className="link">
          <IoIosSearch 
            size={26} 
            color={location.pathname === "/search" ? "#1976d2" : (darkMode ? "white" : "#666")}
          />
        </Link>
        
        <TbEdit
          size={26}
          color={darkMode ? "white" : "#666"}
          onClick={handleAddPost}
          style={{ cursor: "pointer" }}
        />
        
        <Link to={"/notifications"} className="link">
          {location.pathname === "/notifications" ? (
            <FaHeart size={22} color="#1976d2" />
          ) : (
            <CiHeart size={26} color={darkMode ? "white" : "#666"} />
          )}
        </Link>
        
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          {myInfo?.profilePic ? (
            <img
              src={myInfo.profilePic}
              alt="avatar"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                objectFit: "cover",
                border: location.pathname.includes("/profile") ? "2px solid #1976d2" : "none",
              }}
            />
          ) : (
            <RxAvatar 
              size={30} 
              color={location.pathname.includes("/profile") ? "#1976d2" : (darkMode ? "white" : "#666")}
            />
          )}
        </Link>
      </Stack>
    );
  }

  // ========== MOBILE BOTTOM NAVIGATION ==========
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        borderTop: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
        borderRadius: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          "& .Mui-selected": {
            color: "#1976d2",
          },
          "& .MuiBottomNavigationAction-root": {
            color: darkMode ? "white" : "gray",
            minWidth: "auto",
            padding: "6px 0",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<GoHome size={22} />}
          component={Link}
          to="/"
        />
        
        <BottomNavigationAction
          label="Search"
          icon={<IoIosSearch size={22} />}
          component={Link}
          to="/search"
        />
        
        <BottomNavigationAction
          label="Post"
          icon={<TbEdit size={22} />}
          onClick={handleAddPost}
        />
        
        <BottomNavigationAction
          label="Activity"
          icon={value === 3 ? <FaHeart size={20} /> : <CiHeart size={22} />}
          component={Link}
          to="/notifications"
        />
        
        <BottomNavigationAction
          label="Profile"
          icon={
            myInfo?.profilePic ? (
              <img
                src={myInfo.profilePic}
                alt="avatar"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <RxAvatar size={22} />
            )
          }
          component={Link}
          to={`/profile/threads/${myInfo?._id}`}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;