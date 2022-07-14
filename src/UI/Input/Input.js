
const Input = (props) => {
  const {label, isValid, isTouched,errorMessage,className:inputClassName,...inputProps} = props;
  //console.log(label);
  const getErrorClass = () =>{
    if (isTouched) {
      if (isValid) {
        return "is-valid";
      } else {
        return "is-invalid";
      }
    } else {
      return "";
    } 
    
  }
   
    
  return (
    <div className={`form-group mb-3`}>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        {...inputProps}

        className={`${inputClassName} ${getErrorClass()}`}

       
       
      />
       <div className="invalid-feedback">{errorMessage} </div>
    </div>
  );
};

export default Input;
