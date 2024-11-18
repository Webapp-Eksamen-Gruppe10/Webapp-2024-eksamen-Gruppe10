import useCourses from "../hooks/useCourses";

type CoursePageProps = {
    courseSlug: string
}

export default function CoursePage(props: CoursePageProps) {
    const {courseSlug} = props;
    const { data, status, error} = useCourses(courseSlug)

    if (status.loading) return <p>Kursen laster ...</p>;
    if (status.error) return <p className="error">{error}</p>;

    return(
    <section>
        <>
        <h2 className="text-2xl font-bold" data-testid="course_title">
            {data[0]?.title}
        </h2>
        <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
        >
            {data[0]?.description}
        </p>
        </>
    </section>)
}