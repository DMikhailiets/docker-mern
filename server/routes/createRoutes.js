const {Router} = require('express')
const Note = require('../models/note')

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:7011/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const createRoutes = (app) => {
  app.use(cors())
  app.post('/api/note/', cors(corsOptions), async (req, res) => {
    const text = req.body.text
    const note = new Note({ text })
    await note.save()
  
    res.status(201).json({ note })
  })
  
  app.get('/api/note/',  cors(corsOptions), async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
  })

}

module.exports = createRoutes