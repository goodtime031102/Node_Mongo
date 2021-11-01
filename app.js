const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

//const CONNECTION_URL = "mongodb://localhost:27017/";
//const DATABASE_NAME = "tdbank";

const CONNECTION_URL = "mongodb+srv://goodtime031102:ttc001@cluster0.e65tv.mongodb.net";
const DATABASE_NAME = "myFirstDatabase";

const PORT=5000; 

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


//app.listen(PORT, () =>console.log(`Server Running on port: http://localhost:${PORT}`));

//test to Github

var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("employee");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/employee", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        //response.send(result);
        response.send('person inserted!');
    });
});

app.get("/employee", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/", (request, response) => {
        response.send('this is HOME page!');
    });


app.get("/employee/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.delete("/employee/:id", (request, response) => {
    collection.deleteOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        //response.send(result);
        response.send('one record deleted!');
    });
});



app.patch("/employee/:id", (request, response) => {
        console.log('aaa');
        collection.updateOne({ "_id": new ObjectId(request.params.id) }, { $set: request.body}, (error, result) => {
            console.log('bbb');
        if(error) {
            console.log('ccc');
            return response.status(500).send(error);
            console.log('ddd');
        }
        //response.send(result);
        console.log('eee');
        response.send('one record updated!');
    });
});  
