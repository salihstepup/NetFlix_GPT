const languageConstants = {
  en: {
    search: "Search",
    gptSearchPlaceholder: "What would you like to watch today?",
  },
  hindi: {
    search: "खोजें",
    gptSearchPlaceholder: "आज आप क्या देखना चाहेंगे?",
  },
  spanish: {
    search: "Buscar",
    gptSearchPlaceholder: "¿Qué te gustaría ver hoy?",
  },
} as const; //as const to make it read only object by avoiding TS errors

export type LanguageKey = keyof typeof languageConstants;
// "en" | "hindi" | "spanish"

export default languageConstants;
