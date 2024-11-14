export const formatRupiah = (price) => {
	if (price == null) {
		return "Rp0";
	}
	return `Rp${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
