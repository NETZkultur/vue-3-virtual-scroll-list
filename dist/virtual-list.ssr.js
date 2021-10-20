'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = vue.defineComponent({
  props: {
    size: {
      type: Number,
      required: true
    },
    remain: {
      type: Number,
      required: true
    },
    paddingTop: {
      type: Number,
      required: false
    },
    windowHeight: {
      type: Number,
      required: false
    },
    rtag: {
      type: String,
      default: "div"
    },
    wtag: {
      type: String,
      default: "div"
    },
    wclass: {
      type: String,
      default: ""
    },
    wstyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    start: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    variable: {
      type: [Function, Boolean],
      default: false
    },
    bench: {
      type: Number,
      default: 0 // also equal to remain

    },
    totop: {
      type: [Function, Boolean],
      default: false
    },
    tobottom: {
      type: [Function, Boolean],
      default: false
    },
    onscroll: {
      type: [Function, Boolean],
      // Boolean disables default behavior
      default: false
    },
    istable: {
      type: Boolean,
      default: false
    },
    item: {
      type: [Function, Object],
      default: null
    },
    itemcount: {
      type: Number,
      default: 0
    },
    itemprops: {
      type: Function,

      /* istanbul ignore next */
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: function _default() {}
    }
  },
  methods: {
    forceRender: function forceRender() {
      var _this = this;

      window.requestAnimationFrame(function () {
        _this.$forceUpdate();
      });
    },
    // set manual scroll top.
    setScrollTop: function setScrollTop(scrollTop) {
      this.$el.scrollTop = scrollTop;
    }
  },
  setup: function setup(props, context) {
    var _this2 = this;

    var instance = vue.getCurrentInstance();
    var vsl = vue.ref(null);
    var changeProp = "";
    var delta = Object.create(null);
    var start = props.start >= props.remain ? props.start : 0;
    var keeps = props.remain + (props.bench || props.remain);
    delta.direction = ""; // current scroll direction, D: down, U: up.

    delta.scrollTop = 0; // current scroll top, use to direction.

    delta.start = start; // start index.

    delta.end = start + keeps - 1; // end index.

    delta.keeps = keeps; // nums keeping in real dom.

    delta.total = 0; // all items count, update in filter.

    delta.offsetAll = 0; // cache all the scrollable offset.

    delta.paddingTop = 0; // container wrapper real padding-top.

    delta.paddingBottom = 0; // container wrapper real padding-bottom.

    delta.varCache = {}; // object to cache variable index height and scroll offset.

    delta.varAverSize = 0; // average/estimate item height before variable be calculated.

    delta.varLastCalcIndex = 0; // last calculated variable height/offset index, always increase.
    //force render ui list if needed.
    // call this before the next rerender to get better performance.

    var forceRender = function forceRender() {
      window.requestAnimationFrame(function () {
        var _instance$proxy;

        instance === null || instance === void 0 ? void 0 : (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$forceUpdate();
      });
    };

    var defaultSlot = vue.computed(function () {
      var _context$slots, _context$slots$defaul;

      var slots = (_context$slots = context.slots) === null || _context$slots === void 0 ? void 0 : (_context$slots$defaul = _context$slots.default) === null || _context$slots$defaul === void 0 ? void 0 : _context$slots$defaul.call(_context$slots);
      return slots.map(function (s) {
        return s.type.toString().startsWith("Symbol") ? s.children : s;
      }).flat();
    }); // return the right zone info based on `start/index`.

    var getZone = function getZone(index) {
      var start, end;
      index = parseInt(index, 10);
      index = Math.max(0, index);
      var lastStart = delta.total - delta.keeps;
      var isLast = index <= delta.total && index >= lastStart || index > delta.total;

      if (isLast) {
        start = Math.max(0, lastStart);
      } else {
        start = index;
      }

      end = start + delta.keeps - 1;

      if (delta.total && end > delta.total) {
        end = delta.total - 1;
      }

      return {
        end: end,
        start: start,
        isLast: isLast
      };
    }; // return a variable size (height) from given index.


    var getVarSize = function getVarSize(index, nocache) {
      var cache = delta.varCache[index];

      if (!nocache && cache) {
        return cache.size;
      }

      if (typeof props.variable === "function") {
        return props.variable(index) || 0;
      } else {
        var slot = defaultSlot.value[index];
        var style = slot && slot.props && slot.props.style;

        if (style && style.height) {
          var shm = style.height.match(/^(.*)px$/);
          return shm && +shm[1] || 0;
        }
      }

      return 0;
    }; // return a variable scroll offset from given index.


    var getVarOffset = function getVarOffset(index, nocache) {
      var cache = delta.varCache[index];

      if (!nocache && cache) {
        return cache.offset;
      }

      var offset = 0;

      for (var i = 0; i < index; i++) {
        var size = getVarSize(i, nocache);
        delta.varCache[i] = {
          size: size,
          offset: offset
        };
        offset += size;
      }

      delta.varLastCalcIndex = Math.max(delta.varLastCalcIndex, index - 1);
      delta.varLastCalcIndex = Math.min(delta.varLastCalcIndex, delta.total - 1);
      return offset;
    }; // set manual scroll top.


    var setScrollTop = function setScrollTop(scrollTop) {
      if (vsl) {
        (vsl.$el || vsl).scrollTop = scrollTop;
      }
    };

    vue.onBeforeUpdate(function () {
      delta.keeps = props.remain + (props.bench || props.remain);
      var calcstart = changeProp === "start" ? props.start : delta.start;
      var zone = getZone(calcstart); // if start, size or offset change, update scroll position.

      if (changeProp && ["start", "size", "offset"].includes(changeProp)) {
        var scrollTop = changeProp === "offset" ? props.offset : props.variable ? getVarOffset(zone.isLast ? delta.total : zone.start) : zone.isLast && delta.total - calcstart <= props.remain ? delta.total * props.size : calcstart * props.size;
        vue.nextTick(setScrollTop.bind(_this2, scrollTop));
      } // if points out difference, force update once again.


      if (changeProp || delta.end !== zone.end || calcstart !== zone.start) {
        changeProp = "";
        delta.end = zone.end;
        delta.start = zone.start;
        forceRender();
      }
    }); // return the variable paddingBottom based on the current zone.

    var getVarPaddingBottom = function getVarPaddingBottom() {
      var last = delta.total - 1;

      if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === last) {
        return getVarOffset(last) - getVarOffset(delta.end);
      } else {
        // if unreached last zone or uncalculated real behind offset
        // return the estimate paddingBottom and avoid too much calculations.
        return (delta.total - delta.end) * (delta.varAverSize || props.size);
      }
    }; // return the variable paddingTop based on current zone.
    // @todo: if set a large `start` before variable was calculated,
    // here will also case too much offset calculate when list is very large,
    // consider use estimate paddingTop in this case just like `getVarPaddingBottom`.


    var getVarPaddingTop = function getVarPaddingTop() {
      return getVarOffset(delta.start);
    }; // return the variable all heights use to judge reach bottom.


    var getVarAllHeight = function getVarAllHeight() {
      if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === delta.total - 1) {
        return getVarOffset(delta.total);
      } else {
        return getVarOffset(delta.start) + (delta.total - delta.end) * (delta.varAverSize || props.size);
      }
    };

    var filter = function filter() {
      var slots = defaultSlot.value || [];

      if (!slots.length) {
        delta.start = 0;
      }

      delta.total = slots.length;
      var paddingTop, paddingBottom, allHeight;
      var hasPadding = delta.total > delta.keeps;

      if (props.variable) {
        allHeight = getVarAllHeight();
        paddingTop = hasPadding ? getVarPaddingTop() : 0;
        paddingBottom = hasPadding ? getVarPaddingBottom() : 0;
      } else {
        allHeight = props.size * delta.total;
        paddingTop = props.size * (hasPadding ? delta.start : 0);
        paddingBottom = props.size * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop;
      }

      if (paddingBottom < props.size) {
        paddingBottom = 0;
      }

      delta.paddingTop = paddingTop;
      delta.paddingBottom = paddingBottom;
      delta.offsetAll = allHeight - props.size * props.remain;
      var renders = [];

      for (var i = delta.start; i < delta.total && i <= Math.ceil(delta.end); i++) {
        var slot = slots[i];
        renders.push(slot);
      }

      return renders;
    }; // return the scroll of passed items count in variable.


    var getVarOvers = function getVarOvers(offset) {
      var low = 0;
      var middle = 0;
      var middleOffset = 0;
      var high = delta.total;

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = getVarOffset(middle); // calculate the average variable height at first binary search.

        if (!delta.varAverSize) {
          delta.varAverSize = Math.floor(middleOffset / middle);
        }

        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        }
      }

      return low > 0 ? --low : 0;
    }; // update render zone by scroll offset.


    var updateZone = function updateZone(offset) {
      var overs = props.variable ? getVarOvers(offset) : Math.floor(offset / props.size); // if scroll up, we'd better decrease it's numbers.

      if (delta.direction === "U") {
        overs = overs - props.remain + 1;
      }

      var zone = getZone(overs);
      var bench = props.bench || props.remain; // for better performance, if scroll passes items within the bench, do not update.
      // and if it's close to the last item, render next zone immediately.

      var shouldRenderNextZone = Math.abs(overs - delta.start - bench) === 1;

      if (!shouldRenderNextZone && overs - delta.start <= bench && !zone.isLast && overs > delta.start) {
        return;
      } // make sure forceRender calls as less as possible.


      if (shouldRenderNextZone || zone.start !== delta.start || zone.end !== delta.end) {
        delta.end = zone.end;
        delta.start = zone.start;
        forceRender();
      }
    };

    var onScroll = function onScroll() {
      var offset;
      offset = vsl.value.scrollTop || 0;
      delta.direction = offset > delta.scrollTop ? "D" : "U";
      delta.scrollTop = offset;

      if (delta.total > delta.keeps) {
        updateZone(offset);
      } else {
        delta.end = delta.total - 1;
      }

      var offsetAll = delta.offsetAll;

      if (props.onscroll) {
        var param = Object.create(null);
        param.offset = offset;
        param.offsetAll = offsetAll;
        param.start = delta.start;
        param.end = delta.end; // props.onscroll(event, param);
      }

      if (!offset && delta.total) {
        context.emit("totop");
      }

      if (offset >= offsetAll) {
        context.emit("tobottom");
      }
    };

    return function () {
      var list = filter();
      var paddingTop = delta.paddingTop,
          paddingBottom = delta.paddingBottom;
      var istable = props.istable;
      var wtag = istable ? "div" : props.wtag;
      var rtag = istable ? "div" : props.rtag;

      if (istable) {
        list = [vue.h("table", [vue.h("tbody", list)])];
      }

      var renderList = vue.h(wtag, {
        style: Object.assign({
          display: "block",
          "padding-top": paddingTop + "px",
          "padding-bottom": paddingBottom + "px"
        }, props.wstyle),
        class: props.wclass,
        role: "group"
      }, list);
      var height = 0;

      if (props.windowHeight !== undefined) {
        height = props.windowHeight;
      } else {
        height = props.size * props.remain;

        if (props.remain > props.itemcount) {
          height = props.size * props.itemcount;
        }
      }

      if (props.paddingTop !== undefined) {
        height = height - props.paddingTop;
      }

      return vue.h(rtag, {
        ref: vsl,
        style: {
          display: "block",
          "overflow-y": props.size * props.itemcount >= height ? "auto" : "initial",
          height: height + "px"
        },
        onScroll: onScroll
      }, [renderList]);
    };
  }
});// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VirtualList', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;