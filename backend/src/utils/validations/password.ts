import PasswordValidator from "password-validator"
const schema = new PasswordValidator();

schema
  .is().min(8)                                    // Minimum length 8
  .is().max(25)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 1 digit
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Password123', 'Admin123']); // Blacklist weak passwords


export function isStrong(password:string){
    const isValid = schema.validate(password)
    return isValid
}
