const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

const categoryRouts = require("./routes/categoryRouter");
const purchaseRouts = require("./routes/purchasesRouter");
const reportRouts = require("./routes/reportsRouter");
const config = require("./config/config");
const text = require("./const/text");

mongoose.set("useFindAndModify", false);
mongoose.set("returnOriginal", false);
mongoose
  .connect(config.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(text.DB_MESSAGE))
  .catch((error) => console.log(error.message));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send('Hello World')
})

app.use("/categories", categoryRouts);
app.use("/purchases", purchaseRouts);
app.use("/", reportRouts);

app.listen( process.env.PORT || 5000, () => {
  console.log(`${text.LISTEN_URL}${config.PORT}`);
});
