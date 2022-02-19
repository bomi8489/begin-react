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
    이제 App 컴포넌트에서 useRef 를 사용하여 변수를 관리해볼건데, 용도는 우리가 앞으로 배열에 새 항목을 추가할건데, 새 항목에서 사용 할 고유 id 를 관리하는 용도이다.
    
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

## 