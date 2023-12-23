export const formatDate = dateString => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Bangkok"
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
