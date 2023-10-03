//Place to import libraries
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//Set up express for project
const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Data
let story;

//Endpoint
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/info");
    const result = response.data;
    // console.log(result);
    res.render("index.ejs", { info: result, story: story });
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

app.post("/", async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${req.body.categories}`,
      {
        params: req.body,
      }
    );
    const result = response.data;
    story = result;
    // console.log("result", result);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

//Where to listen on port...
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
