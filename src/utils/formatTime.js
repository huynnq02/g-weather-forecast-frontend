function formatTime(isoDateString) {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  return date.toLocaleDateString("vi-VN", options);
}
export default formatTime;
