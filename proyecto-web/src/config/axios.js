import axios from "axios";

const clienteAxios = axios.create({

  baseURL: "http://localhost/service/controller/"


});

export default clienteAxios;