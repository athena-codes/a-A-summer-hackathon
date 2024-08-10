require('./polyfill')
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { sendEmailVerification } = require("firebase/auth");
// Access your API key as an environment variable (see "Set up your API key" above)
const { API_KEY } = process.env;

const genAI = new GoogleGenerativeAI(API_KEY);


//generate questions from ai based on different topic
async function generateQuestionsByAI(topic, native_language, level, topic_id) {
    console.log("am i hitting generateVocabularyQuestionsByAI functions and check the user level: ", topic, native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    let picked_topic = topic.toLowerCase().split(" ").join("")
    let role = `You're an English teacher.`
    let jsonschema = `JSON schema: { "type":"array", "properties": {"id": "integer", "question": "string",  "options": "array",  "answer": "string",  "explanation":"string", "isAttempted": false }}.`

    // Default prompt
    let prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema

    try {
        //common nouns, basic verbs, basic adj, common phrases (basic vocabulary)
        if (picked_topic === "commonnouns") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic nouns questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
Don't eat the rotten apple. Identify the common noun in this sentence.
using this` + prompt
        }
        else if (picked_topic === "basicverbs") {
            console.log("Basic Verbs?")
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic Verbs questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
I usually listen _____ music when I'm on the bus to work using this` + prompt
        }
        else if (picked_topic === "basicadjectives") {
            console.log("Basic Adjectives?")
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic Adjectives questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
Special people won.What is the adjective here ? using this` + prompt
        }
        else if (picked_topic === "commonphrases") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Common Phrases questions (Greetings, introductions, common questions (e.g., How are you?)) to test if ${level} learner understand how to response it and 4 choices in english,answer and explaination in ${native_language}. Using` + prompt
        }
        //present simple tense,sentence structure, prepositions, possessive pronouns (basic grammar)

        else if (picked_topic === "presentsimpletense") {
            prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${picked_topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + prompt
        }
        else if (picked_topic === "sentencestructure") {

            prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 questions for ${level} learners choose the sentence that follows the SVO structure, with options in english, answer and explanation in ${native_language} for ${level} learners using this` + prompt
        }
        else if (picked_topic === "prepositions") {
            prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Prepositions: In, on, at, under, over, beside. The practice includes a question and  4 options in English, answer and explanation in ${native_language} using this` + prompt
        }
        else if (picked_topic === "possessivepronouns") {
            prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this` + prompt
        }
        //family and friends, daily routines,shopping , food and drink (for everyday situations)
        else if (picked_topic === "familyandfriends") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Everyday Situations questions about  ${picked_topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

        }
        else if (topic === "dailyroutines") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Daily Routines questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

        }
        else if (topic === "shopping") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Shopping questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

        }
        else if (topic === "foodanddrink") {
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Food and Drink questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`

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
