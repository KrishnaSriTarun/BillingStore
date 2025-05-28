import { useContext, useState } from 'react';
import './Explore.css';
import { AppContext } from '../../Context/AppContext';
import CartSummary from './../../Components/CartSummary/CartSummary';
import CartItems from './../../Components/CartItems/CartItems';
import CustomerForm from './../../Components/CustomerForm/CustomerForm';
import DisplayItems from './../../Components/DisplayItems/DisplayItems';
import DisplayCategory from './../../Components/DisplayCategory/DisplayCategory';
function Explore() {
      const {categories}=useContext(AppContext);
      const [selectedCategory,setSelectedCategory]=useState("")
      const [customerName,setCustomerName]=useState("");
      const [mobileNumber,setMobileNumber]=useState("");
      return (
            <div className="explore-container text-light">
                  <div className="left-column">
                        <div className="first-row" style={{overflowY:'auto'}}>
                              <DisplayCategory 
                              categories={categories}
                              selectedCategory={selectedCategory}
                              setSelectedCategory={setSelectedCategory}/>
                        </div>
                        <hr className="horizontal-line"/>
                        <div className="second-row"style={{overflowY:'auto'}}>
                              <DisplayItems selectedCategory={selectedCategory}/>
                        </div>
                  </div>
                  <div className="right-column d-flex flex-column">
                        <div className="customer-form-container" style={{height:'15%'}}>
                              <CustomerForm  customerName={customerName} mobileNumber={mobileNumber}
                              setCustomerName={setCustomerName} setMobileNumber={setMobileNumber}/>
                        </div>
                        <hr className="my-3 text-light"/>
                        <div className="cart-items-container" style={{height:'48%', overflowY:'auto'}}>
                              <CartItems/>
                        </div>
                        <div className="cart-summary-container" style={{height:'37%'}}>
                              <CartSummary customerName={customerName} mobileNumber={mobileNumber}
                              setCustomerName={setCustomerName} setMobileNumber={setMobileNumber}/>
                        </div>
                  </div>
            </div>
      );
}

export default Explore;