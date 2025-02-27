const PROTOCOL = "http://";
const HOST = "192.168.1.10";
const PORT = "8080";

const URL = `${PROTOCOL}${HOST}:${PORT}`;

async function login(email, password) {
  try {
    const response = await fetch(`${URL}/customer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Aquí se envía el body, reemplaza los datos según lo que necesites enviar
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error con el status
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error al consumir el endpoint:", error);
  }
}

async function register(fullName ,email, password) {
  try {
    const response = await fetch(`${URL}/customer/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Aquí se envía el body, reemplaza los datos según lo que necesites enviar
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error con el status
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error al consumir el endpoint:", error);
  }
}