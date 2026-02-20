import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    server: {
        open: true
    },
    css: { // För att kunna granska scss-filerna inom granska-läget i webbläsaren
        devSourcemap: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "sass.html"),
                animation: resolve(__dirname, "animation.html"),
                diagram: resolve(__dirname, "diagram.html"),
                map: resolve(__dirname, "map.html")
            }
        }
    },
    plugins: [
        ViteImageOptimizer({
            jpg: {
                quality: 80
            },
            svg: {
                quality: 30
            }
        })
    ]
});