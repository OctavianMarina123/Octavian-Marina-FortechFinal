import axios from "axios";
import {IValidateUserReq} from "../types/IValidateUserReq";
import {Simulate} from "react-dom/test-utils";


const axiosInstance = axios.create(
    {
        baseURL: "http://localhost:8080/api",
    }
)

export const loginUser = async (req: IValidateUserReq) => {
    const {data} = await axios.post('http://localhost:8080/api/user/login', {
        username: req.username,
        password: req.password
    });
    return data;
}


export const signUpUser = async (req: IValidateUserReq) => {
    const {data} = await axios.post('http://localhost:8080/api/user/signUp', {
        username: req.username,
        password: req.password
    });
    return data;
}