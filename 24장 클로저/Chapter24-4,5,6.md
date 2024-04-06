- 함수의 내부 슬롯은 함수가 정의된 시점에 대한(호출 시점 아님) 실행 컨텍스트로서, 상위 스코프의 참조를 저장
- 외부 함수가 소멸 이 후, 여전히 내부 중첩 함수의 내부 슬롯에서 외부 함수의 렉시컬 환경을 참조하고 있다면, 외부함수의 렉시컬 환경은 소멸되지 않음
  -> 클로저: 내부 중첩함수가 외부 함수보다 더 오래 생존 되어있고(상위 스코프의 렉시컬 환경을 참조하고 있기 때문), 상위 스코프의 식별자를 참조하는 경우
- 자바스크립트의 모든 함수는 상위 스코프를 기억

## 😀 클로저의 활용

: 현재 상태를 안전하게 변경하고 유지하기 위해 사용

### ❤️ num 증가시키기

```JS
const increase=(function (){
  let num = 0;
  //클로저
  return function(){
    return ++num;
  };
}());
```

-> num의 값을 **increase 함수 내**에서만 변경하고, 호출할 때마다 이전 값을 기억하도록
-> 클로저 함수는 상위 increase 함수의 **렉시컬 환경을 기억** 함 (num 식별자를 기억함!)
-> num은 **자유 변수**로, 언제 어디서든지 참조하고 변경 가능
-> 은닉된 private 변수이므로 안정적인 프로그래밍 가능
--> **상태가 의도치않게 변경되지 않도록 안전하게 은닉하고, 특정 함수에게만 상태 변경을 허용하게 하여 상태를 안전하게 변경하고 유지하기 위해 '클로저' 사용**

### ❤️ num 감소시키기

```js
const counter = (function () {
  let num = 0;
  //클로저인 메서드를 갖는 객체 반환
  //아래 메서드들의 상위 스코프: 즉시 실행 함수의 렉시컬 환경
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();
```

-> increase, decrease: **클로저**
-> increase, decrease의 **상위 스코프**: 정의가 평가되는 시점에 실행되는 컨텍스트인 **즉시 실행 함수 컨텍스트의 렉시컬 환경**

### ❤️ 생성자 함수로

```js
const Counter(function(){
  let num = 0;
  function Counter(){
  	//this.num = 0;
  }

  Counter.prototype.increase=function(){
    return ++num;
  };

  Counter.prototype.decrease=function(){
    return num>0?--num:0;
  };

  return Counter;
}())};

const counter=new Counter();

console.log(counter.increase()); //1
console.log(counter.increase()); //2

console.log(counter.decrease()); //1
console.log(counter.decrease()); //0
```

-> num 변수는 인스턴스를 통해서도 접근 불가능한 은닉 변수로 increase, decrease 만이 변경 가능

## 😀 캡슐화와 정보 은닉

### ❤️ 캡슐화

: 객체의 상태를 나타내는 **프로퍼티**와 프로퍼티를 참조하고 조자갈 수 있는 동작인 **메서드를 하나로 묶은 것**

### ❤️ 정보 은닉

: 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용
-> 외부에 공개할 필요가 없는 **구현의 일부를 감추어 정보 보호하고 결합도 낮춤**
-> 접근 제한자 통해서 공개 범위 한정 가능

### ❤️ 접근 제한자

: 자바스크립트는 따로 접근 제한자를 제공하지 않아, **기본적으로 public**

#### public

: 클래스 외부에서 참조 가능

#### private

: 클래스 외부에서 참조 불가능

#### protected

```js
function Person(name, age) {
  this.name = name; //public
  let _age = age; //private

  this.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person("Lee", 20);
me.sayHi();
console.log(me.name); //Lee
console.log(me._age); //undefined
```

-> name 프로퍼티는 외부로 공개 되어있어서 자유롭게 참조하고 변경 가능 (public)
-> age 프로퍼티는 Person 생성자 함수 외부에서 참조하거나 변경 불가 (private)

but! 위의 코드는 인스턴스를 생성할 때마다 sayHi 메서드가 중복 생성되므로 수정해보자

```js
function Person(name, age) {
  this.name = name; //public
  let _age = age; //private
}

//프로토타입 메서드
Person.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
};

const me = new Person("Lee", 20);
me.sayHi();
console.log(me.name); //Lee
console.log(me._age); //undefined
```

but! 위의 코드는 또 다시 프로토타입 메서드에서 \_age를 참조할 수 없는 문제가 발생하므로 아래와 같이 수정

```js
const Person=function(){
  let _age = age; //private

  function Person(name, age){
    this.name=name;
    _age=age;
  }
  //프로토타입 메서드
  Person.prototype.sayHi=function(){
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  return Person;
}());

const me = new Person('Lee', 20);
me.sayHi();
console.log(me.name); //Lee
console.log(me._age); //undefined
```

-> 생성자 함수와 프로토타입 메서드를 하나의 함수에 모았다.
-> **프로토타입 메서드는 즉시 실행 함수가 호출될 때 단 한 번 생성되고, 즉시 실행 함수 종료 후에도 age값을 참조할 수 있으므로 클로저!!!**

--> 위와 같은 방식을 통해 접근 제한자 사용하지 않는 자바스크립트에서도 정보 은닉이 가능한 것처럼! **but, 완전하게 정보 은닉을 지원하진 않는다**

## 😀 자주 발생하는 실수

: var 변수는 클로저를 사용해서 복잡해짐. let과 const를 쓰자.

```js
var=funcs=[];

for(var i = 0; i < 3; i++){
  funcs[i]=function(){return i;}
}

for(var j = 0; j < funcs.length; j++){
  console.log(funcs[j]());
}
```

-> 위의 for 문에서 i는 var로 선언되어 전역변수이므로 예상과 같이 0,1,2가 출력되지 않음
-> 클로저를 사용해 제대로 동작하도록 수정해보면

```js
vars = funcs=[];
for(var i = 0; i < 3; i++){
  funcs[i] = function(id)){ //2
    return function(){
      return id; //3
    };
  }(i));  //1
}

for(var j = 0; j< funcs.length; j++){
  fonsole.log(funcs[j]());
}
```

-> 1에서 즉시 실행함수는 전역변수 i에 현재 할당되어 있는 값을 인수로 받아, 매개변수 id에 할당 후, 중첩 함수 반환하고 종료 (반환 함수는 funcs 배열에 순차적으로 저장)
-> 매개변수 id는 중첩 함수의 상위 스코프에 존재 (중첩 함수: 클로저-> id값을 기억)

--> let으로 바꾸면 간단 해결!

```js
const=funcs=[];

for(let i = 0; i < 3; i++){
  funcs[i]=function(){return i;}
}

for(let j = 0; j < funcs.length; j++){
  console.log(funcs[j]());
}
```

-> for문 반복될 때마다 새로운 렉시컬 환경 생성되고, **for문 안의 함수는 해당 for문의 렉시컬 환경 내의 식별자 값을 유지해야 함**
-> 반복문 내에 함수가 없다면, 아무것도 그 반복문의 렉시컬 환경 기억하지 않으므로, 가비지 컬렉션의 대상이 됨

#### ⭕ 정리

1. 클로저는 특정 함수 내에서만 변수를 사용하고, private하게 은닉하고 싶을 때 사용하자
2. 어쨌튼 클로저는 은닉 변수를 return하는 형태로 되어있다!
3. 정보 은닉은 변수 값이나 메서드들 감추는 건데, js에서는 클로저로 어느 정도 구현이 가능한데, 클로저로 완전 은닉 구현은 어렵다
4. let or const 키워드 사용하는 반복은 반복될 때마다 새로운 렉시컬 환경 생성하여서 식별자 값을 기억! (반복문 내부에서 함수 정의할 때 의미있음)
5. var 대신 let, const를 쓰자!!!
