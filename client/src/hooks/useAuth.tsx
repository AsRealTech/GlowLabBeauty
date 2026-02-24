import { useState } from "react";
import { login } from "../config/auth";
import api  from "../config/axios";
import { useNavigate } from "react-router-dom";

export function useAuth(){
    const [user, setUser] = useState(null)
    const [loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

 const userLogin = async (email: string, password: string)  => {
     try {
            setLoading(true);
            setError('');
            setMsg("");
            const res = await login({email, password});
            if(!res) return false;
            setUser(res);
            setMsg(`Authentication successfully, welcome back ${res.name || res.email}`);
            return true;
        } catch (err) {
            console.log(err);
            setError(`User not found`);
        }finally{
            setLoading(false);
        }
    }

    // fetchUser

const fetchUser = async () => {
            try {
                const res = await api.get('/me');

                if (!res) {
                    console.log("User not authenticated");
                    return;
                }
                setUser(res.data.user);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                return;
            }finally{
                setLoading(false);
            }
        };

// handleLogout

 const handleLogout = async () => {
    try{
       await api.post("/logout");
    }catch(e){
        console.error('Logout failed', e);
    }
    console.log(user)
    // setUser(null);
    navigate("/login", { replace: true });
};

interface ProductInfo {
        name: string,
        rate: string,
        highlight: string,
        review: string,
        imageUrl: string,
        imageUrls: []
}
interface ProductUpad {
        id: number,
        name: string,
        rate: string,
        highlight: string,
        review: string,
        imageUrl: string,
        imageUrls: []
}
const addProduct = async (productInfo: ProductInfo) => {
    const res = await api.post("/add/products", productInfo);
    return res;
}

const newProduct = async (name: string,rate: string, highlight: string, review: string,imageUrl: string,imageUrls: []) =>{
    const res = await addProduct({ name, rate,highlight, review,imageUrl,imageUrls})
    return res.data;
}

const updateProduct = async (productInfo: ProductUpad) => {
    const res = await api.put("/update/products", productInfo);
    return res;
}

const update_Product = async (id: number, name: string,rate: string, highlight: string, review: string,imageUrl: string,imageUrls: []) =>{
    const res = await updateProduct({ id, name, rate,highlight, review,imageUrl,imageUrls})
    return res.data;
}


const del = async (id: number) => {
    const r = await api.delete(`/del/product/${id}`);
    return r.data;
}

const delProduct = async (id: number) => {
    return await del(id);
}

const fetchProduct = async () => {
    const res = await api.get("/products");
    return res.data;
}

const fetchIgredients = async () => {
    const res = await api.get("/ingredients");
    return res.data;
}

const fetchTips = async () => {
    const res = await api.get("/tips");
    return res.data.data;
}

const newTips = async (tips: {
    icon: string,
    title: string,
    descreption: string
}) => {
    const res = await api.post("/add/tips", tips);
    return res.data;
}

const delTips = async (id:number) => {
    const res =  await api.delete(`/del/tips/${id}`);

    return res.data;
}

// igredients

const newIgredients = async (igredients: {
    name: string,
    category: string,
    descreption: string,
    benefitss: string
}) => {
    const res = await api.post("/add/igredients", igredients);
    return res.data;
}

const delIgredients = async (id:number) => {
    const res =  await api.delete(`/del/igredients/${id}`);

    return res.data;
}

return {userLogin, setLoading,handleLogout, newIgredients, delIgredients, fetchTips, newTips, delTips, fetchUser, fetchProduct, newProduct,update_Product,delProduct, fetchIgredients, user, setUser, loading, error, msg}

}