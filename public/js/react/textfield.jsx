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
				processed: false,
				content: {
					label: '',
					placeholder: ''
				},
				value: '',
				errors: [],
				hints: []
			};
		},
		onFocus: function () {
			this.setState({ hasFocus: true });
		},
		onBlur: function() {
			this.setState({ hasFocus: false });
		},
		render: function() {
			var props = this.props,
				content = props.content,
				state = this.state,
				mixins = {
					trigger: this.trigger
				};

			var classes = React.addons.classSet({
				'react-textfield': true,
				focused: state.hasFocus,
				invalid: props.errors.length > 0
			});

			return (<div className={classes}>
				<label>{content.label}</label>
				<input type="text" onFocus={this.onFocus} onBlur={this.onBlur} onChange={mixins.trigger('UPDATE')} value={props.value} placeholder={content.placeholder} />
				<button type="button" onClick={mixins.trigger('CLEAR')}>&times;</button>
				{ 
					Array.isArray(props.hints) && props.hints.length > 0 ? (<div className="hints">
							<ul>
							{
								props.hints.map(function renderHint(hint, idx) {
									return <li key={idx}>{hint}</li>;
								})
							}
							</ul>
						</div>) : null
				}
				{ 
					Array.isArray(props.errors) && props.errors.length > 0 ? (<div className="errors">
							<ul>
							{
								props.errors.map(function renderError(error, idx) {
									return <li key={idx}>{error}</li>
								}) 
							}
						</ul>
					</div>) : null
				}
			</div>);
		}
	});
});


