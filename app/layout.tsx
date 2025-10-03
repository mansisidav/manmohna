import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Background layer with blur effect */}
              <div className="fixed inset-1 -z-5 overflow-hidden">
                {/* Background image with blur */}
                <img
                  src="https://thumbs.dreamstime.com/b/illustration-krishna-flute-peacock-feather-solid-background-illustration-krishna-flute-peacock-feather-328450696.jpg"
                  alt="Krishna Flute Background"
                  className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                  style={{ opacity: 0.3 }}
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/70 to-background/70" />
              </div>
              <div className="z-10 relative">
        <CartProvider>
          <Header />
          {children}
          
          <Toaster />
          <Footer/>
        </CartProvider>
        </div>
      </body>
    </html>
  );
}
