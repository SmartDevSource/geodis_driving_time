export const Navbar = ({handleClick}) => {
    return (
        <>
            <div className="navbar">
                <button className="link_button" style={{color: 'white'}} onClick={()=>handleClick("compare_ways")}>COMPARER DEUX CHEMINS</button>
                <button className="link_button" style={{color: 'white'}} onClick={()=>handleClick("average_missions")}>MOYENNE DES MISSIONS</button>
            </div>
        </>
    )
}