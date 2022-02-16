// import React from 'react';  //리액트 컴포넌트를 (함수형태로) 만듬

// function Hello() {
//   return <div>안녕하세요</div>
// }

// export default Hello;   // Hello 라는 컴포넌트를 내보냄, 다른 컴포넌트에서 불러와서 사용 가능

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