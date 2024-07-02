"use client"
import Layout from "../components/Layout"; 
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <h1>Admin</h1>
        <button onClick={() => router.push("/habitacion")}>Go to Habitación</button>
      </div>
    </Layout>
  );
};

export default Page;