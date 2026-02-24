import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token){
        return res.status(401).json({message: "Access Denailed"});
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded.email;
        next();
    }
    catch(err){
         return res.status(403).json({message: "Access Invalid"});
        
     }
}