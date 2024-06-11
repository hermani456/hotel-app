"user client";
import React from "react";
import { useRouter } from "next/router";
const page = () => {
  const router = useRouter();
  const { title } = router.query;
  console.log(title);
  return <div>page</div>;
};

export default page;
