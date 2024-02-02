import { useState } from "react"

const WaitSuppList = () => {
    const [waitList, setWaitList] = useState([JSON.parse(localStorage.getItem('waitList'))]);

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

    console.log(waitList)

    localStorage.setItem('waitList', JSON.stringify(t));
    return (
        <div className="wait_list">

        </div>
    )
}

export default WaitSuppList;