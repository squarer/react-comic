var React = require('react');
var Pagination = require('./pagination');
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
    window.addEventListener('scroll', function() {
      var pagination = $(".pagination");
      if ($.active > 0) {
        return;
      }
      if(pagination.position().top < $(window).scrollTop() + $(window).height()) {
        this.loadNextPage();
      }
    }.bind(this), false);
  },
  loadNextPage: function() {
    if (this.props.pages.length <= this.state.loadPageCount)
      return;
    this.setState({loadPageCount: this.state.loadPageCount + 1});
  },
  toNext: function(e) {
    var keyCode = e.keyCode || 39;
    var tag = e.target.tagName.toLowerCase();
    if (keyCode !== 39 && keyCode !== 75 || this.isInputTag(tag)) {
      return false;
    }
    var currentIndex = this.getCurrentIndex();
    if (currentIndex === this.props.pages.length) {
      return false;
    }
    window.location.href = this.getUrl(currentIndex+ 1);
  },
  toPrevious: function(e) {
    var keyCode = e.keyCode || 37;
    var tag = e.target.tagName.toLowerCase();
    if (keyCode !== 37 && keyCode !== 74 || this.isInputTag(tag)) {
      return false;
    }
    var currentIndex = this.getCurrentIndex();
    if (currentIndex === 1) {
      return false;
    }
    window.location.href = this.getUrl(currentIndex - 1);
  },
  isInputTag: function(tag) {
    return tag === 'input' || tag === 'textarea';
  },
  getUrl: function(index) {
    var href = window.location.href;
    href = href.substring(0, href.lastIndexOf('/page/')) + '/page/' + index;
    return href;
  },
  getCurrentIndex: function() {
    return this.props.pageIndex < 1 ? 1 : parseInt(this.props.pageIndex);
  },
  render: function() {
    var index = this.getCurrentIndex();
    
    var loadPage = [];
    for (var i = 0; i < this.state.loadPageCount; i++) {
      var url = this.props.pages[i];
      loadPage.push(url);
    }
    return (
      <div>
        <Breadcrumbs catalog={this.props.catalog} chapter={this.props.chapter} />
        <div className="page text-center">
          { loadPage.map(function (result) {
              return <Page url={result} />;
          })}
        </div>
        <div className="text-center">
          <Pagination pages={this.props.pages} currentIndex={index} getUrl={this.getUrl} />
        </div>
        <ReturnTop />
      </div>
    );
  }
});

module.exports = Pages;
