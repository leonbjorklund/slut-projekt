import { useMemo } from "react";

function useFormatCreatedAtDate(createdAt: string) {
  const formattedDate = useMemo(() => {
    return new Date(createdAt).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }, [createdAt]);

  return formattedDate;
}

export default useFormatCreatedAtDate;
