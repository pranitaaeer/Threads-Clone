import { Box, IconButton, Stack, TextField, Typography, Paper, useMediaQuery } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { useChatwithaiMutation } from "../../redux/service";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  
  const isMobile = useMediaQuery("(max-width: 899px)");
  const [chatWithAI, { isLoading }] = useChatwithaiMutation();

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChat = () => {
    setOpen(!open);
    if (!open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSend = async () => {
    if (!msg.trim() || isLoading) return;

    const userMessage = msg.trim();

    setChat((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      { sender: "bot", text: "Typing...", isLoading: true },
    ]);
    setMsg("");

    try {
      const response = await chatWithAI({ message: userMessage }).unwrap();
      
      setChat((prev) => {
        const newChat = [...prev];
        newChat.pop();
        return [...newChat, { sender: "bot", text: response.reply || response }];
      });
    } catch (error) {
      setChat((prev) => {
        const newChat = [...prev];
        newChat.pop();
        return [...newChat, { 
          sender: "bot", 
          text: "⚠️ Sorry, I'm having trouble responding. Please try again.",
          isError: true 
        }];
      });
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Box
        position="fixed"
        bottom={isMobile ? 75 : 22}  // ✅ Mobile mein upar, desktop mein neeche
        right={22}
        zIndex={9999}
        sx={{
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <IconButton
          onClick={toggleChat}
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            width: 56,
            height: 56,
            boxShadow: 3,
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          <FaRobot size={24} />
        </IconButton>
      </Box>

      {/* Chat Box */}
      {open && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: isMobile ? 80 : 90,  // ✅ Mobile mein upar
            right: 20,
            width: { xs: "calc(100% - 40px)", sm: 360 },
            maxWidth: 400,
            height: isMobile ? 450 : 500,  // ✅ Mobile mein thoda chota
            maxHeight: "calc(100% - 100px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 3,
            zIndex: 9998,
            animation: "slideUp 0.3s ease-out",
            "@keyframes slideUp": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <FaRobot size={22} />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                AI Assistant
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              🤖 Groq AI
            </Typography>
          </Box>

          {/* Messages Area */}
          <Stack
            flex={1}
            sx={{
              p: 2,
              overflowY: "auto",
              backgroundColor: "#fafafa",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c1c1c1",
                borderRadius: "3px",
                "&:hover": {
                  backgroundColor: "#a8a8a8",
                },
              },
            }}
          >
            {chat.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 4,
                  color: "text.secondary",
                }}
              >
                <FaRobot size={48} style={{ opacity: 0.5, marginBottom: 8 }} />
                <Typography variant="body2">
                  Hello! 👋 I'm your AI assistant. Ask me anything!
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: "block", color: "text.disabled" }}>
                  Powered by Groq AI
                </Typography>
              </Box>
            )}

            {chat.map((c, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: c.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: "80%",
                    borderRadius: 2,
                    bgcolor: c.sender === "user" ? "#1976d2" : "white",
                    color: c.sender === "user" ? "white" : "text.primary",
                    border: c.sender === "bot" ? "1px solid #e0e0e0" : "none",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body2">
                    {c.isLoading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <span>Thinking</span>
                        <span>.</span><span>.</span><span>.</span>
                      </Box>
                    ) : (
                      c.text
                    )}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Stack>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "white",
              flexShrink: 0,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                inputRef={inputRef}
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#f5f5f5",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!msg.trim() || isLoading}
                sx={{
                  bgcolor: msg.trim() && !isLoading ? "#1976d2" : "#e0e0e0",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    bgcolor: msg.trim() && !isLoading ? "#1565c0" : "#e0e0e0",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#e0e0e0",
                    color: "rgba(0,0,0,0.26)",
                  },
                }}
              >
                <IoMdSend size={18} />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;