> # 📖 let, const 키워드와 블록 레벨 스코프

## var 키워드로 선언한 변수의 문제점

### 1. 변수 중복 선언 허용

var 키워드로 선언한 변수는 중복 선언이 가능하다. 이런 경우, 초기화문(변수 선언과 동시에 초기값을 할당하는 문) 유무에 따라 다르게 작동하게 되는 문제가 있다.

```js
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.

// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;

// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

### 2. 함수 레벨 스코프

var로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 var로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

함수 레벨 스코프는 전역 변수를 남발할 가능성을 높이고, 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.

```js
var i = 10;

// for문에서 선언한 i는 전역 변수. 이미 선언된 전역 변수 i가 있으므로 중복 선언됨.
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// 의도치 않게 i 변수의 값이 변경되었다.
console.log(i); // 5
```

### 3. 변수 호이스팅

var로 변수 선언 시, `변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작`한다. 즉, 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다. 단, `할당문 이전에 변수를 참조하면 언제나 undefined를 반환`한다.

```js
// 변수 호이스팅에 의해 이미 foo 변수가 선언되었음.
// 변수 foo는 undefined로 초기화 된다.
console.log(foo); // undefined

// 변수에 값을 할당
foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행됨.
var foo;
```

<br>

## let 키워드

### 1. 변수 중복 선언 금지

var 키워드의 단점을 보완하기 위해 ES6에서는 let, const를 도입했다.
var는 변수를 중복 선언해도 아무런 에러가 발생되지 않았다. let은 이름이 같은 변수를 중복 선언하면 문법 에러(Syntax Error)가 발생한다.

```js
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar has already been declared
```

### 2. 블록 레벨 스코프

var로 선언한 변수는 함수 레벨 스코프를 따른다. let으로 선언한 변수는 모든 코드 블록(함수, if문, for문, while문, try/catch문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

```js
var foo = 1; // 전역 변수

{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

```js
// 전역 스코프
let i = 10;

// 함수 레벨 스코프
function foo() {
  let i = 100;

  // 블록 레벨 스코프 (함수 레벨 스코프에 중첩)
  for (let i = 1; i < 3; i++) {
    console.log(i); // 1 2
  }

  console.log(i); // 100
}

foo();
console.log(i); // 10
```

### 3. 변수 호이스팅

let으로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
선언 이전에 참조하면 참조 에러(ReferenceError)가 발생한다.

`var는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 '선언 단계'와 '초기화 단계'가 한 번에 진행`된다. 선언 단계에서 스코프(실행 컨텍스트의 렉시컬 환경)에 변수 식별자를 등록해 자바스크립트 엔진에 변수의 존재를 알린다. 그리고 즉시 초기화 단계에서 undefined로 변수를 초기화 한다.

`let 키워드로 선언한 변수는 '선언 단계'와 '초기화 단계'가 분리되어 진행`된다. 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다. 초기화 단계 실행 전에 변수에 접근하려고 하면 참조 에러가 발생한다.

let 키워드로 선언한 변수는 `스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다. 해당 구간을 일시적 사각지대, TDZ(Temporal Dead Zone)`라고 부른다.

```js
// 런타임 이전에 선언 단계가 실행된다. 아직 변수는 초기화 되지 않았다.
// 초기화 이전의 일시적 사각지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

💡 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보인다.
하지만 `호이스팅은 발생하며, 전역 변수의 값을 출력하진 않고 참조 에러를 발생`시킨다.
(ES6에서 도입된 let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.)

### 4. 전역 객체와 let

var 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다.

let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. window.변수명 과 같이 접근할 수 없다.

```js
// 브라우저 환경에서 실행해야 하는 예제

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // function foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // function foo() {}
```

```js
// 브라우저 환경에서 실행해야 하는 예제

let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
```

<br>

## const 키워드

### 1. 선언과 초기화

const 키워드로 선언한 변수는 `반드시 선언과 동시에 초기화해야` 한다. let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
{
  // 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

### 2. 재할당 금지

var나 let 키워드로 선언한 변수는 재할당이 자유로우나 const 키워드로 선언한 변수는 재할당이 금지 된다.

```js
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

### 3. 상수

변수의 상대 개념인 상수는 재할당이 금지된 변수를 의미한다. `const 키워드로 선언된 변수에 원시 값을 할당한 경우 원시 값은 변경할 수 없는 값(immutable value)이고, const 키워드에 의해 재할당이 금지`되므로 할당된 값을 변경할 수 있는 방법은 없다.

```js
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수의 이름을 대문자로 선언해 상수임을 명확히 나타낸다. 여러 단어의 조합은 언더스코어(_)로 구분해서 스네이크 케이스로 표현한다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;

console.log(afterTaxPrice); // 110
```

### 4. const 키워드와 객체

const 키워드로 선언된 변수에 원시값을 할당하면 값을 변경할 수 없으나, 객체를 할당한 경우 값을 변경할 수 있다.

`재할당을 금지할 뿐, '불변'을 의미하지 않는다.` 이때 객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않는다.

```js
const person = {
  name: "Lee",
};

// 객체는 변경 가능한 값이다. 따라서 재할당 없이 변경이 가능하다.
person.name = "Kim";

console.log(person); // {name: "Kim"}
```

<br>

## var vs. let vs. const

💡 변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다.

- var 사용은 지양
- 재할당이 필요한 경우 let 사용, 변수의 스코프는 최대한 좁게
- 재할당이 필요 없는 원시 값과 객체에는 안전한 const 사용
