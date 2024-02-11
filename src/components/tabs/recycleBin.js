import { useState } from 'react';
import Menu from './menu';
import DotsSVG from '../svgImages/dotsSVG';

import './recycleBin.css';
import DeleteSVG from '../svgImages/deleteSVG';


const RecycleBin = ({items, onRecycleDelete, onAdd}) => {
    const [showMenu, setShowMenu] = useState(false);

    const elements = items.map((item, i) => {
        return  <RecycleBinItem key={item.id}
                                {...item}
                                onRecycleDelete={onRecycleDelete}
                                onAdd={onAdd}/>
    })
    console.log(showMenu)
    return (
        <div className="recycle">
            <div className='delete_all'>
                <DeleteSVG clazz='recycle_bin_delete_all' f={() => {
                                                                    setShowMenu(b => !b);
                                                                    }}
                />
                {showMenu ? 
                    <Menu 
                        setShowMenu={setShowMenu}
                        buttons={['Удалить все']}
                        f={[() => {
                            onRecycleDelete('all');
                        }]}
                    /> 
                    : null
                }
            </div>
            <ul className="recycle_list">
                {elements}
            </ul>
        </div>
    )
}

const RecycleBinItem = ({pauseDays, title, take, id, onRecycleDelete, onAdd}) => {
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
                                onRecycleDelete(id);
                            }, () => onRecycleDelete(id)]}/>
                : null}
            </li>
}


export default RecycleBin;
