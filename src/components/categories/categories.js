import { useState, useRef, useEffect } from "react";
import Options from "./options";

import PlusSVG from "../svgImages/plusSVG";
import DotsSVG from "../svgImages/dotsSVG";
import Dots from '../../img/dots.svg';
import './categories.css';

const Categories = ({onCategories,deleteCatFromItem, getFilter, filter}) => {
    const [categories, setCategories] = useState([]);
    const [addActive, setAddActive] = useState(false);
    const [catName, setCatName] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const ref = useRef();
    let counter = useRef(0);

    const onEnterDown = function(e) {
        if (e.key === 'Enter') {
            if (ref.current) ref.current.blur();
        }
    }
    
    useEffect(() => {
        if (addActive) {
            ref.current.focus();
        }

        if (addActive) {
            window.addEventListener('keydown', onEnterDown);
        }

        return () => {
            window.removeEventListener('keydown', onEnterDown);
        };
    }, [addActive]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('categories'))?.length) {
            setCategories(JSON.parse(localStorage.getItem('categories')));
        }
    }, [])

    useEffect(() => {  
        localStorage.setItem('categories', JSON.stringify(categories));
        onCategories(categories);
    }, [categories])

    function addCat() {
        setAddActive(true);
    }

    function catNameChange(e) {
        setCatName(e.target.value);
    }

    function blurCatName(e) {
        if (catName !== '') {
            setCategories(item => {
                return [...item, {name: catName, id: item[item.length - 1]?.id ? item[item.length - 1].id + 1: 1}]
            })
        }
        setCatName('');
        setAddActive(false);
    }

    const elements = categories.map(({name, id}) => {
        const clazz = filter === name ? 'cat cat_active' : 'cat';
        return <li key={id} className={clazz} data-cat={name} onClick={() => getFilter(name)}><button>{name}</button></li>
    })

    function renderInput(ref) {
        return <input   className="add_input" ref={ref} type="text" value={catName} 
                        onChange={(e) => catNameChange(e)} 
                        onBlur={(e) => blurCatName(e)}
                        />
    }

    function deleteCat(id) {
        setCategories(cats => {
            if (id === 'all') {
                return [];
            } else {
                return cats.filter((item) => id !== item.id);
            }  
        });
        deleteCatFromItem(id);
    }

    return (
        <div className="categories">
            {addActive ? renderInput(ref) : null}
            <div className="categories_items">
                <ul className="categories_list">
                    {elements}
                </ul>
                <div className="categories_tools">
                    <PlusSVG clazz="categories_add_img" f={() => addCat()}/>
                    {/* <img src={Plus} alt="Add" onClick={() => addCat()} className="categories_add_img"/> */}
                    {/* <img src={Dots} alt="Options" className="dots" onClick={() => setShowOptions(b => !b)}/> */}
                    <DotsSVG clazz='dots' f={() => setShowOptions(b => !b)}/>
                    {showOptions ? <Options categories={categories} setShowOptions={setShowOptions} deleteCat={deleteCat}/> : null}
                </div>          
            </div>
        </div>
    )
}

export default Categories;