var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('./components/navbar');
var Wrapper = require('./components/wrapper');
var SearchBar = require('./components/searchBar');
var Switch = require('./components/switch');
var Spinner = require('./components/spinner');

var Main = React.createClass({
  getInitialState: function() {
    return {
      catalogs: [],
      catalog: {},
      chapters: [],
      chapter: {},
      pages: [],
      pageIndex: 1,
      query: '',
      skip: limit,
      more: true,
      lookup: '',
      sort: false
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

    // catch route to page, ex. /catalog/xxx/chapter/xxx/page/123
    var pattern = /^\/catalog\/(\w+)\/chapter\/(\w+)\/page\/(\d+)/;
    if (url.search(pattern) !== -1) {
      var catalogId = url.match(pattern)[1];
      var chapterId = url.match(pattern)[2];
      var pageIndex = url.match(pattern)[3];
      var query = '/catalog/' + catalogId + '/chapter/' + chapterId + '/page';
      // for breadcrumbs
      if (catalogId !== this.state.catalog._id) {
        this.loadCatalog('/catalog/' + catalogId, 'page');
      }
      if (chapterId === this.state.chapter._id) {
        this.setState({lookup: 'page', pageIndex: pageIndex});
      } else {
        this.loadPages(query, chapterId, pageIndex, catalogId);
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
      this.handleSwitch(query);
      this.handleSearch(query);
      return;
    }

    this.setState({lookup: '404'});
  },
  handleSwitch: function(query) {
    var pattern = /sort=(\w+)/;
    if (query.search(pattern) !== -1) {
      var order = query.match(pattern)[1];
      this.setState({sort: order});
      $('#newest').prop('checked', order === 'update');
      $('#hottest').prop('checked', order === 'hot');
    } else {
      this.setState({sort: false});
      $('#newest').prop('checked', false);
      $('#hottest').prop('checked', false);
    }
  },
  loadPages: function(query, chapterId, pageIndex, catalogId) {
    var url = this.props.host + query;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        var pages = [];
        data.forEach(function(value) {
          pages.push(value.url);
        });
        // 20th265話_1 => 265話
        var chapterTitle = data[0].key.replace(catalogId, '').split('_')[0];
        this.setState({
          chapter: {_id: chapterId, title: chapterTitle},
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
  loadCatalog: function(query, lookup = 'catalogDetail') {
    var url = this.props.host + query;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(catalog) {
        this.setState({
          catalog: catalog[0],
          catalogs: [],
          chapters: [],
          lookup: lookup
      });
      if (catalog.length === 0) {
        return;
      }
      lookup === 'catalogDetail' ? this.loadChapters(query) : '';
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
    var checkbox = $('input:checkbox');
    $(spinner).removeClass('spinner-down');
    $(spinner).show();
    checkbox.prop('disabled', true);

    var url = this.props.host + '/catalog?' + query;
    if (loadMore) {
      url += '&skip=' + this.state.skip;
      $(loadMoreButton).button('loading');
    } else {
      $('.catalog-nodes').addClass('blur');
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
        $('.catalog-nodes').removeClass('blur');
        $(spinner).fadeOut();
        checkbox.removeAttr('disabled');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var host = this.props.host;
    return (
      <div className="container">
        <Navbar url={host + '/category'} sort={this.state.sort} />
        <div className="row searchbar" style={{marginBottom: 20}}>
          <div className="col-md-offset-3 col-md-6 col-sm-9">
            <SearchBar url={host + '/catalog'} />
          </div>
          <div className={this.state.lookup === 'catalog' ? 'col-md-3 col-sm-3' : 'hidden'}>
            <Switch />
          </div>
        </div>
        <Wrapper
          onSearch={this.handleSearch}
          catalogs={this.state.catalogs}
          catalog={this.state.catalog}
          chapters={this.state.chapters}
          chapter={this.state.chapter}
          pages={this.state.pages}
          pageIndex={this.state.pageIndex}
          query={this.state.query}
          more={this.state.more}
          lookup={this.state.lookup}
        />
        <Spinner />
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
