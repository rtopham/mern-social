import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'
/*
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });


  });
*/

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {useCreateIndex:true, useNewUrlParser: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
  })