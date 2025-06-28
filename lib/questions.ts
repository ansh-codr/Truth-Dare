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
  { id: '4', text: 'What\'s the silliest thing you\'ve done when you had a crush on someone?', type: 'truth', theme: 'funny' },
  { id: '5', text: 'If you were a dating app, what would your bio say?', type: 'truth', theme: 'funny' },
  
  // Flirty Truth Questions
  { id: '6', text: 'What\'s your ideal first date scenario?', type: 'truth', theme: 'flirty' },
  { id: '7', text: 'Who in this room would you want to be stranded on a desert island with?', type: 'truth', theme: 'flirty' },
  { id: '8', text: 'What\'s the sweetest thing someone has ever done for you?', type: 'truth', theme: 'flirty' },
  { id: '9', text: 'What\'s your biggest turn-on in a personality?', type: 'truth', theme: 'flirty' },
  { id: '10', text: 'What\'s the most romantic gesture you\'ve ever received?', type: 'truth', theme: 'flirty' },
  
  // Deep Truth Questions
  { id: '11', text: 'What do you think love really means?', type: 'truth', theme: 'deep' },
  { id: '12', text: 'What\'s your biggest fear when it comes to relationships?', type: 'truth', theme: 'deep' },
  { id: '13', text: 'If you could change one thing about how you handle emotions, what would it be?', type: 'truth', theme: 'deep' },
  { id: '14', text: 'What\'s the most important lesson you\'ve learned about love?', type: 'truth', theme: 'deep' },
  { id: '15', text: 'What does your perfect relationship look like?', type: 'truth', theme: 'deep' },
  
  // Naughty Truth Questions
  { id: '16', text: 'What\'s the most romantic gesture you\'ve ever wanted someone to do for you?', type: 'truth', theme: 'naughty' },
  { id: '17', text: 'What\'s your biggest turn-on in a relationship?', type: 'truth', theme: 'naughty' },
  { id: '18', text: 'What\'s the most attractive quality someone can have?', type: 'truth', theme: 'naughty' },
  { id: '19', text: 'What\'s your idea of the perfect romantic evening?', type: 'truth', theme: 'naughty' },
  { id: '20', text: 'What\'s something that instantly makes you attracted to someone?', type: 'truth', theme: 'naughty' },
  
  // Funny Dare Questions
  { id: '21', text: 'Serenade someone in the room with a love song of your choice', type: 'dare', theme: 'funny' },
  { id: '22', text: 'Do your best impression of someone when they\'re falling in love', type: 'dare', theme: 'funny' },
  { id: '23', text: 'Create and perform a 30-second romantic commercial for yourself', type: 'dare', theme: 'funny' },
  { id: '24', text: 'Act out your most embarrassing romantic moment', type: 'dare', theme: 'funny' },
  { id: '25', text: 'Do a dramatic reading of the cheesiest pickup line you know', type: 'dare', theme: 'funny' },
  
  // Flirty Dare Questions
  { id: '26', text: 'Give someone in the room your best compliment', type: 'dare', theme: 'flirty' },
  { id: '27', text: 'Write a short love poem about the person to your right', type: 'dare', theme: 'flirty' },
  { id: '28', text: 'Describe your perfect partner using only the people in this room as examples', type: 'dare', theme: 'flirty' },
  { id: '29', text: 'Give someone a genuine compliment about their personality', type: 'dare', theme: 'flirty' },
  { id: '30', text: 'Tell someone what you find most attractive about them', type: 'dare', theme: 'flirty' },
  
  // Deep Dare Questions
  { id: '31', text: 'Share a meaningful memory you have with someone in this room', type: 'dare', theme: 'deep' },
  { id: '32', text: 'Tell someone in the room something you\'ve always admired about them', type: 'dare', theme: 'deep' },
  { id: '33', text: 'Share what you think your love language is and why', type: 'dare', theme: 'deep' },
  { id: '34', text: 'Express gratitude to someone in the room for something they\'ve done', type: 'dare', theme: 'deep' },
  { id: '35', text: 'Share your biggest relationship goal with the group', type: 'dare', theme: 'deep' },
  
  // Naughty Dare Questions
  { id: '36', text: 'Describe your ideal romantic evening in detail', type: 'dare', theme: 'naughty' },
  { id: '37', text: 'Give someone a heartfelt hug for 10 seconds', type: 'dare', theme: 'naughty' },
  { id: '38', text: 'Share what you find most attractive about each person in the room', type: 'dare', theme: 'naughty' },
  { id: '39', text: 'Describe the perfect kiss without using your hands', type: 'dare', theme: 'naughty' },
  { id: '40', text: 'Tell someone what you would do on a romantic date with them', type: 'dare', theme: 'naughty' },
];

// Generate dynamic questions based on theme and type
export function generateDynamicQuestion(type: 'truth' | 'dare', theme: 'funny' | 'flirty' | 'deep' | 'naughty'): Question {
  const templates = {
    truth: {
      funny: [
        "What's the weirdest thing you've done when you had a crush?",
        "If you were a romantic comedy character, what would be your signature move?",
        "What's the most embarrassing text you've sent to the wrong person?",
        "If you could only flirt using movie quotes, which movie would you choose?",
        "What's the silliest reason you've ever had a crush on someone?",
        "What's your most awkward dating story?",
        "If you had to describe your love life as a movie genre, what would it be?",
        "What's the funniest pickup line you've ever heard or used?"
      ],
      flirty: [
        "What's your idea of the perfect romantic gesture?",
        "What's the most attractive quality in a person?",
        "What would make you fall for someone instantly?",
        "What's your dream date location?",
        "What's the sweetest thing someone could say to you?",
        "What's your biggest romantic fantasy?",
        "What instantly catches your attention about someone?",
        "What's the most romantic thing you've ever done for someone?"
      ],
      deep: [
        "What does true love mean to you?",
        "What's the most important thing in a relationship?",
        "How do you know when you really care about someone?",
        "What's your biggest relationship fear?",
        "What would you never compromise on in love?",
        "What's the most valuable lesson you've learned about relationships?",
        "How do you show someone you care about them?",
        "What does emotional intimacy mean to you?"
      ],
      naughty: [
        "What's your biggest romantic fantasy?",
        "What instantly makes you attracted to someone?",
        "What's the most romantic thing you've ever wanted to do?",
        "What's your idea of perfect chemistry?",
        "What's the most seductive quality someone can have?",
        "What's your biggest turn-on?",
        "What's the most passionate thing you've ever experienced?",
        "What would be your ideal romantic evening?"
      ]
    },
    dare: {
      funny: [
        "Act out your most embarrassing romantic moment",
        "Do a dramatic reading of a cheesy pickup line",
        "Perform a love song using only humming",
        "Act like you're on a terrible first date",
        "Do your best 'falling in love' face",
        "Create a funny dating profile for yourself out loud",
        "Act out a romantic scene from a movie badly",
        "Do an impression of someone trying to be smooth"
      ],
      flirty: [
        "Give someone your most genuine compliment",
        "Describe what makes someone in this room attractive",
        "Write a short poem about love",
        "Give someone a meaningful look for 10 seconds",
        "Tell someone what you admire about them",
        "Compliment everyone in the room",
        "Share what you find attractive about the person next to you",
        "Give someone your best smile for 15 seconds"
      ],
      deep: [
        "Share your most meaningful relationship memory",
        "Express genuine gratitude to someone here",
        "Share what you've learned about love",
        "Tell someone how they've impacted your life",
        "Share your biggest relationship goal",
        "Open up about what makes you feel loved",
        "Share a moment when you felt truly understood",
        "Tell someone something you've never told them before"
      ],
      naughty: [
        "Describe your perfect romantic evening",
        "Give someone a 15-second hug",
        "Share what you find irresistible in a person",
        "Describe the perfect kiss",
        "Tell someone what you'd do on a dream date with them",
        "Share your most romantic desire",
        "Describe what passion means to you",
        "Share your idea of the perfect romantic gesture"
      ]
    }
  };

  const themeTemplates = templates[type][theme];
  const randomTemplate = themeTemplates[Math.floor(Math.random() * themeTemplates.length)];
  
  return {
    id: `dynamic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text: randomTemplate,
    type,
    theme,
  };
}

export function getRandomQuestion(type: 'truth' | 'dare', theme: 'funny' | 'flirty' | 'deep' | 'naughty'): Question {
  const filteredQuestions = questions.filter(q => q.type === type && q.theme === theme);
  
  if (filteredQuestions.length === 0) {
    // Fallback to any question of the same type
    const typeQuestions = questions.filter(q => q.type === type);
    const randomIndex = Math.floor(Math.random() * typeQuestions.length);
    return typeQuestions[randomIndex] || questions[0];
  }
  
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
}