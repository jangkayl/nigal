"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

type PropType = {
	options?: EmblaOptionsType;
	images: any;
};

const Carousel: React.FC<PropType> = (props) => {
	const { options, images } = props;

	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ delay: 3000, stopOnMouseEnter: false }),
	]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	useEffect(() => {
		if (!emblaApi) return;

		const autoplay = emblaApi?.plugins()?.autoplay;

		emblaApi.on("pointerUp", () => {
			if (autoplay) autoplay.play();
		});
	}, [emblaApi]);

	return (
		<section className="embla flex justify-center items-center">
			<div
				className="embla__viewport relative rounded-2xl w-[22rem]"
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
				<div className="embla__dots absolute bottom-5 left-[50%] translate-x-[-50%] gap-3">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex ? " embla__dot--selected" : ""
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Carousel;
