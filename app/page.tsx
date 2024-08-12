import Carousel from "@/components/carousel/Carousel";
import NoticeCarousel from "@/components/carousel/NoticeCarousel";
import Hotspot from "@/components/Hotspot";
import {
	getOnlineUsers,
	getRecentWin,
	setUserOnline,
} from "@/lib/actions/prize.action";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";
import carousel1 from "@/public/carousel1.jpg";
import carousel2 from "@/public/carousel2.jpg";
import carousel3 from "@/public/carousel3.png";
import carousel4 from "@/public/carousel4.jpg";

export const metadata: Metadata = {
	title: `Nigal`,
};

export default async function Home() {
	await setUserOnline();
	let userOnline = await getOnlineUsers();
	let winners = await getRecentWin();
	const images = [carousel1, carousel2, carousel3, carousel4];

	console.log("Online users: ", userOnline);

	const CAROUSELOPTIONS: EmblaOptionsType = { align: "start", loop: true };
	const OPTIONS: EmblaOptionsType = { align: "start", loop: true, axis: "y" };

	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto gap-5 relative bg-gray-100">
			<div className="py-4 bg-sky-300 w-full max-w-sm text-white px-3 fixed top-0 flex justify-between items-center z-10">
				<p className="tracking-widest text-xl font-semibold">
					<span className="text-yellow-300 text-2xl">N</span>igal{" "}
					<span className="text-yellow-300 text-2xl">N</span>ow
				</p>
				<p className="text-sm">online {userOnline}</p>
			</div>
			<div className="max-h-[97vh] overflow-y-auto scrollbar-hide pt-[5rem]">
				<Carousel
					options={CAROUSELOPTIONS}
					images={images}
				/>
				<NoticeCarousel
					winners={winners}
					options={OPTIONS}
				/>
				<Hotspot />
			</div>
		</main>
	);
}
