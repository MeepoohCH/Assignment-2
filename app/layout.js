import { DroneConfigProvider } from "./context/DroneConfigContext";
import './globals.css'; // ต้อง import Tailwind CSS/Global Styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DroneConfigProvider>
          <header>
          </header>
          <main className="min-h-screen bg-gray-100 p-4">
            {children}
          </main>
        </DroneConfigProvider>
      </body>
    </html>
  );
}