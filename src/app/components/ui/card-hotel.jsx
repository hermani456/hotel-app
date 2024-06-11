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
import Link from "next/link";
// import { Item } from "@radix-ui/react-navigation-menu";

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
          className="object-cover rounded-md h-48 w-full"
        />
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col items-start">
        <CardDescription className="w-full text-left text-xl mb-4">
          Precio $ {price}
        </CardDescription>
        <div className="flex justify-between w-full space-x-8">
          <Link href="/reserva?title={title}">
            <Button className="w-full">reservar</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
