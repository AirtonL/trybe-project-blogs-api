const checkedEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    
    if (!(regex.test(email))) {
      return { invalid: true, message: '"email" must be a valid email' };
    }
    return { invalid: false };
  };
  
  const checkedPassword = (password) => {
    if (password.length < 6) {
      return { invalid: true, message: '"password" length must be 6 characters long' };
    }
    return { invalid: false };
  };
  
  const checkedName = (name) => {
    if (name.length < 8) {
      return { invalid: true, message: '"displayName" length must be at least 8 characters long' };
    }
    return { invalid: false };
  };

  const existField = (obj) => {
    const field = Object.keys(obj);
  
    if (!obj[field] && obj[field] !== '') {
      return { isExist: true, message: `"${field}" is required` };
    }
  
    return { isExist: false };
  };

  const checkedAllData = async (user) => {
    try {
      const { email, displayName, password } = user;
      
      const checkeName = checkedName(displayName);
      const checkePassword = checkedPassword(password);
      const checkeEmail = checkedEmail(email);
  
      if (checkeName.invalid) return { message: checkeName.message };
      if (checkeEmail.invalid) return { message: checkeEmail.message };
      if (checkePassword.invalid) return { message: checkePassword.message };
  
      return;
    } catch (error) {
      console.error(error.message);
    }
  };

module.exports = {
    existField,
    checkedAllData,
};