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
	image: string;
	title: string;
	price: string;
	cost: number;
};
