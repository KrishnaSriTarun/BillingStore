import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { deleteItem } from "../../Service/ItemService";
import toast from "react-hot-toast";
import "./itemList.css";

function ItemList() {
      const { items, setItems, categories, setCategories } = useContext(AppContext);
      const [searchItem, setSearchItem] = useState("");

      const filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      const colors = [
            '#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a',
            '#a8edea', '#ff9a9e', '#ffecd2', '#ff8a80', '#84fab0',
            '#d299c2', '#89f7fe', '#fdbb2d', '#ee9ca7', '#c471f5'
      ];

      const getCardColor = (index) => {
            return colors[index % colors.length];
      };

      const removeItem = async (itemId) => {
            try {
                  const response = await deleteItem(itemId);
                  if (response.status === 204) {
                        const deletedItem = items.find(item => item.itemId === itemId);
                        const updatedItems = items.filter(item => item.itemId !== itemId);
                        setItems(updatedItems);
                        if (deletedItem) {
                              const updatedCategories = categories.map(category => {
                                    if (category.categoryId === deletedItem.categoryId) {
                                          return {
                                                ...category,
                                                items: category.items > 0 ? category.items - 1 : 0
                                          };
                                    }
                                    return category;
                              });
                              setCategories(updatedCategories);
                        }

                        toast.success('Item deleted');
                  } else {
                        toast.error('Failed to delete item');
                  }
            } catch (err) {
                  console.log(err);
                  toast.error('Unable to delete item');
            }
      }

      return (
            <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
                  <div className="row pe-2">
                        <div className="input-group mb-3">
                              <input
                                    type="text"
                                    name="keyword"
                                    id="keyword"
                                    className='form-control'
                                    placeholder='Search by keyword'
                                    onChange={(e) => setSearchItem(e.target.value)}
                                    value={searchItem}
                              />
                              <span className="input-group-text bg-warning">
                                    <i className="bi bi-search"></i>
                              </span>
                        </div>
                  </div>
                  <div className="row g-3 pe-2">
                        {filteredItems.map((item, index) => (
                              <div className="col-12" key={index}>
                                    <div className="card p-3" style={{backgroundColor: getCardColor(index),border: 'none',borderRadius: '10px'}}>
                                          <div className="d-flex align-items-center">
                                                <div style={{ marginRight: '15px' }}>
                                                      <img src={item.imgUrl} alt={item.name} className="item-image" />
                                                </div>
                                                <div className="flex-grow-1">
                                                      <h6 className="mb-1 text-white">{item.name}</h6>
                                                      <p className="mb-0 text-white">
                                                            Category: {item.categoryName}
                                                      </p>
                                                      <span className="mb-0 badge rounded-pill bg-light text-dark">
                                                            &#8377;{item.price}
                                                      </span>
                                                </div>
                                                <div>
                                                      <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                                                            <i className="bi bi-trash"></i>
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
}

export default ItemList;
