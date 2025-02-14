import { useState, useCallback } from "react";
import { registrationsApi } from "@/features/registration/services/api";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { CreateRegistration, Registration } from "@/features/registration/lib/schema"

type Status = "idle" | "loading" | "error" | "success" | "fetching";


export function useRegistration(eventId: string) {
  const [registrationStatus, setRegistrationStatus] = useState<Status>("idle");
  const [registrationData, setRegistrationData] = useState<Registration[]>([]);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const isFetching = registrationStatus === "fetching";
  const isLoading = registrationStatus === "loading" || isFetching;
  const isError = registrationStatus === "error" || !!registrationError;
  const isIdle = registrationStatus === "idle";
  const isSuccess = registrationStatus === "success";

  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setRegistrationStatus("idle");
      }, timeout),
    []
  );

  const fetchRegistrations = useCallback(async () => {
    try {
      setRegistrationStatus("loading");
      const result = await registrationsApi.listByEvent(eventId);
      const registrations = Array.isArray(result.data) ? (result.data as Registration[]) : [];
      setRegistrationData(registrations);
      setRegistrationStatus("success");
    } catch (error) {
      setRegistrationStatus("error");
      setRegistrationError("Failed to fetch registrations");
    }
  }, [eventId]);

  const addRegistration = async (data: CreateRegistration) => {
      try {
        setRegistrationStatus("loading");
        await registrationsApi.create(eventId, data);
        await fetchRegistrations();
        setRegistrationStatus("success");
      } catch (error) {
        setRegistrationStatus("error");
        setRegistrationError("Failed to create registration");
      } finally {
        resetToIdle();
      }
    };

  const updateRegistration = async (registrationId: string, eventId: string, data: Partial<Registration>) => {
      try {
        setRegistrationStatus("loading");
        await registrationsApi.update(registrationId, eventId, data);
        await fetchRegistrations();
        setRegistrationStatus("success");
      } catch (error) {
        setRegistrationStatus("error");
        setRegistrationError(`Failed to update registration with ID: ${registrationId}`);
      } finally {
        resetToIdle();
      }
    };

  const deleteRegistration = async (id: string) => {
      try {
        setRegistrationStatus("loading");
        await registrationsApi.remove(id.toString(), eventId);
        await fetchRegistrations();
        setRegistrationStatus("success");
      } catch (error) {
        setRegistrationStatus("error");
        setRegistrationError(`Failed to delete registration with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    };

  useEffectOnce(fetchRegistrations);

  return {
    add: addRegistration,
    get: fetchRegistrations,
    update: updateRegistration,
    remove: deleteRegistration,
    registrationData,
    registrationError,
    registrationStatus: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
  };
}

export default useRegistration;
