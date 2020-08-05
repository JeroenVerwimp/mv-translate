function requiredQueries(queries) {
    return (req, res, next) => {
        const missingQueries = [];

        for (const query of queries) {
            if (!req.query[query]) {
                missingQueries.push(query);
            }
        }

        if (missingQueries.length !== 0) {
            const err = new Error("");
            err.code = "MISSING_QUERY_PARAMETERS";
            err.status = 400;
            return next(err);
        }

        next();
    }
}

module.exports = {
    requiredQueries
}