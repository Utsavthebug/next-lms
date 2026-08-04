export const formatMyDate = date => {
    if(!date) return "Invalid Date";

    const parsedDate = new Date(date);

    if(isNaN(parsedDate)) {
        return "Invalid Date";
    }

    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(parsedDate);
    return formattedDate;
  }