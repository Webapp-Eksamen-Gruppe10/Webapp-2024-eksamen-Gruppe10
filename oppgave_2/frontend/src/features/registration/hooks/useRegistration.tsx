import { useState, useCallback } from "react";
import { registrationsApi } from "@/features/registration/services/api";
import { useEffectOnce } from "@/hooks/useEffectOnce";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

type Registration = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  event_id: string;
};

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
      setRegistrationData(result.data as Registration[]);
      setRegistrationStatus("success");
    } catch (error) {
      setRegistrationStatus("error");
      setRegistrationError("Failed to fetch registrations");
    }
  }, [eventId]);

  const addRegistration = useCallback(
    async (data: Omit<Registration, "id">) => {
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
    },
    [eventId, fetchRegistrations, resetToIdle]
  );

  const updateRegistration = useCallback(
    async (id: number, data: Partial<Registration>) => {
      try {
        setRegistrationStatus("loading");
        await registrationsApi.update(id.toString(), data);
        await fetchRegistrations();
        setRegistrationStatus("success");
      } catch (error) {
        setRegistrationStatus("error");
        setRegistrationError(`Failed to update registration with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchRegistrations, resetToIdle]
  );

  const deleteRegistration = useCallback(
    async (id: number) => {
      try {
        setRegistrationStatus("loading");
        await registrationsApi.remove(id.toString());
        await fetchRegistrations();
        setRegistrationStatus("success");
      } catch (error) {
        setRegistrationStatus("error");
        setRegistrationError(`Failed to delete registration with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchRegistrations, resetToIdle]
  );

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
