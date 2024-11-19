"use client";
import CourseLayout from "@/features/courses/Layout/CourseLayout";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <CourseLayout>
            {children}
        </CourseLayout>
    )
}