
import { GoogleGenAI, Type } from "@google/genai";
import { AIFollowUpStyle, AIInsight, Campaign } from "../types";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

// Initialize the client directly with the API key from environment variables.
// Removed the fallback to "DUMMY_KEY" to prevent authentication errors with an invalid key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateColdEmail = async (niche: string, location: string, problem: string, offer: string, tone: string): Promise<string> => {
  if (!process.env.API_KEY) {
      return Promise.resolve(`--- MOCK EMAIL (API Key not configured) ---

Subject: A Personalized Offer for [Company Name]

Hi [First Name],

I'm reaching out because I noticed you're a key player in the ${niche} space in ${location}. I understand that a common challenge is ${problem}.

At [Your Company], we specialize in helping businesses like yours with ${offer}. Our solution helps companies achieve [Specific Benefit 1] and [Specific Benefit 2], directly addressing the issues you might be facing.

Would you be open to a brief 15-minute chat next week to explore how we could help [Company Name]?

Best regards,

[Your Name]`);
  }
    
  const prompt = `
    You are LeadForge AI, an expert cold email copywriter. Your task is to write a highly personalized and effective cold email.

    **Instructions:**
    1.  The email should be concise, professional, and compelling.
    2.  Use placeholders like '[First Name]' and '[Company Name]' where appropriate.
    3.  The email must be tailored to the specific inputs provided.
    4.  Do not include a subject line unless it's exceptionally creative. Start with the body of the email.
    5.  End with a clear and low-friction call-to-action.
    6.  The entire response should be only the email text. Do not add any extra text, headings, or markdown.

    **Email Details:**
    *   **Recipient's Niche:** ${niche}
    *   **Recipient's Location:** ${location}
    *   **Problem You Solve:** ${problem}
    *   **My Offer:** ${offer}
    *   **Desired Tone:** ${tone}

    Now, write the email.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating email with Gemini API:", error);
    return "We're sorry, but we couldn't generate an email at this time. Please check your API key and try again.";
  }
};


export const generateFollowUpEmail = async (niche: string, problem: string, offer: string, followUpStyle: AIFollowUpStyle): Promise<string> => {
  if (!process.env.API_KEY) {
      return Promise.resolve(`--- MOCK FOLLOW-UP EMAIL (API Key not configured) ---

Subject: Re: A Personalized Offer for [Company Name]

Hi [First Name],

Just wanted to quickly follow up on my previous email regarding our offer to help with ${problem}.

We help ${niche} companies like yours with ${offer}, and I believe we could provide significant value.

Is this something that interests you?

Best regards,

[Your Name]`);
  }
    
  const prompt = `
    You are LeadForge AI, an expert at writing concise and effective follow-up emails. Your task is to write a follow-up to a previous cold email that has not yet received a response.

    **Context of the first email:**
    *   **Recipient's Niche:** ${niche}
    *   **Problem We Solve:** ${problem}
    *   **Our Offer:** ${offer}

    **Instructions:**
    1.  The follow-up should be very brief and to the point.
    2.  Use placeholders like '[First Name]' where appropriate.
    3.  Refer gently to the previous email without repeating all the details.
    4.  The entire response should be only the email text. Do not add any extra text, headings, or markdown.
    5.  Adapt the email to the specified follow-up style.

    **Follow-up Style:** ${followUpStyle}

    Now, write the follow-up email.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 1,
        topK: 1,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating follow-up email with Gemini API:", error);
    return "We're sorry, but we couldn't generate a follow-up at this time. Please check your API key and try again.";
  }
};


export const generateAnalyticsInsights = async (campaigns: Campaign[]): Promise<string> => {
    const mockInsights: AIInsight[] = [
        {
          type: 'strategy',
          content: 'Target Fintech companies in the UK struggling with outdated legacy systems by offering custom software development.',
          reason: 'The "Fintech Prospecting" campaign was your top performer, indicating a strong product-market fit in this area.',
          performanceMetric: '9.1% Reply Rate',
          strategyDetails: {
              niche: 'Fintech',
              problem: 'outdated legacy systems',
              offer: 'custom software development'
          }
        },
        {
          type: 'optimization',
          targetCampaignName: 'E-commerce Onboarding',
          content: "Refine the 'problem' to be more specific, like 'low conversion rates from abandoned carts'.",
          reason: 'Your most successful campaigns address a very specific, high-value problem. The current problem is too general.',
          performanceMetric: '4.1% Reply Rate'
        },
        {
          type: 'subject_line',
          content: 'A new way for [Company Name] to tackle high churn',
          reason: "Focusing on a specific problem in the subject line creates immediate relevance, as seen in your successful 'SaaS Outreach' campaign.",
          performanceMetric: '7.2% Reply Rate'
        }
    ];
    
    if (!process.env.API_KEY || !campaigns || campaigns.length === 0) {
        return Promise.resolve(JSON.stringify(mockInsights));
    }

    const prompt = `
        You are LeadForge AI, an expert data analyst and marketing strategist. Your task is to analyze campaign performance data and provide actionable insights to help the user improve their outreach.

        **Instructions:**
        1.  Analyze the provided campaign data, focusing on the correlation between niche, problem, offer, and replyRate.
        2.  **Identify the top strategy:** Find the campaign with the highest replyRate. Create a 'strategy' insight detailing its niche, problem, and offer.
        3.  **Identify an opportunity:** Find a campaign with a low replyRate (but not zero). Create an 'optimization' insight suggesting a specific change to its 'problem' or 'offer' to align it more with successful campaigns.
        4.  **Identify a winning pattern:** Imagine a compelling subject line for one of the high-performing campaigns. Create a 'subject_line' insight based on this pattern.
        5.  The entire response must be a JSON array of objects, matching the provided schema. Do not include any extra text, headings, or markdown.

        **Campaign Data:**
        ${JSON.stringify(campaigns, null, 2)}

        Now, provide exactly 3 insights in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.5,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            content: { type: Type.STRING },
                            reason: { type: Type.STRING },
                            performanceMetric: { type: Type.STRING },
                            targetCampaignName: { type: Type.STRING },
                            strategyDetails: {
                                type: Type.OBJECT,
                                properties: {
                                    niche: { type: Type.STRING },
                                    problem: { type: Type.STRING },
                                    offer: { type: Type.STRING },
                                }
                            }
                        }
                    }
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating analytics insights with Gemini API:", error);
        // Fallback to mock data on error
        return JSON.stringify(mockInsights);
    }
};

export const generateCampaignStrategy = async (campaigns: Campaign[]): Promise<{niche: string, location: string, problem: string, offer: string}> => {
  const mockStrategy = {
    niche: 'B2B SaaS',
    location: 'USA',
    problem: 'integrating with multiple third-party APIs',
    offer: 'a unified API integration platform'
  };

  if (!process.env.API_KEY || !campaigns || campaigns.length === 0) {
      return Promise.resolve(mockStrategy);
  }

  const prompt = `
    You are a growth hacking AI. Analyze the following campaign data which includes niche, problem, offer, and performance metrics. Identify the characteristics of the most successful campaigns (those with the highest reply rates). 
    
    Based on your analysis, synthesize a *NEW* campaign strategy. Provide a target niche, a plausible location for that niche, a common problem they face, and a compelling offer to solve it. 
    
    Respond ONLY with a JSON object matching the schema, with no extra text or markdown.

    **Campaign Data:**
    ${JSON.stringify(campaigns, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            niche: { type: Type.STRING },
            location: { type: Type.STRING },
            problem: { type: Type.STRING },
            offer: { type: Type.STRING },
          }
        }
      }
    });
    // The response text is a JSON string, so we parse it.
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating campaign strategy with Gemini API:", error);
    return mockStrategy;
  }
};
