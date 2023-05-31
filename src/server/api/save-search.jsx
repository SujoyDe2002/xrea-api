import { xreaRequest } from "server/utils/axios";

export const postSearchDetails = async (payLoad) => {
 
      const url = `/api/search/save`;
      const  response  = await xreaRequest(url, "POST", payLoad)
      console.log("Saved Response : ",response);
      return response
  }
