const { GoogleGenAI } =require("@google/genai");

const ai = new GoogleGenAI({});

const getAIResponse = async (prompt)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:prompt,
        config: {
            systemInstruction: `
            You are and expart in generating caption.
            You generate single caption.
            Your caption should be short and consise.
            You use emojis in caption.
            Generate caption in tapori language with few slang language.
            Create aesthetic caption.
            `
        }
    });
    return response.text;
}

module.exports={getAIResponse};