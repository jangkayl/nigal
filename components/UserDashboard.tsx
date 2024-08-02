import Image from "next/image";
import React from "react";

const UserDashboard = () => {
	return (
		<div className="w-full px-5">
			<div className="bg-white w-full h-28 rounded-md p-3">
				<button className="px-2 py-2 text-center max-w-[7rem] flex flex-col items-center gap-2">
					<Image
						src="https://manage.im2015.com//uploads/attach/2020/03/20200308/88a4bcd006cf577ad9f3819b79448b88.png"
						alt="price"
						width={27}
						height={27}
					/>
					<p className="text-xs">Price opening record</p>
				</button>
			</div>
		</div>
	);
};

export default UserDashboard;
