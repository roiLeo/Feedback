const express = require('express')
const PORT = process.env.PORT || 4000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/db')
const app = express()

//configure database and mongoose
mongoose.set('useCreateIndex', true)
mongoose
	.connect(config.database, { useNewUrlParser: true })
	.then(() => {
		console.log('Database is connected')
	})
	.catch((err) => {
		console.log({ database_error: err })
	})
// db configuaration ends here

//registering cors
app.use(cors())
// app.use(express.json())

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// configure morgan middleware logger
app.use(morgan('dev')) 

// define first route
app.get('/', (req, res) => {
	res.json('Hola world')
})

//bring in our suggestion routes
const suggestionRoutes = require('./api/routes/suggestion') 
app.use('/suggestion', suggestionRoutes)

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`)
})