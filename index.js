const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.static('/'))
app.use(bodyParser.json())
const port = 8080

app.get('/', (req, res) => {
  console.log('get /')
  res.send('hi there')
})

app.put('/vehicledata', (req, res) => {
  console.log('got request')
  data = req.body
  console.log(req.body)
  fs.appendFile(`/vehicledata/${req.body.vin}.json`, JSON.stringify(req.body.results), err => {
    if (err) console.error(err)
  })
  res.send('posted')
})

app.put('/tooldata', (req, res) => {
  console.log('got request')
  data = req.body
  console.log(req.body)
  fs.appendFile(`/tooldata/${req.body.vin}.json`, JSON.stringify(req.body.results), err => {
    if (err) console.error(err)
  })
  res.send('posted')
})

app.get('/vehicledata', (req, res) => {
  console.log('vehicle list requested')
  let out = []
  fs.readdir('/opt/chris/dev/resultsServer/vehicledata', (err, files) => {
    if (err) {
      console.error(err)
      res.status(404).send('Not Found')
      return
    }
    files.forEach(file => out.push(file.toString()))
    res.send(out.join('\n'))
  })
})

app.get('/tooldata', (req, res) => {
  console.log('tool list requested')
  let out = []
  fs.readdir('/opt/chris/dev/resultsServer/tooldata', (err, files) => {
    if (err) {
      console.error(err)
      res.status(404).send('Not Found')
      return
    }
    files.forEach(file => out.push(file.toString()))
    res.send(out.join('\n'))
  })
})

app.get('/vehicledata/*', (req, res) => {
  console.log('specific data req')
  res.sendFile(`/opt/chris/dev/resultsServer${req.path}`)
})

app.get('/tooldata/*', (req, res) => {
  res.sendFile(`/opt/chris/dev/resultsServer${req.path}`)
})

app.listen(port, () => console.log('listening'))
