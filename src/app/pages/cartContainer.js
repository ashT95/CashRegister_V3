import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cartItem";
import { clearAllItems, removeLast, setCheckout } from "../redux/slices/cart";
import axios from "axios";
import { API_KEY, CMS_URL, LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { resetPayment } from "../redux/slices/payment";
import { showPayment } from "../redux/slices/payment";


export default function CartContainer(props) {
	const { cartText } = props;
	const { cartItems, quantity, totalAmount, checkout, locale } = useSelector(
		(state) => state.cart
	);

	const dispatch = useDispatch();

	const handleDeleteLast = () => {
		if (quantity) {
			dispatch(removeLast(cartItems[cartItems.length - 1]));
		}
	};

	const handleClearAll = () => {
		dispatch(clearAllItems());
	};

	const handleCheckout = () => {
		if (totalAmount !== 0) {
			dispatch(setCheckout(true));
			dispatch(showPayment(true));
		}
	};

	useEffect(() => {
		window.addEventListener("beforeunload", (event) => {
			dispatch(clearAllItems());
			dispatch(resetPayment());
			dispatch(showPayment(false));
		});
	}, []);

	return (
		<div className="cart-container">
			{cartText && (
				<div className="cart-header">
					<div className="cart-quantity">
						{cartText[0] ? locale == 'en' ? cartText[0].attributes.Name :  cartText[0].attributes.localizations.data[0].attributes.Name : "QUANTITY"}
					</div>
					<div className="cart-item">
						{cartText[1] ? locale == 'en' ? cartText[1].attributes.Name : cartText[1].attributes.localizations.data[0].attributes.Name : "ITEM"}
					</div>
					<div className="cart-amount">
						{cartText[2] ? locale == 'en' ? cartText[2].attributes.Name : cartText[2].attributes.localizations.data[0].attributes.Name : "AMOUNT"}
					</div>
				</div>
			)}

			<div className="cart-content">
				<div className="cart-added-items">
					{cartItems.map((item) => {
						return <CartItem key={item.id} {...item} />;
					})}
				</div>
			</div>
			<div className="cart-footer">
				<div className="total-amount">
					TOTAL
					<p id="total-price"> {`$${parseFloat(totalAmount).toFixed(2)}`} </p>
				</div>
			</div>
			{cartText && (
				<div className="action-button-wrapper">
					<button className="action-button" onClick={handleDeleteLast}>
						{cartText[3] ? locale == 'en' ? cartText[3].attributes.Name : cartText[3].attributes.localizations.data[0].attributes.Name : "DELETE LAST"}
					</button>
					<button className="action-button" onClick={handleClearAll}>
						{cartText[4] ? locale == 'en' ? cartText[4].attributes.Name : cartText[4].attributes.localizations.data[0].attributes.Name : "CLEAR ALL"}
					</button>
					<button className="action-button" onClick={handleCheckout}>
						{cartText[5] ? locale == 'en' ? cartText[5].attributes.Name : cartText[5].attributes.localizations.data[0].attributes.Name : "CHECK OUT"}
					</button>
				</div>
			)}
		</div>
	);
}
