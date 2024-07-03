// components/Layout.jsx
import Link from "next/link";
import Container from "./ui/Container";

const Layout = ({ children }) => {
  return (
    <Container>
      <div>
        <nav>
          <ul className="flex justify-between">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tipohabitacion">Tipos de Habitacion</Link>
            </li>
            <li>
              <Link href="/habitacion">Habitación</Link>
            </li>
            <li>
              <Link href="/huesped">Huesped</Link>
            </li>
            <li>
              <Link href="/reserva">Reserva</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </Container>
  );
};

export default Layout;
