import { useState } from "react";
import { useMutation } from "convex/react";

export function useApiMutation(mutationFunction: any) {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    try {
      setPending(true);
      const result = await apiMutation(payload);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setPending(false);
    }
  };

  return { mutate, pending };
}
