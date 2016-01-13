var React = require('react');
var Catalog = require('./catalog');
var CatalogDetail = require('./catalogDetail');
var Page = require('./page');
var LoadMore = require('./loadMore');
var NoMore = require('./noMore');

var Content = React.createClass({
  render: function() {
    var gridNodes = this.props.catalogs.map(function(catalog, index) {
      return (
        <Catalog catalog={catalog} key={index} />
      );
    });
    return (
      this.props.lookup == 'catalog'
        ? <div>
            {gridNodes}
            <div className="clearfix"></div>
            <div className="misc">
              {this.props.more ? <LoadMore loadMore={this.props.handleLoadMore} /> : <NoMore />}
            </div>
          </div>
        : this.props.catalog === undefined
          ? <div className="alert alert-danger text-center" role="alert">
              No results Found
            </div>
          : this.props.lookup == 'page'
            ? <Page pages={this.props.pages} pageIndex={this.props.pageIndex} />
            : <CatalogDetail catalog={this.props.catalog} chapters={this.props.chapters} />
    );
  }
});

module.exports = Content;
