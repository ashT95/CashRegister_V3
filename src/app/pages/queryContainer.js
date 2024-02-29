import { useQuery } from 'react-query';

export default function QueryFunction() {
    const { data, isLoading, isError } = useQuery('products', () =>
    fetch(`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`).then((res) => res.json())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
}



const useProducts = () => {
    return useQuery(['products'], fetchProduct);
};


const fetchProduct = async () => {
    const res = await axios.get(`${CMS_URL}/api/products?[locale][$eq]=${locale}&populate=*`)

    const data = res.json();
    return data
};
