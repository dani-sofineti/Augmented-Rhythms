console.log("################## Punctul 3 ##################")

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9, 10]

console.log("vanilla");
for (var i = 0; i < list.length; i++){
    console.log(`${list[i]} ==>> ${list[i] + list[i] * 15}`)
}

console.log("ES6 iterator");
for (var value of list) {
    console.log(`${value} ==>> ${value + value * 15}`);
}

console.log("arrow function");
list.forEach((item) => {
    console.log(`${item} ==>> ${item + item * 15}`)
});


console.log("Original list: ");
list.forEach((l) => {
    console.log(l)
});

console.log("List after destructuring: ");

let cloned = []
list.map((l) => {
    cloned = [...cloned, l * 11]
})

cloned.forEach((c) => {
    console.log(c);
})