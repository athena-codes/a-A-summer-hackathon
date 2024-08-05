const { addQuestionsToDB, getQuestionsByUserIdFromDB } = require('../services/aiService');
const { generateGrammerQuestionsByAI, generateVocabularyQuestionsByAI } = require('../models/aiModel');
const { options } = require('../routes/userRoutes');





//the place i assebly ai model AND ai service
// user can get all questions he/she had
const getAllQuestionsbyAI = async (req, res) => {
    const { userId } = req.params;
    try {
        const allQuestions = await getQuestionsByUserIdFromDB(userId);
        res.status(200).json(allQuestions);
    } catch (error) {
        res.status(500).json({ message: `Error fetching user>ai_generated: ${error.message}` });
    }
}

// get question from AI and store in db
const addCardQuestions = async (req, res) => {
    console.log("am i hitting get ai questions route")
    const { concept, topic, user_native_language, user_level } = req.body

    // get data from aiModel based on different cocept
    if (concept === "Basic Vocabulary") {
        console.log("the learner is clicking Basic Vocabulary~~")
        try {

            //generate questionData for front
            let questionData = await generateVocabularyQuestionsByAI(topic, user_native_language, user_level)

            // //method 1- insert db 1 by 1
            // for (let q of questionData) {
            //     const { question, options, answer, explanation } = q
            //     const question_from_ai = await addQuestionsToDB("qX9q8i4wE24ohjSykFf8", { question, options, answer, explanation });

            // }
            // const { question, options, answer, explanation } = questionData


            // const question_from_ai = await addQuestionsToDB("reference", { question, options, answer, explanation });

            // res.status(201).json({ message: 'questions added', question_from_ai });

            //method 2- insert db with questionData
            // const question_from_ai = await addQuestionsToDB("qX9q8i4wE24ohjSykFf8", { questionData });
            //taking userid AND aiData
            const question_from_ai = await addQuestionsToDB("n0M6NHzgMb5MTJFIpzFK", { questionData });


            res.status(201).json({ message: `questions generated from ai added to db successfully! ${question_from_ai}` });

        } catch (error) {
            res.status(500).json({ message: `Error adding questions: ${error.message}` });
        }
    }
    else if (concept === "Basic Grammar") {
        console.log("the learner is clicking Basic Grammar~~")
        try {

            //generate questionData for front
            let questionData = await generateGrammerQuestionsByAI(topic, user_native_language, user_level)


            // //method 1- insert db 1 by 1
            // for (let q of questionData) {
            //     const { question, options, answer, explanation } = q
            //     const question_from_ai = await addQuestionsToDB("qX9q8i4wE24ohjSykFf8", { question, options, answer, explanation });

            // }
            // const { question, options, answer, explanation } = questionData


            // const question_from_ai = await addQuestionsToDB("reference", { question, options, answer, explanation });

            // res.status(201).json({ message: 'questions added', question_from_ai });

            //method 2- insert db with questionData
            const question_from_ai = await addQuestionsToDB("qX9q8i4wE24ohjSykFf8", { questionData });

            res.status(201).json({ message: `questions generated from ai added to db successfully! ${question_from_ai}` });

        } catch (error) {
            res.status(500).json({ message: `Error adding questions: ${error.message}` });
        }

    }
    else if (concept === "Everyday Situations") {
        console.log("the learner is clicking Everyday Situations~~")

    }


};


module.exports = {
    addCardQuestions,
    getAllQuestionsbyAI
};
