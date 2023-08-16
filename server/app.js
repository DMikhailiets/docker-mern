const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/note.routes')
const cors = require('cors')

let corsOptions = {
  origin: 'http://localhost:7011',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
const port = process.env.PORT ?? 5000

app.use(express.json({ extended: true }))
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// }) 
app.use(cors())
app.use('/api/note', cors(corsOptions), routes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    const {
      MONGO_INITDB_ROOT_USERNAME: username,
      MONGO_INITDB_ROOT_PASSWORD: pass,
      MONGO_HOST: host
    } = process.env
    const uri = `mongodb://${username}:${pass}@${host}/notes?authSource=admin`
    await mongoose.connect(uri, { // второй mongodb название контейнера
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(
      port,
      console.log.bind(console, `Server has been started on port ${port}`)
    )
  } catch (e) {
    console.log(e)
  }
}

start()




