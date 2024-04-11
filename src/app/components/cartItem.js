import { useDispatch, useSelector } from "react-redux";
import {
	removeFromCart,
	addItemQuantity,
	subtractItemQuantity,
} from "../redux/slices/cart";
import React, { useRef, useEffect, useState } from "react";

const CartItem = (props) => {
	const dispatch = useDispatch();
	const { image, name, price, quantity, ESname } = props;
	const [itemName, setItemName] = useState()
	const { locale } = useSelector((state) => state.cart);

	const divRef = useRef();

	function scrollToElement(ref) {
		if (!ref.current) return;
		ref.current.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}

	useEffect(() => {
		scrollToElement(divRef);
	}, [name, quantity]);

	useEffect(() => {
		if (locale == "en") setItemName(name)
		if (locale !== "en") setItemName(ESname)
	}, [locale])

	return (
		<div className="cart-added-item">
			<div className="cart-item-fields" ref={divRef}>
				<p id="cart-item-quantity"> {quantity}</p>
				<p id="cart-item-name">{itemName}</p>
				<p id="cart-item-price">{`$${parseFloat(price * quantity).toFixed(
					2
				)}`}</p>
			</div>
		</div>
	);
};

export default CartItem;
