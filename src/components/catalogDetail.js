var React = require('react');
var Chapter = require('./chapter');

var CatalogDetail = React.createClass({
  render: function() {
    var chapterNodes = this.props.chapters.map(function(chapter, index) {
      return (
        <Chapter catalogId={this.props.catalog._id} chapter={chapter} key={index} />
      );
    }.bind(this));
    return (
      <div>
        <div className="detail">
          <div className="col-md-offset-3 col-md-3 crop">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <div className="col-md-3">
            <p>category: {this.props.catalog.category}</p>
            <p>title: {this.props.catalog.title}</p>
            <p>author: {this.props.catalog.author}</p>
            <p>updatedAt: {this.props.catalog.updatedAt}</p>
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="col-md-12 chapter">
          {chapterNodes}
        </div>
      </div>
    );
  }
});

module.exports = CatalogDetail;
