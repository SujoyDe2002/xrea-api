import { React, useEffect, useState } from 'react'
import { getLocalStorageItem } from 'shared/utils';

const PrivateComponent = ({children}) => {
  const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (getLocalStorageItem("xrea")) {
          const { loginData } = getLocalStorageItem("xrea")?.data;
          setUserId(loginData?.userId);
        }
      }, [])
  return (
    <>{userId? {children}: null} </>
  )
}

export default PrivateComponent