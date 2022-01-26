//Do not git add until private info hidden

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors()) // NB This must always be above any routing //

app.use('/posts', postRoutes)

//https;//mongodb.com/cloud/atlas

const CONNECTION_URL =
  'mongodb+srv://john:<<PASSWORD>>@cluster0.kadki.mongodb.net/MERN-stack-practice?retryWrites=true&w=majority' //need to change MyFirstDatabase <dbname>?
// will move this later
// Password changed - will retype once moved

const PORT = process.env.PORT || 5000

mongoose
  .connect(
    CONNECTION_URL,
    // useNewUrlParser: true,   <-- Deprecated, Mongoose 6 always assumes that these are true
    // useUnifiedTopolgy: true,
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
  )
  .catch((error) => console.log(error))

// mongoose.set('useFindAndModify', false) <--From tutorial video, deprecated now, no longer needed, Mongoose 6 always assumes that it is false.
