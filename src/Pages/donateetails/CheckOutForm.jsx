import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CheckOutForm = ({ closeDialog, DonateAmount , donationId }) => {
    console.log(donationId)
  const { user } = useContext(AuthProvider);
  const [clientSecret, setClientSecret] = useState(null);
  const AxiosSecure = useAxiosSecure();
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (DonateAmount > 0) {
      AxiosSecure.post("/create_payment_intent", { price: DonateAmount }).then(
        (res) => {
          
          setClientSecret(res.data.clientScript);
        }
      );
    }
  }, [AxiosSecure, DonateAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });
    if (paymentError) {
      setError(paymentError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
       
        //add payment history
        const payment_history = {
          DonationItem_ID : donationId,
          user_email: user?.email,
          user_name: user?.displayName,
          transaction_id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          date: new Date(),
        };
        AxiosSecure.post("/payment_history", payment_history).then(() => {
            closeDialog();
            toast.success(`payment successful.`);
        })
        .catch(() => {
            Swal.fire({
                title: "Error From Server!",
                text: "Payment failed to Save . Mail us with your payment details. ",
                icon: "error"
              });
        })
      
      }
      else{
        toast.error("payment failed ! Try Again.");
      }
    }
  };

  return (
    <div className="w-full">
        <p className="text-left text-base mb-3 font-bold font-display">Donated Amount : <span className="font-medium">{DonateAmount}$</span></p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2"
      >
        <CardElement className="w-full flex-1 mt-4" />
        <button className=" bg-green-500 hover:bg-pink-600 text-white font-bold py-1 px-4 rounded mt-4" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};
CheckOutForm.propTypes = {
    closeDialog: PropTypes.any,
  DonateAmount: PropTypes.number,
  donationId: PropTypes.any,
};

export default CheckOutForm;
