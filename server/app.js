const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const CrawlService = require('./services/CrawlService');
const path = require('path');

class AppWrapper {
  constructor() {
    this.app = express();
    this._setMiddlewares();
    this._setRoutes();
    this._setErrorHandling();
  }

  _setMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  _setRoutes() {
    this.app.use(express.static(path.join(__dirname, '../client/public')));

    this.app.post('/api/crawl', (req, res) => {
      return CrawlService.create(req, res);
    });

    this.app.get('/api/crawl', (req, res) => {
      return CrawlService.get(req, res);
    });

    // this.app.get('*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
    // });
  }

  _setErrorHandling() {
    // 404 handler
    this.app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    });

    // General error handler
    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    });
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

module.exports = AppWrapper;
