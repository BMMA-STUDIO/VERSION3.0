const express = require('express')
const router = express.Router()

router.use(logger)

//DB Array - Switch to Production Datastructure
let users =[{id:1, name: "User One"},{id:2, name: "User Two"},{id:3, name: "User Three"}]


//-----USER WALK VERTICES-----//

//Index & Invites

//SignUp View (POST-Route in API section)
router.get('/signup', (req, res)=>{
    res.render('signUp', {title: 'Sign Up Form'})   
    res.status(200)
})

//Group view
router.get('/group', (req, res) => {
    res.render('group', {title: 'Group', 
        message:'Hello Users',
        people: users.map(u => u.name)})
})
//Feed View



//API-POINTS
  //All users
  router.get('/api', (req, res) => {
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(users.slice(0,limit))
    }else{
        res.json(users)
    }
    console.log('API Data view logged')
  });

  //Single User
  router.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((user)=>user.id===id)
    if(!user){
        res.status(404).json({msg: `User with ID of ${id} was not found`})
    } else{
        res.status(200).json(user)}

    console.log('API Single User view logged')
  });
//POST-POINTS
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
    
    // Send back an HTML response showing all users currently stored *async*
    const responseHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>User Created</title></head>
        <body>
            <h2>User Successfully Added!</h2>
            <p><strong>Name:</strong> ${submittedName}<br>
            <strong>Email:</strong> ${submittedEmail}</p>
            
            <h3>Your group has (${users.length}) members:</h3>
            
            <p><a href="./group">View Your Group</a></p>
        </body>
        </html>
    `;
    // Status 201 (Created) is appropriate for a successful POST that creates a resource
    res.status(201).send(responseHtml);
});


//Midds
function logger(req, res, next){
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}   
  //export default router
  module.exports = router