import { getAllPrizes } from "@/lib/actions/prize.action";
import { prizeType } from "@/types";
import React, { useEffect, useState } from "react";

interface PrizeProps {
	prizes: prizeType[];
}

const BelowChart = ({ prizes }: PrizeProps) => {
	const [evenCount, setEvenCount] = useState<number>(0);
	const [oddCount, setOddCount] = useState<number>(0);

	useEffect(() => {
		const evenPrizes = prizes.filter((prize) => prize.number % 2 === 0).length;
		const oddPrizes = prizes.length - evenPrizes;

		setEvenCount(evenPrizes);
		setOddCount(oddPrizes);
	}, [prizes]);

	const renderRows = () => {
		const numColumns = 10; // Number of columns
		const numRows = 5; // Number of rows

		// Initialize columns array with empty arrays for each column
		const columns: string[][] = Array.from({ length: numColumns }, () => []);

		prizes.forEach((prize, index) => {
			const isEven = prize.number % 2 === 0;
			const type = isEven ? "E" : "O";

			// Calculate the column and row index
			const columnIndex = Math.floor(index / numRows);
			const rowIndex = index % numRows;

			// Ensure we're within the number of columns
			if (columnIndex < numColumns) {
				columns[columnIndex][rowIndex] = type;
			}
		});

		// Ensure each column has exactly numRows elements, fill with empty strings if needed
		columns.forEach((column) => {
			while (column.length < numRows) {
				column.push("");
			}
		});

		// Create rows from columns
		return Array.from({ length: numRows }, (_, rowIndex) => (
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
							} h-full w-full flex items-center justify-center`}>
							{column[rowIndex] || " "}
						</p>
					</td>
				))}
			</tr>
		));
	};

	return (
		<div>
			<div className="text-center py-2 w-full bg-[#e1e4e5]">
				<p>Trend of recent 50 periods</p>
			</div>
			<div className="overflow-y-auto scrollbar-hide flex">
				<table className="w-[18rem]">
					<tbody>{renderRows()}</tbody>
				</table>
				<div className="flex justify-center items-center flex-col w-[6rem] gap-1">
					<div className="w-10 h-10 border-[6px] border-red-500 rounded-full flex justify-center items-center text-red-500">
						<p>{oddCount}</p>
					</div>
					<p className="text-red-500">
						V<span className="text-blue-500">S</span>
					</p>
					<div className="w-10 h-10 border-[6px] border-blue-500 rounded-full flex justify-center items-center text-blue-500">
						<p>{evenCount}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BelowChart;
