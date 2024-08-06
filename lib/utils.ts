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
