import { xreaRequest } from "server/utils/axios";

export const getSpecificSearch = async (payLoad) => {
  const url = `/api/search/getSearchItem`;
  const { data } = await xreaRequest(url, "POST", payLoad);
  return data;
};
