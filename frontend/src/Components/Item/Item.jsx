import { useContext, useState } from 'react';
import './Item.css'
import { AppContext } from '../../Context/AppContext';

function Item({itemName, itemPrice, itemImage, itemId}) {
      const {addToCart} = useContext(AppContext);
      const [isAdding, setIsAdding] = useState(false);

      const handleAddToCart = async (e) => {
            e.preventDefault();
            setIsAdding(true);
            
            addToCart({
                  name: itemName,
                  price: itemPrice,
                  quantity: 1,
                  itemId: itemId
            });
            
            // Reset button state after animation
            setTimeout(() => setIsAdding(false), 800);
      }

      return (
            <div className="item-card">
                  <div className="item-image-container">
                        <img 
                              src={itemImage} 
                              alt={itemName} 
                              className="item-image"
                              loading="lazy"
                        />
                        <div className="item-overlay">
                              <button 
                                    className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    aria-label={`Add ${itemName} to cart`}
                              >
                                    {isAdding ? (
                                          <i className="bi bi-check-lg"></i>
                                    ) : (
                                          <i className="bi bi-cart-plus"></i>
                                    )}
                              </button>
                        </div>
                  </div>
                  
                  <div className="item-content">
                        <h3 className="item-name">{itemName}</h3>
                        <div className="item-price-section">
                              <span className="currency">₹</span>
                              <span className="price">{itemPrice}</span>
                        </div>
                  </div>
            </div>
      );
}

export default Item;