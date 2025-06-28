export interface Question {
  id: string;
  text: string;
  type: 'truth' | 'dare';
  theme: 'funny' | 'flirty' | 'deep' | 'naughty';
}

export const questions: Question[] = [
  // Funny Truth Questions
  { id: '1', text: 'What\'s the weirdest dream you\'ve ever had about someone in this room?', type: 'truth', theme: 'funny' },
  { id: '2', text: 'If you could only communicate through song lyrics for a day, what would you say to your crush?', type: 'truth', theme: 'funny' },
  { id: '3', text: 'What\'s the most embarrassing thing you\'ve done to get someone\'s attention?', type: 'truth', theme: 'funny' },
  
  // Flirty Truth Questions
  { id: '4', text: 'What\'s your ideal first date scenario?', type: 'truth', theme: 'flirty' },
  { id: '5', text: 'Who in this room would you want to be stranded on a desert island with?', type: 'truth', theme: 'flirty' },
  { id: '6', text: 'What\'s the sweetest thing someone has ever done for you?', type: 'truth', theme: 'flirty' },
  
  // Deep Truth Questions
  { id: '7', text: 'What do you think love really means?', type: 'truth', theme: 'deep' },
  { id: '8', text: 'What\'s your biggest fear when it comes to relationships?', type: 'truth', theme: 'deep' },
  { id: '9', text: 'If you could change one thing about how you handle emotions, what would it be?', type: 'truth', theme: 'deep' },
  
  // Naughty Truth Questions
  { id: '10', text: 'What\'s the most romantic gesture you\'ve ever wanted someone to do for you?', type: 'truth', theme: 'naughty' },
  { id: '11', text: 'What\'s your biggest turn-on in a relationship?', type: 'truth', theme: 'naughty' },
  { id: '12', text: 'What\'s the most attractive quality someone can have?', type: 'truth', theme: 'naughty' },
  
  // Funny Dare Questions
  { id: '13', text: 'Serenade someone in the room with a love song of your choice', type: 'dare', theme: 'funny' },
  { id: '14', text: 'Do your best impression of someone when they\'re falling in love', type: 'dare', theme: 'funny' },
  { id: '15', text: 'Create and perform a 30-second romantic commercial for yourself', type: 'dare', theme: 'funny' },
  
  // Flirty Dare Questions
  { id: '16', text: 'Give someone in the room your best compliment', type: 'dare', theme: 'flirty' },
  { id: '17', text: 'Write a short love poem about the person to your right', type: 'dare', theme: 'flirty' },
  { id: '18', text: 'Describe your perfect partner using only the people in this room as examples', type: 'dare', theme: 'flirty' },
  
  // Deep Dare Questions
  { id: '19', text: 'Share a meaningful memory you have with someone in this room', type: 'dare', theme: 'deep' },
  { id: '20', text: 'Tell someone in the room something you\'ve always admired about them', type: 'dare', theme: 'deep' },
  { id: '21', text: 'Share what you think your love language is and why', type: 'dare', theme: 'deep' },
  
  // Naughty Dare Questions
  { id: '22', text: 'Describe your ideal romantic evening in detail', type: 'dare', theme: 'naughty' },
  { id: '23', text: 'Give someone a heartfelt hug for 10 seconds', type: 'dare', theme: 'naughty' },
  { id: '24', text: 'Share what you find most attractive about each person in the room', type: 'dare', theme: 'naughty' },
];

// AI-powered question generation
export async function generateAIQuestion(type: 'truth' | 'dare', theme: 'funny' | 'flirty' | 'deep' | 'naughty'): Promise<Question> {
  try {
    const response = await fetch('/api/generate-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, theme }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate question');
    }

    const data = await response.json();
    
    return {
      id: `ai-${Date.now()}`,
      text: data.question,
      type,
      theme,
    };
  } catch (error) {
    console.error('Error generating AI question:', error);
    // Fallback to predefined questions
    return getRandomQuestion(type, theme);
  }
}

export function getRandomQuestion(type: 'truth' | 'dare', theme: 'funny' | 'flirty' | 'deep' | 'naughty'): Question {
  const filteredQuestions = questions.filter(q => q.type === type && q.theme === theme);
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex] || questions[0];
}