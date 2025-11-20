//import model
import User from "../Models/userModel.js";
import bcryprt from 'bcrypt';

//register user
async function register(req, res) {
    try {

        //what data we will be using
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email});

        if (existingUser) {
            res.status(404).json({ message: "User already exists" });
        }

        //hash password before saving to db
        const hashedPassword = await bcryprt.hash(password, 10);

        //create new user
        const newUser = await User.create({ name, email, password: hashedPassword,profilepic:null });

        //send a res.status(201)-->data created successfully
        res.status(201).json(newUser);
        
    } catch (error) {
        res.status(500).json({ error:error.message });
        
    }
}

//login
async function login(req,res){
    try {
        const {email,password}=req.body;
        //check if user exists
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            res.status(404).json({ message: "invalid credentials" });
        }

        //compare password
        const comparePassword = await bcryprt.compare(password, existinguser.password);
        if (!comparePassword) {
            res.status(404).json({ message: "invalid credentials" });
        }

        
    } catch (error) {
        res.status(500).json({ error:error.message });
        
    }
}



//export functions
export { register, login };