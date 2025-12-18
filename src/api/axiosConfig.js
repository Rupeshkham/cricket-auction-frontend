
import axios from "axios";

const api = axios.create({
    baseURL: "https://cricket-auction-backend-647r.onrender.com/api",
});

export default api
