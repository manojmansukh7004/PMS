
async function attemptLogin(payload, baseUrl) {

  const formBody = JSON.stringify(payload, (key, value) => {
    if (value !== null) {      
      return value;
    }
    return {};
  });

  const response = await fetch(`${baseUrl}/api/Login/CheckLoginDetails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formBody,
  });
  
  const responseJson = await response.json();
  
  return responseJson;
}

export { attemptLogin };
