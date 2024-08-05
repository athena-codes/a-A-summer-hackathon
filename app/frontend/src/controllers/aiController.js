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
    const { concept, topic, user_native_language, user_level, userId } = req.body
    // get data from aiModel based on different cocept
    try {
        let questionData;
        if (concept === "Basic Vocabulary") {
            console.log("the learner is clicking Basic Vocabulary~~");
            questionData = await generateVocabularyQuestionsByAI(topic, user_native_language, user_level);
        } else if (concept === "Basic Grammar") {
            console.log("the learner is clicking Basic Grammar~~");
            questionData = await generateGrammerQuestionsByAI(topic, user_native_language, user_level);
        } else if (concept === "Everyday Situations") {
            console.log("the learner is clicking Everyday Situations~~");
            // Handle this case accordingly
        }

        if (questionData) {
            const question_from_ai = await addQuestionsToDB(userId, { questionData });
            res.status(201).json({ message: `questions generated from ai added to db successfully!`, question_from_ai });
        } else {
            res.status(400).json({ message: `Invalid concept: ${concept}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error adding questions: ${error.message}` });
    }


};


module.exports = {
    addCardQuestions,
    getAllQuestionsbyAI
};
