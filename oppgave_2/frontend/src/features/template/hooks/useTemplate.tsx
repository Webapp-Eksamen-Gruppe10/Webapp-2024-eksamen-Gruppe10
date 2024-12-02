import { useState, useCallback } from "react";
import { templatesApi } from "@/features/template/services/api";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { Template, validateTemplate } from "@/features/template/lib/schema"

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
      const templates = Array.isArray(result.data) ? (result.data as Template[]) : [];
      setTemplateData(templates);
      setTemplateStatus("success");
    } catch (error) {
      setTemplateStatus("error");
      setTemplateError("Failed to fetch templates");
    }
  }, []);


  const fetchTemplateDetails = useCallback(async (id: string) => {
    try {
      setTemplateStatus("loading");
      const template = await templatesApi.details(id);
      const template2 = template.data
      if (template2)setTemplateData([template2]);
      setTemplateStatus("success");
    } catch (error: unknown) {
      console.error("Error fetching template details:", error);
      setTemplateStatus("error");
      setTemplateError(
        error instanceof Error ? error.message : "Failed to fetch template details"
      );
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

  {/* TODO: Legg til validering. Ikke tillat sletting av MAL hvis den allerede er brukt i en event. */}
  const deleteTemplate = async (id: string) => {
      try {
        setTemplateStatus("loading");
        await templatesApi.remove(id);
        await fetchTemplates();
        setTemplateStatus("success");
      } catch (error) {
        console.log(error)
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
    getOne: fetchTemplateDetails, 
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
