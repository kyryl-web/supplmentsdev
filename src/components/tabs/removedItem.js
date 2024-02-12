import { useState } from "react";

import DotsSVG from "../svgImages/dotsSVG";
import Menu from "../menu/menu";

const RemovedItem = ({pauseDays, title, take, id, onRecycleDelete, onAdd, type}) => {
    const [showMenu, setShowMenu] = useState(false);

    const takeAmount = take.filter(num => num === 1).length;
    const passAmount = take.filter(num => num === -1).length;

    return  <li className="recycle_list_item item">
                <div className="recycle_list_item_title">{title}</div>
                <div className='recycle_take'>
                    <div className='recycle_take_item'>
                        <div className='recycle_take_item_title'>Прием</div>
                        <div className='recycle_take_item_num'>{takeAmount}</div>
                    </div>
                    <div className='recycle_take_item'>
                        <div className='recycle_take_item_title'>Пропуск</div>
                        <div className='recycle_take_item_num'>{passAmount}</div>
                    </div>
                    <div className='recycle_take_item'>
                        <div className='recycle_take_item_title'>Перерыв</div>
                        <div className='recycle_take_item_num'>{pauseDays}</div>
                    </div>
                </div>
                <DotsSVG clazz='recycle_dots' f={() => setShowMenu(b => !b)}/>
                {showMenu ? 
                    <Menu
                            setShowMenu={setShowMenu}
                            buttons={['Восстановить', 'Удалить']}
                            f={[() => {
                                onAdd(title, null, take, pauseDays);
                                onRecycleDelete(id, type);
                            }, () => onRecycleDelete(id, type)]}/>
                : null}
            </li>
}

export default RemovedItem;