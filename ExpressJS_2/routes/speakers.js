const express = require('express');

const router = express.Router();



module.exports = (params) => { 
    const { speakerService } = params;
    router.get('/', async (request, response) => {
        //response.sendFile(path.join(__dirname, './static/index.html'));
        //response.render('pages/index', { pageTitle: 'Welcome' });
        //return response.send("Speaker Lists")
        const speakers = await speakerService.getList();
        const artworks = await speakerService.getAllArtwork();
       // response.json(speakers);
        response.render('layout', {pageTitle : 'Speakers', template : 'speakers', speakers,artworks})
        
    });

    router.get('/:shortName', async (request, response) => {
        //response.sendFile(path.join(__dirname, './static/index.html'));
        //response.render('pages/index', { pageTitle: 'Welcome' });
        const speaker = await speakerService.getSpeaker(request.params.shortName);
        const artworks = await speakerService.getArtworkForSpeaker(request.params.shortName);
        //console.log(speaker);
        //return response.send(`Detail page of ${request.params.shortName}`);
        response.render('layout', {pageTitle : 'Speakers', template : 'speakers-detail', speaker,artworks})
    });

    return router;
}

