import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "AI Bath Quiz — Onsen Labo",
  description:
    "Answer 12 questions. Receive your AI-personalized onsen bath prescription.",
};

export default function QuizPage() {
  return <Quiz />;
}
