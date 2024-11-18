import Courses from "../components/Courses";
import useCourses from "../hooks/useCourses";

export default function CoursesPage() {
    const { data, status, error} = useCourses()

    if (status.loading) return <p>Kursene laster ...</p>;
    if (status.error) return <p className="error">{error}</p>;

    return(
        <Courses courses={data} />
    )
}