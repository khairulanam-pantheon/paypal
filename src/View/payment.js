import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useParams, Route} from "react-router-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function Payment() {
  const {amt} = useParams();
  const [orderInfo, setOrederInfo] = useState({})

  useEffect(() => {
    fetch('https://nzapi.romanaexpress.com/order-details/'+ amt +'?apiKey=Nokia%40123')
    .then((response) => response.json())
    .then((json) => {
      setOrederInfo(json.data)
      })
  }, [])

  if(orderInfo.billingAddress){
    var billingPhone = orderInfo.billingAddress.phone.replace(/ /g, '')
  }
  
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderInfo.order_total,
          },
        },
      ],
      payer: {
        name: {
          given_name: orderInfo.billingAddress.first_name,
          surname: orderInfo.billingAddress.last_name
        },
        address: {
          address_line_1: orderInfo.billingAddress.address_1,
          address_line_2: orderInfo.billingAddress.address_2,
          admin_area_2: orderInfo.billingAddress.address_1,
          admin_area_1: orderInfo.billingAddress.address_2,
          postal_code: orderInfo.billingAddress.postcode,
          country_code: orderInfo.billingAddress.countryName
        },
        email_address: orderInfo.billingAddress.email,
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: billingPhone
          }
        }
      }, 
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
  }
  return (
    <div style={{flex: 1,alignItems: 'center',justifyContent:'center',marginTop: 100,marginLeft:40,marginRight:40}}>
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onCancel={() => _onError("CANCELED")}
        onError={(err) => _onError("ERROE")}
      />
    </div>
  );
}
export default Payment;