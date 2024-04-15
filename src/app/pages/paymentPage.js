import React, { useEffect, useState } from "react";
import PayBG from "../../assets/paymodule/pay_logo.png";
import PayHeader from "../../assets/paymodule/payment-header.png";
import PayFooter from "../../assets/paymodule/payment-footer.png";
import PayImage from "../../assets/paymodule/paidStamp.png";
import One from "../../assets/paymodule/one.png";
import Five from "../../assets/paymodule/five.png";
import Dime from "../../assets/paymodule/dime.png";
import Nickel from "../../assets/paymodule/nickel.png";
import Penny from "../../assets/paymodule/penny.png";
import Ten from "../../assets/paymodule/ten.png";
import Twenty from "../../assets/paymodule/twenty.png";
import Quarter from "../../assets/paymodule/quarter.png";
import { useDispatch, useSelector } from "react-redux";
import {
	addPaymentItem,
	showPayment,
	donePayment,
	resetPayment,
} from "../redux/slices/payment";
import axios, { all } from "axios";
import { API_KEY, CMS_URL, LOCALE_EN } from "../utils/constants";
import {useQuery, useQueryClient } from '@tanstack/react-query';

export default function PaymentPage(props) {
	const { queryClient } = props;
	
	const { cartItems, quantity, totalAmount, checkout, locale } = useSelector(
		(state) => state.cart
	);
	const { show, paid, completed } = useSelector((state) => state.payment);

	const [remainder, setRemainder] = useState(0);
	const [change, setChange] = useState(0);
	const dispatch = useDispatch();

	const bills = [
		{ value: 1, image: One },
		{ value: 5, image: Five },
		{ value: 10, image: Ten },
		{ value: 20, image: Twenty },
	];

	const coins = [
		{ value: 0.01, image: Penny },
		{ value: 0.05, image: Nickel },
		{ value: 0.1, image: Dime },
		{ value: 0.25, image: Quarter },
	];

	const handlePay = (value) => {
		dispatch(addPaymentItem(value));
	};

	const [paymentText, setPaymentText] = useState()

	const fetchPaymentText = async ({signal}) => {
		const response = await axios.get(
			`${CMS_URL}/api/payment-texts?&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
				signal
			},
			
		);

		if (response) {
			localStorage.removeItem("paymentText");
			localStorage.setItem("paymentText", JSON.stringify(response.data.data));
			return response.data.data;
		} 
	};

	const { data: payment } = useQuery({
		queryKey: ["paymentText"],
		queryFn: ({signal}) => fetchPaymentText({signal}),
		initialData: () => {
			const cachedData = queryClient.getQueryData("paymentText");
			if (cachedData) {
				return cachedData;
			}
		},
		refetchOnReconnect: "always",
		refetchInterval: 1000 * 60 * 60 * 24, // refetch every 24 hours
	});

	useEffect(() => {
		if (payment) setPaymentText(payment)
		if (!payment) setPaymentText(JSON.parse(localStorage.getItem("paymentText")))
	}, [payment])


	useEffect(() => {
		let temp = totalAmount - paid;
		if (temp >= 0) {
			setRemainder((remainder) => temp);
		} else {
			setRemainder(0);
		}

		if (paid != 0 && totalAmount != 0 && paid >= totalAmount) {
			dispatch(donePayment());
		}

		if (completed) {
			let t = paid - totalAmount;
			setChange(t);
		}
	}, [paid, totalAmount, completed, change]);

	useEffect(() => {
		console.log(cartItems.length);
		if (cartItems.length == 0) {
			dispatch(resetPayment());
			dispatch(showPayment(false));
		}
		
	}, [cartItems]);

	return (
		<div className="payment-wrapper">
			<div className="payment-bg">
				<img src={PayBG} id="paybg-img" />
			</div>
			{show && paymentText &&(
				<div
					className="pay-content"
					style={{ display: checkout ? "flex" : "none" }}
				>
					<div className="pay-left">
						<img src={PayHeader} id="payheader-img" />
						<div className="pay-amount">
							<div className="pay-amount-left">
								<p id="pay-amount-total">Total: </p>
								<p id="pay-amount-paid">
									{paymentText[0]
										? locale == LOCALE_EN ? paymentText[0].attributes.Name + ":" 
										: paymentText[0].attributes.localizations.data[0].attributes.Name + ":"
										: "Amount Paid:"}{" "}
								</p>
								<p id="pay-amount-to-go">
									{paymentText[1]
										? locale == LOCALE_EN ? paymentText[1].attributes.Name + ":" 
										: paymentText[1].attributes.localizations.data[0].attributes.Name + ":"
										: "Amount to go:"}{" "}
								</p>
							</div>
							<div className="pay-amount-right">
								<p id="pay-amount-total">{`$${parseFloat(totalAmount).toFixed(
									2
								)}`}</p>
								<p id="pay-amount-paid">{`$${parseFloat(paid).toFixed(2)}`}</p>
								<p id="pay-amount-to-go">{`$${parseFloat(remainder).toFixed(
									2
								)}`}</p>
							</div>
						</div>

						<div
							className="payment-footer"
							style={{ opacity: !completed ? 1 : 0 }}
						>
							<img src={PayFooter} id="payfooter-img" />
						</div>
						<div
							className="payment-footer-text"
							style={{ opacity: !completed ? 1 : 0 }}
						>
							<h6>
								{paymentText[2]
									? locale == LOCALE_EN ? paymentText[2].attributes.Name + ":" 
									: paymentText[2].attributes.localizations.data[0].attributes.Name + ":"
									: "TOUCH BILLS AND COINS TO PAY:"}{" "}
							</h6>
						</div>

						<div
							className="paid-img"
							style={{ display: completed ? "block" : "none" }}
						>
							<img src={PayImage} id="paid-image" />
						</div>
						<div
							className="paid-change-container"
							style={{ display: completed ? "block" : "none" }}
						></div>
						<p
							id={locale == LOCALE_EN ? "paid-change-text-1" : "paid-change-text-2"}
							style={{ display: completed ? "block" : "none" }}
						>
							{paymentText[3]
								? locale == LOCALE_EN ? paymentText[3].attributes.Name + ":" 
								: paymentText[3].attributes.localizations.data[0].attributes.Name + ":"
								: "Change:"}
						</p>
						<p
							id="paid-change-amount"
							style={{ display: completed ? "block" : "none" }}
						>{`$${parseFloat(change).toFixed(2)}`}</p>
					</div>
					<div className="pay-right">
						<div className="pay-cash">
							{bills.map((bill) => {
								return (
									<img
										key={bill.value}
										src={bill.image}
										onClick={() => handlePay(bill)}
									/>
								);
							})}
						</div>
						<div className="pay-coins">
							{coins.map((coin) => {
								return (
									<img
										key={coin.value}
										src={coin.image}
										onClick={() => handlePay(coin)}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
