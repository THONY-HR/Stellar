import axios from 'axios';

// ⚠️ Remplace ceci par l’URL de ton instance Dolibarr si ce n'est pas celle-ci
const apiBaseUrl = 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php';

// 🔐 Clé API Dolibarr fixée ici
const dolibarrApiKey = '3Njlr29vMw6uYy2XGiPj7D89MMVfCw83';

const getHeaders = () => ({
  'DOLAPIKEY': dolibarrApiKey,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${endpoint}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error.message);
    throw error;
  }
};

export const postData = async (endpoint, payload) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/${endpoint}`, payload, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données :", error.message);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/${endpoint}`, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression des données :", error.message);
    throw error;
  }
};

export const putData = async (endpoint, payload) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/${endpoint}`, payload, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données :", error.message);
    throw error;
  }
};

export const refreshPage = () => {
  window.location.reload();
};
