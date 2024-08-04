import Image from "next/image";
import React from "react";

const Partners = () => {
	return (
		<div className="py-2 px-1">
			<p>Partners</p>
			<div className="py-1 flex gap-3">
				<button>
					<Image
						src="https://manage.im2015.com//uploads/attach/2020/03/20200315/8abbd022d271c2177d3d314654ab6186.jpeg"
						width="0"
						height="0"
						sizes="100vw"
						className="w-full h-auto rounded-md"
						alt="gcash"
					/>
				</button>
				<button>
					<Image
						src="https://manage.im2015.com//uploads/attach/2020/04/20200404/3ef75b73bfe6c460000b83371803cbe0.png"
						width="0"
						height="0"
						sizes="90vw"
						className="w-full h-auto rounded-md"
						alt="youtube"
					/>
				</button>
			</div>
		</div>
	);
};

export default Partners;
