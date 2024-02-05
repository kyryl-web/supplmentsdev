import './header.css'

const Header = ({amount, activeTab}) => {

    return (
        <div className="header">
            Количество бадов: {amount[activeTab]}
        </div>
    )
}
export default Header;