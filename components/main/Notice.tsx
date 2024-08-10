"use client";
import React, { useEffect, useRef } from "react";
import { useModalState } from "../ModalContext";

interface Winner {
	name: string | null;
	total: number;
}

interface Props {
	winners: Winner[];
}

const Notice = ({ winners }: Props) => {
	const { setState } = useModalState();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const paragraphs = container.querySelectorAll("p");
		const totalParagraphs = winners?.length || 0;

		if (totalParagraphs === 0) return;

		const paragraphHeight = paragraphs[0].offsetHeight;

		// Function to update scroll position
		const updateScroll = (index: number) => {
			const offset = index * paragraphHeight;
			container.style.transform = `translateY(-${offset}px)`;
			// Save the current index to localStorage
			localStorage.setItem("currentIndex", index.toString());
		};

		// Retrieve the last index from localStorage
		const savedIndex = localStorage.getItem("currentIndex");
		const initialIndex = savedIndex ? parseInt(savedIndex, 10) : 0;

		// Set initial scroll position
		updateScroll(initialIndex);

		const scrollInterval = setInterval(() => {
			setState((prevState) => {
				const newIndex = (prevState.currentIndex + 1) % totalParagraphs;
				updateScroll(newIndex);
				return {
					...prevState,
					currentIndex: newIndex,
				};
			});
		}, 3000); // Total interval time (display time + transition time)

		// Clean up interval on component unmount
		return () => clearInterval(scrollInterval);
	}, [setState, winners.length]);

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
