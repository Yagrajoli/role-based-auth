const express = require('express');
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express();
const mongoose =  require("mongoose")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/roleBasedAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

//routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));