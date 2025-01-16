async function addRoute(data) {
    try {
        newData = db.Route.insertOne(data)
        return newData;
    }
    catch (err) {
        console.error(err);
        return null;
    }
    
}