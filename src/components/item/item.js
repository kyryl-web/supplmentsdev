import { useState, useEffect, useRef } from "react";
import Bar from '../bar/bar';
import Options from "../categories/options";

import './item.css';

import DeleteSVG from "../svgImages/deleteSVG";
import PlusSVG from "../svgImages/plusSVG";
import DotsSVG from "../svgImages/dotsSVG";
import ArrowDownSVG from "../svgImages/arrowDownSVG";
import AcceptSVG from "../svgImages/acceptSVG";
import Menu from "../menu/menu";


// categoriesList - категроии из компонента категорий
// categories - категории айтема
const Item = ({title, shortTitle, categories, pauseDate, lastTakeDate, pauseDays, takeList, activePause, onTitleChange, onTools, 
                deleteItem, pause, categoriesList, onCategorieAdd, deleteCatFromItem, id, itemsTitles}) => {
    const [term, setTerm] = useState(title);
    const [showBar, setShowBar] = useState(false);
    const [disable, setDisable] = useState(activePause);
    const [chooseActive, setChooseActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showAccept, setShowAccept] = useState(false);
    const [shortInput, setShortInput] = useState(title === shortTitle ? false : true);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [lastTakeClass, setLastTakeClass] = useState('');

    const ref = useRef();
    let counter = useRef(0);

    useEffect(() => {
        if (title === '') {
            ref.current.focus();
        }

        if (activePause && counter.current < 1) {
            pause('item', id);
            counter.current++;
        }
    }, [])

    useEffect(() => {
        // если текущее число отличается от числа последнего приема, то надпись с датой последнего приема становится красной
        // - сравниваем день: 
        //   - он должен быть не равен текущему
        // (d.getHours() >= 0 && d.getHours() <= 5)
        
        if (lastTakeDate) {
            const d = new Date();
            const lastTakeHour = Number(lastTakeDate.split('T')[1].slice(0, 2));
            // console.log(d.getHours())
            if (Number(lastTakeDate.slice(0, 2)) !== d.getDate() || (lastTakeHour >= 0 && lastTakeHour <= 6)) {
                setLastTakeClass('not_take');
            }
            else setLastTakeClass('');
        }
    }, [lastTakeDate])
    
    const takeNum = sum(takeList, 1);
    const passNum = sum(takeList, -1);

    function sum (arr, n) {
        let sum = 0;
        arr.forEach(num => num === n ? sum++ : null);
        return sum;
    }

    function onTitle(e) {
        const term = e.target.value;
        setTerm(term);
        onTitleChange(term, id);
    }

    function shortInputFocus(e) {
        setShortInput(false);
    }
    
    function blurTitle() {
        for (let i = 0; i < itemsTitles.length; i++) {
            
        }
        setShortInput(title !== shortTitle);
    }

    function disableButtons(b) {
        setDisable(b)
    }
    
    const itemCategoriesList = categories.map(({name, id}) => {
        return <li className="categories_elem" key={id}><button>{name}</button></li>
    })

    function renderChooseList() {
        return <CategoriesListToChoose 
                    categories={categoriesList} 
                    onCategorieAdd={onCategorieAdd} 
                    itemId={id}
                    setChooseActive={setChooseActive}/>
    }

    const moreArrowClass = showBar ? 'more_arrow active' : 'more_arrow';
    return (
        <li className="item">
            <div className="delete_item">
                <DeleteSVG clazz='delete' f={() => setDeleteMenu(b => !b)}/>
                {deleteMenu ? 
                    <Menu 
                            setShowMenu={setDeleteMenu}
                            buttons={['В архив', 'В корзину']}
                            f={[
                                () => deleteItem(id, 'archive'),
                                () => deleteItem(id, 'recycle')
                            ]}
                    />
                    : null
                }
                
            </div>
            {activePause ?  <p className="pause_info">Перерыв</p> : lastTakeDate ? 
                            <p className={'pause_info ' + lastTakeClass}>{lastTakeDate.split('T')[0]}<br/>{lastTakeDate.split('T')[1]}</p> 
            : null}
            {shortInput ? 
                <input  className="item_title short" placeholder="Введите название" 
                        value={shortTitle} onFocus={(e) => shortInputFocus(e)}/>
            :
                <input  ref={ref} className="item_title" placeholder="Введите название" 
                        value={term} onChange={(e) => onTitle(e)} onBlur={(e) => blurTitle(e)}/>
            }
            
            <ul className="item_categories">
                {chooseActive ? renderChooseList() : null}
                {itemCategoriesList.length ? 
                    <>{itemCategoriesList} 
                    </> : <div className="add_item_cat_tools" onClick={() => setChooseActive(true)}>
                    <button className="add_item_category">Добавить категорию</button>
                    <PlusSVG clazz='add_item_category_plus'/>
                    </div>
                }
            </ul>

            {itemCategoriesList.length ?
                <div className="add_item_category_tools">
                    <PlusSVG clazz='add_item_category_plus' f={() => setChooseActive(true)}/>
                    <DotsSVG clazz='add_item_category_dots' f={() => setShowOptions(b => !b)}/>            
                    {showOptions ? <Options categories={categories} setShowOptions={setShowOptions} deleteCat={deleteCatFromItem} itemId={id}/> : null}
                </div>
                
            : null}

            <div className="item_counter">
                <div className="item_counter-take">
                    <div className="item_counter-take_title">Прием</div>
                    <div className="item_counter-take_tools">
                        <button className="minus" disabled={disable} onClick={(e) => onTools(e, id)} data-take-minus>-</button>
                        <div className="item_counter-take_num">{takeNum}</div> 
                        <button className="plus" disabled={disable} onClick={(e) => onTools(e, id)} data-take-plus>+</button>
                    </div>     
                </div>
                <div className="item_counter-take">
                    <div className="item_counter-take_title">Пропуск</div>
                    <div className="item_counter-take_tools">
                        <button className="minus" disabled={disable} onClick={(e) => onTools(e, id)} data-pass-minus>-</button>
                        <div className="item_counter-take_num">{passNum}</div> 
                        <button className="plus" disabled={disable} onClick={(e) => onTools(e, id)} data-pass-plus>+</button>
                    </div>     
                </div>
            </div>
            <div className="more" onClick={() => setShowBar(f => !f)}>
                <ArrowDownSVG clazz={moreArrowClass}/>   
            </div>

            {showBar ? <Bar barList={takeList} 
                        pause={(e) => pause(e, id)} 
                        pauseDate={pauseDate} 
                        disableButtons={disableButtons} 
                        activePause={activePause}
                        pauseDays={pauseDays}/> : null}
        </li>
    )
}

const CategoriesListToChoose = ({categories, onCategorieAdd, itemId, setChooseActive}) => {
    const elements = categories.map(({name, id}) => {
        return <li key={id} onClick={() => {
            onCategorieAdd(name, id, itemId);
            setChooseActive(false);
        }}><button>{name}</button></li>
    })
    return (
        <>
            <ul className="choose_list">
                {elements.length ? elements : "Категорий нет"}
                <PlusSVG clazz='close' f={() => setChooseActive(false)}/>
            </ul>
        </>
    )
}

export default Item;
