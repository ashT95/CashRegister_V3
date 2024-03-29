import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, setLocale } from "../redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";
import { CMS_URL, API_KEY } from "../utils/constants";
import axios, { all } from "axios";

export default function Product(props) {
	const { id, name, image, price, barcode, category } = props;
	const dispatch = useDispatch();


	const add = () => {
		const item = { ...props };
		if (item) dispatch(addToCart(item));
	};




	return (
		<button className="product-card" onClick={() => add()}>
			<img src={`${CMS_URL}${image}`} id="product-img" />
			<p className="product-name">{name}</p>
		</button>
	);
}
