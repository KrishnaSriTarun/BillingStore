import './DisplayCategory.css'
import Category from './../Category/Category';
import { assets } from './../../assets/Assets';
function DisplayCategory({categories,selectedCategory,setSelectedCategory}) {
      return (
            <div className="row g-3" style={{width:'100%',margin:0}}>
                  <div className="col-md-4 col-sm-6" key="all" style={{padding: '0,15px'}}>
                        <Category categoryName="All Items" imgUrl={assets.Gadgets}
                                    numberOfItems={categories.reduce((acc,cat)=>acc+cat.items,0)} 
                                    bgColor="#6c757d"
                                    isSelected={selectedCategory===""}
                                    onClick={()=>setSelectedCategory("")}
                        />
                  </div>
                  {categories.map((category) => (
                        <div className="col-md-4 col-sm-6" key={category.categoryId} style={{padding: '0,15px'}}>
                              <Category categoryName={category.name} imgUrl={category.imgUrl}
                              numberOfItems={category.items} bgColor={category.bgColor}
                              isSelected={selectedCategory===category.categoryId}
                              onClick={()=>setSelectedCategory(category.categoryId)}
                              />
                        </div>
                  ))}
            </div>
      );
}

export default DisplayCategory;