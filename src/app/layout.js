import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import Container from "./components/ui/Container";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="es">
        <body>
          <Container>{children}</Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
