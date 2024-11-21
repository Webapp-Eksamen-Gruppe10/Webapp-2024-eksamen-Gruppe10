import { useCallback, useState } from "react";
import api from "@/features/courses/services/api";

import { Course, CourseToDb } from "../lib/schema";
import { useEffectOnce } from "@/hooks/useEffectOnce";


type Status  = "idle" | "loading" | "error" | "success" | "fetching";

export function useCourses(courseSlug?: string) {
    const [courseStatus, setCourseStatus] = useState<Status>("idle");
    const [courseData, setCourseData] = useState<Course[]>([]);

    const [courseError, setCourseError] = useState<string | null>(null);

    const isFetching = courseStatus === "fetching";
    const isLoading = courseStatus === "loading" || isFetching;
    const isError = courseStatus === "error" || !!courseError;
    const isIdle = courseStatus === "idle";
    const isSuccess = courseStatus === "success";
    const isCourseId = !!courseSlug;

    const resetToIdle = useCallback(
        (timeout = 2000) =>
          setTimeout(() => {
            setCourseStatus("idle");
          }, timeout),
        []
      );

      const fetchData = useCallback(async () => {
        try {
            setCourseStatus("loading");
          if(isCourseId){
            const result = await api.getCourse(courseSlug);
            setCourseData(result?.data ? [...courseData, result?.data] : []);
          }
          else{
            const results = await api.list();
            setCourseData(results?.data ?? []);
    
          }
          setCourseStatus("success");
        } catch (error) {
            setCourseStatus("error");
          setCourseError("Feilet ved henting av data");
        } finally {
          resetToIdle();
        }
      }, [resetToIdle]);
    
      useEffectOnce(fetchData);

      

      const add = async (data: CourseToDb) => {
        try {
            setCourseStatus("loading");
          await api.create(data);
          setCourseStatus("success");
        } catch (error) {
          setCourseStatus("error");
          setCourseError("Feilet ved opprettelse av data");
        } finally {
          resetToIdle();
        }
      };

      const remove = async (id: string) => {
        try {
          setCourseStatus("loading");
          await api.remove(id);
          setCourseStatus("success");
        } catch (error) {
          setCourseStatus("error");
          setCourseError("Failed removing item");
        } finally {
          resetToIdle();
        }
      };

      const update = async (data: Course) => {
        try {
          setCourseStatus("loading");
          await api.update(data);
          setCourseStatus("success");
        } catch (error) {
          setCourseStatus("error");
          setCourseError("Failed updating item");
        } finally {
          resetToIdle();
        }
      };



      return {
        add,
        remove,
        update,
        get: fetchData,
        courseData,
        courseError,
        courseStatus: {
          idle: isIdle,
          loading: isLoading,
          success: isSuccess,
          error: isError,
          fetching: isFetching,
        },
      };
}

export default useCourses;