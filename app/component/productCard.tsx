import { productResponse } from "@/lip/types/productType";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({
  images = [
    "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e90ccffa-5cde-4a15-8eb1-490519e16aa1/WMNS+AIR+JORDAN+1+RETRO+HI+OG.png",
  ],
  title = "Shoes",
  description = "Best shoe in town",
  price = 100,
  category,
}: productResponse) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={images[0]}
        alt={title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction></CardAction>
        <CardTitle>{title}</CardTitle>
        <Badge>{category.name}</Badge>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flext justify-between">
        <CardContent className="font-bold text-xl">{price}$</CardContent>
        <Button className="w-30">Add To Card</Button>
      </CardFooter>
    </Card>
  );
}
