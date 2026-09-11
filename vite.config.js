import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// Configure Vite avec React et le plugin Tailwind CSS.
export default defineConfig({
  plugins: [react(), tailwindcss()]
})
