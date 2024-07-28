const { getConceptsFromDB, addConceptToDB } = require('../services/conceptService');

const getConcepts = async (req, res) => {
    try {
        const concepts = await getConceptsFromDB();
        res.status(200).json('concepts: ', concepts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addConcept = async (req, res) => {
    const { concept_name, level, status } = req.body;
    try {
        const newConcept = await addConceptToDB({ concept_name, level, status });
        res.status(201).json({ message: 'Concept added' , id: newConcept });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getConcepts, addConcept };
