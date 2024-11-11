import Feedback from "@/components/Feedback";
import Jumbotron from "@/components/Jumbotron";
import Layanan from "@/components/Layanan";
import MenuPopuler from "@/components/MenuPopuler";
import Reservasi from "@/components/Reservasi";
import Tentang from "@/components/Tentang";

const Home = () => {
	return (
		<>
			<Jumbotron />
			<MenuPopuler />
			<Layanan />
			<Tentang />
			<Reservasi />
			<Feedback />
		</>
	);
};

export default Home;
