const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');

const speakerService = new SpeakerService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');


const routes = require('./routes');
const { response } = require('express');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys : ['Avinash','Susmita']
})
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = "ROUX Meetups";

app.use(express.static(path.join(__dirname, './static')));

app.get('/throw', (request, response, next) => {
    setTimeout(() => {
        return next(new Error("ROUX Meeting Error"));
    }, 500);
    
});

app.use(async (request,response,next) => { 
    try {
        const names = await speakerService.getNames();
        response.locals.speakerNames = names;
        //console.log(response.locals);
        next();
    } catch (err) { 
        next(err);
    }
})

// app.get('/', (request, response) => {
//     //response.sendFile(path.join(__dirname, './static/index.html'));
//     response.render('pages/index', { pageTitle: 'Welcome' });
// });

app.use('/', routes({
    feedbackService,
    speakerService
}));

app.get('/speakers', (request, response) => {
    response.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(port, () => {
    //console.log(`Server is listing to ${port}`);
});