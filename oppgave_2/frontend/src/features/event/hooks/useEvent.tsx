import { useCallback, useState } from "react";
import { eventsApi } from "@/features/event/services/api"; 
import { useEffectOnce } from "@/hooks/useEffectOnce";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

type Event = {
    id: string;
    capacity: string;
    title: string;
    datetime: Date;
    location: string;
    category: string;
    price: number;
    description: string;
    private: boolean;
    waitinglist: boolean;
    template_id: number;
  };

export function useEvent() {
  const [eventStatus, setEventStatus] = useState<Status>("idle");
  const [eventData, setEventData] = useState<Event[]>([]);
  const [eventError, setEventError] = useState<string | null>(null);

  const isFetching = eventStatus === "fetching";
  const isLoading = eventStatus === "loading" || isFetching;
  const isError = eventStatus === "error" || !!eventError;
  const isIdle = eventStatus === "idle";
  const isSuccess = eventStatus === "success";

  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setEventStatus("idle");
      }, timeout),
    []
  );

  const fetchEvents = useCallback(async () => {
    try {
      setEventStatus("loading");
      const result = await eventsApi.list();
      setEventData(result.data as Event[]);
      setEventStatus("success");
    } catch (error) {
      setEventStatus("error");
      setEventError("Failed to fetch events");
    }
  }, []);

  const addEvent = useCallback(
    async (data: Partial<Event>) => {
      try {
        setEventStatus("loading");
        await eventsApi.create(data);
        await fetchEvents();
        setEventStatus("success");
      } catch (error) {
        setEventStatus("error");
        setEventError("Failed to create event");
      } finally {
        resetToIdle();
      }
    },
    [fetchEvents, resetToIdle]
  );

  const updateEvent = useCallback(
    async (id: string, data: Partial<Event>) => {
      try {
        setEventStatus("loading");
        await eventsApi.update(id, data);
        await fetchEvents();
        setEventStatus("success");
      } catch (error) {
        setEventStatus("error");
        setEventError(`Failed to update event with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchEvents, resetToIdle]
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      try {
        setEventStatus("loading");
        await eventsApi.remove(id);
        await fetchEvents();
        setEventStatus("success");
      } catch (error) {
        setEventStatus("error");
        setEventError(`Failed to delete event with ID: ${id}`);
      } finally {
        resetToIdle();
      }
    },
    [fetchEvents, resetToIdle]
  );

  useEffectOnce(fetchEvents);

  return {
    add: addEvent,
    get: fetchEvents,
    update: updateEvent,
    remove: deleteEvent,
    eventData,
    eventError,
    eventStatus: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
  };
}

export default useEvent;
