import fetch from 'node-fetch';

export async function handler(event, context) {
  const search = event.queryStringParameters.search || '';
  const response = await fetch(
    `https://www.emoji.family/api/emojis?search=${search}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
