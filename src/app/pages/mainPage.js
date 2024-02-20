import React, { useEffect, useState } from "react";
import ProductContainer from "./productContainer";
import ReceiptContainer from "./receiptContainer";
import CartContainer from "./cartContainer";
import bgTop from "../../assets/bg_top.png";

export default function MainPage() {
	const ChangeLanguage = () => {

	}

	return (
		<div className="main-wrapper">
			<div className="main">
				<div className="header">
					<img src={bgTop} alt="bg" id="bgTop" />
				</div>
				<button className="language-button" onClick={() => ChangeLanguage()}>Español</button>
				<div className="body">
					<ProductContainer />
					<CartContainer />
					<ReceiptContainer />
				</div>
			
			</div>
		</div>
	);
}
