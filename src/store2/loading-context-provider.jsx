import React, { useState, createContext } from "react";
import { timeout } from "shared/constants/attachment-extention";
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";
import ResponseMessage from "shared/utils/response-message/response-message";
export const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [user, setUser] = useState(null);
  // todo change to redux
  const [receivedSearchResult, setReceivedSearchResult] = useState(true);
  const [searchTitle, setSearchTitle] = useState();
  const [xreSearchDisable, setXreSearchDisable] = useState(false);
  const startLoader = () => {
    setLoading(true);
    setResponseMessage(null);
  };
  const stopLoader = () => {
    setLoading(false);
  };
  const handleResponseMessage = (message) => {
    //console.log("handleResponseMessage", message);
    setResponseMessage(message);
    setTimeout(() => {
      setResponseMessage(null);
    }, timeout);
  };
  const loaderFunction = {
    startLoader,
    stopLoader,
  };
  const searchGetterSetter = {
    receivedSearchResult,
    setReceivedSearchResult,
  };
  const userGetterSetter = {
    user,
    setUser,
  };
  const searchTitleGetterSetter = {
    searchTitle,
    setSearchTitle
  }
  
  return (
    <LoadingContext.Provider
      value={{
        loaderFunction,
        handleResponseMessage,
        searchGetterSetter,
        userGetterSetter,
        searchTitleGetterSetter
      }}
    >
      {loading && <CircularIndeterminate />}
      {responseMessage && <ResponseMessage message={responseMessage} />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
