define(['react', 'OnMountMixin', 'TriggerMixin'], function(React, OnMountMixin, TriggerMixin) {
    'use strict';

    function propagateEvent(props, eventName, e) {
        if (props[eventName] && typeof props[eventName] === 'function') {
            props[eventName](e);
        }
    }

    var TextField = React.createClass({
        mixins: [OnMountMixin],
        getInitialState: function () {
            return {
                hasFocus: false,
                hasText: false
            };
        },
        getDefaultProps: function () {
            return {
                type: 'text',
                className: 'inputField',
                errors: [],
                hints: [],
                value: '',
                processed: false,
                showInfo: true // shows hints or errors
            };
        },
        onBlur: function (e) {
            this.setState({ hasFocus: false });
            propagateEvent(this.props, 'onBlur', e);
        },
        onFocus: function () {
            this.setState({ hasFocus: true });
            propagateEvent(this.props, 'onFocus', e);
        },
        onChange: function () {
            var props = this.props,
                node = this.refs.value.getDOMNode();
            this.setState({ hasText: (node.value.length > 0) });
            propagateEvent(props, 'onChange', node.value);
            onChange && onChange(node.value);
        },
        render: function () {
            var props = this.props,
                state = this.state;

            var className = this.props.className || 'inputField';
            var showHints = props.hints.length > 0 && props.showInfo;
            var showErrors = props.errors.length > 0 && props.processed && props.showInfo;

            if (showErrors) {
                className += ' has-error';
            }

            if (state.hasFocus) {
                if (showErrors) {
                    containerClass = 'errors';
                    itemClass = 'error-item';
                    infoArray = props.errors;
                } else if (showHints) {
                    containerClass = 'hints';
                    itemClass='hint-item';
                    infoArray = props.hints;
                }
            }

            return (
                <div className={className}>
                    <label htmlFor={props.id || props.name}>{props.label || props.name}</label>
                    <div className="textfield">                    
                        <input ref="value"
                            type={ props.type === 'password' ? 'password' : 'text' } 
                            id={props.id} 
                            name={props.name} 
                            placeholder={props.placeholder || props.label} 
                            onBlur={this.onBlur} 
                            onFocus={this.onFocus}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                            disabled={props.disabled}
                            value={state.value} />
                        { state.hasText ? <FieldWidget className="clear-input" label="&times;" onClick={this.reset} /> : null }
                        { state.hasFocus ? <FieldInfo containerClass={containerClass} itemClass={itemClass} infoArray={infoArray} /> : null }
                    </div>
                </div>
            );
        }
    });

    var FieldInfo = React.createClass({
        getDefaultProps: function () {
            return {
                containerClass: 'info',
                itemClass: 'info-item',
                infoArray: []
            };
        },
        render: function () {
            var self = this;
            var infoArray = self.props.infoArray;
            var items = infoArray.map(function(info) {
                return <li className={self.props.itemClass} dangerouslySetInnerHTML={{__html: info}}></li>;
            });

            if (items.length === 0) {
                return null;
            } else if (items.length === 1) {
                return (
                    <div className={this.props.containerClass}>
                        <span className={self.props.itemClass} dangerouslySetInnerHTML={{__html: infoArray[0]}}></span>
                    </div>
                );
            } else {
                return (
                    <div className={this.props.containerClass}>
                        <ul>
                            {items}
                        </ul>
                    </div>
                );
            }
        }
    });

    var FieldWidget = React.createClass({
        getDefaultProps: function () {
            return {
                className: '',
                label: ''
            };
        },
        onClick: function (e) {
            e.preventDefault();
            if (this.props.onClick) {
                this.props.onClick();
            }
        }, render: function () {
            return (
                <button tabIndex="-1" className={this.props.className} onClick={this.onClick}>{this.props.label}</button>
            );
        }
    });

    return TextField;
});
