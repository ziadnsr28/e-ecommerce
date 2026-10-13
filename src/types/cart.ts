import { Daum } from "./product"

// Defines the data structure for the server cart response.
export interface Icart {
    status: string
    message: string
    numOfCartItems: number
    cartId: string
    data: IcartData
}

export interface IcartData {
    _id: string
    cartOwner: string
    products: IcartProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface IcartProduct {
    count: number
    _id: string
    product: Daum
    price: number
}




