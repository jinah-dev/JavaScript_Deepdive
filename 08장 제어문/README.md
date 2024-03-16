제어문은 주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용

## 😀 블록문

: 0개 이상의 문들을 중괄호로 묶은 것 (코드 블록, 블록)
-> js는 블록문을 하나의 단위로 취급함
-> 주로 제어문, 함수 선언문에서 사용
-> 문 뒤에는 세미콜론을 붙이는 게 일반적이지만, 블록 자체가 종결의 의미를 지녀서 세미콜론을 붙이지 않음

## 😀 조건문

: 조건식의 평가 결과에 따라 코드 블록의 실행을 결정
-> 조건식은 **불리언 값으로 평가될 수 있는 표현식**
-> 불리언 값이 아니라면, 불리언 값으로 강제 변환!

### ❤️ if...else 문

: 조건식의 참, 거짓에 따라 수행할 코드 블록을 결정
-> 조건을 추가하고 싶을 때에는 **else if** 문을 활용
-> if와 else는 2번 이상 사용할 수 없지만, else if는 여러 번 사용할 수 있음
-> 코드 블록 내의 문이 하나라면 중괄호 생략 가능
-> **삼항 조건 연산자**로 바꿔쓸 수 있음

```js
// x가 짝수이면 '짝수'를 홀수이면 '홀수'를 반환한다.
var x = 2;

// 0은 false로 취급된다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

```js
// if…else 문
if (num > 0) {
  kind = "양수";
} else {
  kind = "음수"; // 0은 음수가 아니다
}
console.log(kind); // 양수

// if…else if 문
if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
```

### ❤️ switch 문

: 표현식의 값을 평가하여, 그 값과 일치하는 표현식을 갖는 case 문으로 이동하여 해당 코드 블록을 수행
-> 일치하는 표현식을 갖는 case문이 없다면, default 문으로 이동
-> 조건 표현식은 불리언 값보다는 문자열, 숫자와 같은 값인 경우가 많음

- **fall through**: case 문 마지막에 **break** 써줘야 함!! 그렇지 않으면, switch 문이 끝날 때까지 모든 case문과 default문을 실행!

```js
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
    break;
  case 2:
    monthName = "February";
    break;
  case 3:
    monthName = "March";
    break;
  case 4:
    monthName = "April";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "June";
    break;
  case 7:
    monthName = "July";
    break;
  case 8:
    monthName = "August";
    break;
  case 9:
    monthName = "September";
    break;
  case 10:
    monthName = "October";
    break;
  case 11:
    monthName = "November";
    break;
  case 12:
    monthName = "December";
    break;
  default:
    monthName = "Invalid month";
}

console.log(monthName); // November
```

- 아래와 같이 case문을 여러 개 중복해서 사용할 수도 있다

```js
var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1. 년도가 4로 나누어 떨어지는 해는 윤년(2000, 2004, 2008, 2012, 2016, 2020…)
    // 2. 그 중에서 년도가 100으로 나누어 떨어지는 해는 평년(2000, 2100, 2200...)
    // 3. 그 중에서 년도가 400으로 나누어 떨어지는 해는 윤년(2000, 2400, 2800...)
    days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    break;
  default:
    console.log("Invalid month");
}

console.log(days); // 29
```

## 😀 반복문

: 조건식의 결과가 참인, 거짓이 될 때까지 코드 블록을 반복해서 수행한다

### ❤️ for문 (반복 횟수가 정해진 경우)

: 조건식이 거짓이 될 때까지 코드 블록 반복 수행/ 아래와 같은 형태로 작성

```js
for (초기화식; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
```

![](https://velog.velcdn.com/images/asj1966/post/65ebad97-e133-4b5e-a2b1-5085f70710d3/image.png)
-> 초기화식, 조건식, 증감식 모두 옵션이므로 반드시 사용할 필요는 없지만, 어떤 식도 선언하지 않으면 **무한루프**

### ❤️ while문 (반복 횟수가 미정인 경우)

: 조건식의 결과가 참이면 코드 블록을 계속해서 수행
-> 조건식의 값이 불리언 값이 아니면, 강제적으로 **불리언 값으로 강제 변환**
-> 조건식의 결과가 언제나 참이면 **무한루프**

```js
// 무한루프
while (true) {}
```

### ❤️ do... while문

: 무조건 한 번 이상 실행되고, 참일 동안 코드 블록을 계속해서 수행

```js
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

## 😀 break문

: 레이블 문, 반복문, switch 문의 코드 블록을 탈출
-> 이외의 곳에 break문 사용 시, syntaxerror 발생
-> **중첩된 for문에서 break문 실행 시, 내부 for문 탈출하여 외부 for문으로 진입**

```js
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 외부 for 문을 탈출한다.
    if (i + j === 3) break outer;
  }
}

console.log("Done!");
```

## 😀 continue문

: 코드 블록의 실행을 중단하고, 증감식으로 이동하여 다음 동작을 수행
-> 코드 블록을 완전히 빠져나가는 for, continue는 해당 동작을 멈추고, 다음 동작으로 넘어감
