import Feedback from "@/components/homepage/Feedback";
import Jumbotron from "@/components/homepage/Jumbotron";
import Layanan from "@/components/homepage/Layanan";
import MenuPopuler from "@/components/homepage/MenuPopuler";
import Reservasi from "@/components/homepage/Reservasi";
import Tentang from "@/components/homepage/Tentang";

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
