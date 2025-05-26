import { useContext } from 'react';
import './DisplayItems.css'
import { AppContext } from './../../Context/AppContext';
import Item from '../Item/Item';
function DisplayItems() {
      const {items}=useContext(AppContext)
      
      return (
            <div className="p-3">
                  <div className="row g-3">
                        {items.map((item,index)=>(
                              <div key={index} className="col-md-4 col-sm-6">
                                    <Item itemName={item.name} itemPrice={item.price}
                                    itemImage={item.imgUrl} itemId={item.itemId}/>
                              </div>
                        ))}
                  </div>
            </div>
      );
}

export default DisplayItems;