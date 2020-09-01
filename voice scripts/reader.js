intent(
  "What does this app do",
  "What can you do",
  reply("This is a news project my friend!")
);

// intent("Initiate a command", (p) => {
//     p.play("Playing your command sir");
//     p.play({command: 'testCommand'});
// })

const API_KEY = "4cf2b1d083464d2689b37ff272a6af41";
let savedArticles = [];

intent("Give me the news from $(source* (.*))", (p) => {
  p.play(`Searching news from ${p.source.value}`);
  let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

  if (p.source.value) {
    NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value
      .toLowerCase()
      .split(" ")
      .join("-")}`;
  }

  api.request(NEWS_API_URL, (error, res, body) => {
    if (error || (res && res.statusCode !== 200)) {
      p.play("oops!! Something went wrong please try again");
      return;
    } else {
      const { articles } = JSON.parse(body);
      if (!articles.length) {
        p.play(
          "Could not find aything, please try searching news from different source"
        );
        return;
      }

      savedArticles = articles;
      p.play({ command: "newHeadlines", savedArticles });
      p.play(`Here are the most (recent|latest) ${p.source.value}`);
    }
  });
});
