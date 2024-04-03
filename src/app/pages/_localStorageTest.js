const [products, setProducts] = useState();
	const [categories, setCategories] = useState();
	const [receiptText, setReceiptText] = useState();
	const [cartText, setCartText] = useState();

	function fetchProducts(locale) {
		fetch(`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("products");
				localStorage.setItem("products", res.data);
				setProducts(res.data);
			});
	}

	function fetchCategories(locale) {
		fetch(`${CMS_URL}/api/categories?[locale][$eq]=${locale}&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("categories");
				localStorage.setItem("categories", res.data);
				setCategories(res.data);
			});
	}

	function fetchCartText(locale) {
		fetch(`${CMS_URL}/api/cart-texts?[locale][$eq]=${locale}&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("cart-text");
				localStorage.setItem("cart-text", res.data);
				setCartText(res.data);
			});
	}

	function fetchReceiptText(locale) {
		fetch(`${CMS_URL}/api/receipt-texts?[locale][$eq]=${locale}&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				localStorage.removeItem("receipt-text");
				localStorage.setItem("receipt-text", res.data);
				setReceiptText(res.data);
			});
	}

	useEffect(() => {
		fetchProducts(locale);
		fetchCategories(locale);
		fetchCartText(locale);
		fetchReceiptText(locale);
	}, [locale]);




	// const fetchProducts = async (locale) => {
	// 	const response = await axios.get(
	// 		`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);

	// 	return response.data.data;
	// };

	// const fetchCategories = async (locale) => {
	// 	const response = await axios.get(
	// 		`${CMS_URL}/api/categories?[locale][$eq]=${locale}&populate=*`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);

	// 	return response.data.data;
	// };

	// const fetchCartText = async (locale) => {
	// 	const response = await axios.get(
	// 		`${CMS_URL}/api/cart-texts?[locale][$eq]=${locale}&populate=*`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);

	// 	return response.data.data;
	// };

	// const fetchReceiptText = async (locale) => {
	// 	const response = await axios.get(
	// 		`${CMS_URL}/api/receipt-texts?[locale][$eq]=${locale}&populate=*`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${API_KEY}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);

	// 	return response.data.data;
	// };

	// // using react-query to get and store data

	// const { data: receiptTexten } = useQuery({
	// 	queryKey: ["receiptTexten", "en"],
	// 	queryFn: () => fetchReceiptText("en"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["receiptTexten"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: receiptTextes } = useQuery({
	// 	queryKey: ["receiptTextes", "es"],
	// 	queryFn: () => fetchReceiptText("es"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["receiptTextes"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: cartTexten } = useQuery({
	// 	queryKey: ["cartTexten", "en"],
	// 	queryFn: () => fetchCartText("en"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["cartTexten"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: cartTextes } = useQuery({
	// 	queryKey: ["cartTextes", "es"],
	// 	queryFn: () => fetchCartText("es"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["cartTextes"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: productsen } = useQuery({
	// 	queryKey: ["productsen", "en"],
	// 	queryFn: () => fetchProducts("en"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["productsen"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: productses } = useQuery({
	// 	queryKey: ["productses", "es"],
	// 	queryFn: () => fetchProducts("es"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["productses"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: categoriesen } = useQuery({
	// 	queryKey: ["categoriesen", "en"],
	// 	queryFn: () => fetchCategories("en"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["categoriesen"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });

	// const { data: categorieses } = useQuery({
	// 	queryKey: ["categorieses", "es"],
	// 	queryFn: () => fetchCategories("es"),
	// 	initialData: () => {
	// 		const cachedData = queryClient.getQueryData(["categorieses"]);
	// 		if (cachedData) {
	// 			return cachedData;
	// 		}
	// 	},
	// });