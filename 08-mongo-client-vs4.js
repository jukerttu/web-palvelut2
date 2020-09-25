// Previous examples has been using the callback syntax. 
// mongodb supports promises (and also async/await) as well.
// Using promise syntax (then/catch)

const mongoClient = require('mongodb').MongoClient

// const url = 'mongodb://localhost:27017/nodedemos'
const url = 'mongodb+srv://Testiuser:2AFPV3yJMuD6sG5t@cluster0.msw6h.mongodb.net/web_palvelut?retryWrites=true&w=majority'

mongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
(err, db) => {
  if (err) {
    console.log('ERROR:', err)
  } 
  else {
    console.log('CONNECTED: ', url)

    const demoDb = db.db('nodedemos')

    const collection = demoDb.collection('devices')

    // Update data in the database
    collection.updateOne({device: "Webcam"}, 
      {'$set': {purchaseDate:"02.11.2019", price:43, manufacturer: 'HP'}}) 
      .then(item => {
        console.log(item)
      })
      .catch(err => {
        console.log(err)
      })

    collection.findOne({device: "Webcam"}) 
    .then(result => {
      console.log(result)
      printResult(result)
    })
    .catch(err => {
      console.log(err)
    })

    db.close()
  }
}
)

const printResult = (device) => {
    console.log(device.device + ", " + device.manufacturer + ", " + device.purchaseDate + ", " + device.price)
}