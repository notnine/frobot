# 📘 Project Context: Virtual Friend Chatbot

## 🧠 What is this?

**Frobot** is a lightweight web application built with **React**, designed to simulate a friendly, conversational AI companion. Users can select a "friend personality" and chat with it through a simple interface. The app connects to the **OpenAI API** (ChatGPT) for generating responses.

---

## 🎯 Goal

Create a **minimal** and **deployable MVP** chatbot that:
- Runs fully in the browser with a simple UI
- Uses the OpenAI API to generate responses
- Lets users select different "friend" personalities
- Limits how many messages a user can send per hour (token-based rate limiting)
- Is **easy to extend**, maintain, and understand

---

## 🧰 Tech Stack

- **React** – Frontend UI
- **Netlify** – Hosting + Serverless Functions
- **OpenAI API** – AI-generated responses
- **JavaScript** – Core programming language
- **localStorage** – Client-side rate limiting

---

## 🧑‍💻 For Developers

### Structure
- `App.jsx` — Main UI logic
- `components/ChatWindow.jsx` — Renders chat messages
- `components/ChatMessage.jsx` — Renders individual messages
- `components/MessageInput.jsx` — Input form for user messages
- `utils/rateLimit.js` — Handles token-based rate limiting
- `netlify/functions/chat.js` — Serverless function to talk to OpenAI API

### How to Run
1. Clone the repo
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenAI API key:  
   `OPENAI_API_KEY=your_api_key_here`
4. Run the app locally: `npm run dev`
5. Deploy to Netlify with environment variables properly set

### Personalities
Each friend "personality" has a custom system prompt:
- **Supportive**: Kind, uplifting, encouraging
- **Funny**: Makes jokes, lighthearted
- **Honest**: Direct, no sugar-coating

These are defined in the serverless function and sent with the user's message to the API.

### Rate Limiting

To control costs with OpenAI GPT-3.5, users are limited to:

- **8,000 tokens/hour** (approximately 50 messages)
- Visual feedback with usage bars and remaining token counts

Tokens are **estimated client-side** (approx. 4 characters per token) and tracked using `localStorage`. The rate limit automatically resets every hour.

Token counting includes both:
- The user's input messages
- The AI's response messages

---

## 🚀 Why This Exists

This project was created as a quick proof-of-concept to:
- Demonstrate React web skills
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
- Dark/light theme toggle

---

## 📄 License
LGPL-2.1

---

This file gives you all the context you need to **understand**, **run**, and **extend** this project. Perfect for new contributors or quick MVP handoff.
