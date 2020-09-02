import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

//MUI Stuff
import { Typography, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    textAlign: "center",
    paddingBottom: 25,
    fontWeight: 400,
  },
});

const alanKey =
  "c1a8d7ed324aaba5b26b897bec4b19192e956eca572e1d8b807a3e2338fdd0dc/stage";
let alanBtnInstance = null;
const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtnInstance = alanBtn({
      key: alanKey,
      onConnectionStatus: (status) => {},
      onCommand: ({ command, savedArticles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(savedArticles);
          setActiveArticle(-1);
        } else if (command == "highlight") {
          setActiveArticle((prevArticle) => prevArticle + 1);
        }
      },
    });
  }, []);

  console.log(newsArticles);
  return (
    <div>
      <Fade in>
        <Typography
          className={classes.heading}
          variant="h2"
          color="textPrimary"
        >
          Voice Controlled News Reader
        </Typography>
      </Fade>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
