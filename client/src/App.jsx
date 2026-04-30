import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Protected/Home";
import ProfileLayout from "./pages/Protected/profile/ProfileLayout";
import Replies from "./pages/Protected/profile/Replies";
import Repost from "./pages/Protected/profile/Repost";
import Threads from "./pages/Protected/profile/Threads";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";
import Search from "./pages/Protected/Search";
import Register from "./pages/Register";
import SinglePost from "./pages/Protected/SinglePost";
import { useMyInfoQuery } from "./redux/service";
import ChatBot from "./components/home/chatbot";

const App = () => {
  const { darkMode, myInfo } = useSelector((state) => state.service);
  
  // Only fetch if we don't have myInfo in Redux
  const { isLoading } = useMyInfoQuery(undefined, {
    skip: !!myInfo // Skip if we already have user data
  });

  // Check authentication from Redux state, not from query
  const isAuthenticated = !!myInfo;

  // Show loading state if needed
  if (isLoading && !myInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Box minHeight={"100vh"} className={darkMode ? "mode" : ""}>
      <BrowserRouter>
        <ChatBot />
        <Routes>
          {/* Public routes - NO navbar */}
          <Route path="/login" element={<Register />} />
          
          {/* Protected routes - WITH navbar */}
          <Route path="/" element={
            isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<SinglePost />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<ProfileLayout />}>
              <Route path="threads/:id" element={<Threads />} />
              <Route path="replies/:id" element={<Replies />} />
              <Route path="reposts/:id" element={<Repost />} />
            </Route>
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;