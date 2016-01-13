var React = require('react');

var ReturnTop = React.createClass({
  returntop: function() {
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({
      scrollTop: 0
    }, 600);
  },
  render: function() {
    return (
      <button type="button" className="btn btn-default returnTop" onClick={this.returntop}>
        <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
      </button>
    );
  }
});

module.exports = ReturnTop;
