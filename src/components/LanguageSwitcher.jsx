import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      style={{ padding: "5px", fontSize: "16px" }}
    >
      <option value="en">English</option>
      <option value="sv">Swedish</option>
    </select>
  );
};

export default LanguageSwitcher;
