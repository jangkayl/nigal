import { useState, useRef, useEffect } from "react";

const DraggableButton = ({ open, setOpen }: any) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging && buttonRef.current) {
				// Calculate the new position
				const newX = e.clientX - buttonRef.current.offsetWidth / 2.7;
				const newY = e.clientY - buttonRef.current.offsetHeight / 2;

				// Calculate boundaries for dragging
				const maxX = window.innerWidth - buttonRef.current.offsetWidth;
				const maxY = window.innerHeight - buttonRef.current.offsetHeight;

				// Limit the position within the viewport
				const clampedX = Math.max(0, Math.min(newX, maxX));
				const clampedY = Math.max(0, Math.min(newY, maxY));

				setPosition({
					x: clampedX,
					y: clampedY,
				});
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		} else {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	// Center the button initially
	useEffect(() => {
		if (buttonRef.current) {
			setPosition({
				x: (window.innerWidth - buttonRef.current.offsetWidth) / 2.7,
				y: (window.innerHeight - buttonRef.current.offsetHeight) / 2,
			});
		}
	}, []);

	return (
		<>
			<button
				ref={buttonRef}
				onMouseDown={() => setIsDragging(true)}
				className="bg-red-500 bg-opacity-65 text-white cursor-pointer absolute max-w-sm rounded-full px-3 py-5 hover:bg-opacity-100"
				onClick={() => setOpen(!open)}
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					maxWidth: "28rem", // Ensure the button does not exceed max-width
					width: "auto", // Allow width to adjust based on content
				}}>
				{open ? "Close" : "Chart"}
			</button>
		</>
	);
};

export default DraggableButton;
