import Courses from "../components/Courses";
import useCourses from "../hooks/useCourses";

export default function CoursesPage() {
    const { courseData, courseStatus, courseError} = useCourses()

    if (courseStatus.loading) return <p>Kursene laster ...</p>;
    if (courseStatus.error) return <p className="error">{courseError}</p>;

    return(
        <Courses courses={courseData} />
    )
}