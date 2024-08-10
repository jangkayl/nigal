"use client";
import React, { useEffect, useRef, useState } from "react";

interface Winner {
	name: string | null;
	total: number;
}

interface Props {
	winners: Winner[];
}

const Notice = ({ winners }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const paragraphs = container.querySelectorAll("p");
		const totalParagraphs = winners?.length || 0;

		if (totalParagraphs === 0) return;

		const paragraphHeight = paragraphs[0].offsetHeight;

		const updateScroll = () => {
			if (container) {
				const offset = currentIndex * paragraphHeight;
				container.style.transform = `translateY(-${offset}px)`;
			}
		};

		const scrollInterval = setInterval(() => {
			setCurrentIndex((prevIndex) => {
				const newIndex = (prevIndex + 1) % totalParagraphs;
				updateScroll();
				return newIndex;
			});
		}, 3000); // Total interval time (display time + transition time)

		// Clean up interval on component unmount
		return () => clearInterval(scrollInterval);
	}, [currentIndex, winners?.length]);

	return (
		<div className="w-full bg-white px-3 py-3 mb-3 mt-[4.5rem]">
			<div className="flex justify-between text-lg max-h-[2rem]">
				<p className="font-semibold">Notice</p>
				<div className="overflow-hidden">
					<div
						ref={containerRef}
						style={{ transition: "transform 0.5s ease-in-out" }}>
						<div className="scroll-content">
							{winners?.map((winner, index) => (
								<p
									className="text-xs pl-3"
									style={{ wordBreak: "break-all" }}
									key={index}>
									Congratulations to player {winner.name}&apos;s participation,
									won ₱{winner.total}.00. Let&apos;s congratulate him!
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notice;
