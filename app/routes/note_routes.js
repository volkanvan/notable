let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/', (req, res) => {
        res.end(`
        <!doctype html>
        <html>
        <body>
            Create an account <br /><br />
            <form action="/accounts" method="post">
                Account Name: <input type="text" name="title" /><br />
                Account Number: <input type="text" name="body" /><br />
                Funds: <input type="number" name="funds" /><br /><br />
                <button>Save</button>
            </form>
        </body>
        </html>
    `);
    })
    
    app.get('/accounts/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        let output = '';
        output += "Account Details <br />"
        output += "===================="
        output += "<br /><br />"

        db.collection('notes').findOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                output += `Account title: ${item.title}<br/>`;
                output += `Account number: ${item.text}<br />`;
                output += `Funds Available: $${item.funds}<br />`;
                output += "<br /><br />"
                res.send(output);
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
                    output += `Funds Available: $${docs[i].funds}<br />`;
                    output += "<br /><br />"
                }
                res.send(output);
                //res.send("Done");
            }
        })
        
    });

    
    app.post('/accounts', (req, res) => {
        let output = '';
        const note = {text: req.body.body, title: req.body.title, funds: req.body.funds};
        db.collection('notes').insert(note, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                output += `Account title: ${result.ops[0].title}<br/>`;
                output += `Account number: ${result.ops[0].text}<br />`;
                output += `Funds Available: $${result.ops[0].funds}<br />`;
                output += "<a href='/accounts'>List Accounts</a>"
                res.send(output);
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
