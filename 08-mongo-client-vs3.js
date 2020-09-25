const mongoClient = require('mongodb').MongoClient

// const url = 'mongodb://localhost:27017/nodedemos'
const url = 'mongodb+srv://Testiuser:2AFPV3yJMuD6sG5t@cluster0.msw6h.mongodb.net/web_palvelut?retryWrites=true&w=majority'

function queryMongo(searchCriteria, sortCriteria, callbackShow) {

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

      collection.find(searchCriteria).sort( sortCriteria ).toArray(
        (err, result, showResult) => {
          console.log("searchCriteria was: " + JSON.stringify(searchCriteria))
          
          if (err) {
            console.log(err)
          } 
          else if (result.length) {
            //console.log('Found from mongodb:', result)
            callbackShow(result)
          } 
          else {
            console.log('No document(s) found with defined "find" criteria!')
          }
          console.log()
          db.close()
        }
      )
    }
  }
  )

}

const showResult = function (data) {
  data.forEach(function(device) {
    console.log(device.device + ", " + device.manufacturer + ", " + device.purchaseDate + ", " + device.price)
  })
}

queryMongo({},{}, showResult)
queryMongo({ "price": { $lt: 30 }}, { "price": 1 }, showResult)
queryMongo({ "price": { $gt: 50 }}, { "price": -1 }, showResult)
