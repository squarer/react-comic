var React = require('react');
var Breadcrumbs = require('./breadcrumbs');
var Page = require('./page');
var ReturnTop = require('./returnTop');

var Pages = React.createClass({
  getInitialState: function () {
      return {
          loadPageCount: 1
      }
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll, false);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll: function() {
    var endFlag = $(".end-flag");
    if (endFlag.length <= 0) {
      return;
    }
    if ($.active > 0) {
      return;
    }
    if(endFlag.position().top < $(window).scrollTop() + $(window).height()) {
      this.loadNextPage();
    }
  },
  loadNextPage: function() {
    if (this.props.pages.length <= this.state.loadPageCount)
      return;
    this.setState({loadPageCount: this.state.loadPageCount + 1});
  },
  render: function() {
    var loadPage = [];
    for (var i = 0; i < this.state.loadPageCount; i++) {
      var url = this.props.pages[i];
      loadPage.push(url);
    }
    var pageNodes = loadPage.map(function(result, index) {
      return <Page url={result} key={index} />
    });
    return (
      <div>
        <Breadcrumbs catalog={this.props.catalog} chapter={this.props.chapter} />
        <div className="page text-center">
          {pageNodes}
        </div>
        <div className="text-center">
          <div className="alert alert-info end-flag" role="alert">
            bottom of content
          </div>
        </div>
        <ReturnTop />
      </div>
    );
  }
});

module.exports = Pages;
