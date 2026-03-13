import { categoryResponse } from "./categoryType"

export type productResponse = {

    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    images: string[],
    creationAt: string,
    updatedAt: string

}