import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

// import axios from "axios";
// axios.defaults.baseUrl = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem("user-token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// }

// const login = (email, password) => {
//   const data = { email: email, password: password };
//   return fetch(`${baseUrl}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   }).then((response) => response.json());
// };

const login = (user) => {
  return axios({
    url: baseUrl + "/auth/login",
    data: user,
    method: "POST",
  });
};

const getProfile = () => {
  return axios({
    url: baseUrl + "/client",
    method: "POST",
  });
};

const getAllClient = () => {
  return axios({
    url: baseUrl + "/client",
    method: "GET",
  });
};

const updateClient = (client) => {
  const id = client.id;
  return axios({
    url: baseUrl + `/client/${id}`,
    method: "POST",
    data: client,
  });
};

const createClient = (client) => {
  return axios({
    url: baseUrl + "/client",
    method: "POST",
    data: client,
  });
};

// const getClientDetail = (id, token) => {
//   return fetch(`${baseUrl}/client/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => response.json());
// };

const getClientDetail = (id) => {
  return axios.get(baseUrl + `/client/${id}`);
};

const deleteClient = (id) => {
  return axios({
    url: baseUrl + `/client/${id}`,
    method: "DELETE",
  });
};

export {
  login,
  getProfile,
  getAllClient,
  getClientDetail,
  updateClient,
  createClient,
  deleteClient,
};
