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
})


async function createRecord(r, fileType) {
  const githubUrl = await redisConnection.hget(r, 'githubUrl')
  const description = await redisConnection.hget(r, 'description')
  const bean = {
    githubUrl,
    description,
    fileType,
  }
  console.log(bean)
  return bean
}

async function processGet(res) {
  const fileTypes = await redisConnection.smembers('file_types');
  const allRecords = []
  for (let i = 0; i < fileTypes.length; i++) {
    const records = await redisConnection.smembers(fileTypes[i])
    for (let j = 0; j < records.length; j++) {
      const newRecord = await createRecord(records[j], fileTypes[i]);
      allRecords.push(newRecord)
    }
  }
  res.json(allRecords);
}

router.get('/', async function(req, res) {
  processGet(res)
})

app.use('/api', router);

app.listen(port, () => console.log('running.'))
