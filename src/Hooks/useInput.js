import { useState } from "react"

const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this;
        const args = arguments
            clearTimeout(debounceTimer)
                debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
} 


const useInput = (props) =>{
    const [value,setValue] = useState(props?.value || '');
    const [error,setError] = useState(props?.error || '');
    const [istouched, setIsTouched] = useState(props?.istouched || false);
    const isValid = (!!istouched && error.trim().length <= 0)?true:false;

    const validation = debounce((value) =>{
        setError('');
        const validationResponse = props.validation(value);
        if(typeof(validationResponse)==='boolean' && !validationResponse){
            setError('Input is invalid');
        }
        if(typeof(validationResponse)==='object' && !validationResponse.status){
            setError(validationResponse.message);
        }

    },props.validationDebounceTime || 500);

    

    
    
    
    const inputChangeHandler = (value) =>{
         setValue(value);
         
        // const debounceValidation = debounce(props.validation,500);
        // console.log(this);
        // const validationResponse = debounceValidation.apply(this,[value,setError]);
       
        // console.log(validationResponse);
        validation(value);

         setIsTouched(true);

    }
   

   

    

    return {value,error,istouched,inputChangeHandler,isValid};

}
export default useInput;