import { useCallback, useState } from "react";
import api from "@/features/comments/services/api";

import type { Comment } from "@/features/comments/lib/schema";
import { useEffectOnce } from "@/hooks/useEffectOnce";


type Status  = "idle" | "loading" | "error" | "success" | "fetching";

export function useComments(lessonId: string) {
    const [status, setStatus] = useState<Status>("idle");
    const [data, setData] = useState<Comment[]>([]);

    const [error, setError] = useState<string | null>(null);

    const isFetching = status === "fetching";
    const isLoading = status === "loading" || isFetching;
    const isError = status === "error" || !!error;
    const isIdle = status === "idle";
    const isSuccess = status === "success";

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
          const result = await api.getComments(lessonId);
    
          setData(result?.data ?? []);
    
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Feilet ved henting av data");
        } finally {
          resetToIdle();
        }
      }, [resetToIdle]);
    
      useEffectOnce(fetchData);

      const add = async (data: Omit<Comment, 'id'>) => {
        try {
          setStatus("loading");
          await api.create(data);
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed creating habit");
        } finally {
          resetToIdle();
        }
      };

      return {
        add,
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

export default useComments;