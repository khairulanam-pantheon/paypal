import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Payment from './View/payment';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function App() {
  /* const [amt, setAmt] = useState('1');
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amt,
          },
        },
      ],
    });
  }
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
  }
  function _onError(err) {
    console.log(err);
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  } */
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/payment/:amt">
            <Payment />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;