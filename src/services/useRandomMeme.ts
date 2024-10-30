import { useState, useEffect } from "react";

const useRandomMeme = () => {
  const [memeUrl, setMemeUrl] = useState("");

  const fetchMeme = async () => {
    try {
      const response = await fetch("https://meme-api.com/gimme");
      const data = await response.json();
      setMemeUrl(data.url);
    } catch (error) {
      console.error("Error fetching meme:", error);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return { memeUrl, fetchMeme };
};

export default useRandomMeme;
