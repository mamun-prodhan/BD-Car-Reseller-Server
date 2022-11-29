const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



// middle wares
app.use(cors());
app.use(express.json());


// mongodatabase connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nhx4fnh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollection = client.db('carReseller').collection('categories');
        const carsCollection = client.db('carReseller').collection('cars');
        const reviewsCollection = client.db('carReseller').collection('reviews');
        const blogsCollection = client.db('carReseller').collection('blogs');

        // get all categories data
        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });

        //get data based on categoryName
        app.get('/category', async (req, res) => {
            let query = {};
            if(req.query.categoryName){
                query = {
                    categoryName: req.query.categoryName
                }
            }
            const cursor = carsCollection.find(query);
            const cars = await cursor.toArray();
            res.send(cars);
        });

        // get all reviews for review section
        app.get('/reviews', async (req, res) =>{
            const query = {}
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        // get all questin and answer for review section
        app.get('/blogs', async (req, res) =>{
            const query = {}
            const cursor = blogsCollection.find(query);
            const blogs = await cursor.toArray();
            res.send(blogs);
        })

    }
    finally {

    }
}

run().catch(err => console.error(err));




// start 
app.get('/', (req, res) => {
    res.send('assignment 12 server is running')
})

app.listen(port, () => {
    console.log(`assignment 12 server running on ${port}`);
})