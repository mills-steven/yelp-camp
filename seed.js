var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comments = require('./models/comment');
var data = [
    {
        name:'Grand Canyon',
        image: 'https://media.deseretdigital.com/file/b41fa91284?crop=top:0|left:0|width:1260|height:670|gravity:Center&quality=55&interlace=none&resize=width:1260&order=resize,crop&c=14&a=e0f131f0',
        description: 'Bacon ipsum dolor amet alcatra ground round biltong, andouille kielbasa landjaeger ham. Beef ribs sirloin leberkas cow frankfurter venison. Filet mignon pancetta ham rump. Leberkas venison doner, pancetta brisket pig jowl sausage salami strip steak shoulder bresaola. Picanha shoulder fatback, filet mignon meatloaf brisket turducken tenderloin ham pastrami prosciutto. Salami filet mignon capicola t-bone.Spare ribs kevin venison alcatra hamburger, burgdoggen leberkas rump chuck meatball. Hamburger alcatra tenderloin prosciutto turkey ribeye landjaeger rump ground round bacon drumstick tri- tip strip steak pork kevin.Pork andouille corned beef, brisket shank tail beef ribs frankfurter ham hock kielbasa shankle turducken capicola.Bacon drumstick alcatra doner beef ribs pastrami capicola, cow ribeye landjaeger t- bone biltong hamburger chuck brisket.Biltong ground round chicken filet mignon jerky pastrami kielbasa landjaeger tail frankfurter. Tail meatball drumstick beef ribs corned beef biltong kielbasa.Doner short loin ground round bacon tongue cow pork loin shankle sausage salami pancetta.'
    },
    {
        name: 'Las Vegas',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/90/b3/81/las-vegas-strip.jpg',
        description: 'Bacon ipsum dolor amet alcatra ground round biltong, andouille kielbasa landjaeger ham. Beef ribs sirloin leberkas cow frankfurter venison. Filet mignon pancetta ham rump. Leberkas venison doner, pancetta brisket pig jowl sausage salami strip steak shoulder bresaola. Picanha shoulder fatback, filet mignon meatloaf brisket turducken tenderloin ham pastrami prosciutto. Salami filet mignon capicola t-bone.Spare ribs kevin venison alcatra hamburger, burgdoggen leberkas rump chuck meatball. Hamburger alcatra tenderloin prosciutto turkey ribeye landjaeger rump ground round bacon drumstick tri- tip strip steak pork kevin.Pork andouille corned beef, brisket shank tail beef ribs frankfurter ham hock kielbasa shankle turducken capicola.Bacon drumstick alcatra doner beef ribs pastrami capicola, cow ribeye landjaeger t- bone biltong hamburger chuck brisket.Biltong ground round chicken filet mignon jerky pastrami kielbasa landjaeger tail frankfurter. Tail meatball drumstick beef ribs corned beef biltong kielbasa.Doner short loin ground round bacon tongue cow pork loin shankle sausage salami pancetta.'
    },
    {
        name: 'Apple Holler',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQxX9MbG3-cDZhnrFsLxfeh1AFWmn2d7KWCa9oYgjvHN_ek-Dig',
        description: 'Bacon ipsum dolor amet alcatra ground round biltong, andouille kielbasa landjaeger ham. Beef ribs sirloin leberkas cow frankfurter venison. Filet mignon pancetta ham rump. Leberkas venison doner, pancetta brisket pig jowl sausage salami strip steak shoulder bresaola. Picanha shoulder fatback, filet mignon meatloaf brisket turducken tenderloin ham pastrami prosciutto. Salami filet mignon capicola t-bone.Spare ribs kevin venison alcatra hamburger, burgdoggen leberkas rump chuck meatball. Hamburger alcatra tenderloin prosciutto turkey ribeye landjaeger rump ground round bacon drumstick tri- tip strip steak pork kevin.Pork andouille corned beef, brisket shank tail beef ribs frankfurter ham hock kielbasa shankle turducken capicola.Bacon drumstick alcatra doner beef ribs pastrami capicola, cow ribeye landjaeger t- bone biltong hamburger chuck brisket.Biltong ground round chicken filet mignon jerky pastrami kielbasa landjaeger tail frankfurter. Tail meatball drumstick beef ribs corned beef biltong kielbasa.Doner short loin ground round bacon tongue cow pork loin shankle sausage salami pancetta.'
    },
    {
        name: 'Richardson Corn Maze',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCvRnpV5SEzerF5wKCORxFlRaKPCszCPj2KV9mrTJml73YzqN',
        description: 'Bacon ipsum dolor amet alcatra ground round biltong, andouille kielbasa landjaeger ham. Beef ribs sirloin leberkas cow frankfurter venison. Filet mignon pancetta ham rump. Leberkas venison doner, pancetta brisket pig jowl sausage salami strip steak shoulder bresaola. Picanha shoulder fatback, filet mignon meatloaf brisket turducken tenderloin ham pastrami prosciutto. Salami filet mignon capicola t-bone.Spare ribs kevin venison alcatra hamburger, burgdoggen leberkas rump chuck meatball. Hamburger alcatra tenderloin prosciutto turkey ribeye landjaeger rump ground round bacon drumstick tri- tip strip steak pork kevin.Pork andouille corned beef, brisket shank tail beef ribs frankfurter ham hock kielbasa shankle turducken capicola.Bacon drumstick alcatra doner beef ribs pastrami capicola, cow ribeye landjaeger t- bone biltong hamburger chuck brisket.Biltong ground round chicken filet mignon jerky pastrami kielbasa landjaeger tail frankfurter. Tail meatball drumstick beef ribs corned beef biltong kielbasa.Doner short loin ground round bacon tongue cow pork loin shankle sausage salami pancetta.'
    }
]

function seedDB () {
 //remove all campgrounds   
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('All campground data has been removed');
        }
    //remove all comments
    Comments.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('All comment data has been removed');
        }
 
    
        //add campgrounds

        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('added campground');
                    // add comments
                    Comments.create({text: 'This is a test comment', author: 'Test Author'}, function (err, comment) {
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment)
                            campground.save();
                            console.log('Saved Camp comments');
                        }
                    });
                }
            });
        });

        });
 });
}









module.exports = seedDB;