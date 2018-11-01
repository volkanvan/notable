let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/accounts/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.get('/accounts', (req, res) => {
        let output = '';
        output += "Listing All Accounts <br />"
        output += "===================="
        output += "<br /><br />"
        db.collection('notes').find().toArray(function(err, docs){
            if (!err){
                db.close();
                for(let i = 0; i < docs.length; i++) {
                    
                    output += `Account title: ${docs[i].title}<br/>`;
                    output += `Account number: ${docs[i].text}<br />`;
                    output += "<br /><br />"
                }
                res.send(output);
                //res.send("Done");
            }
        })
        
    });

    
    app.post('/accounts', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').insert(note, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/accounts/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').delete(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' has been deleted');
            }
        });
    });

    app.put('/accounts/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').update(details, note, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        })
    })
};
