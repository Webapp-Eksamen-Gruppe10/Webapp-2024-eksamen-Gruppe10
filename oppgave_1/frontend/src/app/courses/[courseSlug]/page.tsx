// src/app/courses/[courseSlug]/page.tsx
"use client";

import React from "react";

import { useParams } from "next/navigation";
import Course from "@/features/course/components/Course";

export default function CourseDetailPage() {
  const { courseSlug } = useParams();

  return (
    <main>
      <Course courseSlug={courseSlug} />
    </main>
  );
}
