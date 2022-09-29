export interface AuctionsPagination {
    items: Item[];
}

export interface Item {
    id:string;
    title: string;
    userProfileImageLink:string;
    phoneNumber:string;
    username: string;
    address: string;
    sqm: number;
    basePrice: number;
    description: string;
}