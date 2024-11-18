import useCourses from "../hooks/useCourses";

type CoursePageProps = {
    courseSlug: string
}

export default function CoursePage(props: CoursePageProps) {
    const {courseSlug} = props;
    const { courseData, courseStatus, courseError} = useCourses(courseSlug)

    if (courseStatus.loading) return <p>Kursen laster ...</p>;
    if (courseStatus.error) return <p className="error">{courseError}</p>;

    return(
    <section>
        <>
        <h2 className="text-2xl font-bold" data-testid="course_title">
            {courseData[0]?.title}
        </h2>
        <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
        >
            {courseData[0]?.description}
        </p>
        </>
    </section>)
}