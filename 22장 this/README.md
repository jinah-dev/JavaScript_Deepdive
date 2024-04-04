> # 📖this 키워드

- `this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 `자기 참조 변수(self-referencing variable)`다.
- `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 `프로퍼티나 메서드를 참조`할 수 있다.
- `this`는 자바스크립트 엔진에서 `암묵적으로 생성`되며, 코드 `어디서든 참조`할 수 있다.
- `this 바인딩`은 함수 호출 방식에 의해 `동적으로 결정`된다.
  <br>
  <br>
  <br>
  **🔍 this 바인딩**
- 바인딩(binding) : 식별자와 값을 연결하는 과정
- this 바인딩 : this와 this가 가리킬 객체를 바인딩하는 것

**객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체**

```js
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this는 메서드를 호출한 객체를 가리킨다.
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

**생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.**

```js
// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

- 자바나 C++ 같은 클래스 기반 언어에서 this는 `언제나 클래스가 생성하는 인스턴스를 가리킨다.`
- 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this `바인딩이 동적으로 결정`된다.
- `strict mode`(엄격 모드)는 this 바인딩에 영향을 준다.
  - this 코드는 어디에서든 참조가 가능하며 `전역`에서도 `함수 내부`에서도 참조할 수 있다.
  - 하지만 this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 `객체의 메서드 내부` 또는` 생성자 함수 내부`에서만 의미가 있다.
  - 따라서 strict mode가 적용된 일반 함수 내부의 this에는 `undefined가 바인딩`된다.

<br>
<br>
<br>
<br>

> # 📖함수 호출 방식과 this 바인딩

<h2>함수를 호출하는 방식</h2>

**1. 일반 함수 호출**

- 기본적으로 this에는 `전역 객체(global object)가 바인딩` 된다.
- 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.

```js
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

- `strict mode가 적용된 일반 함수` 내부의 this에는 undefined가 바인딩된다.

```js
function foo() {
  'use strict';

  console.log("foo's this: ", this); // undefined
  function bar() {
    console.log("bar's this: ", this); // undefined
  }
  bar();
}
foo();
```

- `메서드 내에서 정의한 중첩 함수가 일반 함수로 호출`되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.

```js
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  },
};

obj.foo();
```

- `콜백 함수가 일반 함수로 호출`된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다.

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
```

<br>
<br>
<br>
<br>

**2. 메서드 호출**

- 메서드 내부의 this에는 `메서드를 호출한 객체`가 바인딩된다.
- 주의할 것은 메서드 내부의 this는 `메서드를 소유한 객체가 아닌` `메서드를 호출한 객체에 바인딩 된다`는 것이다.
- 메서드는 특정 객체에 포함된 것이 아닌 `독립적으로 존재하는 별도의 객체`이다.
  - 다른 객체의 프로퍼티에 할당 가능
  - 일반 변수에 할당하여 일반 함수로 호출 가능

```js
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

```js
const anotherPerson = {
  name: 'Kim',
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

- 프로토타입 메서드 내부에서 사용된 this는 해당 메서드를 호출한 객체에 바인딩된다.

```js
function Person(name) {
  this.name = name;
}

//프로토타입에 getName 메서드 할당
Person.prototype.getName = function () {
  return this.name;
};

//me 인스턴스 생성
const me = new Person('Lee');

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // ① Lee

Person.prototype.name = 'Kim';

// 이 시점에서 getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Kim
```

<br>
<br>
<br>
<br>

**3. 생성자 함수 호출**

- 생성자 함수 내부의 this에는 `생성자 함수가 (미래에) 생성할 인스턴스가 바인딩`된다.

```js
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

<br>
<br>
<br>
<br>

**4. function.prototyp.apply/call/bind 메서드에 의한 간접 호출**

- apply, call, bind 메서드는 Function.prototype의 메서드로 `모든 함수가 상속받아 사용 가능`하다.

  - Function.protype.apply, Function.protype.call
    - this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출
    - 본질적인 기능은 함수 호출
    - call 메서드는 apply 메서드와 비슷하지만, 인수를 개별적으로 전달하는 점이 다릅니다.

  ```js
  //사용방법

  /**
   * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
   * @param thisArg - this로 사용할 객체
   * @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
   * @returns 호출된 함수의 반환값
   */
  Function.prototype.apply(thisArg[, argsArray])

  /**
   * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
   * @param thisArg - this로 사용할 객체
   * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
   * @returns 호출된 함수의 반환값
   */
  Function.prototype.call(thisArg[, args1[, arg2[, ...]]])
  ```

  ```js
  function greet(name) {
    console.log(`Hello, ${name}! My name is ${this.name}.`);
  }

  const person = { name: 'John' };

  greet.apply(person, ['Alice']); // Hello, Alice! My name is John.

  function greet(name) {
    console.log(`Hello, ${name}! My name is ${this.name}.`);
  }

  const person = { name: 'John' };

  greet.call(person, 'Alice'); // Hello, Alice! My name is John.
  ```

  - Function.protype.bind
    - bind는 함수를 호출하지 않고 this로 사용할 객체만 전달
    - 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 사용

  ```js
  const person = {
    name: 'Lee',
    foo(callback) {
      // bind 를 적용하지 않는다면, foo 메서드 내부에 콜백 함수에 정의된 this는 전역 객체(window 또는 global)를 가리킨다.
      // 전역 객체에는 name 프로퍼티가 없기 때문에, 원래는 undefined 를 출력하는 것이 맞다.
      // 하지만, Function.prototype.bind 메서드로 콜백 함수의 주체를 person 객체로 동적 바인딩 해주었다.
      // 때문에 person 객체의 name 프로퍼티에 접근할 수 있게 되었다.
      setTimeout(callback.bind(this), 100);
    },
  };

  person.foo(function () {
    console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
  });
  ```

  <br>
  <br>
  <br>
  <br>

### 정리

| 함수 호출 방식                                                  | this 바인딩 대상                                                            |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 일반 함수 호출                                                  | 전역 객체                                                                   |
| 메서드 호출                                                     | 메서드를 호출한 객체                                                        |
| 생성자 함수 호출                                                | 생성자 함수가 생성할 인스턴스                                               |
| Function.prototype 에 apply, call, bind 메서드에 의한 간접 호출 | Function.prototype 에 apply, call, bind 메서드에 첫 번째 인수로 전달한 객체 |
