import { prizeType } from "@/types";
import React from "react";

interface PrizeProps {
	prizes: prizeType[];
}

const Chart = ({ prizes }: PrizeProps) => {
	const renderRows = () => {
		const columns: string[][] = Array.from({ length: 50 }, () => []);
		let currentColumnIndex = 0;
		let lastType: "E" | "O" | null = null;

		prizes.forEach((prize) => {
			const isEven = prize.number % 2 === 0;
			const type = isEven ? "E" : "O";

			if (lastType !== null && lastType !== type) {
				currentColumnIndex++;
				if (currentColumnIndex >= 50) {
					currentColumnIndex = 0;
				}
			}

			columns[currentColumnIndex].push(type);

			lastType = type;
		});

		// Create rows from columns
		return Array.from({ length: 20 }, (_, rowIndex) => (
			<tr key={rowIndex}>
				{columns.map((column, colIndex) => (
					<td
						key={colIndex}
						className="border-gray-400 text-center border-[2px] w-10 h-7">
						<p
							className={`rounded-full ${
								column[rowIndex] === "E"
									? "bg-blue-600 text-white"
									: column[rowIndex] === "O"
									? "bg-red-600 text-white"
									: "bg-gray-200"
							}`}>
							{column[rowIndex] || " "}
						</p>
					</td>
				))}
			</tr>
		));
	};

	return (
		<div className="overflow-y-auto max-h-64 scrollbar-hide">
			<table className="w-full min-w-[90rem]">
				<tbody>{renderRows()}</tbody>
			</table>
		</div>
	);
};

export default Chart;
