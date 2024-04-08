> # 📖 ES6 함수의 추가 기능

## 26.1 함수의 구분

ES6 이전의 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다. (callable이면서 constructor이다.)

```js
내부 메서드 [[Call]] 과 [[Construct]]에서 보았듯이 호출할 수 있는 함수 객체를 `callable`이라 하며, 인스턴스를 생성할 수 있는 함수 객체를 `constructor`, 인스턴스를 생성할 수 없는 함수 객체를 `non-constructor`라고 한다.
```

🤔 객체에 바인딩된 함수가 constructor?

객체에 바인딩된 함수가 prototype 프로퍼티를 가지며, 프로토타입 객체도 생성한다는 의미. 함수에 전달되어 보조 함수 역할을 하는 콜백 함수도 마찬가지로 `불필요한 프로토타입 객체를 생성`한다.

👉 ES6 이전 함수는 사용 목적에 따라 명확한 구분이 없음. 호출 방식에 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성. 실수 유발 가능성 높이고 성능에도 비효율적.

✅ 이를 해결하기 위한 ES6 함수 구분 (사용 목적에 따른 3 종 분류)

| ES6 함수의 구분    | constructor | prototype | super | arguments |
| ------------------ | :---------: | :-------: | :---: | :-------: |
| 일반 함수(Normal)  |     `O`     |     O     |   X   |     O     |
| 메서드(Method)     |      X      |     X     |   O   |     O     |
| 화살표 함수(Arrow) |     `X`     |     X     |   X   |     X     |

일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수(ES6 이전과 동일), but 화살표 함수는 명확한 차이 존재.

<br/>

## 26.2 메서드

ES6 이전에는 메서드의 명확한 정의가 없었으나, 이후에는 `메서드 축약 표현으로 정의된 함수`를 의미한다. 또한, 인스턴스를 생성할 수 없는 non-conscturctor이므로 프로토타입 프로퍼티가 없고, 프로토타입도 생성하지 않는다. 생성자 함수로서 메서드를 호출할 수는 없다.

```js
const obj = {
  x: 1,
  foo() { return this.x; }, // foo는 메서드
  bar: function() { retturn this.x; } // bar에 바인딩된 함수는 메서드가 아닌 일반 함수
}

new obj.foo(); // TypeError: obj.foo is not a constructor
new obj.bar(); // bar {}

obj.foo.hasOwnProperty('prototype'); // false
obj.bar.hasOwnProperty('prototype'); // true
```

✅ ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다. super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드는 super 키워드를 사용할 수 있다.

```js
const base = {
  name: "Lee",
  sayHi() {
    return `Hi! ${this.nmae}`;
  },
};

const derived = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  },
  // ES6 메서드. sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived를 가리키고,
  // super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다.
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

<br/>

## 26.3 화살표 함수

화살표 함수는 function 키워드 대신 화살표를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다. 표현 뿐만 아니라 내부 동작도 기존 함수보다 간략하다. 특히, 화살표 함수는 `콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안`으로 유용하다.

✅ 화살표 함수는 함수 선언문으로 정의할 수 없고, 함수 표현식으로 정의해야 한다. 호출 방식은 동일

```js
const multiply = (x, y) => x * y;
multiply(2, 3); // 6
```

```js
const arrow = (x, y) => { ... };
// 매개변수가 여러 개인 경우 소괄호 () 안에 매개변수를 선언

const arrow = x => { ... };
// 매개변수가 한 개인 경우 소괄호 생략 가능

const arrow = () => { ... };
// 매개변수가 없는 경우 소괄호 생략 불가능

const power = x => x ** 2;
power(2); // 4
// 함수 몸체가 하나의 문으로 구성되면 중괄호 {} 생략 가능

// 이때, 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이면 암묵적으로 반환됨.
// 위 표현과 동일: const power = x => { return x ** 2};
```

✅ 객체 리터럴을 반환한는 경우 객체 리터럴을 소괄호로 감싸주어야 한다. 감싸지 않으면 객체 리터럴의 중괄호 {}를 함수 몸체를 감싸는 중괄호로 잘못 해석한다.

```js
const create = (id, content) => ({ id, content });
create(1, "JavaScript"); // {id: 1, content: 'JavaScript'}

// 위 표현과 동일: const create = (id, content) => { return { id, content }; };
```

✅ 화살표 함수도 즉시 실행 함수로 사용할 수 있다.

```js
const person = ((name) => ({
  sayHi() {
    return `Hi? My name is ${name}.`;
  },
}))("Lee");

console.log(person.sayHi()); // Hi? My name is Lee.
```

✅ 화살표 함수도 일급 객체이므로 Array.prototype.map, Array.prototype.filter, Array.prototype.reduce 같은 고차 함수에 인수로 전달할 수 있다. 일반 함수 표현식보다 간결하고 가독성 좋다. 콜백 함수로 정의할 때 유용함.

```js
// ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});

// ES6
[1, 2, 3].map((v) => v * 2);
```

<br/>

✅ 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다. (프로토타입 프로퍼티가 없고, 프로토타입도 생성하지 않음)

2. 중복된 매개변수 이름을 선언할 수 없다.

3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다. (참조할 경우, 스코프 체인을 통해 상위 스코프를 참조하게 됨)

<br/>

✅ this

화살표 함수의 this는 일반 함수의 this와 다르게 동작한다. 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것.

this 바인딩은 함수의 정의가 아닌, `함수의 호출 방식에 따라 this에 바인딩할 객체가 동적으로 결정`된다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    // 1번
    return arr.map(function (item) {
      return this.prefix + item; // 2번
      // TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["trnasition", "user-select"]));
```

1번에서 this는 메서드를 호출한 객체(prefixer 객체)를 가리킨다.

그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 2번에서 this는 undefined를 가리킨다. 콜백 함수를 일반 함수로서 호출하기 때문.

👉 일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용되어 Array.prototype.map 메서드의 콜백 함수에도 strict mode가 적용되고, `strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this는 전역 객체가 아니라 undefined가 바인딩된다.`

<br/>

✅ 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 `화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조(lexical this)하므로 '콜백 함수 내부의 this 문제'를 해결할 수 있다.`

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["trnasition", "user-select"])); // ['-webkit-transition', '-webkit-user-select']
```

만약 화살표 함수와 화살표 함수가 중첩되어 있는 경우, 상위 화살표 함수에도 this 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

<br/>

✅ super

화살표 함수는 함수 자체의 super 바인딩을 갖지 않음. 내부에서 super를 참조하면 this처럼 상위 스코프의 super를 참조한다.

<br/>

✅ arguments

화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않음. 내부에서 super를 참조하면 this처럼 상위 스코프의 super를 참조한다.

<br/>

## 26.4 Rest 파라미터

Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 ...을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

- 일반 매개변수와 함께 사용할 수 있음
- 순차적으로 할당되기 떄문에 항상 마지막에 위치해야 한다.(마지막이 아니면 SyntaxError 발생)
- Rest 파라미터는 하나만 선언할 수 있음
- 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.

```js
function foo(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest); // [3, 4, 5];
}

foo(1, 2, 3, 4, 5);

function bar(x, ...rest) {}
console.log(bar.length); // 1
```

ES5에서는 함수를 정의할 때 매개변수의 개수를 확정할 수 없는 `가변 인자 함수의 경우 매개변수를 통해 인수를 전달 받는 것이 불가능하므로 arguments 객체(순회 가능한 유사 배열 객체)를 활용하여 인수를 전달` 받았다.

👉 ES6 메서드와 함수에서는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있다. 유사배열 객체인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.

👉 화살표 함수의 경우, 함수 자체의 arguments 객체를 갖지 않기 때문에 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

<br/>

## 26.5 매개변수 기본값

함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 바람직하지만 그렇지 않는 경우에도 에러가 발생하지 않는다. 이는 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다. 기존에는 이를 위한 방어 코드가 필요했다.

인수가 전달되지 않은 매개변수의 값은 undefined이다. ES6에 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다.

```js
function logName(name = "Lee") {
  console.log(name);
}

logName(); // Lee
logName(undefined); // Lee
logName(null); // null
```

👉 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우에만 유효하다.
