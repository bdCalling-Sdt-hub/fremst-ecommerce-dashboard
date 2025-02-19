import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translateText } from "../utils/translateText";

export const useTranslateWebsite = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (language === "en") return; // No translation needed for English

    const elements = document.querySelectorAll("body *:not(script):not(style)");
    const textNodes = [];

    elements.forEach((el) => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        textNodes.push({ node: el.childNodes[0], text: el.innerText });
      }
    });

    const textArray = textNodes.map((item) => item.text);

    translateText(textArray, language).then((translations) => {
      textNodes.forEach((item, index) => {
        item.node.nodeValue = translations[index];
      });
    });
  }, [language]);
};
