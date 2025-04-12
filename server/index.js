const express = require('express');
const mongoose = require('mongoose');
const cors   = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const boreSchema = new mongoose.Schema({
    text: String,
    category: String
});


const Bore = mongoose.model("Bore", boreSchema);


app.post('/thing', async (req, res) => {
    try {
        const { text, category } = req.body;

        if (!text || !category) {
            return res.status(400).json({ message: "Text and category are required" });
        }

        const newBore = new Bore({ text, category });
        await newBore.save(); 

        return res.status(201).json({ message: "Bore item created", newBore });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


app.get('/thing', async (req, res) => {
    try {
        const boreThings = await Bore.find();
        if (boreThings.length === 0) {
            return res.status(404).json({ message: "No Bore items found" });
        }
        const index = Math.floor(Math.random() * boreThings.length); 
        return res.status(200).json(boreThings[index]);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


app.get('/things', async (req, res) => {
    try {
        const boreThings = await Bore.find();
        if (boreThings.length === 0) {
            return res.status(404).json({ message: "No Bore items found" });
        }
        return res.status(200).json(boreThings);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


app.put('/thing/:id', async (req, res) => {
    try {
        const { text, category } = req.body;
        const updatedBore = await Bore.findByIdAndUpdate(
            req.params.id, 
            { text, category },
            { new: true } 
        );

        if (!updatedBore) {
            return res.status(404).json({ message: "Bore item not found" });
        }

        return res.status(200).json({ message: "Bore item updated", updatedBore });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


app.delete('/thing/:id', async (req, res) => {
    try {
        const deletedBore = await Bore.findByIdAndDelete(req.params.id); 
        if (!deletedBore) {
            return res.status(404).json({ message: "Bore item not found" });
        }
        return res.status(200).json({ message: "Bore item deleted", deletedBore });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    mongoose.connect('mongodb+srv://mohn08052006:mohn11w1@cluster0.0e1zd.mongodb.net/boredmon')
    .then(() => console.log("Database Connected!"))
    .catch(err => console.log(err));

    console.log("Server is Running");
});
