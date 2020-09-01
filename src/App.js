import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "c1a8d7ed324aaba5b26b897bec4b19192e956eca572e1d8b807a3e2338fdd0dc/stage";
let alanBtnInstance = null;
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtnInstance = alanBtn({
      key: alanKey,
      onConnectionStatus: (status) => {},
      onCommand: ({ command, savedArticles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(savedArticles);
        }
      },
    });
  }, []);

  console.log(newsArticles);
  return (
    <div>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
