import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_URL = "https://api.klap.video/v2";
const API_KEY = "kak_l6ID7QnlRuAdxo9mnpGBzpSP"; // 🔑 Ta clé API

app.all("/*", async (req, res) => {
  try {
    const url = `${API_URL}${req.path}`;
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Proxy Klap actif");
});
