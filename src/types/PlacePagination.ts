export interface PlacePagination {
    items: Item[];
}

export interface Item {
    id:string;
    name: string;
    userProfileImageLink:string;
    phoneNumber:string;
    username: string;
    address: string;
    sqm: number;
    price: number;
    description: string;
}