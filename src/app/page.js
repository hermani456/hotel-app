import Test from "./components/Test";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import HotelRoom from "./components/Hotelroom";
import BookingForm from "./components/BookingForm";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HotelRoom />
      <BookingForm />
      <Footer />
      {/* <Test /> */}
    </>
  );
}
