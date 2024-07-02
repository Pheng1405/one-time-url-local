import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// store in db later
const tokenStore: { [key: string]: boolean } = {};

function checkToken(req: Request, res: Response, next: NextFunction) {
    console.log(tokenStore);
    const token = req.params.token;
    if (tokenStore[token]) {
        return res.status(403).send('This link has already been used.');
    }
    next();
}

// url gen
// use uuid later
app.get('/generate', (req: Request, res: Response) => {
    
    const token = Math.random().toString(36).substr(2);
    tokenStore[token] = false;
    res.send(`Your one-time URL is: http://localhost:${port}/link/${token}`);
});

//open link
app.get('/link/:token', checkToken, (req: Request, res: Response) => {
    const token = req.params.token;
    if (tokenStore[token] === false) {
        tokenStore[token] = true;
        res.send('You are first person who open this link');
    } else {
        res.status(403).send('This link has already been used.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
