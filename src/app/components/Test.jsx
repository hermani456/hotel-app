// "use client";
// import { useEffect } from "react";

// const Text = () => {
//   useEffect(() => {
//     fetch("/api/user", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("log", data);
//       });
//   }, []);
//   return (
//     <section>
//       <div className="w-full">
//         <h1 className="text-center">Lorem ipsum dolor sit amet.</h1>
//         <p className="text-center">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
//           tempore!
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Text;

// "use client";
// import { useAuth } from "@clerk/nextjs";

// export default function Text() {
//   const { isLoaded, userId, sessionId, getToken } = useAuth();

//   // In case the user signs out while on the page.
//   if (!isLoaded || !userId) {
//     return null;
//   }

//   return (
//     <div>
//       Hello, {userId} your current active session is {sessionId}
//     </div>
//   );
// }

"use client";
import { useUser } from "@clerk/nextjs";

export default function Example() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user)

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div>Hello, {user.firstName} welcome to Clerk</div>;
}
