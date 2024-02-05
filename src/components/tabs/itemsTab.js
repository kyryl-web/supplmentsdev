import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../header/header';
import ItemList from '../itemList/itemList';
import Categories from '../categories/categories';
import InitFilter from '../initFilter/initFilter';
import QuickMenu from '../quickMenu/quickMenu';
import NightMod from '../nightMod/nightMod';
import WaitSuppList from '../tabs/suppList';

const ItemsTab = (props) => {
    const { initFilter, getInitFilter, onCategories, deleteCatFromItem, getFilter, filter,
            filteredItems, onAdd, onTitleChange, amount, takeItems, onTools, deleteItem, pause, categories, onCategorieAdd} = props;
    return (
        <div className='items_tab'>
            <InitFilter initFilter={initFilter} getInitFilter={getInitFilter}/>
            <Categories 
                onCategories={onCategories} 
                deleteCatFromItem={deleteCatFromItem} 
                getFilter={getFilter}
                filter={filter}/>
            <ItemList 
                items={filteredItems} 
                onAdd={onAdd} 
                onTitleChange={onTitleChange} 
                amount={amount}
                takeItems={takeItems}
                onTools={onTools}
                deleteItem={deleteItem}
                pause={pause}
                categoriesList={categories}
                onCategorieAdd={onCategorieAdd}
                deleteCatFromItem={deleteCatFromItem}/>
        </div>
    )
}

export default ItemsTab;

// const QuickMenu = ({itemsTitles, onTools}) => {

//     const [showMenu, setShowMenu] = useState(false);

//     const titleElems = itemsTitles.map(({title, id, activePause}, i) => {
//         return  <li key={id} className='quick_menu_list_item'>
//                     <button className='quick_menu_list_item_title'>{title}</button>
//                     <button className='quick_menu_list_item_plus plus' data-take-plus disabled={activePause}
//                         onClick={(e) => onTools(e, id)}>
//                         +
//                     </button>
//                 </li>
//     });
//     return (
//         <div className="quick_menu">
//             <BurgerSVG clazz='quick_burger' f={() => setShowMenu(b => !b)}/>
//             {/* <img src={Burger} alt="Menu" className='quick_burger' onClick={() => setShowMenu(b => !b)}/> */}
//             {showMenu ? 
//                 <ul className='quick_menu_list'>
//                     {titleElems}
//                 </ul>
//                 : null}
//         </div>
//     )
// }