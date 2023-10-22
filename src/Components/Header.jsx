import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context/CryptoContext";

// material ui style

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bolder",
    cursor: "pointer",
    fontSize: 25,
    fontFamily: "Montserrat",
  },
}));

const Header = () => {
  const classes = useStyles();
  let Navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary:{
        main: "#fff"
      },
      type: "dark",
    },
  });

  const {currency, setCurrency} = CryptoState()
  console.log(currency)

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => Navigate("/")}
                className={classes.title}
                variant="h6"
              >
                Crypto Hunter
              </Typography>

              <Select
                variant="outlined"
                style={{ 
                  width: 100, 
                  height: 40, 
                  marginRight: 15 
                }}
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"BDT"}>BDT</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
