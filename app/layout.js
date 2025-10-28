import { DroneConfigProvider } from "./context/DroneConfigContext";
import './globals.css'; // ต้อง import Tailwind CSS/Global Styles
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DroneConfigProvider>
          <Navbar /> {/* <-- ใช้ Navbar Component */}
          <main className="min-h-screen bg-gray-100 p-4">
            {children}
          </main>
        </DroneConfigProvider>
      </body>
    </html>
  );
}