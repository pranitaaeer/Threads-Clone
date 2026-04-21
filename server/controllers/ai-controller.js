const askGroq = require("../config/groq");

 const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    const systemPrompt = `
You are an AI assistant inside a Threads-like social media app.

Rules:
- Keep answers short and natural
- Use simple English/Hinglish if needed
- Help with coding, captions, posts, chat replies
- Be friendly and modern
`;

    const reply = await askGroq(systemPrompt, message);

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error. Please try again.",
      err:error.message
    });
  }
};

module.exports=chatWithBot