import { useState, useCallback } from "react";
import { templatesApi } from "@/features/template/services/api";
import { useEffectOnce } from "@/hooks/useEffectOnce";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

type Template = {
  id: number;
  name: string;
  description: string;
  templatecol: string;
  weekdays: string;
  notSameDay: boolean;
  private: boolean;
  lim_attend: boolean;
  fixed_price: boolean;
  free: boolean;
  waitinglist: boolean;
};

export function useTemplate() {
  const [templateStatus, setTemplateStatus] = useState<Status>("idle");
  const [templateData, setTemplateData] = useState<Template[]>([]);
  const [templateError, setTemplateError] = useState<string | null>(null);

  const isFetching = templateStatus === "fetching";
  const isLoading = templateStatus === "loading" || isFetching;
  const isError = templateStatus === "error" || !!templateError;
  const isIdle = templateStatus === "idle";
  const isSuccess = templateStatus === "success";

  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setTemplateStatus("idle");
      }, timeout),
    []
  );

  const fetchTemplates = useCallback(async () => {
    try {
      setTemplateStatus("loading");
      const result = await templatesApi.list();
      setTemplateData(result.data as Template[]);
      setTemplateStatus("success");
    } catch (error) {
      setTemplateStatus("error");
      setTemplateError("Failed to fetch templates");
    }
  }, []);

  const addTemplate = useCallback(
    async (data: Omit<Template, "id">) => {
      try {
        setTemplateStatus("loading");
        await templatesApi.create(data);
        await fetchTemplates();
        setTemplateStatus("success");
      } catch (error) {
        setTemplateStatus("error");
        setTemplateError("Failed to create template");
      } finally {
        resetToIdle();
      }
    },
    [fetchTemplates, resetToIdle]
  );

  const updateTemplate = useCallback(
    async (id: number, data: Partial<Template>) => {
      try {
        setTemplateStatus("loading");
        await templatesApi.update(id.toString(), data);
        await fetchTemplates();
        setTemplateStatus("success");
      } catch (error) {
        setTemplateStatus("error");
        setTemplateError(`Failed to update template with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchTemplates, resetToIdle]
  );

  const deleteTemplate = useCallback(
    async (id: number) => {
      try {
        setTemplateStatus("loading");
        await templatesApi.remove(id.toString());
        await fetchTemplates();
        setTemplateStatus("success");
      } catch (error) {
        setTemplateStatus("error");
        setTemplateError(`Failed to delete template with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchTemplates, resetToIdle]
  );

  useEffectOnce(fetchTemplates);

  return {
    add: addTemplate,
    get: fetchTemplates,
    update: updateTemplate,
    remove: deleteTemplate,
    templateData,
    templateError,
    templateStatus: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
  };
}

export default useTemplate;
