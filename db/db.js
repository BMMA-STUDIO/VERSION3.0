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

//Ads Banners Array
const bannerAds = [
    {
        name: "Ad Banner One",
        price: 49.99, 
        contact: "@bannerAdNameOne", // Corrected contact format
        image: "https://example.com/images/ad_banner_one.jpg" 
    },
    {
        name: "Ad Banner Two",
        price: 75.00,
        contact: "@bannerAdNameTwo", // Corrected contact format
        image: "https://example.com/images/ad_banner_two.png"
    },
    {
        name: "Ad Banner Three",
        price: 75.00,
        contact: "@bannerAdNameTwo", // Corrected contact format
        image: "https://example.com/images/ad_banner_two.png"
    }
];

//Agents Array
const agents = [
    {
        name: "One",
        contact: "@agentNameOne"
    },
    {
        name: "Two",
        contact: "@agentNameTwo"
    },
    {
        name: "Three",
        contact: "@agentNameThree" 
    }
];

//Sorted Array
const sorted = [
    {
        name: "Community One",
        contact: "@communityOne" // Corrected contact format
    },
    {
        name: "Community Two",
        contact: "@communityTwo" // Corrected contact format
    },
    {
        name: "Community Three",
        contact: "@communityThree" // Corrected contact format
    }
];


//module.exports = users;
module.exports = { users, groups, userGroupConnections, bannerAds, agents, sorted };