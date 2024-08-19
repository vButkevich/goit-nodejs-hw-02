import bcrypt from 'bcrypt';

export const getEncryptedPassword = async(password)=>{
    const encryptedPassword = await bcrypt.hash(password, 10);
return encryptedPassword;
};


export const comparePasswords = async (current,origin)=>{
   const isPasswordCorrect  = await bcrypt.compare(current, origin);
return isPasswordCorrect;
};
