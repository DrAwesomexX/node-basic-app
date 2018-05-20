const express =require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express();


app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+ '/views/partial');
 


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('upper',(text)=>{
   return text.toUpperCase();
})
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method},${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('unable to load server.log file');
        }
    });
    next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs')
})
app.use(express.static(__dirname + '/public')); 

app.get('/',(req,res)=>{
    //res.send('<h1>hello Express</h1>');
   /* res.send({
        name:'Manav',
        hobbies:[ 
            'gaming','snooker' ,'coding'
        ]
    })*/

    res.render('home.hbs',{
        pageTitle:'Welcome to official RAGE 2 PAGE',
        welcomeText:'rage 2 is releasing coming soon check out more bethesda games',
        //currentYear: new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
   // res.send('about page');
   res.render('about.hbs',{
      pageTitle:'GEARS OF WAR 5',
     // launchYear: new Date().getFullYear()
   });   
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'sorry the request has failed due to unknown error'
    })
})
app.listen(port,()=>{
    console.log(`server is up on port: ${port}`);
});
