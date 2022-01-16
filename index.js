const express = require('express');
const fs = require('fs');
const app = express();
const parkings = require('./information/parking');
const request = require('request');
app.use(express.json());

app.get('/', (req, res) => {
    res.send(parkings);
})
app.get('/:id', (req, res) => {
    let id = req.params.id;
    let slot;
    parkings.forEach((s) => {
        if (s.slot_id == id) {
            slot = s;
        }
    })
    if (!slot) {
        res.status(400).send({ msg: "user with this id not found" });
        return;
    }
    res.send(slot);
})
 
app.post('/bookingslot', (req, res) => {
    let sampleData =
    {
       data: req.body,
       payement: 200
    }
    console.log(req.body);
    let options = {
        url:"/payments",
        method: "POST",
        body:sampleData
    }
    request(options, (err, response, body) => {
        console.log(body);
        // let data = JSON.parse(body);
        // console.log(data);
        res.send(body);
    })
})

app.listen(8080, (err) => {
    if (err) {
        throw err;
    }
    console.log(`server is running on 8080`);
})