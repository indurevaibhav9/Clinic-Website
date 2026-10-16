
import Groq from "groq-sdk";

if(!process.env.GROQ_API_KEY){
    throw new Error("Groq API key is missing from .env");
}

export const groq=new Groq({
    apiKey:process.env.GROQ_API_KEY
});
