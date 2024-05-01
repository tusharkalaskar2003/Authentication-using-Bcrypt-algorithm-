import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());

app.post("/register", async(req, res)=>{
    try {
        // console.log(req.body);
        // console.log(res);
        const {username, email, password} = req.body;

        if(!username || !email || !password ){
            res.status(401).json({"status": 401, "message": "invalid input fields"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        //TODO: Database operations.........

        console.log(hashPassword);

        res.status(200).json({"status": 200, "message": "successful"});

    } catch (error) {
        res.status(400).json({"status": 400, "message": "Register failed"})
    }
})

app.get("/login", async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(401).json({"status":401, "message": "Invalid credentials"});
        }

        //TODO: Perform database operation: login logic.......

        const databasePassword = ""
        const isCorrect = await bcrypt.compare(databasePassword, password);

        if(isCorrect){
            res.status(200).json({"status": 200, "message": "Login successfully"});
        }
        else{
            res.status(402).json({"status": 402, "message": "login failed"});
        }
    } catch (error) {
        res.status(400).json({"status": 400, "message":"Server error!! "})
    }
})


app.post("/generate-hashed-password", async (req, res) => {
    try {
        console.log(req.body);
        const { password } = req.body; // Access password from query parameters
        console.log(password);
        if (!password) {
            return res.status(400).json({ "status": 400, "message": "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return res.status(200).json({ "status": 200, "message": "Hashed password generated", "hashedPassword": hashedPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": 500, "message": "Internal Server Error" });
    }
});


app.post("/chech-password", async(req, res)=>{
    try {
        console.log(req.body)
        const {password, hashedPassword} = req.body;
        if(!password || !hashedPassword){
            res.status(400).json({"status": 400, "message": "Invalid input fields"});
        }

        const isCorrect = await bcrypt.compare(password, hashedPassword);
        console.log(isCorrect);

        if(isCorrect){
            res.status(200).json({"status": 200, "message": "True"});
        }
        else{
            res.status(201).json({"status": 201, "message": "False"});
        }

    } catch (error) {
        res.status(500).json({"status": 500, "message": "server error"});
    }
})

app.get("/", (req, res)=>{
    res.send("<h1>Lord Tushar saheb</h1>")
})

app.listen(8000, (err)=>{
    if(!err){
        console.log("app runnnig on 8000");
    }
    else{
        console.log(err);
    }
})
