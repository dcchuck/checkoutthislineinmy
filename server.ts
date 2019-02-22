import * as path from 'path';
import express = require('express');
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 9001;
const reactBuildPath = path.join(__dirname, 'build');

const app = express();

/**
 * Statically serve the React project
 */
app.use(express.static(reactBuildPath))

/**
 * Parse application/json
 */
app.use(bodyParser.json())
/**
 * Allow any type of data to be sent in as a key: value pair
 */
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * API
 */
const router = express.Router();

router.post('/', function(req, res) {
  const redisKeyToIncrement = req.body.to_increment;
  console.log(redisKeyToIncrement)

  res.json({ message: 'succes' })
})

app.use('/api', router);

app.listen(port)
