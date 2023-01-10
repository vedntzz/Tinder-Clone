import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

// App Config
const app = express ();
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://test:test@cluster0.tfw6q8h.mongodb.net/tinderdb?retryWrites=true&w=majority`

// Middlewares
app.use(express.json())
app.use(Cors())
// DB config
mongoose.set('strictQuery', false);
mongoose.connect( connection_url, {
    useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true,
})

// API Endpoints 
app.get ("/",(req, res) => res.status(200).send ("HELLO CLEVER PROGRAMMERS!!!"));
app.post("/tinder/cards", (req, res) => {
        const dbCard = req.body;
        Cards.create(dbCard, (err, data)=>{
            if (err) {
                res.status (500).send(err)
            } 
            else {
                res.status(201).send (data)
            }

        })
    });
app.get("/tinder/cards", (req, res) => {
    const dbCard = req.body;
    Cards.find((err, data)=>{
        if (err) {
            res.status (500).send(err)
        } 
         else {
            res.status(200).send (data)
        }

    })
});

// Listener
app.listen(port,() => console.log( `listening on localhost: ${port}`));
