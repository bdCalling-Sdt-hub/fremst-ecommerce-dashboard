import React, { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Ensure the script is only added once
    if (!window.googleTranslateLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateLoaded = true;
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,sv", autoDisplay: false },
        "google_translate_element"
      );
    };
  }, []);

  const changeLanguage = () => {
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      const newLang = language === "en" ? "sv" : "en"; // Toggle between English & Swedish
      selectElement.value = newLang;
      selectElement.dispatchEvent(new Event("change"));
      setLanguage(newLang);
    }
  };

  return (
    <button
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={changeLanguage}
    >
      <FaGlobe /> {language === "en" ? "Swedish" : "English"}
    </button>
  );
};

export default LanguageToggle;
