import { useState, useEffect, useRef } from "react";
import Bar from '../bar/bar';
import Options from "../categories/options";

import './item.css';

import DeleteSVG from "../svgImages/deleteSVG";
import PlusSVG from "../svgImages/plusSVG";
import DotsSVG from "../svgImages/dotsSVG";
import ArrowDownSVG from "../svgImages/arrowDownSVG";


// categoriesList - категроии из компонента категорий
// categories - категории айтема
const Item = ({title, categories, pauseDate, pauseDays, takeList, activePause, onTitleChange, n, onTools, 
                deleteItem, pause, categoriesList, onCategorieAdd, deleteCatFromItem, id}) => {
    const [term, setTerm] = useState(title);
    const [showBar, setShowBar] = useState(false);
    const [disable, setDisable] = useState(activePause);
    const [chooseActive, setCooseActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const ref = useRef();
    let counter = useRef(0);

    useEffect(() => {
        if (term === '') {
            ref.current.placeholder = 'Введите название';
        }
    }, [term])

    useEffect(() => {
        if (title === '') {
            ref.current.focus();
            ref.current.placeholder = 'Введите название';
        }

        if (activePause && counter.current < 1) {
            pause('item', n);
            counter.current++;
        }
    }, [])

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
    
    function blurTitle() {
        // ref.current.readOnly = true;
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
                    n={n}
                    setCooseActive={setCooseActive}/>
    }

    const moreArrowClass = showBar ? 'more_arrow active' : 'more_arrow';

    return (
        <li className="item">
            {/* <img className="delete" src={Delete} alt="Delete" onClick={() => {deleteItem(n)}}/> */}
            <DeleteSVG clazz='delete' f={() => {deleteItem(n)}}/>
            {activePause ? <p className="pause_info">Перерыв</p> : null}
            <input ref={ref} className="item_title"  value={term} onChange={(e) => onTitle(e)} onBlur={() => blurTitle()}/>
            <ul className="item_categories">
                {chooseActive ? renderChooseList() : null}
                {itemCategoriesList.length ? 
                    <>{itemCategoriesList} 
                    </> : <div className="add_item_cat_tools" onClick={() => setCooseActive(true)}>
                    <button className="add_item_category">Добавить категорию</button>
                    <PlusSVG clazz='add_item_category_plus'/>
                    {/* <img src={Plus} alt="Add" className="add_item_category_plus"/>  */}
                    </div>
                }
            </ul>

            {itemCategoriesList.length ?
                <div className="add_item_category_tools">
                    <PlusSVG clazz='add_item_category_plus' f={() => setCooseActive(true)}/>
                    <DotsSVG clazz='add_item_category_dots' f={() => setShowOptions(b => !b)}/>            
                    {showOptions ? <Options categories={categories} setShowOptions={setShowOptions} deleteCat={deleteCatFromItem} n={n}/> : null}
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
                {/* <img src={ArrowDown} alt="More Info" className={moreArrowClass}/> */}
            </div>

            {showBar ? <Bar barList={takeList} 
                        pause={(e) => pause(e, n)} 
                        pauseDate={pauseDate} 
                        disableButtons={disableButtons} 
                        activePause={activePause}
                        pauseDays={pauseDays}/> : null}
        </li>
    )
}

const CategoriesListToChoose = ({categories, onCategorieAdd, n, setCooseActive}) => {
    const elements = categories.map(({name, id}) => {
        return <li key={id} onClick={() => {
            onCategorieAdd(name, id, n);
            setCooseActive(false);
        }}><button>{name}</button></li>
    })
    return (
        <>
            <ul className="choose_list">
                {elements.length ? elements : "Категорий нет"}
                <PlusSVG clazz='close' f={() => setCooseActive(false)}/>
            </ul>
        </>
    )
}

export default Item;
