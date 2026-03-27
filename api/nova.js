export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
  }

  return res.status(200).json({
    reply: `Nova: ${message}`
  });
}
