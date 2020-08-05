const express = require('express'),
        vallidators = require('../../vallidators'),
        router = express.Router(),
        config = require('../../config'),
        { Translate } = require('@google-cloud/translate').v2,
        multer = require('multer'),
        fs = require('fs').promises,
        util = require('util');

const translate = new Translate({ projectId: config.PROJECT_ID });

router.get('/', vallidators.requiredQueries(['sl', 'tl', 'content']), async (req, res) => {
    const sourceLanguage = req.query.sl;
    const targetLanguage = req.query.tl;
    const content = req.query.content;

    var result = await translate.translate(content, {
        from: sourceLanguage,
        to: targetLanguage
    });

    res.json({
        result: result[0]
    });
});

const allowedFileTypes = ["text/plain"];
const fileFilter = (req, file, next) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
        const error = new Error("Only .txt files are allowed.");
        error.code = "INVALID_FILE_TYPE";
        error.status = 422;
        return next(error, false);
    }

    next(null, true);
}

const upload = multer({
    dest: "./uploads/",
    fileFilter,
    limits: {
        fileSize: 5000 // 5kb
    }
})

router.post('/file', vallidators.requiredQueries(['sl', 'tl']), upload.single('file'), async (req, res) => {
    const sourceLanguage = req.query.sl;
    const targetLanguage = req.query.tl;
    const data = await fs.readFile(req.file.path, 'utf8');
    
    var result = await translate.translate(data, {
        from: sourceLanguage,
        to: targetLanguage
    });

    await fs.writeFile(req.file.path, result[0])
    res.sendFile(req.file.path, { root: process.cwd() + '/' }, err => {
        if (err) {
            console.log(err);
        }

        fs.unlink(req.file.path);
    });
})

module.exports = router;