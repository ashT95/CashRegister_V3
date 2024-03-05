import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";

export default function Product(props) {
	const { id, name, image, price, barcode, category } = props;

	const dispatch = useDispatch();

	const add = () => {
		const item = { ...props };
		dispatch(addToCart(item));
	};

	const remove = () => {
		dispatch(removeFromCart(id));
	};

	return (
		<button className="product-card" onClick={() => add()}>
			<img src={image} id="product-img" />
			<p className="product-name">{name}</p>
		</button>
	);
}
