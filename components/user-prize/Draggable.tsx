import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

interface DraggableButtonProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DraggableButton: React.FC<DraggableButtonProps> = ({ open, setOpen }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [dragStartTime, setDragStartTime] = useState<number | null>(null);

	const handleStart = () => {
		setDragStartTime(Date.now());
	};

	const handleStop = () => {
		if (dragStartTime !== null) {
			const dragDuration = Date.now() - dragStartTime;
			if (dragDuration <= 300) {
				setOpen(!open);
			}
		}
	};

	return (
		<Draggable
			bounds="parent"
			onStart={handleStart}
			onStop={handleStop}>
			<button
				ref={buttonRef}
				className="px-2 py-4 bg-red-500 rounded-full bg-opacity-70 text-white fixed top-[30%]">
				{open ? "Close" : "Chart"}
			</button>
		</Draggable>
	);
};

export default DraggableButton;
