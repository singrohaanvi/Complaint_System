const { GoogleGenerativeAI } = require('@google/generative-ai');

const chatbotController = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Ai ChatBot Running");

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const systemPrompt = `You are a helpful college chatbot assistant. You provide information about:
- College timings
- Department information
- Hostel information
- Library information
- Admission process
- General college information
Please provide accurate and helpful information. If asked about something outside college information, politely redirect the conversation back to college-related topics.`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: [],
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { chatbotController };