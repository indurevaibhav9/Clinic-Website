"use client";

import { Suspense } from "react";
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
      {!isChatbotPage && (
        <Suspense fallback={<div className="h-16 sm:h-20" />}>
          <HeaderComponent />
        </Suspense>
      )}

      <div className={!isChatbotPage ? "pt-16 sm:pt-20" : "flex-1"}>
        {children}
      </div>

      {!isChatbotPage && <Footer />}

      {!isChatbotPage && <ChatbotWidget />}
    </>
  );
}