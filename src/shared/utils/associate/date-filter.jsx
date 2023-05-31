import moment from "moment/moment";

export const dateFilter = (dateTime) => {
    return dateTime && moment(new Date(dateTime)).format("MMMM DD, YYYY hh:mm a");
}