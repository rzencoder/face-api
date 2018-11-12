const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b5c34b781c4b428281f05614d290d7db'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => {
        res.json(response)
        .catch(err => res.status(400).json('error loading api'))
    })
}


const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}