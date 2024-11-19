"use client";
import { PropsWithChildren, useState } from "react"
import useCourses from "../hooks/useCourses";
import { useParams, useRouter } from "next/navigation";
type CourseLayoutProps = {
}

const users = [
    { id: '1', name: 'Ole Hansen', email: 'ole@email.no' },
    { id: '2', name: 'Sara Olsen', email: 'sara@email.no' },
    { id: '3', name: 'Finn Finnsen', email: 'finn@email.no' },
    { id: '4', name: 'Kari Guttormsen', email: 'kari@email.no' },
    { id: '5', name: 'Sturla Simensen', email: 'sturla@email.no' },
  ]

export default function CourseLayout(props: PropsWithChildren<CourseLayoutProps>){
    const { children} = props

    const { courseSlug } = useParams() as {courseSlug: string};
    const { lessonSlug } = useParams() as {lessonSlug: string};

    const { courseData , remove} = useCourses(courseSlug);

    const content = courseData[0]

    const router = useRouter();

    return(
        <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
          <aside className="border-r border-slate-200 pr-6">
            <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
            <ul data-testid="lessons">
              {content?.lessons?.map((lesson) => (
                <li
                  className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                    lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                  }`}
                  key={lesson.id}
                >
                  <a
                    data-testid="lesson_url"
                    data-slug={lessonSlug}
                    className="block h-full w-full"
                    href={lessonSlug === lesson.slug ? `/courses/${content?.slug}`: `/courses/${content?.slug}/${lesson.slug}`}
                  >
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded padding-3" onClick={() => {router.push(`/courses/${content?.slug}/update`)}}>Rediger</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded padding" onClick={() => {
                remove(content.id)
                router.push(`/courses/`)
              }}>Slett</button>
            </div>
          </aside>
            <article>
              {children}
            </article>
          <aside
            data-testid="enrollments"
            className="border-l border-slate-200 pl-6"
          >
            <h3 className="mb-4 text-base font-bold">Deltakere</h3>
            <ul data-testid="course_enrollments">
              {users?.map((user) => (
                <li className="mb-1" key={user.id}>
                  {user.name}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      );
    
    
}
