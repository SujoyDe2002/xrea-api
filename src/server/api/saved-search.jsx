import { xreaRequest } from "server/utils/axios";

export const getSavedSearch = async (userId) => {

      const url = `/api/search/searchList?user_id=${userId}`;
      const response = userId && await xreaRequest(url, "GET")
      console.log("response : ",response);
      return response;
      
  }