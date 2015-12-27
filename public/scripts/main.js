var Category = React.createClass({
  handleClick: function() {
    $('.grid').addClass('blur');
    this.props.byCategory(null, this.props.category);
  },
  render: function() {
    var category = this.props.category.slice(0, -1);
    return (
      <li>
        <a href="#" onClick={this.handleClick}>{category}</a>
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
    var that = this;
    var categoryNodes = this.state.categories.map(function(category, index) {
      return (
        <Category category={category} key={index} byCategory={that.props.byCategory}/>
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
    this.props.byTitle(this.props.title, this.props.category, true);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <SearchBar url={this.props.url} onSearch={this.props.byTitle} />
          </div>
        <Spinner />
        </div>
        <div className="row grid">
          <Content catalogs={this.props.catalogs} />
        </div>
        <div className="clearfix"></div>
        <ReturnTop />
        {this.props.more ? <LoadMore loadMore={this.handleLoadMore} /> : <NoMore />}
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

var NoMore = React.createClass({
  render: function() {
    return (
      <div className="alert alert-warning" role="alert">
        All items have been loaded
      </div>
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
      this.props.onSearch(this.state.value);
    }
  },
  handleClick: function() {
    this.props.onSearch(this.state.value);
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

    var that = this;
    $('.typeahead').bind('typeahead:select', function(event, suggestion) {
      that.handleChange(event);
    });
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
        <a href="#">
          <div className="crop">
            <img className="img-responsive" src={this.props.catalog.thumbnailurl} />
          </div>
          <p className="caption">{this.props.catalog.title}</p>
        </a>
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
      <div>
        {gridNodes}
      </div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {
      catalogs: [],
      title: null,
      category: null,
      skip: limit,
      more: true
    };
  },
  componentDidMount: function() {
    this.handleSearch();
  },
  handleSearch: function(title, category, loadMore = false) {
    var spinner = document.querySelector('.spinner');
    var loadMoreButton = document.querySelector('#loadMore');
    $(spinner).show();

    var url = this.props.host + '/catalog?';
    if (title) {
      url += 'title=' + title.trim() + '&';
    }
    if (category) {
      url += 'category=' + category + '&';
    }
    if (loadMore) {
      url += 'skip=' + this.state.skip + '&';
      this.setState({skip: this.state.skip + limit});
      $(loadMoreButton).button('loading');
    } else {
      this.setState({skip: limit});
    }
    url += 'limit=' + parseInt(limit + 1);
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(catalogs) {
        if (catalogs.length <= limit) {
          this.setState({more: false});
        } else {
          catalogs.splice(-1, 1);
          this.setState({more: true});
          $(loadMoreButton).button('reset');
        }
        this.setState({
          catalogs: loadMore ? this.state.catalogs.concat(catalogs) : catalogs,
          title: title,
          category: category
        });
        $('.grid').removeClass('blur');
        $(spinner).fadeOut();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var host = this.props.host;
    return (
      <div>
        <Navbar url={host + '/category'} byCategory={this.handleSearch} />
        <Wrapper
          url={host + '/catalog'}
          byTitle={this.handleSearch}
          catalogs={this.state.catalogs}
          title={this.state.title}
          category={this.state.category}
          more={this.state.more}
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

ReactDOM.render(
  <Main host={host} />,
  document.querySelector('#container')
);
