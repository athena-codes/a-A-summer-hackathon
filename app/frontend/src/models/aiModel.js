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
    //let prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english like "English Answer Choice, Native Language Answer Choice answer and explaination in ${native_language} for ${level} learner using this` + jsonschema
    let prompt = `
    You are an English teacher. There are three student levels: Beginner, Intermediate, and Advanced.
    Please create 3 unique fill-in-the-blank questions for the topic "${topic}" suitable for ${level} learners.
    Each question should have 4 answer options in the following format:
    - Option in English (Translation in ${native_language})

    For example:
    Question: The weather is very __ today.
    Options:
    - hot (mainit)
    - warm (mainit-init)
    - cold (malamig)
    - rainy (maulan)

    Ensure that the explanation for the correct answer is also provided in ${native_language}.
    Use the following JSON schema:
    {
      "type": "array",
      "properties": {
        "id": "integer",
        "question": "string",
        "options": "array",
        "answer": "string",
        "explanation": "string",
        "isAttempted": false
      }
    }.
    `;




// Generate questions based on the selected concept (Vocabulary, Grammar, Everyday Situations)
try {
    if (picked_concept === "vocabulary") {
        console.log("Selected concept: Vocabulary");

        if (picked_topic === "nouns") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions for common nouns. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. For example:
            Question: The dog is a __ animal.
            Options:
            - mammal (mamífero)
            - reptile (reptil)
            - amphibian (anfibio)
            - insect (insecto).
            ${jsonschema}`;
        } else if (picked_topic === "verbs") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions for common verbs. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. For example:
            Question: I usually listen _____ music when I'm on the bus to work.
            Options:
            - to (a)
            - in (en)
            - by (por)
            - with (con).
            ${jsonschema}`;
        } else if (picked_topic === "adjectives") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions for common adjectives. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. For example:
            Question: The weather is very __ today.
            Options:
            - hot (caluroso)
            - cold (frío)
            - warm (tibio)
            - rainy (lluvioso).
            ${jsonschema}`;
        } else if (picked_topic === "commonphrases") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions for common phrases (e.g., greetings, introductions, common questions like "How are you?"). Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. For example:
            Question: How are you?
            Options:
            - Fine, thank you (Bien, gracias)
            - I'm okay (Estoy bien)
            - Not bad (No está mal)
            - Could be better (Podría estar mejor).
            ${jsonschema}`;
        }

    } else if (picked_concept === "grammar") {
        console.log("Selected concept: Grammar");

        let tense_questions = grammar_tense_question[level];

        if (tense_questions.includes(picked_topic)) {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions for ${topic}. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. ${jsonschema}`;
            console.log(`Grammar topic selected: ${picked_topic}`);
        } else if (picked_topic === "sentencestructure") {
            prompt = `${role} Please create 3 questions for ${level} learners to choose the sentence that follows the SVO structure. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. ${jsonschema}`;
        } else if (picked_topic === "prepositions") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions to test understanding of prepositions (e.g., in, on, at, under, over, beside). Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. ${jsonschema}`;
        } else if (picked_topic === "possessivepronouns") {
            prompt = `${role} Please create 3 unique fill-in-the-blank questions to test understanding of possessive pronouns. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. ${jsonschema}`;
        }

    } else if (picked_concept === "everydaysituations") {
        console.log("Selected concept: Everyday Situations");

        prompt = `${role} Please create 3 unique fill-in-the-blank questions about ${topic}. Each question should include 4 answer options in both English and ${native_language}, formatted as "English Answer (Native Language Translation)". Ensure the explanation for the correct answer is in ${native_language}. For example:
        Question: Where is the nearest grocery store?
        Options:
        - It's two blocks away (Está a dos cuadras)
        - It's next door (Está al lado)
        - It's around the corner (Está a la vuelta de la esquina)
        - It's far away (Está lejos).
        ${jsonschema}`;
    }
} catch (error) {
    res.status(500).json({ message: `Error generating questions from AI: ${error.message}` });
}

try {
    const result = await model.generateContent(prompt);
    console.log('AI result: ', result);
    const jsonString = result.response.text();

    console.log("Generated JSON String:", jsonString);
    let jsonData = JSON.parse(jsonString);
    console.log('Parsed topic data: ', topic);
    return { topic_id, topic, level, jsonData };
} catch (error) {
    console.error('Error generating content:', error);
}

}


// async function generateQuestionsByAI(topic, native_language, level, topic_id) {
//     console.log("am i hitting generateVocabularyQuestionsByAI functions and check the user level: ", topic, native_language, level)
//     // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

//     let picked_topic = topic.toLowerCase().split(" ").join("")
//     let role = `You're an English teacher.`
//     let jsonschema = `JSON schema: { "type":"array", "properties": {"id": "integer", "question": "string",  "options": "array",  "answer": "string",  "explanation":"string", "isAttempted": false }}.`

//     // Default prompt
//     let prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema

//     try {
//         //common nouns, basic verbs, basic adj, common phrases (basic vocabulary)
//         if (picked_topic === "commonnouns") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic nouns questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
// Don't eat the rotten apple. Identify the common noun in this sentence.
// using this` + prompt
//         }
//         else if (picked_topic === "basicverbs") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic Verbs questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
// I usually listen _____ music when I'm on the bus to work using this` + prompt
//         }
//         else if (picked_topic === "basicadjectives") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Basic Adjectives questions to test if ${level} learner understand main verbs , auxiliaries and 4 choices in english,answer and explaination in ${native_language}. for example:
// Special people won.What is the adjective here ? using this` + prompt
//         }
//         else if (picked_topic === "commonphrases") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Common Phrases questions (Greetings, introductions, common questions (e.g., How are you?)) to test if ${level} learner understand how to response it and 4 choices in english,answer and explaination in ${native_language}. Using` + prompt
//         }
//         //present simple tense,sentence structure, prepositions, possessive pronouns (basic grammar)

//         else if (picked_topic === "presentsimpletense") {
//             prompt = role + `there're 3 student levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${picked_topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + prompt
//         }
//         else if (picked_topic === "sentencestructure") {

//             prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 questions for ${level} learners choose the sentence that follows the SVO structure, with options in english, answer and explanation in ${native_language} for ${level} learners using this` + prompt
//         }
//         else if (picked_topic === "prepositions") {
//             prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Prepositions: In, on, at, under, over, beside. The practice includes a question and  4 options in English, answer and explanation in ${native_language} using this` + prompt
//         }
//         else if (picked_topic === "possessivepronouns") {
//             prompt = role + ` There are 3 student levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this` + prompt
//         }
//         //family and friends, daily routines,shopping , food and drink (for everyday situations)
//         else if (picked_topic === "familyandfriends") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Everyday Situations questions about  ${picked_topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

//         }
//         else if (topic === "dailyroutines") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Daily Routines questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

//         }
//         else if (topic === "shopping") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Shopping questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + prompt

//         }
//         else if (topic === "foodanddrink") {
//             prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Food and Drink questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this JSON schema: { "type":"array", "properties": {"question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}}.`

//         }
//     } catch (error) {
//         res.status(500).json({ message: `Error generating questions from AI: ${error.message}` });

//     }



//     try {

//         const result = await model.generateContent(prompt);
//         console.log('result: ', result);
//         const jsonString = result.response.text();


//         console.log("------------------------------")
//         let jsonData = JSON.parse([jsonString])
//         return { topic_id, topic, level, jsonData }
//     } catch (error) {
//         console.error('Error generating content:', error);
//     }
// }


module.exports = {
    generateQuestionsByAI

};
