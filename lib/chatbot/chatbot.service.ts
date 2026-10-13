import Groq from "groq-sdk"
import { doctor } from "@/app/data/doctor.data"
import { doctorsData } from "@/app/data/doctor.data"
import { faqs } from "@/app/data/faq.data"
import { testimonials } from "@/app/data/testimonial.data"
import { locations } from "@/app/data/location.data"
import { clinicData } from "@/app/data/clinic.data"
import { CHATBOT_SYSTEM_PROMPT } from "./chatbot.prompt"
import type { ChatMessage } from "./chatbot.types"

const groq=new Groq({
    apiKey:process.env.GROQ_API_KEY
});

function getClinicContext():string{
    const clinicInformation={
     doctorProfile: doctor,
    doctors: doctorsData,
    frequentlyAskedQuestions: faqs,
    testimonials,
    locations,
    clinic: clinicData,   
    }
    return JSON.stringify(clinicInformation,null,2);
}

export async function generateChatbotReply(
    message:string,
    history:ChatMessage[]=[]
):Promise<string>{
    const clinicContext=getClinicContext();
    const recentHistory=history.slice(-10).map((item)=>({
        role:item.role,
        content:item.content.slice(0,2000),
    }));

    const completion=await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_completion_tokens: 800,  
    messages:[
       {
        role: "system",
        content:
          CHATBOT_SYSTEM_PROMPT +
          "\n\nClinic information (JSON):\n" +
          clinicContext,
      },
      ...recentHistory,
         {
        role: "user",
        content: message,
      },
            
    ],
    });
    const reply=completion.choices[0]?.message?.content;
     if (!reply || typeof reply !== "string") {
    throw new Error("The chatbot returned an empty response.");
  }
  return reply;

}