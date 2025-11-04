const { users, groups, userGroupConnections } = require('../db/db');


// Define the logic function (it accepts req and res)
const searchProfiles = (req, res) => {
    // 1. Check for a query parameter (e.g., /search?name=A)
    const searchQuery = req.query.name ? req.query.name.trim() : '';
    let resultMessage = null;
    let foundUser = null;

    if (searchQuery) {
        // 2. Find the user based on the name (case-insensitive)
        foundUser = users.find(u => u.name.toLowerCase() === searchQuery.toLowerCase());

        if (foundUser) {
            // 3. Find all connections for this user ID
            const connections = userGroupConnections.filter(c => c.userId === foundUser.id);

            if (connections.length > 0) {
                // 4. Look up the names of the groups the user belongs to
                const groupNames = connections.map(c => {
                    const group = groups.find(g => g.id === c.groupId);
                    return group ? group.name : 'Unknown Group';
                });

                // 5. Construct the final message
                const groupList = groupNames.join(' and ');
                resultMessage = `${foundUser.name} is a member of Group: ${groupList}`;
            } else {
                resultMessage = `${foundUser.name} is not a member of any group.`;
            }
        } else {
            resultMessage = `User "${searchQuery}" not found.`;
        }
    }

    // 6. Render the search view with the result message
    res.render('search', { 
        title: 'Search Profiles',
        result: resultMessage, // Pass the descriptive message to the view
        searchQuery: searchQuery 
    });
};

// 🌟 Export 🌟
module.exports = { 
    searchProfiles 
};