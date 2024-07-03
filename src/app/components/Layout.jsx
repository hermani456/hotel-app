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
              <Button variant="ghost">
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
            <Button variant="ghost">
                <Link href="/tipohabitacion">Tipos de Habitacion</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <Link href="/habitacion">Habitación</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <Link href="/huesped">Huesped</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <Link href="/reserva">Reserva</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost">
                <Link href="/pasajeros">Pasajeros</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </Container>
  );
};

export default Layout;
