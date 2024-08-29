const { addQuestionsToDB, getQuestionsByUserIdFromDB } = require('../services/aiService');
const { generateQuestionsByAI } = require('../models/aiModel');
const { options } = require('../routes/userRoutes');
const { db } = require('../firebase/firebaseConfig');

const { doc, getDoc } = require('firebase/firestore');




//the place i assebly ai model AND ai service

// get question from AI and store in db
const addCardQuestions = async (req, res) => {
    console.log("am i hitting get ai questions route: ", req.body)
    const { topic_id, user_native_language, userId } = req.body


    //check if topic belongs to an existing concept
    const topicRef = doc(db, 'topics', topic_id);
    console.log("topicRef: ", topicRef)
    const topicDoc = await getDoc(topicRef);
    console.log("topicDoc: ", topicDoc)
    if (!topicDoc.exists()) {
        throw new Error("Topic does not exist!");
    }

    const topicData = topicDoc.data();
    const topic_name = topicData.topic_name
    console.log("topicData: ", topicData);


    //get concept level
    const conceptRef = doc(db, 'concepts', topicData.concept_id);
    const conceptDoc = await getDoc(conceptRef);
    const conceptData = conceptDoc.data();
    console.log("conceptData: ", conceptData);


    let concept_level = conceptData.level
    let concept_name = conceptData.concept_name



    if (!topicData.concept_id) {
        throw new Error("Invalid topic due to concept_id is empty!!")
    }

    try {

        let questionData = await generateQuestionsByAI(concept_name, topic_name, user_native_language, concept_level, topic_id);
        console.log("questionData: ", questionData)

        if (questionData) {
            const question_from_ai = await addQuestionsToDB(userId, { questionData });

            res.status(201).json({ message: `questions generated from ai added to db successfully!`, question_from_ai });
        } else {
            res.status(400).json({ message: `Error : ${error.message}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error adding questions: ${error.message}` });
    }


};



module.exports = {
    addCardQuestions
};
