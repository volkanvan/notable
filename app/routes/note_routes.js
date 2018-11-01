let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/', (req, res) => {
        res.end(`
        <!doctype html>
        <html>
        <head>
        <style>
        #account-form{
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 50px;
         }
         .col-25 {
            float: center;
            width: 50%;
            margin: auto;}
          
          .l1{
             width: 30%;
            margin: auto;
            display: block;
            padding: 10px;
          
          }
          #title{
            text-align: center;
          }
            body{background-color: #53C4EF;}
            label {
                padding: 12px 12px 12px 0;
                display: inline-block;
              input[type=text]{
                  text-align:center;
                  display: block;
                  margin: 0 0 1em 0;
                  width: 90%; 
                  border: 1px solid #818181;
                  padding: 5px;
              }
              
             
              
              .b {
                  border: 2px solid blue;
                  background-color: lightblue;
                  padding: 10px;
                  text-align: center;
              }
        </style>
        </head>
        <body>
            
            <h1 id="title"> Create an account </h1><br /><br />

            <form id="account-form" class="col-25" action="/accounts" method="post">
                <label>Account Name:</label> <input class="l1" type="text" name="title" />
                <label>Account Number:</label> <input class="l1" type="text" name="body" />
                <label>Funds:</label> <input type="text" class="l1" name="funds" /><br />
                <button class="l1 b">Save</button>
            </form>
            
        </body>
        </html>
    `);
    })
    
    app.get('/accounts/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        let output = `<!doctype html></body>
        <html>
        <head>
        <style>
        #account-form{
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 50px;
         }
         .col-25 {
            float: center;
            width: 50%;
            margin: auto;}
          
          .l1{
             width: 30%;
            margin: auto;
            display: block;
            padding: 10px;
          
          }
          #title{
            text-align: center;
          }
            body{background-color: #53C4EF;}
            label {
                padding: 12px 12px 12px 0;
                display: inline-block;
              input[type=text]{
                  text-align:center;
                  display: block;
                  margin: 0 0 1em 0;
                  width: 90%; 
                  border: 1px solid #818181;
                  padding: 5px;
              }
              
             
              
              .b {
                  border: 2px solid blue;
                  background-color: lightblue;
                  padding: 10px;
                  text-align: center;
              }
        </style>
        </head>
        <body>`;
        output += "<br /><br />"
        output += "<h1 id='title'>Account Details</h1>"
        output += "<br /><br />"

        db.collection('notes').findOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                output += "<div id='account-form' class='col-25'>"
                output += `<label>Account title:</label> ${item.title}<br/>`;
                output += `<label>Account number:</label> ${item.text}<br />`;
                output += `<label>Funds Available:</label> $${item.funds}<br />`;
                output += "<br /><br />"
                res.send(output);
            }
        });
    });

    app.get('/accounts', (req, res) => {
        let output = `<!doctype html></body>
        <html>
        <head>
        <style>
        #account-form{
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 50px;
         }
         .col-25 {
            float: center;
            width: 50%;
            margin: auto;}
          
          .l1{
             width: 30%;
            margin: auto;
            display: block;
            padding: 10px;
          
          }
          #title{
            text-align: center;
          }
            body{background-color: #53C4EF;}
            label {
                padding: 12px 12px 12px 0;
                display: inline-block;
              input[type=text]{
                  text-align:center;
                  display: block;
                  margin: 0 0 1em 0;
                  width: 90%; 
                  border: 1px solid #818181;
                  padding: 5px;
              }
              
             
              
              .b {
                  border: 2px solid blue;
                  background-color: lightblue;
                  padding: 10px;
                  text-align: center;
              }
        </style>
        </head>
        <body>`;
        output += "<h1 id='title'>Listing All Accounts</h1>"
        output += "<br /><br />"
        db.collection('notes').find().toArray(function(err, docs){
            if (!err){
                db.close();
                output += "<div id='account-form' class='col-25'>"
                for(let i = 0; i < docs.length; i++) {
                    
                    output += `<label>Account Title:</label> ${docs[i].title}<br/>`;
                    output += `<label>Account Number:</label> ${docs[i].text}<br />`;
                    output += `<label>Funds Available:</label> $${docs[i].funds}<br />`;
                    output += "<br /><br />"
                }
                output += '</div>';
                res.send(output);
            }
        });
    });

    
    app.post('/accounts', (req, res) => {
        let output = `<!doctype html></body>
        <html>
        <head>
        <style>
        #account-form{
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 50px;
         }
         .col-25 {
            float: center;
            width: 50%;
            margin: auto;}
          
          .l1{
             width: 30%;
            margin: auto;
            display: block;
            padding: 10px;
          
          }
          #title{
            text-align: center;
          }
            body{background-color: #53C4EF;}
            label {
                padding: 12px 12px 12px 0;
                display: inline-block;
              input[type=text]{
                  text-align:center;
                  display: block;
                  margin: 0 0 1em 0;
                  width: 90%; 
                  border: 1px solid #818181;
                  padding: 5px;
              }
              
             
              
              .b {
                  border: 2px solid blue;
                  background-color: lightblue;
                  padding: 10px;
                  text-align: center;
              }
        </style>
        </head>
        <body>`;
        const note = {text: req.body.body, title: req.body.title, funds: req.body.funds};
        db.collection('notes').insert(note, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                output += '<h1 id="title">Account Created</h1>'
                output += "<div id='account-form' class='col-25'>"
                output += `<label>Account title:</label> ${result.ops[0].title}<br/>`;
                output += `<label>Account number:</label>  ${result.ops[0].text}<br />`;
                output += `<label>Funds Available:</label>  $${result.ops[0].funds}<br />`;
                output += "<label><a href='/accounts'>List Accounts</a></label> "
                output += '</div>';
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
