const notFound = (req, res, next) => {
  const error = new Error("Not Found - ${req.originalUrl}");
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
  next();
};

export { notFound, errorHandler };
