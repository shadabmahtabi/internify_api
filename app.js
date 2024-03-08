const express = require('express');
const app = express();
require('dotenv').config()
const indexRouter = require('./Routes/student')
const resumeRouter = require('./Routes/resume')
const employeeRouter = require('./Routes/employee')
const internJobRouter = require('./Routes/internJob')

// db Connection
require('./models/database').connectDatabase()

// logger
/*
    'morgan' is used for showing the route which is hit by our actions.
    'tiny' - for small message and 'short' for more message
 */
const logger = require('morgan');
app.use(logger('tiny'))

// bodyparser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// session and cookie
const session = require('express-session')
const cookieparser = require('cookie-parser')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser())

// express-fileupload
const fileupload = require('express-fileupload')
app.use(fileupload())

// for routing
app.use('/', indexRouter)
app.use('/resume', resumeRouter)
app.use('/employee', employeeRouter)
app.use('/internjob', internJobRouter)


// Error Handling
const ErrorHandler = require('./utils/ErrorHandler');
const { generatedErrors } = require('./middlewares/Error');

app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found '${req.url}'`, 404))
})
app.use(generatedErrors)



// specifying port
app.listen(
    process.env.PORT,
    console.log(`Server is running on PORT ${process.env.PORT}`)
)