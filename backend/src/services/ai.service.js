const { GoogleGenAI } =require("@google/genai");

const ai = new GoogleGenAI({});

const getAIResponse = async (prompt)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:prompt,
        config: {
            systemInstruction: `
            Give Short but correct ans in one line.
            `
        }
    });
    return response.text;
}

module.exports={getAIResponse};