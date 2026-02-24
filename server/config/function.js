import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export const generateAccessToken = (user) => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
}

export const generateRefreashToken = (user) => {
    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_REFREASH_SECRET,
        {expiresI: "24h"}
    )
    return token;
}

// export const setCooky = (user) => {
    
// }