import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../Context/CryptoContext";
import { useNavigate } from "react-router-dom";

import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const { currency, symbol} = CryptoState();
  const navigate = useNavigate();

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
    // console.log(data)
  };
  // console.log(coins)
  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
    },
  });

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handelSearch = () => {
    return (
      coins.filter((coin) => coin.name.toLowerCase().include(search)) ||
      coins.symbol.toLowerCase().include(search)
    );
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search for a cryptocurrency"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head, index) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={index}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handelSearch().map((row, index) => {
                    // const profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={()=>navigate("/Coins/`${row.id}`")}
                        key={index}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinTable;
