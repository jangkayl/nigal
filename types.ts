export type userType = {
	id: string;
	phone: string;
	uid: string;
	name: string;
	image: string;
	admin: boolean;
	balance: number;
	points: number;
	createdAt: Date;
};

export type prizeType = {
	time: Date | string;
	serial: number;
	number: number;
	result_value: number;
	result: string;
};

export type detailType = {
	image: any;
	title: string;
	price: string;
	cost: number;
};

export type orderType = {
	orderNo: string;
	item: number;
	time: Date | string;
	status: string;
	games: string | null;
	opening_time: Date | null;
	my_choice: number | null;
	total: number;
	userId: string;
	image: string | null;
	index: number | null;
};
