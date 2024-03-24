> # 📖스코프란?

- **스코프는 식별자가 유효한 범위를 말한다.**

- **모든 식별자는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정된다.**

```js
var var1 = 1; // 코드의 가장 바깥 영역에서 선언한 변수

if (true) {
  var var2 = 2; // 코드 블록 내에서 선언한 변수
  if (true) {
    var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
  }
}

function foo() {
  var var4 = 4; // 함수 내에서 선언한 변수

  function bar() {
    var var5 = 5; // 중첩된 함수 내에서 선언한 변수
  }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var5 is not defined
```

### 식별자 결정

- 자바스크립트 엔진이 스코프를 통해 어떤 변수를 찹조해야 할지 정하는 것.
- 자바스크립트 엔진은 코드를 실행할 때 코드의 문맥(context)을 고려한다.
- 스코프는 **네임스페이스(개체를 구분할 수 있는 범위)** 이다.
- 식별자는 스코프 내에서는 유일해야 하지만 다른 스코프에는 같은 이름의 식별자를 사용할 수 있다.

```js
function foo() {
  var x = 1;
  // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
  // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
  var x = 2;
  console.log(x); // 2
}
foo();

function bar() {
  let x = 1;
  // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
  let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();
```

<br>
<br>
<br>
<br>

> # 📖스코프의 종류

- 코드는 전역과 지역으로 구분할 수 있다.
- 변수는 자신이 선언된 위치에 의해 자신이 유효한 범위인 스코프가 결정된다.

| 구분 | 설명                  | 스코프      | 변수      |
| ---- | --------------------- | ----------- | --------- |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역 변수 |
| 지역 | 함수 몸체 내부        | 지역 스코프 | 지역 변수 |

- `전역 변수`: 어디서든지 참조 가능하다.
- `지역 변수`: 자신의 지역 스코프와 하위 지역 스코프에서 유효하다.

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRWXKo%2FbtrmoqxGHIm%2FcyK2AY7KBpFPGWjKgAtlR0%2Fimg.png)

<br>
<br>
<br>
<br>

> # 📖 스코프 체인

🔍중첩 함수(nested function): 함수 몸체 내부에 정의한 함수<br>

🔍외부 함수(outer function): 중첩 함수를 포함하는 함수<br>

- **스코프**는 함수의 중첩에 의해 계층적 구조를 갖는다.

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRWXKo%2FbtrmoqxGHIm%2FcyK2AY7KBpFPGWjKgAtlR0%2Fimg.png)

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKB61b%2FbtrmtfvZhjZ%2FEBV5IMeUh1oeDHUAOgtC7K%2Fimg.png)

- 이렇게 스코프가 계층적으로 연결된 것을 스코프 체인이라고 한다.

- 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색(identifier resolution)한다.

### 스코프 체인에 의한 변수 검색

- 상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 찹조할 수 있지만 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다.

### 스코프 체인에 의한 함수 검색

```js
// 전역 함수
function foo() {
  console.log('global function foo');
}

function bar() {
  // 중첩 함수
  function foo() {
    console.log('local function foo');
  }

  foo(); // ①
}

bar();
```

- 함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다.

- 자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 선언하고 생성된 함수 객체를 할당한다.

- 함수도 식별자에 할당되기 때문에 스코프를 갖는다.

- 따라서 스코프를 "변수를 검색할 때 사용하는 규칙"이라고 표현하기 보다는 "식별자를 검색하는 규칙"이라고 표현하는 편이 적합하다.

<br>
<br>
<br>
<br>

> # 📖 함수 레벨 스코프

- **블록 레벨 스코프**: 함수 몸체만이 아니라 모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프를 만든다.

- **함수 레벨 스코프**: var 키워드로 선언된 변수는 오로지 함수의 코드 블록(함수 몸체) 만을 지역 스코프로 인정한다.

```js
var x = 1;

if (true) {
  // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
  // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
  // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10
```

<br>
<br>
<br>
<br>

> # 📖 렉시컬 스코프

- 상위 스코프를 결정하는 방식

  - 동적 스코프(dynamic scope): 함수가 호출되는 시점에 동적으로 상위 스코프를 결정

  - 렉시컬 스코프(lexical scope) / 정적 스코프(static scope): 함수를 어디서 정의했는지에 따라 상위 스코프를 결정

- 자바스크립트는 렉시컬 스코프를 따른다.

  - 그러므로 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 정한다.

  - 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다.

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```
