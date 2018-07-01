const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function validArtCard(artCard) {
    const hasImgUrl = typeof artCard.imgUrl == 'string' && artCard.imgUrl.trim() != ""
    const hasDescription = typeof artCard.description == 'string' && artCard.description.trim() != ""
    const hasLocation = typeof artCard.location == 'string' && artCard.location.trim() != ""
    const hasLat = typeof artCard.lat == 'number' && artCard.lat >= -180 && artCard.lat <= 180
    const hasLng = typeof artCard.lng == 'number' && artCard.lng >= -180 && artCard.lng <= 180

    return hasImgUrl && hasDescription && hasLocation && hasLat && hasLng
}

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) {
        return next()
    } else {
        next(new Error('invalid id'))
    }
}

router.get('/', (req, res) => {
    queries.getAll().then(art_cards => {
        res.json(art_cards);
    })
})

router.post('/', (req, res, next) => {
    if (validArtCard(req.body)) {
     queries.create(req.body).then(art_cards => {
         res.json(art_cards[0])
     })
    } else {
        next(new Error('invalid art card'))
    }
})

router.put('/:id', isValidId, (req, res, next) => {
    if (validArtCard(req.body)) {
        queries.update(req.params.id, req.body).then(art_cards => {
            res.json(art_cards[0])
        })
    } else {
         next(new Error('invalid art card'))
    }
})

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(res.json({message: "successfully deleted!"}))
})

module.exports = router;
