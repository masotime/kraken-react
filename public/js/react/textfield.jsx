(function (root, factory) {
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['react', 'trigger'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react/addons'), require('./mixins/trigger'));
    }
})(this, function (React, TriggerMixin) {
	'use strict';
	return React.createClass({
		mixins: [TriggerMixin],
		getInitialState: function () {
			return {
				hasFocus: false
			};
		},
		getDefaultProps: function () {
			return {
				value: '',
				label: '',
				placeholder: ''
			};
		},
		onFocus: function () {
			this.setState({ focus: true });
		},
		onBlur: function() {
			this.setState({ focus: false });
		},
		render: function() {
			var props = this.props,
				state = this.state,
				mixins = {
					trigger: this.trigger
				};

			var classes = React.addons.classSet({
				focused: state.hasFocus
			});

			return (<div className={classes}>
				<label>{props.label}</label>
				<input type="text" onFocus={this.onFocus} onBlur={this.onBlur} onChange={mixins.trigger('UPDATE')} value={props.value} placeholder={props.placeholder} />
				<button type="button">&times;</button>
				<div className="hints">			
				{ 
					Array.isArray(props.hints) && props.hints.length > 0 ? (<ul>
						{
							props.hints.map(function renderHint(hint) {
								return <li>{hint}</li>;
							})
						}
					</ul>) : null
				}
				</div>
				<div className="errors">
				{ 
					Array.isArray(props.errors) && props.errors.length > 0 ? (<ul>
						{
							props.errors.map(function renderError(error) {
								return <li>{error}</li>
							}) 
						}
					</ul>) : null
				}			
				</div>
			</div>);
		}
	});
});


