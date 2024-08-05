"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Carousel = ({ images }: { images: (string | StaticImageData)[] }) => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const carouselRef = useRef<HTMLDivElement>(null);
	const startXRef = useRef<number | null>(null);
	const isDragging = useRef(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const router = useRouter();

	const clonedImages = [images[images.length - 1], ...images, images[0]];

	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % clonedImages.length);
	}, [clonedImages.length]);

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + clonedImages.length) % clonedImages.length
		);
	};

	const resetInterval = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(handleNext, 3000); // Automatically change image every 3 seconds
	}, [handleNext]);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		startXRef.current = e.touches[0].clientX;
		clearInterval(intervalRef.current!); // Pause interval on swipe start
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (startXRef.current !== null) {
			const endX = e.touches[0].clientX;
			const diffX = startXRef.current - endX;
			if (Math.abs(diffX) > 50) {
				if (diffX > 0) {
					handleNext();
				} else {
					handlePrev();
				}
				startXRef.current = null; // Reset after swipe
			}
		}
	};

	const handleTouchEnd = () => {
		startXRef.current = null;
		resetInterval(); // Restart interval after swipe
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		startXRef.current = e.clientX;
		isDragging.current = true;
		clearInterval(intervalRef.current!); // Pause interval on mouse drag start
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging.current && startXRef.current !== null) {
			const endX = e.clientX;
			const diffX = startXRef.current - endX;
			if (Math.abs(diffX) > 50) {
				if (diffX > 0) {
					handleNext();
				} else {
					handlePrev();
				}
				startXRef.current = null; // Reset after swipe
				isDragging.current = false; // Stop dragging
			}
		}
	};

	const handleMouseUp = () => {
		isDragging.current = false;
		startXRef.current = null;
		resetInterval(); // Restart interval after mouse drag ends
	};

	useEffect(() => {
		resetInterval(); // Initialize the interval
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [handleNext, clonedImages.length, resetInterval]);

	// Adjust index when transitioning to the first or last image
	useEffect(() => {
		if (currentIndex === 0) {
			setCurrentIndex(clonedImages.length - 2);
		} else if (currentIndex === clonedImages.length - 1) {
			setCurrentIndex(1);
		}
	}, [currentIndex, clonedImages.length]);

	return (
		<div className="w-full max-w-sm overflow-hidden relative">
			<div className="pl-2">
				<IoIosArrowBack
					size={35}
					className="p-2 bg-gray-700 opacity-95 rounded-full text-white fixed z-10 cursor-pointer top-2"
					onClick={() => router.back()}
				/>
			</div>
			<div
				className="flex transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				ref={carouselRef}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp} // Handle case where mouse leaves the component
			>
				{clonedImages.map((image, index) => (
					<div
						key={index}
						className="w-full flex-shrink-0">
						<Image
							src={image}
							alt={`Carousel image ${index + 1}`}
							width={1200}
							height={1200}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
