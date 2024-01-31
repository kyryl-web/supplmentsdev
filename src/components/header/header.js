import './header.css'

const Header = ({amount}) => {
    
    return (
        <div className="header">
            Количество бадов: {amount}
        </div>
    )
}
export default Header;