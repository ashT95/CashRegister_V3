import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cartItem";
import { clearAllItems, removeLast, setCheckout } from "../redux/slices/cart";
import axios, { all } from "axios";
import { API_KEY, CMS_URL, LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { resetPayment } from "../redux/slices/payment";
import { showPayment } from "../redux/slices/payment";

export default function CartContainer() {
	const { cartItems, quantity, totalAmount, checkout, locale } = useSelector(
		(state) => state.cart
	);

	const [cartText, setCartText] = useState([]);
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

	useEffect(() => {
		const fetchCartText = async () => {
			try {
				await axios
					.get(`${CMS_URL}/api/cart-texts?[locale][$eq]=${locale}&populate=*`, {
						headers: {
							Authorization: `Bearer ${API_KEY}`,
							"Content-Type": "application/json",
						},
					})
					.then((response) => {
						console.log(response);
						setCartText(response.data.data);
						if (localStorage.getItem('cartText')) localStorage.removeItem('cartText')
						localStorage.setItem('cartText', JSON.stringify(response.data.data))
					});
			} catch (err) {
				console.log(err.message);
				let cachedData = JSON.parse(localStorage.getItem('cartText'))
				setCartText(cachedData)
			}
		};

		fetchCartText();
	}, [locale]);

	for (let i = 0; i < cartText.length; i++) {
		console.log(cartText[0].attributes.Name);
	}

	if (cartText[0]) {
		console.log(cartText[0].attributes.Name);
	}

	return (
		<div className="cart-container">
			<div className="cart-header">
				<div className="cart-quantity">
					{" "}
					{cartText[0] ? cartText[0].attributes.Name : "QUANTITY"}{" "}
				</div>
				<div className="cart-item">
					{cartText[1] ? cartText[1].attributes.Name : "ITEM"}
				</div>
				<div className="cart-amount">
					{cartText[2] ? cartText[2].attributes.Name : "AMOUNT"}
				</div>
			</div>
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
			<div className="action-button-wrapper">
				<button className="action-button" onClick={handleDeleteLast}>
					{cartText[3] ? cartText[3].attributes.Name : "DELETE LAST"}
				</button>
				<button className="action-button" onClick={handleClearAll}>
					{cartText[4] ? cartText[4].attributes.Name : "CLEAR ALL"}
				</button>
				<button className="action-button" onClick={handleCheckout}>
					{cartText[5] ? cartText[5].attributes.Name : "CHECK OUT"}
				</button>
			</div>
		</div>
	);
}
