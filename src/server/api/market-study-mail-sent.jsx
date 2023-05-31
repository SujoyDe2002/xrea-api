import { xreaRequest } from "server/utils/axios";

export const postMarketStudyMailSent = async (payLoad) => {
 
      const url = `/api/users/sendmail`;
      const  {status}  = await xreaRequest(url, "POST", payLoad)
      //console.log("mail data : ", + response);
      return status;
  }