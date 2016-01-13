var React = require('react');

var LoadMore = React.createClass({
  render: function() {
    return (
      <button type="button" id="loadMore" className="btn btn-default" onClick={this.props.loadMore}>
        load more...
      </button>
    );
  }
});

module.exports = LoadMore;
