import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});


// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   out: "./drizzle",
//   dialect: "postgresql",
//   schema: "./src/schema.ts",

//   driver: "pglite",
//   dbCredentials: {
//     url: "./database/",
//   },

//   extensionsFilters: ["postgis"],
//   schemaFilter: "public",
//   tablesFilter: "*",

//   introspect: {
//     casing: "camel",
//   },

//   migrations: {
//     prefix: "timestamp",
//     table: "__drizzle_migrations__",
//     schema: "public",
//   },

//   breakpoints: true,
//   strict: true,
//   verbose: true,
// });
