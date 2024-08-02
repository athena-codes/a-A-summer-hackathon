const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

const genAI = new GoogleGenerativeAI(API_KEY);




//generate questions from ai

async function generateQuestionsByAI(native_language, level) {
    console.log("am i hitting get ai functions and check the user level: ", native_language, level)
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    // const prompt = `You're an English teacher, there're 3 student levels - begineer, itermediate, advanced , I'm teaching ${native_language} as native language ${level} learner, provide a JavaScript Object Notation format includes 1 fill-in-the-blank question for present simple tense in english, mutiple choices ,answer and explaination in ${native_language} for ${level} learner.`
    const prompt = `You're an English teacher there're 3 student levels begineer, itermediate, advanced. Give me 1 fill-in-the-blank question for present simple tense and mutiple choices in english,answer and explaination in ${native_language} for ${level} learner using using this JSON schema: { "question": "string",  "options": "array",  "answer": "string",  "explanation":"string"}.`


    const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();
    const jsonString = result.response.text();

    console.log("jsonString: ", jsonString);

    console.log("------------------------------")
    let jsonData = JSON.parse(jsonString)
    console.log("jsonData: ", jsonData);


    return jsonData
}


module.exports = {
    generateQuestionsByAI
};
