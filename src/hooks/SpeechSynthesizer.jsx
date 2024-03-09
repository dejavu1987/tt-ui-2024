import { useEffect, useState } from "react";

const speechSynth = new SpeechSynthesisUtterance();

const useVoiceSynthesizer = () => {
  const [voices, setVoices] = useState([]);
  const [lang, setLang] = useState("en-US");
  const [selectedVoice, setSelectedVoice] = useState(
    localStorage.getItem("selectedVoice") || 0
  );

  useEffect(() => {
    const populateVoiceList = () => {
      if (typeof speechSynthesis === "undefined") {
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
      setLang(voices.length ? voices[selectedVoice].lang : "en-US");
      speechSynth.voice = voices[selectedVoice];
    };

    populateVoiceList();
    if (
      typeof speechSynthesis !== "undefined" &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    return () => {
      if (
        typeof speechSynthesis !== "undefined" &&
        speechSynthesis.onvoiceschanged !== undefined
      ) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  const handleVoicesChange = (e) => {
    const value = e.target.value;
    localStorage.setItem("selectedVoice", value);
    setSelectedVoice(value);
    setLang(voices[value].lang);
    speechSynth.voice = voices[value];
  };

  return {
    voices,
    lang,
    selectedVoice,
    handleVoicesChange,
    speechSynth,
  };
};

export { useVoiceSynthesizer };
