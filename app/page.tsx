import NoticeCarousel from "@/components/carousel/NoticeCarousel";
import Hotspot from "@/components/Hotspot";
import { getRecentWin } from "@/lib/actions/prize.action";
import { setUserOnline } from "@/lib/actions/prizeAuto.action";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Nigal`,
};

export default async function Home() {
	let userOnline = await setUserOnline();
	let winners = await getRecentWin();
	

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
			<div className="max-h-[97vh] overflow-y-auto scrollbar-hide">
				<NoticeCarousel
					winners={winners}
					options={OPTIONS}
				/>
				<Hotspot />
			</div>
		</main>
	);
}
