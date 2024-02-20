import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cartItem";
import { clearAllItems, removeLast, setCheckout } from "../redux/slices/cart";

export default function CartContainer() {
	const { cartItems, quantity, totalAmount, checkout } = useSelector(
		(state) => state.cart
	);
	const dispatch = useDispatch();

	console.log(checkout);

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
		}
	};

	return (
		<div className="cart-container">
			<div className="cart-header">
				<div className="cart-quantity">QTY.</div>
				<div className="cart-item">ITEM</div>
				
				<div className="cart-amount">AMOUNT</div>
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
					{" "}
					DELETE LAST{" "}
				</button>
				<button className="action-button" onClick={handleClearAll}>
					{" "}
					CLEAR ALL{" "}
				</button>
				<button className="action-button" onClick={handleCheckout}>
					{" "}
					CHECK OUT{" "}
				</button>
			</div>
		</div>
	);
}
