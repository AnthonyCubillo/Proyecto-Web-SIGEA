import SingleColor from "./SingleColor";

const DisplayColors = ({ list,handleColor }) => {
    return ( 
        <div className="colors-box">
            {
                list.map((color, index) => (
                    <SingleColor key={index} hexColor={color.hex} handleColor={handleColor}/>
                ))
            }
        </div>
    );
}
 
export default DisplayColors;