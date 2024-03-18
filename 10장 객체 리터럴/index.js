//▶메소드를 사용하여 호출하면 반환하는 형태
let zz = {
    name: "구름",
    age: 3,
    color: "white"
}

console.log(Object.keys(zz))

//Object.keys(객체)
/* ["name", "age", "color"] 반환 */


console.log(Object.values(zz))

//Object.values(객체)
/* ["구름", "3", "white"] 반환 */


console.log(Object.entries(zz))

//Object.entries(객체)
/* [["name", "구름"], ["age", 3], ["color", "white"]]반환 */


console.log(Object.fromEntries(Object.entries(zz)))

//Object.fromEntries(배열);
/* {
    name: "구름",
    age: 3,
    color: "white"
} */


//▶ in 이라는 연산자를 사용하면 해당하는 object(객체)에 키가 있는지 확인할 수 있다!!!!
console.log("name" in student3);

true