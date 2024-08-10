import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import DetailInfo from "@/components/detail/DetailInfo";
import ProductDescription from "@/components/detail/ProductDescription";
import { allGoodsData } from "@/lib/sample-data";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Cash 2x returns`,
};

const Detail = ({ params }: any) => {
	const data = allGoodsData.prices[params.slug - 1];
	const dataIndex = params.slug - 1;
	const oneBet = params.slug - 1 === 2 || params.slug - 1 === 3;
	const images = [data.image, data.image];

	const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

	return (
		<main className="min-h-screen overflow-y-auto scrollbar-hide flex flex-col max-w-sm mx-auto relative bg-gray-100">
			<div className="h-[100vh]">
				<EmblaCarousel
					options={OPTIONS}
					images={images}
				/>
				<DetailInfo
					data={data}
					oneBet={oneBet}
				/>
				<ProductDescription
					data={data}
					oneBet={oneBet}
					dataIndex={dataIndex}
				/>
			</div>
		</main>
	);
};

export default Detail;
