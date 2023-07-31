


exports.response = (res, usermsg, statusCode, data = {}) => {
    if (statusCode == 200) {

        res.status(statusCode).json({
            status: statusCode,
            message: usermsg,
            data
        });

    } else {

        res.status(statusCode).json({

            message: usermsg,
            data: null,
            status: statusCode

        });

    }

};

