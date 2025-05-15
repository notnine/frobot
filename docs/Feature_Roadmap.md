# 🛠️ Feature Roadmap: "Virtual Friend Chatbot" (React + OpenAI + Netlify)

## ✅ Phase 1: Core Chat App (React UI)
> 🕐 Estimated time: 2–3 hours

- [x] Basic UI layout with a chat window and input field  
- [x] Display messages from user and AI in a scrollable chat log  
- [x] Allow user to type and send messages  
- [x] Simple responsive design (mobile + desktop)

## ✅ Phase 2: OpenAI API Integration (ChatGPT)
> 🕐 Estimated time: 2 hours

- [x] Connect frontend to a lightweight serverless function (e.g., Netlify Functions) or backend proxy to call OpenAI's API  
- [x] Send user's message + personality prompt to OpenAI  
- [x] Display streaming or full response in the chat  
- [x] Handle loading state (e.g., “typing…” indicator)

## ✅ Phase 3: Friend Personality Selection
> 🕐 Estimated time: 1 hour

- [x] Add a personality dropdown or modal before starting chat (e.g., “Supportive Friend”, “Funny Friend”, “Honest Friend”)  
- [x] Use a predefined system prompt for each personality  
- [x] Store selected personality in app state for ongoing conversation

Example:
```js
const personalities = {
  supportive: "You are a kind and supportive friend...",
  funny: "You are a witty and humorous friend...",
  honest: "You are a brutally honest friend...",
};
```

## ✅ Phase 4: Rate Limiting (Client-Side MVP)
> 🕐 Estimated time: 1–1.5 hours

- [x] Limit to X messages/hour (e.g., 10) using localStorage timestamp tracking  
- [x] Show message like “You’ve reached your limit, come back in XX minutes”  
- [x] Reset counter after 1 hour

💡 Note: True secure rate limiting requires a backend with user auth or IP tracking, but for MVP, client-side is acceptable.

## ✅ Phase 5: Netlify Deployment
> 🕐 Estimated time: 30 mins

- [x] Set up Netlify project with GitHub repo  
- [x] Add environment variables for OpenAI API key  
- [x] Deploy React frontend and serverless function (Netlify Functions)  
- [x] Test live version and fix deployment bugs

## 💎 Nice-to-Have (Post-MVP)
- [ ] Persist chat history using localStorage
- [ ] Add avatars for friend personalities  
- [ ] Use framer-motion for smooth animations  
- [ ] Add light/dark theme toggle  
- [ ] Replace local rate limiting with backend (e.g., Redis or Firebase-based)
