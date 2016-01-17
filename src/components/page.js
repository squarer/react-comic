var React = require('react');
var Pagination = require('./pagination');
var Breadcrumbs = require('./breadcrumbs');

var Page = React.createClass({
  componentDidMount: function() {
    var img = document.querySelector('.page-img');
    img.onload = function() {
      var spinner = document.querySelector('.spinner');
      $(spinner).fadeOut();
    };
    img.addEventListener('click', this.toNext, false);
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      this.toPrevious(e);
    }.bind(this), false);
    window.addEventListener('keydown', function(e) {
      this.toNext(e);
      this.toPrevious(e);
    }.bind(this), false);
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
  componentWillUpdate: function() {
    var spinner = document.querySelector('.spinner');
    $(spinner).addClass('spinner-down');
    $(spinner).show();
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
    var url = this.props.pages[index - 1];
    return (
      <div>
        <Breadcrumbs catalog={this.props.catalog} chapter={this.props.chapter} />
        <div className="page text-center">
          <img className="page-img" src={url} />
        </div>
        <div className="text-center">
          <Pagination pages={this.props.pages} currentIndex={index} getUrl={this.getUrl} />
        </div>
      </div>
    );
  }
});

module.exports = Page;
