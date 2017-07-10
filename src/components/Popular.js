import React, { Component } from 'react';

class Popular extends Component {
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python', 'CSS'];
    return(
      <ul className="languages">
        {languages.map(function(lang) {
          return (
            <li key={lang}>
              {lang}
            </li>
          )
        })}
      </ul>
    );      
  }
}

export default Popular;