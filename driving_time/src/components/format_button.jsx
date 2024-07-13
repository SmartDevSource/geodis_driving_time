export const FormatButton = ({first, second, handleFormatedFirst, handleFormatedSecond}) => {

    const handleClick = () => {
        if (first){
            const first_copy = first.split('\n').map(element=>{
                if (checkFormat(element)){
                    const splitted = element.split('-')
                    return `${splitted[0]}-${splitted[1]}-${splitted[2][0]}00`
                } else {
                    return element
                }
            })
            handleFormatedFirst(first_copy.join('\n'))
        }
        if (second){
            const second_copy = second.split('\n').map(element=>{
                if (checkFormat(element)){
                    const splitted = element.split('-')
                    return `${splitted[0]}-${splitted[1]}-${splitted[2][0]}00`
                } else {
                    return element
                }
            })
            handleFormatedSecond(second_copy.join('\n'))
        }
    }

    const checkFormat = element => /^E\d{2}-\d{2}-[A-Z]\d{2}$/.test(element)

    return (
        <>
            <button className="stylized_button" onClick={handleClick}>
                Formater en 00
            </button>
            <p></p>
        </>
    )
}