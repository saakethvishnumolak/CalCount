//Function to check for token (middleware)

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next)
{
    //checking if we are really getting the token or not
    if(req.headers.authorization!==undefined)
    {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "calcountapp", (err, data) =>{
            if(!err)
            {
                next();
            }
            else
            {
                res.status(403).send({message: "Invalid Token"});
            }
        })
    }
    else
    {
        res.send({message: "Please send a token!"});
    }
    
}

module.exports = verifyToken;