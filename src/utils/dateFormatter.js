const dateFormatter = (date) => {
  const offset = new Date(date).getTimezoneOffset();
  date = new Date(date).getTime() - offset * 1000 * 60;
  date = new Date(date).toISOString().slice(0, 16);
  return `${date.split("T")[0].split("-").reverse().join("-")} ${date.split("T")[1]}`;
}

export default dateFormatter;