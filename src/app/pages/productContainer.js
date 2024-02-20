import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios, { all } from "axios";
import Product from "../components/Product";
import { API_KEY, CMS_URL } from "../utils/constants";


export default function ProductContainer() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				await axios
					.get(`${CMS_URL}/api/products?populate=*`, {
						headers: {
							Authorization: `Bearer ${API_KEY}`,
							"Content-Type": "application/json",
						},
					})
					.then((response) => {
						console.log(response)
						setProducts(response.data.data);
					});
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchProducts();
	}, []);



	const categories = [
		{ id: 0, name: "FRUITS" },
		{ id: 1, name: "VEGETABLES" },
		{ id: 2, name: "DAIRY" },
	];

	const dispatch = useDispatch();
	const [key, setKey] = useState(0);

	return (
		<div className="product-container">
			<Tabs defaultActiveKey={key} onSelect={(k) => setKey(k)} fill>
				{categories.map((category) => {
					return (
						<Tab
							key={category.name}
							eventKey={category.id}
							title={category.name}
							tabClassName={`tabHead-${category.id}`}
						>
							<div className="tab-container">
								{products.map((product) => {
									return <Product 
											key={product.id} 
											id={product.id}
											name={product.attributes.Name}
											image={`${CMS_URL}${product.attributes.Image.data.attributes.formats.thumbnail.url}`}
											price={product.attributes.Price}
											barcode={product.attributes.Barcode}
											/>;
								})}
							</div>
						</Tab>
					);
				})}
			</Tabs>
		</div>
	);
}
