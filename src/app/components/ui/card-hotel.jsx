import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Separator } from "./separator";
import Image from "next/image";
import image from "../../../../public/img/hero/1.webp";
import { Item } from "@radix-ui/react-navigation-menu";

export function CardHotel({ title, description, img, price }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={img}
          alt="hotel"
          width={350}
          height={200}
          className="object-cover rounded-md"
        />
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col items-start">
        <CardDescription className="w-full text-left text-xl mb-4">
          Precio $ {price}
        </CardDescription>
        <div className="flex justify-between w-full space-x-8">
          <Button className="w-full">Reservar</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
