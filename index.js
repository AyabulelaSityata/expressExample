const express = require("express");
const app = express(); // same as using http.createServer
const port = +process.env.PORT || 3000;
const path = require("path");
const db = require("./config");
const bodyParser = require("body-parser");
// Static file: a middle way that allows us to serve the static file
// in order to register the middle way we use app.use

app.use(express.urlencoded({ extended: false }));

app.use(express.static("./static"));
// Home page
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./static/html/index.html")); //we are sending the index.html to the user
  // res.status(200).json(
  //     {
  //         msg: "You are home"
  //     }
  // )
});

app.get("/about", (req, res) => {
  res.status(200).json({
    msg: "About Page",
  });
});
// app.all('*', (req, res) => {
//     res.json({
//         status: res.statusCode,
//         msg: 'An error occurred'
//     })
// })

// retrieving all users 02/08/2023 this is the best practice
// app.get("/users", (req, res) => {
//   const query = `
//     SELECT userID, firstName, lastName 
//     FROM Users;
//     `;
//   db.query(query, (err, data) => {
//     if (err) throw err;
//     res.json({
//       status: res.statusCode,
//       results: data,
//     });
//   });
// });

// RETRIEVING A SINGLE USER
app.get("/user", (req, res) => {
    const query = `
      SELECT userID, firstName, lastName 
      FROM Users;
      `;
    db.query(query, (err, data) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results: data,
      });
    });
  });

// registering a new user
app.post("/register", bodyParser.json(), (req, res) => {
  const query = `
    INSERT INTO Users  
    SET ?;  
`;
  db.query(query, [req.body], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "Registration was successful.",
    });
  });
});

app.get('/users', (req, res) => {
    const query = `
    SELECT userID, firstName, lastName
    FROM Users;`
    db.query(query, (err, data) => {
        if(err) throw err
        res.json( 
                {
                    status: res.statusCode,
                    results: data
                }
            )
    })
})

// On a port where the server will listen from
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.post('./createTable', (req, res) => {

// })
