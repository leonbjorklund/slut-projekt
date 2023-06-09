import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat/400.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AccountProvider } from "./context/accountContext";
import CartProvider from "./context/cartContext";
import OrderProvider from "./context/orderContext";
import ProductProvider from "./context/productContext";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FBF8F1",
    },
  },
  fonts: {
    body: `'Montserrat', sans serif`,
    heading: "adamina",
  },
});

function App() {
  return (
    <ProductProvider>
      <AccountProvider>
        <CartProvider>
          <OrderProvider>
            <ChakraProvider theme={theme}>
              <Box bg='brand.100'>
                <Header />
                <Box as='main' pt={24} minH='calc(100vh - 160px)'>
                  <Outlet />
                </Box>
                <Footer />
              </Box>
            </ChakraProvider>
          </OrderProvider>
        </CartProvider>
      </AccountProvider>
    </ProductProvider>
  );
}

export default App;
