import rateLimit from "express-rate-limit";

const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: false
})

export default authLimit;