
const express = require('express');
const router = express.Router();


router.post('/',
  async (req, res, next) => {
    try {
        let payload=req.body.payload;
        let refData=req.body.referenceData;
        let transitedData=transform(payload,refData);
      res.status(201).json(transitedData);
    } catch (e) {
      next(e);
    }
  }
);

function transform(payload,refData) {
    payload.value.forEach(element => {
        if(element.valueType=="string"){
            if (element.value.includes('REF')) {
                let splitFrom = element.value.split('{');
                let splitTo = splitFrom[1].split('}');
                element.value = refData[splitTo[0]] + '' + splitTo[1];
            }
        }
        else
        {
            transform(element,refData);
        }
    });
    return payload;
}
module.exports = router;