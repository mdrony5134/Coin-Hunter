import { useEffect } from "react"
import { createContext, useContext, useState } from "react"

const Crypto = createContext()
const CryptoContext = ({children}) => {
  const [currency, setCurrency]=useState("BDT")
  const [symbol, setSymbol] = useState("৳")

  useEffect(()=>{
    if(currency === "BDT") setSymbol("৳")
    else if(currency === "USD") setSymbol("$")
  },[currency])
  
  return (
    <div>
        <Crypto.Provider value={{currency,symbol,setCurrency}}>{children}</Crypto.Provider>
    </div>
  )
}

export default CryptoContext

// custom hook
export const CryptoState = () =>{
  return useContext(Crypto)
}