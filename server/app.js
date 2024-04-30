import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(cors({origin: "http://localhost:5173"}));

app.post("/register", async(req, res)=>{
    try {
        console.log(req.body);
        const {username, email, password} = req.body;

        if(username ==="" || email === "" || password === ""){
            res.status(400).json({"status": 200, "message": "Register"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Store in db

        console.log(hashPassword);

        res.status(200).json({"status": 200, "message": "successful"});

    } catch (error) {
        res.status(400).json({"status": 200, "message": "Register failed"})
    }
})

app.listen(8000, (err)=>{
    if(!err){
        console.log("app runnnig on 8000");
    }
    else{
        console.log(err);
    }
})
