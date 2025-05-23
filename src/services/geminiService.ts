
const GEMINI_API_KEY = 'AIzaSyDFdlJr9ygM0iZv4owcM_t-WBpyisuEgP4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  static async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }
      
      throw new Error('No content generated');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate content with Gemini API');
    }
  }

  static async generateMockQuestions(topic: string, difficulty: string): Promise<any[]> {
    const prompt = `Generate 10 multiple choice questions for ${topic} at ${difficulty} difficulty level. 
    Return as JSON array with format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0, "explanation": "..."}]`;
    
    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      // Fallback mock questions if JSON parsing fails
      return [
        {
          question: `What is a fundamental concept in ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "This is the correct answer because..."
        }
      ];
    }
  }

  static async generateStudyPlan(skills: string[], experience: string): Promise<string> {
    const prompt = `Create a personalized study plan for someone with ${experience} experience in these skills: ${skills.join(', ')}. 
    Include recommended topics, timeline, and resources. Keep it practical and actionable.`;
    
    return await this.generateContent(prompt);
  }

  static async generateInterviewQuestions(role: string, company: string): Promise<string> {
    const prompt = `Generate 5 common interview questions for a ${role} position at ${company}. 
    Include both technical and behavioral questions with brief tips for answering each.`;
    
    return await this.generateContent(prompt);
  }
}
