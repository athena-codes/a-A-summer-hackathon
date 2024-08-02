const { addQuestionsToDB, getQuestionsByUserIdFromDB } = require('../services/aiService');
const { generateQuestionsByAI } = require('../models/aiModel');
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
    const { user_native_language, user_level } = req.body
    try {

        //generate questionData for front
        let questionData = await generateQuestionsByAI(user_native_language, user_level)
        console.log("確認我拿到的questions是什麼: ", questionData, typeof (questionData))
        const { question, options, answer, explanation } = questionData



        const question_from_ai = await addQuestionsToDB("reference", { question, options, answer, explanation });

        res.status(201).json({ message: 'questions added', question_from_ai });
    } catch (error) {
        res.status(500).json({ message: `Error adding questions: ${error.message}` });
    }
};


module.exports = {
    addCardQuestions,
    getAllQuestionsbyAI
};
