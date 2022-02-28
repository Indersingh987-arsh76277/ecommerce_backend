const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const user=require('./Routes/user');
const db=require('./Routes/db');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');
app.use(cors());
app.set(dotenv.config());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("Connected to MongoDB")})
    .catch((err)=>{console.log(err)});
app.use('/api/user/',user);
app.use('/api/db',db);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
