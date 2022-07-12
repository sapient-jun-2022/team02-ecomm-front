import { useState } from "react";

const Input = (props) => {
    const [error,setError] = useState('');
    
  return (
    <div className="form-group mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        {...props}
       
      />
       <div className="invalid-feedback">Error message </div>
    </div>
  );
};

export default Input;
