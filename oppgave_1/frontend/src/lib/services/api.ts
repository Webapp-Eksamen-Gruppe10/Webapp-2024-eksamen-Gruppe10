"use client";

import { useState, useEffect } from "react";
import {
  categories,
  comments,
  courseCreateSteps,
  courses,
  users,
} from "../../data/data";

// import { useParams, useRouter } from "next/navigation";

export const getCourse = async (slug: any) => {
  const data = await courses.filter((course) => course.slug === slug);
  return data?.[0];
};

export const createCourse = async (data) => {
  await courses.push(data);
};

export const getLesson = async (courseSlug, lessonSlug) => {
  const data = await courses
    .flatMap(
      (course) =>
        course.slug === courseSlug &&
        course.lessons.filter((lesson) => lesson.slug === lessonSlug)
    )
    .filter(Boolean);
  return data?.[0];
};
