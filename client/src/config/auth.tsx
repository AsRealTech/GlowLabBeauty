import api from "./axios.jsx";

interface Credentials {
  email: string;
  password: string;
}

export const login = async (credentials: Credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }
  try {
    const res = await api.post('auth/login', credentials);
    if (!res.data || !res.data.user) {
      throw new Error('Invalid response from server');
    }
    return res.data.user;
  } catch (err) {
    console.error('Login error:', err);
    throw err instanceof Error ? err : new Error('Login failed');
  }
};