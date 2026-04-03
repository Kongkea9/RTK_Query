import { categoryResponse } from "./categoryType";

export type productResponse = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: categoryResponse;
  images: File[];
  creationAt: string;
  updatedAt: string;
};

export type productRequst = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: File[];
};
