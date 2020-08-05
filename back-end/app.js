var express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    Sentry = require('@sentry/node'),
    config = require('./config');

Sentry.init({ dsn: config.SENTRY_DSN, environment: config.SENTRY_ENV });
const app = express();

app.use(cors());
app.use(morgan(config.MORGAN_LOG));
app.use(express.json());
app.use(express.urlencoded());
app.use(Sentry.Handlers.requestHandler());

app.use(require('./routes'));

// 404
app.use((req, res, next) => {
  var err = new Error('End-point not found!');
  err.code = "NOT_FOUND";
  err.status = 404;
  next(err);
});

// Sentry error handles
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    return error.status === 404 || error.status === 500;
  }
}));

// Error handling
app.use((err, req, res, next) => {
  // override mulder file size error.
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(400);
    res.json({
      code: err.code,
      message: "The maximum file size is 5kb."
    })
    return next(err);
  }

  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }

  if (err.code) {
    res.json({
      code: err.code,
      message: err.message
    });
  }

  next(err);
});


// Start listening for requests.
var server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}.`)
});