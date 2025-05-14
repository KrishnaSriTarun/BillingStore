import ItemForm from '../../Components/ItemForm/ItemForm';
import ItemList from '../../Components/ItemList/ItemList';
import './ManageItems.css';
function ManageItems() {
      return (
            <div className="items-container text-light">
                  <div className="left-column">
                        <ItemForm/>
                  </div>
                  <div className="right-column">
                        <ItemList/>
                  </div>
            </div>
      );
}

export default ManageItems;