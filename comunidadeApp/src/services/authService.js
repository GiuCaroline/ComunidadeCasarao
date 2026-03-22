import api from "./api";

export async function registerUser(data) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}