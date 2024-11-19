"use client";
import CourseLayout from "@/features/courses/Layout/CourseLayout";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
type layoutProps = {
  useLayout?: boolean;
}
export default function layout(props: PropsWithChildren<layoutProps>){
    const { children, useLayout} = props;
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