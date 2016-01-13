var React = require('react');

var NoMore = React.createClass({
  render: function() {
    return (
      <div className="alert alert-warning text-center" role="alert">
        All items have been loaded
      </div>
    );
  }
});

module.exports = NoMore;
