"use client";
import CourseLayout from "@/features/courses/Layout/CourseLayout";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function layout(props: PropsWithChildren<{}>){
    const { children} = props;
    const pathname = usePathname();

  if (pathname?.endsWith("/update")) {
    return <>{children}</>;
  }
    return(
        <CourseLayout>
            {children}
        </CourseLayout>
    )
}