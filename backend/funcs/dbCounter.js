export async function DataCounter(dbName) {
    try {
        const data = await dbName.find();
        return data.length;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}