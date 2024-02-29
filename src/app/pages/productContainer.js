import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios, { all } from "axios";
import Product from "../components/Product";
import { API_KEY, CMS_URL } from "../utils/constants";

export default function ProductContainer(props) {
	const { locale } = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);


	const fetchProducts = async () => {
		try {
			await axios
				.get(`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`, {
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					console.log(response)
					setProducts(response.data.data);
					if (localStorage.getItem('products')) localStorage.removeItem('products')
					localStorage.setItem('products', JSON.stringify(response.data.data))
				});
		} catch (err) {
			console.log(err.message);
			let cachedData = JSON.parse(localStorage.getItem('products'))
			setProducts(cachedData)
		}
	};

	const fetchCategories = async () => {
		try {
			await axios
				.get(`${CMS_URL}/api/categories?locale[$eq]=${locale}&populate=*`, {
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					console.log(response);
					setCategories(response.data.data);
					if (localStorage.getItem('categories')) localStorage.removeItem('categories')
					localStorage.setItem('categories', JSON.stringify(response.data.data))
				});
		} catch (err) {
			console.log(err.message);
			let cachedData = JSON.parse(localStorage.getItem('categories'))
			setCategories(cachedData)
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCategories();
	}, []);

	const dispatch = useDispatch();
	const [key, setKey] = useState(0);

	return (
		<div className="product-container">
			<Tabs defaultActiveKey={key} onSelect={(k) => setKey(k)} fill>
				{categories.map((category, index) => {
					if (category.attributes.products.data.length !== 0) {
						return (
							<Tab
								key={String(category.attributes.Name)}
								eventKey={index}
								title={String(category.attributes.Name)}
								tabClassName={`tabHead-${index}`}
							>
								<div className="tab-container">
									{products.map((product) => {
										if (
											category.attributes.Name ==
											product.attributes.category.data.attributes.Name
										)
											return (
												<Product
													key={product.id}
													id={product.id}
													name={product.attributes.Name}
													image={`${CMS_URL}${product.attributes.Image.data.attributes.formats.thumbnail.url}`}
													price={product.attributes.Price}
													barcode={product.attributes.Barcode}
												/>
											);
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
