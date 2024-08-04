import Carousel from "@/components/Carousel";
import DetailInfo from "@/components/DetailInfo";
import allGoodsData from "@/lib/sample-data";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Cash 2x returns`,
};

const Detail = ({ params }: any) => {
	const data = allGoodsData.prices[params.slug - 1];
	const images = [data.image, data.image, data.image];
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto relative bg-gray-100">
			<Carousel images={images} />
			<DetailInfo data={data} />
		</main>
	);
};

export default Detail;
