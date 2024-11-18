import { useCallback, useState } from "react";
import api from "@/features/comments/services/api";

import type { Comment } from "@/features/comments/lib/schema";
import { useEffectOnce } from "@/hooks/useEffectOnce";


type Status  = "idle" | "loading" | "error" | "success" | "fetching";

export function useComments(lessonId: string) {
    const [commentStatus, setCommentStatus] = useState<Status>("idle");
    const [commentData, setCommentData] = useState<Comment[]>([]);

    const [commentError, setCommentError] = useState<string | null>(null);

    const isFetching = commentStatus === "fetching";
    const isLoading = commentStatus === "loading" || isFetching;
    const isError = commentStatus === "error" || !!commentError;
    const isIdle = commentStatus === "idle";
    const isSuccess = commentStatus === "success";

    const resetToIdle = useCallback(
        (timeout = 2000) =>
          setTimeout(() => {
            setCommentStatus("idle");
          }, timeout),
        []
      );

      const fetchData = useCallback(async () => {
        try {
          setCommentStatus("loading");
          const result = await api.getComments(lessonId);
    
          setCommentData(result?.data ?? []);
    
          setCommentStatus("success");
        } catch (error) {
          setCommentStatus("error");
          setCommentError("Feilet ved henting av data");
        } finally {
          resetToIdle();
        }
      }, [resetToIdle]);
    
      useEffectOnce(fetchData);

      const add = async (data: Omit<Comment, 'id'>) => {
        try {
          setCommentStatus("loading");
          await api.create(data);
          await fetchData();
          setCommentStatus("success");
        } catch (error) {
          setCommentStatus("error");
          setCommentError("Feilet ved opprettelse av data");
        } finally {
          resetToIdle();
        }
      };

      return {
        add,
        get: fetchData,
        commentData,
        setCommentError,
        commentStatus: {
          idle: isIdle,
          loading: isLoading,
          success: isSuccess,
          error: isError,
          fetching: isFetching,
        },
      };
}

export default useComments;