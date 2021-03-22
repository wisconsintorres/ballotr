const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const MDB_CONNECT= 'mongodb+srv://devballotr:Mongodb@cluster0.eqanc.mongodb.net/dev?retryWrites=true&w=majority';

console.log('server');
// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "",
        ],
        credentials: true,
    })
);

// connect to mongoDB
mongoose.connect( MDB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) return console.error(err);
        console.log("Connected to MongoDB");
    }
);

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

