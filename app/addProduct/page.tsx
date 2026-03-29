"use client";
import { useAddProductsMutation } from "@/lip/features/product/prodcuctApi";
import { productRequst, productResponse } from "@/lip/types/productType";

export default function AddProduct() {
  const [addProduct, { isLoading, data, error }] = useAddProductsMutation();

  const product: productRequst = {
    title: "Nike100",
    price: 30,
    description: "Nike Sportswearf DUNK NEXT NATURE - Trainers - white/black",
    categoryId: 4,
    images: ["https://api.escuelajs.co/api/v1/files/9061.webp"],
  };

  const handSubmit = async () => {
    const newProduct = await addProduct(product);

    console.log(newProduct);
  };

  return (
    <>
      <button
        className="bg-gray-500 text-white font-bold p-3 rounded-2xl"
        onClick={handSubmit}
      >
        Click To Add Product
      </button>
    </>
  );
}
