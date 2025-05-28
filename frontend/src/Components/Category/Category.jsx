import './Category.css';

function Category({categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick}) {
      return (
            <div 
                  className={`category-card ${isSelected ? 'category-selected' : ''}`}
                  style={{
                        background: isSelected 
                              ? `linear-gradient(135deg, ${bgColor}ee, ${bgColor}cc)` 
                              : `linear-gradient(135deg, ${bgColor}dd, ${bgColor}aa)`,
                  }} 
                  onClick={onClick}
            >
                  <div className="category-image-container">
                        <img src={imgUrl} alt={categoryName} className="category-image" />
                        <div className="image-overlay"></div>
                  </div>
                  
                  <div className="category-content">
                        <h6 className="category-name">{categoryName}</h6>
                        <p className="category-count">{numberOfItems} Items</p>
                  </div>
                  
                  {isSelected && (
                        <div className="selection-indicator">
                              <div className="selection-dot"></div>
                        </div>
                  )}
                  
                  <div className="category-glow"></div>
            </div>
      );
}

export default Category;