import * as React from "react";

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

export function CardHotel({ title, description, price }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col items-start">
        <CardDescription className="w-full text-left text-xl mb-4">
          Precio $ {price}
        </CardDescription>
        <div className="flex justify-between w-full space-x-8">
          <Button className="w-full">Reservar</Button>
          <Button className="w-full" variant="outline">
            Agregar al carro
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
