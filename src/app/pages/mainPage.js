import React, { useEffect, useState } from "react";
import ProductContainer from "./productContainer";
import ReceiptContainer from "./receiptContainer";
import CartContainer from "./cartContainer";
import bgTop from "../../assets/bg_top.png";
import { CMS_URL, API_KEY, LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import cart, { setLocale } from "../redux/slices/cart";
import { useQuery, onlineManager, useQueryClient } from "@tanstack/react-query";
import axios, { all } from "axios";
import { setData, setImages } from "../redux/slices/product";

export default function MainPage(props) {
	const { queryClient } = props;
	const [lang, setLang] = useState(LOCALE_EN);
	const [buttonText, setButtonText] = useState("Español");
	const { locale } = useSelector((state) => state.cart);

	const [isOnline, setIsOnline] = useState(true)

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

	const [products, setProducts] = useState();
	const [categories, setCategories] = useState();
	const [receiptText, setReceiptText] = useState();
	const [cartText, setCartText] = useState();


	function fetchProducts(locale) {
		fetch(`${CMS_URL}/api/products?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("products");
				localStorage.setItem("products", JSON.stringify(res.data));
				setProducts(res.data);
			})
			.catch((err) => {
				if (err) {
					let cachedata = localStorage.getItem("products")
					setProducts(JSON.parse(cachedata))
				}
			})
	}

	function fetchCategories(locale) {
		fetch(`${CMS_URL}/api/categories?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("categories");
				localStorage.setItem("categories", JSON.stringify(res.data));
				setCategories(res.data);
			})
			.catch((err) => {
				if (err) {
					let cachedata = localStorage.getItem("categories")
					setCategories(JSON.parse(cachedata))
				}
			})
	}

	function fetchCartText(locale) {
		fetch(`${CMS_URL}/api/cart-texts?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("cart-text");
				localStorage.setItem("cart-text", JSON.stringify(res.data));
				setCartText(res.data);
			})
			.catch((err) => {
				if (err) {
					let cachedata = localStorage.getItem("cart-text")
					setCartText(JSON.parse(cachedata))
				}
			})
	}

	function fetchReceiptText(locale) {
		fetch(`${CMS_URL}/api/receipt-texts?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("receipt-text");
				localStorage.setItem("receipt-text", JSON.stringify(res.data));
				setReceiptText(res.data);
			})
			.catch((err) => {
				if (err) {
					let cachedata = localStorage.getItem("receipt-text")
					setReceiptText(JSON.parse(cachedata))
				}
			})
	}


	useEffect(() => {
		fetchProducts(locale);
		fetchCategories(locale);
		fetchCartText(locale);
		fetchReceiptText(locale);
	}, [locale]);

	

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
					<ProductContainer
						locale={locale}
						// products={locale == "es" ? productses : productsen}
						// categories={locale == "en" ? categoriesen : categorieses}
						products={products}
						categories={categories}
					/>
					<CartContainer
						// cartText={locale == "es" ? cartTextes : cartTexten}
						cartText={cartText}
					/>
					<ReceiptContainer
						receiptText={receiptText}
						// receiptText={locale == "es" ? receiptTextes : receiptTexten}
					/>
				</div>
			</div>
		</div>
	);
}
