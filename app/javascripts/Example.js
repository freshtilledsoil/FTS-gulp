import $ from 'jquery';

class Example {
  speak() {
    console.log('ES6!');

    $('#app').css({
      color: 'rgb(240,55,165)',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'open sans',
    });
  }
}

module.exports = Example;
