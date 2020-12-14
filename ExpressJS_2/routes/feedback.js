const express = require('express');

const { check, ValidationResult, validationResult } = require('express-validator');

const router = express.Router();

const validation = [
    check('name')
        .trim()
        .isLength({ min: 3, max: 20 })
        .escape()
        .withMessage("A valid name is required"),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required"),
    check('title')
        .trim()
        .isLength({ min: 3, max: 20 })
        .escape()
        .withMessage("A valid title is required"),
    check('message')
        .trim()
        .isLength({ min: 3, max: 150 })
        .escape()
        .withMessage("A valid message is required")
    
];


module.exports = (params) => { 
    const { feedbackService } = params;
    // router.get('/', async (request, response) => {
    //     const feedbacks = await feedbackService.getList();
    //     //return response.send("Feedback page Lists")
    //     return response.json(feedbacks);
    // });

    router.get('/', async (request, response) => {
        const feedback = await feedbackService.getList();
        const errors = request.session.feedback ? request.session.feedback.errors : false;
        const message = request.session.feedback ? request.session.feedback.message : false;

        request.session.feedback = {};

        //console.log(feedback);
        response.render('layout', { pageTitle: 'Feedback' , template : 'feedback',feedback,errors,message});
    });

    router.post('/', validation, async (request, response, next) => {
        try {
            const formError = validationResult(request);
            if (!formError.isEmpty()) {
                request.session.feedback = {
                    errors: formError.array(),
                }
                return response.redirect('/feedback');
            }
            const { name, email, title, message } = request.body;
            await feedbackService.addEntry(name, email, title, message);
            request.session.feedback = {
                message: "Thank you for your feedback"
            };
        } catch (error) { 
            next(error);
        }
        return response.redirect('/feedback');
    });

    router.post('/api', validation, async (request, response, next) => {
        try {
            console.log("Data=========>",request.body);
            const formError = validationResult(request);
            if (!formError.isEmpty()) {
                return response.json({ error: formError.array() });
            }
            const { name, email, title, message } = request.body;
            await feedbackService.addEntry(name, email, title, message);
            const feedbacks = await feedbackService.getList();
            response.json({
                feedbacks: feedbacks});
        } catch (error) { 
            next(error);
        }
    });

    return router;
}

