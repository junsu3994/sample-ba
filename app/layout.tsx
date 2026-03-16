import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "농구 매칭",
  description: "플랩풋볼 스타일의 농구 경기 모집 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
