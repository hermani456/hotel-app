"use client"
import Layout from "../components/Layout"; 
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <h1 className="text-4xl text-center mt-10">Panel de administracion</h1>
        <p className="text-2xl text-center mt-5">Selecciona una opcion</p>
        {/* <button onClick={() => router.push("/habitacion")}>Go to Habitación</button> */}
      </div>
    </Layout>
  );
};

export default Page;