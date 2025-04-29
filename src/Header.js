import React from 'react'
import PropTypes from 'prop-types';

// export const Header = (props) => {
//   return (
//     <header>
//         <h1>{props.title}</h1>
//     </header>
//   )
// }

// destructured props: use {} and get field directly
const Header = ({ title = 'Default title' }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};


Header.propTypes = {
  title: PropTypes.string,
};

export default Header;