import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
	users: [
		{
			name: "John",
			phone: "09165992052",
			password: hashSync("123456", 10),
			admin: true,
		},
		{
			name: "Kyle",
			phone: "09913622711",
			password: hashSync("123456", 10),
			admin: false,
		},
	],
};

export default sampleData;
