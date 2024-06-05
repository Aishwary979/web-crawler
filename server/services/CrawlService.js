const uuid = require('uuid');
const orchestrator = require('../lib/orchestrator');
const fs = require('fs');

module.exports = {
  create: (req, res) => {
    let id = uuid.v4(),
      webpage = req.body.webpage,
      depth = req.body.depth,
      file = `${__dirname}/../outputs/${id}.json`;

    // Create an empty file
    file && fs.writeFile(file, JSON.stringify({ "status": "In Progress", name: webpage }), function (err) {
      if (err) { console.error("An error occurred while trying to create an empty file:", err) }

      orchestrator(webpage, { sameHost: true }, (err, results) => {
        if (err) {
          throw new Error({ error: err, message: 'The web crawler errored out' });
        }
        // If the user has not given a file, then print the web tree to the console.
        if (!file) {
          console.info(results);

          return process.exit();
        }

        // eslint-disable-next-line security/detect-non-literal-fs-filename
        return file && fs.writeFile(file, JSON.stringify({ status: "Complete", result: results }), function (err) {
          if (err) { return console.error("An error occurred while trying to write results to the file:", err) }

          return console.info('Output written into file:', file);
        });
      });
    });

    res.json({ id: id });
  },

  get: function (req, res) {
    let id = req.query.id,
      filePath = `${__dirname}/../outputs/${id}.json`;

    console.log(JSON.stringify(this))

    if (!id) return this.getAll(req, res);

    return fs.readFile(filePath, 'utf8', (err, results) => {
      console.log('Read error and results:', err, results)
      // res.headers({ 'content-type': 'application/json' })
      res.json(JSON.parse(results));
    });
  },

  getAll: (req, res) => {
    let outputsFolder = `${__dirname}/../outputs`,
      counter = 0,
      totalFiles = 1,
      result = {};

    fs.readdir(outputsFolder, (err, files) => {

      counter = 0,
        totalFiles = files.length;

      files.forEach(file => {
        return fs.readFile(`${outputsFolder}/${file}`, 'utf8', (err, results) => {
          // res.headers({ 'content-type': 'application/json' })
          result[file.split('.')[0]] = JSON.parse(results);
          counter = counter + 1;
        });
      });
    });

    let timer = setInterval((counter, totalFiles) => {
      if (counter == totalFiles) {
        res.json(result);
        clearInterval(timer);
      }
    }, 200);
  }
};