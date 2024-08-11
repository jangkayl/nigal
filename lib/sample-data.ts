import image1 from "@/public/image1.jpg";
import image2 from "@/public/image2.jpg";
import image3 from "@/public/image3.jpg";
import image4 from "@/public/image4.jpg";
import image5 from "@/public/image5.jpg";
import image6 from "@/public/image6.jpg";
import image7 from "@/public/image7.jpg";
import image8 from "@/public/image8.jpg";
import bal100 from "@/public/bal100.png";
import bal500 from "@/public/bal500.png";
import bal1000 from "@/public/bal1000.png";
import bal2001 from "@/public/bal2001.png";

const allGoodsData = {
	prices: [
		{
			image: image1,
			title: "Cash 2x returns",
			price: "₱5.00",
			cost: 5,
		},
		{
			image: image2,
			title: "Cash 2x returns",
			price: "₱50.00",
			cost: 50,
		},
		{
			image: image3,
			title: "VIP5 71x",
			price: "₱1.00",
			cost: 1,
		},
		{
			image: image4,
			title: "VIP5 71x",
			price: "₱5.00",
			cost: 5,
		},
		{
			image: image5,
			title: "Cash 2x returns",
			price: "₱150.00",
			cost: 150,
		},
		{
			image: image6,
			title: "Cash 2x returns",
			price: "₱250.00",
			cost: 250,
		},
		{
			image: image7,
			title: "Cash 2x returns",
			price: "₱500.00",
			cost: 500,
		},
		{
			image: image8,
			title: "Cash 2x returns",
			price: "₱1000.00",
			cost: 1000,
		},
	],
};

const pointsGoodsData = {
	prices: [
		{
			image: bal100,
			title: "Balance ₱100",
			price: "10000 Points",
			addBalance: 100,
			cost: 10000,
			index: 1,
		},
		{
			image: bal500,
			title: "Balance ₱500",
			price: "45000 Points",
			addBalance: 500,
			cost: 45000,
			index: 2,
		},
		{
			image: bal1000,
			title: "Balance ₱1000",
			price: "1000 Points",
			addBalance: 1000,
			cost: 80000,
			index: 3,
		},
		{
			image: bal2001,
			title: "Balance ₱2000",
			price: "150000 Points",
			addBalance: 2000,
			cost: 150000,
			index: 4,
		},
	],
};

export { allGoodsData, pointsGoodsData };
