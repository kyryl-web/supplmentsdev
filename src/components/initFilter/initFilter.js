
import './initFilter.css';

const InitFilter = ({initFilter, getInitFilter}) => {

    const filterElemNames = ["Все", "активные", "перерыв"];
    const filterElemNamesEng = ['all', 'active', 'pause'];

    const elems = filterElemNames.map((item, i) => {
        const clazz = initFilter === filterElemNamesEng[i] ? 'init_filter_item active' : 'init_filter_item';
        return <li key={i} className={clazz} onClick={() => getInitFilter(filterElemNamesEng[i])}>
                    <button>{item}</button>
                </li>
    });
    return (
        <ul className="init_filter_list">
            {elems}
        </ul>
    )
}

export default InitFilter;