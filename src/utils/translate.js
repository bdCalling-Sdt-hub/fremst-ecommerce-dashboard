import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API;
const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translateText = async (textArray, targetLanguage) => {
  try {
    const response = await axios.post(API_URL, {
      q: textArray,
      target: targetLanguage,
      format: "text",
    });

    return response.data.data.translations.map((t) => t.translatedText);
  } catch (error) {
    console.error("Translation failed:", error);
    return textArray; // Return original text if translation fails
  }
};
