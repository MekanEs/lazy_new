export async function handler(event) {
  const { username, password } = JSON.parse(event.body || '{}');

  // Важно: VITE_USER и VITE_PASS должны быть установлены в переменных окружения Netlify
  const expectedUser = process.env.VITE_USER;
  const expectedPass = process.env.VITE_PASS;

  if (username === expectedUser && password === expectedPass) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: 'Unauthorized' }),
  };
} 