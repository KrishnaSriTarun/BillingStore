import { useContext, useState } from 'react';
import './DisplayItems.css'
import { AppContext } from './../../Context/AppContext';
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';

function DisplayItems({selectedCategory}) {
      const {items} = useContext(AppContext)
      const [searchText, setSearchText] = useState('');
      
      const filteredItems = items.filter(item => {
            if(!selectedCategory) return true;
            return item.categoryId === selectedCategory;
      }).filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      
      return (
            <div className="display-items-container">
                  {/* Header Section */}
                  <div className="header-section">
                        <div className="search-wrapper">
                              <SearchBox onSearch={setSearchText}/>
                        </div>
                  </div>
                  
                  {/* Items Grid */}
                  <div className="items-grid">
                        {filteredItems.length > 0 ? (
                              filteredItems.map((item, index) => (
                                    <div key={item.itemId || index} className="item-wrapper">
                                          <Item 
                                                itemName={item.name} 
                                                itemPrice={item.price}
                                                itemImage={item.imgUrl} 
                                                itemId={item.itemId}
                                          />
                                    </div>
                              ))
                        ) : (
                              <div className="no-items">
                                    <i className="bi bi-search"></i>
                                    <p>No items found</p>
                              </div>
                        )}
                  </div>
            </div>
      );
}

export default DisplayItems;