import axios from "axios"
import {IPlaceForSale} from "../types/IPlaceForSale";
import {PlacePagination} from "../types/PlacePagination";
import {IPlaceForSaleSend} from "../types/IPlaceForSaleSend";


export const getPlaces = async () => {
    let data = new Array<IPlaceForSale>;
    await axios.get<PlacePagination>("http://localhost:8080/api/residence/getAll",).then(res => {   //console.log(Object.values(Object.values(res)[0][1]))
        for (let i = 0; i < Object.values(res)[0].length; i++) {
            data.push(Object.values(res)[0][i])
        }
    });
    console.log(data);
    return data;
}

export const getPlacesById = async (req: string) => {
    let data = new Array<IPlaceForSale>;
    await axios.get<PlacePagination>(`http://localhost:8080/api/residence/findById/${req}`,).then(res => {   //console.log(Object.values(Object.values(res)[0][1]))
        for (let i = 0; i < Object.values(res)[0].length; i++) {
            data.push(Object.values(res)[0][i])
        }
    });
    console.log(data);
    return data;
}

export const postResidence = async (req: IPlaceForSaleSend) => {
    console.log(req)
    const {data} = await axios.post('http://localhost:8080/api/residence/add', {
        id: req.id,
        name: req.name,
        userProfileImageLink: req.userProfileImageLink,
        username: req.username,
        address: req.address,
        sqm: req.sqm,
        price: req.price,
        phoneNumber: req.phoneNumber,
        description: req.description,
    });
    return data;
}

export const putResidence = async (req: IPlaceForSaleSend) => {
    await axios.put<IPlaceForSaleSend>('http://localhost:8080/api/residence/update', {
        data: {
            id: req.id,
            name: req.name,
            userProfileImageLink: req.userProfileImageLink,
            username: req.username,
            address: req.address,
            sqm: req.sqm,
            price: req.price,
            phoneNumber: req.phoneNumber,
            description: req.description,
        }
    });
}

export const deleteResidence = async (req: IPlaceForSaleSend) => {
    await axios.delete<IPlaceForSaleSend>('http://localhost:8080/api/residence/delete', {
        data: {
            id: req.id,
            name: req.name,
            userProfileImageLink: req.userProfileImageLink,
            username: req.username,
            address: req.address,
            sqm: req.sqm,
            price: req.price,
            phoneNumber: req.phoneNumber,
            description: req.description,
        }
    });
}