const express = require('express')
const app = express()
const port = ++process.env.PORT || 3000
const path = require('path')
// Static file: a middle way that allows us to serve the static file
// in order to register the middle way we use app.use

app.use(express.static('./static'))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './static/html/index.html'))  //we are sending the index.html to the user
    // res.status(200).json(
    //     {
    //         msg: "You are home"
    //     }
    // )
})

app.get('/about', (req, res) => {
    res.status(200).json(
        {
            msg: "About Page"
        }
    )
})
// app.all('*', (req, res) => {
//     res.json({
//         status: res.statusCode, 
//         msg: 'An error occurred'
//     })
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})