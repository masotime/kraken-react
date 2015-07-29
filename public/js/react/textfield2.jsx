// The following props are accepted:
// * [OPTIONAL] type (password or text)
// * [OPTIONAL] className
// * value
// * content.label, content.placeholder, content.errors[] and content.hints[],
// * validated (boolean)
// * showInfo (boolean)

define(['react', 'OnMountMixin', 'TriggerMixin'], function(React, OnMountMixin, TriggerMixin) {
    'use strict';

    function propagateEvent(props, eventName, e) {
        if (props[eventName] && typeof props[eventName] === 'function') {
            props[eventName](e);
        }
    }

    var TextField = React.createClass({
        mixins: [OnMountMixin, TriggerMixin],
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
                value: '',
                content: {
                    label: 'label',
                    placeholder: 'placeholder',
                    errors: [],
                    hints: []
                },
                validated: false, // show errors (e.g. after blur)
                showInfo: true // shows hints or errors
            };
        },
        onBlur: function (e) {
            this.setState({ hasFocus: false });
            propagateEvent(this.props, 'onBlur', e);
        },
        onFocus: function (e) {
            this.setState({ hasFocus: true });
            propagateEvent(this.props, 'onFocus', e);
        },
        onChange: function (e) {
            var props = this.props,
                mixin = {
                    trigger: this.trigger
                };
            this.setState({ hasText: (e.target.value.length > 0) });
            propagateEvent(props, 'onChange', e); // note how this is different, I pass in the value instead of the event.
            mixin.trigger('UPDATE')(e.target.value); // programmatic trigger
        },
        render: function () {
            var props = this.props,
                state = this.state,
                content = props.content || {},
                mixin = {
                    trigger: this.trigger
                };

            // some defensive coding
            content.errors = content.errors || [];
            content.hints = content.hints || [];

            var showHints = content.hints.length > 0 && props.showInfo,
                showErrors = content.errors.length > 0 && props.validated && props.showInfo,
                infoBox = {
                    visible: state.hasFocus && (showHints || showErrors),
                    className: showErrors ? 'errors' : 'hints',
                    items: showErrors ? content.errors : content.hints
                };

            return (
                <div className={props.className}>
                    <label htmlFor={props.id || props.name}>{props.label || props.name}</label>
                    <div className="textfield">                    
                        <input ref="value"
                            type={ props.type === 'password' ? 'password' : 'text' } 
                            id={props.id} 
                            name={props.name} 
                            placeholder={content.placeholder || content.label} 
                            onBlur={this.onBlur} 
                            onFocus={this.onFocus}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                            disabled={props.disabled}
                            value={props.value} />
                        { state.hasText ? <button tabIndex="-1" className="clear-input" onClick={mixin.trigger('CLEAR')}>&times;</button> : null }
                        { infoBox.visible ? <FieldInfo ckassName={infoBox.className} items={infoBox.items} /> : null }
                    </div>
                </div>
            );
        }
    });

    var FieldInfo = React.createClass({
        getDefaultProps: function () {
            return {
                className: 'info',
                items: []
            };
        },
        render: function () {
            var props = this.props, itemEl;

            if (props.items.length === 0) {
                itemEl = <span className="item" dangerouslySetInnerHTML={{__html: props.items[0]}}></span>;
            } else {
                itemEl = 
                    <ul> { 
                        props.items.map( function(item, index) { return <li index={index} className="item" dangerouslySetInnerHTML={{__html: item}}></li>; } )
                    } </ul>;
            }

            return <div className={props.className}> { itemEl } </div>;
        }
    });

    return TextField;
});
