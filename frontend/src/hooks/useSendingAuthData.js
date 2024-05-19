import { useEffect, useState } from "react"

function useSendingAuthData(url,sendData) {

    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

    const fetchSendingAuthData= async()=>{
        setLoading(true);
        try {
            const response = await axios.post(url,sendData);
            console.log(response);
            const authorization = response.data.token;
            localStorage.setItem('authorization', authorization);

        } catch (error) {
            console.log("error is =>", error)
            setError(error.response.data.message)
            
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchSendingAuthData()
    },[])
  return [data,loading,error];
}

export default useSendingAuthData;
