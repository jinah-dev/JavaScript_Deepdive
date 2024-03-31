> # 📖 프로토타입

## 객체 지향 프로그래밍

자바스크립트는 명령형, 함수형, 프로토타입 기반 객체 지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다. 자바스크립트를 이루고 있는 거의 '모든 것'이 객체이다. (원시 타입의 값을 제외한 나머지 값 - 함수, 배열, 정규 표현식 등)

객체 지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 `여러 개의 독립적 단위인 객체의 집합으로 프로그램을 표현하려는 패러다임`을 말한다.

```
✅ 캡슐화 : 객체는 데이터(속성)와 그 데이터를 조작할 수 있는 함수(메소드)를 하나의 단위로 묶는다. 이를 통해 객체의 세부 내용은 외부에서 접근할 수 없게 하며, 공개적으로 사용할 수 있는 인터페이스만을 제공한다.

✅ 상속 : 한 객체의 속성과 메소드를 다른 객체가 상속받을 수 있음. 이를 통해 기존 코드의 재사용성을 높이고, 코드의 중복을 줄일 수 있다.

✅ 다형성 : 같은 인터페이스나 클래스를 기반으로 다양한 형태의 객체를 생성하고, 각 객체가 동일한 메소드를 다른 방식으로 실행할 수 있다.

✅ 추상화 : 복잡한 내용을 간단한 인터페이스 뒤에 숨기는 것을 말함. 이는 사용자가 복잡한 내부 구현을 알 필요 없이 객체의 기능만을 이해하고 사용할 수 있게 한다.
```

</br>

## 상속과 프로토타입

👉 상속을 통해 불필요한 중복을 제거하고, `프로토타입을 기반으로 상속을 구현`한다.

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

// 반지름 1,2인 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성 & 모든 인스턴스가 중복 소유
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직함.
```

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// getArea 메서드를 공유할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 속성에 바인딩 되어있음.
```

</br>

## 프로토타입 객체

프로토타입 객체(줄여서 프로토타입)는 객체 지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용함.

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 내부 슬롯의 값은 프로토타입의 참조이다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

```js
const person = { name: "Lee" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}
```

👉 `__proto__` 접근자 프로퍼티를 통해 간접적으로 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있다.

👉 접근자 프로퍼티는 자체적으로 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티이다.

🤔 Why?

상호 참조에 의해 프로토타입 체인이 생성되는 것(무한 루프에 빠질 수 있음)을 방지 하기 위해 접근자 프로퍼티를 통해 프로토타입에 접근하는 것.

</br>

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

```js
let person = { name: "John", age: 30 };

// 이 객체의 생성자 함수는 Object이다.
console.log(person.constructor); // Object

// 이 객체는 Object.prototype의 메소드와 속성에 접근할 수 있다.
console.log(person.hasOwnProperty("name")); // true
```

`객체 리터럴에 의해 생성한 객체`와 `Object 생성자 함수에 의해 생성한 객체`는 생성과정에 차이는 있으나 객체로서 동일한 특성을 지님.

`함수 리터럴에 의해 생성한 함수`와 `Function 생성자 함수에 의해 생성한 함수`는 생성과정, 스코프, 클로저 등의 차이가 있지만 결국 함수로서 동일한 특성을 지님.

</br>

| `객체 생성 방식` | `엔진의 객체 생성`               | `인스턴스의 prototype 객체` |
| ---------------- | -------------------------------- | --------------------------- |
| 객체 리터럴      | Object() 생성자 함수             | Object.prototype            |
| Object()         | 생성자 함수 Object() 생성자 함수 | Object.prototype            |
| 생성자 함수      | 생성자 함수 생성자               | 함수 이름.prototype         |

</br>

## 프로토타입의 생성 시점

객체는 리터럴 표기법 또는 생성자 함수에 의해 생성 -> 모든 객체는 생성자 함수와 연결

👉 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됨.

🤔 Why? 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 떄문.

```js
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 생성.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

```js
// 화살표 함수는 non-constructor
const Person = (name) => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

</br>

## 객체 생성 방식과 프로토타입의 결정

객체의 생성 방법

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스 (ES6)

💡 `[[Prototype]]`

- 함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯
- 객체 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며, 함수의 경우 Function.prototype을 가리킴

💡 `__proto__`

- 함수 객체만 가지고 있는 프로퍼티
- 함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체를 가리킴(프로토타입 객체)

</br>

![객체 리터럴 방식으로 생성된 객체의 프로토타입 체인](https://poiemaweb.com/img/object_literal_prototype_chaining.png)

👉 객체 리터럴을 사용하여 객체를 생성한 경우, 그 객체의 프로토타입 객체는 Object.prototype이다.

</br>

## 프로토타입 체인

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다. 이것을 프로토타입 체인이라 한다.

</br>

![생성자 함수로 생성된 객체의 프로토타입 체인](https://poiemaweb.com/img/constructor_function_prototype_chaining.png)

객체 리터럴 방식이나 생성자 함수 방식이나 결국은 모든 객체의 부모 객체인 Object.prototype 객체에서 프로토타입 체인이 끝나기 때문이다. 이때 `Object.prototype 객체`를 `프로토타입 체인의 종점(End of prototype chain)`이라 한다.

✅ 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘

✅ 스코프 체인은 식별자 검색을 위한 메커니즘

</br>

## 오버라이딩과 프로퍼티 섀도잉

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면?

👉 프로토타입 체인을 따라 인스턴스 프로퍼티로 추가를 함

👉 `인스턴스 메서드`는 프로토타입 메서드를 `오버라이딩`했고, (오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식)

👉 `프로토타입 메서드`는 `프로퍼티 섀도잉` 되었다.

</br>

## 프로토타입의 교체

- 생성자 함수에 의한 프로토타입의 교체
- 인스턴스에 의한 프로토타입의 교체

![프로토타입 객체 변경 전과 후](https://poiemaweb.com/img/changing_prototype.png)

① constructor 프로퍼티는 Person() 생성자 함수를 가리킨다.

② 프로토타입 객체 변경 후, Person() 생성자 함수의 Prototype 프로퍼티가 가리키는 프로토타입 객체를 일반 객체로 변경하면서 `Person.prototype.constructor 프로퍼티도 삭제`되었다. 따라서 프로토타입 체인에 의해 bar.constructor의 값은 프로토타입 체이닝에 의해 Object.prototype.constructor 즉 `Object() 생성자 함수가 된다.`

</br>

## instanceof 연산자

```js
객체 instanceof 생성자 함수
```

👉 우변의 생성자 함수의 프로토타입에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상 존재하면 true

</br>

## 직접 상속

```js
Object.create(prototype[, propertiesObject])
```

명시적으로 프로토타입을 지정하여 새로운 객체를 생성해주는 메서드.

- 첫 번째 매개변수: 생성할 객체의 프로토타입으로 지정할 객체
- 두 번째 매개변수: 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체 (생략 가능)

</br>

✅ 장점

- new 연산자가 없이도 객체 생성 가능
- 프로토타입을 지정하면서 객체 생성 가능
- 객체 리터럴에 의해 성성된 객체도 상속 받을 수 있음

</br>

🤔 두 번째 인자로 프로퍼티 정의하는 것이 번거롭다면, 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용해 직접 상속을 구현할 수도 있다.

</br>

## 정적 프로퍼티/메서드

정적 프로퍼티/메소드는 `생성자 함수로 인스턴스를 생성하지 않아도 참조/호출 할 수 있는` 프로퍼티/메서드를 말한다.

👉 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없음

</br>

## 프로퍼티 존재 확인

```js
key in object;

// key: 프로퍼티 키를 나타내는 문자열
// object: 객체로 평가되는 표현식

const person = {
  name: "Lee",
  address: "Seoul",
};

console.log("toString" in person); // true
```

✅ `in 연산자`는 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인하기 때문에 주의가 필요하다.

in 연산자 대신 ES6에서 도입된 ✅ `Reflect.has` 메서드를 사용하기도 한다. (동일하게 동작)

```js
const person = { name: "Lee" };

console.log(Reflect.has(person, "toString")); // true
```

✅ `Object.prototype.hasOwnProperty 메서드`를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인할 수 있다. 인수로 전달 받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고, 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

```js
const person = { name: "Lee" };

console.log(person.prototype.hasOwnProperty("toString")); // false
```

</br>

## 프로퍼티 열거

```js
for (변수선언문 in 객체) {...}
```

객체의 모든 프로퍼티를 순회하며 열거하려면 ✅ `for ... in 문`을 사용한다.

```js
const person = {
  name: "Lee",
  address: "Seoul",
};

for (const key in person) {
  console.log(key + ": " + person[key]);
}

// name: Lee
// address: Seoul
```

for ... in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다. (다만, `열거 가능 여부[[Enumerable]]를 판단하여 해당 프로퍼티 어트리뷰트가 true인 프로퍼티만 순회`하며 열거(enumeration)한다.)

</br>

🤔 객체 자신의 고유 프로퍼티만 열거하기 위해서는 for ... in 문 보다 Object.keys/values/entries 메서드를 사용하는 것을 권장함.

✅ `Object.keys 메서드`, `Object.values 메서드(ES8 도입)`는 각각 객체 자신의 열거 가능한 프로퍼티 키 / 값을 배열로 반환한다.

✅ `Object.entries 메서드(ES8 도입)`는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환한다.

```js
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

console.log(Object.keys(person)); // ['name', 'address']
console.log(Object.values(person)); // ['Lee', 'Seoul']
onsole.log(Object.entries(person)); // [['name', 'Lee'],['address', 'Seoul']]
```

</br>
