var React = require('react');

var LoadMore = React.createClass({
  componentDidMount: function() {
    window.addEventListener('scroll', function() {
      var loadmore = $("button#loadMore");
      if (loadmore.length <= 0) {
        return;
      }
      if(loadmore.position().top < $(window).scrollTop() + $(window).height()) {
        loadmore.click();
      }
    }, false);
  },
  render: function() {
    return (
      <button type="button" id="loadMore" className="btn btn-raised btn-default" onClick={this.props.loadMore}>
        load more...
      </button>
    );
  }
});

module.exports = LoadMore;
