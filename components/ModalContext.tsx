"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalState {
	winrate: number;
	count: number;
	cost: number;
	dataIndex: number;
	countdown: string;
}

interface ModalContextType {
	state: ModalState;
	setState: React.Dispatch<React.SetStateAction<ModalState>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<ModalState>({
		winrate: 1.25,
		count: 1,
		cost: 0,
		dataIndex: 0,
		countdown: "00:00",
	});

	return (
		<ModalContext.Provider value={{ state, setState }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModalState = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModalState must be used within a ModalProvider");
	}
	return context;
};
