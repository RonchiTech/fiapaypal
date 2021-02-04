import React, { useRef, useState } from 'react';
import classes from './FiaPaypal.module.css';
const FiaPaypal = () => {
  const paypal = useRef();
  const [amount, setAmount] = useState(5);
  
  const changeValue = (e) => {
    setAmount(e.target.value);
  };
  const checkouthandler = () => {
    console.log('heyt');
    window.paypal
.Buttons({
  createOrder: (data, actions, error) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'Tuition',
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    });
  },
  onApprove: async (data, actions) => {
    const order = await actions.order.capture();
   alert('Successful Order');
  },
  onError: (error) => {
   alert(error);
  }
})
.render(paypal.current);
}
  
  return (
    <div className={classes.Fia}>
      <h2>FIA Payments</h2>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => changeValue(e)}
        ></input>
      </label>
      <button onClick={()=>checkouthandler()}>Proceed to Checkout</button>
      <div ref={paypal} />
    </div>
  );
};

export default FiaPaypal;

