import {resolve} from 'path';
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    outFile: "index.html",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/pages/login.html")
        // cart: resolve(__dirname, "src/cart/index.html"),
        // product: resolve(__dirname, "src/product_pages/index.html"),
        // listing: resolve(__dirname, "src/product-listing/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
      },
    },
  },
});