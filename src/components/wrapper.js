var React = require('react');
var SearchBar = require('./searchBar');
var Content = require('./content');
var NotFound = require('./notFound');
var Spinner = require('./spinner');

var Wrapper = React.createClass({
  handleLoadMore: function() {
    this.props.onSearch(this.props.query, true);
  },
  render: function() {
    return (
      this.props.lookup === '404'
      ? <NotFound />
      : <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <SearchBar url={this.props.url} onSearch={this.props.onSearch} />
            </div>
          <Spinner />
          </div>
          <div className="row grid">
            <Content
              catalogs={this.props.catalogs}
              catalog={this.props.catalog}
              chapters={this.props.chapters}
              pages={this.props.pages}
              pageIndex={this.props.pageIndex}
              lookup={this.props.lookup}
              more={this.props.more}
              handleLoadMore={this.handleLoadMore}
            />
          </div>
        </div>
    );
  }
});

module.exports = Wrapper;
