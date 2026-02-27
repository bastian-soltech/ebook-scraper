const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors')
const apiRoutes = require("./src/routes/index");
const compression = require("compression");

app.use(cors({origin:'*'}))
app.use(express.json());
app.use(compression());
app.use("/", apiRoutes)
    
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


