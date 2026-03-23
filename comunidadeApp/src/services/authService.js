import api from "./api";

export async function registerUser(data) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await api.post("/auth/login", {
      email: email.toLowerCase().trim(),
      password,
    });

    return response.data;

  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}