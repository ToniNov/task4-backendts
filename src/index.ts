import express from "express";
import {connect} from "mongoose";
import cors from 'cors';
import {Path} from "./enum/path";
import authentication from "./routes/authentication"
import login from "./routes/login";
import signup from "./routes/signup";
import users from "./routes/users";

async function run() {
    await connect('mongodb+srv://admin:admin@cluster0.mzzphbh.mongodb.net/Users?retryWrites=true&w=majority');
}
run().catch(err => console.log(err));

const app = express();

app.use(cors())
app.use(express.json({}))

app.use(`${Path.Signup}`, signup)
app.use(`${Path.Auth}`, authentication)
app.use(`${Path.Login}`, login)
app.use(`${Path.Users}`, users)

const port = process.env.PORT || 7654

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
