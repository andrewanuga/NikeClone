import React, { useState, useEffect } from 'react';

const TypewriterText = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        const fullText = texts[currentIndex];
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return <span>{displayedText}</span>;
};

export default TypewriterText;