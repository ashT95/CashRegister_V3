import React, { useState, useEffect } from "react";
import receiptImg from "../../assets/receipt.png";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItems, setCheckout } from "../redux/slices/cart";
import { resetPayment, showPayment } from "../redux/slices/payment";
import ReceiptItem from "../components/receiptItem";

export default function ReceiptContainer(props) {
	const { receiptText } = props;
	const { cartItems, quantity, totalAmount, checkout, locale } = useSelector(
		(state) => state.cart
	);

	const { show, paid, completed } = useSelector((state) => state.payment);
	const dispatch = useDispatch();

	const handleCheckout = () => {
		dispatch(setCheckout(false));
		dispatch(clearAllItems());
		dispatch(resetPayment());
	};

	const handleCancel = () => {
		dispatch(setCheckout(false));
		dispatch(clearAllItems());
		dispatch(resetPayment());
		dispatch(showPayment(false));
	};

	return (
		<div>
			{checkout && (
				<div>
					<div className="receipt-bg"></div>
					<div className="receipt-container">
						<img key="receipt-img" src={receiptImg} className="receipt-img" />
						<p id="receipt-header">
							{receiptText[0] ? locale == 'en' ? receiptText[0].attributes.Name : receiptText[0].attributes.localizations.data[0].attributes.Name : "RECEIPT"}
						</p>
						<div className="receipt-items">
							{cartItems.map((item) => {
								return <ReceiptItem key={item.id} {...item} />;
							})}
						</div>
						<div className="receipt-total">TOTAL:</div>
						<div className="receipt-total-amount">
							${parseFloat(totalAmount).toFixed(2)}
						</div>
						{!completed && (
							<p id="receipt-waiting">
								{receiptText[1]
									? locale == 'en' ? receiptText[1].attributes.Name : receiptText[1].attributes.localizations.data[0].attributes.Name
									: "Waiting for payment"}
							</p>
						)}
						{completed && (
							<p id="receipt-waiting">
								{receiptText[2]
									? locale == 'en' ? receiptText[2].attributes.Name : receiptText[2].attributes.localizations.data[0].attributes.Name
									: "Thank you! Come again!"}
							</p>
						)}
						{completed && (
							<button className="receipt-done" onClick={() => handleCheckout()}>
								{receiptText[3] ? locale == 'en' ? receiptText[3].attributes.Name : receiptText[3].attributes.localizations.data[0].attributes.Name : "DONE"}
							</button>
						)}
						{!completed && (
							<button className="receipt-cancel" onClick={() => handleCancel()}>
								CANCEL
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
