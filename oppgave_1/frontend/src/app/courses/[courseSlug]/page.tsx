// src/app/courses/[courseSlug]/page.tsx
"use client";

import React from "react";

import { useParams } from "next/navigation";
import CoursePage from "@/features/courses/pages/CoursePage";

export default function CourseDetailPage() {
  const { courseSlug } = useParams();

  return (
    <main>
      <CoursePage courseSlug={courseSlug} />
    </main>
  );
}
