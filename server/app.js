const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@identity.8lprpne.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connection.on('connected', () => {
    console.log('mongoDB Connected');
});

const UserRouter = require('./api/routers/user.router')
const SubjectRouter = require('./api/routers/subject.router')
const DifficultytRouter = require('./api/routers/difficulty.router')
const RiddleRouter = require('./api/routers/riddle.router')
const AgeRouter = require('./api/routers/age.router')

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Accept,Authorization");
//     if (req.method == "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
//         return res.status(200).json({});
//     }
//     next();
// });

app.use('/user', UserRouter);
app.use('/subject',SubjectRouter );
app.use('/difficulty',DifficultytRouter );
app.use('/riddle',RiddleRouter );
app.use('/age',AgeRouter );
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "shirati"
//     })
// });
// app.use((req, res, next) => {
//     const error = new Error('not found');
//     error.status = 404;
//     next(error)
// })
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//         error: { message: err.message }
//     })
// })
module.exports = app;