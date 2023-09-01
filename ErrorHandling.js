function handleServerError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong!';  //status code 500 internal server error
    res.status(statusCode).send(errorMessage);
}
function handleBadRequestError(message = 'Bad Request') {
    const error = new Error(message);
    error.statusCode = 400;      //status code 400 bad request
    throw error;
}


module.exports = {
    handleServerError,
    handleBadRequestError,
};
