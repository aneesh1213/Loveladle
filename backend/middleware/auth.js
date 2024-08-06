import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3t';

export default function UserAuth(req, res, next){
    
    const authheader = req.headers.authorization;
    console.log(authheader)
    if(authheader){
        const token = authheader.split(' ')[1];
        console.log(token)
        jwt.verify(token, SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}
