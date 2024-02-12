import PlusSVG from "../svgImages/plusSVG";

const Menu = ({setShowMenu, buttons, f}) => {

    const elements = buttons.map((button, i) => {
        return  <li key={i} className="wait_dots_menu_item" onClick={() => {
                    f[i]();
                    setShowMenu(b => !b);
                }}>
                    <button>{button}</button>
                </li>
    })
    return  <ul className="wait_dots_menu">
                <PlusSVG clazz='close' f={() => setShowMenu(b => !b)}/>
                {elements}
            </ul>
}

export default Menu;