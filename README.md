# Frobot - Your Virtual Friend Chatbot

Frobot is a responsive web-based chatbot built with React and powered by OpenAI's API. Talk to your virtual friend with different personality options!

## Features

- **Multiple Personalities**: Chat with Frobot in three different modes:
  - Supportive: A encouraging friend who's always on your side
  - Funny: A witty companion with a great sense of humor
  - Honest: A straightforward friend who tells it like it is

- **Responsive Design**: Clean chat interface that works on mobile and desktop
  - Fixed header and input area
  - Scrollable chat history

- **Token-Based Rate Limiting**: 
  - 8000 tokens per hour (~50 messages)
  - Visual feedback with usage bars and remaining token counts
  - Automatic reset after one hour

- **Debug Mode**:
  - Toggle to view detailed token usage statistics
  - Per-message token information
  - Usage summary panel

## Technical Implementation

- **Frontend**: React.js
- **API Integration**: OpenAI Chat API via Netlify serverless functions
- **Deployment**: Netlify
- **Security**: API keys stored in environment variables

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is set up for deployment on Netlify:

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Add your environment variable (OPENAI_API_KEY) in the Netlify dashboard

## License

[LGPL-2.1](LICENSE)
