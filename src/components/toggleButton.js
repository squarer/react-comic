var React = require('react');

var ToggleButton = React.createClass({
  init: function() {
    var hash = window.location.hash;
    $('.togglebutton').find('input:checkbox').prop('checked', false);
    if (hash.indexOf('sort=update') > -1) {
      $('#newest').prop('checked', true);
    } else if (hash.indexOf('sort=hot') > -1) {
      $('#hottest').prop('checked', true);
    }
  },
  handleChange: function() {
    var that = this;
    $('.togglebutton').on('change', function() {
      var toggled = $(this);
      var checkbox = toggled.find('input:checkbox');
      var another = toggled.parent().siblings().eq(0).find('input:checkbox');
      var order = toggled.attr('data-order');

      if (checkbox.is(':checked')) {
        another.prop('checked', false);
        that.appendHash('&sort=' + order);
      } else {
        window.location.href = window.location.href.replace(/(\&sort=\w+)/, '');
      }
    });
  },
  componentDidMount: function() {
    window.addEventListener('hashchange', this.init, false);
    this.init();
    this.handleChange();
  },
  appendHash: function(hash) {
    var href = window.location.href;
    if (!window.location.hash) {
      href += '#/catalog?';
    }
    href = href.replace(/(\&sort=\w+)/, '');
    window.location.href = href + hash;
  },
  render: function() {
    return(
      <div className="input-group col-xs-12" style={{marginTop: 10}}>
        <div className="col-sm-12 col-xs-6">
          <div data-order="update" className="togglebutton" style={{marginTop: 10}}>
            <label>
              <input id="newest" type="checkbox" />newest
            </label>
          </div>
        </div>
        <div className="col-sm-12 col-xs-6">
          <div data-order="hot" className="togglebutton" style={{marginTop: 10}}>
            <label>
              <input id="hottest" type="checkbox"/>hottest
            </label>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ToggleButton;
