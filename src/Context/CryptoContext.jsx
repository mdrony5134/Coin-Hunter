import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("BDT");
  const [symbol, setSymbol] = useState("৳");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (currency === "BDT") setSymbol("৳");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
    else if (currency === "EUR") setSymbol("€");
  }, [currency]);

  return (
    <div>
      <Crypto.Provider
        value={{ currency, symbol, setCurrency, alert, setAlert }}
      >
        {children}
      </Crypto.Provider>
    </div>
  );
};

export default CryptoContext;

// custom hook
export const CryptoState = () => {
  return useContext(Crypto);
};
