import dotenv from 'dotenv'
dotenv.config();
import {app} from './app.js';
import {connectDB} from './config/db.js'

const PORT = process.env.PORT || 8000;

// database connection
connectDB();


app.listen(PORT, ()=> {
    console.log(`Server is running on port:${PORT}`);
})

