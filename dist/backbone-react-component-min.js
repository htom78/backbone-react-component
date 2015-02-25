!function(a,b){"function"==typeof define&&define.amd?define(["react","backbone","underscore"],b):"undefined"!=typeof module&&module.exports?module.exports=b(require("react"),require("backbone"),require("underscore")):b(a.React,a.Backbone,a._)}(this,function(a,b,c){"use strict";function d(a,b,d){this.component=a;var e=d||a.props||{},f=e.model,g=e.collection;"undefined"!=typeof f&&(f.attributes||"object"==typeof f&&c.values(f)[0].attributes)&&(this.model=f,this.setStateBackbone(f,void 0,b)),"undefined"!=typeof g&&(g.models||"object"==typeof g&&c.values(g)[0].models)&&(this.collection=g,this.setStateBackbone(g,void 0,b)),this.startModelListeners(),this.startCollectionListeners()}return b.React||(b.React={}),b.React.Component||(b.React.Component={}),b.React.Component.mixin={childContextTypes:{hasParentBackboneMixin:a.PropTypes.bool.isRequired,parentModel:a.PropTypes.any,parentCollection:a.PropTypes.any},contextTypes:{hasParentBackboneMixin:a.PropTypes.bool,parentModel:a.PropTypes.any,parentCollection:a.PropTypes.any},getChildContext:function(){return{hasParentBackboneMixin:!0,parentModel:this.getModel(),parentCollection:this.getCollection()}},componentDidMount:function(){this.setElement(this.getDOMNode())},componentDidUpdate:function(){this.setElement(this.getDOMNode())},getInitialState:function(){var a={};return this.wrapper||(this.wrapper=new d(this,a)),a},componentWillMount:function(){this.wrapper||(this.wrapper=new d(this))},componentWillUnmount:function(){this.wrapper&&(this.wrapper.stopListening(),delete this.wrapper)},componentWillReceiveProps:function(a){var b=a.model,c=a.collection;this.wrapper.model&&b?this.wrapper.model!==b&&(this.wrapper.stopListening(),this.wrapper=new d(this,void 0,a)):b&&(this.wrapper=new d(this,void 0,a)),this.wrapper.collection&&c?this.wrapper.collection!==c&&(this.wrapper.stopListening(),this.wrapper=new d(this,void 0,a)):c&&(this.wrapper=new d(this,void 0,a))},$:function(){var a;if(this.$el)a=this.$el.find.apply(this.$el,arguments);else{var b=this.getDOMNode();a=b.querySelector.apply(b,arguments)}return a},getCollection:function(){return this.wrapper.collection||this.context.parentCollection},getModel:function(){return this.wrapper.model||this.context.parentModel},setElement:function(a){if(a&&b.$&&a instanceof b.$){if(a.length>1)throw new Error("You can only assign one element to a component");this.el=a[0],this.$el=a}else a&&(this.el=a,b.$&&(this.$el=b.$(a)));return this}},c.extend(d.prototype,b.Events,{onError:function(a,b,c){c.silent||this.component.setState({isRequesting:!1,hasError:!0,error:b})},onInvalid:function(a,b,c){c.silent||this.component.setState({isInvalid:!0})},onRequest:function(a,b,c){c.silent||this.component.setState({isRequesting:!0,hasError:!1,isInvalid:!1})},onSync:function(a,b,c){c.silent||this.component.setState({isRequesting:!1})},setStateBackbone:function(a,b,c){if(a.models||a.attributes)this.setState.apply(this,arguments);else for(b in a)this.setStateBackbone(a[b],b,c)},setState:function(a,d,e){var f={},g=a.toJSON?a.toJSON():a;d?f[d]=g:a instanceof b.Collection?f.collection=g:f.model=g,e?c.extend(e,f):this.component.setState(f)},startCollectionListeners:function(a,b){if(a||(a=this.collection),a)if(a.models)this.listenTo(a,"add remove change sort reset",c.partial(this.setStateBackbone,a,b,void 0)).listenTo(a,"error",this.onError).listenTo(a,"request",this.onRequest).listenTo(a,"sync",this.onSync);else if("object"==typeof a)for(b in a)a.hasOwnProperty(b)&&this.startCollectionListeners(a[b],b)},startModelListeners:function(a,b){if(a||(a=this.model),a)if(a.attributes)this.listenTo(a,"change",c.partial(this.setStateBackbone,a,b,void 0)).listenTo(a,"error",this.onError).listenTo(a,"request",this.onRequest).listenTo(a,"sync",this.onSync).listenTo(a,"invalid",this.onInvalid);else if("object"==typeof a)for(b in a)this.startModelListeners(a[b],b)}}),b.React.Component.mixin});