var Category = React.createClass({
  render: function() {
    var category = this.props.category.slice(0, -1);
    return (
      <li>
        <a href="#">{category}</a>
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
  handleSearch: function(title) {
    var url = this.props.url;
    if (title) {
      url += '?title=' + title.trim();
    }
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(catalogs) {
        this.setState({catalogs: catalogs});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
 getInitialState: function() {
  return {catalogs: []};
 },
 componentDidMount: function() {
  this.handleSearch();
 },
 render: function() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <SearchBar url={this.props.url} onSearch={this.handleSearch} />
        </div>
      </div>
      <div className="row">
        <Content catalogs={this.state.catalogs} />
      </div>
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
  handleSearch: function() {
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
          <button className="btn btn-info btn-lg" type="button" onClick={this.handleSearch}>
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
      <div className="col-md-2 col-sm-3 col-xs-4 thumb">
        <a className="thumbnail" href="#">
          <img className="img-responsive image" src={this.props.catalog.thumbnailurl} />
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
      <div className="grid">
        {gridNodes}
      </div>
    );
  }
});

var host = document.querySelector('#container').dataset.host;

ReactDOM.render(
  <div className="main">
    <Navbar url={host + '/category'} />
    <Wrapper url={host + '/catalog'} />
  </div>,
  document.querySelector('#container')
);
