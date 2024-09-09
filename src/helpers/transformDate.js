export const transformDate = (date) => {
  ///  2024-03-20T15:52:58.843Z  ===>  20.03.2024
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

export const transformDateTime = (dateString) => {
  ///  Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)  ===>  2024-08-07 17:12
  const date = new Date(dateString);

  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  const hours = String(date?.getHours())?.padStart(2, "0");
  const minutes = String(date?.getMinutes())?.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const transformDates = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  01.04.2019
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date?.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const transformTime = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  17:12
  const date = new Date(dateString);
  const hours = date?.getHours()?.toString()?.padStart(2, "0");
  const minutes = date?.getMinutes()?.toString()?.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const extractEndTime = (timeRange) => {
  //// 11:00 - 12:00 ====> 11:00
  const parts = timeRange?.split(" - ");

  if (parts?.length === 2) {
    return parts[1]?.trim();
  }
};