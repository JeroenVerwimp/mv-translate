const express = require('express');
const vallidators = require('../../vallidators');
const router = express.Router();

const config = require('../../config');
const { Translate } = require('@google-cloud/translate').v2;
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

module.exports = router;