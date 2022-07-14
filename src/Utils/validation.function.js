export const emailValidation = (email) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      if (email.trim().length <= 0) {
        return { status: false, message: "Email is required" };
      } else {
        return { status: false, message: "Email is not valid" };
      }
    }
  };

export const passwordValidation = (password) =>{
    if (!password.trim()) {
      return {status:false,message:"Password required"}
    } else if (password.trim().length < 5) {
      return {status:false,message:"Password should be more than 5 character"};
    }
  
    return true;
  }
  