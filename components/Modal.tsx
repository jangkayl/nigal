"use client";
import { changeProfileById } from "@/lib/actions/user.action";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
						{[
							"https://www.im2015.com/user-avatar/n1.png",
							"https://www.im2015.com/user-avatar/n2.png",
							"https://www.im2015.com/user-avatar/n3.png",
							"https://www.im2015.com/user-avatar/n4.png",
						].map((src) => (
							<Image
								key={src}
								src={src}
								alt="profile"
								width={70}
								height={70}
								className={`cursor-pointer
									${selectedImage === src ? "border rounded-xl border-blue-500" : ""}`}
								onClick={() => handleImageClick(src)}
							/>
						))}
					</div>
					<div className="px-4 py-5 text-center flex justify-between">
						{[
							"https://www.im2015.com/user-avatar/nv1.png",
							"https://www.im2015.com/user-avatar/nv2.png",
							"https://www.im2015.com/user-avatar/nv3.png",
							"https://www.im2015.com/user-avatar/nv4.png",
						].map((src) => (
							<Image
								key={src}
								src={src}
								alt="profile"
								width={70}
								height={70}
								className={`cursor-pointer
									${selectedImage === src ? "border rounded-xl border-blue-500" : ""}`}
								onClick={() => handleImageClick(src)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
