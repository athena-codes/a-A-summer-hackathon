require('./polyfill')
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { sendEmailVerification } = require("firebase/auth");
// Access your API key as an environment variable (see "Set up your API key" above)
const { API_KEY } = process.env;

const genAI = new GoogleGenerativeAI("API_KEY");


//generate Vocabulary questions from ai
async function generateVocabularyQuestionsByAI(topic, native_language, level) {
    console.log("am i hitting generateVocabularyQuestionsByAI functions and check the user level: ", native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    // Default prompt
    let prompt = `You're an English teacher there're 3 student levels beginner, intermediate, advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`

    if (topic === "Common Nouns") {
        prompt = `You're an English teacher there're 3 levels :beginner, intermediate, advanced. Give me 3 unique Basic nouns questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
Don't eat the rotten apple. Identify the common noun in this sentence.
 using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Basic Verbs") {
        console.log("Basic Verbs?")
        prompt = `You're an English teacher there're 3 levels :beginner, intermediate, advanced. Give me 3 unique Basic Verbs questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
I usually listen _____ music when I'm on the bus to work using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Basic Adjectives") {
        console.log("Basic Adjectives?")
        prompt = `You're an English teacher there're 3 levels :beginner, intermediate, advanced. Give me 3 unique Basic Adjectives questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
Special people won.What is the adjective here ? using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Common Phrases") {
        console.log("Common Phrases?")
        prompt = `You're an English teacher there're 3 levels :beginner, intermediate, advanced. Give me 3 unique Common Phrases questions (Greetings, introductions, common questions (e.g., How are you?)) to test if ${level} learner understand how to response it and 4 choices in english,answer and explaination in ${native_language}. Using JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }

    console.log('after prompts')


    try {
        console.log('before generateContent')
        const result = await model.generateContent(prompt);
        console.log('result: ', result);
        const jsonString = result.response.text();

        console.log("jsonString: ", jsonString);
        console.log("jsonString type: ", typeof (jsonString));


        console.log("------------------------------")
        let jsonData = JSON.parse([jsonString])
        console.log("jsonData: ", jsonData);
        console.log("jsonData: ", typeof ((jsonData)));
        return {topic, level, jsonData}
    } catch (error) {
        console.error('Error generating content:', error);
    }
}

//generate Grammer questions from ai

async function generateGrammerQuestionsByAI(topic, native_language, level) {
    console.log("am i hitting get ai functions and check the user level: ", native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    // Default prompt
    let prompt = `You're an English teacher there're 3 student levels beginner, intermediate, advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`

    if (topic === "Present Simple Tense") {
        prompt = `You're an English teacher there're 3 student levels beginner, intermediate, advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Sentence Structure") {
        console.log("Sentence Structure?")
        prompt = `You're an English teacher. There are 3 student levels: beginner, intermediate, and advanced. Create 3 questions for ${level} learners choose the sentence that follows the SVO structure, with options in english, answer and explanation in ${native_language} for ${level} learners using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Prepositions") {
        console.log("Prepositions?")
        prompt = `You're an English teacher. create 3 practices for ${level} learners to test if they understand Prepositions: In, on, at, under, over, beside. The practice includes a question and  4 options in English, answer and explanation in ${native_language} using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Possessive Pronouns") {
        console.log("Possessive Pronouns?")
        prompt = `You're an English teacher. create 3 practices for ${level} learners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }

    const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();
    const jsonString = result.response.text();

    console.log("jsonString: ", jsonString);
    console.log("jsonString type: ", typeof (jsonString));


    console.log("------------------------------")
    let jsonData = JSON.parse([jsonString])
    console.log("jsonData: ", jsonData);
    console.log("jsonData: ", typeof ((jsonData)));



    return jsonData
}


module.exports = {
    generateGrammerQuestionsByAI,
    generateVocabularyQuestionsByAI

};
