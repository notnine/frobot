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

## 📦 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/your-username/virtual-friend-chatbot.git
cd virtual-friend-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your OpenAI API Key**
Create a `.env` file in the root:
```
VITE_OPENAI_API_KEY=your-api-key-here
```

4. **Run locally**
```bash
npm run dev
```

5. **Deploy on Netlify**
- Push to GitHub
- Connect repo to Netlify
- Set `VITE_OPENAI_API_KEY` in Netlify environment variables

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
GNU
---

## 🙌 Acknowledgements

Built as a quick MVP and portfolio project. Inspired by conversational AI tools and customer support bots.

