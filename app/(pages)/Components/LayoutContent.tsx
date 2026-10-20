"use client";

import { usePathname } from "next/navigation";
import HeaderComponent from "./HeaderCompontent";
import Footer from "./Footer";
import ChatbotWidget from "../chatbot/ChatbotWidget";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatbotPage = pathname === "/chatbot";

  return (
    <>
      {!isChatbotPage && <HeaderComponent />}

      <div className={!isChatbotPage ? "pt-16 sm:pt-20" : "flex-1"}>
        {children}
      </div>

      {!isChatbotPage && <Footer />}

      {!isChatbotPage && <ChatbotWidget />}
    </>
  );
}