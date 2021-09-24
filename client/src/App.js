import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { Box } from "@chakra-ui/layout";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

const Layout = ({ children }) => {
  return (
    <Box
      w="100%"
      h="100vh"
      bgGradient="linear(200deg, rgba(92,30,166,1) 0%,rgba(200,67,94,1) 100%);"
    >
      <Box
        w="inherit"
        h="inherit"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        bgImage="url(https://garticphone.com/images/textura.png)"
      >
        {children}{" "}
      </Box>
    </Box>
  );
};

export default App;
