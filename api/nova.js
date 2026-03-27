export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    // TEMP CORE RESPONSE (replace later with AI logic)
    return res.status(200).json({
      reply: `Nova received: ${message}`
    });

  } catch (err) {
    return res.status(500).json({
      reply: "System error"
    });
  }
}
