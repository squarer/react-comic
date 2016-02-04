var React = require('react');
var Catalog = require('./catalog/catalog');
var LoadMore = require('./catalog/loadMore');
var NoMore = require('./catalog/noMore');
var CatalogDetail = require('./catalogDetail/catalogDetail');
var ScrollView = require('./page/scrollView');
var PagingView = require('./page/pagingView');
var ReturnTop = require('./common/returnTop');
var NotFound = require('./common/notFound');

var Wrapper = React.createClass({
  componentToRender: function() {
    var catalogNodes = this.props.catalogs.map(function(catalog, index) {
      return (
        <Catalog catalog={catalog} key={index} index={index} />
      );
    });
    var component = null;
    switch (this.props.lookup) {
      case 'catalog':
        $('.grid').masonry();
        component = (
          <div>
            <div className="row catalog-nodes grid">
              <div className="grid-sizer col-lg-2 col-md-3 col-sm-4 col-xs-6"></div>
              {catalogNodes}
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
        var viewMode = localStorage.getItem('viewMode') ? localStorage.getItem('viewMode') : this.props.viewMode
        component = viewMode === 'scroll'
        ? <ScrollView
            pages={this.props.pages}
            pageIndex={this.props.pageIndex}
            catalog={this.props.catalog}
            chapter={this.props.chapter}
            nextChapter={this.props.nextChapter}
            prevChapter={this.props.prevChapter}
            viewMode={this.props.viewMode}
          />
        : <PagingView
            pages={this.props.pages}
            pageIndex={this.props.pageIndex}
            catalog={this.props.catalog}
            chapter={this.props.chapter}
            nextChapter={this.props.nextChapter}
            prevChapter={this.props.prevChapter}
            viewMode={this.props.viewMode}
         />;
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
