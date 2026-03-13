"use client";

import { useGetProductsQuery } from "@/lip/features/product/prodcutApi";
import { Card } from "../card";

export default function ProductCard() {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  return (
    <main>
       <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>

      {isLoading ? <p>loading...</p> : <p>get prduct succes</p>}
    </main>
  );
}
