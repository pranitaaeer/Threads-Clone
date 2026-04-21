// import { Grid, Stack, useMediaQuery } from "@mui/material";
// import Navbar from "./Navbar";
// import { IoMenu } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleMainMenu } from "../../redux/slice";

// const Header = () => {
//   const { darkMode } = useSelector((state) => state.service);
//   const _700 = useMediaQuery("(min-width:700px)");

//   const dispatch = useDispatch();

//   const handleOpenMenu = (e) => {
//     dispatch(toggleMainMenu(e.currentTarget));
//   };

//   return (
//     <>
//       {_700 ? (
//         <Stack
//           flexDirection={"row"}
//           height={52}
//           justifyContent={"space-around"}
//           alignItems={"center"}
//           position={"sticky"}
//           top={0}
//           py={1}
//         >
//           {darkMode ? (
//             <img
//               src="/Threads-logo-black-bg.webp"
//               alt="logo"
//               width={60}
//               height={50}
//             />
//           ) : (
//             <img
//               src="/Threads-logo-white-bg.png"
//               alt="logo"
//               width={60}
//               height={35}
//             />
//           )}
//           <Stack
//             justifyContent={"center"}
//             width={"550px"}
//             bgcolor={darkMode ? "" : "aliceblue"}
//             zIndex={2}
//             height={96}
//           >
//             <Navbar />
//           </Stack>
//           <IoMenu
//             size={36}
//             className="image-icon"
//             color="gray"
//             onClick={handleOpenMenu}
//           />
//         </Stack>
//       ) : (
//         <>
//           <Stack
//             position={"fixed"}
//             bottom={0}
//             justifyContent={"center"}
//             width={"100%"}
//             height={52}
//             p={1}
//             bgcolor={"aliceblue"}
//             zIndex={2}
//           >
//             <Navbar />
//           </Stack>
//           <Grid
//             container
//             height={60}
//             justifyContent={"flex-end"}
//             alignItems={"center"}
//             p={1}
//           >
//             <Grid item xs={6}>
//               <img
//                 src="/Threads-logo-white-bg.png"
//                 alt="logo"
//                 width={60}
//                 height={35}
//               />
//             </Grid>
//             <IoMenu size={36} className="image-icon" color="gray" />
//           </Grid>
//         </>
//       )}
//     </>
//   );
// };

// export default Header;
import { Grid, Stack, useMediaQuery, Box } from "@mui/material";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";
import { FaThreads } from "react-icons/fa6"; // Threads icon

const Header = () => {
  const { darkMode } = useSelector((state) => state.service);
  const isMobile = useMediaQuery("(max-width: 899px)");

  const dispatch = useDispatch();

  const handleOpenMenu = (e) => {
    dispatch(toggleMainMenu(e.currentTarget));
  };

  // Desktop Header
  if (!isMobile) {
    return (
      <>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 999,
            backgroundColor: darkMode ? "#000000" : "#ffffff",
            borderBottom: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              px: 2,
              py: 1,
            }}
          >
            {/* Logo Section - Text Only */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <FaThreads 
                size={28} 
                color={darkMode ? "white" : "#1976d2"} 
              />
              <span 
                style={{ 
                  fontWeight: 700,
                  color: darkMode ? "white" : "black",
                  fontSize: "1.3rem",
                  fontFamily: "sans-serif"
                }}
              >
                Threads
              </span>
            </Stack>

            {/* Navbar */}
            <Box sx={{ flex: 1, maxWidth: "500px", mx: 2 }}>
              <Navbar />
            </Box>

            {/* Menu Icon */}
            <IoMenu
              size={32}
              color={darkMode ? "white" : "gray"}
              onClick={handleOpenMenu}
              style={{ cursor: "pointer" }}
            />
          </Stack>
        </Box>
      </>
    );
  }

  // Mobile Header
  return (
    <>
      <Grid
        container
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          borderBottom: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
          py: 1,
          px: 2,
        }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FaThreads 
              size={24} 
              color={darkMode ? "white" : "#1976d2"} 
            />
            <span 
              style={{ 
                fontWeight: 600,
                color: darkMode ? "white" : "black",
                fontSize: "1.1rem"
              }}
            >
              Threads
            </span>
          </Stack>
        </Grid>
        <Grid item>
          <IoMenu 
            size={28} 
            color={darkMode ? "white" : "gray"}
            onClick={handleOpenMenu}
            style={{ cursor: "pointer" }}
          />
        </Grid>
      </Grid>
      
      <Navbar />
      <Box sx={{ height: "65px" }} />
    </>
  );
};

export default Header;