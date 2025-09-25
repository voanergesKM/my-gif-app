export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, options);
};
