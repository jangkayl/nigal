"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

interface Winner {
	name: string | null;
	total: number;
}

type PropType = {
	options?: EmblaOptionsType;
	winners: Winner[];
};

const NoticeCarousel: React.FC<PropType> = (props) => {
	const { options, winners } = props;

	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ delay: 3000, stopOnMouseEnter: false }),
	]);

	useEffect(() => {
		if (!emblaApi) return;

		const autoplay = emblaApi?.plugins()?.autoplay;

		emblaApi.on("pointerUp", () => {
			if (autoplay) autoplay.play();
		});
	}, [emblaApi]);

	return (
		<div className="w-full bg-white px-3 py-3 mb-3 mt-3">
			<div className="flex justify-between text-lg max-h-[3rem]">
				<p className="font-semibold">Notice</p>
				<div className="overflow-hidden embla_y">
					<div
						className="embla_y__viewport max-h-[2rem]"
						ref={emblaRef}>
						<div className="embla_y__container">
							{winners.map((winner, index) => (
								<div
									className="text-xs pl-3 embla_slide_y max-w-[18rem]"
									style={{ wordBreak: "break-all" }}
									key={index}>
									<p className="">
										Congratulations to player {winner.name}&apos;s
										participation, won ₱{winner.total}.00. Let&apos;s
										congratulate him!
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoticeCarousel;
