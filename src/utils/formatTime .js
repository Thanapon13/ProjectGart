export const formatTime = countdown => {
  const hours = Math.floor(countdown / 3600); // Convert seconds to hours
  const minutes = Math.floor((countdown % 3600) / 60); // Convert remaining seconds to minutes
  const seconds = countdown % 60; // Calculate remaining seconds

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")} ชั่วโมง ${String(
      minutes
    ).padStart(2, "0")} นาที ${String(seconds).padStart(2, "0")} วินาที`;
  } else if (minutes > 0) {
    return `${String(minutes).padStart(2, "0")} นาที ${String(seconds).padStart(
      2,
      "0"
    )} วินาที`;
  } else {
    return `${String(seconds).padStart(2, "0")} วินาที`;
  }
};
