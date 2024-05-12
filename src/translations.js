const translations = {
  de: {
    and: "und",
    serves: "dient",
    versus: "gegen",
  },
  ru: {
    and: "и",
    serves: "подаёт",
    versus: "против",
  },
  es: {
    and: "y",
    serves: "sirve",
  },
  ja: {
    and: "そして",
    versus: "対",
  },
  ko: {
    and: "과",
    versus: "대",
  },
  zh: {
    and: "和",
    versus: "与",
  },
  fr: {
    and: "et",
    versus: "contre",
  },
  it: {
    and: "e",
    versus: "contro",
  },
  pt: { and: "e" },
  hi: {
    and: "और",
    serves: "की बारी",
    versus: "विरूद्ध",
  },
};

const t = (string, langPrefix) => {
  if (
    langPrefix === "en" ||
    !Object.prototype.hasOwnProperty.call(translations, langPrefix)
  )
    return string;
  else {
    if (translations[langPrefix][string])
      return translations[langPrefix][string];
    else {
      console.warn(`"${string}" needs translation in language "${langPrefix}"`);
      return string;
    }
  }
};

export default t;
