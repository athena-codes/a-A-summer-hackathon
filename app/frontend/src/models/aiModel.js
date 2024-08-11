require('./polyfill')
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { sendEmailVerification } = require("firebase/auth");
// Access your API key as an environment variable (see "Set up your API key" above)
const { API_KEY } = process.env;

const genAI = new GoogleGenerativeAI(API_KEY);


//generate questions from ai based on different topic
async function generateQuestionsByAI(concept_name, topic, native_language, level, topic_id) {
    console.log("am i hitting generateVocabularyQuestionsByAI functions and check the user level: ", concept_name, topic, native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    let picked_concept = concept_name.toLowerCase().split(" ").join("")
    let picked_topic = topic.toLowerCase().split(" ").join("")
    let role = `You're an English teacher.`
    let jsonschema = `JSON schema: { "type":"array", "properties": {"id": "integer", "question": "string",  "options": "array",  "answer": "string",  "explanation":"string", "isAttempted": false }}.`
    const grammar_tense_question = {
        "Beginner": ["presentsimpletense"],
        "Intermediate": ["pastsimpletense", "pastcontinuoustenses", "presentperfecttenses", "presentperfectcontinuoustenses", "futuretenses"],
        "Advanced": ["futureperfecttenses", "pastperfectcontinuous"]
    }
    const everyday_situations_question = {
        "Beginner": ["familyandfriends", "dailyroutines", "shopping", "foodanddrink"],
        "Intermediate": ["describingexperiences", "givingopinionsandreasons", "makingplansandarrangements", "discussingpreferencesandhabits"],
        "Advanced": ["professionalcontexts", "advancedsocialsituations"]
    }

    // Default prompt
    let prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema

    // check concept_name (Vocabulary,Grammar,Everyday Situations)
    try {
        //common nouns, verbs, adj, common phrases (Vocabulary)
        if (picked_concept === "vocabulary") {
            console.log("hit concept- vocabulary")
            if (picked_topic === "nouns") {
                prompt = role + `there're 3 levels :beginner, intermediate, advanced. Give me 3 unique nouns and 4 choices in english to test if ${level} learner understand it. Answer and explaination in ${native_language}. Using this` + jsonschema
            }
            else if (picked_topic === "verbs") {
                prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique verbs questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
I usually listen _____ music when I'm on the bus to work using this` + jsonschema
            }
            else if (picked_topic === "adjectives") {
                prompt = role + `there're 3 levels :beginner, intermediate, advanced. Give me 3 unique Adjectives questions to test if ${level} learner understand it, and 4 choices in english,answer and explaination in ${native_language}. for example:
The weather is very__. using this` + jsonschema
            }
            else if (picked_topic === "commonphrases") {
                prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Common Phrases questions (Greetings, introductions, common questions (e.g., How are you?)) to test if ${level} learner understand how to response it and 4 choices in english,answer and explaination in ${native_language}. Using` + jsonschema
            }

        }


        //present simple tense,sentence structure, prepositions, possessive pronouns (Grammar)
        else if (picked_concept === "grammar") {
            console.log("hit concept- grammar")

            //when the user pick up grammer concept, check their level and pull suitable tenses for the user
            let tense_questions = grammar_tense_question[level]


            if (tense_questions.includes(picked_topic)) {
                prompt = role + `there're 3 levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema
                console.log(`user clicked grammer > ${picked_topic}`)
            }
            else if (picked_topic === "sentencestructure") {

                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 questions for ${level} learners choose the sentence that follows the SVO structure, with options in english, answer and explanation in ${native_language} for ${level} learners using this` + jsonschema
            }
            else if (picked_topic === "prepositions") {
                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Prepositions: In, on, at, under, over, beside. The practice includes a question and  4 options in English, answer and explanation in ${native_language} using this` + jsonschema
            }
            else if (picked_topic === "possessivepronouns") {
                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this` + jsonschema
            }
        }

        //family and friends, daily routines,shopping , food and drink (Everyday Situations)
        else if (picked_concept === "everydaysituations") {
            console.log("hit concept- everydaysituations")
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + jsonschema

        }
    } catch (error) {
        res.status(500).json({ message: `Error generating questions from AI: ${error.message}` });

    }


    try {

        const result = await model.generateContent(prompt);
        console.log('result: ', result);
        const jsonString = result.response.text();


        console.log("------------------------------")
        let jsonData = JSON.parse([jsonString])
        console.log('topic: ', topic)
        return { topic_id, topic, level, jsonData }
    } catch (error) {
        console.error('Error generating content:', error);
    }
}


module.exports = {
    generateQuestionsByAI

};
