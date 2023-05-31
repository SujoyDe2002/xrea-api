import { xreaRequest } from "server/utils/axios";

export const getCityList = async (srch) => {

    const url = `/api/masters/countries?srch=${srch}`;
    const { data } = await xreaRequest(url, "GET")
    return data

}
