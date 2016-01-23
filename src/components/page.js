var React = require('react');

var Page = React.createClass({
  render: function() {
    return (
      <div className="well">
        <img className="page-img" src={this.props.url} />
      </div>
    );
  }
});

module.exports = Page;
