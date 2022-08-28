import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

export const sortString = (a, b) => {
  const stringA = a.toLowerCase();
  const stringB = b.toLowerCase();
  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
    return 1;
  }
  return 0;
};

export const sortDate = (a, b) => {
  return new Date(a) - new Date(b);
};

export const formatDateToUTC = (dateString) => {
  return format(
    utcToZonedTime(parseISO(dateString), "UTC"),
    "dd-MM-yyyy HH:mm",
    { timeZone: "UTC" }
  );
};

export const mapUsersData = (users) => {
  return users.map((user, idx) => ({
    key: idx + 1,
    username: user.login.username,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    gender: user.gender,
    registered_date: formatDateToUTC(user.registered.date),
    unformat_registered_date: user.registered.date,
  }));
};

export const isInclude = (text, keyword) => {
  return text.toLowerCase().includes(keyword.toLowerCase())
}