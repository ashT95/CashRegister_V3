import React, { useState } from "react";
import receiptImg from "../../assets/receipt.png";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItems, setCheckout } from "../redux/slices/cart";
import { resetPayment } from "../redux/slices/payment";
import ReceiptItem from "../components/receiptItem";

export default function ReceiptContainer() {
	const { cartItems, quantity, totalAmount, checkout } = useSelector(
		(state) => state.cart
	);

	const { show, paid, completed } = useSelector((state) => state.payment);
	const dispatch = useDispatch();

	const handleCheckout = () => {
		dispatch(setCheckout(false));
		dispatch(clearAllItems());
		dispatch(resetPayment());
	};

	return (
		<div>
			{checkout && (
				<div>
					<div className="receipt-bg"></div>
					<div className="receipt-container">
						<img src={receiptImg} className="receipt-img" alt="receipt-img" />
						<p id="receipt-header">RECEIPT</p>
						<div className="receipt-items">
							{cartItems.map((item) => {
								return <ReceiptItem key={item.id} {...item} />;
							})} 
						</div>
						<div className="receipt-total">TOTAL:</div>
						<div className="receipt-total-amount">
							${parseFloat(totalAmount).toFixed(2)}
						</div>
						{!completed && <p id="receipt-waiting">Waiting for payment</p>}
						{completed && <p id="receipt-waiting">Thank you! Come again!</p>}
						{completed && (
							<button className="receipt-done" onClick={() => handleCheckout()}>
								DONE
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
