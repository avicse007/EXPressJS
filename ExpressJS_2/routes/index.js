const express = require('express');

const speakersRoute = require('./speakers');

const feedbackRoute = require('./feedback');

const router = express.Router();



module.exports = (params) => { 

    const { speakerService } =  params ;


    router.get('/', async (request, response) => {
        const topSpeakers = await speakerService.getList();
        const artworks = await speakerService.getAllArtwork();
       // console.log(topSpeakers);
        if (!request.session.visitCount) { 
            request.session.visitCount = 0;
        }
        request.session.visitCount += 1;
        console.log(`Number of visitors: ${request.session.visitCount} `);

        //response.sendFile(path.join(__dirname, './static/index.html'));
        response.render('layout', { pageTitle: 'Welcome' , template : 'index', topSpeakers,artworks});
    });

    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));
    return router;
}

