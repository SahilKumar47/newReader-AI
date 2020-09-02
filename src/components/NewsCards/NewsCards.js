import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import infoCards from "../../utlities/info";

// MUI Stuff
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./styles";

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in style={{ transformOrigin: "0 0 0" }}>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={2}
        >
          {infoCards.map((infoCard, i) => (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: i * 1000 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.infoCard}
              >
                <div
                  className={classes.card}
                  style={{ backgroundColor: infoCard.color }}
                >
                  <Typography variant="h5">{infoCard.title}</Typography>
                  {infoCard.info ? (
                    <Typography variant="h6">
                      <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                      {infoCard.info}
                    </Typography>
                  ) : null}
                  <Typography variant="h6">
                    Try saying: <br />
                    <i>{infoCard.text}</i>
                  </Typography>
                </div>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <NewsCard article={article} i={i} activeArticle={activeArticle} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
