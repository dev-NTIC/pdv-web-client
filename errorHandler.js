const ErrorHandler = (err, req, res, next) => {

    const status = err.code ?? 500;
    const message = err.message ?? "Server Error";

    console.log(status + ' ' + message);
    res.status(status).json({ data: message });
};

exports.ErrorHandler = ErrorHandler;