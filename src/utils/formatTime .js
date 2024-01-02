export const formatTime = countdown => {
  const hours = Math.floor(countdown / 3600); // Convert seconds to hours
  const minutes = Math.floor((countdown % 3600) / 60); // Convert remaining seconds to minutes
  const seconds = countdown % 60; // Calculate remaining seconds

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")} hour ${String(minutes).padStart(
      2,
      "0"
    )} นาที ${String(seconds).padStart(2, "0")} second`;
  } else if (minutes > 0) {
    return `${String(minutes).padStart(2, "0")} minute ${String(
      seconds
    ).padStart(2, "0")} second`;
  } else {
    return `${String(seconds).padStart(2, "0")} second`;
  }
};
