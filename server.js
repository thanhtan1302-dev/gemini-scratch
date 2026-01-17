import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDHvCQd19WNOBeXQZRpgBvlABMOtNcjQqI",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.body.prompt }] }]
        })
      }
    );

    const data = await r.json();

    res.json({
      answer: data.candidates?.[0]?.content?.parts?.[0]?.text
        || "Gemini không trả lời"
    });

  } catch (e) {
    res.json({ answer: "Lỗi server" });
  }
});

app.listen(3000, () =>
  console.log("Server chạy tại http://localhost:3000")
);
