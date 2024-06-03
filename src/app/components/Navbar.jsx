// "use client";
// import React from "react";
// import { useRef } from "react";
// import logo from "../../../public/next.svg";
// import Image from "next/image";
// import Link from "next/link";
// import { navItems } from "@/utils";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { Button } from "@/app/components/ui/button";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const ref = useRef(null);

//   return (
//     <nav className="bg-text">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 pt-5 md:pt-0">
//         <div className="">
//           <Image src={logo} alt="logo" width={125} className="m-0 p-0" />
//         </div>
//         <button
//           type="button"
//           onClick={toggleMenu}
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//         >
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         {/* <div>YME</div> */}
//         <div
//           ref={ref}
//           className={`w-full md:block md:w-auto mb-5 ${
//             isMenuOpen ? "block" : "hidden"
//           }`}
//           id="navbar-default"
//         >
//           <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0">
//             {navItems.map((item) => (
//               <li key={item.id}>
//                 <Link
//                   className="block py-2 px-3 text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:hover:text-primary md:border-0 md:p-0 "
//                   href={item.path}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="hidden md:block">
//           <SignedOut>
//             <Button asChild variant="ghost" size="sm">
//               <SignInButton />
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { Button } from "@/app/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/app/components/ui/sheet";
import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/app/components/ui/navigation-menu";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { navItems } from "@/utils";
import hotelLogo from "../../../public/img/hotel-logo.svg";
import Image from "next/image";

function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                className="flex w-full items-center py-2 text-lg font-semibold"
                href={item.path}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex" href="#">
        <MountainIcon className="h-6 w-6" />
        {/* <Image src={hotelLogo} height={24} width={24} /> */}
        <span className="sr-only">Hotel</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuLink key={item.id} asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href={item.path}
              >
                {item.name}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="hidden lg:flex ml-auto">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <div>
              <SignedOut>
                <div className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  <SignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default Navbar;

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
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
