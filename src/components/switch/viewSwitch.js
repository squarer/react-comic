var React = require('react');

var ViewSwitch = React.createClass({
  handleChange: function() {
    var mode = $('#viewSwitch').is(':checked') ? 'paging' : 'scroll';
    this.props.onChange(mode);
  },
  componentDidMount: function() {
    $('.togglebutton').on('change', function() {
      this.handleChange();
    }.bind(this));
  },
  render: function() {
    return(
      <div className="input-group col-xs-12 view-switch">
        <div data-order="update" className="togglebutton">
          <label>
            <input id="viewSwitch" type="checkbox" />scroll/paging
          </label>
        </div>
      </div>
    );
  }
});

module.exports = ViewSwitch;
