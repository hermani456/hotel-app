// components/Layout.jsx
import Link from "next/link";
import Container from "./ui/Container";
import { Button } from "./ui/button";

const Layout = ({ children }) => {
  return (
    <Container>
      <div>
        <nav>
          <ul className="flex justify-between">
            <li>
              <Link href="/tipohabitacion">
                <Button variant="ghost">Tipos de Habitacion</Button>
              </Link>
            </li>
            <li>
              <Link href="/habitacion">
                <Button variant="ghost">Habitaciones</Button>
              </Link>
            </li>
            <li>
              <Link href="/huesped">
                <Button variant="ghost">Huespedes</Button>
              </Link>
            </li>
            <li>
              <Link href="/reserva">
                <Button variant="ghost">Reservas</Button>
              </Link>
            </li>
            <li>
              <Link href="/pasajeros">
                <Button variant="ghost">Pasajeros</Button>
              </Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </Container>
  );
};

export default Layout;
