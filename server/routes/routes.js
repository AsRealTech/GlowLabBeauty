import { Router } from "express";
import bcrypt from "bcrypt";
import  db  from "../config/database.js";
import { products, ingredients, rate, user, tips } from "../config//schema.ts";
import { eq } from "drizzle-orm";
import { generateAccessToken } from "../config/function.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/ingredients", async (req, res) => {
    try {
        const ingredientsList = await db.select().from(ingredients);
        return res.status(200).json(ingredientsList);
    } catch (error) {
        console.error("Error fetching ingredients:", error.message);
      return  res.status(500).json({ error: "Failed to fetch ingredients" });
    }
});


router.get("/products", async (req, res) => {
    try{
        const productsData = await db.select().from(products);
        if(!productsData){
           return  res.status(404).json({message: "No products Records found"});
            
        }
        return res.status(200).json({products: productsData});
    }catch(err){
        console.log("error: " + err.message);
       return  res.status(500).json({message: "There was error retrieving products "});
    }finally{
        return;
    }
});


router.get("/tips", async (req, res) => {
    try{
        const tipsData = await db.select().from(tips);
        if(!tipsData){
           return  res.status(404).json({message: "tips data not found!"});
        }

      return   res.status(200).json({data: tipsData});

    } catch(err){
        console.log("error: "+ err.message);
       return  res.status(500).json({message: "there was error retrieving tips"});
    }
})

router.post("/add/tips", authMiddleware, async (req, res) => {

    const {icon, title, description} = req.body;
    
    try {
        const resp = await db.insert(tips).values({
            icon,
            title,
            description
        })

        // if(res.length === 0){
        //    return res.status(202).json({message: "Failed to create Tips"});
        // }

       return res.status(200).json({message: "New Tips was added succefully."})

    } catch (error) {
        console.log(error);
       return res.status(501).json({message: "server error"});
    }
})


router.delete("/del/tips/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(404).json({message: "Invalid id provided"});
    }

    const rep = await db.delete(tips).where(eq(tips.id, id)).returning();

        if (!rep.length) {
            return res.status(404).json({ message: "tips not found" });
        }

        return res.status(200).json({
            message: "tips deleted successfully",
            tips: rep[0]
        });
})

// newIgredients

router.post("/add/igredients", authMiddleware, async (req, res) => {

    let {name, category, description, benefitss} = req.body;

    const benefits = benefitss.split(",");
    
    try {
        const resp = await db.insert(ingredients).values({
            name,
            category,
            description,
            benefits
        })

        // if(res.length === 0){
        //    return res.status(202).json({message: "Failed to create Tips"});
        // }

       return res.status(200).json({message: "New igredients was added succefully."})

    } catch (error) {
        console.log(error);
       return res.status(501).json({message: "server error"});
    }
})


router.delete("/del/igredients/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(404).json({message: "Invalid id provided"});
    }

    const rep = await db.delete(ingredients).where(eq(ingredients.id, id)).returning();

        if (!rep.length) {
            return res.status(404).json({ message: "igredients not found" });
        }

        return res.status(200).json({
            message: "igredients deleted successfully",
            tips: rep[0]
        });
})


// authentication

router.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Invalid login attempt" });
        }

        const userData = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

        if (userData.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const foundUser = userData[0];

        // TODO: compare hashed password here
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(foundUser);
        // console.log(accessToken);
        const nodeEnv = process.env.NODE_ENV === "production" ? true : false;
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: nodeEnv,
            sameSite: "strict",
            maxAge: 1 * 60 * 60 * 1000
        })

        return res.status(200).json({ user: foundUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}); 


router.get('/me', authMiddleware, async (req, res) => {
    const usertoken = req.user;
    if(!usertoken) return res.status(401).json({ message: "Server error" });
    
    try {
        const userDetails = await db.select().from(user).where(eq(
            user.email, usertoken
        ));

        if(userDetails.length === 0){
            return res.status(200).json({message: "user not found"});   
        }
        return res.status(200).json({user: userDetails[0]});   
        
    } catch (error) {
        return res.status(200).json({message: "Error Retrieving."});   
        
    }

})


// /add/products


router.post("/add/products", authMiddleware, async (req, res) => {
    const { name, rate, highlight, review, imageUrl, imageUrls } = req.body;    
    try {
        const newProduct = await db.insert(products).values({
            name,
            rate,
            highlight,
            review,
            imageUrl,
            imageUrls
        });
        return res.status(201).json({message: "Product added successfully", product: newProduct});
    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(500).json({message: "Failed to add product"});
    }
});

router.put("/update/products", authMiddleware, async (req, res) => {
    const id = Number(req.body.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const { name, rate, highlight, review, imageUrl, imageUrls } = req.body;

    try {
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (rate !== undefined) updateData.rate = rate;
        if (highlight !== undefined) updateData.highlight = highlight;
        if (review !== undefined) updateData.review = review;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
        if (imageUrls !== undefined) updateData.imageUrls = imageUrls;

        // Prevent empty update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        const updatedProduct = await db
            .update(products)
            .set(updateData)
            .where(eq(products.id, id))
            .returning();

        if (!updatedProduct.length) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct[0]
        });

    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Failed to update product" });
    }
});

router.delete("/del/product/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const deletedProduct = await db
            .delete(products)
            .where(eq(products.id, id))
            .returning(); // important

        if (!deletedProduct.length) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct[0]
        });

    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Failed to delete product" });
    }
});




router.post("/logout", (req, res) => {
    const token = req.cookies?.accessToken;
    res.clearCookie(token);
    res.status(200).json({message: "Logged Out"});
})


export default router;