"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

type PropType = {
	options?: EmblaOptionsType;
	images: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { options, images } = props;
	const router = useRouter();

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
		<section className="embla relative">
			<div className="pl-2">
				<IoIosArrowBack
					size={35}
					className="p-2 bg-gray-700 opacity-95 rounded-full text-white fixed z-10 cursor-pointer top-2"
					onClick={() => router.back()}
				/>
			</div>
			<p className="text-white absolute z-10 bottom-5 text-xs right-5 px-2 py-1 rounded-md bg-slate-600 bg-opacity-90">
				1/1
			</p>
			<div
				className="embla__viewport"
				ref={emblaRef}>
				<div className="embla__container">
					{images.map((image: any, index: number) => (
						<div
							className="embla__slide w-full h-full"
							key={index}>
							<Image
								src={image}
								className="embla__slide__number w-full h-full"
								alt="images"
								width={0}
								height={0}
								sizes="100vw"
								quality={100}
								placeholder="blur"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
