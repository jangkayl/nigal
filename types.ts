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
	isOnline: boolean;
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

export type pointsType = {
	image: any;
	title: string;
	price: string;
	cost: number;
	addBalance: number;
	index: number;
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
	returns: string | null;
	cost: number | null;
	result_number: number | null;
	result_serial: number | null;
	isDone: boolean | null;
	vipChoices: number[] | null;
};

export type userCreditType = {
	userId: string;
	orderNo: string;
	amount: number;
	status: boolean;
	createdAt: Date;
	bonus: number | null;
};
