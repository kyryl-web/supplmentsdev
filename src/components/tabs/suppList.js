import { useState } from "react";
import DeleteSVG from "../svgImages/deleteSVG";
import PlusSVG from "../svgImages/plusSVG";
import DotsSVG from "../svgImages/dotsSVG";

import './suppList.css';
import { wait } from "@testing-library/user-event/dist/utils";


const WaitSuppList = ({waitList, onWaitAdd, onWaitTitleChange, addAmountToWaitItem}) => {
    
    const t = [
        {title: 'D-3', amount: 2,  id: 1},
        {title: 'Zinc', amount: 1, id: 2},
        {title: 'Gaba', amount: 1, id: 3},
        {title: 'Glycine', amount: 1, id: 4},
        {title: 'L-Tyrosyne', amount: 1, id: 5},
        {title: 'L-Lysine', amount: 1, id: 6},
        {title: 'Dopa Mucuna', amount: 2, id: 7},
        {title: 'Ginkgo Biloba', amount: 2, id: 8},
        {title: 'Sun. Lecithin', amount: 2, id: 9},
        {title: 'Kelp', amount: 1, id: 10},
        {title: 'TestoJack', amount: 1, id: 11},
        {title: 'Ashwagandha', amount: 1, id: 12},
        {title: 'Iron', amount: 1, id: 13},
        {title: 'Boron', amount: 1, id: 14},
        {title: 'Maca', amount: 1, id: 15},
        {title: 'Taurine', amount: 1, id: 16},
        {title: 'Probiotic 40b', amount: 1, id: 17},
        {title: 'Vitamin C', amount: 1, id: 18},
        {title: 'Magnesium Citrate', amount: 1, id: 19},
        {title: 'Gamma E Complex', amount: 1, id: 20},
        {title: 'Creatine', amount: 1, id: 21},
    ]

    const elements = waitList.map(({title, amount, id}) => {
        return  <WaitItem 
                            key={id}
                            title={title}
                            amount={amount}
                            id={id}
                            onWaitTitleChange={onWaitTitleChange}
                            addAmountToWaitItem={addAmountToWaitItem}/>
    })

    // localStorage.setItem('waitList', JSON.stringify(t));

    return (
        <div className="wait">
            <ul className="wait_list">
                {elements}
            </ul>
            <PlusSVG clazz='add_img' f={() => onWaitAdd()}/>
        </div>
    )
}

const WaitItem =({onWaitTitleChange, id, amount, title, addAmountToWaitItem}) => {

    const [term, setTerm] = useState(title);

    function onTitleChange(e, id) {
        const term = e.target.value;
        setTerm(term);
        onWaitTitleChange(term, id)
    }

    return  <li key={id} className="wait_list_item">
                <div className="wait_list_item_inner">
                    <input className="wait_list_item_title" value={term} placeholder="Введите название" onChange={(e) => onTitleChange(e, id)}/>
                    <div className="wait_item_amount">
                        <button className="minus" data-amount-minus onClick={(e) => addAmountToWaitItem(e, id)}>-</button>
                        <div className="item_counter-take_num">{amount}</div> 
                        <button className="plus" data-amount-plus onClick={(e) => addAmountToWaitItem(e, id)}>+</button>
                    </div>
                    <DotsSVG clazz='wait_item_dots'/>
                </div>
            </li>
}

export default WaitSuppList;