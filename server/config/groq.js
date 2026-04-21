const Groq =require( "groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const askGroq = async (systemPrompt, userMessage) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",  // ✅ Free model with 14,400 requests/day
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "Sorry, I couldn't respond.";
    
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error(error.message);
  }
};
module.exports=askGroq