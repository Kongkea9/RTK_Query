"use client"
import { Card } from "./component/card";
import ProductCard from "./component/product/productCard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <Card /> */}
      <ProductCard/>
    </div>
  );
}
