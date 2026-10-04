// EsportsMaaza Live Data Integration
const PUBG_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNGVhN2E2MC1hMjM5LTAxM2YtZWFjNS0xMjE1NGZjN2VlNDUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzkxMTI4OTMxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImVzcG9ydHNtYWF6YSJ9.zMPp5uDNuXUTtUjDy4M1_JN1m8t_rriBWM355CwFukE";

async function fetchPubgPlayerData(playerName) {
    const url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${PUBG_API_KEY}`,
                "Accept": "application/vnd.api+json"
            }
        });
        
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const player = data.data[0];
            console.log("Fetched Player Profile:", player);
            
            // Return useful details
            return {
                name: player.attributes.name,
                accountId: player.id,
                shard: player.attributes.shardId,
                banType: player.attributes.banType
            };
        } else {
            console.warn("Player not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching PUBG data:", error);
        return null;
    }
}

// Run test on page load
window.addEventListener('DOMContentLoaded', async () => {
    console.log("EsportsMaaza live script loaded. Fetching test player...");
    const playerInfo = await fetchPubgPlayerData("WackyJacky101");
    if (playerInfo) {
        console.log("Successfully mapped data for:", playerInfo.name);
    }
});