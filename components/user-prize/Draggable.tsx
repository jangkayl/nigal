import { useState, useRef, useEffect, useCallback } from "react";

const DraggableButton = ({ open, setOpen }: any) => {
	const [position, setPosition] = useState({ x: 0, y: 150 });
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startOffset, setStartOffset] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const requestRef = useRef<number | null>(null);

	const handleMove = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (isDragging && buttonRef.current && startOffset) {
				const clientX =
					e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
				const clientY =
					e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

				const newX = clientX - startOffset.x;
				const newY = clientY - startOffset.y;

				const buttonRect = buttonRef.current.getBoundingClientRect();
				const maxX = window.innerWidth - buttonRect.width;
				const maxY = window.innerHeight - buttonRect.height;

				const clampedX = Math.max(0, Math.min(newX, maxX));
				const clampedY = Math.max(0, Math.min(newY, maxY));

				setPosition({
					x: clampedX,
					y: clampedY,
				});
			}
		},
		[isDragging, startOffset]
	);

	useEffect(() => {
		const moveHandler = (e: MouseEvent | TouchEvent) => {
			if (requestRef.current !== null) {
				window.cancelAnimationFrame(requestRef.current);
			}
			requestRef.current = window.requestAnimationFrame(() => handleMove(e));
		};

		const handleMouseUp = () => setIsDragging(false);
		const handleTouchEnd = () => setIsDragging(false);

		if (isDragging) {
			window.addEventListener("mousemove", moveHandler);
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchmove", moveHandler, { passive: false });
			window.addEventListener("touchend", handleTouchEnd);
		} else {
			window.removeEventListener("mousemove", moveHandler);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchmove", moveHandler);
			window.removeEventListener("touchend", handleTouchEnd);
		}

		return () => {
			window.removeEventListener("mousemove", moveHandler);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchmove", moveHandler);
			window.removeEventListener("touchend", handleTouchEnd);
			if (requestRef.current !== null) {
				window.cancelAnimationFrame(requestRef.current);
			}
		};
	}, [isDragging, handleMove]);

	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
		const buttonRect = buttonRef.current?.getBoundingClientRect();
		if (buttonRect) {
			setStartOffset({
				x: e.clientX - buttonRect.left,
				y: e.clientY - buttonRect.top,
			});
		}
		setIsDragging(true);
	};

	const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
		const buttonRect = buttonRef.current?.getBoundingClientRect();
		if (buttonRect) {
			setStartOffset({
				x: e.touches[0].clientX - buttonRect.left,
				y: e.touches[0].clientY - buttonRect.top,
			});
		}
		setIsDragging(true);
	};

	return (
		<button
			ref={buttonRef}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
			className="bg-red-500 bg-opacity-65 text-white cursor-pointer fixed max-w-sm rounded-full px-3 py-5 hover:bg-opacity-100 z-10"
			onClick={() => setOpen(!open)}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				maxWidth: "28rem",
				width: "auto",
			}}>
			{open ? "Close" : "Chart"}
		</button>
	);
};

export default DraggableButton;
