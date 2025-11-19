//Import UI Function 


//DB Array - Switch to Production Datastructure
let users =[
    {id:1, name: "User One", contact:"@userOneInstagram", type:"user", group:"Open"},
    {id:2, name: "User Two", contact:"@userTwoTwitterX", type:"user", group:"Open"},
    {id:3, name: "User Three", contact:"@userThreeFacebook", type:"user", group:"Open"},]

const groups = [
        { id: 101, name: 'SheMercedes', contactInfo: 'support@SheMercedes.org' },
        { id: 102, name: 'Axel', contactInfo: 'web: Axel.com/contact' },
        { id: 103, name: 'Eco+EV', contactInfo: 'admin@ecoev.net' },
        { id: 104, name: 'CageFree', contactInfo: 'admin@cagefree.net' },

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
        image: "https://example.com/images/ad_banner_one.jpg" 
    },
    {
        name: "Ad Banner Two",
        image: "https://example.com/images/ad_banner_two.png"
    },
    {
        name: "Ad Banner Three",
        image: "https://example.com/images/ad_banner_two.png"
    },
    {
        name: "Ad Banner Four",
        image: "https://example.com/images/ad_banner_one.jpg" 
    }
];
 
const adGroupConenctions = []


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

const sortedGroupConenctions = []

//module.exports = users;
module.exports = { users, groups, userGroupConnections, bannerAds, agents, sorted };