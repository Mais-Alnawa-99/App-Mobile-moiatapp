import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import Tts from 'react-native-tts';

const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [ready, setReady] = useState(false);
  const speakingRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Tts.setDefaultRate(0.55);
    } else {
      Tts.setDefaultRate(0.5, true);
    }
    Tts.setDefaultPitch(1.0);

    const onStart = () => {
      speakingRef.current = true;
      setSpeaking(true);
    };
    const onFinish = () => {
      speakingRef.current = false;
      setSpeaking(false);
    };
    const onCancel = () => {
      speakingRef.current = false;
      setSpeaking(false);
    };

    const s1 = Tts.addEventListener('tts-start', onStart);
    const s2 = Tts.addEventListener('tts-finish', onFinish);
    const s3 = Tts.addEventListener('tts-cancel', onCancel);

    Tts.voices()
      .then(() => setReady(true))
      .catch(() => setReady(true));

    return () => {
      s1?.remove();
      s2?.remove();
      s3?.remove();
      Tts.stop();
    };
  }, []);

  const chunkText = (input: string, maxLen = 3800) => {
    const parts: string[] = [];
    let rest = (input || '').trim();
    while (rest.length > maxLen) {
      let idx =
        rest.lastIndexOf('.', maxLen) > 0
          ? rest.lastIndexOf('.', maxLen) + 1
          : rest.lastIndexOf(' ', maxLen);
      if (idx < 0) idx = maxLen;
      parts.push(rest.slice(0, idx).trim());
      rest = rest.slice(idx).trim();
    }
    if (rest) parts.push(rest);
    return parts;
  };

  const speak = async (text: string) => {
    if (!text?.trim()) return;
    const lang = isArabic(text) ? 'ar-001' : 'en-US';

    try {
      await Tts.setDefaultLanguage(lang);
    } catch {}
    await Tts.stop();
    for (const part of chunkText(text)) {
      await Tts.speak(part);
    }
  };

  const stop = () => Tts.stop();

  return {ready, speaking, speak, stop};
}
