const mongoose = require('mongoose');
const URI = "mongodb+srv://sajjad:sajjad@cluster0.y6bfs.mongodb.net/problems?retryWrites=true&w=majority"
const all_problem = require('./model/problem_model');
const keyword = require('./model/all_keywords_model');
const itf_doc = require('./model/itf_values_model');
const tf_idf = require('./model/tf_idf_values_model');
const mag_v = require('./model/mag_doc_model');
// const app = express();
const fs = require('fs');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connected to db"))
.catch((err) => console.log("problen in connecting: "+err));

//get all data in query
// app.get('/', (req, res) => {
//     // const data = all_problem.find();
    
// })



// const all_prob = new all_problem({
//   problem_desc: "My name is problem",
//   problem_diff: "Easy",
//   problem_topic: "Introduction",
//   problem_title: "Self",
//   problem_url: "https://google.com",
// });

var all_keyws = fs.readFileSync('all_keywords_titles.txt').toString();
console.log(all_keyws);

// const key = new keyword({
//     keyword_values: all_keyws
// })

// key.save().then(result => {
//   console.log('Keywords saved!')
// }).catch((err) => {
//   console.log(err);
// })

// var tf_idf_v = fs.readFileSync('tf_idf_values.txt').toString();
// console.log(tf_idf_v);

// const key = new tf_idf({
//     tf_idf_values: tf_idf_v 
//   })
  
//   key.save().then(result => {
//     console.log('TF-IDF values saved!')
//   }).catch((err) => {
//     console.log(err);
//   })

// var itf_v = fs.readFileSync('idf_value_titles.txt').toString();
// console.log(itf_v);

// const key = new itf_doc({
//     itf_values: itf_v 
//   })
  
// key.save().then(result => {
//     console.log('IDF values saved!')
//   }).catch((err) => {
//     console.log(err);
//   })

// all_prob.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// }).catch((err)=>{
//     console.log(err);
// });

//saving problems and magnitude values

var problem_desc = [];
var problem_title = [];
var problem_url = [];



for(var i=1; i<=952; i++)
{
var str = fs.readFileSync('problem_text/problem'+i.toString()+'.txt').toString();
// str = str.toLowerCase();
problem_desc.push(str);
}

problem_title = fs.readFileSync('problem_titles.txt').toString().split('\n');
problem_url = fs.readFileSync('problem_urls.txt').toString().split('\n');



var tf_idf_matrix = fs.readFileSync('tf_idf_values.txt').toString().split(',');
var tf_value_doc = [];
var x = 952;

// var mp = new Map();
// for (var i = 0; i < x; i++) {
//     var values = [];
//     for (var j = 0; j < tf_idf_matrix.length / (x*3); j+=3) {
//         var x = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j];
//         var y = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j+1];
//         var val = tf_idf_matrix[(tf_idf_matrix.length / (x*3)) * i + j+2];


//     }
//     // console.log(values);
//     // tf_value_doc.push(values);
// }
// console.log(tf_value_doc);
// console.log(tf_value_doc[0].length);
// console.log(tf_idf_matrix.length/(2265*3));
// console.log(tf_idf_matrix)




var sz = all_keyws.length;
var mag_docs = [];
var prev_key_len = 0;
for (var i = 0; i < 952; i++) {
    var value = 0;
    for(var j=0; j<sz; j++)
    {
        if(!isNaN(tf_idf_matrix[i*sz+j]))
        {
            value+= tf_idf_matrix[i*sz+j]*tf_idf_matrix[i*sz+j];
        }
    }
   
    // mag_docs.push(Math.sqrt(value));

    const all_prob = new all_problem({
        problem_desc: problem_desc[i],
        problem_title: problem_title[i],
        problem_url: problem_url[i],
        problem_mag: Math.sqrt(value),
        problem_id: i+1
    });

    all_prob.save().then(result => {
        console.log('problem saved!')
    }).catch((err) => {
        console.log(err);
    });



}

// console.log(mag_docs)

// var to_save = mag_docs.toString();

// const mag_save = new mag_v({
//     mag_values: to_save,
// });

// mag_save.save().then(result => {
//     console.log('mags saved!')
// }).catch((err) => {
//     console.log(err);
// });