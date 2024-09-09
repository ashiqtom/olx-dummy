const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const item = require('./routes/items')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
connectDB();

app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
//   });

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    console.log(req.url,'hai');
    next();
});

app.use('/api/auth', authRoutes);
app.use('/items',item)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
