// import { useState } from 'react';
function Square({ value, onSquareClick }) {
    // const [value, setValue] = useState(null);
    return (
        <button height=" 80px" width=" 80px" className="square"  onClick={onSquareClick}>{value}</button>
    
    )
      
}
export default Square;