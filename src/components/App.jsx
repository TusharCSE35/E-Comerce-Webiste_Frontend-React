import '../style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from "../router/router";
import Header from "./Header";
import Footer from "./Footer";
import store from "../store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="app-wrapper">
            <Header />
            <main className="main-content">
              <Router />
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </BrowserRouter>

      </Provider>
    </>
  )
}

export default App
