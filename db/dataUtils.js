//Maps IDs in the connection array to descriptive names.
 
function describeConnections(connections, users, groups) {
    const descriptions = connections.map(connection => {
        const user = users.find(u => u.id === connection.userId);
        const group = groups.find(g => g.id === connection.groupId);

        if (user && group) {
            return `${user.name} is a member of Group ${group.name}.`;
        }
        return 'Invalid connection data found.';
    });
    return descriptions;
}

// 🌟 Export the function for use elsewhere 🌟
module.exports = { describeConnections };