const { xreaRequest } = require("server/utils/axios");

export const getSearchedResult = async (payLoad) => {
  const url = `/api/search/searchForSegment`;
  const { data } = await xreaRequest(url, "POST", payLoad);
  console.log("search Item : ",data);
  return data

}

