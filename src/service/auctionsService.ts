import axios from "axios";
import {AuctionsPagination} from "../types/AuctionsPagination";
import {IAuctions} from "../types/IAuctions";

export const getAuctions = async () => {
    let data = new Array<IAuctions>;
    await axios.get<AuctionsPagination>("http://localhost:8080/api/auction/getAll",).then(res => {   //console.log(Object.values(Object.values(res)[0][1]))
        for (let i = 0; i < Object.values(res)[0].length; i++) {
            data.push(Object.values(res)[0][i])
        }
    });
    console.log(data);
    return data;
}

export const getAuctionById = async (req: string) => {
    let data = new Array<IAuctions>;
    await axios.get<AuctionsPagination>(`http://localhost:8080/api/auction/findById/${req}`,).then(res => {   //console.log(Object.values(Object.values(res)[0][1]))
        for (let i = 0; i < Object.values(res)[0].length; i++) {
            data.push(Object.values(res)[0][i])
        }
    });
    console.log(data);
    return data;
}

export const postAuction = async (req: IAuctions) => {
    console.log(req)
    const {data} = await axios.post('http://localhost:8080/api/auction/add', {
        id: req.id,
        title: req.title,
        userProfileImageLink: req.userProfileImageLink,
        username: req.username,
        address: req.address,
        sqm: req.sqm,
        basePrice: req.basePrice,
        phoneNumber: req.phoneNumber,
        description: req.description,
    });
    return data;
}

export const putAuction = async (req: IAuctions) => {
    await axios.put<IAuctions>('http://localhost:8080/api/auction/update', {
        data: {
            id: req.id,
            name: req.title,
            userProfileImageLink: req.userProfileImageLink,
            username: req.username,
            address: req.address,
            sqm: req.sqm,
            price: req.basePrice,
            phoneNumber: req.phoneNumber,
            description: req.description,
        }
    });
}

export const deleteAuction = async (req: IAuctions) => {
    await axios.delete<AuctionsPagination>('http://localhost:8080/api/auction/delete', {
        data: {
            id: req.id,
            title: req.title,
            userProfileImageLink: req.userProfileImageLink,
            username: req.username,
            address: req.address,
            sqm: req.sqm,
            basePrice: req.basePrice,
            phoneNumber: req.phoneNumber,
            description: req.description,
        }
    });
}