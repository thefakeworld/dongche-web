import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 导入时想要省略的扩展名列表
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 配置代理
    proxy: {
      "/api": {
        // target: "http://10.0.16.3:5000",
        target: "http://10.0.16.3:14267",
        changeOrigin: true,
      },
    },
  },
})
