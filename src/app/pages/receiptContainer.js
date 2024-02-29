import React, { useState, useEffect } from "react";
import receiptImg from "../../assets/receipt.png";
import { useDispatch, useSelector } from "react-redux";
import { clearAllItems, setCheckout } from "../redux/slices/cart";
import { resetPayment, showPayment } from "../redux/slices/payment";
import ReceiptItem from "../components/receiptItem";
import axios, { all } from "axios";
import { API_KEY, CMS_URL } from "../utils/constants";

export default function ReceiptContainer() {
	const { cartItems, quantity, totalAmount, checkout, locale } = useSelector(
		(state) => state.cart
	);
	const [receiptText, setReceiptText] = useState([]);

	const { show, paid, completed } = useSelector((state) => state.payment);
	const dispatch = useDispatch();

	const handleCheckout = () => {
		dispatch(setCheckout(false));
		dispatch(clearAllItems());
		dispatch(resetPayment());
	};

	const handleCancel = () => {
		dispatch(setCheckout(false));
		dispatch(resetPayment());
		dispatch(showPayment(false))
	}

	useEffect(() => {
		const fetchReceiptText = async () => {
			try {
				await axios
					.get(
						`${CMS_URL}/api/receipt-texts?[locale][$eq]=${locale}&populate=*`,
						{
							headers: {
								Authorization: `Bearer ${API_KEY}`,
								"Content-Type": "application/json",
							},
						}
					)
					.then((response) => {
						console.log(response);
						setReceiptText(response.data.data);
						if (localStorage.getItem('receiptText')) localStorage.removeItem('receiptText')
						localStorage.setItem('receiptText', JSON.stringify(response.data.data))
					});
			} catch (err) {
				console.log(err.message);
				let cachedData = JSON.parse(localStorage.getItem('receiptText'))
				setReceiptText(cachedData)
			}
		};

		fetchReceiptText();
	}, [locale]);

	return (
		<div>
			{checkout && (
				<div>
					<div className="receipt-bg"></div>
					<div className="receipt-container">
						<img src={receiptImg} className="receipt-img" alt="receipt-img" />
						<p id="receipt-header">
							{receiptText[0] ? receiptText[0].attributes.Name : "RECEIPT"}
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
									? receiptText[1].attributes.Name
									: "Waiting for payment"}
							</p>
						)}
						{completed && (
							<p id="receipt-waiting">
								{receiptText[2]
									? receiptText[2].attributes.Name
									: "Thank you! Come again!"}
							</p>
						)}
						{completed && (
							<button className="receipt-done" onClick={() => handleCheckout()}>
								{receiptText[3] ? receiptText[3].attributes.Name : "DONE"}
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
