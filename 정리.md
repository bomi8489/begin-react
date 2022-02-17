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
<br>

## ㅇㅇ