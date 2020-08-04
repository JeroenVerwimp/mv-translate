function requiredQueries(queries) {
    return (req, res, next) => {
        const missingQueries = [];

        for (const query of queries) {
            if (!req.query[query]) {
                missingQueries.push(query);
            }
        }

        if (missingQueries.length !== 0) {
            return res.status(400)
                        .json({
                            error: "Missing query parameter!",
                            value: missingQueries
                        });
        }

        next();
    }
}

module.exports = {
    requiredQueries
}