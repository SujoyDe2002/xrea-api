import { xreaRequest } from "server/utils/axios";

export const getUseCaseList = async () => {
  const url = `/api/masters/usecases`;
  const { data } = await xreaRequest(url, "GET");
  return data;
};
