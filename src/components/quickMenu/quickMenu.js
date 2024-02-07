import { useState } from 'react';

import './quickMenu.css';

import BurgerSVG from '../svgImages/burgerSVG';


const QuickMenu = ({getActiveTab, activeTab}) => {

    const [showMenu, setShowMenu] = useState(false);

    const burgerItems = [
        {name: 'items', text: 'Счетчик приема'},
        {name: 'wait', text: 'Список ожидания'},
    ];

    const elements = burgerItems.map(({name, text}, i) => {
        const clazz = activeTab === name ? 'quick_menu_list_item active' : 'quick_menu_list_item';
        return <li key={i} className={clazz} onClick={() => {
            getActiveTab(name);
            setShowMenu(b => !b);
        }}><button>{text}</button></li>
    })
    return (
        <div className="quick_menu">
            <BurgerSVG clazz='quick_burger' f={() => setShowMenu(b => !b)}/>
            {showMenu ? 
                <ul className='quick_menu_list'>
                    {elements}
                </ul>
                : null}
        </div>
    )
}

export default QuickMenu;