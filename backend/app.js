const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// 👇 Create Schema
const userSchema = new mongoose.Schema({
    name: String
});

const User = mongoose.model('User', userSchema);

// 👇 API to INSERT data
app.post('/add', async (req, res) => {
    const user = new User({ name: req.body.name });
    await user.save();
    res.send("User saved");
});

// 👇 API to GET data
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/', (req, res) => {
    res.send("Backend is running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
