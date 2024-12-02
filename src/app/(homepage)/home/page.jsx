import Jumbotron from "@/components/homepage/Jumbotron";
import Kontak from "@/components/homepage/Kontak";
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
			<Kontak />
		</>
	);
};

export default Home;
