//Import UI Function 


//DB Array - Switch to Production Datastructure
let users =[
    {id:1, name: "User One", contact:"@userOneInstagram", type:"user", group:"Open"},
    {id:2, name: "User Two", contact:"@userTwoTwitterX", type:"user", group:"Open"},
    {id:3, name: "User Three", contact:"@userThreeFacebook", type:"user", group:"Open"},]

const groups = [
        { id: 101, name: 'SheMercedes', contactInfo: 'support@SheMercedes.org' },
        { id: 102, name: 'Axel', contactInfo: 'web: Axel.com/contact' },
        { id: 103, name: 'EcoRide', contactInfo: 'admin@EcoRide.net' }
    ];

const userGroupConnections = [
        { userId: 1, groupId: 101 }, 
        { userId: 2, groupId: 102 }, 
        { userId: 3, groupId: 103 }  
    ];


//module.exports = users;
module.exports = { users, groups, userGroupConnections };