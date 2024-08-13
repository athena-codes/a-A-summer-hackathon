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
    const vocabulary_nouns_content = {
        "Beginner": "Everyday objects like house, car, book...",
        "Intermediate": "Workplace objects, hobby-related items, travel essentials",
        "Advanced": "Specialized vocabulary like legal, medical, or technical terms"
    }

    const vocabulary_verbs_content = {
        "Beginner": "To be, to have, to do, to go, to eat verbs",
        "Intermediate": "can, could, might, should, would and phrasal verbs (take off, put on)",
        "Advanced": "Advanced verbs and their nuances (e.g., to undertake, to facilitate)"
    }

    const vocabulary_adjectives_content = {
        "Beginner": "Colors, sizes, shapes, basic emotions",
        "Intermediate": "Comparative and superlative forms, more descriptive adjectives (e.g., fascinating, terrible)",
        "Advanced": "Advanced descriptive language (e.g., intricate, minuscule)"
    }

    const vocabulary_pronouns_content = {
        "Beginner": "Basic pronouns (I, you, he, she, it, we, they)",
        "Intermediate": "Reflexive pronouns (myself, yourself) and relative pronouns (who, which)",
        "Advanced": " Indefinite pronouns (someone, anybody) and complex relative pronouns (whomever, whichever)"
    }

    const grammar_sentence_structure_question = {
        "Beginner": "Simple SVO (Subject-Verb-Object) order",
        "Intermediate": "Compound and complex sentences, For example: I ___ home because it ___ raining or She __ to the store, and she __ some milk.",
        "Advanced": "Use of subordinate clauses and participle clauses. For example: In each sentence below, identify the subordinate clause. Even though it was late, they continued working on the project."
    }
    // const grammar_tense_question = {
    //     "Beginner": ["presentsimpletense"],
    //     "Intermediate": ["pastsimpletense", "pastcontinuoustenses", "presentperfecttenses", "presentperfectcontinuoustenses", "futuretenses"],
    //     "Advanced": ["futureperfecttenses", "pastperfectcontinuous"]
    // }
    const grammar_tense_question = {
        "Beginner": "Present Simple Tense: Simple statements, negatives, and questions.",
        "Intermediate": "Present Simple Tense: Present continuous and perfect tenses.",
        "Advanced": "Present Simple Tense: Present perfect continuous and nuances in aspect."
    }
    const grammar_prepositions_question = {
        "Beginner": "Simple prepositions (in, on, at, under, over, beside)",
        "Intermediate": "Prepositional phrases and more complex prepositions (despite, during, among)",
        "Advanced": "Advanced prepositional use in idiomatic expressions and phrasal verbs"
    }

    const grammar_articles_question = {
        "Beginner": "Basic use of a, an, the",
        "Intermediate": "Specific and general use of articles, omission of articles",
        "Advanced": "Nuanced article usage, such as in academic writing"
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
                prompt = role + ` there are 3 levels :beginner, intermediate, advanced. create 3 unique fill-in-the-blank questions for the topic ${vocabulary_nouns_content[level]} suitable for ${level} learners.
    Each question should have 4 answer options in the following format:
     - Option in English (Translation in ${native_language})

    For example:
    Question: The weather is very __ today.
    Options:
    - hot (mainit)
    - warm (mainit-init)
    - cold (malamig)
    - rainy (maulan)
    Ensure that the explanation for the correct answer is also provided in ${native_language} using this` + jsonschema

                // prompt = role + `there're 3 levels :beginner, intermediate, advanced. Give me 3 unique nouns in english about ${vocabulary_nouns_content[level]}. And give me 4 translated choices in ${native_language} and answer in English and ${native_language} to test if ${level} learner understand the vocabulary using this` + jsonschema
                console.log("generate nouns Q:", prompt)

            }
            else if (picked_topic === "verbs") {
                prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique verbs questions to test if ${level} learner understand ${vocabulary_verbs_content[level]} and 4 choices in english,answer and explaination in ${native_language} using this` + jsonschema
                console.log("generate verbs Q:", prompt)

            }
            else if (picked_topic === "adjectives") {
                prompt = role + `there're 3 levels :beginner, intermediate, advanced. Give me 3 unique fill-in-the-blank Adjectives questions to test if ${level} learner understand ${vocabulary_adjectives_content[level]}, and 4 choices in english,answer and explaination in ${native_language} using this` + jsonschema
                console.log("generate adjectives Q:", prompt)

            }
            else if (picked_topic === "pronouns") {
                prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank pronouns questions to test if ${level} learner understand ${vocabulary_pronouns_content[level]} and 4 choices in english,answer and explaination in ${native_language}. Using` + jsonschema
                console.log("generate pronouns Q:", prompt)
            }
            // else if (picked_topic === "commonphrases") {
            //     prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique Common Phrases questions (Greetings, introductions, common questions (e.g., How are you?)) to test if ${level} learner understand how to response it and 4 choices in english,answer and explaination in ${native_language}. Using` + jsonschema
            // }

        }


        //present simple tense,sentence structure, prepositions, possessive pronouns (Grammar)
        else if (picked_concept === "grammar") {
            console.log("hit concept- grammar")

            //when the user pick up grammer concept, check their level and pull suitable tenses for the user
            // let tense_questions = grammar_tense_question[level]


            // if (tense_questions.includes(picked_topic)) {
            //     prompt = role + `there're 3 levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${topic} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema
            //     console.log(`user clicked grammer > ${picked_topic}`)
            //     console.log("generate tense_questions Q:", prompt)

            // }
            if (picked_topic === "presentsimpletense") {
                prompt = role + `there're 3 levels Beginner, Intermediate, Advanced. Give me 3 unique fill-in-the-blank questions for ${grammar_tense_question[level]} and 4 choices in english,answer and explaination in ${native_language} for ${level} learner using this` + jsonschema
                console.log(`user clicked grammer > ${picked_topic}`)
                console.log("generate tense_questions Q:", prompt)

            }
            else if (picked_topic === "sentencestructure") {

                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 questions about ${grammar_sentence_structure_question[level]} for ${level} learners with 4 options in english, answer and explanation in ${native_language} for ${level} learners using this` + jsonschema
                console.log("generate sentencestructure Q:", prompt)

            }
            else if (picked_topic === "prepositions") {
                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 questions about ${grammar_prepositions_question[level]} for ${level} learners with 4 options in English, answer and explanation in ${native_language} using this` + jsonschema
                console.log("generate prepositions Q:", prompt)

            }
            // else if (picked_topic === "possessivepronouns") {
            //     prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 practices for ${level} learners to test if they understand Possessive Pronouns. The practice includes a question and 4 options in English, answer and explanation in ${native_language} using this` + jsonschema
            //     console.log("generate possessivepronouns Q:", prompt)

            // }
            else if (picked_topic === "articles") {
                prompt = role + ` There are 3 levels: Beginner, Intermediate, and Advanced. Create 3 practices about ${grammar_articles_question[level]} for ${level} learners with 4 options in English, answer and explanation in ${native_language} using this` + jsonschema
                console.log("generate possessivepronouns Q:", prompt)

            }
        }

        //family and friends, daily routines,shopping , food and drink (Everyday Situations)
        else if (picked_concept === "everydaysituations") {
            console.log("hit concept- everydaysituations")
            prompt = role + `there're 3 levels :Beginner, Intermediate, Advanced. Give me 3 unique questions about  ${topic} to test if  ${level} learner understand how to response or ask the question and 4 choices in english,answer and explaination in ${native_language}. using this` + jsonschema
            console.log("generate everydaysituations Q:", prompt)

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
