# 📘 Project Context: Virtual Friend Chatbot

## 🧠 What is this?

**Virtual Friend Chatbot** is a lightweight web application built with **React**, designed to simulate a friendly, conversational AI companion. Users can select a "friend personality" and chat with it through a simple interface. The app connects to the **OpenAI API** (ChatGPT) for generating responses.

---

## 🎯 Goal

Create a **minimal** and **deployable MVP** chatbot that:
- Runs fully in the browser with a simple UI
- Uses the OpenAI API to generate responses
- Lets users select different "friend" personalities
- Limits how many messages a user can send per hour (rate limiting)
- Is **easy to extend**, maintain, and understand

---

## 🧰 Tech Stack

- **React** – Frontend UI
- **Netlify** – Hosting + Serverless Functions
- **OpenAI API** – AI-generated responses
- **JavaScript** – Core programming language
- **localStorage** – Client-side rate limiting
- *(Optional)* **Tailwind CSS** – Simple styling

---

## 🧑‍💻 For Developers

### Structure
- `App.jsx` — Main UI logic
- `components/ChatWindow.jsx` — Renders chat messages
- `components/MessageInput.jsx` — Input form for user messages
- `utils/personalityPrompts.js` — Maps friend types to prompts
- `functions/chat.js` — Serverless function to talk to OpenAI API

### How to Run
1. Clone the repo
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenAI API key:  
   `VITE_OPENAI_API_KEY=your-api-key`
4. Run the app locally: `npm run dev`
5. Deploy to Netlify

### Personalities
Each friend "personality" has a custom system prompt:
- **Supportive**: Kind, uplifting, encouraging
- **Funny**: Makes jokes, lighthearted
- **Honest**: Direct, no sugar-coating

These are stored in a JS object and sent with the user's message to the API.

### Rate Limiting

To control costs with OpenAI GPT-3.5, users are limited to:

- **25,000 tokens/hour**
- **20 API calls/hour**

Tokens are **estimated client-side** (approx. 1.5 tokens per word) and tracked using `localStorage`. This ensures each user costs **under $0.10/hour** based on OpenAI pricing. The rate limits reset every hour.


---

## 🚀 Why This Exists

This project was created as a quick proof-of-concept to:
- Demonstrate React web skills (relevant to Affirm job)
- Integrate AI APIs
- Simulate a basic user-friendly chatbot
- Be easy for new devs to pick up and iterate on

---

## 📦 Future Ideas (Post-MVP)
- Persist chat history
- Add user auth
- Real-time typing animations
- More personality options
- Backend-based rate limiting

---

## 📄 License
MIT (or add your preferred license)

---

This file gives you all the context you need to **understand**, **run**, and **extend** this project. Perfect for new contributors or quick MVP handoff.
