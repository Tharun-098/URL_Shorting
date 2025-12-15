import rateLimit from "express-rate-limit";

export const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message: {
    success: false,
    message: "Too many requests, please try again later",
  }
})

export const linkLimiter=rateLimit({
    windowMs:1*60*1000,
    max:10,
    message:{
        success:false,
        message:"Too many link redirection requests from this IP,please try again later"
    }
})