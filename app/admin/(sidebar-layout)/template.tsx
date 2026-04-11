import PageTransition from "@/components/PageTransition";
import { type ReactNode } from "react";

export default function AdminTemplate({ children }: { children: ReactNode }) {
  return <PageTransition duration={1.2}>{children}</PageTransition>;
}
