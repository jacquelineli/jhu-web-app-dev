// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)
var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
console.log("FIRST PRINT");
(function () {

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using either the helloSpeaker's or byeSpeaker's 'speak' method.
  // See Lecture 50, part 1
  for (var name of names) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = name.charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter == "j") {
      // byeSpeaker.xxxx
      byeSpeaker.speak(name);
    } else {
      // helloSpeaker.xxxx
      helloSpeaker.speak(name);
    }
  }
})();

// In the main script.js, use the map function to create an array based on the 
// names array. This array will contain the greetings based on the names with the same 
// rules as implemented previously. The function passed into the map function should not 
// be an inline function, i.e., separate it into its own named function and pass it into 
// the map function as a value.
function greetingWithName(name) {
  var firstLetter = name.charAt(0).toLowerCase();
  if (firstLetter == "j") {
    return byeSpeaker.speakSimple(name);
  } else {
    return helloSpeaker.speakSimple(name);
  }
}

var names2 = names.map((name) => greetingWithName(name));

// Loop over list and print greetings to the console
console.log("SECOND PRINT");
for (var greeting of names2) {
  console.log(greeting)
}

// In the main script.js, use the reduce function to create 2 separate arrays: one with all 
// the ‘hello’ greetings and another with all the good bye greetings. Then, loop over each 
// array (obviously separately) and print out the greetings to the console with console.log. 
// You are required to use {hello: [], bye: []} as your initialValue. (Kind of a hint, isn’t it?)
var initialValue = { hello: [], bye: [] };
var greetings = names.reduce((accumulator, currentValue) => {
  var firstLetter = currentValue.charAt(0).toLowerCase();
  if (firstLetter == "j") {
    accumulator.bye.push(byeSpeaker.speakSimple(currentValue));
  } else {
    accumulator.hello.push(helloSpeaker.speakSimple(currentValue));
  }
  return accumulator
}, initialValue);

// Loop over hello and bye lists and print greetings to the console
console.log("THIRD PRINT");
for (var i in greetings.hello) {
  console.log(greetings.hello[i])
}
for (var j in greetings.bye) {
  console.log(greetings.bye[j])
}