"use client";
import React from "react";

interface PredictTypeProps {
	onSelectPredictType: (type: string) => void;
	activeButton: string | null;
}

const PredictType: React.FC<PredictTypeProps> = ({
	onSelectPredictType,
	activeButton,
}) => {
	return (
		<div className="pt-3">
			<div className="text-gray-400">
				<p>PredictType</p>
			</div>
			<div className="flex justify-evenly pt-2">
				{["Custom", "Random", "Big", "Small", "Mantissa", "Area"].map(
					(buttonName) => (
						<button
							key={buttonName}
							onClick={() => onSelectPredictType(buttonName)}
							className={`px-1 py-1 rounded-md text-gray-500 border ${
								activeButton === buttonName
									? "text-sky-500  border-sky-500"
									: "border-gray-400"
							}`}>
							{buttonName}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default PredictType;
