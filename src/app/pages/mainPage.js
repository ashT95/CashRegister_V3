import React, { useEffect, useState } from "react";
import ProductContainer from "./productContainer";
import ReceiptContainer from "./receiptContainer";
import CartContainer from "./cartContainer";
import bgTop from "../../assets/bg_top.png";
import { CMS_URL, API_KEY, LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../redux/slices/cart";
import { useQuery, onlineManager } from "@tanstack/react-query";
import axios, { all } from "axios";

export default function MainPage(props) {
	const { queryClient } = props;
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

	const fetchProducts = async (locale) => {
		const response = await axios.get(
			`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
		//localStorage.setItem('products', JSON.stringify(response.data.data))
		return response.data.data;
	};

	const fetchCategories = async (locale) => {
		const response = await axios.get(
			`${CMS_URL}/api/categories?[locale][$eq]=${locale}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data.data;
	};

	const fetchCartText = async (locale) => {
		const response = await axios.get(
			`${CMS_URL}/api/cart-texts?[locale][$eq]=${locale}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
		
		return response.data.data;
	};

	const fetchReceiptText = async (locale) => {
		const response = await axios.get(
			`${CMS_URL}/api/receipt-texts?[locale][$eq]=${locale}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data.data;
	};

	const { data: receiptText } = useQuery({
		queryKey: ["receiptText", locale],
		queryFn: () => fetchReceiptText(locale),
		staleTime: 5000,
		cacheTime: Infinity,
		initialData: () => {
			const cachedData = queryClient.getQueryData(['receiptText'])
			if (cachedData) {
				return cachedData
			} 
		}
	});

	const { data: cartText } = useQuery({
		queryKey: ["cartText", locale],
		queryFn: () => fetchCartText(locale),
		staleTime: 5000,
		cacheTime: Infinity,
		initialData: () => {
			const cachedData = queryClient.getQueryData(['cartText'])
			if (cachedData) {
				return cachedData
			} 
		}
	});

	const { data: products } = useQuery({
		queryKey: ["products", locale],
		queryFn: () => fetchProducts(locale),
		staleTime: 5000,
		cacheTime:  Infinity,
		initialData: () => {
			const cachedData = queryClient.getQueryData(['products'])
			if (cachedData) {
				return cachedData
			} 
		}
	});

	const { data: categories } = useQuery({
		queryKey: ["categories", locale],
		queryFn: () => fetchCategories(locale),
		staleTime: 5000,
		cacheTime: Infinity,
		initialData: () => {
			const cachedData = queryClient.getQueryData(['categories'])
			if (cachedData) {
				return cachedData
			} 
		}
	});


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
						products={products}
						categories={categories}
					/>
					<CartContainer cartText={cartText} />
					<ReceiptContainer receiptText={receiptText} />
				</div>
			</div>
		</div>
	);
}
