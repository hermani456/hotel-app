// import { auth } from "@clerk/nextjs/server"

// export const checkRole = (role) => {
//   const { sessionClaims } = auth()

//   return sessionClaims?.metadata.role === role;
// }

import { useUser } from "@clerk/nextjs";

// This is a React component because we need to use the `useUser` hook
const CheckUserRole = ({ role, children }) => {
  const { user } = useUser();
//   console.log(user)
  const userRole = user?.unsafeMetadata?.role;

  if (userRole === role) {
    return children;
  }

  // Optionally, render nothing or a message if the role doesn't match
  return null; // or <div>Access Denied</div>
};

export default CheckUserRole;