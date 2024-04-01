> # 📖 strict mode란?

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

x 변수는 let이나 var, const 선언이 존재하지 않으므로 에러가 일어나지 않고 `암묵적으로 전역변수`가 된다.

이런 경우 오류를 발생시킬 원인이 될 가능성이 크기 때문에 반드시 변수 앞에는 let이나 var, const 선언 해줘야한다

하지만 저희는 사람인지라 실수가 언제든지 발생할 수 있는데 이러한 실수나 오류를 잡아주는 해결책 중 하나가
ES5부터 추가된 `strict mode(엄격모드)`이다

해결책 다른 방법은 ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다.

참고자료(책에는 없고 e-book에는 있네요. 책을 쓰신분도 린트 선호합니다)<br>
https://poiemaweb.com/eslint

## strict mode 적용

전역 선두 또는 함수 몸체의 선두에 `'use strict'` 추가한다

```javascript
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

함수 사용할 때

```javascript
function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

항상 선두에 적용할 것

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  ("use strict");
}
foo();
```

## 전역에 strict mode를 적용하는 것은 피하자

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```

위 예제와 같이 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향 주지 않는다

어디에는 strict mode 쓰고 어디에는 non-strict mode 이고 이렇게 혼용하면 오류를 발생 시킬수 있다.

그렇다고 전역에 strict mode 적용하는건 바람직하지 않다. 이럴 경우 즉시 실행함수로 감싸서 스코프를 구분한다.

```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  "use strict";

  // Do something...
})();
```

## 함수 단위로 strict mode를 적용하는 것도 피하자

위에서도 말했다시피 어디에는 strict mode 쓰고 어디에는 non-strict mode 이고 이렇게 혼용하면 오류를 발생 시킬수 있다.

따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    "use strict";

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않는 변수를 참조하면 ReferenceError가 발생

```javascript
(function () {
  "use strict";

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

### 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 발생

```javascript
(function () {
  "use strict";

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
})();
```

### 매개변수 이름의 중복

중복된 매개변수 이름으로 사용하면 SyntaxError 발생

```javascript
(function () {
  "use strict";

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

### with 문 사용

with 문을 사용하면 SyntaxError 발생<br>
with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 떨어진다.

```javascript
(function () {
  "use strict";

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

## strict mode 적용에 의한 변화

### 일반 함수의 this

생성자 함수가 아닌 일반함수 내부에서는 this사용할 필요 없기 때문에 에러 발생하지 않음

```javascript
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

### arguments 객체

매개변수에 전달된 인수를 재할당해도 arguments 객체에 반영되지 않는다.

```javascript
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
