# 🤖 Virtual Friend Chatbot

A minimal React web app that lets users chat with an AI-powered virtual friend. Choose from different personalities like **Supportive**, **Funny**, or **Honest** — powered by the OpenAI ChatGPT API.

Deployed on **Netlify**, this project is designed as a fast, simple, and skimmable MVP — perfect for showcasing frontend skills and conversational UI integration.

---

## 🚀 Features

- 🧠 Chat with an AI "friend"
- 🎭 Choose different personalities (Supportive, Funny, Honest)
- 💬 Simple chat interface with real-time replies
- ⏱️ Client-side rate limiting (10 messages/hour)
- 🌐 Deployed with Netlify
- 🧩 Easy to extend and customize

---

## 🧰 Tech Stack

- React (Vite)
- JavaScript
- OpenAI API (ChatGPT)
- Netlify + Netlify Functions
- Tailwind CSS (optional)
- localStorage (for rate limiting)

---

## 💡 Personalities

Each personality uses a different system prompt:

```js
const personalities = {
  supportive: "You are a kind and supportive friend...",
  funny: "You are a witty and humorous friend...",
  honest: "You are a brutally honest friend...",
};
```

---

## 🛡️ Rate Limiting

To manage costs, this app limits each user to:
- **25,000 tokens/hour**
- **20 API calls/hour**

Tokens are estimated by word count × 1.5 and stored in `localStorage`. This helps keep each user under **$0.10/hour** based on OpenAI GPT-3.5 pricing.

---

## 🧪 Future Improvements

- Save chat history
- Add more personalities
- Animate bot replies
- Add dark/light theme toggle
- Backend-authenticated rate limiting

---

## 📄 License

MIT

---

## 🙌 Acknowledgements

Built as a quick MVP and portfolio project. Inspired by conversational AI tools and customer support bots.

