import { createContext, useEffect, useState } from "react";
import { fetchCategories } from './../Service/CategoryService';
import { fetchItems } from "../Service/ItemService";

export const AppContext =createContext(null);
export const AppContextProvider = (props) => {
      const [categories, setCategories] = useState([]);
      const [items, setItems] = useState([]);
      const [auth, setAuth] = useState({token: null,role: null});
      const [cartItems, setCartItems] = useState([]);

      const addToCart=(item) => {
            const existingItem=cartItems.find(cartItems=>cartItems.name === item.name);
            if(existingItem){
                  setCartItems(cartItems.map(cartItem => 
                        cartItem.name === item.name 
                        ? {...cartItem, quantity: cartItem.quantity + 1} 
                        : cartItem
                  ));
            }
            else{
                  setCartItems([...cartItems, {...item, quantity: 1}]);
            }
      }

      const removeFromCart = (itemId) => {
            setCartItems(cartItems.filter(cartItem => cartItem.itemId !== itemId));
      }
      const updateQuantity=(itemId,newQuantity)=>{
            setCartItems(cartItems.map(cartItem => 
                  cartItem.itemId === itemId ? {...cartItem, quantity: newQuantity} : cartItem
            ));
      }

      useEffect(() => {
            async function loadData() {
                  if(localStorage.getItem("token")&& localStorage.getItem("role")){
                        setAuthData(
                              localStorage.getItem("token"),
                              localStorage.getItem("role")
                        );
                  }
                  const response = await fetchCategories();
                  const itemResponse =await fetchItems();
                  setCategories(response.data);
                  setItems(itemResponse.data);
            }
            loadData();
      }, []);
      const setAuthData = (token, role) => {
            setAuth({token,role});
      };

      const clearCart = () => {
            setCartItems([]);
      };


      const contextValue = {
            categories,
            setCategories,
            auth,
            setAuthData,
            items,
            setItems,
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
      };
      return (
            <AppContext.Provider value={contextValue}>
                  {props.children}  
            </AppContext.Provider>
      );
};