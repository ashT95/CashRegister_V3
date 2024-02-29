import React, { useEffect, useState } from "react";
import ProductContainer from "./productContainer";
import ReceiptContainer from "./receiptContainer";
import CartContainer from "./cartContainer";
import bgTop from "../../assets/bg_top.png";
import { LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../redux/slices/cart";

export default function MainPage() {
	const [lang, setLang] = useState(LOCALE_EN);
	const [buttonText, setButtonText] = useState("Español");

	const { locale } = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const ChangeLanguage = () => {
		if (lang == LOCALE_EN) setLang(LOCALE_ES);
		if (lang == LOCALE_ES) setLang(LOCALE_EN);
	};

	useEffect(() => {
		if (lang == LOCALE_EN) setButtonText("Español");
		if (lang == LOCALE_ES) setButtonText("English");
		dispatch(setLocale(lang));
	}, [lang, buttonText]);

	return (
		<div className="main-wrapper">
			<div className="main">
				<div className="header">
					<img src={bgTop} alt="bg" id="bgTop" />
				</div>
				<button className="language-button" onClick={() => ChangeLanguage()}>
					{buttonText}
				</button>
				<div className="body">
					<ProductContainer locale={locale} />
					<CartContainer />
					<ReceiptContainer />
				</div>
			</div>
		</div>
	);
}
