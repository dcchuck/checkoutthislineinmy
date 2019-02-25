import * as path from 'path';
import express = require('express');
import * as bodyParser from 'body-parser';
import * as Redis from 'ioredis';

interface INewSnippet {
  description: string;
  fileType: string;
  githubUrl?: string;
  snippet: string;
}

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

router.post('/', function(req, res) {
  const requestBody = req.body;
  const {
    description,
    fileType,
    githubUrl,
    snippet
  } = requestBody as INewSnippet;

  const uniqueName = digestName(requestBody);

  const pipeline = redisConnection.pipeline();

  pipeline.hmset(`snippets:${uniqueName}`, { githubUrl, description, snippet, fileType } )
  pipeline.sadd('snippets', uniqueName);
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
  return {
    githubUrl,
    description,
    fileType,
  }
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
