import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function awake(data) {
  try {
    const response = await api.get("/", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}

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

    if (response.data.token) {
      await AsyncStorage.setItem('@casarao:token', response.data.token);
    }

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

export async function forgotPassword(email) {
  try {
    const response = await api.post("/auth/esqueci-senha", { 
      email: email.toLowerCase().trim() 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}

export async function resetPassword(email, token, novaSenha) {
  try {
    const response = await api.post("/auth/reset-senha", {
      email: email.toLowerCase().trim(),
      token,
      novaSenha
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
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

export async function getEventos() {
  try {
    const response = await api.get('/auth/eventos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar eventos" };
  }
}

export async function getProximosEventos() {
  try {
    const response = await api.get('/auth/eventos/proximos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar eventos" };
  }
}

export async function getCarrossel() {
  try{
    const response = await api.get('/auth/galeria/carrossel');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar carrossel." }
  }
}

export async function getGaleriaEventos() {
  const token = await AsyncStorage.getItem('@casarao:token');
  
  try {
    const response = await api.get("/auth/galeria/eventos", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar eventos da galeria" };
  }
}

export async function getGaleriaEvento(agendaevento_id) {
  const token = await AsyncStorage.getItem('@casarao:token');
  
  try {
    const response = await api.get(`/auth/galeria/evento/${agendaevento_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar mídias do evento" };
  }
}

export async function getEscalas(data) {
  const token = await AsyncStorage.getItem('@casarao:token');
  try {
    const response = await api.get("/auth/escalasapp", {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro no servidor" };
  }
}