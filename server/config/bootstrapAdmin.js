import db from "./database.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import { eq } from "drizzle-orm";
import { products, ingredients, rate, user, tips } from "./schema.ts";
import { seed_ingredients, seed_products, seed_tips } from "./seed_data.ts";
import { title } from "process";

configDotenv();

export async function bootstrapAdmin() {
    // if(process.env.NODE_ENV !== "production") return;

    // if(process.env.ADMIN_BOOTSTRAP_ENABLED !== true) return;

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if(!email || !password){
        throw new Error("Admin email and password must be set in environment variables");
    }

    await db.transaction(async (tx) => {
        const adminExist = await tx.select().from(user).where(eq(user.email, email));
        if(adminExist && adminExist.length > 0){
            // console.log("Admin already exists, skipping bootstrap");
            return;
        }

       await tx.insert(user).values({
                name:"Admininstor",
                email: email,
                password: await bcrypt.hash(password, 12),
                role: "ADMIN",
                mustChangePassword: true
            })

    })

    await db.transaction(async (tx) => {
        // Check if products already exist
        const existing = await tx
            .select({ id: 1 })
            .from(products)
            .limit(1);

        if (existing.length > 0) {
            return;
        }

        // Insert seed data
        await tx.insert(products).values(
            seed_products.map((p) => ({
            name: p.name,
            rate: p.rate,
            review: p.review,
            highlight: p.highlight,
            imageUrl: p.imageUrl,
            imageUrls: p.imageUrls
            }))
        );
    });

    // seed_ingredients

    await db.transaction(async (tx) => {
        const exist_ingredients = await tx.select({id:1}).from(ingredients).limit(1);

        if(exist_ingredients.length > 0)
            // console.log("ingredients exists")
             return;

       await tx.insert(ingredients).values(
            seed_ingredients.map((p) => ({
                name:           p.name,
                category:       p.category,
                description:    p.description,
                benefits:       p.benefits
            }))
        )

    });

    // tips

    await db.transaction(async (tx) => {
        const existing = await tx.select({id:1}).from(tips).limit(1);

        if(existing.length > 0){

            // console.log("tips ensued");
            return;
        }
        
        await tx.insert(tips).values(
            seed_tips.map((p) => ({
                icon:           p.icon,
                title:          p.title,
                description:    p.description
            }))
        )
    })


    // console.log("boootstrsp admin ensured");
}