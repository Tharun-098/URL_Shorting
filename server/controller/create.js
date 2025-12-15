import link from "../model/link.js";
import generateRandomCode from "../utils/generatecode.js";

const createLink = async (req, res) => {
  try {
    const { originalUrl, code } = req.body;
    if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
      return res
        .status(400)
        .json({ success: false, message: "Original URl is needed" });
    }
    let generatedCode = "";
    if (code) {
      let codeTrimmed = code.trim();
      let codeCorrect = /^[a-zA-Z0-9]{6,8}$/.test(codeTrimmed);
      if (codeCorrect) {
        generatedCode = codeTrimmed;
      }else{
          return res
          .status(400)
          .json({ success: false, message: "code has not in correct pattern" });
      }
    } else {
      let exists = true;
      while (exists) {
        generatedCode = generateRandomCode();
        exists = await link.findOne({ code: generatedCode });
      }
    }
    const linkExists = await link.findOne({ code: generatedCode });
    if (linkExists) {
      return res.status(409).json({
        success: false,
        message: "Custom code or link is already there in database",
      });
    }
    const reservedCodes = [
      "api",
      "admin",
      "stats",
      "health",
      "auth",
      "login",
      "signup",
    ];
    if (reservedCodes.includes(generatedCode.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "This code is reserved",
      });
    }

    const newLink = await link.create({
      url: originalUrl,
      code: generatedCode,
    });
    return res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default createLink;
