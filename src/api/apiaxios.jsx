import { Axios } from "axios";


const apiaxios = () => {
    const axios = Axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000
    }
    )
    return axios
}
export default apiaxios;