import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import Header from "./Components/Header"
import HomePage from "./pages/HomePage"
import CoinPage from "./pages/CoinPage"
import { makeStyles } from "@material-ui/core"


// material ui style
const useStyles = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color:"white",
    minHeight: "100vh",
  },
});
   
function App() {

  const classes = useStyles();

return (
  
      <BrowserRouter>
       <div className={classes.App}>
       <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/coin/:id" element={<CoinPage/>}/>
        </Routes>
       </div>
      </BrowserRouter>
  
  )
}

export default App
