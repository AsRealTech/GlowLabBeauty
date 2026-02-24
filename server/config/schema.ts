import { pgTable, timestamp, text ,serial, } from "drizzle-orm/pg-core";

export const UserRole = {
    USER: "user",
    ADMIN: "admin"
} as const;

export const rate = [
    "★",
    "★★",
    "★★★",
    "★★★★",
    "★★★★★"
] as const;

export const user = pgTable("user", {
    id:         serial("id").primaryKey(),
    name:       text("name"),
    email:      text("email").notNull().unique(),
    password:   text("password").notNull(),
    role:       text("role").notNull().default(UserRole.USER),  
    mustChangePassword: text("must_change_password").notNull().default("false"),
    createdAt:  timestamp("created_at").defaultNow()
})

// const ingredients 

export const ingredients = pgTable("ingredients", {
    id:             serial("id").primaryKey(),
    name:           text("ingredients").notNull(),
    category:       text("category").notNull(),
    description:    text("description").notNull(),
    benefits:       text("benefits").array().notNull().default([]),
    createdAt:      timestamp("created_at").defaultNow()
})


// Product Reviews Data
export const products = pgTable("products", {
        id:         serial("id").primaryKey(),
        name:       text("name").notNull(),
        rate:       text("rate").notNull().$default(() => rate[0]),
        review:     text("review").notNull(),
        highlight:  text("highlights").notNull(),
        imageUrl:   text("imageUrl").notNull().default(""),
        imageUrls:  text("imageUrls").array().notNull().default([]),
        createdAt:  timestamp("created_at").defaultNow()
    }
)

// Skincare Tips Data
export const tips = pgTable("tips", {
        id:         serial("id").primaryKey(),
        icon:       text("icon").notNull(),
        title:      text("title").notNull(),
        description: text("description").notNull()
})