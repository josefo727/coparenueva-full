import axios from 'axios';

const API_URL = `${process.env.SERVER_API_HOST}/api/`;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return token;
  } catch (error) {
    throw new Error('Error al autenticar usuario');
  }
}

const logout = async () => {
  try {
    await axios.post(`${API_URL}logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    throw new Error('Error al cerrar sesión');
  }
}

const isAuthenticated = () => !!localStorage.getItem('token');

const user = () => JSON.parse(localStorage.getItem('user'));

export {
    login,
    logout,
    user,
    isAuthenticated,
}
