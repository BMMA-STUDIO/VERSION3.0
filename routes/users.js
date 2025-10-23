const express = require('express')
const router = express.Router()

//DB Array - Switch to Production Datastructure
let users =[{id:1, name: "User One"},{id:2, name: "User Two"},{id:3, name: "User Three"}]

//FORM Route
router.get('/form', (req, res)=>{
        const formHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>Minimal Form</title></head>
        <body>
            <h1>Create New User</h1>
            <form action="./" method="POST">
                <label for="userName">Name:</label>
                <input type="text" name="userName" required><br><br>
                
                <label for="userEmail">Email:</label>
                <input type="email" name="userEmail" required><br><br>
                
                <button type="submit">Submit User</button>
            </form>
        </body>
        </html>
    `;
    res.status(200).send(formHtml)
})

//API ENDPOINTS

  //All users
  router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(users.slice(0,limit))
    }else{
        res.json(users)
    }
    console.log('API Data view logged')
  });

  //Single User
  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((user)=>user.id===id)
    if(!user){
        res.status(404).json({msg: `User with ID of ${id} was not found`})
    } else{
        res.status(200).json(user)}

    console.log('API Single User view logged')
  });

  //Create New User POST
  router.post('/', (req, res) => {
    // Extract both fields from the request body
    const submittedName = req.body.userName;
    const submittedEmail = req.body.userEmail;

    // Create a new user object
    const newUser = {
        name: submittedName,
        email: submittedEmail
    };

    // Push the new user object into the 'users' array
    users.push(newUser);

    // Console log the received input and the resulting array
    console.log('--- New User Input Received ---');
    console.log(newUser);
    console.log('--- Current Users Array Contents ---');
    console.log(users);
    
    // Send back an HTML response showing all users currently stored
    const responseHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>User Created</title></head>
        <body>
            <h2>User Successfully Added!</h2>
            <p><strong>Name:</strong> ${submittedName}<br>
            <strong>Email:</strong> ${submittedEmail}</p>
            
            <h3>All Stored Users (${users.length}):</h3>
            
            
            <p><a href="./form">Add another user</a></p>
        </body>
        </html>
    `;
    
    // Status 201 (Created) is appropriate for a successful POST that creates a resource
    res.status(201).send(responseHtml);
});


  //export default router
  module.exports = router