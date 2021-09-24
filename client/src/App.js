import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Box } from "@chakra-ui/layout";
import Lobby from "./pages/Lobby";

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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/lobby">
            <Lobby />
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
        <Box
          top="50%"
          left="50%"
          position="absolute"
          transform="translate(-50%, -50%)"
          border="4px rgba(29,29,27,.15) solid"
          borderRadius="12px"
          boxShadow="inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 3px 0px 0px rgb(255 255 255 / 15%)"
          w="90%"
          h="90%"
        >
          {children}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
