import Hotspot from "@/components/Hotspot";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Nigal`,
};

export default async function Home() {
	return (
		<main className="min-h-screen flex flex-col max-w-sm mx-auto gap-5 relative bg-gray-100">
			<p className="py-4 bg-sky-300 w-full max-w-sm text-white px-3 font-semibold tracking-widest text-xl fixed top-0">
				<span className="text-yellow-300 text-2xl">N</span>igal{" "}
				<span className="text-yellow-300 text-2xl">N</span>ow
			</p>
			<div className="max-h-[97vh] overflow-y-auto scrollbar-hide">
				<Hotspot />
			</div>
		</main>
	);
}
