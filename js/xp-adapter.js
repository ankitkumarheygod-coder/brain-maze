export const XPAdapter = {
    addXP: function(amount) {
        console.log(`[Backend Sync]: Added ${amount} XP`);
        // Future: Fetch API to update user profile on database
        return amount;
    }
};
