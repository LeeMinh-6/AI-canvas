export default async function handler(req, res) {
  // Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Lấy API key từ "biến môi trường" (environment variable)
  // → key được giữ bí mật trên server, không ai đọc được
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  // Chuyển tiếp yêu cầu sang Google Gemini
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}