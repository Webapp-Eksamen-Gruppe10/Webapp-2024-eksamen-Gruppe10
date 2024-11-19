// src/app/courses/[courseSlug]/lessons/[lessonSlug]/page.tsx
"use client";
import { useParams } from "next/navigation";
import LessonPage from "@/features/lesson/pages/LessonPage";

export default function Page() {

  return (
    <LessonPage courseSlug={courseSlug} lessonSlug={lessonSlug}/>
  );
}
