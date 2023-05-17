import { useState } from "react";
import Values from "values.js";

const FormColor = ({ setList, colors }) => {
    const [color, setColor] = useState(colors);
    const [error, setError] = useState(false);

    const handleGenerator = e => {
        e.preventDefault();
        try {
            let colors = new Values(color).all(5);
            setList(colors);
            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    return ( 
        <div className="form-color">
    
            <form onSubmit={ handleGenerator }>
                <input type="text" placeholder="Color en inglés" onChange={e => setColor(e.target.value)} />
                <input type="submit" value="Generar" />
            </form>
            { error ? <p className="error">No existe este color...</p> :null }
        </div>
    );
}
 
export default FormColor;