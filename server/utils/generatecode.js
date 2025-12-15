const generateRandomCode=()=>{
    const codevalues =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result="";
        for (let i = 0; i < 6; i++) {
        const codeIndex = Math.floor(Math.random() * codevalues.length);
        result = result + codevalues.charAt(codeIndex);
      }
      return result;
}

export default generateRandomCode;