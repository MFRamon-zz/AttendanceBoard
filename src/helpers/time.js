const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const getDay = () => {
  const time = new Date();
  return days[time.getDay()];
};

const getHours = () => {
  const time = new Date();
  return time.getHours();
};

export { getDay, getHours };
