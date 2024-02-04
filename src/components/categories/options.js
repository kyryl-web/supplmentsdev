
import DeleteSVG from '../svgImages/deleteSVG';
import PlusSVG from '../svgImages/plusSVG';

import './options.css';

const Options = ({categories, setShowOptions, deleteCat, n}) => {

    const elements = categories.map(({name, id}) => {
        return <li key={id} className="option_cat" onClick={() => setShowOptions(false)}>
                    <button>{name}</button>
                    
                        <DeleteSVG clazz='delete_img' f={() => deleteCat(id, n)}/>
                     
                      
                     
                </li>
    })

    return (
        <>
            <ul className="option_list">
                {categories.length ? elements : 'Категорий нет'}
                {categories.length ?    <li key={'RemoveAll'} className="option_cat" onClick={() => {
                                            deleteCat('all', n);
                                            setShowOptions(false);
                                        }}>
                                            <button>Удалить все</button>
                                        </li> : null}
                <PlusSVG clazz='close' f={() => setShowOptions(false)}/>
            </ul>
        </>
    )
}

export default Options;