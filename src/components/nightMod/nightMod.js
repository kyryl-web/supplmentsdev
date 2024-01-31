import './nightMod.css';

const NightMod = ({checked, getChecked}) => {

    return (
        <div className="mode_wrapper">
            <span>Тёмный режим</span>
            <input type="checkbox" checked={checked} onChange={(e) => getChecked(e)}/>
        </div>
    )
}

export default NightMod;