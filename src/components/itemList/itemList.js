import Item from "../item/item";

import PlusSVG from "../svgImages/plusSVG";
import Plus from '../../img/plus.svg'

import './itemList.css';

const ItemList = ({items, onAdd, onTitleChange, amount, takeItems, onTools, 
                    deleteItem, pause, categoriesList, onCategorieAdd,deleteCatFromItem}) => {

    const elements = items.map((item, i) => {
 
        return <Item    key={item.id}
                        n={i}
                        {...item} 
                        onTitleChange={onTitleChange}
                        takeList={takeItems[i]}
                        onTools={onTools}
                        deleteItem={deleteItem}
                        pause={pause}
                        categoriesList={categoriesList}
                        onCategorieAdd={onCategorieAdd}
                        deleteCatFromItem={deleteCatFromItem}/>
    })
    return (
        <>
            <ul>
                {elements}
            </ul>
            {amount ? null : <div>Добавить</div>}
            <div className="add">
                <PlusSVG clazz='add_img' f={() => onAdd()}/>
            </div>
        </>

    )
}

export default ItemList;