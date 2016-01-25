var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="error-page text-center">
        <h1>404</h1>
        <span>Find </span>
        <a href="https://github.com/vivalalova/comic-express">this guy</a>
      </div>
    );
  }
});

module.exports = NotFound;
