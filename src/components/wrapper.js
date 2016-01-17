var React = require('react');
var Catalog = require('./catalog');
var CatalogDetail = require('./catalogDetail');
var Page = require('./page');
var LoadMore = require('./loadMore');
var NoMore = require('./noMore');
var ReturnTop = require('./returnTop');
var NotFound = require('./notFound');

var Wrapper = React.createClass({
  componentToRender: function() {
    var gridNodes = this.props.catalogs.map(function(catalog, index) {
      return (
        <Catalog catalog={catalog} key={index} />
      );
    });
    var component = null;
    switch (this.props.lookup) {
      case 'catalog':
        component = (
          <div>
            <div className="row">
              {gridNodes}
            </div>
            <div className="clearfix"></div>
            <div className="misc">
              {this.props.more ? <LoadMore loadMore={this.handleLoadMore} /> : <NoMore />}
            </div>
            <ReturnTop />
          </div>
        );
        break;
      case 'catalogDetail':
        component = <CatalogDetail catalog={this.props.catalog} chapters={this.props.chapters} />;
        break;
      case 'page':
        component = <Page pages={this.props.pages} pageIndex={this.props.pageIndex} />;
        break;
      case '404':
        component = <NotFound />
        break;
    }
    return component;
  },
  handleLoadMore: function() {
    this.props.onSearch(this.props.query, true);
  },
  render: function() {
    return this.componentToRender();
  }
});

module.exports = Wrapper;
