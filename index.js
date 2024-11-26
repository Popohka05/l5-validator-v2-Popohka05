class EmailValidator {
    constructor() {
      this.minLength = null;
      this.maxLength = null;
    }
  
    setEmailLengthConstraint(minLength, maxLength = null) {
      this.minLength = minLength;
      this.maxLength = maxLength;
      return this;
    }
  
    isValid(email) {
      if (typeof email !== 'string' || !email.includes('@')) {
        return false;
      }
  
      const [localPart, domainPart] = email.split('@');
      if (!localPart || !domainPart) {
        return false;
      }
  
      const localPartLength = localPart.length;
      if (this.minLength !== null && localPartLength < this.minLength) {
        return false;
      }
      if (this.maxLength !== null && localPartLength > this.maxLength) {
        return false;
      }
  
      return true;
    }
  }
  
  class AgeValidator {
    constructor() {
      this.checkAdult = false; 
    }
  
    
    isAdult() {
      this.checkAdult = true;
      return this;
    }
  
 
    isValid(age) {
      if (typeof age !== 'number' || isNaN(age)) {
        return false;
      }
  
     
      if (this.checkAdult && age < 18) {
        return false;
      }
  
      return true;
    }
  }
  
  class UserValidator {
    constructor() {
      this.shapeSchema = {};
    }
  

    shape(schema) {
      this.shapeSchema = schema;
      return this;
    }
  
    isValid(userData) {
      if (typeof userData !== 'object' || userData === null) {
        return false;
      }
  

      for (const key in this.shapeSchema) {
        const validator = this.shapeSchema[key];
        if (!validator.isValid(userData[key])) {
          return false;
        }
      }
  
      return true;
    }
  }
  
  class Validator {

    email() {
      return new EmailValidator();
    }
  

    age() {
      return new AgeValidator();
    }
  

    user() {
      return new UserValidator();
    }
  }
  
  
  export default Validator;