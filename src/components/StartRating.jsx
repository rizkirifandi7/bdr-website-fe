const { FaStar } = require("react-icons/fa");

const StarRating = ({ rating, setRating }) => {
	const handleClick = (value) => {
		setRating(value);
	};

	return (
		<div className="flex space-x-2">
			{[...Array(5)].map((_, index) => {
				const value = index + 1;
				return (
					<FaStar
						key={index}
						size={40}
						className={value <= rating ? "text-yellow-500" : "text-gray-300"}
						onClick={() => handleClick(value)}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
