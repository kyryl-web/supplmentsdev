

const DotsSVG = ({clazz, f}) => {

    const imgClass = 'dots_svg ' + clazz;
    return (
        <svg    width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" 
                fill="#000000" className={imgClass} onClick={f}>
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
    )
}

export default DotsSVG;