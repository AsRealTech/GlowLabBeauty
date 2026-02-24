import axios from "axios";

import { useEffect, useState } from "react";

interface Ingredient {
  id: number;
  name: string;
  category: string;
  description: string;
  benefits: string[];
}

export function RenderIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchIngredients() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/ingredients`,
          { signal: controller.signal }
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.ingredients ?? [];

        setIngredients(data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          console.error(err);
          setError("Error retrieving ingredients");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
    return () => controller.abort();
  }, []);

  return (
    <section id="ingredients" className="container">
      <h2>Ingredient Spotlight</h2>

      <div className="ingredients-grid">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {ingredients.map((ing) => (
          <div className="ingredient-card" key={ing.id}>
            <h3>{ing.name}</h3>
            <div className="category">{ing.category}</div>
            <p>{ing.description}</p>

            <ul className="benefits">
              {ing.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
