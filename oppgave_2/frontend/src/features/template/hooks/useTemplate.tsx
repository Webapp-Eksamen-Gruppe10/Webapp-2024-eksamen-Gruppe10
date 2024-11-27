import { useState, useCallback } from "react";
import { templatesApi } from "@/features/template/services/api";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { Template } from "@/features/template/lib/schema"

type Status = "idle" | "loading" | "error" | "success" | "fetching";

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

  const addTemplate = async (data: Omit<Template, "id">) => {
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
    };

  const updateTemplate = async (id: number, data: Partial<Template>) => {
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
    };

  const deleteTemplate = async (id: number) => {
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
    };

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
