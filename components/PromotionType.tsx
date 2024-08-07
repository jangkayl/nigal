import Image from "next/image";
import React from "react";

const PromotionType = () => {
	return (
		<div className="py-5 px-1">
			<p>Promotion Type</p>
			<div className="py-3 flex gap-3">
				<button>
					<Image
						src="https://manage.im2015.com//uploads/attach/2020/03/20200308/2c0addb4118e3500cdf4e42bfe0065d3.png"
						width={170}
						height={1}
						alt="promotion"
						className="rounded-md"
						style={{ width: "auto", height: "auto" }}
					/>
				</button>
				<button>
					<Image
						src="https://manage.im2015.com//uploads/attach/2020/03/20200308/09ca72d62b96da0044dce0c2920f701e.png"
						width={170}
						height={1}
						alt="promotion"
						className="rounded-md"
					/>
				</button>
			</div>
		</div>
	);
};

export default PromotionType;
