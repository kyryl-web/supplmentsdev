import { useState } from 'react';

import './quickMenu.css';

import BurgerSVG from '../svgImages/burgerSVG';
import Burger from '../../img/burger.svg';

const QuickMenu = ({itemsTitles, onTools}) => {

    const [showMenu, setShowMenu] = useState(false);

    const titleElems = itemsTitles.map(({title, id, activePause}, i) => {
        return  <li key={id} className='quick_menu_list_item'>
                    <button className='quick_menu_list_item_title'>{title}</button>
                    <button className='quick_menu_list_item_plus plus' data-take-plus disabled={activePause}
                        onClick={(e) => onTools(e, id)}>
                        +
                    </button>
                </li>
    });
    return (
        <div className="quick_menu">
            <BurgerSVG clazz='quick_burger' f={() => setShowMenu(b => !b)}/>
            {/* <img src={Burger} alt="Menu" className='quick_burger' onClick={() => setShowMenu(b => !b)}/> */}
            {showMenu ? 
                <ul className='quick_menu_list'>
                    {titleElems}
                </ul>
                : null}
        </div>
    )
}

export default QuickMenu;