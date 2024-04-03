import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Product from "../components/Product";
import { CMS_URL, tabColors, API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setData, setImages } from "../redux/slices/product";

export default function ProductContainer(props) {
	const { products, categories } = props;
	const [key, setKey] = useState(0);
	const { locale } = useSelector((state) => state.cart);
	const dispatch = useDispatch()

	// const fetchImage = async (url) => {
	// 	return await new Promise((resolve, reject) => {
	// 		fetch(`${url}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		})
	// 			.then((response) => response.blob()) // sending the blob response to the next then
	// 			.then((blob) => {
	// 				const objectUrl = window.URL.createObjectURL(blob);

	// 				resolve(objectUrl);
	// 			}) // resolved the promise with the objectUrl
	// 			.catch((err) => {
	// 				//  reject(err);
	// 			}); // if there are any errors reject them
	// 	});
	// };

	// const getImage = async (url) => {
	// 	return await fetchImage(`${CMS_URL}${url}`);
	// };

	// useEffect(() => {
	// 	if (products) {
	// 		products.map((product) => {
	// 			dispatch(setData(product))
	// 			if (product.attributes.Image.data.attributes.formats.thumbnail.url) {
	// 				getImage(product.attributes.Image.data.attributes.formats.thumbnail.url)
	// 				.then((res) => {
	// 					localStorage.removeItem(`img-${product.id}`)
	// 					localStorage.setItem(`img-${product.id}`, res)
	// 					dispatch(setImages({id: product.id, blob: res}))
	// 				})
	// 				.catch((err) => {
	// 					if (err) {
	// 						let cachedImg = localStorage.getItem(`img-${product.id}`)
	// 						dispatch(setImages({ id: product.id, blob: cachedImg}))
	// 					}
	// 				})
	// 			}
	// 		})
	// 	}

	// }, [products])

	return (
		<div className="product-container">
			<Tabs defaultActiveKey={key} onSelect={(k) => setKey(k)} fill>
				{categories?.map((category, index) => {
					if (category.attributes.products.data.length > 0) {
						return (
							<Tab
								tabClassName={`tabHead-${index}`}
								key={String(category.attributes.Name)}
								eventKey={index}
								title={
									locale == "en"
										? String(category.attributes.Name)
										: String(
												category.attributes.localizations.data[0].attributes
													.Name
										  )
								}
							>
								<div
									className="tab-container"
									style={{ background: tabColors[index].background }}
								>
									{products?.map((product) => {
										if (
											category.attributes.Name ==
											product.attributes.category.data.attributes.Name
										) {
											return (
												<Product
													key={product.id}
													id={product.id}
													name={
														locale == "en"
															? product.attributes.Name
															: product.attributes.localizations.data[0]
																	.attributes.Name
													}
													image={`${CMS_URL}${product.attributes.Image.data.attributes.formats.thumbnail.url}`}
													price={product.attributes.Price}
													barcode={product.attributes.Barcode}
												/>
											);
										}
									})}
								</div>
							</Tab>
						);
					}
				})}
			</Tabs>
		</div>
	);
}
