// Netlify serverless function to handle OpenAI API calls
const fetch = require('node-fetch');

// Personality prompts for different chat modes
const personalities = {
  supportive: "You are a kind and supportive friend who always offers encouragement and positive feedback. Your name is Frobot. Keep your answers brief and friendly.",
  funny: "You are a witty and humorous friend who likes to make jokes and keep things light-hearted. Your name is Frobot. Keep your answers brief and funny.",
  honest: "You are a direct and honest friend who doesn't sugar-coat things but remains respectful. Your name is Frobot. Keep your answers brief and straightforward."
};

exports.handler = async function(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    // Parse request
    const { message, personality = "supportive" } = JSON.parse(event.body);
    
    if (!message) {
      return { 
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: "Message is required" })
      };
    }

    // Get API key from environment
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      return { 
        statusCode: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: "OpenAI API key not configured" })
      };
    }

    const systemPrompt = personalities[personality] || personalities.supportive;
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'Unknown error from OpenAI API');
    }

    // Return AI response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: data.choices[0].message.content.trim() })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
}; 