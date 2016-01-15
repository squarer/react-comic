var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('./components/navbar');
var Wrapper = require('./components/wrapper');

var Main = React.createClass({
  getInitialState: function() {
    return {
      catalogs: [],
      catalog: {},
      chapters: [],
      chapterId: '',
      pages: [],
      pageIndex: 1,
      query: '',
      skip: limit,
      more: true,
      lookup: 'catalog'
    };
  },
  componentDidMount: function() {
    window.addEventListener('hashchange', this.navigate, false);
    this.navigate();
  },
  navigate: function() {
    var url = window.location.hash.substring(1);
    if (!url) {
      this.handleSearch();
      return;
    }

    // catch route to page, ex. /catalog/xxx/chapter/xxx/page/123/
    var pattern = /(^\/catalog\/\w+\/chapter\/)(\w+)\/page\/(\d+)/;
    if (url.search(pattern) !== -1) {
      var chapterId = url.match(pattern)[2];
      var pageIndex = url.match(pattern)[3];
      var query = url.match(pattern)[1] + chapterId + '/page';
      if (chapterId === this.state.chapterId) {
        this.setState({lookup: 'page', pageIndex: pageIndex});
      } else {
        this.loadPages(query, chapterId, pageIndex);
      }
      return;
    }

    // catch route to specific catalog, ex. /catalog/xxx/
    var pattern = /(^\/catalog\/\w+)\/$/;
    if (url.search(pattern) !== -1) {
      var query = url.match(pattern)[1];
      this.loadCatalog(query);
      return;
    }

    // catch route to query catalogs
    // ex. /catalog?title=xxx, /catalog?category=xxx
    var pattern = /^\/catalog\?(.*)/;
    if (url.search(pattern) !== -1) {
      var query = url.match(pattern)[1];
      this.handleSearch(query);
      return;
    }

    this.setState({lookup: '404'});
  },
  loadPages: function(query, chapterId, pageIndex) {
    var url = this.props.host + query;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        var pages = [];
        data.forEach(function(value) {
          pages.push(value.url);
        });
        this.setState({
          chapterId: chapterId,
          pages: pages,
          pageIndex: pageIndex,
          lookup: 'page'
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  loadCatalog: function(query) {
    var url = this.props.host + query;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(catalog) {
        this.setState({
          catalog: catalog[0],
          catalogs: [],
          chapters: [],
          lookup: 'catalogDetail'
      });
      if (catalog.length === 0) {
        return;
      }
      this.loadChapters(query);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  loadChapters: function(query) {
    var spinner = document.querySelector('.spinner');
    $(spinner).addClass('spinner-down');
    $(spinner).show();
    var url = this.props.host + query + '/chapter';
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(chapters) {
        this.setState({chapters: chapters});
        $(spinner).fadeOut();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  handleSearch: function(query, loadMore = false) {
    var spinner = document.querySelector('.spinner');
    var loadMoreButton = document.querySelector('#loadMore');
    $(spinner).removeClass('spinner-down');
    $(spinner).show();

    var url = this.props.host + '/catalog?' + query;
    if (loadMore) {
      url += '&skip=' + this.state.skip;
      $(loadMoreButton).button('loading');
    } else {
      $('.grid').addClass('blur');
    }
    url += '&limit=' + parseInt(limit + 1);
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(catalogs) {
        var more = false;
        if (catalogs.length > limit) {
          more = true;
          catalogs.splice(-1, 1);
          $(loadMoreButton).button('reset');
        }
        this.setState({
          catalogs: loadMore ? this.state.catalogs.concat(catalogs) : catalogs,
          query: query,
          catalog: {},
          lookup: 'catalog',
          skip: loadMore ? this.state.skip + limit : limit,
          more: more
        });
        $('.grid').removeClass('blur');
        $(spinner).fadeOut();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var host = this.props.host;
    return (
      <div>
        <Navbar url={host + '/category'} />
        <Wrapper
          url={host + '/catalog'}
          onSearch={this.handleSearch}
          catalogs={this.state.catalogs}
          catalog={this.state.catalog}
          chapters={this.state.chapters}
          pages={this.state.pages}
          pageIndex={this.state.pageIndex}
          query={this.state.query}
          more={this.state.more}
          lookup={this.state.lookup}
        />
        <div className="footer"></div>
      </div>
    );
  }
});

var host = document.querySelector('#container').dataset.host;
var limit = 30;

ReactDOM.render(
  <Main host={host} />,
  document.querySelector('#container')
);
