# 리액트 정리

## JSX
- 리액트 컴포넌트에서는 XML 형식의 값을 반환해줄 수 있는데 이를 JSX
- JSX 는 리액트에서 생김새를 정의할 때, 사용하는 문법
- HTML 같이 생겼지만 실제로는 JavaScript
- 꼭 닫혀야 하는 태그

    태그를 열었으면 꼭 닫아야 함

    input 또는 br 태그는 사용 할 때 닫지 않고 사용, 하지만 리액트에서는 오류 발생

    Self Closing 태그 사용
    
    ```
    import React from 'react';
    import Hello from './Hello';

    function App() {
    return (
        <div>
        <Hello />
        <Hello />
        <Hello />
        <input />
        <br />
        </div>
    );
    }

    export default App;
    ```
- 꼭 감싸져야 하는 태그

    두가지 이상의 태그는 무조건 하나의 태그로 감싸져있어야 함
    
    Fragment 라는 것을 사용

    ```
    import React from 'react';
    import Hello from './Hello';

    function App() {
    return (
        <>
        <Hello />
        <div>안녕히계세요</div>
        </>
    );
    }

    export default App;
    ```
- JSX 안에 JS 값 사용하기
    
    JSX 내부에 자바스크립트 변수를 보여줘야 할 때에는 {} 으로 감싸서 보여준다

    ```
    import React from 'react';
    import Hello from './Hello';

    function App() {
    const name = 'react';
    return (
        <>
        <Hello />
        <div>{name}</div>
        </>
    );
    }

    export default App;
    ```
- style과 class
    
    인라인 스타일은 객체 형태로 작성을 해야 하며, background-color 처럼 - 로 구분되어 있는 이름들은 backgroundColor 처럼 camelCase 형태로 네이밍 해주어야 함

    ```
    import React from 'react';
    import Hello from './Hello';

    function App() {
    const name = 'react';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24, // 기본 단위 px
        padding: '1rem' // 다른 단위 사용 시 문자열로 설정
    }

    return (
        <>
        <Hello />
        <div style={style}>{name}</div>
        </>
    );
    }

    export default App;
    ```


## props를 통해 컴포넌트에 값 전달하기
- props의 기본 사용법

    예를 들어서, App 컴포넌트에서 Hello 컴포넌트를 사용 할 때 name 이라는 값을 전달해주고 싶다고 가정해봅시다. 그러면, 이렇게 코드를 작성
    ```
    import React from 'react';
    import Hello from './Hello';

    function App() {
    return (
        <Hello name="react" />
    );
    }

    export default App;
    ```

    Hello 컴포넌트에서 name 값을 사용할 때는 이렇게 코드를 작성
    ```
    import React from 'react';

    function Hello(props) {
    return <div>안녕하세요 {props.name}</div>
    }

    export default Hello;
    ```
    props는 객체 형태로 전달
- props.children

    컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, props.children 을 조회

    Wrapper.js
    ```
    import React from 'react';

    function Wrapper() {
    const style = {
        border: '2px solid black',
        padding: '16px',
    };
    return (
        <div style={style}>

        </div>
    )
    }

    export default Wrapper;
    ```

    App.js
    ```
    import React from 'react';
    import Hello from './Hello';
    import Wrapper from './Wrapper';

    function App() {
    return (
        <Wrapper>
        <Hello name="react" color="red"/>
        <Hello color="pink"/>
        </Wrapper>
    );
    }

    export default App;
    ```

    이렇게 Wrapper 태그 내부에 Hello 컴포넌트 두개를 넣었는데, 브라우저를 확인하면 다음과 같이 Hello 컴포넌트들은 보여지지 않을 것이다

    내부의 내용이 보여지게 하기 위해서는 Wrapper 에서 props.children 을 렌더링해주어야 함

    ```
    import React from 'react';

    function Wrapper({ children }) {
    const style = {
        border: '2px solid black',
        padding: '16px',
    };
    return (
        <div style={style}>
        {children}
        </div>
    )
    }

    export default Wrapper;
    ```

- 조건부 렌더링

    조건부 렌더링이란, 특정 조건에 따라 다른 결과물을 렌더링 하는 것을 의미

    App.js
    ```
    import React from 'react';
    import Hello from './Hello';
    import Wrapper from './Wrapper';


    function App() {
    return (
        <Wrapper>
        <Hello name="react" color="red" isSpecial={true}/>
        <Hello color="pink" />
        </Wrapper>
    )
    }

    export default App;
    ```
    isSpecial={true} 는 isSpecial만 써도 무방


    Hello.js
    ```
    import React from 'react';

    function Hello({ color, name, isSpecial }) {
    return (
        <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
        </div>
    );
    }

    Hello.defaultProps = {
    name: '이름없음'
    }

    export default Hello;
    ```

    isSpecial && `<b>*</b>` 의 결과는 isSpecial 이 false 일땐 false 이고, isSpecial이 true 일 땐 `<b>*</b>`

<br>

## useState 를 통해 컴포넌트에서 바뀌는 값 관리하기
- 버튼을 누르면 숫자가 바뀌는 Counter 컴포넌트

    Counter.js
    ```
    import React from 'react';

    function Counter() {
    return (
        <div>
        <h1>0</h1>
        <button>+1</button>
        <button>-1</button>
        </div>
    );
    }

    export default Counter;
    ```
    <br>

    Counter.js 이벤트 설정
    ```
    import React from 'react';

    function Counter() {
    const onIncrease = () => {
        console.log('+1')
    }
    const onDecrease = () => {
        console.log('-1');
    }
    return (
        <div>
        <h1>0</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        </div>
    );
    }

    export default Counter;
    ```
    <br>

    ### 동적인 값 끼얹기, useState

    <br>
    컴포넌트에서 동적인 값을 상태(state)라고 하는데 리액트에 useState 라는 함수를 사용하면 컴포넌트에서 상태를 관리 할 수 있다

    Counter.js
    ```
    import React, { useState } from 'react';

    function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number + 1);
    }

    const onDecrease = () => {
        setNumber(number - 1);
    }

    return (
        <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        </div>
    );
    }

    export default Counter;
    ```

    `useState` 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출해주는데 이 함수를 호출해주면 배열이 반환되어 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수가 됨

    <br><br>

    ### 함수형 업데이트
    <br>
    지금은 Setter 함수를 사용 할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있는데, 그 대신에 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있음

    <br>

    Counter.js
    ```
    import React, { useState } from 'react';

    function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
    }

    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    }

    return (
        <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        </div>
    );
    }

    export default Counter;
    ```

    onIncrease 와 onDecrease 에서 setNumber 를 사용 할 때 그 다음 상태를 파라미터로 넣어준것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어주었다

    함수형 업데이트는 주로 나중에 컴포넌트를 최적화를 하게 될 때 사용

    <br>

## input 상태 관리하기
- 리액트에서 사용자가 입력 할 수 있는 input 태그의 상태를 관리하는 방법을 알아보자
    
    InputSample.js

    ```
    import React from 'react';

    function InputSample() {
    return (
        <div>
        <input />
        <button>초기화</button>
        <div>
            <b>값: </b>
        </div>
        </div>
    );
    }

    export default InputSample;
    ```
    <br>

    App.js

    ```
    import React from 'react';
    import InputSample from './InputSample';

    function App() {
    return (
        <InputSample />
    );
    }

    export default App;
    ```

    <br>

- input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록 구현

    이번에도, `useState` 를 사용합니다. 이번에는 `input` 의 `onChange` 라는 이벤트를 사용하는데, 이벤트에 등록하는 함수에서는 이벤트 객체 `e` 를 파라미터로 받아와서 사용 할 수 있는데 이 객체의 `e.target` 은 이벤트가 발생한 `DOM` 인 `input DOM` 을 가르키게됩니다. 이 `DOM` 의 `value` 값, 즉 `e.target.value` 를 조회하면 현재 `input` 에 입력한 값이 무엇인지 알 수 있다

    <br>
    InputSample.js

    ```
    import React, { useState } from 'react';

    function InputSample() {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        setText('');
    };

    return (
        <div>
        <input onChange={onChange} value={text}  />
        <button onClick={onReset}>초기화</button>
        <div>
            <b>값: {text}</b>
        </div>
        </div>
    );
    }

    export default InputSample;
    ```

    `input` 의 상태를 관리할 때에는 `input` 태그의 `value` 값도 설정해주는 것이 중요합니다. 그렇게 해야, 상태가 바뀌었을때 `input` 의 내용도 업데이트 된다

<br><br>

## 여러개의 input 상태 관리하기
- input 이 여러개일때는 어떻게 관리해야 하는지 알아보자

    InputSample.js

    ```
    import React, { useState } from 'react';

    function InputSample() {
        const onChange = (e) => {
        };

        const onReset = () => {
        };


        return (
            <div>
            <input placeholder="이름" />
            <input placeholder="닉네임" />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                이름 (닉네임)
            </div>
            </div>
        );
    }

    export default InputSample;
    ```

    `input` 의 개수가 여러개가 됐을때는, 단순히 `useState` 를 여러번 사용하고 `onChange` 도 여러개 만들어서 구현 할 수 있다. 하지만 그 방법은 가장 좋은 방법은 아니다. 더 좋은 방법은 `input` 에 `name` 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이다. 그리고, `useState` 에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야한다

    InputSample.js

    ```
    import React, { useState } from 'react';

    function InputSample() {
        const [inputs, setInputs] = useState({
            name: '',
            nickname: ''
        });

        const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

        const onChange = (e) => {
            const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
            setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
            });
        };

        const onReset = () => {
            setInputs({
            name: '',
            nickname: '',
            })
        };


        return (
            <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
            </div>
        );
    }

    export default InputSample;
    ```

    리액트 상태에서 객체를 수정할 때는
    ```
    inputs[name] = value;
    ```
    이런식으로 직접 수정하면 안된다

    대신, 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 한다
    ```
    setInputs({
        ...inputs,
        [name]: value
    });
    ```

    여기서 사용한 `...` 문법은 spread 문법이다. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사해준다

    이러한 작업을 "불변성을 지킨다" 라고 부른다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지할 수 있고 이에 따라 필요한 리렌더링이 진행된다. 만약 `inputs[name] = value` 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다

    추가적으로 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다

    요약 : 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서 새 객체에 변화를 주어야 한다


<br><br>

## useRef로 특정 DOM 선택하기

- JavaScript 를 사용 할 때에는, 우리가 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택한다

    리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있다

    그럴 땐, 리액트에서 `ref` 라는 것을 사용한다

    함수형 컴포넌트에서 `ref` 를 사용 할 때에는 `useRef` 라는 Hook 함수를 사용한다

    <br>
    InputSample.js

    ```
    import React, { useState, useRef } from 'react';

    function InputSample() {
        const [inputs, setInputs] = useState({
            name: '',
            nickname: ''
        });
        const nameInput = useRef();

        const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

        const onChange = e => {
            const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
            setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
            });
        };

        const onReset = () => {
            setInputs({
            name: '',
            nickname: ''
            });
            nameInput.current.focus();
        };

        return (
            <div>
            <input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
            </div>
        );
    }

    export default InputSample;
    ```

    `useRef()` 를 사용하여 `Ref` 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 `ref` 값으로 설정해주어야 한다. 그러면, `Ref` 객체의 `.current` 값은 우리가 원하는 DOM 을 가르키게 된다

<br><Br>

## 배열 렌더링하기
- 리액트에서 배열을 렌더링하는 방법을 알아보자

    UserList.js

    ```
    import React from 'react';

    function User({ user }) {
        return (
            <div>
            <b>{user.username}</b> <span>({user.email})</span>
            </div>
        );
    }

    function UserList() {
        const users = [
            {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
            },
            {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
            },
            {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
            }
        ];

        return (
            <div>
            <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} />
            </div>
        );
    }

    export default UserList;
    ```

    배열이 고정적이라면 상관없겟지만, 배열의 인덱스를 하나하나 조회해가면서 렌더링하는 방법은 동적인 배열을 렌더링하지 못한다

    동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 `map()` 을 사용한다

    `map()` 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을 만들어준다. 리액트에서 동적인 배열을 렌더링해야 할 때는 이 함수를 사용하여 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면 된다

    <br>
    UserList.js

    ```
    import React from 'react';

    function User({ user }) {
        return (
            <div>
            <b>{user.username}</b> <span>({user.email})</span>
            </div>
        );
    }

    function UserList() {
        const users = [
            {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
            },
            {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
            },
            {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
            }
        ];

        return (
            <div>
            {users.map(user => (
                <User user={user} />
            ))}
            </div>
        );
    }

    export default UserList;
    ```
    
    리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정해야한다. key 값은 각 원소들마다 가지고 있는 고유값으로 설정을 해야한다. 지금의 경우엔 id 가 고유 값이다

    <br>
    UserList.js

    ```
    import React from 'react';

    function User({ user }) {
    return (
        <div>
        <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
    }

    function UserList() {
    const users = [
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ];

    return (
        <div>
        {users.map(user => (
            <User user={user} key={user.id} />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    만약 배열 안의 원소가 가지고 있는 고유한 값이 없다면 `map()` 함수를 사용 할 때 설정하는 콜백함수의 두번째 파라미터 `index` 를 `key` 로 사용하면된다.

    ```
    <div>
    {users.map((user, index) => (
        <User user={user} key={index} />
    ))}
    </div>
    ```

    만약에 배열을 렌더링 할 때 `key` 설정을 하지 않게된다면 기본적으로 배열의 `index` 값을 `key` 로 사용하게 되고, 경고메시지가 뜨게 된다. 이렇게 경고 메시지가 뜨는 이유는, 각 고유 원소에 `key` 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링 될 수 있기 때문이다.

    <br>

    
    ### 정리
    
    동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 map() 을 사용
    <br>
    리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정 (고유값)<br>
    고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링
    <br>
    수정되지 않는 기존의 값은 그대로 두고 원하는 곳에 내용을 삽입하거나 삭제하기 때문

<br><br>

## useRef 로 컴포넌트 안의 변수 만들기
- 컴포넌트에서 특정 DOM 을 선택해야 할 때, `ref` 를 사용해야 한다고 배웠다. 그리고, 함수형 컴포넌트에서 이를 설정 할 때 `useRef` 를 사용하여 설정한다고 배웠다.

    `useRef` Hook 은 DOM 을 선택하는 용도 외에도 다른 용도가 한가지 더 있는데 바로 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 것이다.

    `useRef` 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않는다. 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그 다음 렌더링 이후로 업데이트 된 상태를 조회 할 수 있는 반면, `useRef` 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있다.

    이 변수를 사용하여 다음과 같은 값을 관리 할 수 있다.
    
    - `setTimeout`, `setInterval` 을 통해 만들어진 `id`
    - 외부 라이브러리를 사용하여 생성된 인스턴스
    - scroll 위치

    <br>
    이제 App 컴포넌트에서 `useRef` 를 사용하여 변수를 관리해볼건데, 용도는 우리가 앞으로 배열에 새 항목을 추가할건데, 새 항목에서 사용 할 고유 id 를 관리하는 용도이다.
    
    `useRef` 를 사용하여 변수를 관리하기 전에 해야 할 작업으로

    이전에 UserList 컴포넌트 내부에서 배열을 직접 선언해서 사용을 하고 있는데, 이렇게 UserList 에서 선언해서 사용하는 대신에, 이 배열을 App 에서 선언하고 UserList 에게 props 로 전달을 해주자.

    <br>
    App.js

    ```
    import React from 'react';

    import UserList from './UserList';

    function App() {
    const users = [
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ];
    return <UserList users={users} />;
    }

    export default App;
    ```

    <br>
    UserList.js

    ```
    import React from 'react';

    function User({ user }) {
    return (
        <div>
        <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
    }

    function UserList({ users }) {
    return (
        <div>
        {users.map(user => (
            <User user={user} key={user.id} />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    App 에서 useRef() 를 사용하여 nextId 라는 변수를 만들어주자

    <br>
    App.js

    ```
    import React, { useRef } from 'react';
    import UserList from './UserList';

    function App() {
    const users = [
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ];

    const nextId = useRef(4);
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...

        nextId.current += 1;
    };
    return <UserList users={users} />;
    }

    export default App;
    ```

    `useRef()` 를 사용 할 때 파라미터를 넣어주면, 이 값이 `.current` 값의 기본값이 된다.

    그리고 이 값을 수정 할때에는 `.current` 값을 수정하면 되고 조회 할 때에는 `.current` 를 조회하면 된다.

<br><br>

## 배열에 항목 추가하기
- 배열에 새로운 항목을 추가하는 방법을 알아보자

    CreateUser.js
    
    ```
    import React from 'react';

    function CreateUser({ username, email, onChange, onCreate }) {
    return (
        <div>
        <input
            name="username"
            placeholder="계정명"
            onChange={onChange}
            value={username}
        />
        <input
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={email}
        />
        <button onClick={onCreate}>등록</button>
        </div>
    );
    }

    export default CreateUser;
    ```

    이번 컴포넌트에서는 상태관리를 CreateUser 에서 하지 않고 부모 컴포넌트인 App 에서 하게 하고, input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 사용하자.

    input 에 값을 입력하고, 등록 버튼을 눌렀을 때 input 값들을 초기화시키고, users 도 useState 를 사용하여 컴포넌트의 상태로서 관리해주자.

    <br>
    App.js

    ```
    import React, { useRef, useState } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    };
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} />
        </>
    );
    }

    export default App;
    ```

    이제 배열에 변화를 줄 차례다. 배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다. 그렇기 때문에, 배열의 push, splice, sort 등의 함수를 사용하면 안된다. 만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야 한다.

    불변성을 지키면서 배열에 새 항목을 추가하는 방법은 두가지가 있는데

    첫번째는 spread 연산자를 사용하는 것이다.

    <br>
    App.js

    ```
    import React, { useRef, useState } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers([...users, user]);

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    };
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} />
        </>
    );
    }

    export default App;
    ```

    또 다른 방법은 concat 함수를 사용하는 것이다. concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어 준다.

    <br>

    App.js

    ```
    import React, { useRef, useState } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers(users.concat(user));

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    };
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} />
        </>
    );
    }

    export default App;
    ```

<br><br>

## 배열에 항목 제거하기
- 이번에는 배열에 항목을 제거 할 때는 어떻게 해야 하는지 알아보자

    우선, UserList 에서 각 User 컴포넌트를 보여줄 때, 삭제 버튼을 렌더링 해주자

    <br>
    UserList.js

    ```
    import React from 'react';

    function User({ user, onRemove }) {
    return (
        <div>
        <b>{user.username}</b> <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove }) {
    return (
        <div>
        {users.map(user => (
            <User user={user} key={user.id} onRemove={onRemove} />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    User 컴포넌트의 삭제 버튼이 클릭 될 때는 `user.id` 값을 앞으로 props 로 받아올 `onRemove` 함수의 파라미터로 넣어서 호출해주어야 한다

    `onRemove`는 "id 가 _인 객체를 삭제하라"는 역할

    이 `onRemove` 함수는 UserList 에서도 전달 받을것이며, 이를 그대로 User 컴포넌트에게 전달해줄것이다

    `onRemove` 함수를 구현해보자. 배열에 있는 항목을 제거할 때에는, 추가할때와 마찬가지로 불변성을 지켜가면서 업데이트를 해주어야 한다

    불변성을 지키면서 특정 원소를 배열에서 제거하기 위해서는 `filter` 배열 내장 함수를 사용하는것이 가장 편합니다. 이 함수는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어준다

    <br>
    App.js

    ```
    import React, { useRef, useState } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
        }
    ]);

    const nameInput = useRef(); // nameInput Dom에 포커싱
    const nextId = useRef(4);   // 컴포넌트 변수 nextId 선언, 파라미터는 .current의 기본 값
                                // .current 로 조회, 수정 가능
    const onCreate = () => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers([...users, user]);

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
        nameInput.current.focus();
    };

    const onRemove = id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setUsers(users.filter(user => user.id !== id));
    };
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
            nameInput={nameInput} // nameInput Dom에 포커싱
        />
        <UserList users={users} onRemove={onRemove} />
        </>
    );
    }

    export default App;
    ```
<br><br>

## 배열 항목 수정하기
- 이번에는 배열 항목을 수정하는 방법을 알아보자

    User 컴포넌트에 계정명을 클릭했을때 색상이 초록새으로 바뀌고, 다시 누르면 검정색으로 바뀌도록 구현을 해보자

    App 컴포넌트의 `users` 배열 안의 객체 안에 `active` 라는 속성을 추가한다

    <br>
    
    App.js

    ```
    const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
    ```

     User 컴포넌트에서 방금 넣어준 `active` 값에 따라 폰트의 색상을 바꿔주도록 구현을 해보자. 추가적으로, `cursor` 필드를 설정하여 마우스를 올렸을때 커서가 손가락 모양으로 변하도록 해보자

     <br>

     UserList.js

     ```
    import React from 'react';

    function User({ user, onRemove }) {
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
        >
            {user.username}
        </b>

        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove }) {
    return (
        <div>
        {users.map(user => (
            <User user={user} key={user.id} onRemove={onRemove} />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    App.js 에서 `onToggle` 이라는 함수를 구현해보자. 배열의 불변성을 유지하면서 배열을 업데이트 할 때에도 `map` 함수를 사용 할 수 있다

    `id` 값을 비교해서 `id` 가 다르다면 그대로 두고, 같다면 `active` 값을 반전시키도록 구현을 하면 된다

    `onToggle` 함수를 만들어서 UserList 컴포넌트에게 전달해주자

    <br>

    App.js

    ```
    const onToggle = id => {
        setUsers(
            users.map(user =>  // 배열의 불변성을 지키면서 업데이트 할 때에도 map 함수 사용
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    };
    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
    ```

    UserList 컴포넌트에서 onToggle를 받아와서 User 에게 전달해주고, onRemove 를 구현했었던것처럼 onToggle 에 id 를 넣어서 호출해주자

    <br>

    UserList.js

    ```
    import React from 'react';

    function User({ user, onRemove, onToggle }) {
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
        >
            {user.username}
        </b>
        &nbsp;
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
        {users.map(user => (
            <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
            />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

<br><br>

## useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
- 이번에는 `useEffect` 라는 Hook 을 사용하여 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법에 대해서 알아보자

    우선 마운트 관리를 해보자

    <br>

    UserList.js

    ```
    import React, { useEffect } from 'react';

    function User({ user, onRemove, onToggle }) {
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        return () => {
        console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
        >
            {user.username}
        </b>
        &nbsp;
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
        {users.map(user => (
            <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
            />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    `useEffect` 를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 `deps`을 넣는다. 만약에 `deps` 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 `useEffect` 에 등록한 함수가 호출된다

    그리고 `useEffect` 에서는 함수를 반환 할 수 있는데 이를 `cleanup` 함수라고 부른다. `cleanup` 함수는 `useEffect` 에 대한 뒷정리를 해준다고 이해하면 되는데, `deps` 가 비어있는 경우에는 컴포넌트가 사라질 때 `cleanup` 함수가 호출된다

    <br>

    주로 마운트 시에 하는 작업들
    - `props`로 받은 값을 컴포넌트의 로컬 상태로 결정
    - 외부 API 요청 (REST API) 등
    - 라이브러리 사용
    - setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

    <br>

    언마운트 시에 하는 작업들
    - setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
    - 라이브러리 인스턴스 제거

    <br>

    ### deps에 특정 값 넣기

    이번에는 `deps`에 특정 값을 넣어보자. `deps`에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다. 그리고 `deps` 안에 특정 값이 있다면 언마운트시에도 호출이 되고, 값이 바뀌기 전에도 호출이 된다.

    <br>

    UserList.js

    ```
    import React, { useEffect } from 'react';

    function User({ user, onRemove, onToggle }) {
    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
        console.log('user 가 바뀌기 전..');
        console.log(user);
        };
    }, [user]);
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
        >
            {user.username}
        </b>
        &nbsp;
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
        {users.map(user => (
            <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
            />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    `useEffect` 안에서 사용하는 상태나, props가 있다면, `userEffect`의 `deps`에 넣어주어야 하는게 규칙이다.

    만약 `useEffect` 안에서 사용하는 상태나 props를 `deps`에 넣지 않게 된다면 `useEffect`에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 된다

    <br>

    ### deps 파라미터 생략하기

    `deps` 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 된다

    UserList.js

    ```
    import React, { useEffect } from 'react';

    function User({ user, onRemove, onToggle }) {
    useEffect(() => {
        console.log(user);
    });
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
        >
            {user.username}
        </b>
        &nbsp;
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    }

    function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
        {users.map(user => (
            <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
            />
        ))}
        </div>
    );
    }

    export default UserList;
    ```

    리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링이 된다. 바뀐 내용이 없다 할지라도.

    물론, 실제 DOM에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당하지만, Virtual DOM에는 모든걸 다 렌더링 하고 있다는 것이다.

<br><br>

## useMemo를 사용하여 연산한 값 재사용하기
- 이번에는 성능 최적화를 위해 연산된 값을 `useMemo`라는 Hook을 사용하여 재사용하는 방법을 알아보도록 하자

    App 컴포넌트에서 `countActiveUsers` 라는 함수를 만들어 `active`값이 `true`인 사용자의 수를 세어서 화면에 렌더링 해보자

    <br>

    App.js

    ```
    import React, { useRef, useState } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
    }

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
        }
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers(users.concat(user));

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    };

    const onRemove = id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setUsers(users.filter(user => user.id !== id));
    };
    const onToggle = id => {
        setUsers(
        users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
        )
        );
    };
    const count = countActiveUsers(users);
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성사용자 수 : {count}</div>
        </>
    );
    }

    export default App;
    ```

    여기서 발생하는 성능적 문제가 한 가지 있다. 바로 input의 값을 바꿀 때에도 `countActiveUsers` 함수가 호출된다는 것이다.

    활성 사용자 수를 세는건, users 에 변화가 있을때만 세야되는건데, input 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 이렇게 불필요할때에도 호출하여서 자원이 낭비되고 있다.

    이러한 상황에 `useMemo`라는 Hook 함수를 사용하면 성능을 최적화 할 수 있다.

    <br>

    App.js

    ```
    import React, { useRef, useState, useMemo } from 'react';
    .
    .
    .
    const count = useMemo(() => countActiveUsers(users), [users]);
    ```

    `useMemo` 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

<br><br>

## useCallback을 사용하여 함수 재사용하기
- `useCallback`은 지난번 공부했던 `useMemo`와 비슷한 Hook함수이다.

    `useMemo`는 특정 결과값을 재사용 할 때 사용하는 반면, `useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.

    이전에 App.js에서 구현했었던 `onCreate`, `onRemove`, `onToggle`함수를 확인해보자

    <br>
    App.js

    ```
    const onCreate = () => {
    const user = {
        id: nextId.current,
        username,
        email
    };
    setUsers(users.concat(user));

    setInputs({
        username: '',
        email: ''
    });
    nextId.current += 1;
    };

    const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
    };
    const onToggle = id => {
    setUsers(
        users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
        )
    );
    };
    ```

    이 함수들은 컴포넌트가 리렌더링 될 때마다 새로 만들어진다. 함수를 선언하는 것 자체는 사실 메모리도, CPU도 리소스를 많이 차지하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 큰 부하가 생길일은 없지만, 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 여전히 중요하다.

    그 이유는 나중에 컴포넌트에서 `props`가 바뀌지 않았으면 Virtual DOM에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할 건데, 이 작업을 하기위해 함수를 재사용하는 것이 필수이다.

    `useCallback`은 이런식으로 사용한다

    <br>

    App.js

    ```
    import React, { useRef, useState, useMemo, useCallback } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
    }

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = useCallback(
        e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        },
        [inputs]
    );
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
        }
    ]);

    const nextId = useRef(4);
    const onCreate = useCallback(() => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers(users.concat(user));

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    }, [users, username, email]);

    const onRemove = useCallback(
        id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setUsers(users.filter(user => user.id !== id));
        },
        [users]
    );
    const onToggle = useCallback(
        id => {
        setUsers(
            users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
            )
        );
        },
        [users]
    );
    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성사용자 수 : {count}</div>
        </>
    );
    }

    export default App;
    ```

    주의 할 점은 함수 안에서 사용하는 상태 혹은 `props` 가 있다면 꼭, `deps` 배열안에 포함시켜야 된다는 것이다. 만약에 `deps` 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없다. `props` 로 받아온 함수가 있다면, 이 또한 `deps` 에 넣어주어야 한다.

<br><br>

## React.memo를 사용한 컴포넌트 리렌더링 방지
- 이번에는 컴포넌트의 `props`가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 `React.memo`라는 함수에 대해 알아보자

    이 함수를 사용한다면, 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.

    우선 CreateUser부터 적용을 해주자

    <br>

    CreateUser.js

    ```
    .
    .
    .
    export default React.memo(CreateUser);
    ```

    UserList와 User 컴포넌트도 적용시켜주자

    <br>

    UserList.js

    ```
    import React from 'react';

    const User = React.memo(function User({ user, onRemove, onToggle }) {
    return (
        <div>
        <b
            style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(user.id)}
        >
            {user.username}
        </b>
        &nbsp;
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
    });

    function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
        {users.map(user => (
            <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
            />
        ))}
        </div>
    );
    }

    export default React.memo(UserList);
    ```

    적용을 하고나서 input을 수정 할 때 UserList가 리렌더링 되지않는 것을 확인할 수 있는데, User 중 하나라도 수정하면 모든 User들이 리렌더링되고, CreateUser도 리렌더링이 된다.

    그 이유는 users 배열이 바뀔 때마다 onCreate, onToggle, onRemove 들이 새로 만들어지기 때문이다.

    `deps`에 `[users]`가 들어있기 때문에 당연한것이다.

    이를 최적화 하고싶다면 deps에서 `users`를 지우고 함수들에서 현재 `useState`로 관리하는 `users`를 참조하지 않게 하는 함수형 업데이트를 하는 것이다.

    함수형 업데이트를 하게되면 `setUsers`에 등록하는 콜백함수의 파라미터에서 최신 `users`를 참조 할 수 있기 때문에 `deps`에 `users`를 넣지 않아도 된다.

    각 함수들을 업데이트 해보자

    <br>

    App.js

    ```
    import React, { useRef, useState, useMemo, useCallback } from 'react';
    import UserList from './UserList';
    import CreateUser from './CreateUser';

    function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
    }

    function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setInputs(inputs => ({
        ...inputs,
        [name]: value
        }));
    }, []);
    const [users, setUsers] = useState([
        {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
        },
        {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
        },
        {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
        }
    ]);

    const nextId = useRef(4);
    const onCreate = useCallback(() => {
        const user = {
        id: nextId.current,
        username,
        email
        };
        setUsers(users => users.concat(user));

        setInputs({
        username: '',
        email: ''
        });
        nextId.current += 1;
    }, [username, email]);

    const onRemove = useCallback(id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setUsers(users => users.filter(user => user.id !== id));
    }, []);
    const onToggle = useCallback(id => {
        setUsers(users =>
        users.map(user =>
            user.id === id ? { ...user, active: !user.active } : user
        )
        );
    }, []);
    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성사용자 수 : {count}</div>
        </>
    );
    }

    export default App;
    ```

    리액트 개발을 할 때, `useCallback`, `useMemo`, `React.memo`는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 해야한다.

    예를들어 User 컴포넌트에 `b`와 `button`에 `onClick`으로 설정해준 함수들은 해당 함수들을 `useCallback`으로 재사용한다고 해서 리렌더링을 막을 수 있는 것은 아니므로 굳이 그렇게 할 필요 없다.

    추가적으로 렌더링 최적화 하지 않을 컴포넌트에 `React.memo`를 사용하는 것은, 불필요한 `props` 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용해야 한다.

<br><br>

##