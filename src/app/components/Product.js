import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, setLocale } from "../redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";
import { CMS_URL, API_KEY } from "../utils/constants";
import axios, { all } from "axios";
import { setData, setImages } from "../redux/slices/product";

export default function Product(props) {
	const { id, name, image, price, barcode, category, ESname } = props;
	const { locale } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const [Img, setImg] = useState();

	const { images } = useSelector((state) => state.product);

	const add = () => {
		const item = { ...props };
		if (item) dispatch(addToCart(item));
	};

	const fetchImage = async (url) => {
		return await new Promise((resolve, reject) => {
			fetch(`${url}`, {
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.blob()) // sending the blob response to the next then
				.then((blob) => {
					const objectUrl = window.URL.createObjectURL(blob);
					const reader = new FileReader();
					reader.readAsDataURL(blob);

					reader.onloadend = () => {
						setImg(reader.result);
						localStorage.removeItem(`img-${id}`);
						localStorage.setItem(`img-${id}`, reader.result);
						// console.log(reader.result);
						return reader.result;
					};

					//return resolve(reader.result);
				}) // resolved the promise with the objectUrl
				.catch((err) => {
					// reject(err);
				}); // if there are any errors reject them
		});
	};

	useEffect(() => {
		if (id && image) {
			fetchImage(image);
		}
	}, [id, image]);

	return (
		<button className="product-card" onClick={() => add()}>
			<img src={Img ? Img : localStorage.getItem(`img-${id}`)} id={`product-img`} />
			<p className="product-name">{locale == "en" ? name : ESname}</p>
		</button>
	);
}
