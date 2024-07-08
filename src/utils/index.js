import {
  cardImage1,
  cardImage2,
  cardImage3,
  cardImage4,
  cardImage5,
} from "../../public/img/cards";

export const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 3,
    name: "Admin",
    path: "/admin",
  },
];

export const formatToClp = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
};

export const roomItems = [
  {
    id: 1,
    title: "Habitacion 1",
    description: "Comoda habitacion",
    price: "10.000",
    img: cardImage1,
  },
  {
    id: 2,
    title: "Habitacion 2",
    description: "Comoda habitacion",
    price: "20.000",
    img: cardImage2,
  },
  {
    id: 1,
    title: "Habitacion 3",
    description: "Comoda habitacion",
    price: "30.000",
    img: cardImage3,
  },
  {
    id: 1,
    title: "Habitacion 4",
    description: "Comoda habitacion",
    price: "40.000",
    img: cardImage4,
  },
];
