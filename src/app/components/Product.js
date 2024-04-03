import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, setLocale } from "../redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";
import { CMS_URL, API_KEY } from "../utils/constants";
import axios, { all } from "axios";
import { setData, setImages } from "../redux/slices/product";

export default function Product(props) {
	const { id, name, image, price, barcode, category } = props;
	const dispatch = useDispatch();

	const add = () => {
		const item = { ...props };
		if (item) dispatch(addToCart(item));
	};

	const {images, data} = useSelector((state) => state.product)
	
	console.log(images)

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
					localStorage.removeItem(`img-${id}`)
					localStorage.setItem(`img-${id}`, objectUrl)
					resolve(objectUrl);
				}) // resolved the promise with the objectUrl
				.catch((err) => {
					let cachedImg = localStorage.getItem(`img-${id}`)
					resolve(cachedImg)
					//  reject(err);
				}); // if there are any errors reject them
		});
	};



	useEffect(() => {
		const item = { ...props };
		if (item) dispatch(setData(item));
		if (id && image) {
			try {
				fetchImage(image).then((res) => {
					localStorage.removeItem(`img-${id}`)
					localStorage.setItem(`img-${id}`, res)
					dispatch(setImages({ id: id, blob: res }));
				});
			} catch (error) {
				let cachedImg = localStorage.getItem(`img-${id}`)
				dispatch(setImages({ id: id, blob: cachedImg }))
			}
		}
	}, [id, image]);


	return (
		<button className="product-card" onClick={() => add()}>
			<img src={images[id]} id={`product-img`} />
			<p className="product-name">{name}</p>
		</button>
	);
}
