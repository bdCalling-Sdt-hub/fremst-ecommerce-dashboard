import { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with your actual API key

export const useTranslate = (text) => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translateText = async () => {
      if (language === "en") {
        setTranslatedText(text); // No need to translate if it's English
        return;
      }

      try {
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
          {
            q: text,
            target: language,
          }
        );
        setTranslatedText(response.data.data.translations[0].translatedText);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      }
    };

    translateText();
  }, [text, language]);

  return translatedText;
};
