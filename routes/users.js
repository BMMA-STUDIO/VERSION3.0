const express = require('express')
const router = express.Router()
const { users, 
    groups,
    userGroupConnections,
    agents,bannerAds,
    sorted} = require('../db/db')
const { describeConnections } = require('../db/dataUtils');
const { searchProfiles } = require('../controllers/searchController');
const { group } = require('console');
router.use(logger)



//-----USER PATH VERTICES-----//

//Index of Groupcards & Invites Links
router.get('/', (req, res)=>{
    res.render("UsersMainView")
    res.status(200)
})

//SignUp Views (POST-Route in API section)
router.get('/signup', (req, res)=>{
    res.render('signUp', {title: 'Sign Up Form'})   
    res.status(200)
})

router.get('/signUpSheMercedes', (req, res)=>{
    res.render('signUpSheMerc', {title: 'She Mercedes Connect'})   
    res.status(200)
})

router.get('/signUpAxel', (req, res)=>{
    res.render('signUpAxel', {title: 'Axel Owner Connect'})   
    res.status(200)
})

router.get('/signUpAgents', (req, res)=>{
    res.render('signUpAgents', {title: 'Agents Form'})   
    res.status(200)
})

router.get('/fundMyCommunity', (req, res)=>{
    res.render('signUpCommunity', {title: 'Fund My Community'})   
    res.status(200)
})

//Tier Two Get Rootz -------------------------------------------
//Ads
router.get('/adBanners', (req, res)=>{
    res.render('adBanners', {title: 'Ad Banners', bannerAds: bannerAds})   
    res.status(200)
})

//Agents
router.get('/agents', (req, res)=>{
    res.render('agents', {title: 'Verified Agents', agents: agents})   
    res.status(200)
})

router.post('/agents', (req, res) => {
    const { name, contact } = req.body;
  
    if (!name || !contact) {
      return res.status(400).send('Both name and contact are required.');
    }
  
    agents.push({ name, contact });
    console.log(`New agent added: ${name}, Contact: ${contact}`);
    // Define success view inside a variable
    const successView = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Agent Added</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      </head>
      <body >
        <div >
          <h2>
            Agent "<strong>${name}</strong>" was successfully added!
          </h2>
          <p>
            Current total agents: ${agents.length}
          </p>
          <a href="/users/agents">
            View Updated Agents List
          </a>
        </div>
      </body>
      </html>
    `;
  
    // Send the success view
    res.send(successView);
  });

//Sorteds
router.get('/sorted', (req, res)=>{
    res.render('sorted', {title: 'Sorted', sorted: sorted})   
    res.status(200)
})

//Group view
router.get('/group', (req, res) => {
    res.render('group', {title: 'Group', 
        message:'Hello Users',
        //people: users.map(u => u.name)})
        users: users}) //pass entire user objects
})

//Feed View
router.get('/feed', (req, res) => {
    res.render('feed', {title: 'For You'})
})

//Search Bar View
router.get('/search', (req, res) => {
    res.render('search', { 
        title: 'Search Profiles',
        result: null // Initialize result to null
    });
});

//profile View
router.get('/profile', (req, res) => { 
    res.render('profile',{
        title:'User profile',
        user: users[0], // Temporarily hardcoded to first user
    })
})

router.post('/profile', (req, res) => {
    // 1. Get the submitted name from the form body (requires express.urlencoded)
    const submittedName = req.body.userName ? req.body.userName.trim() : '';

    let foundUser = null;
    let message = '';

    if (!submittedName) {
        message = "Please enter a name to search.";
    } else {
        // 2. Search the users array by the 'name' property (case-insensitive)
        foundUser = users.find(user => 
            user.name && user.name.toLowerCase() === submittedName.toLowerCase()
        );

        if (foundUser) {
            message = `Profile found for: ${foundUser.name}`;
        } else {
            message = `Error: User '${submittedName}' not found.`;
        }
    }

    // 3. Render the same 'profile' view, passing the found user object (or null)
    res.render('profile', {
        title: 'User Profile Result',
        user: foundUser, // This will be the user object or null/undefined
        lookupMessage: message // Pass a message for status/error feedback
    });
});

//POST-POINTS

//POST ROUTE 2.0 FOR TYPES
router.post('/', (req, res) => {
    console.log(req.body)
    // 1. Extract all fields from the request body
    const submittedName = req.body.name ? req.body.name.trim() : '';
    const submittedEmail = req.body.contact ? req.body.contact.trim() : '';
    const submittedType = req.body.type ? req.body.type.trim().toLowerCase() : '';
    
    // 🌟 NEW: Extract the ID of the group the user is attempting to join 🌟
    const targetGroupId = parseInt(req.body.groupId);

    // 2. Define the ALLOW-LIST
    const allowedTypes = ['user', 'group', 'agent', 'cause'];

    // 3. 🛡️ VALIDATE & ENFORCE DEFAULT: 
    // Check if the submitted type is in the allowed list. If not, default to 'user'.
    const finalType = allowedTypes.includes(submittedType) 
        ? submittedType 
        : 'user'; 

    // 4. Input Validation (Basic Check)
    if (!submittedName || !submittedEmail) {
        return res.status(400).send('Error: Name and Email are required.');
    }

    // 5. Create the new user object including the validated 'type'
    const newUser = {
        id: users.length + 1,
        name: submittedName,
        contact: submittedEmail,
        type: finalType // 🌟 Uses the validated/defaulted type 🌟
    };

    // 6. Push the new user object into the 'users' array
    users.push(newUser);


// 🌟 6B. CONNECTION LOGIC: Update userGroupConnections 🌟
    //let connectionMessage = '';
    let connectionMessage = '<p>⚠️ New user created, but no group was specified or connection failed.</p>'

    // A. Check if a valid group ID was submitted AND if that group exists
    const groupExists = groups.some(g => g.id === targetGroupId);

    if (targetGroupId && groupExists) {
        // Create the new connection object
        const newConnection = {
            userId: newUser.id,
            groupId: targetGroupId
        };

        // Add the connection to the relationship array
        userGroupConnections.push(newConnection);
        connectionMessage = `<p>✅ Successfully joined Group ${targetGroupId}.</p>`;
        
    } else if (finalType === 'group' && targetGroupId && !groupExists) {
         // Optional: If the type is 'group' but the ID isn't found, you might 
         // assume they are creating a new group and joining it, but for now:
         connectionMessage = `<p>⚠️ New user created, but group ID ${targetGroupId} not found.</p>`;
    }


    // 7. Console log the updated user object
    console.log('--- New User Input Received ---');
    console.log(newUser);
    console.log('--- Current Connections Array Contents ---');
    console.log(userGroupConnections.slice(-5)); // Log the last 5 connections for sanity check
    
    // 8. Send back an HTML response
    const responseHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>User Created</title></head>
        <body>
            <h2>Membership Successfully Updated</h2>
            <p><strong>Name:</strong> ${submittedName}<br>
            <strong>Email:</strong> ${submittedEmail}<br>
            <strong>Type:</strong> ${finalType}</p>
            
            ${connectionMessage}<h3>Your group has (${users.length}) members:</h3>
            
            <p><a href="./group">Continue to Group</a></p>
        </body>
        </html>
    `;
    
    res.status(201).send(responseHtml);
});


//Searchx POST   
router.post('/search', (req, res) => {
    // We'll search for 'contactToFind' but still look at 'personName' from the form
    const contactToFind = req.body.personName ? req.body.personName.trim() : '';
    let searchResult = null;

    if (!contactToFind) {
        searchResult = "Please enter an email or social media handle to search.";
    } else {
        // Search the imported 'users' array
        const foundUser = users.find(user => 
            // 1. Target the 'contact' property
            // 2. Use includes() for partial matches, which is useful for handles/emails
            user.contact.toLowerCase().includes(contactToFind.toLowerCase())
        );
        
        //NEW group filtered reply
        if (foundUser) {
            // 🌟 FIX: Use the Connection Array to find the group name 🌟
            const userConnection = userGroupConnections.find(c => c.userId === foundUser.id);
            let groupName = 'no groups';

            if (userConnection) {
                const group = groups.find(g => g.id === userConnection.groupId);
                groupName = group ? group.name : 'Unknown Group';
            }

            // Construct the final result message
            searchResult = `${foundUser.name} (Contact: '${contactToFind}') is a member of: ${groupName}.`;
            

       
        } else {
            searchResult = `Sorry, the contact '${contactToFind}' is NOT listed.`;
        }
    }

    // Render the same 'search' view, passing the result message
    res.render('search', { 
        title: 'Search Results',
        result: searchResult 
    });
});

//API-POINTS********************************************************
   //Single User **Returns 404**
   router.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((user)=>user.id===id)
    if(!user){
        res.status(404).json({msg: `User with ID of ${id} was not found`})
    } else{
        res.status(200).json(user)}
    console.log('API Single User view logged')
  });
   
  //All Users with limit query
  router.get('/api', (req, res) => {
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(users.slice(0,limit))
    }else{
        res.json(users)
    }
    console.log('API Data view logged')
  });

//Connections Report - Using Data Utils
router.get('/connections-report', (req, res) => {
    // 3. Use the imported function with the imported data
    const uxStatements = describeConnections(userGroupConnections, users, groups);
    // Render the report or send as JSON
    res.status(200).json({ report: uxStatements });
});


//Middleworx Logger
function logger(req, res, next){
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}   
  //export default router
  module.exports = router