import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from 'react-toastify';
import { metadata } from "./metadata";
export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
          <ToastContainer/>
        </AuthProvider>
      </body>
    </html>
  );
}