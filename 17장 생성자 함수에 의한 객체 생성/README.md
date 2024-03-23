> # 📖17.1 Object 생성자 함수

- **생성자 함수**: new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수 <br>
  (생성자 함수에 의해 생성된 객체를 인스턴스라 한다.)

- new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.

```js
// 빈 객체의 생성
const person = new Object();
```

- 자바스크립트는 Object 생성자 함수 이외에도 **String**, **Number**, **Boolean**, **Function**, **Array**, **Date**, **RegExp**, **Promise** 등의 빌트인(built-in) 생성자 함수를 제공한다.

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj); // String {"Lee"}

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj); // Number {123}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj); // Boolean {true}

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x');
console.log(typeof func); // function
console.dir(func); // ƒ anonymous(x)

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
console.log(arr); // [1, 2, 3]

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
console.log(typeof date); // object
console.log(date); // Mon May 04 2020 08:36:33 GMT+0900 (대한민국 표준시)
```

<br>
<br>
<br>
<br>
<br>

> # 📖17.2 생성자 함수

## 📌17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

- 객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하지만 단 하나의 객체만 생성한다.

```js
const person1 = {
  name: 'John',
  getPersonName() {
    return `Hi, My Name is ${this.name}`;
  },
};

console.log(person1.getPersonName()); // Hi, My Name is John

const person2 = {
  name: 'James',
  getPersonName() {
    return `Hi, My Name is ${this.name}`;
  },
};

console.log(person2.getPersonName()); // Hi, My Name is James
```

<br>
<br>
<br>
<br>

## 📌17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// new 연산자와 함께 Person 객체(인스턴스) 생성
const person1 = new Person('John');
const person2 = new Person('James');

// 각 Person 객체의 메서드 호출
console.log(person1.getPersonName()); // Hi, My Name is John
console.log(person2.getPersonName()); // Hi, My Name is James
```

### 자바스크립트에서 생성자 함수

- **this**는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다. this가 가리키는 값은 함수 호출 방식에 따라 동적으로 결정된다.

- 자바와 같은 클래스 기반 객체지향언어의 생성자와는 다르게 그 형식이 정해져 있지 않고 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 만약, new 연산자와 함께 생성자 함수를 호출하지 않으면 일반 함수로 동작한다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 생성자 함수 Person 이지만, new 연산자와 함께 호출되지 않았으므로, Person 생성자함수는 일반함수로 호출된다.
// 일반 함수 관점에서 봤을 때, 함수 몸체 내부에서 반환하는 값은 없으므로, 암묵적으로 undefined 를 반환
const person1 = Person('WI');

console.log(person1); // undefined
console.log(name); // WI
// 일반 함수로서 호출된 Person 내의 this는 전역 객체를 가리킨다.
```

<br>
<br>
<br>
<br>

## 📌17.2.2 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 `인스턴스를 생성`하는 것과 `생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)`하는 것이다.

- new 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

### 1. 인스턴스 생성과 this 바인딩

- 암묵적으로 `빈 객체가 생성`

- 이 빈 객체가 아직은 미완성된 `생성자 함수가 생성한 인스턴스`

- 이 빈 객체(인스턴스)는 this에 바인딩된다.

  - 바인딩(binding): `식별자(identifier)`와 `값(value)`을 연결하는 과정
  - `this 바인딩`은 `this`와 `this가 가리킬 객체`를 바인딩 하는 것

- 이 처리는 함수 몸체의 코드가 한 줄씩 실행되는 런타임 이전에 실행된다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩
  console.log(this); // Person {}

  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}
```

### 2. 인스턴스 초기화

- 생성자 함수 몸체에 기술되어 있는 코드가 한 줄씩 실행되어 `this`에 바인딩되어 있는 인스턴스를 초기화 한다.

- 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}
```

### 3. 인스턴스 반환

- 생성자 함수 몸체의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this(생성자 함수에 의해 생성된 인스턴스)가 암묵적으로 반환

- 만약, this가 아닌 다른 객체를 명시적으로 반환하면 this가 아니라 return 문에 명시한 객체를 반환한다.

- 명시적으로 원시 값을 반환하면 원시 값은 무시되고 this가 반환된다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  // 3. 완성된 인스턴스가 바인딩된 this(= 인스턴스)가 암묵적으로 반환된다.
}

// 인스턴스를 생성, Person 생성자 함수는 암묵적으로 this(Person 인스턴스)를 반환한다.
const person = new Person('WI');
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

```js
// case 3-1 : 생성자 함수 내부에서, 명시적인 다른 객체를 반환할 경우
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  return {};
}

const person = new Person('WI');
console.log(person); // {}

// ===================================================================

// case 3-2 : 생성자 함수 내부에서, 명시적인 원시값을 반환할 경우
function Person(name) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩

  // 2. this 에 바인딩되어 있는 인스턴스를 초기화
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };

  return 10000;
}

const person = new Person('WI');
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

💡 결론적으로, 생성자 함수 내부에서 명시적으로 this 가 아닌 다른 값을 반환 하는 것은, 생성자 함수의 기본 동작을 훼손하는 것이므로, 반드시 생성자 함수 내부에서는 return 문을 생략할 것

<br>
<br>
<br>
<br>

> ## 📌17.2.4 내부 메서드 [[Call]]과 [[Construct]]

- 함수는 객체이지만 일반 객체화는 다르다 -> `일반 객체는 호출할 수 없지만` `함수는 호출 가능`하다.

- 따라서, 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론 함수로서 동작하기 위해 함수 객체만을 위한 [[Environment]], [[FormalParameters]]등의 내부 슬롯과 `[[Call]]. [[Construct]] 같은 내부 메서드`를 추가로 가지고 있다.

- 함수가 일반 함수로 호출되면 함수 객체의 내부 메서드 `[[Call]]이 호출`된다.

- new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]가 호출`된다.

- 내부 메서드 `[[ Call ]] 을 갖는 함수 객체` → `callable`
- 내부 메서드 `[[ Construct ]] 을 갖는 함수 객체` → `constructor`
- 내부 메서드 `[[ Construct ]] 을 갖지 않는 함수 객체` → `non-constructor`

<br>
<br>
<br>
<br>

> ## 📌17.2.5 constructor와 non-constructor의 구분

- constructor: 생성자 함수로 호출할 수 있는 형태(함수 선언문, 함수 표현식)

- non-constructor: 생성자 함수로 호출할 수 없는 형태(화살표 함수, 메서드(ES6 메서드 축약 표현))

![https://poiemaweb.com/assets/fs-images/17-1.png](https://poiemaweb.com/assets/fs-images/17-1.png)

- 모든 함수 객체는 반드시 내부 메서드 `[[ Call ]]` 을 가지고 있다.
- 모든 함수 객체가 `[[ Construct ]]` 을 가지고 있는 것은 아니다.
- 즉, 함수 객체는 `callable` 이면서 `constructor` 이거나, `callable` 이면서 `non-constructor` 다. 모든 함수 객체는 호출할 수 있지만, 모든 함수 객체가 생성자 함수로써 호출할 수 있는 것은 아니다.

<br>
<br>
<br>
<br>

> ## 📌17.2.6 new 연산자

- new 연산자와 함께 함수를 호출하면 해당 함수가 생성자 함수로 동작한다.
  - 즉, 함수 객체의 내부 메서드 중 [[Construct]] 가 호출된다는 것
  - 단, 이 때 호출되는 함수는 non-constructor 가 아닌 constructor 여야한다는 것

```js
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 일반 함수가 new 연산자와 함께, 생성자 함수로 호출
const person = new Person('WI');
console.log(person); // Person { name: 'WI', getPersonName: [Function (anonymous)] }
```

- 반대로 new 연산자 없이 , 생성자 함수를 호출하면 일반 함수로 동작
  - 즉, 함수 객체 내부 메서드 중 [[Call]] 가 호출된다는 것

```js
// 생성자 함수 Person 선언
function Person(name) {
  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// 생성자 함수가 new 연산자 없이, 일반 함수로 호출
const person = Person('WI');
console.log(person); // undefined <<  반환 값이 없으므로 결과는 undefined
```

<br>
<br>
<br>
<br>

> ## 📌17.2.7 new.target

- 생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 ES6에서는 `new.target`을 지원한다.
- new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 `new.target` 은 `함수 자신`을 가리킨다.
- new 연산자 없이 일반 함수로서 호출된 함수 내부의 `new.target` 은 `undefined` 를 가리킨다.

```js
// 생성자 함수 Person 선언
function Person(name) {
  // Person 생성자 함수가 호출되면, 가장 먼저 new 연산자와 함께 호출된 것인지 확인
  if (!new.target) {
    // new 키워드와 함께 호출된 것이 아니면, 함수 내부에서 재귀로 new 연산자와 함께 Person 생성자 함수를 호출
    return new Person(name);
  }

  this.name = name;
  this.getPersonName = function () {
    return `Hi, My Name is ${this.name}`;
  };
}

// new 연산자 없이 생성자 함수를 호출
const person = Person('WI');

// 그럼에도 불구하고, Person 인스턴스가 정상적으로 생성되었고, 내부 메서드 호출됨
console.log(person.getPersonName()); // Hi, My Name is WI
```

- 단, `IE`에서는 이 기능을 지원하지 않습니다.
