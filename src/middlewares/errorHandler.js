function errorHandler(err,req,res,next) {
    res.status(err.status ? err.status : 500).json({message: err.message, statusCode: err.status});
}

module.exports = errorHandler;