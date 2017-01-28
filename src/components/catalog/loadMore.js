var React = require('react');

var LoadMore = React.createClass({
  componentDidMount: function() {
    $('#loadMore').button({loadingText: '載入中...'});
  },
  render: function() {
    return (
      <button type="button" id="loadMore" className="btn btn-raised btn-info"
        onClick={this.props.loadMore}
        style={{width: "100%", maxWidth: 500, height: 50, borderRadius: 100}}>
        載入更多內容
      </button>
    );
  }
});

module.exports = LoadMore;
