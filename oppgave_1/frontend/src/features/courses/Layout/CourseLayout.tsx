import { PropsWithChildren, useState } from "react"
import useCourses from "../hooks/useCourses";

type CourseLayoutProps = {
    courseSlug: string
}

const users = [
    { id: '1', name: 'Ole Hansen', email: 'ole@email.no' },
    { id: '2', name: 'Sara Olsen', email: 'sara@email.no' },
    { id: '3', name: 'Finn Finnsen', email: 'finn@email.no' },
    { id: '4', name: 'Kari Guttormsen', email: 'kari@email.no' },
    { id: '5', name: 'Sturla Simensen', email: 'sturla@email.no' },
  ]

export default function CourseLayout(props: PropsWithChildren<CourseLayoutProps>){
    const { courseSlug, children} = props

    const { data } = useCourses(courseSlug);

    const content = data[0]
    
    const [currentLessonSlug, setCurrentLessonSlug] = useState<string>(""); 

    return(
        <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
          <aside className="border-r border-slate-200 pr-6">
            <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
            <ul data-testid="lessons">
              {content?.lessons?.map((lesson) => (
                <li
                  className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                    currentLessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                  }`}
                  key={lesson.id}
                >
                  <a
                    data-testid="lesson_url"
                    data-slug={currentLessonSlug}
                    className="block h-full w-full"
                    href={`/kurs/${content?.slug}/${lesson.slug}`}
                    onClick={() => {
                        if(currentLessonSlug === lesson.slug){
                            setCurrentLessonSlug("")
                        }
                        else{
                            setCurrentLessonSlug(lesson.slug)
                        }}}
                  >
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          {currentLessonSlug === "" ? (
            <article>
              {children}
            </article>
          ) : (
            <section>
              <>
                <h2 className="text-2xl font-bold" data-testid="course_title">
                  {content?.title}
                </h2>
                <p
                  className="mt-4 font-semibold leading-relaxed"
                  data-testid="course_description"
                >
                  {content?.description}
                </p>
              </>
            </section>
          )}
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
