
"use client";

import { usePathname } from "next/navigation";
import HeaderComponent from "./HeaderCompontent";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatbotPage = pathname === "/chatbot";

  return (
    <>
      {!isChatbotPage && <HeaderComponent />}

      <div className={!isChatbotPage ? "pt-16 sm:pt-20" : ""}>
        {children}
      </div>

      {!isChatbotPage && <Footer />}
    </>
  );
}
