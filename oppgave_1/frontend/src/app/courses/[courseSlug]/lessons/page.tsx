// src/app/courses/[courseSlug]/lessons/page.tsx
import React from "react";
import Lesson from "@/features/lesson/components/Lesson";
import { useParams } from "next/navigation";

const LessonsListPage: React.FC = () => {
  const { courseSlug, lessonSlug } = useParams();

  return (
    <main>
      <Lesson courseSlug={courseSlug} lessonSlug={lessonSlug} />
    </main>
  );
};
