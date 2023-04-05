import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import myKey from "./khaltiKey";
//console.log(data.token, data.amount, mykey.secretKey);
let config = {
  // replace this key with yours
  publicKey: "test_public_key_30b8f76bd5114d07b1f0d874cf9f1e5f",
  productIdentity: "123766",
  productName: "My Ecommerce Store",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.SecretKey}`
        )
        .then((response) => {
          console.log(response.data);
          alert("Thank you for generosity");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};
export default function Khalti() {
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };
  return (
    <div>
      <button
        onClick={() => checkout.show({ amount: 1000 })}
        style={buttonStyles}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}
