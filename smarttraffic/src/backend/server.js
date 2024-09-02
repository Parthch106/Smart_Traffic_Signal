// To connect with your MongoDB database
const mongoose = require('mongoose');
const db = 'SmartTraffic_database';

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://parth106:test123@cluster0.v0jm5wd.mongodb.net/SmartTraffic_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
            dbName: db
        });
        console.log('Connected to your',db);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
	password: {
        type: String,
        required: true,
        unique: true,
    },
	confirmPassword: {
        type: String,
        required: true,
    },
	phone: {
        type: Number,
        required: true,
        unique: true,
    },
    
});

const User = mongoose.model('User', UserSchema);

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("App is Working");
});

app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.send(result);
        console.log(result);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/check-email/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const existingUser = await User.findOne({ email });
        
        // If an existing user is found with the provided email
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/check-password/:password", async (req, res) => {
    try {
        const { password } = req.params;
        const existingUser = await User.findOne({ password });
        
        // If an existing user is found with the provided email
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking Phone number:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/check-phone/:phone", async (req, res) => {
    try {
        const { phone } = req.params;
        const existingUser = await User.findOne({ phone });
        
        // If an existing user is found with the provided email
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking Phone number:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
