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
        login: resolve(__dirname, "src/pages/login.html"),
        logout: resolve(__dirname, "src/pages/logout.html"),
        household_update: resolve(__dirname, "src/pages/household/household-update.html"),
        household_setup: resolve(__dirname, "src/pages/household/household-setup.html"),
        calendar: resolve(__dirname, "src/pages/calendar.html"),
      },
    },
  },
});