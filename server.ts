import * as path from 'path';
import * as crypto from 'crypto';
import express = require('express');
import * as bodyParser from 'body-parser';
import * as Redis from 'ioredis';

const redisConnection = new Redis();

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

interface IReactMessage {
  githubUrl: string;
  fileType: string;
  description: string;
}

router.post('/', function(req, res) {
  const reactAppPayload = req.body as IReactMessage;
  const fileType = reactAppPayload.fileType;
  const githubUrl = reactAppPayload.githubUrl;
  const hashedName = crypto.createHmac('sha256', 'beans').update(githubUrl).digest('hex');
  const pipeline = redisConnection.pipeline();
  pipeline.hmset(hashedName, { githubUrl: githubUrl, description: reactAppPayload.description })
  pipeline.sadd(fileType, hashedName);
  pipeline.sadd('file_types', fileType);
  pipeline.exec(function (err, results) {
    if (err) {
      console.log("error!")
      console.log(err)
      res.json({ message: 'failure' })
    } else {
      res.json({ message: 'success' })
    }
  })
  //add file type to set of file types
})

app.use('/api', router);

app.listen(port)
