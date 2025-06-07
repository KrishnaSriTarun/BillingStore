import { useContext, useState } from 'react';
import './CartSummary.css'
import { AppContext } from '../../Context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import { createOrder, deleteOrder } from '../../Service/OrderService';
import toast from 'react-hot-toast';
import { createRazorpayOrder, verifyPayment } from '../../Service/PaymentService';

function CartSummary({mobileNumber,setMobileNumber, customerName, setCustomerName}) {
      const [isProcessing, setIsProcessing] = useState(false);
      const [orderDetails, setOrderDetails] = useState(null);
      const [showPopup, setShowPopup] = useState(false);
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;


      const {cartItems,clearCart}=useContext(AppContext);
      const totalAmount= cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      const tax= totalAmount * 0.05; 
      const grandTotal= totalAmount + tax;

      const clearAll=()=>{
            setMobileNumber("");
            setCustomerName("");
            clearCart();
      }
      const placeOrder = async () => {
            setShowPopup(true);
            clearAll();
      }
      const handlePrintReceipt = () => {
            window.print();
      }

      const loadRazorpayScript=()=>{
            return new Promise((resolve ,reject)=>{
                  const script = document.createElement("script");
                  script.src = "https://checkout.razorpay.com/v1/checkout.js";
                  script.onload = () => resolve(true);
                  script.onerror = () => resolve(false);
                  document.body.appendChild(script);
            })
      }

      const deleteOrderOnFailure = async(orderId)=>{
            try{
                  await deleteOrder(orderId);
            }
            catch(error){
                  console.error("Error deleting order:", error);
                  toast.error("Failed to delete order. Please try again.");
            }
      }

      const completePayment = async (paymentMode) => {
            if(!mobileNumber || !customerName) {
                  toast.error("Please enter mobile number and customer name");
                  return;
            }
            if(cartItems.length === 0) {
                  toast.error("Cart is empty. Please add items to the cart.");
                  return;
            }
            const orderData={
                        customerName,
                        phoneNumber: mobileNumber,
                        items:cartItems,
                        subTotal:totalAmount,
                        tax,
                        grandTotal,
                        paymentMethod: paymentMode.toUpperCase()
                  }
            setIsProcessing(true);
            try{
                  const response=await createOrder(orderData);
                  const savedData = response.data;
                  if(response.status===201 && paymentMode === "cash"){
                        toast.success("Order placed successfully!");
                        setIsProcessing(false);
                        setOrderDetails(savedData);
                  }
                  else if(response.status===201 && paymentMode === "upi") {
                        const razorpayLoaded = await loadRazorpayScript();
                        if(!razorpayLoaded) {
                              toast.error("Razorpay SDK failed to load. Please try again later.");
                              deleteOrderOnFailure(savedData.orderId);
                              setIsProcessing(false);
                              return;
                        }
                        const razorpayResponse = await createRazorpayOrder({amount: grandTotal, currency: "INR"})
                        const options = {
                              
                              key:razorpayKey,
                              amount: razorpayResponse.data.amount,
                              currency: razorpayResponse.data.currency,
                              order_id: razorpayResponse.data.id,
                              name:"Billing System",
                              description:"Payment for order",
                              handler: async function(response){
                                    await verifyPaymentHandler(response, savedData);
                              },
                              prefill:{
                                    name: customerName,
                                    contact: mobileNumber,
                              },
                              theme: {
                                    color: "#3399cc"
                              },
                              modal:{
                                    ondismiss: async()=> {
                                          await deleteOrderOnFailure(savedData.orderId);
                                          toast.error("Payment cancelled. Please try again.");
                                          setIsProcessing(false);
                                    }
                              }
                        }
                        const razorpay = new window.Razorpay(options);
                        razorpay.on('payment.failed', async (response) => {
                              console.error("Payment failed:", response);
                              await deleteOrderOnFailure(savedData.orderId);
                              toast.error("Payment failed. Please try again.");
                              setIsProcessing(false);
                        });
                        razorpay.open();
                  }
            }
            catch(error) {
                  console.error("Error during payment processing:", error);
                  toast.error("Payment processing failed. Please try again.");
            }
            finally{
                  setIsProcessing(false);
            }
      }

      const verifyPaymentHandler = async (response,savedOrder) => {
            const paymentData = {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  orderId: savedOrder.orderId
            };
            try{
                  const paymentresponse=await verifyPayment(paymentData);
                  if(paymentresponse.status === 200) {
                        toast.success("Payment verified successfully!");
                        setOrderDetails({...savedOrder,paymentDetails:{
                              razorpayOrderId: response.razorpay_order_id,
                              razorpayPaymentId: response.razorpay_payment_id,
                              razorpaySignature: response.razorpay_signature
                        }});
                  }
                  else {
                        toast.error("Payment verification failed. Please try again.");
                  }
            }
            catch(error) {
                  console.error("Error verifying payment:", error);
                  toast.error("Payment verification failed. Please try again.");
            }

      }

      return (
            <div className="mt-2">
                  <div className="cart-summary-details">
                        <div className="d-flex mb-2 justify-content-between">
                              <span className="text-light">Item:</span>
                              <span className="text-light">&#8377;{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex mb-2 justify-content-between">
                              <span className="text-light">Tax (5% ):</span>
                              <span className="text-light">&#8377;{tax.toFixed(2)}</span>
                        </div>
                        <div className="d-flex mb-4 justify-content-between">
                              <span className="text-light">Total :</span>
                              <span className="text-light">&#8377;{grandTotal.toFixed(2)}</span>
                        </div>
                  </div>
                  <div className="d-flex gap-3">
                        <button className="btn btn-success flex-grow-1" onClick={()=>completePayment("cash")} disabled={isProcessing}>{isProcessing?"Processing...":"CASH"}</button>
                        <button className="btn btn-primary flex-grow-1" onClick={()=>completePayment("upi")} disabled={isProcessing}>{isProcessing?"Processing...":"UPI"}</button>
                  </div>
                  {/* <ReceiptPopup/> */}
                  <div className="d-flex gap-3 mt-3">
                        <button className="btn btn-warning flex-grow-1" onClick={placeOrder} disabled={isProcessing || !orderDetails}>Place Order</button>
                  </div>
                  {
                        showPopup && (<ReceiptPopup 
                              orderDetails={
                                    {...orderDetails,
                                          razorpayOrderId:orderDetails.paymentDetails?.razorpayOrderId,
                                          razorpayPaymentId:orderDetails.paymentDetails?.razorpayPaymentId
                                    }}
                                    onClose={()=>setShowPopup(false)}
                                    onPrint={handlePrintReceipt}
                                    />)
                  }
            </div>
      );
}

export default CartSummary;