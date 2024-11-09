import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import Jumbotron from "@/components/Jumbotron";
import Layanan from "@/components/Layanan";
import MenuPopuler from "@/components/MenuPopuler";
import Navbar from "@/components/Navbar";
import Reservasi from "@/components/Reservasi";
import Tentang from "@/components/Tentang";

const Home = () => {
	return (
		<>
			<Navbar />
			<Jumbotron />
			<MenuPopuler />
			<Layanan />
			<Tentang />
			<Reservasi />
			<Feedback />
			<Footer />
		</>
	);
};

export default Home;

