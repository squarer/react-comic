var Category = React.createClass({
  render: function() {
    var category = this.props.category.slice(0, -1);
    return (
      <li>
        <a href={'#/catalog?category=' + this.props.category}>{category}</a>
      </li>
    );
  }
});

var Navbar = React.createClass({
  loadCategories: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(categories) {
        this.setState({categories: categories});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {categories: []};
  },
  componentDidMount: function() {
    this.loadCategories();
  },
  render: function() {
    var categoryNodes = this.state.categories.map(function(category, index) {
      return (
        <Category category={category} key={index} />
      );
    });
    return (
      <div className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-305-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">305</a>
          </div>
          <div className="collapse navbar-collapse navbar-305-collapse">
            <ul className="nav navbar-nav">
              {categoryNodes}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

var Wrapper = React.createClass({
  handleLoadMore: function() {
    this.props.onSearch(this.props.query, true);
  },
  render: function() {
    return (
      <div className="container">
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
            lookup={this.props.lookup}
            more={this.props.more}
            handleLoadMore={this.handleLoadMore}
          />
        </div>
        <ReturnTop />
      </div>
    );
  }
});

var LoadMore = React.createClass({
  render: function() {
    return (
      <button type="button" id="loadMore" className="btn btn-default" onClick={this.props.loadMore}>
        load more...
      </button>
    );
  }
});

var NoMore = React.createClass({
  render: function() {
    return (
      <div className="alert alert-warning" role="alert">
        All items have been loaded
      </div>
    );
  }
});

var ReturnTop = React.createClass({
  returntop: function() {
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({
      scrollTop: 0
    }, 600);
  },
  render: function() {
    return (
      <button type="button" className="btn btn-default returnTop" onClick={this.returntop}>
        <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
        上去囉
      </button>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleKeyDown: function(event) {
    if (event.keyCode == 13) {
      setHash('/catalog?title=' + this.state.value);
    }
  },
  handleClick: function() {
    setHash('/catalog?title=' + this.state.value);
  },
  componentDidMount: function() {
    var url = this.props.url;
    $('.typeahead').typeahead({
      highlight: true,
      hint: false,
      minLength: 1
    },
    {
      source: function(query, results, asyncResults) {
        $.ajax({
          url: url + '?title=' + query,
          dataType: 'json',
          success: function(data) {
            var list = [];
            data.forEach(function(value) {
              list.push(value.title);
            });
            asyncResults(list);
          }
        });
      }
    });

    $('.typeahead').bind('typeahead:select', function(event, suggestion) {
      this.handleChange(event);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="input-group col-md-12">
        <input
          type="text"
          className="form-control input-lg typeahead"
          placeholder="search comic..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref="titleInput"
        />
        <span className="input-group-btn">
          <button className="btn btn-info btn-lg" type="button" onClick={this.handleClick}>
            <i className="glyphicon glyphicon-search"></i>
          </button>
        </span>
      </div>
    );
  }
});

var Catalog = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 col-sm-3 col-xs-4">
        <a href={'#/catalog/' + this.props.catalog._id}>
          <div className="crop">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <p className="caption">{this.props.catalog.title}</p>
        </a>
      </div>
    );
  }
});

var Chapter = React.createClass({
  render: function() {
    return (
      <div className="col-md-2">
        <a href="#">{this.props.chapter.title}</a>
      </div>
    );
  }
})

var CatalogDetail = React.createClass({
  render: function() {
    var chapterNodes = this.props.chapters.map(function(chapter, index) {
      return (
        <Chapter chapter={chapter} key={index} />
      );
    });
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

var Content = React.createClass({
  render: function() {
    var gridNodes = this.props.catalogs.map(function(catalog, index) {
      return (
        <Catalog catalog={catalog} key={index} />
      );
    });
    return (
      this.props.lookup == 'catalog' ?
      <div>
        {gridNodes}
        <div className="clearfix"></div>
        <div className="misc">
          {this.props.more ? <LoadMore loadMore={this.props.handleLoadMore} /> : <NoMore />}
        </div>
      </div> :
      <CatalogDetail catalog={this.props.catalog} chapters={this.props.chapters} />
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {
      catalogs: [],
      catalog: {},
      chapters: [],
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
    var pattern = /(^\/catalog\/.*)/;
    if (url.search(pattern) !== -1) {
      var query = url.match(pattern)[1];
      this.loadCatalog(query);
      this.loadChapters(query);
      return;
    }

    var pattern = /^\/catalog\?(.*)/;
    if (url.search(pattern) === -1) {
      this.handleSearch();
      return;
    }
    var query = url.match(pattern)[1];
    this.handleSearch(query);
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
          query={this.state.query}
          more={this.state.more}
          lookup={this.state.lookup}
        />
        <div className="footer"></div>
      </div>
    );
  }
});

var Spinner = React.createClass({
  render: function() {
    return(
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  }
});

var host = document.querySelector('#container').dataset.host;
var limit = 30;

function setHash(hash) {
  window.location.hash = hash;
}

ReactDOM.render(
  <Main host={host} />,
  document.querySelector('#container')
);
