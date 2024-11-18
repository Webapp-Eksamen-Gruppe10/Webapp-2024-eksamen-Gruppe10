import { useCallback, useState } from "react";
import api from "@/features/courses/services/api";

import { Course, CourseToDb } from "../lib/schema";
import { useEffectOnce } from "@/hooks/useEffectOnce";


type Status  = "idle" | "loading" | "error" | "success" | "fetching";

export function useCourses(courseId?: string) {
    const [status, setStatus] = useState<Status>("idle");
    const [data, setData] = useState<Course[]>([]);

    const [error, setError] = useState<string | null>(null);

    const isFetching = status === "fetching";
    const isLoading = status === "loading" || isFetching;
    const isError = status === "error" || !!error;
    const isIdle = status === "idle";
    const isSuccess = status === "success";
    const isCourseId = !!courseId;

    const resetToIdle = useCallback(
        (timeout = 2000) =>
          setTimeout(() => {
            setStatus("idle");
          }, timeout),
        []
      );

      const fetchData = useCallback(async () => {
        try {
          setStatus("loading");
          if(isCourseId){
            const result = await api.getCourse(courseId);
            setData(result?.data ? [...data, result?.data] : []);
          }
          else{
            const results = await api.list();
            setData(results?.data ?? []);
          }
    
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Feilet ved henting av data");
        } finally {
          resetToIdle();
        }
      }, [resetToIdle]);
    
      useEffectOnce(fetchData);

      

      const add = async (data: CourseToDb) => {
        try {
          setStatus("loading");
          await api.create(data);
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Feilet ved opprettelse av data");
        } finally {
          resetToIdle();
        }
      };

      const remove = async (id: string) => {
        try {
          setStatus("loading");
          await api.remove(id);
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed removing item");
        } finally {
          resetToIdle();
        }
      };

      const update = async (data: Course) => {
        try {
          setStatus("loading");
          await api.update(data);
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed updating item");
        } finally {
          resetToIdle();
        }
      };



      return {
        add,
        remove,
        update,
        get: fetchData,
        data,
        error,
        status: {
          idle: isIdle,
          loading: isLoading,
          success: isSuccess,
          error: isError,
          fetching: isFetching,
        },
      };
}

export default useCourses;