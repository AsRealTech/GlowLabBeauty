import axios from "axios";
import { useEffect, useState } from "react";

export function RenderProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            console.log(`${import.meta.env.VITE_API_URL}/products`);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products`,
                    { signal: controller.signal }
                );

                const prodData = Array.isArray(res.data)
                    ? res.data
                    : res.data?.products || [];

                setProducts(prodData);
            } catch (err) {
                if (err.name === "CanceledError") {
                    console.log("Fetch cancelled");
                } else {
                    console.error(err);
                    setError("Failed to load products.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        return () => controller.abort();
    }, []);

    const handleReadMore = () => {
        alert("More details coming soon!");
    };

    if (loading) return <p>Loading products…</p>;
    if (error) return <p>{error}</p>;

    return (
        <section id="products" className="container">
            <h2>Featured Product Reviews</h2>

            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <div className="product-image">
                            <img
                                loading="lazy"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                        </div>

                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="rating">{product.rate}</div>

                            <p>
                                <strong>Review:</strong> {product.review}
                            </p>
                            <p>
                                <strong>Why It Works:</strong> {product.highlight}
                            </p>

                            <button
                                className="learn-more"
                                onClick={handleReadMore}
                            >
                                Learn More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
