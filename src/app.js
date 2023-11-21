import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()

// allowing my cors from this origin
// Cors module having further options to set available on the documentation at https://www.npmjs.com/package/cors .
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Sometimes we accept the data from the FE as json. For eg:- After filling a form at UI, data send to BE in Json.
// Setting limit to 16kb of accepting json from UI.
app.use(express.json({limit: '16kb'}))

// As you can see in url special character is changed to ASCII character for eg:- @ is %40, space is + in url. By set this middleware we allowing our application to understand a encoded url.
app.use(express.urlencoded({extended: true , limit: '16kb'}))

/* Cookie Parser parses the incoming cookies from request to JSON value.

Whereas cookie-session or express-session is to maintain session on your server.

When your frontend sends a request, if cookies are set up, it will send some cookies based on usage, which by default are hard to interpret by server, so here cookie parser will parse those for easy understand ability. Which in turn could be used to create/maintain sessions or Authenticate (Depends upon cookie usage).
*/

app.use(cookieParser())

export {app}