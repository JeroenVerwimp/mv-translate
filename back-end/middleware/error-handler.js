module.exports = (err, req, res, next) => {
  // override mulder file size error.
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(400);
    res.json({
      code: err.code,
      message: "The maximum file size is 200kb."
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
}