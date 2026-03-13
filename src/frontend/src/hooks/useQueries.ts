import { useMutation } from "@tanstack/react-query";
import { ServiceType } from "../backend";
import { useActor } from "./useActor";

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      service: ServiceType;
      preferredDate: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(
        data.name,
        data.email,
        data.phone,
        data.service,
        data.preferredDate,
        data.message,
      );
    },
  });
}

export { ServiceType };
