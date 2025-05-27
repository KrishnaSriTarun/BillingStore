import { useState } from "react";

function SearchBox({onSearch}) {
      const [searchText, setSearchText] = useState('');
      const handleInputChange = (e) => {
            const text = e.target.value;
            setSearchText(text);
            onSearch(text); 
      };
      return (
            <div className="input-group mb-3">
                  <input type="text" name="" id=""  className="form-control" placeholder="Search Items" value={searchText} onChange={handleInputChange}/>
                  <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                  </span>
            </div>
      );
}

export default SearchBox;