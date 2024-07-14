export const Navbar = ({handleClick}) => {
    return (
        <>
            <div className="navbar">
                <button className="link_button" style={{color: 'white'}} onClick={()=>handleClick("compare_ways")}>Comparer deux chemins</button>
                <button className="link_button" style={{color: 'white'}} onClick={()=>handleClick("average_missions")}>Moyenne des missions</button>
            </div>
        </>
    )
}