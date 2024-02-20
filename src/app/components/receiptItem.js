import { useDispatch } from "react-redux";

const ReceiptItem = (props) => {
	const dispatch = useDispatch();
	const { image, name, price, quantity } = props;

	return (
		<div className="receipt-added-item">
			<div className="receipt-item-fields">
				<p id="receipt-item-name">{name}</p>
				<p id="receipt-item-quantity"> {quantity}</p>
				<p id="receipt-item-price">{`$${parseFloat(price * quantity).toFixed(2)}`}</p>
			</div>
		</div>
	);
};

export default ReceiptItem;
