const { GoogleGenerativeAI } = require("@google/generative-ai");
const { sendEmailVerification } = require("firebase/auth");

// Access your API key as an environment variable (see "Set up your API key" above)


const genAI = new GoogleGenerativeAI(KEY);





//generate questions from ai

async function generateGrammerQuestionsByAI(topic, native_language, level) {
    console.log("am i hitting get ai functions and check the user level: ", native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    // Default prompt
    let prompt = `You're an English teacher there're 3 student levels begineer, itermediate, advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and mutiple choices in english,answer and explaination in ${native_language} for ${level} learner using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`



    if (topic === "Present Simple Tense") {
        console.log("是否符合?")
        prompt = `You're an English teacher there're 3 student levels begineer, itermediate, advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and mutiple choices in english,answer and explaination in ${native_language} for ${level} learner using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Sentence Structure") {
        console.log("是否符合 Sentence Structure?")
        prompt = `You're an English teacher. There are 3 student levels: beginner, intermediate, and advanced. Create 3 questions for ${level} learners choose the sentence that follows the SVO structure, with options in english, answer and explanation in ${native_language} for ${level} learners using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Prepositions") {
        console.log("是否符合 Prepositions?")
        prompt = `You're an English teacher. create 3 practices for ${level} leaners to test if they understand Prepositions: In, on, at, under, over, beside. The practice includes a question and  4 options in English, answer and explanation in ${native_language} using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    else if (topic === "Possessive Pronouns") {
        console.log("是否符合 Possessive Pronouns?")
        prompt = `You're an English teacher. create 3 practices for ${level} leaners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`
    }
    // const prompt = `You're an English teacher, there're 3 student levels - begineer, itermediate, advanced , I'm teaching ${native_language} as native language ${level} learner, provide a JavaScript Object Notation format includes 1 fill-in-the-blank question for present simple tense in english, mutiple choices ,answer and explaination in ${native_language} for ${level} learner.`


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
    generateGrammerQuestionsByAI
};
