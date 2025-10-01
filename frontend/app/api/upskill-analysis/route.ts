// This file runs on the server (Edge Runtime is assumed for Vercel/Next.js deployments)
import { NextRequest, NextResponse } from 'next/server';

// Define the required structure for the incoming request body
interface RequestBody {
    resumeText: string;
    jobRole: string;
}

// Rename your environment variable to be private/server-only
const apiKey = process.env.GEMINI_API_KEY; 

// Base configuration for the LLM
const model = 'gemini-2.5-flash-preview-05-20';
// NOTE: apiUrl is now defined inside POST to ensure apiKey check is first.

// Define the structured schema (same as before)
const responseSchema = {
    type: "OBJECT",
    properties: {
        targetRole: { type: "STRING", description: "The specific job role analyzed." },
        fitScore: { type: "NUMBER", description: "The student's current fit score (0-100) for the role based on the resume." },
        coreGaps: { type: "ARRAY", items: { type: "STRING" }, description: "3-5 most critical skill gaps identified." },
        analysisSummary: { type: "STRING", description: "A concise 2-3 sentence summary of the key findings." },
        roadmap: {
            type: "ARRAY",
            description: "The structured 4-phase roadmap.",
            items: {
                type: "OBJECT",
                properties: {
                    phaseNumber: { type: "NUMBER" },
                    title: { type: "STRING" },
                    durationEstimate: { type: "STRING" },
                    goals: { type: "ARRAY", items: { type: "STRING" } },
                    actionItems: { type: "ARRAY", items: { type: "STRING" } },
                    resources: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                type: { type: "STRING", enum: ['Project', 'Course', 'Book', 'Repository', 'Certification'] },
                                title: { type: "STRING" },
                                description: { type: "STRING" },
                                link: { type: "STRING" }
                            },
                            propertyOrdering: ["type", "title", "description", "link"]
                        }
                    }
                },
                propertyOrdering: ["phaseNumber", "title", "durationEstimate", "goals", "actionItems", "resources"]
            }
        }
    },
    required: ["targetRole", "fitScore", "coreGaps", "analysisSummary", "roadmap"]
};


export async function POST(req: NextRequest) {
    // 1. MANDATORY: Check if the API key is available in the server environment
    if (!apiKey) {
        console.error('CRITICAL ERROR: GEMINI_API_KEY is not set in environment variables.');
        return new NextResponse(JSON.stringify({ error: 'Server-side GEMINI_API_KEY is missing. Check your .env.local file.' }), { status: 500 });
    }
    
    // Define apiUrl here after confirming apiKey exists
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;


    try {
        const { resumeText, jobRole } = await req.json() as RequestBody;

        if (!resumeText || !jobRole) {
            return new NextResponse(JSON.stringify({ error: 'Missing resumeText or jobRole in request body.' }), { status: 400 });
        }
        
        // System prompt updated to remove mention of Google Search grounding
        const systemPrompt = `Act as a world-class AI Career Architect and LLM expert. Your task is to perform a deep, hyper-personalized analysis of the provided resume against the demanding skills for the target role: "${jobRole}". Identify critical skill gaps. Generate a structured, 4-phase, highly actionable roadmap (Foundational, Intermediate, Advanced, Portfolio Polish) to close these gaps. The output MUST be a valid JSON object matching the provided schema. Ensure resource links are placeholders or descriptive titles if actual URLs are unavailable.`;
        const userQuery = `Target Role: ${jobRole}. Analyze the following resume content and generate the full structured roadmap and analysis:\n\n--- RESUME START ---\n${resumeText}\n--- RESUME END ---`;


        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            // CRITICAL FIX: Removed 'tools: [{ "google_search": {} }]' 
            // because it conflicts with responseMimeType: "application/json"
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        };

        // Call the Gemini API server-side
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            // Read the error response body for detailed debugging
            let errorDetails = 'Unknown error';
            try {
                const errorJson = await geminiResponse.json();
                errorDetails = JSON.stringify(errorJson, null, 2);
            } catch (e) {
                 errorDetails = await geminiResponse.text();
            }
            
            console.error('Gemini API Error Response:', geminiResponse.status, errorDetails);
            
            // Highly likely API Key/Auth failure if status is 400 here, as the payload structure is validated
            const clientError = geminiResponse.status === 400 
                ? `AI model call failed with status 400. This often indicates an invalid or unauthorized GEMINI_API_KEY.`
                : `AI model call failed with status ${geminiResponse.status}. See server logs for details.`;

            // Return a generic error to the client, but log the details server-side
            return new NextResponse(
                JSON.stringify({ error: clientError }), 
                { status: geminiResponse.status }
            );
        }

        const result = await geminiResponse.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!jsonText) {
            console.error("Gemini model response was empty or malformed.");
            return new NextResponse(JSON.stringify({ error: 'AI model failed to generate valid JSON content.' }), { status: 500 });
        }
        
        // CRITICAL: The model might return a stringified JSON object inside the text field. We parse it here.
        const finalJson = JSON.parse(jsonText);

        // Return the parsed JSON content directly to the client
        return new NextResponse(JSON.stringify(finalJson), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('API Route execution failed:', error);
        // This usually means JSON parsing failed or a network issue occurred
        return new NextResponse(JSON.stringify({ error: `Internal Server Error during AI processing: ${error instanceof Error ? error.message : 'Unknown'}` }), { status: 500 });
    }
}
