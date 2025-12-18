
import axios from "axios";

const api = axios.create({
    baseURL: "/https://cricket-auction-backend.onrender.com/api",
});

export default api
