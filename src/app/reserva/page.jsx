"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { title } = router?.useSearchParams;
  console.log(title);
  return <div>page</div>;
};

export default page;
