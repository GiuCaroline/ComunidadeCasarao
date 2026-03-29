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

export async function getUserById(id) {
  try {
    const response = await api.get(`/auth/user/${id}`);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar usuário" };
  }
}

export async function updateUser(data) {
  try {
    const response = await api.put(`/auth/updateUser/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar usuário" };
  }
}

export async function getCursos() {
  try {
    const response = await api.get('/auth/cursos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar cursos" };
  }
}