const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 5000
const app = express()

// Middleware 
app.use(express.json())
app.use(cors())


// Default Code
app.get('/', (req, res) => {
    res.send("Global Gate Server Is Ready")
})
app.listen(port, () => {
    console.log(`Global Gate server is running on port: ${port}`);
})


