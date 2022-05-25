const fs = require('fs');
var problem_desc = [];
var problem_title = [];
var problem_url = [];

    
let x = 952;


for(var i=1; i<=952; i++)
{
var str = fs.readFileSync('problem_text/problem'+i.toString()+'.txt').toString();
str = str.toLowerCase();
problem_desc.push(str);

}

problem_title = fs.readFileSync('problem_titles.txt').toString().toLowerCase().split('\n');
problem_url = fs.readFileSync('problem_urls.txt').toString().split('\n');


//array 
const { removeStopwords } = require('stopword')

// var string = "tree tree tree tree tree";
//     string = string.split(' ');
//     var array = removeStopwords(string)
//     console.log(array);

//now start
var all_keywords = new Set();
for(var i=0; i<x; i++)
{
    var string = problem_title[i];
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    string = string.replace(/,/g, '');
    // console.log(string);
     //string = two sum is the
    string = string.split(' ');
    // string = ['two', 'sum', 'is', 'the']
    // console.log(string);
    var array = removeStopwords(string);
    // console.log(array);
    //array = ['two', 'sum']

 
    array.forEach(element => {
        all_keywords.add(element);
    });
}
const sz = all_keywords.size;

//keyword - kitne document me aa raha
var string_doc_presence_count = new Map();
var tf_values = []; //term frequency

// console.log(all_keywords);

for(var i=0; i<x; i++)
{
    var string = problem_title[i];
    string = string.replace(/(\r\n|\n|\r)/gm, "");
    // console.log(string);
    string = string.split(' ');
    // console.log(string);
    var array = removeStopwords(string);

    //string = two sum pair of two integers
    //array - two, sum, pair, two, integeres
    //map - two - 2 //counting frequency

    //stopword in this document - wo  kitne baar store kar rahe
    var doc_map = new Map();
    
    var tf_row_values = [];
    for(let i =0; i<array.length; i++)
    {
        if(doc_map.has(array[i]))
        {
            doc_map.set(array[i], doc_map.get(array[i])+1);
        }else{
            doc_map.set(array[i], 1);
        }
    }


    var setArray = Array.from(all_keywords);
    setArray.sort();
    setArray.forEach(element => {
        if(doc_map.has(element))
        {
            if(string_doc_presence_count.has(element))
            {
                string_doc_presence_count.set(element, string_doc_presence_count.get(element)+1);
            }else{
                string_doc_presence_count.set(element, 1);
            }
            tf_row_values.push(doc_map.get(element)/doc_map.size);
        }else{
            tf_row_values.push(0);
        }
        //har doc ke liye tf kya hoga
    });
    

    tf_values.push(tf_row_values);

    
}


//now idf values
var setArray = Array.from(all_keywords);
setArray.sort();
console.log(setArray);
var itfValue = [];
setArray.forEach(element => {
    var val = Math.log10(x/string_doc_presence_count.get(element));
    itfValue.push(val);
    // console.log(val);
});
// console.log(itfValue);

// console.log(sz);
for(var j=0; j<sz; j++)
{
    for(var i=0; i<x; i++)
    {
        tf_values[i][j] = tf_values[i][j]*itfValue[j];
    }
}

// console.log(tf_values);

//itvalue - [1, 3, 4, 6] -> 1,3,5,6
content = itfValue.toString();

fs.writeFile('idf_value_titles.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }else{
      console.log("check your file");
  }

})

content = tf_values.toString();

fs.writeFile('tf_idf_values.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }else{
        console.log("check your file");
    }
    //file written successfully
  })
// save this data to a file

//todo: thing is sorted thng and size variation
var setArray = Array.from(all_keywords);
setArray.sort();
content = setArray.toString();
console.log(setArray[0]);
console.log(content);
fs.writeFile('all_keywords_titles.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }else{
        console.log("check your file");
    }
    //file written successfully
  })

// var xu = fs.readFileSync('all_keywords_titles.txt').toString().split(',');
// console.log(xu[0]);
