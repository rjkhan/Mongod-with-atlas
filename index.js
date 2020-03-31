
const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

async function findOneListingById(client, id) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .findOne({ _id: id });

    if (result) {
        console.log(`Found a listing in the collection with the id '${id}':`);
        console.log(result['host']);
    } else {
        console.log(`No listings found with the name '${id}'`);
    }
}

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://root:root@mongo-xcypz.mongodb.net/test";
 
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // get document byId
        findOneListingById(client,"10030955")
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);