require('dotenv/config')

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

// init express app
const app = express()
const router = express.Router()
const apiKey = process.env.API_KEY

// init db connection
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
})

// configure router
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// ========== queries ==========
const querySelectLatest = "SELECT datetime,bones FROM bones ORDER BY datetime DESC LIMIT 1"
const querySelectDate = "SELECT datetime,bones FROM bones WHERE date=? ORDER BY datetime DESC"

	// full datetime will trigger update if day is same as existing value
const queryInsert = `INSERT INTO bones (datetime, bones) VALUES (?)
	ON DUPLICATE KEY UPDATE bones=VALUES(bones), datetime=VALUES(datetime)`

// ========== routes ==========
// GET latest bones
router.get('/bones/', (req, res) => {
	pool.query(querySelectLatest, (err, results) => {
		if(err || results.length == 0) {
			handleError(err, res)
			return
		}

		res.type('json').send(JSON.stringify(results))
	})
})

// GET bones status by date
router.get('/bones/:date', (req, res) => {
	var date = new Date(req.params.date)
	date = date.toJSON().slice(0,10) // convert to YYYY-MM-DD before querying

	pool.query(querySelectDate, [date], (err, results) => {
		if (err) {
			handleError(err, res)
			return
		}

		if (results.length > 0) {
			res.type('json').send(JSON.stringify(results))
		} else {
			res.status(404)
			sendMessage(res, "Could not find bones status for the provided date range")
		}
	})
})

// POST bones status (or update)
router.post('/bones/:date/:bones', (req, res) => {
	// check api key
	if (!apiCheck(req)) {
		res.status(401)
		sendMessage(res, "Invalid or missing API key.")
		return
	}

	// handle bad bones value
	if(req.params.bones > 1 || req.params.bones < 0) {
		res.status(500)
		sendMessage(res, `Invalid bones value (${req.params.bones}), must be either 1 or 0`)
		return
	}

	// TODO: handle bad date value

	var values = [req.params.date, req.params.bones]

	pool.query(queryInsert, [values], (err, results) => {
		if (err) {
			handleError(err, res)
			return
		}

		pool.query(querySelectDate, [req.params.date.slice(0,10)], (err, results) => {
			if (err) {
				handleError(err, res)
				return
			}

			res.type('json').send(JSON.stringify(results))
		})
	})
})

// returns whether or not api key is valid
function apiCheck(req) {
	return req.header('x-api-key') == process.env.API_KEY
}

function sendMessage(res, message) {
	res.type('json').send({"message": message})
}

function handleError(err, res) {
	console.error(err)
	res.status(500)
	sendMessage(res, "Unknown internal error")
}

app.use(process.env.BASE_URL, router)
app.listen(3000, () => console.log('Server started on port 3000'))