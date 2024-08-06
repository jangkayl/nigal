import { orderType } from "@/types";
import { updateSuccessOrder } from "./actions/prize.action";

export const formatError = (error: any): string => {
	if (error.name === "ZodError") {
		const fieldErrors = Object.keys(error.errors).map((field) => {
			return `${error.errors[field].message}`; // field: errorMessage
		});
		return fieldErrors.join(". ");
	} else if (error.name === "ValidationError") {
		const fieldErrors = Object.keys(error.errors).map((field) => {
			const errorMessage = error.errors[field].message;
			return errorMessage;
		});
		return fieldErrors.join(". ");
	} else {
		return typeof error.message === "string"
			? error.message
			: JSON.stringify(error.message);
	}
};

export const formatDateTime = (date: Date | string | undefined) => {
	if (!date) return "";
	const d = typeof date === "string" ? new Date(date) : date;
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	const hours = String(d.getHours()).padStart(2, "0");
	const minutes = String(d.getMinutes()).padStart(2, "0");
	const seconds = String(d.getSeconds()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

let isCronJobInitialized = false;
let cronJobIntervalId: NodeJS.Timeout | null = null;
let initialTimeoutId: NodeJS.Timeout | null = null;
let stopJob = false;
let currentJobPromise: Promise<void> | null = null;

export const updateOrderStatus = async (order: orderType) => {
	const image =
		"https://manage.im2015.com//uploads/attach/2020/05/20200515/0e8c80facdfc560b7e45e3281b20c13c.png";
	const returns = "Win the lottery";
	const status = "Sales success";
	const total = order.total * 2;
	await updateSuccessOrder(order.orderNo, image, returns, status, total);
	window.location.reload();
};

function getDelayToNextMinute(): number {
	const now = new Date();
	const nextMinute = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		now.getHours(),
		now.getMinutes() + 1,
		0,
		0
	);
	return nextMinute.getTime() - now.getTime();
}

// Cron job function
const job = async () => {
	if (stopJob) return; // Exit if stop flag is set

	try {
		console.log("Cron job started at", new Date().toISOString());
		await updateOrderStatus();
		if (stopJob) return; // Check stop flag after async operation
		console.log("Cron job completed at", new Date().toISOString());
	} catch (error) {
		console.error("Error during cron job execution:", error);
	}
};

// Initialize and start the cron job
export const startCronJob = () => {
	if (isCronJobInitialized) {
		console.log("Cron job is already initialized.");
		return;
	}

	isCronJobInitialized = true;
	stopJob = false;

	// Set up the job to run every minute
	const interval = 60000; // 60,000 milliseconds (1 minute)

	initialTimeoutId = setTimeout(async () => {
		if (stopJob) return; // Exit if stop flag is set before starting the initial job

		await job(); // Execute the initial job
		if (stopJob) return; // Check stop flag after initial job execution

		cronJobIntervalId = setInterval(async () => {
			if (stopJob) {
				clearInterval(cronJobIntervalId as any);
				cronJobIntervalId = null;
				return;
			}

			// Wait for the current job to finish before starting a new one
			if (currentJobPromise) await currentJobPromise;
			currentJobPromise = job();
			await currentJobPromise;
		}, interval);
	}, getDelayToNextMinute());

	console.log("Cron job scheduled to start.");
};

// Function to stop the cron job
export const stopCronJob = () => {
	stopJob = true;

	// Clear the interval and timeout if they exist
	if (cronJobIntervalId) {
		clearInterval(cronJobIntervalId);
		cronJobIntervalId = null;
	}

	if (initialTimeoutId) {
		clearTimeout(initialTimeoutId);
		initialTimeoutId = null;
	}

	// Wait for any ongoing job to complete
	if (currentJobPromise) {
		currentJobPromise.finally(() => {
			console.log("Cron job stopped.");
		});
	} else {
		console.log("Cron job stopped.");
	}

	isCronJobInitialized = false;
};
