// import footerLogo from "../../../public/assets/svg/footerLogo.svg";
import footerLogo from "../../../public/img/hotel-logo.svg";
import { navItems } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background text-text min-h-[50vh] relative">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-1/4 ">
            <div className="flex flex-col justify-center items-center">
              <HotelLogo className="h-16 w-16" />
              <h3 className="text-2xl text-center font-medium">Hotel</h3>
              <p className="text-center font-medium">Duerme Bien</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl">Navegación</h3>
            <ul>
              {navItems.map((item) => (
                <Link key={item.id} href={item.path}>
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">Habitaciones</h3>
            <ul className="">
              <a href="habitacion1">
                <li>habitacion1</li>
              </a>
              <a href="habitacion2">
                <li>habitacion2</li>
              </a>
              <a href="habitacion3">
                <li>habitacion3</li>
              </a>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">Contacto</h3>
            <ul className="">
              <li className="flex items-center gap-2">+5698765432</li>
              <li className="flex items-center gap-2">
                <a href="mailto:hotel@hotel.cl">hotel@duermebien.cl</a>
              </li>
              <li className="flex items-center gap-2">Iquique</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full pb-4 text-center text-sm text-secondary bottom-0 absolute">
        <p>© 2024 Copyright: Hotel Duerme Bien</p>
      </div>
    </footer>
  );
};

export default Footer;

function HotelLogo(props) {
  return (
    <svg
      {...props}
      fill="none"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      id="hotel"
      data-name="Line Color"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      <path
        id="secondary"
        d="M14,21V15H10v6ZM8,7h2M8,11h2m6-4H14m2,4H14"
      ></path>
      <path
        id="primary"
        d="M20,21H4V4A1,1,0,0,1,5,3H19a1,1,0,0,1,1,1Zm1,0H3"
      ></path>
    </svg>
  );
}
