import axios from "axios";
import { useEffect, useState } from "react";

interface TipsType {
    id:             number,
    icon:           string,
    title:          string,
    description:    string,
};

// Render Tips Section
export function RenderTips() {
    const [tips, setTips] = useState<TipsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

useEffect(() => {
  const controller = new AbortController();

  const fetchTips = async () => {
    try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/tips`,
                { signal: controller.signal }
            );
            // Handle both array responses and nested data structures
            console.log(res.data);
            const tipsData = Array.isArray(res.data.data) ? res.data.data : (res.data?.tips || []);
            setTips(tipsData);
            } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Fetch cancelled");
            } else {
                setError("Failed to load tips. Please try again later.");
                console.error(err);
            }
            } finally {
            setLoading(false);
            }
        };

        fetchTips();
        return () => controller.abort();
        }, []);


    return (
        <section id="tips" className="container" style={{marginBottom:"30px"}}>
            <h2>Skincare Tips & Tricks</h2>
            <div className="tips-grid">
                {loading && <p>Loading tips...</p>}
                {error && <p>{error}</p>}
                {tips.map((tip) => (
                    <div key={tip.id} className="tip-card">
                        <div className="icon">{tip.icon}</div>
                        <h3>{tip.title}</h3>
                        <p>{tip.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}