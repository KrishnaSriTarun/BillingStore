import { useContext } from 'react';
import './CartSummary.css'
import { AppContext } from '../../Context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';

function CartSummary({mobileNumber,setMobileNumber, customerName, setCustomerName}) {
      const {cartItems}=useContext(AppContext);
      const totalAmount= cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      const tax= totalAmount * 0.05; 
      const grandTotal= totalAmount + tax;
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
                        <button className="btn btn-success flex-grow-1" >Cash</button>
                        <button className="btn btn-primary flex-grow-1" >UPI</button>
                  </div>
                  {/* <ReceiptPopup/> */}
                  <div className="d-flex gap-3 mt-3">
                        <button className="btn btn-warning flex-grow-1">Place Order</button>
                  </div>
            </div>
      );
}

export default CartSummary;