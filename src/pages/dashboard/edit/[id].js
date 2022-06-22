import FormProduct from '@components/FormProduct';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit() {
    const [product, setProduct] = useState({});
    const router = useRouter();

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const { id } = router.query;
        if (!router.isReady)return;
        async function getProduct() {
			try {
				const response = await axios.get(endPoints.products.getProduct(id));

				if (response) {
					setProduct(response.data);
				}
			} catch (error) {
				console.log(error);
				setNotFound(true);
			}
		}
        getProduct();
    }, [router?.isReady]);

    return notFound ? <div> Product Not Found </div> : <FormProduct product={product} />
}

