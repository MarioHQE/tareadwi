import { Axios } from "axios";


const apiaxios = () => {
    const axios = Axios.create({
        baseURL: "http://localhost:3600",
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000
    }
    )
    return axios
}
export default apiaxios;