import { useDispatch } from "react-redux";
import {
	removeFromCart,
	addItemQuantity,
	subtractItemQuantity,
} from "../redux/slices/cart";

const CartItem = (props) => {
	const dispatch = useDispatch();
	const { image, name, price, quantity } = props;

	return (
		<div className="cart-added-item">
			<div className="cart-item-fields">
				<p id="cart-item-quantity"> {quantity}</p>
				<p id="cart-item-name">{name}</p>
				<p id="cart-item-price">{`$${parseFloat(price * quantity).toFixed(2)}`}</p>
			</div>
		</div>
	);
};

export default CartItem;
