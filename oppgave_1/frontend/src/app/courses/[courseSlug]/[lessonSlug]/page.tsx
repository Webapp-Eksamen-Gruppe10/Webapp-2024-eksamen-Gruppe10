// src/app/courses/[courseSlug]/lessons/[lessonSlug]/page.tsx
"use client";

import Lesson from "@/features/lesson/components/Lesson";
import { useParams } from "next/navigation";

export default function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();

  return (
    <main>
      <Lesson courseSlug={courseSlug} lessonSlug={lessonSlug} />
    </main>
  );
}
