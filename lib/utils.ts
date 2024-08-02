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
