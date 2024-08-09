"use client";
import { changeProfileById } from "@/lib/actions/user.action";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import profile1 from "@/public/profile1.png";
import profile2 from "@/public/profile2.png";
import profile3 from "@/public/profile3.png";
import profile4 from "@/public/profile4.png";
import profilev1 from "@/public/profilev1.png";
import profilev2 from "@/public/profilev2.png";
import profilev3 from "@/public/profilev3.png";
import profilev4 from "@/public/profilev4.png";

interface ModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	userId: string;
	currentImg: string;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen, userId, currentImg }) => {
	const [selectedImage, setSelectedImage] = useState(currentImg);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const handleImageClick = async (imageSrc: string) => {
		setSelectedImage(imageSrc);
		await changeProfileById(userId, imageSrc);
		handleClose();
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				handleClose();
			}
		};
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClose, open]);

	return (
		<div
			tabIndex={-1}
			className={`${
				open ? "flex" : "hidden"
			} fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center bg-black bg-opacity-50`}>
			<div className="relative p-4 top-[-5rem] w-full max-w-sm">
				<div
					ref={modalRef}
					className="relative bg-white rounded-lg shadow">
					<div className="px-4 pt-5 text-center flex justify-between">
						{[profile1, profile2, profile3, profile4].map((src, index) => (
							<Image
								key={index}
								src={src}
								alt="profile"
								width={70}
								height={70}
								quality={100}
								className={`cursor-pointer
									${selectedImage === src.src ? "border rounded-xl border-blue-500" : ""}`}
								onClick={() => handleImageClick(src.src)}
							/>
						))}
					</div>
					<div className="px-4 py-5 text-center flex justify-between">
						{[profilev1, profilev2, profilev3, profilev4].map((src, index) => (
							<Image
								key={index}
								src={src}
								alt="profile"
								width={70}
								height={70}
								quality={100}
								className={`cursor-pointer
									${selectedImage === src.src ? "border rounded-xl border-blue-500" : ""}`}
								onClick={() => handleImageClick(src.src)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
