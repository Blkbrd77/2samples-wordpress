(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var global = window;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name28 in all)
      __defProp(target, name28, { get: all[name28], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js
  var require_mapbox_gl_draw = __commonJS({
    "node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).MapboxDraw = e();
      }(exports, function() {
        "use strict";
        var t = function(t2, e2) {
          var n3 = { drag: [], click: [], mousemove: [], mousedown: [], mouseup: [], mouseout: [], keydown: [], keyup: [], touchstart: [], touchmove: [], touchend: [], tap: [] }, o2 = { on: function(t3, e3, o3) {
            if (void 0 === n3[t3]) throw new Error("Invalid event type: " + t3);
            n3[t3].push({ selector: e3, fn: o3 });
          }, render: function(t3) {
            e2.store.featureChanged(t3);
          } }, r2 = function(t3, r3) {
            for (var i2 = n3[t3], a2 = i2.length; a2--; ) {
              var s2 = i2[a2];
              if (s2.selector(r3)) {
                s2.fn.call(o2, r3) || e2.store.render(), e2.ui.updateMapClasses();
                break;
              }
            }
          };
          return t2.start.call(o2), { render: t2.render, stop: function() {
            t2.stop && t2.stop();
          }, trash: function() {
            t2.trash && (t2.trash(), e2.store.render());
          }, combineFeatures: function() {
            t2.combineFeatures && t2.combineFeatures();
          }, uncombineFeatures: function() {
            t2.uncombineFeatures && t2.uncombineFeatures();
          }, drag: function(t3) {
            r2("drag", t3);
          }, click: function(t3) {
            r2("click", t3);
          }, mousemove: function(t3) {
            r2("mousemove", t3);
          }, mousedown: function(t3) {
            r2("mousedown", t3);
          }, mouseup: function(t3) {
            r2("mouseup", t3);
          }, mouseout: function(t3) {
            r2("mouseout", t3);
          }, keydown: function(t3) {
            r2("keydown", t3);
          }, keyup: function(t3) {
            r2("keyup", t3);
          }, touchstart: function(t3) {
            r2("touchstart", t3);
          }, touchmove: function(t3) {
            r2("touchmove", t3);
          }, touchend: function(t3) {
            r2("touchend", t3);
          }, tap: function(t3) {
            r2("tap", t3);
          } };
        }, e = 6378137;
        function n(t2) {
          var e2 = 0;
          if (t2 && t2.length > 0) {
            e2 += Math.abs(o(t2[0]));
            for (var n3 = 1; n3 < t2.length; n3++) e2 -= Math.abs(o(t2[n3]));
          }
          return e2;
        }
        function o(t2) {
          var n3, o2, i2, a2, s2, u2, c2 = 0, l2 = t2.length;
          if (l2 > 2) {
            for (u2 = 0; u2 < l2; u2++) u2 === l2 - 2 ? (i2 = l2 - 2, a2 = l2 - 1, s2 = 0) : u2 === l2 - 1 ? (i2 = l2 - 1, a2 = 0, s2 = 1) : (i2 = u2, a2 = u2 + 1, s2 = u2 + 2), n3 = t2[i2], o2 = t2[a2], c2 += (r(t2[s2][0]) - r(n3[0])) * Math.sin(r(o2[1]));
            c2 = c2 * e * e / 2;
          }
          return c2;
        }
        function r(t2) {
          return t2 * Math.PI / 180;
        }
        var i = { geometry: function t2(e2) {
          var o2, r2 = 0;
          switch (e2.type) {
            case "Polygon":
              return n(e2.coordinates);
            case "MultiPolygon":
              for (o2 = 0; o2 < e2.coordinates.length; o2++) r2 += n(e2.coordinates[o2]);
              return r2;
            case "Point":
            case "MultiPoint":
            case "LineString":
            case "MultiLineString":
              return 0;
            case "GeometryCollection":
              for (o2 = 0; o2 < e2.geometries.length; o2++) r2 += t2(e2.geometries[o2]);
              return r2;
          }
        }, ring: o }, a = "mapboxgl-ctrl", s = "mapbox-gl-draw_ctrl-draw-btn", u = "mapbox-gl-draw_line", c = "mapbox-gl-draw_polygon", l = "mapbox-gl-draw_point", d = "mapbox-gl-draw_trash", p = "mapbox-gl-draw_combine", f = "mapbox-gl-draw_uncombine", h = "mapboxgl-ctrl-group", g = "active", y = "mapbox-gl-draw_boxselect", v = "mapbox-gl-draw-hot", m = "mapbox-gl-draw-cold", b = "add", _ = "move", S = "drag", x = "pointer", C = "none", E = { POLYGON: "polygon", LINE: "line_string", POINT: "point" }, M = "Feature", w = "Polygon", I = "LineString", L = "Point", P3 = "FeatureCollection", F = "Multi", O = "MultiPoint", k = "MultiLineString", T = "MultiPolygon", j = { DRAW_LINE_STRING: "draw_line_string", DRAW_POLYGON: "draw_polygon", DRAW_POINT: "draw_point", SIMPLE_SELECT: "simple_select", DIRECT_SELECT: "direct_select", STATIC: "static" }, A = "draw.create", D = "draw.delete", N = "draw.update", U = "draw.selectionchange", R = "draw.modechange", B = "draw.actionable", V = "draw.render", J = "draw.combine", G = "draw.uncombine", z = "move", $ = "change_coordinates", W = "feature", q = "midpoint", Y = "vertex", Z = "true", K = "false", X = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"], H = { Point: 0, LineString: 1, Polygon: 2 };
        function Q(t2, e2) {
          var n3 = H[t2.geometry.type] - H[e2.geometry.type];
          return 0 === n3 && t2.geometry.type === w ? t2.area - e2.area : n3;
        }
        function tt(t2) {
          if (this._items = {}, this._nums = {}, this._length = t2 ? t2.length : 0, t2) for (var e2 = 0, n3 = t2.length; e2 < n3; e2++) this.add(t2[e2]), void 0 !== t2[e2] && ("string" == typeof t2[e2] ? this._items[t2[e2]] = e2 : this._nums[t2[e2]] = e2);
        }
        tt.prototype.add = function(t2) {
          return this.has(t2) || (this._length++, "string" == typeof t2 ? this._items[t2] = this._length : this._nums[t2] = this._length), this;
        }, tt.prototype.delete = function(t2) {
          return false === this.has(t2) || (this._length--, delete this._items[t2], delete this._nums[t2]), this;
        }, tt.prototype.has = function(t2) {
          return ("string" == typeof t2 || "number" == typeof t2) && (void 0 !== this._items[t2] || void 0 !== this._nums[t2]);
        }, tt.prototype.values = function() {
          var t2 = this, e2 = [];
          return Object.keys(this._items).forEach(function(n3) {
            e2.push({ k: n3, v: t2._items[n3] });
          }), Object.keys(this._nums).forEach(function(n3) {
            e2.push({ k: JSON.parse(n3), v: t2._nums[n3] });
          }), e2.sort(function(t3, e3) {
            return t3.v - e3.v;
          }).map(function(t3) {
            return t3.k;
          });
        }, tt.prototype.clear = function() {
          return this._length = 0, this._items = {}, this._nums = {}, this;
        };
        var et = [W, q, Y], nt = { click: function(t2, e2, n3) {
          return ot(t2, e2, n3, n3.options.clickBuffer);
        }, touch: function(t2, e2, n3) {
          return ot(t2, e2, n3, n3.options.touchBuffer);
        } };
        function ot(t2, e2, n3, o2) {
          if (null === n3.map) return [];
          var r2 = t2 ? function(t3, e3) {
            return void 0 === e3 && (e3 = 0), [[t3.point.x - e3, t3.point.y - e3], [t3.point.x + e3, t3.point.y + e3]];
          }(t2, o2) : e2, a2 = {};
          n3.options.styles && (a2.layers = n3.options.styles.map(function(t3) {
            return t3.id;
          }));
          var s2 = n3.map.queryRenderedFeatures(r2, a2).filter(function(t3) {
            return -1 !== et.indexOf(t3.properties.meta);
          }), u2 = new tt(), c2 = [];
          return s2.forEach(function(t3) {
            var e3 = t3.properties.id;
            u2.has(e3) || (u2.add(e3), c2.push(t3));
          }), function(t3) {
            return t3.map(function(t4) {
              return t4.geometry.type === w && (t4.area = i.geometry({ type: M, property: {}, geometry: t4.geometry })), t4;
            }).sort(Q).map(function(t4) {
              return delete t4.area, t4;
            });
          }(c2);
        }
        function rt(t2, e2) {
          var n3 = nt.click(t2, null, e2), o2 = { mouse: C };
          return n3[0] && (o2.mouse = n3[0].properties.active === Z ? _ : x, o2.feature = n3[0].properties.meta), -1 !== e2.events.currentModeName().indexOf("draw") && (o2.mouse = b), e2.ui.queueMapClasses(o2), e2.ui.updateMapClasses(), n3[0];
        }
        function it(t2, e2) {
          var n3 = t2.x - e2.x, o2 = t2.y - e2.y;
          return Math.sqrt(n3 * n3 + o2 * o2);
        }
        function at(t2, e2, n3) {
          void 0 === n3 && (n3 = {});
          var o2 = null != n3.fineTolerance ? n3.fineTolerance : 4, r2 = null != n3.grossTolerance ? n3.grossTolerance : 12, i2 = null != n3.interval ? n3.interval : 500;
          t2.point = t2.point || e2.point, t2.time = t2.time || e2.time;
          var a2 = it(t2.point, e2.point);
          return a2 < o2 || a2 < r2 && e2.time - t2.time < i2;
        }
        function st(t2, e2, n3) {
          void 0 === n3 && (n3 = {});
          var o2 = null != n3.tolerance ? n3.tolerance : 25, r2 = null != n3.interval ? n3.interval : 250;
          return t2.point = t2.point || e2.point, t2.time = t2.time || e2.time, it(t2.point, e2.point) < o2 && e2.time - t2.time < r2;
        }
        function ut(t2, e2) {
          return t2(e2 = { exports: {} }, e2.exports), e2.exports;
        }
        var ct = ut(function(t2) {
          var e2 = t2.exports = function(t3, n3) {
            if (n3 || (n3 = 16), void 0 === t3 && (t3 = 128), t3 <= 0) return "0";
            for (var o2 = Math.log(Math.pow(2, t3)) / Math.log(n3), r2 = 2; o2 === 1 / 0; r2 *= 2) o2 = Math.log(Math.pow(2, t3 / r2)) / Math.log(n3) * r2;
            var i2 = o2 - Math.floor(o2), a2 = "";
            for (r2 = 0; r2 < Math.floor(o2); r2++) {
              a2 = Math.floor(Math.random() * n3).toString(n3) + a2;
            }
            if (i2) {
              var s2 = Math.pow(n3, i2);
              a2 = Math.floor(Math.random() * s2).toString(n3) + a2;
            }
            var u2 = parseInt(a2, n3);
            return u2 !== 1 / 0 && u2 >= Math.pow(2, t3) ? e2(t3, n3) : a2;
          };
          e2.rack = function(t3, n3, o2) {
            var r2 = function(r3) {
              var a2 = 0;
              do {
                if (a2++ > 10) {
                  if (!o2) throw new Error("too many ID collisions, use more bits");
                  t3 += o2;
                }
                var s2 = e2(t3, n3);
              } while (Object.hasOwnProperty.call(i2, s2));
              return i2[s2] = r3, s2;
            }, i2 = r2.hats = {};
            return r2.get = function(t4) {
              return r2.hats[t4];
            }, r2.set = function(t4, e3) {
              return r2.hats[t4] = e3, r2;
            }, r2.bits = t3 || 128, r2.base = n3 || 16, r2;
          };
        }), lt = function(t2, e2) {
          this.ctx = t2, this.properties = e2.properties || {}, this.coordinates = e2.geometry.coordinates, this.id = e2.id || ct(), this.type = e2.geometry.type;
        };
        lt.prototype.changed = function() {
          this.ctx.store.featureChanged(this.id);
        }, lt.prototype.incomingCoords = function(t2) {
          this.setCoordinates(t2);
        }, lt.prototype.setCoordinates = function(t2) {
          this.coordinates = t2, this.changed();
        }, lt.prototype.getCoordinates = function() {
          return JSON.parse(JSON.stringify(this.coordinates));
        }, lt.prototype.setProperty = function(t2, e2) {
          this.properties[t2] = e2;
        }, lt.prototype.toGeoJSON = function() {
          return JSON.parse(JSON.stringify({ id: this.id, type: M, properties: this.properties, geometry: { coordinates: this.getCoordinates(), type: this.type } }));
        }, lt.prototype.internal = function(t2) {
          var e2 = { id: this.id, meta: W, "meta:type": this.type, active: K, mode: t2 };
          if (this.ctx.options.userProperties) for (var n3 in this.properties) e2["user_" + n3] = this.properties[n3];
          return { type: M, properties: e2, geometry: { coordinates: this.getCoordinates(), type: this.type } };
        };
        var dt = function(t2, e2) {
          lt.call(this, t2, e2);
        };
        (dt.prototype = Object.create(lt.prototype)).isValid = function() {
          return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1];
        }, dt.prototype.updateCoordinate = function(t2, e2, n3) {
          this.coordinates = 3 === arguments.length ? [e2, n3] : [t2, e2], this.changed();
        }, dt.prototype.getCoordinate = function() {
          return this.getCoordinates();
        };
        var pt = function(t2, e2) {
          lt.call(this, t2, e2);
        };
        (pt.prototype = Object.create(lt.prototype)).isValid = function() {
          return this.coordinates.length > 1;
        }, pt.prototype.addCoordinate = function(t2, e2, n3) {
          this.changed();
          var o2 = parseInt(t2, 10);
          this.coordinates.splice(o2, 0, [e2, n3]);
        }, pt.prototype.getCoordinate = function(t2) {
          var e2 = parseInt(t2, 10);
          return JSON.parse(JSON.stringify(this.coordinates[e2]));
        }, pt.prototype.removeCoordinate = function(t2) {
          this.changed(), this.coordinates.splice(parseInt(t2, 10), 1);
        }, pt.prototype.updateCoordinate = function(t2, e2, n3) {
          var o2 = parseInt(t2, 10);
          this.coordinates[o2] = [e2, n3], this.changed();
        };
        var ft = function(t2, e2) {
          lt.call(this, t2, e2), this.coordinates = this.coordinates.map(function(t3) {
            return t3.slice(0, -1);
          });
        };
        (ft.prototype = Object.create(lt.prototype)).isValid = function() {
          return 0 !== this.coordinates.length && this.coordinates.every(function(t2) {
            return t2.length > 2;
          });
        }, ft.prototype.incomingCoords = function(t2) {
          this.coordinates = t2.map(function(t3) {
            return t3.slice(0, -1);
          }), this.changed();
        }, ft.prototype.setCoordinates = function(t2) {
          this.coordinates = t2, this.changed();
        }, ft.prototype.addCoordinate = function(t2, e2, n3) {
          this.changed();
          var o2 = t2.split(".").map(function(t3) {
            return parseInt(t3, 10);
          });
          this.coordinates[o2[0]].splice(o2[1], 0, [e2, n3]);
        }, ft.prototype.removeCoordinate = function(t2) {
          this.changed();
          var e2 = t2.split(".").map(function(t3) {
            return parseInt(t3, 10);
          }), n3 = this.coordinates[e2[0]];
          n3 && (n3.splice(e2[1], 1), n3.length < 3 && this.coordinates.splice(e2[0], 1));
        }, ft.prototype.getCoordinate = function(t2) {
          var e2 = t2.split(".").map(function(t3) {
            return parseInt(t3, 10);
          }), n3 = this.coordinates[e2[0]];
          return JSON.parse(JSON.stringify(n3[e2[1]]));
        }, ft.prototype.getCoordinates = function() {
          return this.coordinates.map(function(t2) {
            return t2.concat([t2[0]]);
          });
        }, ft.prototype.updateCoordinate = function(t2, e2, n3) {
          this.changed();
          var o2 = t2.split("."), r2 = parseInt(o2[0], 10), i2 = parseInt(o2[1], 10);
          void 0 === this.coordinates[r2] && (this.coordinates[r2] = []), this.coordinates[r2][i2] = [e2, n3];
        };
        var ht = { MultiPoint: dt, MultiLineString: pt, MultiPolygon: ft }, gt = function(t2, e2, n3, o2, r2) {
          var i2 = n3.split("."), a2 = parseInt(i2[0], 10), s2 = i2[1] ? i2.slice(1).join(".") : null;
          return t2[a2][e2](s2, o2, r2);
        }, yt = function(t2, e2) {
          if (lt.call(this, t2, e2), delete this.coordinates, this.model = ht[e2.geometry.type], void 0 === this.model) throw new TypeError(e2.geometry.type + " is not a valid type");
          this.features = this._coordinatesToFeatures(e2.geometry.coordinates);
        };
        function vt(t2) {
          this.map = t2.map, this.drawConfig = JSON.parse(JSON.stringify(t2.options || {})), this._ctx = t2;
        }
        (yt.prototype = Object.create(lt.prototype))._coordinatesToFeatures = function(t2) {
          var e2 = this, n3 = this.model.bind(this);
          return t2.map(function(t3) {
            return new n3(e2.ctx, { id: ct(), type: M, properties: {}, geometry: { coordinates: t3, type: e2.type.replace("Multi", "") } });
          });
        }, yt.prototype.isValid = function() {
          return this.features.every(function(t2) {
            return t2.isValid();
          });
        }, yt.prototype.setCoordinates = function(t2) {
          this.features = this._coordinatesToFeatures(t2), this.changed();
        }, yt.prototype.getCoordinate = function(t2) {
          return gt(this.features, "getCoordinate", t2);
        }, yt.prototype.getCoordinates = function() {
          return JSON.parse(JSON.stringify(this.features.map(function(t2) {
            return t2.type === w ? t2.getCoordinates() : t2.coordinates;
          })));
        }, yt.prototype.updateCoordinate = function(t2, e2, n3) {
          gt(this.features, "updateCoordinate", t2, e2, n3), this.changed();
        }, yt.prototype.addCoordinate = function(t2, e2, n3) {
          gt(this.features, "addCoordinate", t2, e2, n3), this.changed();
        }, yt.prototype.removeCoordinate = function(t2) {
          gt(this.features, "removeCoordinate", t2), this.changed();
        }, yt.prototype.getFeatures = function() {
          return this.features;
        }, vt.prototype.setSelected = function(t2) {
          return this._ctx.store.setSelected(t2);
        }, vt.prototype.setSelectedCoordinates = function(t2) {
          var e2 = this;
          this._ctx.store.setSelectedCoordinates(t2), t2.reduce(function(t3, n3) {
            return void 0 === t3[n3.feature_id] && (t3[n3.feature_id] = true, e2._ctx.store.get(n3.feature_id).changed()), t3;
          }, {});
        }, vt.prototype.getSelected = function() {
          return this._ctx.store.getSelected();
        }, vt.prototype.getSelectedIds = function() {
          return this._ctx.store.getSelectedIds();
        }, vt.prototype.isSelected = function(t2) {
          return this._ctx.store.isSelected(t2);
        }, vt.prototype.getFeature = function(t2) {
          return this._ctx.store.get(t2);
        }, vt.prototype.select = function(t2) {
          return this._ctx.store.select(t2);
        }, vt.prototype.deselect = function(t2) {
          return this._ctx.store.deselect(t2);
        }, vt.prototype.deleteFeature = function(t2, e2) {
          return void 0 === e2 && (e2 = {}), this._ctx.store.delete(t2, e2);
        }, vt.prototype.addFeature = function(t2) {
          return this._ctx.store.add(t2);
        }, vt.prototype.clearSelectedFeatures = function() {
          return this._ctx.store.clearSelected();
        }, vt.prototype.clearSelectedCoordinates = function() {
          return this._ctx.store.clearSelectedCoordinates();
        }, vt.prototype.setActionableState = function(t2) {
          void 0 === t2 && (t2 = {});
          var e2 = { trash: t2.trash || false, combineFeatures: t2.combineFeatures || false, uncombineFeatures: t2.uncombineFeatures || false };
          return this._ctx.events.actionable(e2);
        }, vt.prototype.changeMode = function(t2, e2, n3) {
          return void 0 === e2 && (e2 = {}), void 0 === n3 && (n3 = {}), this._ctx.events.changeMode(t2, e2, n3);
        }, vt.prototype.updateUIClasses = function(t2) {
          return this._ctx.ui.queueMapClasses(t2);
        }, vt.prototype.activateUIButton = function(t2) {
          return this._ctx.ui.setActiveButton(t2);
        }, vt.prototype.featuresAt = function(t2, e2, n3) {
          if (void 0 === n3 && (n3 = "click"), "click" !== n3 && "touch" !== n3) throw new Error("invalid buffer type");
          return nt[n3](t2, e2, this._ctx);
        }, vt.prototype.newFeature = function(t2) {
          var e2 = t2.geometry.type;
          return e2 === L ? new dt(this._ctx, t2) : e2 === I ? new pt(this._ctx, t2) : e2 === w ? new ft(this._ctx, t2) : new yt(this._ctx, t2);
        }, vt.prototype.isInstanceOf = function(t2, e2) {
          if (t2 === L) return e2 instanceof dt;
          if (t2 === I) return e2 instanceof pt;
          if (t2 === w) return e2 instanceof ft;
          if ("MultiFeature" === t2) return e2 instanceof yt;
          throw new Error("Unknown feature class: " + t2);
        }, vt.prototype.doRender = function(t2) {
          return this._ctx.store.featureChanged(t2);
        }, vt.prototype.onSetup = function() {
        }, vt.prototype.onDrag = function() {
        }, vt.prototype.onClick = function() {
        }, vt.prototype.onMouseMove = function() {
        }, vt.prototype.onMouseDown = function() {
        }, vt.prototype.onMouseUp = function() {
        }, vt.prototype.onMouseOut = function() {
        }, vt.prototype.onKeyUp = function() {
        }, vt.prototype.onKeyDown = function() {
        }, vt.prototype.onTouchStart = function() {
        }, vt.prototype.onTouchMove = function() {
        }, vt.prototype.onTouchEnd = function() {
        }, vt.prototype.onTap = function() {
        }, vt.prototype.onStop = function() {
        }, vt.prototype.onTrash = function() {
        }, vt.prototype.onCombineFeature = function() {
        }, vt.prototype.onUncombineFeature = function() {
        }, vt.prototype.toDisplayFeatures = function() {
          throw new Error("You must overwrite toDisplayFeatures");
        };
        var mt = { drag: "onDrag", click: "onClick", mousemove: "onMouseMove", mousedown: "onMouseDown", mouseup: "onMouseUp", mouseout: "onMouseOut", keyup: "onKeyUp", keydown: "onKeyDown", touchstart: "onTouchStart", touchmove: "onTouchMove", touchend: "onTouchEnd", tap: "onTap" }, bt = Object.keys(mt);
        function _t(t2) {
          var e2 = Object.keys(t2);
          return function(n3, o2) {
            void 0 === o2 && (o2 = {});
            var r2 = {}, i2 = e2.reduce(function(e3, n4) {
              return e3[n4] = t2[n4], e3;
            }, new vt(n3));
            return { start: function() {
              var e3 = this;
              r2 = i2.onSetup(o2), bt.forEach(function(n4) {
                var o3, a2 = mt[n4], s2 = function() {
                  return false;
                };
                t2[a2] && (s2 = function() {
                  return true;
                }), e3.on(n4, s2, (o3 = a2, function(t3) {
                  return i2[o3](r2, t3);
                }));
              });
            }, stop: function() {
              i2.onStop(r2);
            }, trash: function() {
              i2.onTrash(r2);
            }, combineFeatures: function() {
              i2.onCombineFeatures(r2);
            }, uncombineFeatures: function() {
              i2.onUncombineFeatures(r2);
            }, render: function(t3, e3) {
              i2.toDisplayFeatures(r2, t3, e3);
            } };
          };
        }
        function St(t2) {
          return [].concat(t2).filter(function(t3) {
            return void 0 !== t3;
          });
        }
        function xt() {
          var t2 = this;
          if (!(t2.ctx.map && void 0 !== t2.ctx.map.getSource(v))) return u2();
          var e2 = t2.ctx.events.currentModeName();
          t2.ctx.ui.queueMapClasses({ mode: e2 });
          var n3 = [], o2 = [];
          t2.isDirty ? o2 = t2.getAllIds() : (n3 = t2.getChangedIds().filter(function(e3) {
            return void 0 !== t2.get(e3);
          }), o2 = t2.sources.hot.filter(function(e3) {
            return e3.properties.id && -1 === n3.indexOf(e3.properties.id) && void 0 !== t2.get(e3.properties.id);
          }).map(function(t3) {
            return t3.properties.id;
          })), t2.sources.hot = [];
          var r2 = t2.sources.cold.length;
          t2.sources.cold = t2.isDirty ? [] : t2.sources.cold.filter(function(t3) {
            var e3 = t3.properties.id || t3.properties.parent;
            return -1 === n3.indexOf(e3);
          });
          var i2 = r2 !== t2.sources.cold.length || o2.length > 0;
          function a2(n4, o3) {
            var r3 = t2.get(n4).internal(e2);
            t2.ctx.events.currentModeRender(r3, function(e3) {
              t2.sources[o3].push(e3);
            });
          }
          if (n3.forEach(function(t3) {
            return a2(t3, "hot");
          }), o2.forEach(function(t3) {
            return a2(t3, "cold");
          }), i2 && t2.ctx.map.getSource(m).setData({ type: P3, features: t2.sources.cold }), t2.ctx.map.getSource(v).setData({ type: P3, features: t2.sources.hot }), t2._emitSelectionChange && (t2.ctx.map.fire(U, { features: t2.getSelected().map(function(t3) {
            return t3.toGeoJSON();
          }), points: t2.getSelectedCoordinates().map(function(t3) {
            return { type: M, properties: {}, geometry: { type: L, coordinates: t3.coordinates } };
          }) }), t2._emitSelectionChange = false), t2._deletedFeaturesToEmit.length) {
            var s2 = t2._deletedFeaturesToEmit.map(function(t3) {
              return t3.toGeoJSON();
            });
            t2._deletedFeaturesToEmit = [], t2.ctx.map.fire(D, { features: s2 });
          }
          function u2() {
            t2.isDirty = false, t2.clearChangedIds();
          }
          u2(), t2.ctx.map.fire(V, {});
        }
        function Ct(t2) {
          var e2, n3 = this;
          this._features = {}, this._featureIds = new tt(), this._selectedFeatureIds = new tt(), this._selectedCoordinates = [], this._changedFeatureIds = new tt(), this._deletedFeaturesToEmit = [], this._emitSelectionChange = false, this._mapInitialConfig = {}, this.ctx = t2, this.sources = { hot: [], cold: [] }, this.render = function() {
            e2 || (e2 = requestAnimationFrame(function() {
              e2 = null, xt.call(n3);
            }));
          }, this.isDirty = false;
        }
        function Et(t2, e2) {
          var n3 = t2._selectedCoordinates.filter(function(e3) {
            return t2._selectedFeatureIds.has(e3.feature_id);
          });
          t2._selectedCoordinates.length === n3.length || e2.silent || (t2._emitSelectionChange = true), t2._selectedCoordinates = n3;
        }
        Ct.prototype.createRenderBatch = function() {
          var t2 = this, e2 = this.render, n3 = 0;
          return this.render = function() {
            n3++;
          }, function() {
            t2.render = e2, n3 > 0 && t2.render();
          };
        }, Ct.prototype.setDirty = function() {
          return this.isDirty = true, this;
        }, Ct.prototype.featureChanged = function(t2) {
          return this._changedFeatureIds.add(t2), this;
        }, Ct.prototype.getChangedIds = function() {
          return this._changedFeatureIds.values();
        }, Ct.prototype.clearChangedIds = function() {
          return this._changedFeatureIds.clear(), this;
        }, Ct.prototype.getAllIds = function() {
          return this._featureIds.values();
        }, Ct.prototype.add = function(t2) {
          return this.featureChanged(t2.id), this._features[t2.id] = t2, this._featureIds.add(t2.id), this;
        }, Ct.prototype.delete = function(t2, e2) {
          var n3 = this;
          return void 0 === e2 && (e2 = {}), St(t2).forEach(function(t3) {
            n3._featureIds.has(t3) && (n3._featureIds.delete(t3), n3._selectedFeatureIds.delete(t3), e2.silent || -1 === n3._deletedFeaturesToEmit.indexOf(n3._features[t3]) && n3._deletedFeaturesToEmit.push(n3._features[t3]), delete n3._features[t3], n3.isDirty = true);
          }), Et(this, e2), this;
        }, Ct.prototype.get = function(t2) {
          return this._features[t2];
        }, Ct.prototype.getAll = function() {
          var t2 = this;
          return Object.keys(this._features).map(function(e2) {
            return t2._features[e2];
          });
        }, Ct.prototype.select = function(t2, e2) {
          var n3 = this;
          return void 0 === e2 && (e2 = {}), St(t2).forEach(function(t3) {
            n3._selectedFeatureIds.has(t3) || (n3._selectedFeatureIds.add(t3), n3._changedFeatureIds.add(t3), e2.silent || (n3._emitSelectionChange = true));
          }), this;
        }, Ct.prototype.deselect = function(t2, e2) {
          var n3 = this;
          return void 0 === e2 && (e2 = {}), St(t2).forEach(function(t3) {
            n3._selectedFeatureIds.has(t3) && (n3._selectedFeatureIds.delete(t3), n3._changedFeatureIds.add(t3), e2.silent || (n3._emitSelectionChange = true));
          }), Et(this, e2), this;
        }, Ct.prototype.clearSelected = function(t2) {
          return void 0 === t2 && (t2 = {}), this.deselect(this._selectedFeatureIds.values(), { silent: t2.silent }), this;
        }, Ct.prototype.setSelected = function(t2, e2) {
          var n3 = this;
          return void 0 === e2 && (e2 = {}), t2 = St(t2), this.deselect(this._selectedFeatureIds.values().filter(function(e3) {
            return -1 === t2.indexOf(e3);
          }), { silent: e2.silent }), this.select(t2.filter(function(t3) {
            return !n3._selectedFeatureIds.has(t3);
          }), { silent: e2.silent }), this;
        }, Ct.prototype.setSelectedCoordinates = function(t2) {
          return this._selectedCoordinates = t2, this._emitSelectionChange = true, this;
        }, Ct.prototype.clearSelectedCoordinates = function() {
          return this._selectedCoordinates = [], this._emitSelectionChange = true, this;
        }, Ct.prototype.getSelectedIds = function() {
          return this._selectedFeatureIds.values();
        }, Ct.prototype.getSelected = function() {
          var t2 = this;
          return this._selectedFeatureIds.values().map(function(e2) {
            return t2.get(e2);
          });
        }, Ct.prototype.getSelectedCoordinates = function() {
          var t2 = this;
          return this._selectedCoordinates.map(function(e2) {
            return { coordinates: t2.get(e2.feature_id).getCoordinate(e2.coord_path) };
          });
        }, Ct.prototype.isSelected = function(t2) {
          return this._selectedFeatureIds.has(t2);
        }, Ct.prototype.setFeatureProperty = function(t2, e2, n3) {
          this.get(t2).setProperty(e2, n3), this.featureChanged(t2);
        }, Ct.prototype.storeMapConfig = function() {
          var t2 = this;
          X.forEach(function(e2) {
            t2.ctx.map[e2] && (t2._mapInitialConfig[e2] = t2.ctx.map[e2].isEnabled());
          });
        }, Ct.prototype.restoreMapConfig = function() {
          var t2 = this;
          Object.keys(this._mapInitialConfig).forEach(function(e2) {
            t2._mapInitialConfig[e2] ? t2.ctx.map[e2].enable() : t2.ctx.map[e2].disable();
          });
        }, Ct.prototype.getInitialConfigValue = function(t2) {
          return void 0 === this._mapInitialConfig[t2] || this._mapInitialConfig[t2];
        };
        var Mt = function() {
          for (var t2 = arguments, e2 = {}, n3 = 0; n3 < arguments.length; n3++) {
            var o2 = t2[n3];
            for (var r2 in o2) wt.call(o2, r2) && (e2[r2] = o2[r2]);
          }
          return e2;
        }, wt = Object.prototype.hasOwnProperty;
        var It = ["mode", "feature", "mouse"];
        function Lt(e2) {
          var n3 = null, o2 = null, r2 = { onRemove: function() {
            return e2.map.off("load", r2.connect), clearInterval(o2), r2.removeLayers(), e2.store.restoreMapConfig(), e2.ui.removeButtons(), e2.events.removeEventListeners(), e2.ui.clearMapClasses(), e2.map = null, e2.container = null, e2.store = null, n3 && n3.parentNode && n3.parentNode.removeChild(n3), n3 = null, this;
          }, connect: function() {
            e2.map.off("load", r2.connect), clearInterval(o2), r2.addLayers(), e2.store.storeMapConfig(), e2.events.addEventListeners();
          }, onAdd: function(i2) {
            var y2 = i2.fire;
            return i2.fire = function(t2, e3) {
              var n4 = arguments;
              return 1 === y2.length && 1 !== arguments.length && (n4 = [Mt({}, { type: t2 }, e3)]), y2.apply(i2, n4);
            }, e2.map = i2, e2.events = function(e3) {
              var n4 = Object.keys(e3.options.modes).reduce(function(t2, n5) {
                return t2[n5] = _t(e3.options.modes[n5]), t2;
              }, {}), o3 = {}, r3 = {}, i3 = {}, a2 = null, s2 = null;
              i3.drag = function(t2, n5) {
                n5({ point: t2.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? (e3.ui.queueMapClasses({ mouse: S }), s2.drag(t2)) : t2.originalEvent.stopPropagation();
              }, i3.mousedrag = function(t2) {
                i3.drag(t2, function(t3) {
                  return !at(o3, t3);
                });
              }, i3.touchdrag = function(t2) {
                i3.drag(t2, function(t3) {
                  return !st(r3, t3);
                });
              }, i3.mousemove = function(t2) {
                if (1 === (void 0 !== t2.originalEvent.buttons ? t2.originalEvent.buttons : t2.originalEvent.which)) return i3.mousedrag(t2);
                var n5 = rt(t2, e3);
                t2.featureTarget = n5, s2.mousemove(t2);
              }, i3.mousedown = function(t2) {
                o3 = { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point };
                var n5 = rt(t2, e3);
                t2.featureTarget = n5, s2.mousedown(t2);
              }, i3.mouseup = function(t2) {
                var n5 = rt(t2, e3);
                t2.featureTarget = n5, at(o3, { point: t2.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? s2.click(t2) : s2.mouseup(t2);
              }, i3.mouseout = function(t2) {
                s2.mouseout(t2);
              }, i3.touchstart = function(t2) {
                if (t2.originalEvent.preventDefault(), e3.options.touchEnabled) {
                  r3 = { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point };
                  var n5 = nt.touch(t2, null, e3)[0];
                  t2.featureTarget = n5, s2.touchstart(t2);
                }
              }, i3.touchmove = function(t2) {
                if (t2.originalEvent.preventDefault(), e3.options.touchEnabled) return s2.touchmove(t2), i3.touchdrag(t2);
              }, i3.touchend = function(t2) {
                if (t2.originalEvent.preventDefault(), e3.options.touchEnabled) {
                  var n5 = nt.touch(t2, null, e3)[0];
                  t2.featureTarget = n5, st(r3, { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point }) ? s2.tap(t2) : s2.touchend(t2);
                }
              };
              var u2 = function(t2) {
                return !(8 === t2 || 46 === t2 || t2 >= 48 && t2 <= 57);
              };
              function c2(o4, r4, i4) {
                void 0 === i4 && (i4 = {}), s2.stop();
                var u3 = n4[o4];
                if (void 0 === u3) throw new Error(o4 + " is not valid");
                a2 = o4;
                var c3 = u3(e3, r4);
                s2 = t(c3, e3), i4.silent || e3.map.fire(R, { mode: o4 }), e3.store.setDirty(), e3.store.render();
              }
              i3.keydown = function(t2) {
                "mapboxgl-canvas" === (t2.srcElement || t2.target).classList[0] && (8 !== t2.keyCode && 46 !== t2.keyCode || !e3.options.controls.trash ? u2(t2.keyCode) ? s2.keydown(t2) : 49 === t2.keyCode && e3.options.controls.point ? c2(j.DRAW_POINT) : 50 === t2.keyCode && e3.options.controls.line_string ? c2(j.DRAW_LINE_STRING) : 51 === t2.keyCode && e3.options.controls.polygon && c2(j.DRAW_POLYGON) : (t2.preventDefault(), s2.trash()));
              }, i3.keyup = function(t2) {
                u2(t2.keyCode) && s2.keyup(t2);
              }, i3.zoomend = function() {
                e3.store.changeZoom();
              }, i3.data = function(t2) {
                if ("style" === t2.dataType) {
                  var n5 = e3.setup, o4 = e3.map, r4 = e3.options, i4 = e3.store;
                  r4.styles.some(function(t3) {
                    return o4.getLayer(t3.id);
                  }) || (n5.addLayers(), i4.setDirty(), i4.render());
                }
              };
              var l2 = { trash: false, combineFeatures: false, uncombineFeatures: false };
              return { start: function() {
                a2 = e3.options.defaultMode, s2 = t(n4[a2](e3), e3);
              }, changeMode: c2, actionable: function(t2) {
                var n5 = false;
                Object.keys(t2).forEach(function(e4) {
                  if (void 0 === l2[e4]) throw new Error("Invalid action type");
                  l2[e4] !== t2[e4] && (n5 = true), l2[e4] = t2[e4];
                }), n5 && e3.map.fire(B, { actions: l2 });
              }, currentModeName: function() {
                return a2;
              }, currentModeRender: function(t2, e4) {
                return s2.render(t2, e4);
              }, fire: function(t2, e4) {
                i3[t2] && i3[t2](e4);
              }, addEventListeners: function() {
                e3.map.on("mousemove", i3.mousemove), e3.map.on("mousedown", i3.mousedown), e3.map.on("mouseup", i3.mouseup), e3.map.on("data", i3.data), e3.map.on("touchmove", i3.touchmove), e3.map.on("touchstart", i3.touchstart), e3.map.on("touchend", i3.touchend), e3.container.addEventListener("mouseout", i3.mouseout), e3.options.keybindings && (e3.container.addEventListener("keydown", i3.keydown), e3.container.addEventListener("keyup", i3.keyup));
              }, removeEventListeners: function() {
                e3.map.off("mousemove", i3.mousemove), e3.map.off("mousedown", i3.mousedown), e3.map.off("mouseup", i3.mouseup), e3.map.off("data", i3.data), e3.map.off("touchmove", i3.touchmove), e3.map.off("touchstart", i3.touchstart), e3.map.off("touchend", i3.touchend), e3.container.removeEventListener("mouseout", i3.mouseout), e3.options.keybindings && (e3.container.removeEventListener("keydown", i3.keydown), e3.container.removeEventListener("keyup", i3.keyup));
              }, trash: function(t2) {
                s2.trash(t2);
              }, combineFeatures: function() {
                s2.combineFeatures();
              }, uncombineFeatures: function() {
                s2.uncombineFeatures();
              }, getMode: function() {
                return a2;
              } };
            }(e2), e2.ui = /* @__PURE__ */ function(t2) {
              var e3 = {}, n4 = null, o3 = { mode: null, feature: null, mouse: null }, r3 = { mode: null, feature: null, mouse: null };
              function i3(t3) {
                r3 = Mt(r3, t3);
              }
              function y3() {
                var e4, n5;
                if (t2.container) {
                  var i4 = [], a2 = [];
                  It.forEach(function(t3) {
                    r3[t3] !== o3[t3] && (i4.push(t3 + "-" + o3[t3]), null !== r3[t3] && a2.push(t3 + "-" + r3[t3]));
                  }), i4.length > 0 && (e4 = t2.container.classList).remove.apply(e4, i4), a2.length > 0 && (n5 = t2.container.classList).add.apply(n5, a2), o3 = Mt(o3, r3);
                }
              }
              function v2(t3, e4) {
                void 0 === e4 && (e4 = {});
                var o4 = document.createElement("button");
                return o4.className = s + " " + e4.className, o4.setAttribute("title", e4.title), e4.container.appendChild(o4), o4.addEventListener("click", function(o5) {
                  if (o5.preventDefault(), o5.stopPropagation(), o5.target === n4) return m2(), void e4.onDeactivate();
                  b2(t3), e4.onActivate();
                }, true), o4;
              }
              function m2() {
                n4 && (n4.classList.remove(g), n4 = null);
              }
              function b2(t3) {
                m2();
                var o4 = e3[t3];
                o4 && o4 && "trash" !== t3 && (o4.classList.add(g), n4 = o4);
              }
              return { setActiveButton: b2, queueMapClasses: i3, updateMapClasses: y3, clearMapClasses: function() {
                i3({ mode: null, feature: null, mouse: null }), y3();
              }, addButtons: function() {
                var n5 = t2.options.controls, o4 = document.createElement("div");
                return o4.className = h + " " + a, n5 ? (n5[E.LINE] && (e3[E.LINE] = v2(E.LINE, { container: o4, className: u, title: "LineString tool " + (t2.options.keybindings ? "(l)" : ""), onActivate: function() {
                  return t2.events.changeMode(j.DRAW_LINE_STRING);
                }, onDeactivate: function() {
                  return t2.events.trash();
                } })), n5[E.POLYGON] && (e3[E.POLYGON] = v2(E.POLYGON, { container: o4, className: c, title: "Polygon tool " + (t2.options.keybindings ? "(p)" : ""), onActivate: function() {
                  return t2.events.changeMode(j.DRAW_POLYGON);
                }, onDeactivate: function() {
                  return t2.events.trash();
                } })), n5[E.POINT] && (e3[E.POINT] = v2(E.POINT, { container: o4, className: l, title: "Marker tool " + (t2.options.keybindings ? "(m)" : ""), onActivate: function() {
                  return t2.events.changeMode(j.DRAW_POINT);
                }, onDeactivate: function() {
                  return t2.events.trash();
                } })), n5.trash && (e3.trash = v2("trash", { container: o4, className: d, title: "Delete", onActivate: function() {
                  t2.events.trash();
                } })), n5.combine_features && (e3.combine_features = v2("combineFeatures", { container: o4, className: p, title: "Combine", onActivate: function() {
                  t2.events.combineFeatures();
                } })), n5.uncombine_features && (e3.uncombine_features = v2("uncombineFeatures", { container: o4, className: f, title: "Uncombine", onActivate: function() {
                  t2.events.uncombineFeatures();
                } })), o4) : o4;
              }, removeButtons: function() {
                Object.keys(e3).forEach(function(t3) {
                  var n5 = e3[t3];
                  n5.parentNode && n5.parentNode.removeChild(n5), delete e3[t3];
                });
              } };
            }(e2), e2.container = i2.getContainer(), e2.store = new Ct(e2), n3 = e2.ui.addButtons(), e2.options.boxSelect && (i2.boxZoom.disable(), i2.dragPan.disable(), i2.dragPan.enable()), i2.loaded() ? r2.connect() : (i2.on("load", r2.connect), o2 = setInterval(function() {
              i2.loaded() && r2.connect();
            }, 16)), e2.events.start(), n3;
          }, addLayers: function() {
            e2.map.addSource(m, { data: { type: P3, features: [] }, type: "geojson" }), e2.map.addSource(v, { data: { type: P3, features: [] }, type: "geojson" }), e2.options.styles.forEach(function(t2) {
              e2.map.addLayer(t2);
            }), e2.store.setDirty(true), e2.store.render();
          }, removeLayers: function() {
            e2.options.styles.forEach(function(t2) {
              e2.map.getLayer(t2.id) && e2.map.removeLayer(t2.id);
            }), e2.map.getSource(m) && e2.map.removeSource(m), e2.map.getSource(v) && e2.map.removeSource(v);
          } };
          return e2.setup = r2, r2;
        }
        function Pt(t2) {
          return function(e2) {
            var n3 = e2.featureTarget;
            return !!n3 && (!!n3.properties && n3.properties.meta === t2);
          };
        }
        function Ft(t2) {
          return !!t2.featureTarget && (!!t2.featureTarget.properties && (t2.featureTarget.properties.active === Z && t2.featureTarget.properties.meta === W));
        }
        function Ot(t2) {
          return !!t2.featureTarget && (!!t2.featureTarget.properties && (t2.featureTarget.properties.active === K && t2.featureTarget.properties.meta === W));
        }
        function kt(t2) {
          return void 0 === t2.featureTarget;
        }
        function Tt(t2) {
          var e2 = t2.featureTarget;
          return !!e2 && (!!e2.properties && e2.properties.meta === Y);
        }
        function jt(t2) {
          return !!t2.originalEvent && true === t2.originalEvent.shiftKey;
        }
        function At(t2) {
          return 27 === t2.keyCode;
        }
        function Dt(t2) {
          return 13 === t2.keyCode;
        }
        var Nt = Ut;
        function Ut(t2, e2) {
          this.x = t2, this.y = e2;
        }
        function Rt(t2, e2) {
          var n3 = e2.getBoundingClientRect();
          return new Nt(t2.clientX - n3.left - (e2.clientLeft || 0), t2.clientY - n3.top - (e2.clientTop || 0));
        }
        function Bt(t2, e2, n3, o2) {
          return { type: M, properties: { meta: Y, parent: t2, coord_path: n3, active: o2 ? Z : K }, geometry: { type: L, coordinates: e2 } };
        }
        function Vt(t2, e2, n3) {
          void 0 === e2 && (e2 = {}), void 0 === n3 && (n3 = null);
          var o2, r2 = t2.geometry, i2 = r2.type, a2 = r2.coordinates, s2 = t2.properties && t2.properties.id, u2 = [];
          function c2(t3, n4) {
            var o3 = "", r3 = null;
            t3.forEach(function(t4, i3) {
              var a3 = null != n4 ? n4 + "." + i3 : String(i3), c3 = Bt(s2, t4, a3, l2(a3));
              if (e2.midpoints && r3) {
                var d2 = function(t5, e3, n5) {
                  var o4 = e3.geometry.coordinates, r4 = n5.geometry.coordinates;
                  if (o4[1] > 85 || o4[1] < -85 || r4[1] > 85 || r4[1] < -85) return null;
                  var i4 = { lng: (o4[0] + r4[0]) / 2, lat: (o4[1] + r4[1]) / 2 };
                  return { type: M, properties: { meta: q, parent: t5, lng: i4.lng, lat: i4.lat, coord_path: n5.properties.coord_path }, geometry: { type: L, coordinates: [i4.lng, i4.lat] } };
                }(s2, r3, c3);
                d2 && u2.push(d2);
              }
              r3 = c3;
              var p2 = JSON.stringify(t4);
              o3 !== p2 && u2.push(c3), 0 === i3 && (o3 = p2);
            });
          }
          function l2(t3) {
            return !!e2.selectedPaths && -1 !== e2.selectedPaths.indexOf(t3);
          }
          return i2 === L ? u2.push(Bt(s2, a2, n3, l2(n3))) : i2 === w ? a2.forEach(function(t3, e3) {
            c2(t3, null !== n3 ? n3 + "." + e3 : String(e3));
          }) : i2 === I ? c2(a2, n3) : 0 === i2.indexOf(F) && (o2 = i2.replace(F, ""), a2.forEach(function(n4, r3) {
            var i3 = { type: M, properties: t2.properties, geometry: { type: o2, coordinates: n4 } };
            u2 = u2.concat(Vt(i3, e2, r3));
          })), u2;
        }
        Ut.prototype = { clone: function() {
          return new Ut(this.x, this.y);
        }, add: function(t2) {
          return this.clone()._add(t2);
        }, sub: function(t2) {
          return this.clone()._sub(t2);
        }, multByPoint: function(t2) {
          return this.clone()._multByPoint(t2);
        }, divByPoint: function(t2) {
          return this.clone()._divByPoint(t2);
        }, mult: function(t2) {
          return this.clone()._mult(t2);
        }, div: function(t2) {
          return this.clone()._div(t2);
        }, rotate: function(t2) {
          return this.clone()._rotate(t2);
        }, rotateAround: function(t2, e2) {
          return this.clone()._rotateAround(t2, e2);
        }, matMult: function(t2) {
          return this.clone()._matMult(t2);
        }, unit: function() {
          return this.clone()._unit();
        }, perp: function() {
          return this.clone()._perp();
        }, round: function() {
          return this.clone()._round();
        }, mag: function() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }, equals: function(t2) {
          return this.x === t2.x && this.y === t2.y;
        }, dist: function(t2) {
          return Math.sqrt(this.distSqr(t2));
        }, distSqr: function(t2) {
          var e2 = t2.x - this.x, n3 = t2.y - this.y;
          return e2 * e2 + n3 * n3;
        }, angle: function() {
          return Math.atan2(this.y, this.x);
        }, angleTo: function(t2) {
          return Math.atan2(this.y - t2.y, this.x - t2.x);
        }, angleWith: function(t2) {
          return this.angleWithSep(t2.x, t2.y);
        }, angleWithSep: function(t2, e2) {
          return Math.atan2(this.x * e2 - this.y * t2, this.x * t2 + this.y * e2);
        }, _matMult: function(t2) {
          var e2 = t2[0] * this.x + t2[1] * this.y, n3 = t2[2] * this.x + t2[3] * this.y;
          return this.x = e2, this.y = n3, this;
        }, _add: function(t2) {
          return this.x += t2.x, this.y += t2.y, this;
        }, _sub: function(t2) {
          return this.x -= t2.x, this.y -= t2.y, this;
        }, _mult: function(t2) {
          return this.x *= t2, this.y *= t2, this;
        }, _div: function(t2) {
          return this.x /= t2, this.y /= t2, this;
        }, _multByPoint: function(t2) {
          return this.x *= t2.x, this.y *= t2.y, this;
        }, _divByPoint: function(t2) {
          return this.x /= t2.x, this.y /= t2.y, this;
        }, _unit: function() {
          return this._div(this.mag()), this;
        }, _perp: function() {
          var t2 = this.y;
          return this.y = this.x, this.x = -t2, this;
        }, _rotate: function(t2) {
          var e2 = Math.cos(t2), n3 = Math.sin(t2), o2 = e2 * this.x - n3 * this.y, r2 = n3 * this.x + e2 * this.y;
          return this.x = o2, this.y = r2, this;
        }, _rotateAround: function(t2, e2) {
          var n3 = Math.cos(t2), o2 = Math.sin(t2), r2 = e2.x + n3 * (this.x - e2.x) - o2 * (this.y - e2.y), i2 = e2.y + o2 * (this.x - e2.x) + n3 * (this.y - e2.y);
          return this.x = r2, this.y = i2, this;
        }, _round: function() {
          return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        } }, Ut.convert = function(t2) {
          return t2 instanceof Ut ? t2 : Array.isArray(t2) ? new Ut(t2[0], t2[1]) : t2;
        };
        var Jt = function(t2) {
          setTimeout(function() {
            t2.map && t2.map.doubleClickZoom && t2._ctx && t2._ctx.store && t2._ctx.store.getInitialConfigValue && t2._ctx.store.getInitialConfigValue("doubleClickZoom") && t2.map.doubleClickZoom.enable();
          }, 0);
        }, Gt = function(t2) {
          setTimeout(function() {
            t2.map && t2.map.doubleClickZoom && t2.map.doubleClickZoom.disable();
          }, 0);
        }, zt = function(t2) {
          if (!t2 || !t2.type) return null;
          var e2 = $t[t2.type];
          if (!e2) return null;
          if ("geometry" === e2) return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: t2 }] };
          if ("feature" === e2) return { type: "FeatureCollection", features: [t2] };
          if ("featurecollection" === e2) return t2;
        }, $t = { Point: "geometry", MultiPoint: "geometry", LineString: "geometry", MultiLineString: "geometry", Polygon: "geometry", MultiPolygon: "geometry", GeometryCollection: "geometry", Feature: "feature", FeatureCollection: "featurecollection" };
        function Wt(t2) {
          switch (t2 && t2.type || null) {
            case "FeatureCollection":
              return t2.features = t2.features.reduce(function(t3, e2) {
                return t3.concat(Wt(e2));
              }, []), t2;
            case "Feature":
              return t2.geometry ? Wt(t2.geometry).map(function(e2) {
                var n3 = { type: "Feature", properties: JSON.parse(JSON.stringify(t2.properties)), geometry: e2 };
                return void 0 !== t2.id && (n3.id = t2.id), n3;
              }) : [t2];
            case "MultiPoint":
              return t2.coordinates.map(function(t3) {
                return { type: "Point", coordinates: t3 };
              });
            case "MultiPolygon":
              return t2.coordinates.map(function(t3) {
                return { type: "Polygon", coordinates: t3 };
              });
            case "MultiLineString":
              return t2.coordinates.map(function(t3) {
                return { type: "LineString", coordinates: t3 };
              });
            case "GeometryCollection":
              return t2.geometries.map(Wt).reduce(function(t3, e2) {
                return t3.concat(e2);
              }, []);
            case "Point":
            case "Polygon":
            case "LineString":
              return [t2];
          }
        }
        var qt = function(t2) {
          if (!t2) return [];
          var e2 = Wt(zt(t2)), n3 = [];
          return e2.features.forEach(function(t3) {
            t3.geometry && (n3 = n3.concat(function t4(e3) {
              return Array.isArray(e3) && e3.length && "number" == typeof e3[0] ? [e3] : e3.reduce(function(e4, n4) {
                return Array.isArray(n4) && Array.isArray(n4[0]) ? e4.concat(t4(n4)) : (e4.push(n4), e4);
              }, []);
            }(t3.geometry.coordinates)));
          }), n3;
        }, Yt = ut(function(t2) {
          var e2 = t2.exports = function(t3) {
            return new n3(t3);
          };
          function n3(t3) {
            this.value = t3;
          }
          function o2(t3, e3, n4) {
            var o3 = [], a3 = [], l2 = true;
            return function t4(d2) {
              var p2 = n4 ? r2(d2) : d2, f2 = {}, h2 = true, g2 = { node: p2, node_: d2, path: [].concat(o3), parent: a3[a3.length - 1], parents: a3, key: o3.slice(-1)[0], isRoot: 0 === o3.length, level: o3.length, circular: null, update: function(t5, e4) {
                g2.isRoot || (g2.parent.node[g2.key] = t5), g2.node = t5, e4 && (h2 = false);
              }, delete: function(t5) {
                delete g2.parent.node[g2.key], t5 && (h2 = false);
              }, remove: function(t5) {
                s2(g2.parent.node) ? g2.parent.node.splice(g2.key, 1) : delete g2.parent.node[g2.key], t5 && (h2 = false);
              }, keys: null, before: function(t5) {
                f2.before = t5;
              }, after: function(t5) {
                f2.after = t5;
              }, pre: function(t5) {
                f2.pre = t5;
              }, post: function(t5) {
                f2.post = t5;
              }, stop: function() {
                l2 = false;
              }, block: function() {
                h2 = false;
              } };
              if (!l2) return g2;
              function y2() {
                if ("object" == typeof g2.node && null !== g2.node) {
                  g2.keys && g2.node_ === g2.node || (g2.keys = i2(g2.node)), g2.isLeaf = 0 == g2.keys.length;
                  for (var t5 = 0; t5 < a3.length; t5++) if (a3[t5].node_ === d2) {
                    g2.circular = a3[t5];
                    break;
                  }
                } else g2.isLeaf = true, g2.keys = null;
                g2.notLeaf = !g2.isLeaf, g2.notRoot = !g2.isRoot;
              }
              y2();
              var v2 = e3.call(g2, g2.node);
              return void 0 !== v2 && g2.update && g2.update(v2), f2.before && f2.before.call(g2, g2.node), h2 ? ("object" != typeof g2.node || null === g2.node || g2.circular || (a3.push(g2), y2(), u2(g2.keys, function(e4, r3) {
                o3.push(e4), f2.pre && f2.pre.call(g2, g2.node[e4], e4);
                var i3 = t4(g2.node[e4]);
                n4 && c2.call(g2.node, e4) && (g2.node[e4] = i3.node), i3.isLast = r3 == g2.keys.length - 1, i3.isFirst = 0 == r3, f2.post && f2.post.call(g2, i3), o3.pop();
              }), a3.pop()), f2.after && f2.after.call(g2, g2.node), g2) : g2;
            }(t3).node;
          }
          function r2(t3) {
            if ("object" == typeof t3 && null !== t3) {
              var e3;
              if (s2(t3)) e3 = [];
              else if ("[object Date]" === a2(t3)) e3 = new Date(t3.getTime ? t3.getTime() : t3);
              else if (function(t4) {
                return "[object RegExp]" === a2(t4);
              }(t3)) e3 = new RegExp(t3);
              else if (function(t4) {
                return "[object Error]" === a2(t4);
              }(t3)) e3 = { message: t3.message };
              else if (function(t4) {
                return "[object Boolean]" === a2(t4);
              }(t3)) e3 = new Boolean(t3);
              else if (function(t4) {
                return "[object Number]" === a2(t4);
              }(t3)) e3 = new Number(t3);
              else if (function(t4) {
                return "[object String]" === a2(t4);
              }(t3)) e3 = new String(t3);
              else if (Object.create && Object.getPrototypeOf) e3 = Object.create(Object.getPrototypeOf(t3));
              else if (t3.constructor === Object) e3 = {};
              else {
                var n4 = t3.constructor && t3.constructor.prototype || t3.__proto__ || {}, o3 = function() {
                };
                o3.prototype = n4, e3 = new o3();
              }
              return u2(i2(t3), function(n5) {
                e3[n5] = t3[n5];
              }), e3;
            }
            return t3;
          }
          n3.prototype.get = function(t3) {
            for (var e3 = this.value, n4 = 0; n4 < t3.length; n4++) {
              var o3 = t3[n4];
              if (!e3 || !c2.call(e3, o3)) {
                e3 = void 0;
                break;
              }
              e3 = e3[o3];
            }
            return e3;
          }, n3.prototype.has = function(t3) {
            for (var e3 = this.value, n4 = 0; n4 < t3.length; n4++) {
              var o3 = t3[n4];
              if (!e3 || !c2.call(e3, o3)) return false;
              e3 = e3[o3];
            }
            return true;
          }, n3.prototype.set = function(t3, e3) {
            for (var n4 = this.value, o3 = 0; o3 < t3.length - 1; o3++) {
              var r3 = t3[o3];
              c2.call(n4, r3) || (n4[r3] = {}), n4 = n4[r3];
            }
            return n4[t3[o3]] = e3, e3;
          }, n3.prototype.map = function(t3) {
            return o2(this.value, t3, true);
          }, n3.prototype.forEach = function(t3) {
            return this.value = o2(this.value, t3, false), this.value;
          }, n3.prototype.reduce = function(t3, e3) {
            var n4 = 1 === arguments.length, o3 = n4 ? this.value : e3;
            return this.forEach(function(e4) {
              this.isRoot && n4 || (o3 = t3.call(this, o3, e4));
            }), o3;
          }, n3.prototype.paths = function() {
            var t3 = [];
            return this.forEach(function(e3) {
              t3.push(this.path);
            }), t3;
          }, n3.prototype.nodes = function() {
            var t3 = [];
            return this.forEach(function(e3) {
              t3.push(this.node);
            }), t3;
          }, n3.prototype.clone = function() {
            var t3 = [], e3 = [];
            return function n4(o3) {
              for (var a3 = 0; a3 < t3.length; a3++) if (t3[a3] === o3) return e3[a3];
              if ("object" == typeof o3 && null !== o3) {
                var s3 = r2(o3);
                return t3.push(o3), e3.push(s3), u2(i2(o3), function(t4) {
                  s3[t4] = n4(o3[t4]);
                }), t3.pop(), e3.pop(), s3;
              }
              return o3;
            }(this.value);
          };
          var i2 = Object.keys || function(t3) {
            var e3 = [];
            for (var n4 in t3) e3.push(n4);
            return e3;
          };
          function a2(t3) {
            return Object.prototype.toString.call(t3);
          }
          var s2 = Array.isArray || function(t3) {
            return "[object Array]" === Object.prototype.toString.call(t3);
          }, u2 = function(t3, e3) {
            if (t3.forEach) return t3.forEach(e3);
            for (var n4 = 0; n4 < t3.length; n4++) e3(t3[n4], n4, t3);
          };
          u2(i2(n3.prototype), function(t3) {
            e2[t3] = function(e3) {
              var o3 = [].slice.call(arguments, 1), r3 = new n3(e3);
              return r3[t3].apply(r3, o3);
            };
          });
          var c2 = Object.hasOwnProperty || function(t3, e3) {
            return e3 in t3;
          };
        }), Zt = Kt;
        function Kt(t2) {
          if (!(this instanceof Kt)) return new Kt(t2);
          this._bbox = t2 || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!t2;
        }
        Kt.prototype.include = function(t2) {
          return this._valid = true, this._bbox[0] = Math.min(this._bbox[0], t2[0]), this._bbox[1] = Math.min(this._bbox[1], t2[1]), this._bbox[2] = Math.max(this._bbox[2], t2[0]), this._bbox[3] = Math.max(this._bbox[3], t2[1]), this;
        }, Kt.prototype.equals = function(t2) {
          var e2;
          return e2 = t2 instanceof Kt ? t2.bbox() : t2, this._bbox[0] == e2[0] && this._bbox[1] == e2[1] && this._bbox[2] == e2[2] && this._bbox[3] == e2[3];
        }, Kt.prototype.center = function(t2) {
          return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
        }, Kt.prototype.union = function(t2) {
          var e2;
          return this._valid = true, e2 = t2 instanceof Kt ? t2.bbox() : t2, this._bbox[0] = Math.min(this._bbox[0], e2[0]), this._bbox[1] = Math.min(this._bbox[1], e2[1]), this._bbox[2] = Math.max(this._bbox[2], e2[2]), this._bbox[3] = Math.max(this._bbox[3], e2[3]), this;
        }, Kt.prototype.bbox = function() {
          return this._valid ? this._bbox : null;
        }, Kt.prototype.contains = function(t2) {
          if (!t2) return this._fastContains();
          if (!this._valid) return null;
          var e2 = t2[0], n3 = t2[1];
          return this._bbox[0] <= e2 && this._bbox[1] <= n3 && this._bbox[2] >= e2 && this._bbox[3] >= n3;
        }, Kt.prototype.intersect = function(t2) {
          return this._valid ? (e2 = t2 instanceof Kt ? t2.bbox() : t2, !(this._bbox[0] > e2[2] || this._bbox[2] < e2[0] || this._bbox[3] < e2[1] || this._bbox[1] > e2[3])) : null;
          var e2;
        }, Kt.prototype._fastContains = function() {
          if (!this._valid) return new Function("return null;");
          var t2 = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
          return new Function("ll", t2);
        }, Kt.prototype.polygon = function() {
          return this._valid ? { type: "Polygon", coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]] } : null;
        };
        var Xt = { features: ["FeatureCollection"], coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], geometry: ["Feature"], geometries: ["GeometryCollection"] }, Ht = Object.keys(Xt), Qt = function(t2) {
          return te(t2).bbox();
        };
        function te(t2) {
          for (var e2 = Zt(), n3 = qt(t2), o2 = 0; o2 < n3.length; o2++) e2.include(n3[o2]);
          return e2;
        }
        Qt.polygon = function(t2) {
          return te(t2).polygon();
        }, Qt.bboxify = function(t2) {
          return Yt(t2).map(function(t3) {
            t3 && (Ht.some(function(e2) {
              return !!t3[e2] && -1 !== Xt[e2].indexOf(t3.type);
            }) && (t3.bbox = te(t3).bbox(), this.update(t3)));
          });
        };
        function ee(t2, e2) {
          var n3 = -90, o2 = 90, r2 = -90, i2 = 90, a2 = 270, s2 = -270;
          t2.forEach(function(t3) {
            var e3 = Qt(t3), u3 = e3[1], c2 = e3[3], l2 = e3[0], d2 = e3[2];
            u3 > n3 && (n3 = u3), c2 < o2 && (o2 = c2), c2 > r2 && (r2 = c2), u3 < i2 && (i2 = u3), l2 < a2 && (a2 = l2), d2 > s2 && (s2 = d2);
          });
          var u2 = e2;
          return n3 + u2.lat > 85 && (u2.lat = 85 - n3), r2 + u2.lat > 90 && (u2.lat = 90 - r2), o2 + u2.lat < -85 && (u2.lat = -85 - o2), i2 + u2.lat < -90 && (u2.lat = -90 - i2), a2 + u2.lng <= -270 && (u2.lng += 360 * Math.ceil(Math.abs(u2.lng) / 360)), s2 + u2.lng >= 270 && (u2.lng -= 360 * Math.ceil(Math.abs(u2.lng) / 360)), u2;
        }
        function ne(t2, e2) {
          var n3 = ee(t2.map(function(t3) {
            return t3.toGeoJSON();
          }), e2);
          t2.forEach(function(t3) {
            var e3, o2 = t3.getCoordinates(), r2 = function(t4) {
              var e4 = { lng: t4[0] + n3.lng, lat: t4[1] + n3.lat };
              return [e4.lng, e4.lat];
            }, i2 = function(t4) {
              return t4.map(function(t5) {
                return r2(t5);
              });
            };
            t3.type === L ? e3 = r2(o2) : t3.type === I || t3.type === O ? e3 = o2.map(r2) : t3.type === w || t3.type === k ? e3 = o2.map(i2) : t3.type === T && (e3 = o2.map(function(t4) {
              return t4.map(function(t5) {
                return i2(t5);
              });
            })), t3.incomingCoords(e3);
          });
        }
        var oe = { onSetup: function(t2) {
          var e2 = this, n3 = { dragMoveLocation: null, boxSelectStartLocation: null, boxSelectElement: void 0, boxSelecting: false, canBoxSelect: false, dragMoving: false, canDragMove: false, initiallySelectedFeatureIds: t2.featureIds || [] };
          return this.setSelected(n3.initiallySelectedFeatureIds.filter(function(t3) {
            return void 0 !== e2.getFeature(t3);
          })), this.fireActionable(), this.setActionableState({ combineFeatures: true, uncombineFeatures: true, trash: true }), n3;
        }, fireUpdate: function() {
          this.map.fire(N, { action: z, features: this.getSelected().map(function(t2) {
            return t2.toGeoJSON();
          }) });
        }, fireActionable: function() {
          var t2 = this, e2 = this.getSelected(), n3 = e2.filter(function(e3) {
            return t2.isInstanceOf("MultiFeature", e3);
          }), o2 = false;
          if (e2.length > 1) {
            o2 = true;
            var r2 = e2[0].type.replace("Multi", "");
            e2.forEach(function(t3) {
              t3.type.replace("Multi", "") !== r2 && (o2 = false);
            });
          }
          var i2 = n3.length > 0, a2 = e2.length > 0;
          this.setActionableState({ combineFeatures: o2, uncombineFeatures: i2, trash: a2 });
        }, getUniqueIds: function(t2) {
          return t2.length ? t2.map(function(t3) {
            return t3.properties.id;
          }).filter(function(t3) {
            return void 0 !== t3;
          }).reduce(function(t3, e2) {
            return t3.add(e2), t3;
          }, new tt()).values() : [];
        }, stopExtendedInteractions: function(t2) {
          t2.boxSelectElement && (t2.boxSelectElement.parentNode && t2.boxSelectElement.parentNode.removeChild(t2.boxSelectElement), t2.boxSelectElement = null), this.map.dragPan.enable(), t2.boxSelecting = false, t2.canBoxSelect = false, t2.dragMoving = false, t2.canDragMove = false;
        }, onStop: function() {
          Jt(this);
        }, onMouseMove: function(t2) {
          return this.stopExtendedInteractions(t2), true;
        }, onMouseOut: function(t2) {
          return !t2.dragMoving || this.fireUpdate();
        } };
        oe.onTap = oe.onClick = function(t2, e2) {
          return kt(e2) ? this.clickAnywhere(t2, e2) : Pt(Y)(e2) ? this.clickOnVertex(t2, e2) : function(t3) {
            return !!t3.featureTarget && (!!t3.featureTarget.properties && t3.featureTarget.properties.meta === W);
          }(e2) ? this.clickOnFeature(t2, e2) : void 0;
        }, oe.clickAnywhere = function(t2) {
          var e2 = this, n3 = this.getSelectedIds();
          n3.length && (this.clearSelectedFeatures(), n3.forEach(function(t3) {
            return e2.doRender(t3);
          })), Jt(this), this.stopExtendedInteractions(t2);
        }, oe.clickOnVertex = function(t2, e2) {
          this.changeMode(j.DIRECT_SELECT, { featureId: e2.featureTarget.properties.parent, coordPath: e2.featureTarget.properties.coord_path, startPos: e2.lngLat }), this.updateUIClasses({ mouse: _ });
        }, oe.startOnActiveFeature = function(t2, e2) {
          this.stopExtendedInteractions(t2), this.map.dragPan.disable(), this.doRender(e2.featureTarget.properties.id), t2.canDragMove = true, t2.dragMoveLocation = e2.lngLat;
        }, oe.clickOnFeature = function(t2, e2) {
          var n3 = this;
          Gt(this), this.stopExtendedInteractions(t2);
          var o2 = jt(e2), r2 = this.getSelectedIds(), i2 = e2.featureTarget.properties.id, a2 = this.isSelected(i2);
          if (!o2 && a2 && this.getFeature(i2).type !== L) return this.changeMode(j.DIRECT_SELECT, { featureId: i2 });
          a2 && o2 ? (this.deselect(i2), this.updateUIClasses({ mouse: x }), 1 === r2.length && Jt(this)) : !a2 && o2 ? (this.select(i2), this.updateUIClasses({ mouse: _ })) : a2 || o2 || (r2.forEach(function(t3) {
            return n3.doRender(t3);
          }), this.setSelected(i2), this.updateUIClasses({ mouse: _ })), this.doRender(i2);
        }, oe.onMouseDown = function(t2, e2) {
          return Ft(e2) ? this.startOnActiveFeature(t2, e2) : this.drawConfig.boxSelect && function(t3) {
            return !!t3.originalEvent && (!!t3.originalEvent.shiftKey && 0 === t3.originalEvent.button);
          }(e2) ? this.startBoxSelect(t2, e2) : void 0;
        }, oe.startBoxSelect = function(t2, e2) {
          this.stopExtendedInteractions(t2), this.map.dragPan.disable(), t2.boxSelectStartLocation = Rt(e2.originalEvent, this.map.getContainer()), t2.canBoxSelect = true;
        }, oe.onTouchStart = function(t2, e2) {
          if (Ft(e2)) return this.startOnActiveFeature(t2, e2);
        }, oe.onDrag = function(t2, e2) {
          return t2.canDragMove ? this.dragMove(t2, e2) : this.drawConfig.boxSelect && t2.canBoxSelect ? this.whileBoxSelect(t2, e2) : void 0;
        }, oe.whileBoxSelect = function(t2, e2) {
          t2.boxSelecting = true, this.updateUIClasses({ mouse: b }), t2.boxSelectElement || (t2.boxSelectElement = document.createElement("div"), t2.boxSelectElement.classList.add(y), this.map.getContainer().appendChild(t2.boxSelectElement));
          var n3 = Rt(e2.originalEvent, this.map.getContainer()), o2 = Math.min(t2.boxSelectStartLocation.x, n3.x), r2 = Math.max(t2.boxSelectStartLocation.x, n3.x), i2 = Math.min(t2.boxSelectStartLocation.y, n3.y), a2 = Math.max(t2.boxSelectStartLocation.y, n3.y), s2 = "translate(" + o2 + "px, " + i2 + "px)";
          t2.boxSelectElement.style.transform = s2, t2.boxSelectElement.style.WebkitTransform = s2, t2.boxSelectElement.style.width = r2 - o2 + "px", t2.boxSelectElement.style.height = a2 - i2 + "px";
        }, oe.dragMove = function(t2, e2) {
          t2.dragMoving = true, e2.originalEvent.stopPropagation();
          var n3 = { lng: e2.lngLat.lng - t2.dragMoveLocation.lng, lat: e2.lngLat.lat - t2.dragMoveLocation.lat };
          ne(this.getSelected(), n3), t2.dragMoveLocation = e2.lngLat;
        }, oe.onMouseUp = function(t2, e2) {
          var n3 = this;
          if (t2.dragMoving) this.fireUpdate();
          else if (t2.boxSelecting) {
            var o2 = [t2.boxSelectStartLocation, Rt(e2.originalEvent, this.map.getContainer())], r2 = this.featuresAt(null, o2, "click"), i2 = this.getUniqueIds(r2).filter(function(t3) {
              return !n3.isSelected(t3);
            });
            i2.length && (this.select(i2), i2.forEach(function(t3) {
              return n3.doRender(t3);
            }), this.updateUIClasses({ mouse: _ }));
          }
          this.stopExtendedInteractions(t2);
        }, oe.toDisplayFeatures = function(t2, e2, n3) {
          e2.properties.active = this.isSelected(e2.properties.id) ? Z : K, n3(e2), this.fireActionable(), e2.properties.active === Z && e2.geometry.type !== L && Vt(e2).forEach(n3);
        }, oe.onTrash = function() {
          this.deleteFeature(this.getSelectedIds()), this.fireActionable();
        }, oe.onCombineFeatures = function() {
          var t2 = this.getSelected();
          if (!(0 === t2.length || t2.length < 2)) {
            for (var e2 = [], n3 = [], o2 = t2[0].type.replace("Multi", ""), r2 = 0; r2 < t2.length; r2++) {
              var i2 = t2[r2];
              if (i2.type.replace("Multi", "") !== o2) return;
              i2.type.includes("Multi") ? i2.getCoordinates().forEach(function(t3) {
                e2.push(t3);
              }) : e2.push(i2.getCoordinates()), n3.push(i2.toGeoJSON());
            }
            if (n3.length > 1) {
              var a2 = this.newFeature({ type: M, properties: n3[0].properties, geometry: { type: "Multi" + o2, coordinates: e2 } });
              this.addFeature(a2), this.deleteFeature(this.getSelectedIds(), { silent: true }), this.setSelected([a2.id]), this.map.fire(J, { createdFeatures: [a2.toGeoJSON()], deletedFeatures: n3 });
            }
            this.fireActionable();
          }
        }, oe.onUncombineFeatures = function() {
          var t2 = this, e2 = this.getSelected();
          if (0 !== e2.length) {
            for (var n3 = [], o2 = [], r2 = function(r3) {
              var i3 = e2[r3];
              t2.isInstanceOf("MultiFeature", i3) && (i3.getFeatures().forEach(function(e3) {
                t2.addFeature(e3), e3.properties = i3.properties, n3.push(e3.toGeoJSON()), t2.select([e3.id]);
              }), t2.deleteFeature(i3.id, { silent: true }), o2.push(i3.toGeoJSON()));
            }, i2 = 0; i2 < e2.length; i2++) r2(i2);
            n3.length > 1 && this.map.fire(G, { createdFeatures: n3, deletedFeatures: o2 }), this.fireActionable();
          }
        };
        var re = Pt(Y), ie = Pt(q), ae = { fireUpdate: function() {
          this.map.fire(N, { action: $, features: this.getSelected().map(function(t2) {
            return t2.toGeoJSON();
          }) });
        }, fireActionable: function(t2) {
          this.setActionableState({ combineFeatures: false, uncombineFeatures: false, trash: t2.selectedCoordPaths.length > 0 });
        }, startDragging: function(t2, e2) {
          this.map.dragPan.disable(), t2.canDragMove = true, t2.dragMoveLocation = e2.lngLat;
        }, stopDragging: function(t2) {
          this.map.dragPan.enable(), t2.dragMoving = false, t2.canDragMove = false, t2.dragMoveLocation = null;
        }, onVertex: function(t2, e2) {
          this.startDragging(t2, e2);
          var n3 = e2.featureTarget.properties, o2 = t2.selectedCoordPaths.indexOf(n3.coord_path);
          jt(e2) || -1 !== o2 ? jt(e2) && -1 === o2 && t2.selectedCoordPaths.push(n3.coord_path) : t2.selectedCoordPaths = [n3.coord_path];
          var r2 = this.pathsToCoordinates(t2.featureId, t2.selectedCoordPaths);
          this.setSelectedCoordinates(r2);
        }, onMidpoint: function(t2, e2) {
          this.startDragging(t2, e2);
          var n3 = e2.featureTarget.properties;
          t2.feature.addCoordinate(n3.coord_path, n3.lng, n3.lat), this.fireUpdate(), t2.selectedCoordPaths = [n3.coord_path];
        }, pathsToCoordinates: function(t2, e2) {
          return e2.map(function(e3) {
            return { feature_id: t2, coord_path: e3 };
          });
        }, onFeature: function(t2, e2) {
          0 === t2.selectedCoordPaths.length ? this.startDragging(t2, e2) : this.stopDragging(t2);
        }, dragFeature: function(t2, e2, n3) {
          ne(this.getSelected(), n3), t2.dragMoveLocation = e2.lngLat;
        }, dragVertex: function(t2, e2, n3) {
          for (var o2 = t2.selectedCoordPaths.map(function(e3) {
            return t2.feature.getCoordinate(e3);
          }), r2 = ee(o2.map(function(t3) {
            return { type: M, properties: {}, geometry: { type: L, coordinates: t3 } };
          }), n3), i2 = 0; i2 < o2.length; i2++) {
            var a2 = o2[i2];
            t2.feature.updateCoordinate(t2.selectedCoordPaths[i2], a2[0] + r2.lng, a2[1] + r2.lat);
          }
        }, clickNoTarget: function() {
          this.changeMode(j.SIMPLE_SELECT);
        }, clickInactive: function() {
          this.changeMode(j.SIMPLE_SELECT);
        }, clickActiveFeature: function(t2) {
          t2.selectedCoordPaths = [], this.clearSelectedCoordinates(), t2.feature.changed();
        }, onSetup: function(t2) {
          var e2 = t2.featureId, n3 = this.getFeature(e2);
          if (!n3) throw new Error("You must provide a featureId to enter direct_select mode");
          if (n3.type === L) throw new TypeError("direct_select mode doesn't handle point features");
          var o2 = { featureId: e2, feature: n3, dragMoveLocation: t2.startPos || null, dragMoving: false, canDragMove: false, selectedCoordPaths: t2.coordPath ? [t2.coordPath] : [] };
          return this.setSelectedCoordinates(this.pathsToCoordinates(e2, o2.selectedCoordPaths)), this.setSelected(e2), Gt(this), this.setActionableState({ trash: true }), o2;
        }, onStop: function() {
          Jt(this), this.clearSelectedCoordinates();
        }, toDisplayFeatures: function(t2, e2, n3) {
          t2.featureId === e2.properties.id ? (e2.properties.active = Z, n3(e2), Vt(e2, { map: this.map, midpoints: true, selectedPaths: t2.selectedCoordPaths }).forEach(n3)) : (e2.properties.active = K, n3(e2)), this.fireActionable(t2);
        }, onTrash: function(t2) {
          t2.selectedCoordPaths.sort(function(t3, e2) {
            return e2.localeCompare(t3, "en", { numeric: true });
          }).forEach(function(e2) {
            return t2.feature.removeCoordinate(e2);
          }), this.fireUpdate(), t2.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(t2), false === t2.feature.isValid() && (this.deleteFeature([t2.featureId]), this.changeMode(j.SIMPLE_SELECT, {}));
        }, onMouseMove: function(t2, e2) {
          var n3 = Ft(e2), o2 = re(e2), r2 = 0 === t2.selectedCoordPaths.length;
          return n3 && r2 || o2 && !r2 ? this.updateUIClasses({ mouse: _ }) : this.updateUIClasses({ mouse: C }), this.stopDragging(t2), true;
        }, onMouseOut: function(t2) {
          return t2.dragMoving && this.fireUpdate(), true;
        } };
        ae.onTouchStart = ae.onMouseDown = function(t2, e2) {
          return re(e2) ? this.onVertex(t2, e2) : Ft(e2) ? this.onFeature(t2, e2) : ie(e2) ? this.onMidpoint(t2, e2) : void 0;
        }, ae.onDrag = function(t2, e2) {
          if (true === t2.canDragMove) {
            t2.dragMoving = true, e2.originalEvent.stopPropagation();
            var n3 = { lng: e2.lngLat.lng - t2.dragMoveLocation.lng, lat: e2.lngLat.lat - t2.dragMoveLocation.lat };
            t2.selectedCoordPaths.length > 0 ? this.dragVertex(t2, e2, n3) : this.dragFeature(t2, e2, n3), t2.dragMoveLocation = e2.lngLat;
          }
        }, ae.onClick = function(t2, e2) {
          return kt(e2) ? this.clickNoTarget(t2, e2) : Ft(e2) ? this.clickActiveFeature(t2, e2) : Ot(e2) ? this.clickInactive(t2, e2) : void this.stopDragging(t2);
        }, ae.onTap = function(t2, e2) {
          return kt(e2) ? this.clickNoTarget(t2, e2) : Ft(e2) ? this.clickActiveFeature(t2, e2) : Ot(e2) ? this.clickInactive(t2, e2) : void 0;
        }, ae.onTouchEnd = ae.onMouseUp = function(t2) {
          t2.dragMoving && this.fireUpdate(), this.stopDragging(t2);
        };
        var se = {};
        function ue(t2, e2) {
          return !!t2.lngLat && (t2.lngLat.lng === e2[0] && t2.lngLat.lat === e2[1]);
        }
        se.onSetup = function() {
          var t2 = this.newFeature({ type: M, properties: {}, geometry: { type: L, coordinates: [] } });
          return this.addFeature(t2), this.clearSelectedFeatures(), this.updateUIClasses({ mouse: b }), this.activateUIButton(E.POINT), this.setActionableState({ trash: true }), { point: t2 };
        }, se.stopDrawingAndRemove = function(t2) {
          this.deleteFeature([t2.point.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT);
        }, se.onTap = se.onClick = function(t2, e2) {
          this.updateUIClasses({ mouse: _ }), t2.point.updateCoordinate("", e2.lngLat.lng, e2.lngLat.lat), this.map.fire(A, { features: [t2.point.toGeoJSON()] }), this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.point.id] });
        }, se.onStop = function(t2) {
          this.activateUIButton(), t2.point.getCoordinate().length || this.deleteFeature([t2.point.id], { silent: true });
        }, se.toDisplayFeatures = function(t2, e2, n3) {
          var o2 = e2.properties.id === t2.point.id;
          if (e2.properties.active = o2 ? Z : K, !o2) return n3(e2);
        }, se.onTrash = se.stopDrawingAndRemove, se.onKeyUp = function(t2, e2) {
          if (At(e2) || Dt(e2)) return this.stopDrawingAndRemove(t2, e2);
        };
        var ce = { onSetup: function() {
          var t2 = this.newFeature({ type: M, properties: {}, geometry: { type: w, coordinates: [[]] } });
          return this.addFeature(t2), this.clearSelectedFeatures(), Gt(this), this.updateUIClasses({ mouse: b }), this.activateUIButton(E.POLYGON), this.setActionableState({ trash: true }), { polygon: t2, currentVertexPosition: 0 };
        }, clickAnywhere: function(t2, e2) {
          if (t2.currentVertexPosition > 0 && ue(e2, t2.polygon.coordinates[0][t2.currentVertexPosition - 1])) return this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
          this.updateUIClasses({ mouse: b }), t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), t2.currentVertexPosition++, t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
        }, clickOnVertex: function(t2) {
          return this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
        }, onMouseMove: function(t2, e2) {
          t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), Tt(e2) && this.updateUIClasses({ mouse: x });
        } };
        ce.onTap = ce.onClick = function(t2, e2) {
          return Tt(e2) ? this.clickOnVertex(t2, e2) : this.clickAnywhere(t2, e2);
        }, ce.onKeyUp = function(t2, e2) {
          At(e2) ? (this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT)) : Dt(e2) && this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
        }, ce.onStop = function(t2) {
          this.updateUIClasses({ mouse: C }), Jt(this), this.activateUIButton(), void 0 !== this.getFeature(t2.polygon.id) && (t2.polygon.removeCoordinate("0." + t2.currentVertexPosition), t2.polygon.isValid() ? this.map.fire(A, { features: [t2.polygon.toGeoJSON()] }) : (this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT, {}, { silent: true })));
        }, ce.toDisplayFeatures = function(t2, e2, n3) {
          var o2 = e2.properties.id === t2.polygon.id;
          if (e2.properties.active = o2 ? Z : K, !o2) return n3(e2);
          if (0 !== e2.geometry.coordinates.length) {
            var r2 = e2.geometry.coordinates[0].length;
            if (!(r2 < 3)) {
              if (e2.properties.meta = W, n3(Bt(t2.polygon.id, e2.geometry.coordinates[0][0], "0.0", false)), r2 > 3) {
                var i2 = e2.geometry.coordinates[0].length - 3;
                n3(Bt(t2.polygon.id, e2.geometry.coordinates[0][i2], "0." + i2, false));
              }
              if (r2 <= 4) {
                var a2 = [[e2.geometry.coordinates[0][0][0], e2.geometry.coordinates[0][0][1]], [e2.geometry.coordinates[0][1][0], e2.geometry.coordinates[0][1][1]]];
                if (n3({ type: M, properties: e2.properties, geometry: { coordinates: a2, type: I } }), 3 === r2) return;
              }
              return n3(e2);
            }
          }
        }, ce.onTrash = function(t2) {
          this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT);
        };
        var le = { onSetup: function(t2) {
          var e2, n3, o2 = (t2 = t2 || {}).featureId, r2 = "forward";
          if (o2) {
            if (!(e2 = this.getFeature(o2))) throw new Error("Could not find a feature with the provided featureId");
            var i2 = t2.from;
            if (i2 && "Feature" === i2.type && i2.geometry && "Point" === i2.geometry.type && (i2 = i2.geometry), i2 && "Point" === i2.type && i2.coordinates && 2 === i2.coordinates.length && (i2 = i2.coordinates), !i2 || !Array.isArray(i2)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
            var a2 = e2.coordinates.length - 1;
            if (e2.coordinates[a2][0] === i2[0] && e2.coordinates[a2][1] === i2[1]) n3 = a2 + 1, e2.addCoordinate.apply(e2, [n3].concat(e2.coordinates[a2]));
            else {
              if (e2.coordinates[0][0] !== i2[0] || e2.coordinates[0][1] !== i2[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
              r2 = "backwards", n3 = 0, e2.addCoordinate.apply(e2, [n3].concat(e2.coordinates[0]));
            }
          } else e2 = this.newFeature({ type: M, properties: {}, geometry: { type: I, coordinates: [] } }), n3 = 0, this.addFeature(e2);
          return this.clearSelectedFeatures(), Gt(this), this.updateUIClasses({ mouse: b }), this.activateUIButton(E.LINE), this.setActionableState({ trash: true }), { line: e2, currentVertexPosition: n3, direction: r2 };
        }, clickAnywhere: function(t2, e2) {
          if (t2.currentVertexPosition > 0 && ue(e2, t2.line.coordinates[t2.currentVertexPosition - 1]) || "backwards" === t2.direction && ue(e2, t2.line.coordinates[t2.currentVertexPosition + 1])) return this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.line.id] });
          this.updateUIClasses({ mouse: b }), t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), "forward" === t2.direction ? (t2.currentVertexPosition++, t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat)) : t2.line.addCoordinate(0, e2.lngLat.lng, e2.lngLat.lat);
        }, clickOnVertex: function(t2) {
          return this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.line.id] });
        }, onMouseMove: function(t2, e2) {
          t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), Tt(e2) && this.updateUIClasses({ mouse: x });
        } };
        le.onTap = le.onClick = function(t2, e2) {
          if (Tt(e2)) return this.clickOnVertex(t2, e2);
          this.clickAnywhere(t2, e2);
        }, le.onKeyUp = function(t2, e2) {
          Dt(e2) ? this.changeMode(j.SIMPLE_SELECT, { featureIds: [t2.line.id] }) : At(e2) && (this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT));
        }, le.onStop = function(t2) {
          Jt(this), this.activateUIButton(), void 0 !== this.getFeature(t2.line.id) && (t2.line.removeCoordinate("" + t2.currentVertexPosition), t2.line.isValid() ? this.map.fire(A, { features: [t2.line.toGeoJSON()] }) : (this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT, {}, { silent: true })));
        }, le.onTrash = function(t2) {
          this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(j.SIMPLE_SELECT);
        }, le.toDisplayFeatures = function(t2, e2, n3) {
          var o2 = e2.properties.id === t2.line.id;
          if (e2.properties.active = o2 ? Z : K, !o2) return n3(e2);
          e2.geometry.coordinates.length < 2 || (e2.properties.meta = W, n3(Bt(t2.line.id, e2.geometry.coordinates["forward" === t2.direction ? e2.geometry.coordinates.length - 2 : 1], "" + ("forward" === t2.direction ? e2.geometry.coordinates.length - 2 : 1), false)), n3(e2));
        };
        var de = { simple_select: oe, direct_select: ae, draw_point: se, draw_polygon: ce, draw_line_string: le }, pe = { defaultMode: j.SIMPLE_SELECT, keybindings: true, touchEnabled: true, clickBuffer: 2, touchBuffer: 25, boxSelect: true, displayControlsDefault: true, styles: [{ id: "gl-draw-polygon-fill-inactive", type: "fill", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], paint: { "fill-color": "#3bb2d0", "fill-outline-color": "#3bb2d0", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-fill-active", type: "fill", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#fbb03b", "fill-outline-color": "#fbb03b", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-midpoint", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-stroke-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-polygon-stroke-active", type: "line", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-line-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-line-active", type: "line", filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-polygon-and-line-vertex-stroke-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-color": "#fff" } }, { id: "gl-draw-polygon-and-line-vertex-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-point-point-stroke-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-opacity": 1, "circle-color": "#fff" } }, { id: "gl-draw-point-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#3bb2d0" } }, { id: "gl-draw-point-stroke-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]], paint: { "circle-radius": 7, "circle-color": "#fff" } }, { id: "gl-draw-point-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]], paint: { "circle-radius": 5, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-fill-static", type: "fill", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#404040", "fill-outline-color": "#404040", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-stroke-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-line-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-point-static", type: "circle", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]], paint: { "circle-radius": 5, "circle-color": "#404040" } }], modes: de, controls: {}, userProperties: false }, fe = { point: true, line_string: true, polygon: true, trash: true, combine_features: true, uncombine_features: true }, he = { point: false, line_string: false, polygon: false, trash: false, combine_features: false, uncombine_features: false };
        function ge(t2, e2) {
          return t2.map(function(t3) {
            return t3.source ? t3 : Mt(t3, { id: t3.id + "." + e2, source: "hot" === e2 ? v : m });
          });
        }
        var ye = ut(function(t2, e2) {
          var n3 = "[object Arguments]", o2 = "[object Map]", r2 = "[object Object]", i2 = "[object Set]", a2 = /^\[object .+?Constructor\]$/, s2 = /^(?:0|[1-9]\d*)$/, u2 = {};
          u2["[object Float32Array]"] = u2["[object Float64Array]"] = u2["[object Int8Array]"] = u2["[object Int16Array]"] = u2["[object Int32Array]"] = u2["[object Uint8Array]"] = u2["[object Uint8ClampedArray]"] = u2["[object Uint16Array]"] = u2["[object Uint32Array]"] = true, u2[n3] = u2["[object Array]"] = u2["[object ArrayBuffer]"] = u2["[object Boolean]"] = u2["[object DataView]"] = u2["[object Date]"] = u2["[object Error]"] = u2["[object Function]"] = u2[o2] = u2["[object Number]"] = u2[r2] = u2["[object RegExp]"] = u2[i2] = u2["[object String]"] = u2["[object WeakMap]"] = false;
          var c2 = "object" == typeof global && global && global.Object === Object && global, l2 = "object" == typeof self && self && self.Object === Object && self, d2 = c2 || l2 || Function("return this")(), p2 = e2 && !e2.nodeType && e2, f2 = p2 && t2 && !t2.nodeType && t2, h2 = f2 && f2.exports === p2, g2 = h2 && c2.process, y2 = function() {
            try {
              return g2 && g2.binding && g2.binding("util");
            } catch (t3) {
            }
          }(), v2 = y2 && y2.isTypedArray;
          function m2(t3, e3) {
            for (var n4 = -1, o3 = null == t3 ? 0 : t3.length; ++n4 < o3; ) if (e3(t3[n4], n4, t3)) return true;
            return false;
          }
          function b2(t3) {
            var e3 = -1, n4 = Array(t3.size);
            return t3.forEach(function(t4, o3) {
              n4[++e3] = [o3, t4];
            }), n4;
          }
          function _2(t3) {
            var e3 = -1, n4 = Array(t3.size);
            return t3.forEach(function(t4) {
              n4[++e3] = t4;
            }), n4;
          }
          var S2, x2, C2, E2 = Array.prototype, M2 = Function.prototype, w2 = Object.prototype, I2 = d2["__core-js_shared__"], L2 = M2.toString, P4 = w2.hasOwnProperty, F2 = (S2 = /[^.]+$/.exec(I2 && I2.keys && I2.keys.IE_PROTO || "")) ? "Symbol(src)_1." + S2 : "", O2 = w2.toString, k2 = RegExp("^" + L2.call(P4).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), T2 = h2 ? d2.Buffer : void 0, j2 = d2.Symbol, A2 = d2.Uint8Array, D2 = w2.propertyIsEnumerable, N2 = E2.splice, U2 = j2 ? j2.toStringTag : void 0, R2 = Object.getOwnPropertySymbols, B2 = T2 ? T2.isBuffer : void 0, V2 = (x2 = Object.keys, C2 = Object, function(t3) {
            return x2(C2(t3));
          }), J2 = yt2(d2, "DataView"), G2 = yt2(d2, "Map"), z2 = yt2(d2, "Promise"), $2 = yt2(d2, "Set"), W2 = yt2(d2, "WeakMap"), q2 = yt2(Object, "create"), Y2 = _t2(J2), Z2 = _t2(G2), K2 = _t2(z2), X2 = _t2($2), H2 = _t2(W2), Q2 = j2 ? j2.prototype : void 0, tt2 = Q2 ? Q2.valueOf : void 0;
          function et2(t3) {
            var e3 = -1, n4 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n4; ) {
              var o3 = t3[e3];
              this.set(o3[0], o3[1]);
            }
          }
          function nt2(t3) {
            var e3 = -1, n4 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n4; ) {
              var o3 = t3[e3];
              this.set(o3[0], o3[1]);
            }
          }
          function ot2(t3) {
            var e3 = -1, n4 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n4; ) {
              var o3 = t3[e3];
              this.set(o3[0], o3[1]);
            }
          }
          function rt2(t3) {
            var e3 = -1, n4 = null == t3 ? 0 : t3.length;
            for (this.__data__ = new ot2(); ++e3 < n4; ) this.add(t3[e3]);
          }
          function it2(t3) {
            var e3 = this.__data__ = new nt2(t3);
            this.size = e3.size;
          }
          function at2(t3, e3) {
            var n4 = Ct2(t3), o3 = !n4 && xt2(t3), r3 = !n4 && !o3 && Et2(t3), i3 = !n4 && !o3 && !r3 && Pt2(t3), a3 = n4 || o3 || r3 || i3, s3 = a3 ? function(t4, e4) {
              for (var n5 = -1, o4 = Array(t4); ++n5 < t4; ) o4[n5] = e4(n5);
              return o4;
            }(t3.length, String) : [], u3 = s3.length;
            for (var c3 in t3) !e3 && !P4.call(t3, c3) || a3 && ("length" == c3 || r3 && ("offset" == c3 || "parent" == c3) || i3 && ("buffer" == c3 || "byteLength" == c3 || "byteOffset" == c3) || bt2(c3, u3)) || s3.push(c3);
            return s3;
          }
          function st2(t3, e3) {
            for (var n4 = t3.length; n4--; ) if (St2(t3[n4][0], e3)) return n4;
            return -1;
          }
          function ut2(t3) {
            return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : U2 && U2 in Object(t3) ? function(t4) {
              var e3 = P4.call(t4, U2), n4 = t4[U2];
              try {
                t4[U2] = void 0;
                var o3 = true;
              } catch (t5) {
              }
              var r3 = O2.call(t4);
              o3 && (e3 ? t4[U2] = n4 : delete t4[U2]);
              return r3;
            }(t3) : function(t4) {
              return O2.call(t4);
            }(t3);
          }
          function ct2(t3) {
            return Lt2(t3) && ut2(t3) == n3;
          }
          function lt2(t3, e3, a3, s3, u3) {
            return t3 === e3 || (null == t3 || null == e3 || !Lt2(t3) && !Lt2(e3) ? t3 != t3 && e3 != e3 : function(t4, e4, a4, s4, u4, c3) {
              var l3 = Ct2(t4), d3 = Ct2(e4), p3 = l3 ? "[object Array]" : mt2(t4), f3 = d3 ? "[object Array]" : mt2(e4), h3 = (p3 = p3 == n3 ? r2 : p3) == r2, g3 = (f3 = f3 == n3 ? r2 : f3) == r2, y3 = p3 == f3;
              if (y3 && Et2(t4)) {
                if (!Et2(e4)) return false;
                l3 = true, h3 = false;
              }
              if (y3 && !h3) return c3 || (c3 = new it2()), l3 || Pt2(t4) ? ft2(t4, e4, a4, s4, u4, c3) : function(t5, e5, n4, r3, a5, s5, u5) {
                switch (n4) {
                  case "[object DataView]":
                    if (t5.byteLength != e5.byteLength || t5.byteOffset != e5.byteOffset) return false;
                    t5 = t5.buffer, e5 = e5.buffer;
                  case "[object ArrayBuffer]":
                    return !(t5.byteLength != e5.byteLength || !s5(new A2(t5), new A2(e5)));
                  case "[object Boolean]":
                  case "[object Date]":
                  case "[object Number]":
                    return St2(+t5, +e5);
                  case "[object Error]":
                    return t5.name == e5.name && t5.message == e5.message;
                  case "[object RegExp]":
                  case "[object String]":
                    return t5 == e5 + "";
                  case o2:
                    var c4 = b2;
                  case i2:
                    var l4 = 1 & r3;
                    if (c4 || (c4 = _2), t5.size != e5.size && !l4) return false;
                    var d4 = u5.get(t5);
                    if (d4) return d4 == e5;
                    r3 |= 2, u5.set(t5, e5);
                    var p4 = ft2(c4(t5), c4(e5), r3, a5, s5, u5);
                    return u5.delete(t5), p4;
                  case "[object Symbol]":
                    if (tt2) return tt2.call(t5) == tt2.call(e5);
                }
                return false;
              }(t4, e4, p3, a4, s4, u4, c3);
              if (!(1 & a4)) {
                var v3 = h3 && P4.call(t4, "__wrapped__"), m3 = g3 && P4.call(e4, "__wrapped__");
                if (v3 || m3) {
                  var S3 = v3 ? t4.value() : t4, x3 = m3 ? e4.value() : e4;
                  return c3 || (c3 = new it2()), u4(S3, x3, a4, s4, c3);
                }
              }
              if (!y3) return false;
              return c3 || (c3 = new it2()), function(t5, e5, n4, o3, r3, i3) {
                var a5 = 1 & n4, s5 = ht2(t5), u5 = s5.length, c4 = ht2(e5).length;
                if (u5 != c4 && !a5) return false;
                var l4 = u5;
                for (; l4--; ) {
                  var d4 = s5[l4];
                  if (!(a5 ? d4 in e5 : P4.call(e5, d4))) return false;
                }
                var p4 = i3.get(t5);
                if (p4 && i3.get(e5)) return p4 == e5;
                var f4 = true;
                i3.set(t5, e5), i3.set(e5, t5);
                var h4 = a5;
                for (; ++l4 < u5; ) {
                  d4 = s5[l4];
                  var g4 = t5[d4], y4 = e5[d4];
                  if (o3) var v4 = a5 ? o3(y4, g4, d4, e5, t5, i3) : o3(g4, y4, d4, t5, e5, i3);
                  if (!(void 0 === v4 ? g4 === y4 || r3(g4, y4, n4, o3, i3) : v4)) {
                    f4 = false;
                    break;
                  }
                  h4 || (h4 = "constructor" == d4);
                }
                if (f4 && !h4) {
                  var m4 = t5.constructor, b3 = e5.constructor;
                  m4 == b3 || !("constructor" in t5) || !("constructor" in e5) || "function" == typeof m4 && m4 instanceof m4 && "function" == typeof b3 && b3 instanceof b3 || (f4 = false);
                }
                return i3.delete(t5), i3.delete(e5), f4;
              }(t4, e4, a4, s4, u4, c3);
            }(t3, e3, a3, s3, lt2, u3));
          }
          function dt2(t3) {
            return !(!It2(t3) || function(t4) {
              return !!F2 && F2 in t4;
            }(t3)) && (Mt2(t3) ? k2 : a2).test(_t2(t3));
          }
          function pt2(t3) {
            if (n4 = (e3 = t3) && e3.constructor, o3 = "function" == typeof n4 && n4.prototype || w2, e3 !== o3) return V2(t3);
            var e3, n4, o3, r3 = [];
            for (var i3 in Object(t3)) P4.call(t3, i3) && "constructor" != i3 && r3.push(i3);
            return r3;
          }
          function ft2(t3, e3, n4, o3, r3, i3) {
            var a3 = 1 & n4, s3 = t3.length, u3 = e3.length;
            if (s3 != u3 && !(a3 && u3 > s3)) return false;
            var c3 = i3.get(t3);
            if (c3 && i3.get(e3)) return c3 == e3;
            var l3 = -1, d3 = true, p3 = 2 & n4 ? new rt2() : void 0;
            for (i3.set(t3, e3), i3.set(e3, t3); ++l3 < s3; ) {
              var f3 = t3[l3], h3 = e3[l3];
              if (o3) var g3 = a3 ? o3(h3, f3, l3, e3, t3, i3) : o3(f3, h3, l3, t3, e3, i3);
              if (void 0 !== g3) {
                if (g3) continue;
                d3 = false;
                break;
              }
              if (p3) {
                if (!m2(e3, function(t4, e4) {
                  if (a4 = e4, !p3.has(a4) && (f3 === t4 || r3(f3, t4, n4, o3, i3))) return p3.push(e4);
                  var a4;
                })) {
                  d3 = false;
                  break;
                }
              } else if (f3 !== h3 && !r3(f3, h3, n4, o3, i3)) {
                d3 = false;
                break;
              }
            }
            return i3.delete(t3), i3.delete(e3), d3;
          }
          function ht2(t3) {
            return function(t4, e3, n4) {
              var o3 = e3(t4);
              return Ct2(t4) ? o3 : function(t5, e4) {
                for (var n5 = -1, o4 = e4.length, r3 = t5.length; ++n5 < o4; ) t5[r3 + n5] = e4[n5];
                return t5;
              }(o3, n4(t4));
            }(t3, Ft2, vt2);
          }
          function gt2(t3, e3) {
            var n4, o3, r3 = t3.__data__;
            return ("string" == (o3 = typeof (n4 = e3)) || "number" == o3 || "symbol" == o3 || "boolean" == o3 ? "__proto__" !== n4 : null === n4) ? r3["string" == typeof e3 ? "string" : "hash"] : r3.map;
          }
          function yt2(t3, e3) {
            var n4 = function(t4, e4) {
              return null == t4 ? void 0 : t4[e4];
            }(t3, e3);
            return dt2(n4) ? n4 : void 0;
          }
          et2.prototype.clear = function() {
            this.__data__ = q2 ? q2(null) : {}, this.size = 0;
          }, et2.prototype.delete = function(t3) {
            var e3 = this.has(t3) && delete this.__data__[t3];
            return this.size -= e3 ? 1 : 0, e3;
          }, et2.prototype.get = function(t3) {
            var e3 = this.__data__;
            if (q2) {
              var n4 = e3[t3];
              return "__lodash_hash_undefined__" === n4 ? void 0 : n4;
            }
            return P4.call(e3, t3) ? e3[t3] : void 0;
          }, et2.prototype.has = function(t3) {
            var e3 = this.__data__;
            return q2 ? void 0 !== e3[t3] : P4.call(e3, t3);
          }, et2.prototype.set = function(t3, e3) {
            var n4 = this.__data__;
            return this.size += this.has(t3) ? 0 : 1, n4[t3] = q2 && void 0 === e3 ? "__lodash_hash_undefined__" : e3, this;
          }, nt2.prototype.clear = function() {
            this.__data__ = [], this.size = 0;
          }, nt2.prototype.delete = function(t3) {
            var e3 = this.__data__, n4 = st2(e3, t3);
            return !(n4 < 0) && (n4 == e3.length - 1 ? e3.pop() : N2.call(e3, n4, 1), --this.size, true);
          }, nt2.prototype.get = function(t3) {
            var e3 = this.__data__, n4 = st2(e3, t3);
            return n4 < 0 ? void 0 : e3[n4][1];
          }, nt2.prototype.has = function(t3) {
            return st2(this.__data__, t3) > -1;
          }, nt2.prototype.set = function(t3, e3) {
            var n4 = this.__data__, o3 = st2(n4, t3);
            return o3 < 0 ? (++this.size, n4.push([t3, e3])) : n4[o3][1] = e3, this;
          }, ot2.prototype.clear = function() {
            this.size = 0, this.__data__ = { hash: new et2(), map: new (G2 || nt2)(), string: new et2() };
          }, ot2.prototype.delete = function(t3) {
            var e3 = gt2(this, t3).delete(t3);
            return this.size -= e3 ? 1 : 0, e3;
          }, ot2.prototype.get = function(t3) {
            return gt2(this, t3).get(t3);
          }, ot2.prototype.has = function(t3) {
            return gt2(this, t3).has(t3);
          }, ot2.prototype.set = function(t3, e3) {
            var n4 = gt2(this, t3), o3 = n4.size;
            return n4.set(t3, e3), this.size += n4.size == o3 ? 0 : 1, this;
          }, rt2.prototype.add = rt2.prototype.push = function(t3) {
            return this.__data__.set(t3, "__lodash_hash_undefined__"), this;
          }, rt2.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, it2.prototype.clear = function() {
            this.__data__ = new nt2(), this.size = 0;
          }, it2.prototype.delete = function(t3) {
            var e3 = this.__data__, n4 = e3.delete(t3);
            return this.size = e3.size, n4;
          }, it2.prototype.get = function(t3) {
            return this.__data__.get(t3);
          }, it2.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, it2.prototype.set = function(t3, e3) {
            var n4 = this.__data__;
            if (n4 instanceof nt2) {
              var o3 = n4.__data__;
              if (!G2 || o3.length < 199) return o3.push([t3, e3]), this.size = ++n4.size, this;
              n4 = this.__data__ = new ot2(o3);
            }
            return n4.set(t3, e3), this.size = n4.size, this;
          };
          var vt2 = R2 ? function(t3) {
            return null == t3 ? [] : (t3 = Object(t3), function(t4, e3) {
              for (var n4 = -1, o3 = null == t4 ? 0 : t4.length, r3 = 0, i3 = []; ++n4 < o3; ) {
                var a3 = t4[n4];
                e3(a3, n4, t4) && (i3[r3++] = a3);
              }
              return i3;
            }(R2(t3), function(e3) {
              return D2.call(t3, e3);
            }));
          } : function() {
            return [];
          }, mt2 = ut2;
          function bt2(t3, e3) {
            return !!(e3 = null == e3 ? 9007199254740991 : e3) && ("number" == typeof t3 || s2.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          }
          function _t2(t3) {
            if (null != t3) {
              try {
                return L2.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          }
          function St2(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          }
          (J2 && "[object DataView]" != mt2(new J2(new ArrayBuffer(1))) || G2 && mt2(new G2()) != o2 || z2 && "[object Promise]" != mt2(z2.resolve()) || $2 && mt2(new $2()) != i2 || W2 && "[object WeakMap]" != mt2(new W2())) && (mt2 = function(t3) {
            var e3 = ut2(t3), n4 = e3 == r2 ? t3.constructor : void 0, a3 = n4 ? _t2(n4) : "";
            if (a3) switch (a3) {
              case Y2:
                return "[object DataView]";
              case Z2:
                return o2;
              case K2:
                return "[object Promise]";
              case X2:
                return i2;
              case H2:
                return "[object WeakMap]";
            }
            return e3;
          });
          var xt2 = ct2(/* @__PURE__ */ function() {
            return arguments;
          }()) ? ct2 : function(t3) {
            return Lt2(t3) && P4.call(t3, "callee") && !D2.call(t3, "callee");
          }, Ct2 = Array.isArray;
          var Et2 = B2 || function() {
            return false;
          };
          function Mt2(t3) {
            if (!It2(t3)) return false;
            var e3 = ut2(t3);
            return "[object Function]" == e3 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
          }
          function wt2(t3) {
            return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= 9007199254740991;
          }
          function It2(t3) {
            var e3 = typeof t3;
            return null != t3 && ("object" == e3 || "function" == e3);
          }
          function Lt2(t3) {
            return null != t3 && "object" == typeof t3;
          }
          var Pt2 = v2 ? /* @__PURE__ */ function(t3) {
            return function(e3) {
              return t3(e3);
            };
          }(v2) : function(t3) {
            return Lt2(t3) && wt2(t3.length) && !!u2[ut2(t3)];
          };
          function Ft2(t3) {
            return null != (e3 = t3) && wt2(e3.length) && !Mt2(e3) ? at2(t3) : pt2(t3);
            var e3;
          }
          t2.exports = function(t3, e3) {
            return lt2(t3, e3);
          };
        });
        var ve = { Polygon: ft, LineString: pt, Point: dt, MultiPolygon: yt, MultiLineString: yt, MultiPoint: yt };
        function me(t2, e2) {
          return e2.modes = j, e2.getFeatureIdsAt = function(e3) {
            return nt.click({ point: e3 }, null, t2).map(function(t3) {
              return t3.properties.id;
            });
          }, e2.getSelectedIds = function() {
            return t2.store.getSelectedIds();
          }, e2.getSelected = function() {
            return { type: P3, features: t2.store.getSelectedIds().map(function(e3) {
              return t2.store.get(e3);
            }).map(function(t3) {
              return t3.toGeoJSON();
            }) };
          }, e2.getSelectedPoints = function() {
            return { type: P3, features: t2.store.getSelectedCoordinates().map(function(t3) {
              return { type: M, properties: {}, geometry: { type: L, coordinates: t3.coordinates } };
            }) };
          }, e2.set = function(n3) {
            if (void 0 === n3.type || n3.type !== P3 || !Array.isArray(n3.features)) throw new Error("Invalid FeatureCollection");
            var o2 = t2.store.createRenderBatch(), r2 = t2.store.getAllIds().slice(), i2 = e2.add(n3), a2 = new tt(i2);
            return (r2 = r2.filter(function(t3) {
              return !a2.has(t3);
            })).length && e2.delete(r2), o2(), i2;
          }, e2.add = function(e3) {
            var n3 = JSON.parse(JSON.stringify(zt(e3))).features.map(function(e4) {
              if (e4.id = e4.id || ct(), null === e4.geometry) throw new Error("Invalid geometry: null");
              if (void 0 === t2.store.get(e4.id) || t2.store.get(e4.id).type !== e4.geometry.type) {
                var n4 = ve[e4.geometry.type];
                if (void 0 === n4) throw new Error("Invalid geometry type: " + e4.geometry.type + ".");
                var o2 = new n4(t2, e4);
                t2.store.add(o2);
              } else {
                var r2 = t2.store.get(e4.id);
                r2.properties = e4.properties, ye(r2.getCoordinates(), e4.geometry.coordinates) || r2.incomingCoords(e4.geometry.coordinates);
              }
              return e4.id;
            });
            return t2.store.render(), n3;
          }, e2.get = function(e3) {
            var n3 = t2.store.get(e3);
            if (n3) return n3.toGeoJSON();
          }, e2.getAll = function() {
            return { type: P3, features: t2.store.getAll().map(function(t3) {
              return t3.toGeoJSON();
            }) };
          }, e2.delete = function(n3) {
            return t2.store.delete(n3, { silent: true }), e2.getMode() !== j.DIRECT_SELECT || t2.store.getSelectedIds().length ? t2.store.render() : t2.events.changeMode(j.SIMPLE_SELECT, void 0, { silent: true }), e2;
          }, e2.deleteAll = function() {
            return t2.store.delete(t2.store.getAllIds(), { silent: true }), e2.getMode() === j.DIRECT_SELECT ? t2.events.changeMode(j.SIMPLE_SELECT, void 0, { silent: true }) : t2.store.render(), e2;
          }, e2.changeMode = function(n3, o2) {
            return void 0 === o2 && (o2 = {}), n3 === j.SIMPLE_SELECT && e2.getMode() === j.SIMPLE_SELECT ? (r2 = o2.featureIds || [], i2 = t2.store.getSelectedIds(), r2.length === i2.length && JSON.stringify(r2.map(function(t3) {
              return t3;
            }).sort()) === JSON.stringify(i2.map(function(t3) {
              return t3;
            }).sort()) || (t2.store.setSelected(o2.featureIds, { silent: true }), t2.store.render()), e2) : (n3 === j.DIRECT_SELECT && e2.getMode() === j.DIRECT_SELECT && o2.featureId === t2.store.getSelectedIds()[0] || t2.events.changeMode(n3, o2, { silent: true }), e2);
            var r2, i2;
          }, e2.getMode = function() {
            return t2.events.getMode();
          }, e2.trash = function() {
            return t2.events.trash({ silent: true }), e2;
          }, e2.combineFeatures = function() {
            return t2.events.combineFeatures({ silent: true }), e2;
          }, e2.uncombineFeatures = function() {
            return t2.events.uncombineFeatures({ silent: true }), e2;
          }, e2.setFeatureProperty = function(n3, o2, r2) {
            return t2.store.setFeatureProperty(n3, o2, r2), e2;
          }, e2;
        }
        var be = function(t2, e2) {
          var n3 = { options: t2 = function(t3) {
            void 0 === t3 && (t3 = {});
            var e3 = Mt(t3);
            return t3.controls || (e3.controls = {}), false === t3.displayControlsDefault ? e3.controls = Mt(he, t3.controls) : e3.controls = Mt(fe, t3.controls), (e3 = Mt(pe, e3)).styles = ge(e3.styles, "cold").concat(ge(e3.styles, "hot")), e3;
          }(t2) };
          e2 = me(n3, e2), n3.api = e2;
          var o2 = Lt(n3);
          return e2.onAdd = o2.onAdd, e2.onRemove = o2.onRemove, e2.types = E, e2.options = t2, e2;
        };
        function _e(t2) {
          be(t2, this);
        }
        return _e.modes = de, _e;
      });
    }
  });

  // node_modules/@mapbox/geojson-normalize/index.js
  var require_geojson_normalize = __commonJS({
    "node_modules/@mapbox/geojson-normalize/index.js"(exports, module) {
      module.exports = normalize;
      var types2 = {
        Point: "geometry",
        MultiPoint: "geometry",
        LineString: "geometry",
        MultiLineString: "geometry",
        Polygon: "geometry",
        MultiPolygon: "geometry",
        GeometryCollection: "geometry",
        Feature: "feature",
        FeatureCollection: "featurecollection"
      };
      function normalize(gj) {
        if (!gj || !gj.type) return null;
        var type = types2[gj.type];
        if (!type) return null;
        if (type === "geometry") {
          return {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: {},
              geometry: gj
            }]
          };
        } else if (type === "feature") {
          return {
            type: "FeatureCollection",
            features: [gj]
          };
        } else if (type === "featurecollection") {
          return gj;
        }
      }
    }
  });

  // node_modules/geojson-flatten/dist/index.js
  var require_dist = __commonJS({
    "node_modules/geojson-flatten/dist/index.js"(exports, module) {
      module.exports = function e(t) {
        switch (t && t.type || null) {
          case "FeatureCollection":
            return t.features = t.features.reduce(function(t2, r) {
              return t2.concat(e(r));
            }, []), t;
          case "Feature":
            return t.geometry ? e(t.geometry).map(function(e2) {
              var r = { type: "Feature", properties: JSON.parse(JSON.stringify(t.properties)), geometry: e2 };
              return void 0 !== t.id && (r.id = t.id), r;
            }) : [t];
          case "MultiPoint":
            return t.coordinates.map(function(e2) {
              return { type: "Point", coordinates: e2 };
            });
          case "MultiPolygon":
            return t.coordinates.map(function(e2) {
              return { type: "Polygon", coordinates: e2 };
            });
          case "MultiLineString":
            return t.coordinates.map(function(e2) {
              return { type: "LineString", coordinates: e2 };
            });
          case "GeometryCollection":
            return t.geometries.map(e).reduce(function(e2, t2) {
              return e2.concat(t2);
            }, []);
          case "Point":
          case "Polygon":
          case "LineString":
            return [t];
        }
      };
    }
  });

  // node_modules/@mapbox/geojson-coords/flatten.js
  var require_flatten = __commonJS({
    "node_modules/@mapbox/geojson-coords/flatten.js"(exports, module) {
      module.exports = function flatten2(list) {
        return _flatten(list);
        function _flatten(list2) {
          if (Array.isArray(list2) && list2.length && typeof list2[0] === "number") {
            return [list2];
          }
          return list2.reduce(function(acc, item) {
            if (Array.isArray(item) && Array.isArray(item[0])) {
              return acc.concat(_flatten(item));
            } else {
              acc.push(item);
              return acc;
            }
          }, []);
        }
      };
    }
  });

  // node_modules/@mapbox/geojson-coords/index.js
  var require_geojson_coords = __commonJS({
    "node_modules/@mapbox/geojson-coords/index.js"(exports, module) {
      var geojsonNormalize = require_geojson_normalize();
      var geojsonFlatten = require_dist();
      var flatten2 = require_flatten();
      if (!(geojsonFlatten instanceof Function)) geojsonFlatten = geojsonFlatten.default;
      module.exports = function(_) {
        if (!_) return [];
        var normalized = geojsonFlatten(geojsonNormalize(_)), coordinates = [];
        normalized.features.forEach(function(feature) {
          if (!feature.geometry) return;
          coordinates = coordinates.concat(flatten2(feature.geometry.coordinates));
        });
        return coordinates;
      };
    }
  });

  // node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "node_modules/is-callable/index.js"(exports, module) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_) {
          if (_ !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "node_modules/for-each/index.js"(exports, module) {
      "use strict";
      var isCallable = require_is_callable();
      var toStr = Object.prototype.toString;
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty2.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k in object) {
          if (hasOwnProperty2.call(object, k)) {
            if (receiver == null) {
              iterator(object[k], k, object);
            } else {
              iterator.call(receiver, object[k], k, object);
            }
          }
        }
      };
      var forEach = function forEach2(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (toStr.call(list) === "[object Array]") {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
      module.exports = forEach;
    }
  });

  // node_modules/possible-typed-array-names/index.js
  var require_possible_typed_array_names = __commonJS({
    "node_modules/possible-typed-array-names/index.js"(exports, module) {
      "use strict";
      module.exports = [
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
    }
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "node_modules/available-typed-arrays/index.js"(exports, module) {
      "use strict";
      var possibleNames = require_possible_typed_array_names();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      module.exports = function availableTypedArrays() {
        var out = [];
        for (var i = 0; i < possibleNames.length; i++) {
          if (typeof g[possibleNames[i]] === "function") {
            out[out.length] = possibleNames[i];
          }
        }
        return out;
      };
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max2 = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max2(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports, module) {
      "use strict";
      module.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports, module) {
      "use strict";
      module.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports, module) {
      "use strict";
      module.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports, module) {
      "use strict";
      module.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports, module) {
      "use strict";
      module.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports, module) {
      "use strict";
      module.exports = TypeError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports, module) {
      "use strict";
      module.exports = URIError;
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (sym in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/has-proto/index.js
  var require_has_proto = __commonJS({
    "node_modules/has-proto/index.js"(exports, module) {
      "use strict";
      var test = {
        __proto__: null,
        foo: {}
      };
      var $Object = Object;
      module.exports = function hasProto() {
        return { __proto__: test }.foo === test.foo && !(test instanceof $Object);
      };
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports, module) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = Object.getOwnPropertyDescriptor;
      if ($gOPD) {
        try {
          $gOPD({}, "");
        } catch (e) {
          $gOPD = null;
        }
      }
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var hasProto = require_has_proto()();
      var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
        return x.__proto__;
      } : null);
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name28) {
        var value;
        if (name28 === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name28 === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name28 === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name28 === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name28 === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name28] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call(Function.call, Array.prototype.concat);
      var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
      var $replace = bind.call(Function.call, String.prototype.replace);
      var $strSlice = bind.call(Function.call, String.prototype.slice);
      var $exec = bind.call(Function.call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number2, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number2 || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name28, allowMissing) {
        var intrinsicName = name28;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name28 + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name28 + " does not exist!");
      };
      module.exports = function GetIntrinsic(name28, allowMissing) {
        if (typeof name28 !== "string" || name28.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name28) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name28);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name28 + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true) || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }
  });

  // node_modules/define-data-property/index.js
  var require_define_data_property = __commonJS({
    "node_modules/define-data-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var gopd = require_gopd();
      module.exports = function defineDataProperty(obj, property, value) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new $TypeError("`obj` must be an object or a function`");
        }
        if (typeof property !== "string" && typeof property !== "symbol") {
          throw new $TypeError("`property` must be a string or a symbol`");
        }
        if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
          throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
          throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
          throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("`loose`, if provided, must be a boolean");
        }
        var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
        var nonWritable = arguments.length > 4 ? arguments[4] : null;
        var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
        var loose = arguments.length > 6 ? arguments[6] : false;
        var desc = !!gopd && gopd(obj, property);
        if ($defineProperty) {
          $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
          });
        } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
          obj[property] = value;
        } else {
          throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
        }
      };
    }
  });

  // node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "node_modules/has-property-descriptors/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        return !!$defineProperty;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!$defineProperty) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e) {
          return true;
        }
      };
      module.exports = hasPropertyDescriptors;
    }
  });

  // node_modules/set-function-length/index.js
  var require_set_function_length = __commonJS({
    "node_modules/set-function-length/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var define2 = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var gOPD = require_gopd();
      var $TypeError = require_type();
      var $floor = GetIntrinsic("%Math.floor%");
      module.exports = function setFunctionLength(fn, length) {
        if (typeof fn !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
          throw new $TypeError("`length` must be a positive 32-bit integer");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        var functionLengthIsConfigurable = true;
        var functionLengthIsWritable = true;
        if ("length" in fn && gOPD) {
          var desc = gOPD(fn, "length");
          if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
          }
          if (desc && !desc.writable) {
            functionLengthIsWritable = false;
          }
        }
        if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
          if (hasDescriptors) {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length,
              true,
              true
            );
          } else {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length
            );
          }
        }
        return fn;
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var GetIntrinsic = require_get_intrinsic();
      var setFunctionLength = require_set_function_length();
      var $TypeError = require_type();
      var $apply = GetIntrinsic("%Function.prototype.apply%");
      var $call = GetIntrinsic("%Function.prototype.call%");
      var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
      var $defineProperty = require_es_define_property();
      var $max = GetIntrinsic("%Math.max%");
      module.exports = function callBind(originalFunction) {
        if (typeof originalFunction !== "function") {
          throw new $TypeError("a function is required");
        }
        var func = $reflectApply(bind, $call, arguments);
        return setFunctionLength(
          func,
          1 + $max(0, originalFunction.length - (arguments.length - 1)),
          true
        );
      };
      var applyBind = function applyBind2() {
        return $reflectApply(bind, $apply, arguments);
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module.exports = function callBoundIntrinsic(name28, allowMissing) {
        var intrinsic = GetIntrinsic(name28, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name28, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js"(exports, module) {
      "use strict";
      var hasSymbols = require_shams();
      module.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "node_modules/which-typed-array/index.js"(exports, module) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBind = require_call_bind();
      var callBound = require_callBound();
      var gOPD = require_gopd();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var getPrototypeOf = Object.getPrototypeOf;
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      };
      var cache = { __proto__: null };
      if (hasToStringTag && gOPD && getPrototypeOf) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          if (Symbol.toStringTag in arr) {
            var proto = getPrototypeOf(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor) {
              var superProto = getPrototypeOf(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            cache["$" + typedArray] = callBind(descriptor.get);
          }
        });
      } else {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          var fn = arr.slice || arr.set;
          if (fn) {
            cache["$" + typedArray] = callBind(fn);
          }
        });
      }
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var found = false;
        forEach(
          // eslint-disable-next-line no-extra-parens
          /** @type {Record<`\$${TypedArrayName}`, Getter>} */
          /** @type {any} */
          cache,
          /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, typedArray) {
            if (!found) {
              try {
                if ("$" + getter(value) === typedArray) {
                  found = $slice(typedArray, 1);
                }
              } catch (e) {
              }
            }
          }
        );
        return found;
      };
      var trySlices = function tryAllSlices(value) {
        var found = false;
        forEach(
          // eslint-disable-next-line no-extra-parens
          /** @type {Record<`\$${TypedArrayName}`, Getter>} */
          /** @type {any} */
          cache,
          /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, name28) {
            if (!found) {
              try {
                getter(value);
                found = $slice(name28, 1);
              } catch (e) {
              }
            }
          }
        );
        return found;
      };
      module.exports = function whichTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag) {
          var tag2 = $slice($toString(value), 8, -1);
          if ($indexOf(typedArrays, tag2) > -1) {
            return tag2;
          }
          if (tag2 !== "Object") {
            return false;
          }
          return trySlices(value);
        }
        if (!gOPD) {
          return null;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // node_modules/object-keys/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/object-keys/isArguments.js"(exports, module) {
      "use strict";
      var toStr = Object.prototype.toString;
      module.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === "[object Arguments]";
        if (!isArgs) {
          isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
        }
        return isArgs;
      };
    }
  });

  // node_modules/object-keys/implementation.js
  var require_implementation2 = __commonJS({
    "node_modules/object-keys/implementation.js"(exports, module) {
      "use strict";
      var keysShim;
      if (!Object.keys) {
        has = Object.prototype.hasOwnProperty;
        toStr = Object.prototype.toString;
        isArgs = require_isArguments();
        isEnumerable = Object.prototype.propertyIsEnumerable;
        hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
        hasProtoEnumBug = isEnumerable.call(function() {
        }, "prototype");
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ];
        equalsConstructorPrototype = function(o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        hasAutomationEqualityBug = function() {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k in window) {
            try {
              if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }();
        equalsConstructorPrototypeIfNotBuggy = function(o) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject2 = object !== null && typeof object === "object";
          var isFunction2 = toStr.call(object) === "[object Function]";
          var isArguments = isArgs(object);
          var isString2 = isObject2 && toStr.call(object) === "[object String]";
          var theKeys = [];
          if (!isObject2 && !isFunction2 && !isArguments) {
            throw new TypeError("Object.keys called on a non-object");
          }
          var skipProto = hasProtoEnumBug && isFunction2;
          if (isString2 && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name28 in object) {
              if (!(skipProto && name28 === "prototype") && has.call(object, name28)) {
                theKeys.push(String(name28));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
      }
      var has;
      var toStr;
      var isArgs;
      var isEnumerable;
      var hasDontEnumBug;
      var hasProtoEnumBug;
      var dontEnums;
      var equalsConstructorPrototype;
      var excludedKeys;
      var hasAutomationEqualityBug;
      var equalsConstructorPrototypeIfNotBuggy;
      module.exports = keysShim;
    }
  });

  // node_modules/object-keys/index.js
  var require_object_keys = __commonJS({
    "node_modules/object-keys/index.js"(exports, module) {
      "use strict";
      var slice = Array.prototype.slice;
      var isArgs = require_isArguments();
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o) {
        return origKeys(o);
      } : require_implementation2();
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = function() {
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module.exports = keysShim;
    }
  });

  // node_modules/define-properties/index.js
  var require_define_properties = __commonJS({
    "node_modules/define-properties/index.js"(exports, module) {
      "use strict";
      var keys = require_object_keys();
      var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      var toStr = Object.prototype.toString;
      var concat = Array.prototype.concat;
      var defineDataProperty = require_define_data_property();
      var isFunction2 = function(fn) {
        return typeof fn === "function" && toStr.call(fn) === "[object Function]";
      };
      var supportsDescriptors = require_has_property_descriptors()();
      var defineProperty = function(object, name28, value, predicate) {
        if (name28 in object) {
          if (predicate === true) {
            if (object[name28] === value) {
              return;
            }
          } else if (!isFunction2(predicate) || !predicate()) {
            return;
          }
        }
        if (supportsDescriptors) {
          defineDataProperty(object, name28, value, true);
        } else {
          defineDataProperty(object, name28, value);
        }
      };
      var defineProperties = function(object, map) {
        var predicates = arguments.length > 2 ? arguments[2] : {};
        var props = keys(map);
        if (hasSymbols) {
          props = concat.call(props, Object.getOwnPropertySymbols(map));
        }
        for (var i = 0; i < props.length; i += 1) {
          defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
        }
      };
      defineProperties.supportsDescriptors = !!supportsDescriptors;
      module.exports = defineProperties;
    }
  });

  // (disabled):node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):node_modules/object-inspect/util.inspect"() {
    }
  });

  // node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "node_modules/object-inspect/index.js"(exports, module) {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      module.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray2(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp2(obj)) {
          var name28 = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name28 ? ": " + name28 : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray2(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap2(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key) {
              mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber2(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean2(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString2(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (typeof window !== "undefined" && obj === window) {
          return "{ [object Window] }";
        }
        if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
          return "{ [object globalThis] }";
        }
        if (!isDate2(obj) && !isRegExp2(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag2 = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag2 + "{}";
          }
          if (indent) {
            return tag2 + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag2 + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function isArray2(obj) {
        return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isDate2(obj) {
        return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isRegExp2(obj) {
        return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isString2(obj) {
        return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isNumber2(obj) {
        return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isBoolean2(obj) {
        return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap2(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray2(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key in obj) {
          if (!has(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // node_modules/es-abstract/2024/IsPropertyKey.js
  var require_IsPropertyKey = __commonJS({
    "node_modules/es-abstract/2024/IsPropertyKey.js"(exports, module) {
      "use strict";
      module.exports = function IsPropertyKey(argument) {
        return typeof argument === "string" || typeof argument === "symbol";
      };
    }
  });

  // node_modules/es-abstract/5/Type.js
  var require_Type = __commonJS({
    "node_modules/es-abstract/5/Type.js"(exports, module) {
      "use strict";
      module.exports = function Type(x) {
        if (x === null) {
          return "Null";
        }
        if (typeof x === "undefined") {
          return "Undefined";
        }
        if (typeof x === "function" || typeof x === "object") {
          return "Object";
        }
        if (typeof x === "number") {
          return "Number";
        }
        if (typeof x === "boolean") {
          return "Boolean";
        }
        if (typeof x === "string") {
          return "String";
        }
      };
    }
  });

  // node_modules/es-abstract/2024/Type.js
  var require_Type2 = __commonJS({
    "node_modules/es-abstract/2024/Type.js"(exports, module) {
      "use strict";
      var ES5Type = require_Type();
      module.exports = function Type(x) {
        if (typeof x === "symbol") {
          return "Symbol";
        }
        if (typeof x === "bigint") {
          return "BigInt";
        }
        return ES5Type(x);
      };
    }
  });

  // node_modules/es-abstract/2024/Get.js
  var require_Get = __commonJS({
    "node_modules/es-abstract/2024/Get.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var inspect = require_object_inspect();
      var IsPropertyKey = require_IsPropertyKey();
      var Type = require_Type2();
      module.exports = function Get(O, P3) {
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: Type(O) is not Object");
        }
        if (!IsPropertyKey(P3)) {
          throw new $TypeError("Assertion failed: IsPropertyKey(P) is not true, got " + inspect(P3));
        }
        return O[P3];
      };
    }
  });

  // node_modules/es-abstract/helpers/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/es-abstract/helpers/isNaN.js"(exports, module) {
      "use strict";
      module.exports = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
    }
  });

  // node_modules/es-abstract/helpers/isFinite.js
  var require_isFinite = __commonJS({
    "node_modules/es-abstract/helpers/isFinite.js"(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function(x) {
        return (typeof x === "number" || typeof x === "bigint") && !$isNaN(x) && x !== Infinity && x !== -Infinity;
      };
    }
  });

  // node_modules/es-abstract/helpers/isInteger.js
  var require_isInteger = __commonJS({
    "node_modules/es-abstract/helpers/isInteger.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $abs = GetIntrinsic("%Math.abs%");
      var $floor = GetIntrinsic("%Math.floor%");
      var $isNaN = require_isNaN();
      var $isFinite = require_isFinite();
      module.exports = function isInteger2(argument) {
        if (typeof argument !== "number" || $isNaN(argument) || !$isFinite(argument)) {
          return false;
        }
        var absValue = $abs(argument);
        return $floor(absValue) === absValue;
      };
    }
  });

  // node_modules/is-array-buffer/index.js
  var require_is_array_buffer = __commonJS({
    "node_modules/is-array-buffer/index.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind();
      var callBound = require_callBound();
      var GetIntrinsic = require_get_intrinsic();
      var $ArrayBuffer = GetIntrinsic("%ArrayBuffer%", true);
      var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
      var $toString = callBound("Object.prototype.toString");
      var abSlice = !!$ArrayBuffer && !$byteLength && new $ArrayBuffer(0).slice;
      var $abSlice = !!abSlice && callBind(abSlice);
      module.exports = $byteLength || $abSlice ? function isArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          if ($byteLength) {
            $byteLength(obj);
          } else {
            $abSlice(obj, 0);
          }
          return true;
        } catch (e) {
          return false;
        }
      } : $ArrayBuffer ? function isArrayBuffer(obj) {
        return $toString(obj) === "[object ArrayBuffer]";
      } : function isArrayBuffer(obj) {
        return false;
      };
    }
  });

  // node_modules/array-buffer-byte-length/index.js
  var require_array_buffer_byte_length = __commonJS({
    "node_modules/array-buffer-byte-length/index.js"(exports, module) {
      "use strict";
      var callBound = require_callBound();
      var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
      var isArrayBuffer = require_is_array_buffer();
      module.exports = function byteLength(ab) {
        if (!isArrayBuffer(ab)) {
          return NaN;
        }
        return $byteLength ? $byteLength(ab) : ab.byteLength;
      };
    }
  });

  // node_modules/is-shared-array-buffer/index.js
  var require_is_shared_array_buffer = __commonJS({
    "node_modules/is-shared-array-buffer/index.js"(exports, module) {
      "use strict";
      var callBound = require_callBound();
      var $byteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      module.exports = $byteLength ? function isSharedArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          $byteLength(obj);
          return true;
        } catch (e) {
          return false;
        }
      } : function isSharedArrayBuffer(obj) {
        return false;
      };
    }
  });

  // node_modules/es-abstract/2024/IsDetachedBuffer.js
  var require_IsDetachedBuffer = __commonJS({
    "node_modules/es-abstract/2024/IsDetachedBuffer.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var $byteLength = require_array_buffer_byte_length();
      var availableTypedArrays = require_available_typed_arrays()();
      var callBound = require_callBound();
      var isArrayBuffer = require_is_array_buffer();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var $sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      module.exports = function IsDetachedBuffer(arrayBuffer) {
        var isSAB = isSharedArrayBuffer(arrayBuffer);
        if (!isArrayBuffer(arrayBuffer) && !isSAB) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must be an Object with an [[ArrayBufferData]] internal slot");
        }
        if ((isSAB ? $sabByteLength : $byteLength)(arrayBuffer) === 0) {
          try {
            new global[availableTypedArrays[0]](arrayBuffer);
          } catch (error) {
            return !!error && error.name === "TypeError";
          }
        }
        return false;
      };
    }
  });

  // node_modules/es-abstract/2024/HasOwnProperty.js
  var require_HasOwnProperty = __commonJS({
    "node_modules/es-abstract/2024/HasOwnProperty.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var hasOwn = require_hasown();
      var IsPropertyKey = require_IsPropertyKey();
      var Type = require_Type2();
      module.exports = function HasOwnProperty(O, P3) {
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: `O` must be an Object");
        }
        if (!IsPropertyKey(P3)) {
          throw new $TypeError("Assertion failed: `P` must be a Property Key");
        }
        return hasOwn(O, P3);
      };
    }
  });

  // node_modules/es-abstract/helpers/IsArray.js
  var require_IsArray = __commonJS({
    "node_modules/es-abstract/helpers/IsArray.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $Array = GetIntrinsic("%Array%");
      var toStr = !$Array.isArray && require_callBound()("Object.prototype.toString");
      module.exports = $Array.isArray || function IsArray(argument) {
        return toStr(argument) === "[object Array]";
      };
    }
  });

  // node_modules/es-abstract/2024/IsArray.js
  var require_IsArray2 = __commonJS({
    "node_modules/es-abstract/2024/IsArray.js"(exports, module) {
      "use strict";
      module.exports = require_IsArray();
    }
  });

  // node_modules/es-abstract/2024/IsBigIntElementType.js
  var require_IsBigIntElementType = __commonJS({
    "node_modules/es-abstract/2024/IsBigIntElementType.js"(exports, module) {
      "use strict";
      module.exports = function IsBigIntElementType(type) {
        return type === "BIGUINT64" || type === "BIGINT64";
      };
    }
  });

  // node_modules/es-abstract/2024/IsUnsignedElementType.js
  var require_IsUnsignedElementType = __commonJS({
    "node_modules/es-abstract/2024/IsUnsignedElementType.js"(exports, module) {
      "use strict";
      module.exports = function IsUnsignedElementType(type) {
        return type === "UINT8" || type === "UINT8C" || type === "UINT16" || type === "UINT32" || type === "BIGUINT64";
      };
    }
  });

  // node_modules/es-abstract/helpers/bytesAsFloat32.js
  var require_bytesAsFloat32 = __commonJS({
    "node_modules/es-abstract/helpers/bytesAsFloat32.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $pow = GetIntrinsic("%Math.pow%");
      module.exports = function bytesAsFloat32(rawBytes) {
        var sign3 = rawBytes[3] & 128 ? -1 : 1;
        var exponent = (rawBytes[3] & 127) << 1 | rawBytes[2] >> 7;
        var mantissa = (rawBytes[2] & 127) << 16 | rawBytes[1] << 8 | rawBytes[0];
        if (exponent === 0 && mantissa === 0) {
          return sign3 === 1 ? 0 : -0;
        }
        if (exponent === 255 && mantissa === 0) {
          return sign3 === 1 ? Infinity : -Infinity;
        }
        if (exponent === 255 && mantissa !== 0) {
          return NaN;
        }
        exponent -= 127;
        if (exponent === -127) {
          return sign3 * mantissa * $pow(2, -126 - 23);
        }
        return sign3 * (1 + mantissa * $pow(2, -23)) * $pow(2, exponent);
      };
    }
  });

  // node_modules/es-abstract/helpers/bytesAsFloat64.js
  var require_bytesAsFloat64 = __commonJS({
    "node_modules/es-abstract/helpers/bytesAsFloat64.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $pow = GetIntrinsic("%Math.pow%");
      module.exports = function bytesAsFloat64(rawBytes) {
        var sign3 = rawBytes[7] & 128 ? -1 : 1;
        var exponent = (rawBytes[7] & 127) << 4 | (rawBytes[6] & 240) >> 4;
        var mantissa = (rawBytes[6] & 15) * 281474976710656 + rawBytes[5] * 1099511627776 + rawBytes[4] * 4294967296 + rawBytes[3] * 16777216 + rawBytes[2] * 65536 + rawBytes[1] * 256 + rawBytes[0];
        if (exponent === 0 && mantissa === 0) {
          return sign3 * 0;
        }
        if (exponent === 2047 && mantissa !== 0) {
          return NaN;
        }
        if (exponent === 2047 && mantissa === 0) {
          return sign3 * Infinity;
        }
        exponent -= 1023;
        if (exponent === -1023) {
          return sign3 * mantissa * 5e-324;
        }
        return sign3 * (1 + mantissa / 4503599627370496) * $pow(2, exponent);
      };
    }
  });

  // node_modules/es-abstract/helpers/bytesAsInteger.js
  var require_bytesAsInteger = __commonJS({
    "node_modules/es-abstract/helpers/bytesAsInteger.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $pow = GetIntrinsic("%Math.pow%");
      var $Number = GetIntrinsic("%Number%");
      var $BigInt = GetIntrinsic("%BigInt%", true);
      module.exports = function bytesAsInteger(rawBytes, elementSize, isUnsigned, isBigInt) {
        var Z = isBigInt ? $BigInt : $Number;
        var intValue = Z(0);
        for (var i = 0; i < rawBytes.length; i++) {
          intValue += Z(rawBytes[i] * $pow(2, 8 * i));
        }
        if (!isUnsigned) {
          var bitLength = elementSize * 8;
          if (rawBytes[elementSize - 1] & 128) {
            intValue -= Z($pow(2, bitLength));
          }
        }
        return intValue;
      };
    }
  });

  // node_modules/es-abstract/helpers/every.js
  var require_every = __commonJS({
    "node_modules/es-abstract/helpers/every.js"(exports, module) {
      "use strict";
      module.exports = function every(array, predicate) {
        for (var i = 0; i < array.length; i += 1) {
          if (!predicate(array[i], i, array)) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/es-abstract/helpers/isByteValue.js
  var require_isByteValue = __commonJS({
    "node_modules/es-abstract/helpers/isByteValue.js"(exports, module) {
      "use strict";
      module.exports = function isByteValue(value) {
        return typeof value === "number" && value >= 0 && value <= 255 && (value | 0) === value;
      };
    }
  });

  // node_modules/es-abstract/2024/RawBytesToNumeric.js
  var require_RawBytesToNumeric = __commonJS({
    "node_modules/es-abstract/2024/RawBytesToNumeric.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_callBound();
      var $RangeError = require_range();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var hasOwnProperty2 = require_HasOwnProperty();
      var IsArray = require_IsArray2();
      var IsBigIntElementType = require_IsBigIntElementType();
      var IsUnsignedElementType = require_IsUnsignedElementType();
      var bytesAsFloat32 = require_bytesAsFloat32();
      var bytesAsFloat64 = require_bytesAsFloat64();
      var bytesAsInteger = require_bytesAsInteger();
      var every = require_every();
      var isByteValue = require_isByteValue();
      var $reverse = callBound("Array.prototype.reverse");
      var $slice = callBound("Array.prototype.slice");
      var keys = require_object_keys();
      var TypeToSizes = {
        __proto__: null,
        INT8: 1,
        UINT8: 1,
        UINT8C: 1,
        INT16: 2,
        UINT16: 2,
        INT32: 4,
        UINT32: 4,
        BIGINT64: 8,
        BIGUINT64: 8,
        FLOAT32: 4,
        FLOAT64: 8
      };
      module.exports = function RawBytesToNumeric(type, rawBytes, isLittleEndian) {
        if (!hasOwnProperty2(TypeToSizes, type)) {
          throw new $TypeError("Assertion failed: `type` must be a TypedArray element type: " + keys(TypeToSizes));
        }
        if (!IsArray(rawBytes) || !every(rawBytes, isByteValue)) {
          throw new $TypeError("Assertion failed: `rawBytes` must be an Array of bytes");
        }
        if (typeof isLittleEndian !== "boolean") {
          throw new $TypeError("Assertion failed: `isLittleEndian` must be a Boolean");
        }
        var elementSize = TypeToSizes[type];
        if (rawBytes.length !== elementSize) {
          throw new $RangeError("Assertion failed: `rawBytes` must have a length of " + elementSize + " for type " + type);
        }
        var isBigInt = IsBigIntElementType(type);
        if (isBigInt && !$BigInt) {
          throw new $SyntaxError("this environment does not support BigInts");
        }
        rawBytes = $slice(rawBytes, 0, elementSize);
        if (!isLittleEndian) {
          $reverse(rawBytes);
        }
        if (type === "FLOAT32") {
          return bytesAsFloat32(rawBytes);
        }
        if (type === "FLOAT64") {
          return bytesAsFloat64(rawBytes);
        }
        return bytesAsInteger(rawBytes, elementSize, IsUnsignedElementType(type), isBigInt);
      };
    }
  });

  // node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "node_modules/isarray/index.js"(exports, module) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // node_modules/safe-array-concat/index.js
  var require_safe_array_concat = __commonJS({
    "node_modules/safe-array-concat/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $concat = GetIntrinsic("%Array.prototype.concat%");
      var callBind = require_call_bind();
      var callBound = require_callBound();
      var $slice = callBound("Array.prototype.slice");
      var hasSymbols = require_shams()();
      var isConcatSpreadable = hasSymbols && Symbol.isConcatSpreadable;
      var empty = [];
      var $concatApply = isConcatSpreadable ? callBind.apply($concat, empty) : null;
      var isArray2 = isConcatSpreadable ? (
        /** @type {(value: unknown) => value is unknown[]} */
        require_isarray()
      ) : null;
      module.exports = isConcatSpreadable ? function safeArrayConcat(item) {
        for (var i = 0; i < arguments.length; i += 1) {
          var arg = arguments[i];
          if (arg && typeof arg === "object" && typeof arg[isConcatSpreadable] === "boolean") {
            if (!empty[isConcatSpreadable]) {
              empty[isConcatSpreadable] = true;
            }
            var arr = isArray2(arg) ? $slice(arg) : [arg];
            arr[isConcatSpreadable] = true;
            arguments[i] = arr;
          }
        }
        return $concatApply(arguments);
      } : callBind($concat, empty);
    }
  });

  // node_modules/es-abstract/2024/tables/typed-array-objects.js
  var require_typed_array_objects = __commonJS({
    "node_modules/es-abstract/2024/tables/typed-array-objects.js"(exports, module) {
      "use strict";
      module.exports = {
        __proto__: null,
        name: {
          __proto__: null,
          $Int8Array: "INT8",
          $Uint8Array: "UINT8",
          $Uint8ClampedArray: "UINT8C",
          $Int16Array: "INT16",
          $Uint16Array: "UINT16",
          $Int32Array: "INT32",
          $Uint32Array: "UINT32",
          $BigInt64Array: "BIGINT64",
          $BigUint64Array: "BIGUINT64",
          $Float32Array: "FLOAT32",
          $Float64Array: "FLOAT64"
        },
        size: {
          __proto__: null,
          $INT8: 1,
          $UINT8: 1,
          $UINT8C: 1,
          $INT16: 2,
          $UINT16: 2,
          $INT32: 4,
          $UINT32: 4,
          $BIGINT64: 8,
          $BIGUINT64: 8,
          $FLOAT32: 4,
          $FLOAT64: 8
        }
      };
    }
  });

  // node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS({
    "node_modules/is-typed-array/index.js"(exports, module) {
      "use strict";
      var whichTypedArray = require_which_typed_array();
      module.exports = function isTypedArray(value) {
        return !!whichTypedArray(value);
      };
    }
  });

  // node_modules/typed-array-buffer/index.js
  var require_typed_array_buffer = __commonJS({
    "node_modules/typed-array-buffer/index.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var callBound = require_callBound();
      var $typedArrayBuffer = callBound("TypedArray.prototype.buffer", true);
      var isTypedArray = require_is_typed_array();
      module.exports = $typedArrayBuffer || function typedArrayBuffer(x) {
        if (!isTypedArray(x)) {
          throw new $TypeError("Not a Typed Array");
        }
        return x.buffer;
      };
    }
  });

  // node_modules/es-abstract/helpers/defaultEndianness.js
  var require_defaultEndianness = __commonJS({
    "node_modules/es-abstract/helpers/defaultEndianness.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $Uint8Array = GetIntrinsic("%Uint8Array%", true);
      var $Uint32Array = GetIntrinsic("%Uint32Array%", true);
      var typedArrayBuffer = require_typed_array_buffer();
      var uInt32 = $Uint32Array && new $Uint32Array([305419896]);
      var uInt8 = uInt32 && new $Uint8Array(typedArrayBuffer(uInt32));
      module.exports = uInt8 ? uInt8[0] === 120 ? "little" : uInt8[0] === 18 ? "big" : uInt8[0] === 52 ? "mixed" : "unknown" : "indeterminate";
    }
  });

  // node_modules/es-abstract/2024/GetValueFromBuffer.js
  var require_GetValueFromBuffer = __commonJS({
    "node_modules/es-abstract/2024/GetValueFromBuffer.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $Uint8Array = GetIntrinsic("%Uint8Array%", true);
      var callBound = require_callBound();
      var $slice = callBound("Array.prototype.slice");
      var isInteger2 = require_isInteger();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var RawBytesToNumeric = require_RawBytesToNumeric();
      var isArrayBuffer = require_is_array_buffer();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var safeConcat = require_safe_array_concat();
      var tableTAO = require_typed_array_objects();
      var defaultEndianness = require_defaultEndianness();
      module.exports = function GetValueFromBuffer(arrayBuffer, byteIndex, type, isTypedArray, order) {
        var isSAB = isSharedArrayBuffer(arrayBuffer);
        if (!isArrayBuffer(arrayBuffer) && !isSAB) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must be an ArrayBuffer or a SharedArrayBuffer");
        }
        if (!isInteger2(byteIndex)) {
          throw new $TypeError("Assertion failed: `byteIndex` must be an integer");
        }
        if (typeof type !== "string" || typeof tableTAO.size["$" + type] !== "number") {
          throw new $TypeError("Assertion failed: `type` must be a Typed Array element type");
        }
        if (typeof isTypedArray !== "boolean") {
          throw new $TypeError("Assertion failed: `isTypedArray` must be a boolean");
        }
        if (order !== "SEQ-CST" && order !== "UNORDERED") {
          throw new $TypeError("Assertion failed: `order` must be either `SEQ-CST` or `UNORDERED`");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean") {
          throw new $TypeError("Assertion failed: `isLittleEndian` must be a boolean, if present");
        }
        if (IsDetachedBuffer(arrayBuffer)) {
          throw new $TypeError("Assertion failed: `arrayBuffer` is detached");
        }
        if (byteIndex < 0) {
          throw new $TypeError("Assertion failed: `byteIndex` must be non-negative");
        }
        var elementSize = tableTAO.size["$" + type];
        if (!elementSize) {
          throw new $TypeError('Assertion failed: `type` must be one of "INT8", "UINT8", "UINT8C", "INT16", "UINT16", "INT32", "UINT32", "BIGINT64", "BIGUINT64", "FLOAT32", or "FLOAT64"');
        }
        var rawValue;
        if (isSAB) {
          throw new $SyntaxError("SharedArrayBuffer is not supported by this implementation");
        } else {
          rawValue = $slice(new $Uint8Array(arrayBuffer, byteIndex), 0, elementSize);
        }
        var isLittleEndian = arguments.length > 5 ? arguments[5] : defaultEndianness === "little";
        var bytes = isLittleEndian ? $slice(safeConcat([0, 0, 0, 0, 0, 0, 0, 0], rawValue), -elementSize) : $slice(safeConcat(rawValue, [0, 0, 0, 0, 0, 0, 0, 0]), 0, elementSize);
        return RawBytesToNumeric(type, bytes, isLittleEndian);
      };
    }
  });

  // node_modules/es-abstract/2024/max.js
  var require_max = __commonJS({
    "node_modules/es-abstract/2024/max.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      module.exports = GetIntrinsic("%Math.max%");
    }
  });

  // node_modules/es-abstract/2024/min.js
  var require_min = __commonJS({
    "node_modules/es-abstract/2024/min.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      module.exports = GetIntrinsic("%Math.min%");
    }
  });

  // node_modules/es-abstract/2024/SameValue.js
  var require_SameValue = __commonJS({
    "node_modules/es-abstract/2024/SameValue.js"(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function SameValue(x, y) {
        if (x === y) {
          if (x === 0) {
            return 1 / x === 1 / y;
          }
          return true;
        }
        return $isNaN(x) && $isNaN(y);
      };
    }
  });

  // node_modules/es-abstract/2024/Set.js
  var require_Set = __commonJS({
    "node_modules/es-abstract/2024/Set.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var IsPropertyKey = require_IsPropertyKey();
      var SameValue = require_SameValue();
      var Type = require_Type2();
      var noThrowOnStrictViolation = function() {
        try {
          delete [].length;
          return true;
        } catch (e) {
          return false;
        }
      }();
      module.exports = function Set2(O, P3, V, Throw) {
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: `O` must be an Object");
        }
        if (!IsPropertyKey(P3)) {
          throw new $TypeError("Assertion failed: `P` must be a Property Key");
        }
        if (typeof Throw !== "boolean") {
          throw new $TypeError("Assertion failed: `Throw` must be a Boolean");
        }
        if (Throw) {
          O[P3] = V;
          if (noThrowOnStrictViolation && !SameValue(O[P3], V)) {
            throw new $TypeError("Attempted to assign to readonly property.");
          }
          return true;
        }
        try {
          O[P3] = V;
          return noThrowOnStrictViolation ? SameValue(O[P3], V) : true;
        } catch (e) {
          return false;
        }
      };
    }
  });

  // node_modules/es-abstract/2024/StringToBigInt.js
  var require_StringToBigInt = __commonJS({
    "node_modules/es-abstract/2024/StringToBigInt.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var $TypeError = require_type();
      var $SyntaxError = require_syntax();
      module.exports = function StringToBigInt(argument) {
        if (typeof argument !== "string") {
          throw new $TypeError("`argument` must be a string");
        }
        if (!$BigInt) {
          throw new $SyntaxError("BigInts are not supported in this environment");
        }
        try {
          return $BigInt(argument);
        } catch (e) {
          return void 0;
        }
      };
    }
  });

  // node_modules/es-to-primitive/helpers/isPrimitive.js
  var require_isPrimitive = __commonJS({
    "node_modules/es-to-primitive/helpers/isPrimitive.js"(exports, module) {
      "use strict";
      module.exports = function isPrimitive(value) {
        return value === null || typeof value !== "function" && typeof value !== "object";
      };
    }
  });

  // node_modules/is-date-object/index.js
  var require_is_date_object = __commonJS({
    "node_modules/is-date-object/index.js"(exports, module) {
      "use strict";
      var getDay = Date.prototype.getDay;
      var tryDateObject = function tryDateGetDayCall(value) {
        try {
          getDay.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var dateClass = "[object Date]";
      var hasToStringTag = require_shams2()();
      module.exports = function isDateObject(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
      };
    }
  });

  // node_modules/is-symbol/index.js
  var require_is_symbol = __commonJS({
    "node_modules/is-symbol/index.js"(exports, module) {
      "use strict";
      var toStr = Object.prototype.toString;
      var hasSymbols = require_has_symbols()();
      if (hasSymbols) {
        symToStr = Symbol.prototype.toString;
        symStringRegex = /^Symbol\(.*\)$/;
        isSymbolObject = function isRealSymbolObject(value) {
          if (typeof value.valueOf() !== "symbol") {
            return false;
          }
          return symStringRegex.test(symToStr.call(value));
        };
        module.exports = function isSymbol(value) {
          if (typeof value === "symbol") {
            return true;
          }
          if (toStr.call(value) !== "[object Symbol]") {
            return false;
          }
          try {
            return isSymbolObject(value);
          } catch (e) {
            return false;
          }
        };
      } else {
        module.exports = function isSymbol(value) {
          return false;
        };
      }
      var symToStr;
      var symStringRegex;
      var isSymbolObject;
    }
  });

  // node_modules/es-to-primitive/es2015.js
  var require_es2015 = __commonJS({
    "node_modules/es-to-primitive/es2015.js"(exports, module) {
      "use strict";
      var hasSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "symbol";
      var isPrimitive = require_isPrimitive();
      var isCallable = require_is_callable();
      var isDate2 = require_is_date_object();
      var isSymbol = require_is_symbol();
      var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
        if (typeof O === "undefined" || O === null) {
          throw new TypeError("Cannot call method on " + O);
        }
        if (typeof hint !== "string" || hint !== "number" && hint !== "string") {
          throw new TypeError('hint must be "string" or "number"');
        }
        var methodNames = hint === "string" ? ["toString", "valueOf"] : ["valueOf", "toString"];
        var method, result, i;
        for (i = 0; i < methodNames.length; ++i) {
          method = O[methodNames[i]];
          if (isCallable(method)) {
            result = method.call(O);
            if (isPrimitive(result)) {
              return result;
            }
          }
        }
        throw new TypeError("No default value");
      };
      var GetMethod = function GetMethod2(O, P3) {
        var func = O[P3];
        if (func !== null && typeof func !== "undefined") {
          if (!isCallable(func)) {
            throw new TypeError(func + " returned for property " + P3 + " of object " + O + " is not a function");
          }
          return func;
        }
        return void 0;
      };
      module.exports = function ToPrimitive(input) {
        if (isPrimitive(input)) {
          return input;
        }
        var hint = "default";
        if (arguments.length > 1) {
          if (arguments[1] === String) {
            hint = "string";
          } else if (arguments[1] === Number) {
            hint = "number";
          }
        }
        var exoticToPrim;
        if (hasSymbols) {
          if (Symbol.toPrimitive) {
            exoticToPrim = GetMethod(input, Symbol.toPrimitive);
          } else if (isSymbol(input)) {
            exoticToPrim = Symbol.prototype.valueOf;
          }
        }
        if (typeof exoticToPrim !== "undefined") {
          var result = exoticToPrim.call(input, hint);
          if (isPrimitive(result)) {
            return result;
          }
          throw new TypeError("unable to convert exotic object to primitive");
        }
        if (hint === "default" && (isDate2(input) || isSymbol(input))) {
          hint = "string";
        }
        return ordinaryToPrimitive(input, hint === "default" ? "number" : hint);
      };
    }
  });

  // node_modules/es-abstract/2024/ToPrimitive.js
  var require_ToPrimitive = __commonJS({
    "node_modules/es-abstract/2024/ToPrimitive.js"(exports, module) {
      "use strict";
      var toPrimitive = require_es2015();
      module.exports = function ToPrimitive(input) {
        if (arguments.length > 1) {
          return toPrimitive(input, arguments[1]);
        }
        return toPrimitive(input);
      };
    }
  });

  // node_modules/es-abstract/2024/ToBigInt.js
  var require_ToBigInt = __commonJS({
    "node_modules/es-abstract/2024/ToBigInt.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var $Number = GetIntrinsic("%Number%");
      var $TypeError = require_type();
      var $SyntaxError = require_syntax();
      var StringToBigInt = require_StringToBigInt();
      var ToPrimitive = require_ToPrimitive();
      module.exports = function ToBigInt(argument) {
        if (!$BigInt) {
          throw new $SyntaxError("BigInts are not supported in this environment");
        }
        var prim = ToPrimitive(argument, $Number);
        if (prim == null) {
          throw new $TypeError("Cannot convert null or undefined to a BigInt");
        }
        if (typeof prim === "boolean") {
          return prim ? $BigInt(1) : $BigInt(0);
        }
        if (typeof prim === "number") {
          throw new $TypeError("Cannot convert a Number value to a BigInt");
        }
        if (typeof prim === "string") {
          var n = StringToBigInt(prim);
          if (typeof n === "undefined") {
            throw new $TypeError("Failed to parse String to BigInt");
          }
          return n;
        }
        if (typeof prim === "symbol") {
          throw new $TypeError("Cannot convert a Symbol value to a BigInt");
        }
        if (typeof prim !== "bigint") {
          throw new $SyntaxError("Assertion failed: unknown primitive type");
        }
        return prim;
      };
    }
  });

  // node_modules/es-abstract/2024/BigInt/remainder.js
  var require_remainder = __commonJS({
    "node_modules/es-abstract/2024/BigInt/remainder.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var $RangeError = require_range();
      var $TypeError = require_type();
      var zero = $BigInt && $BigInt(0);
      module.exports = function BigIntRemainder(n, d) {
        if (typeof n !== "bigint" || typeof d !== "bigint") {
          throw new $TypeError("Assertion failed: `n` and `d` arguments must be BigInts");
        }
        if (d === zero) {
          throw new $RangeError("Division by zero");
        }
        if (n === zero) {
          return zero;
        }
        return n % d;
      };
    }
  });

  // node_modules/es-abstract/helpers/modBigInt.js
  var require_modBigInt = __commonJS({
    "node_modules/es-abstract/helpers/modBigInt.js"(exports, module) {
      "use strict";
      module.exports = function bigIntMod(BigIntRemainder, bigint, modulo) {
        var remain = BigIntRemainder(bigint, modulo);
        return remain >= 0 ? remain : remain + modulo;
      };
    }
  });

  // node_modules/es-abstract/2024/ToBigInt64.js
  var require_ToBigInt64 = __commonJS({
    "node_modules/es-abstract/2024/ToBigInt64.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var $pow = GetIntrinsic("%Math.pow%");
      var ToBigInt = require_ToBigInt();
      var BigIntRemainder = require_remainder();
      var modBigInt = require_modBigInt();
      var twoSixtyThree = $BigInt && BigInt($pow(2, 32)) * BigInt($pow(2, 31));
      var twoSixtyFour = $BigInt && BigInt($pow(2, 32)) * BigInt($pow(2, 32));
      module.exports = function ToBigInt64(argument) {
        var n = ToBigInt(argument);
        var int64bit = modBigInt(BigIntRemainder, n, twoSixtyFour);
        return int64bit >= twoSixtyThree ? int64bit - twoSixtyFour : int64bit;
      };
    }
  });

  // node_modules/es-abstract/2024/ToBigUint64.js
  var require_ToBigUint64 = __commonJS({
    "node_modules/es-abstract/2024/ToBigUint64.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $BigInt = GetIntrinsic("%BigInt%", true);
      var $pow = GetIntrinsic("%Math.pow%");
      var ToBigInt = require_ToBigInt();
      var BigIntRemainder = require_remainder();
      var modBigInt = require_modBigInt();
      var twoSixtyFour = $BigInt && BigInt($pow(2, 32)) * BigInt($pow(2, 32));
      module.exports = function ToBigUint64(argument) {
        var n = ToBigInt(argument);
        var int64bit = modBigInt(BigIntRemainder, n, twoSixtyFour);
        return int64bit;
      };
    }
  });

  // node_modules/es-abstract/helpers/mod.js
  var require_mod = __commonJS({
    "node_modules/es-abstract/helpers/mod.js"(exports, module) {
      "use strict";
      var $floor = Math.floor;
      module.exports = function mod2(number2, modulo) {
        var remain = number2 % modulo;
        return $floor(remain >= 0 ? remain : remain + modulo);
      };
    }
  });

  // node_modules/es-abstract/2024/modulo.js
  var require_modulo = __commonJS({
    "node_modules/es-abstract/2024/modulo.js"(exports, module) {
      "use strict";
      var mod2 = require_mod();
      module.exports = function modulo(x, y) {
        return mod2(x, y);
      };
    }
  });

  // node_modules/es-abstract/helpers/isPrimitive.js
  var require_isPrimitive2 = __commonJS({
    "node_modules/es-abstract/helpers/isPrimitive.js"(exports, module) {
      "use strict";
      module.exports = function isPrimitive(value) {
        return value === null || typeof value !== "function" && typeof value !== "object";
      };
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js"(exports, module) {
      "use strict";
      var callBound = require_callBound();
      var hasToStringTag = require_shams2()();
      var has;
      var $exec;
      var isRegexMarker;
      var badStringifier;
      if (hasToStringTag) {
        has = callBound("Object.prototype.hasOwnProperty");
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
      }
      var throwRegexMarker;
      var $toString = callBound("Object.prototype.toString");
      var gOPD = Object.getOwnPropertyDescriptor;
      var regexClass = "[object RegExp]";
      module.exports = hasToStringTag ? function isRegex(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        var descriptor = gOPD(value, "lastIndex");
        var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
        if (!hasLastIndexDataProperty) {
          return false;
        }
        try {
          $exec(value, badStringifier);
        } catch (e) {
          return e === isRegexMarker;
        }
      } : function isRegex(value) {
        if (!value || typeof value !== "object" && typeof value !== "function") {
          return false;
        }
        return $toString(value) === regexClass;
      };
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js"(exports, module) {
      "use strict";
      var callBound = require_callBound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s) {
          return $exec(regex, s) !== null;
        };
      };
    }
  });

  // node_modules/es-object-atoms/RequireObjectCoercible.js
  var require_RequireObjectCoercible = __commonJS({
    "node_modules/es-object-atoms/RequireObjectCoercible.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      module.exports = function RequireObjectCoercible(value) {
        if (value == null) {
          throw new $TypeError(arguments.length > 0 && arguments[1] || "Cannot call method on " + value);
        }
        return value;
      };
    }
  });

  // node_modules/es-abstract/2024/ToString.js
  var require_ToString = __commonJS({
    "node_modules/es-abstract/2024/ToString.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $String = GetIntrinsic("%String%");
      var $TypeError = require_type();
      module.exports = function ToString(argument) {
        if (typeof argument === "symbol") {
          throw new $TypeError("Cannot convert a Symbol value to a string");
        }
        return $String(argument);
      };
    }
  });

  // node_modules/string.prototype.trim/implementation.js
  var require_implementation3 = __commonJS({
    "node_modules/string.prototype.trim/implementation.js"(exports, module) {
      "use strict";
      var RequireObjectCoercible = require_RequireObjectCoercible();
      var ToString = require_ToString();
      var callBound = require_callBound();
      var $replace = callBound("String.prototype.replace");
      var mvsIsWS = /^\s$/.test("\u180E");
      var leftWhitespace = mvsIsWS ? /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/ : /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
      var rightWhitespace = mvsIsWS ? /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/ : /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
      module.exports = function trim() {
        var S = ToString(RequireObjectCoercible(this));
        return $replace($replace(S, leftWhitespace, ""), rightWhitespace, "");
      };
    }
  });

  // node_modules/string.prototype.trim/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/string.prototype.trim/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation3();
      var zeroWidthSpace = "\u200B";
      var mongolianVowelSeparator = "\u180E";
      module.exports = function getPolyfill() {
        if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace && mongolianVowelSeparator.trim() === mongolianVowelSeparator && ("_" + mongolianVowelSeparator).trim() === "_" + mongolianVowelSeparator && (mongolianVowelSeparator + "_").trim() === mongolianVowelSeparator + "_") {
          return String.prototype.trim;
        }
        return implementation;
      };
    }
  });

  // node_modules/string.prototype.trim/shim.js
  var require_shim = __commonJS({
    "node_modules/string.prototype.trim/shim.js"(exports, module) {
      "use strict";
      var define2 = require_define_properties();
      var getPolyfill = require_polyfill();
      module.exports = function shimStringTrim() {
        var polyfill = getPolyfill();
        define2(String.prototype, { trim: polyfill }, {
          trim: function testTrim() {
            return String.prototype.trim !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/string.prototype.trim/index.js
  var require_string_prototype = __commonJS({
    "node_modules/string.prototype.trim/index.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind();
      var define2 = require_define_properties();
      var RequireObjectCoercible = require_RequireObjectCoercible();
      var implementation = require_implementation3();
      var getPolyfill = require_polyfill();
      var shim = require_shim();
      var bound = callBind(getPolyfill());
      var boundMethod = function trim(receiver) {
        RequireObjectCoercible(receiver);
        return bound(receiver);
      };
      define2(boundMethod, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = boundMethod;
    }
  });

  // node_modules/es-abstract/2024/StringToNumber.js
  var require_StringToNumber = __commonJS({
    "node_modules/es-abstract/2024/StringToNumber.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $Number = GetIntrinsic("%Number%");
      var $RegExp = GetIntrinsic("%RegExp%");
      var $TypeError = require_type();
      var $parseInteger = GetIntrinsic("%parseInt%");
      var callBound = require_callBound();
      var regexTester = require_safe_regex_test();
      var $strSlice = callBound("String.prototype.slice");
      var isBinary2 = regexTester(/^0b[01]+$/i);
      var isOctal2 = regexTester(/^0o[0-7]+$/i);
      var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
      var nonWS = ["\x85", "\u200B", "\uFFFE"].join("");
      var nonWSregex = new $RegExp("[" + nonWS + "]", "g");
      var hasNonWS = regexTester(nonWSregex);
      var $trim = require_string_prototype();
      module.exports = function StringToNumber(argument) {
        if (typeof argument !== "string") {
          throw new $TypeError("Assertion failed: `argument` is not a String");
        }
        if (isBinary2(argument)) {
          return $Number($parseInteger($strSlice(argument, 2), 2));
        }
        if (isOctal2(argument)) {
          return $Number($parseInteger($strSlice(argument, 2), 8));
        }
        if (hasNonWS(argument) || isInvalidHexLiteral(argument)) {
          return NaN;
        }
        var trimmed = $trim(argument);
        if (trimmed !== argument) {
          return StringToNumber(trimmed);
        }
        return $Number(argument);
      };
    }
  });

  // node_modules/es-abstract/2024/ToNumber.js
  var require_ToNumber = __commonJS({
    "node_modules/es-abstract/2024/ToNumber.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $TypeError = require_type();
      var $Number = GetIntrinsic("%Number%");
      var isPrimitive = require_isPrimitive2();
      var ToPrimitive = require_ToPrimitive();
      var StringToNumber = require_StringToNumber();
      module.exports = function ToNumber(argument) {
        var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
        if (typeof value === "symbol") {
          throw new $TypeError("Cannot convert a Symbol value to a number");
        }
        if (typeof value === "bigint") {
          throw new $TypeError("Conversion from 'BigInt' to 'number' is not allowed.");
        }
        if (typeof value === "string") {
          return StringToNumber(value);
        }
        return $Number(value);
      };
    }
  });

  // node_modules/es-abstract/2024/floor.js
  var require_floor = __commonJS({
    "node_modules/es-abstract/2024/floor.js"(exports, module) {
      "use strict";
      var $floor = Math.floor;
      module.exports = function floor2(x) {
        if (typeof x === "bigint") {
          return x;
        }
        return $floor(x);
      };
    }
  });

  // node_modules/es-abstract/2024/truncate.js
  var require_truncate = __commonJS({
    "node_modules/es-abstract/2024/truncate.js"(exports, module) {
      "use strict";
      var floor2 = require_floor();
      var $TypeError = require_type();
      module.exports = function truncate2(x) {
        if (typeof x !== "number" && typeof x !== "bigint") {
          throw new $TypeError("argument must be a Number or a BigInt");
        }
        var result = x < 0 ? -floor2(-x) : floor2(x);
        return result === 0 ? 0 : result;
      };
    }
  });

  // node_modules/es-abstract/2024/ToInt16.js
  var require_ToInt16 = __commonJS({
    "node_modules/es-abstract/2024/ToInt16.js"(exports, module) {
      "use strict";
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var isFinite2 = require_isFinite();
      var two16 = 65536;
      module.exports = function ToInt16(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int16bit = modulo(int, two16);
        return int16bit >= 32768 ? int16bit - two16 : int16bit;
      };
    }
  });

  // node_modules/es-abstract/2024/ToInt32.js
  var require_ToInt32 = __commonJS({
    "node_modules/es-abstract/2024/ToInt32.js"(exports, module) {
      "use strict";
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var isFinite2 = require_isFinite();
      var two31 = 2147483648;
      var two32 = 4294967296;
      module.exports = function ToInt32(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int32bit = modulo(int, two32);
        var result = int32bit >= two31 ? int32bit - two32 : int32bit;
        return result === 0 ? 0 : result;
      };
    }
  });

  // node_modules/es-abstract/2024/ToInt8.js
  var require_ToInt8 = __commonJS({
    "node_modules/es-abstract/2024/ToInt8.js"(exports, module) {
      "use strict";
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var isFinite2 = require_isFinite();
      module.exports = function ToInt8(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int8bit = modulo(int, 256);
        return int8bit >= 128 ? int8bit - 256 : int8bit;
      };
    }
  });

  // node_modules/es-abstract/2024/ToUint16.js
  var require_ToUint16 = __commonJS({
    "node_modules/es-abstract/2024/ToUint16.js"(exports, module) {
      "use strict";
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var isFinite2 = require_isFinite();
      var two16 = 65536;
      module.exports = function ToUint16(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int16bit = modulo(int, two16);
        return int16bit === 0 ? 0 : int16bit;
      };
    }
  });

  // node_modules/es-abstract/2024/ToUint32.js
  var require_ToUint32 = __commonJS({
    "node_modules/es-abstract/2024/ToUint32.js"(exports, module) {
      "use strict";
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var isFinite2 = require_isFinite();
      var two32 = 4294967296;
      module.exports = function ToUint32(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int32bit = modulo(int, two32);
        return int32bit === 0 ? 0 : int32bit;
      };
    }
  });

  // node_modules/es-abstract/2024/ToUint8.js
  var require_ToUint8 = __commonJS({
    "node_modules/es-abstract/2024/ToUint8.js"(exports, module) {
      "use strict";
      var isFinite2 = require_isFinite();
      var modulo = require_modulo();
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      module.exports = function ToUint8(argument) {
        var number2 = ToNumber(argument);
        if (!isFinite2(number2) || number2 === 0) {
          return 0;
        }
        var int = truncate2(number2);
        var int8bit = modulo(int, 256);
        return int8bit;
      };
    }
  });

  // node_modules/es-abstract/2024/clamp.js
  var require_clamp = __commonJS({
    "node_modules/es-abstract/2024/clamp.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $TypeError = require_type();
      var max2 = GetIntrinsic("%Math.max%");
      var min2 = GetIntrinsic("%Math.min%");
      module.exports = function clamp2(x, lower, upper) {
        if (typeof x !== "number" || typeof lower !== "number" || typeof upper !== "number" || !(lower <= upper)) {
          throw new $TypeError("Assertion failed: all three arguments must be MVs, and `lower` must be `<= upper`");
        }
        return min2(max2(lower, x), upper);
      };
    }
  });

  // node_modules/es-abstract/2024/ToUint8Clamp.js
  var require_ToUint8Clamp = __commonJS({
    "node_modules/es-abstract/2024/ToUint8Clamp.js"(exports, module) {
      "use strict";
      var clamp2 = require_clamp();
      var ToNumber = require_ToNumber();
      var floor2 = require_floor();
      var $isNaN = require_isNaN();
      module.exports = function ToUint8Clamp(argument) {
        var number2 = ToNumber(argument);
        if ($isNaN(number2)) {
          return 0;
        }
        var clamped = clamp2(number2, 0, 255);
        var f = floor2(clamped);
        if (clamped < f + 0.5) {
          return f;
        }
        if (clamped > f + 0.5) {
          return f + 1;
        }
        return f % 2 === 0 ? f : f + 1;
      };
    }
  });

  // node_modules/es-abstract/helpers/isNegativeZero.js
  var require_isNegativeZero = __commonJS({
    "node_modules/es-abstract/helpers/isNegativeZero.js"(exports, module) {
      "use strict";
      module.exports = function isNegativeZero(x) {
        return x === 0 && 1 / x === 1 / -0;
      };
    }
  });

  // node_modules/es-abstract/helpers/valueToFloat32Bytes.js
  var require_valueToFloat32Bytes = __commonJS({
    "node_modules/es-abstract/helpers/valueToFloat32Bytes.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $abs = GetIntrinsic("%Math.abs%");
      var $floor = GetIntrinsic("%Math.floor%");
      var $pow = GetIntrinsic("%Math.pow%");
      var isFinite2 = require_isFinite();
      var isNaN2 = require_isNaN();
      var isNegativeZero = require_isNegativeZero();
      var maxFiniteFloat32 = 34028234663852886e22;
      module.exports = function valueToFloat32Bytes(value, isLittleEndian) {
        if (isNaN2(value)) {
          return isLittleEndian ? [0, 0, 192, 127] : [127, 192, 0, 0];
        }
        var leastSig;
        if (value === 0) {
          leastSig = isNegativeZero(value) ? 128 : 0;
          return isLittleEndian ? [0, 0, 0, leastSig] : [leastSig, 0, 0, 0];
        }
        if ($abs(value) > maxFiniteFloat32 || !isFinite2(value)) {
          leastSig = value < 0 ? 255 : 127;
          return isLittleEndian ? [0, 0, 128, leastSig] : [leastSig, 128, 0, 0];
        }
        var sign3 = value < 0 ? 1 : 0;
        value = $abs(value);
        var exponent = 0;
        while (value >= 2) {
          exponent += 1;
          value /= 2;
        }
        while (value < 1) {
          exponent -= 1;
          value *= 2;
        }
        var mantissa = value - 1;
        mantissa *= $pow(2, 23) + 0.5;
        mantissa = $floor(mantissa);
        exponent += 127;
        exponent <<= 23;
        var result = sign3 << 31 | exponent | mantissa;
        var byte0 = result & 255;
        result >>= 8;
        var byte1 = result & 255;
        result >>= 8;
        var byte2 = result & 255;
        result >>= 8;
        var byte3 = result & 255;
        if (isLittleEndian) {
          return [byte0, byte1, byte2, byte3];
        }
        return [byte3, byte2, byte1, byte0];
      };
    }
  });

  // node_modules/es-abstract/helpers/fractionToBinaryString.js
  var require_fractionToBinaryString = __commonJS({
    "node_modules/es-abstract/helpers/fractionToBinaryString.js"(exports, module) {
      "use strict";
      var MAX_ITER = 1075;
      var maxBits = 54;
      module.exports = function fractionToBitString(x) {
        var str = "";
        if (x === 0) {
          return str;
        }
        var j = MAX_ITER;
        var y;
        for (var i = 0; i < MAX_ITER; i += 1) {
          y = x * 2;
          if (y >= 1) {
            x = y - 1;
            str += "1";
            if (j === MAX_ITER) {
              j = i;
            }
          } else {
            x = y;
            str += "0";
          }
          if (y === 1 || i - j > maxBits) {
            return str;
          }
        }
        return str;
      };
    }
  });

  // node_modules/es-abstract/helpers/intToBinaryString.js
  var require_intToBinaryString = __commonJS({
    "node_modules/es-abstract/helpers/intToBinaryString.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $floor = GetIntrinsic("%Math.floor%");
      module.exports = function intToBinaryString(x) {
        var str = "";
        var y;
        while (x > 0) {
          y = x / 2;
          x = $floor(y);
          if (y === x) {
            str = "0" + str;
          } else {
            str = "1" + str;
          }
        }
        return str;
      };
    }
  });

  // node_modules/es-abstract/helpers/valueToFloat64Bytes.js
  var require_valueToFloat64Bytes = __commonJS({
    "node_modules/es-abstract/helpers/valueToFloat64Bytes.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $parseInt = GetIntrinsic("%parseInt%");
      var $abs = GetIntrinsic("%Math.abs%");
      var $floor = GetIntrinsic("%Math.floor%");
      var callBound = require_callBound();
      var $strIndexOf = callBound("String.prototype.indexOf");
      var $strSlice = callBound("String.prototype.slice");
      var fractionToBitString = require_fractionToBinaryString();
      var intToBinString = require_intToBinaryString();
      var isNegativeZero = require_isNegativeZero();
      var float64bias = 1023;
      var elevenOnes = "11111111111";
      var elevenZeroes = "00000000000";
      var fiftyOneZeroes = elevenZeroes + elevenZeroes + elevenZeroes + elevenZeroes + "0000000";
      module.exports = function valueToFloat64Bytes(value, isLittleEndian) {
        var signBit = value < 0 || isNegativeZero(value) ? "1" : "0";
        var exponentBits;
        var significandBits;
        if (isNaN(value)) {
          exponentBits = elevenOnes;
          significandBits = "1" + fiftyOneZeroes;
        } else if (!isFinite(value)) {
          exponentBits = elevenOnes;
          significandBits = "0" + fiftyOneZeroes;
        } else if (value === 0) {
          exponentBits = elevenZeroes;
          significandBits = "0" + fiftyOneZeroes;
        } else {
          value = $abs(value);
          var integerPart = $floor(value);
          var intBinString = intToBinString(integerPart);
          var fracBinString = fractionToBitString(value - integerPart);
          var numberOfBits;
          if (intBinString) {
            exponentBits = intBinString.length - 1;
          } else {
            var first1 = $strIndexOf(fracBinString, "1");
            if (first1 > -1) {
              numberOfBits = first1 + 1;
            }
            exponentBits = -numberOfBits;
          }
          significandBits = intBinString + fracBinString;
          if (exponentBits < 0) {
            if (exponentBits <= -float64bias) {
              numberOfBits = float64bias - 1;
            }
            significandBits = $strSlice(significandBits, numberOfBits);
          } else {
            significandBits = $strSlice(significandBits, 1);
          }
          exponentBits = $strSlice(elevenZeroes + intToBinString(exponentBits + float64bias), -11);
          significandBits = $strSlice(significandBits + fiftyOneZeroes + "0", 0, 52);
        }
        var bits = signBit + exponentBits + significandBits;
        var rawBytes = [];
        for (var i = 0; i < 8; i++) {
          var targetIndex = isLittleEndian ? 8 - i - 1 : i;
          rawBytes[targetIndex] = $parseInt($strSlice(bits, i * 8, (i + 1) * 8), 2);
        }
        return rawBytes;
      };
    }
  });

  // node_modules/es-abstract/helpers/integerToNBytes.js
  var require_integerToNBytes = __commonJS({
    "node_modules/es-abstract/helpers/integerToNBytes.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $Number = GetIntrinsic("%Number%");
      var $BigInt = GetIntrinsic("%BigInt%", true);
      module.exports = function integerToNBytes(intValue, n, isLittleEndian) {
        var Z = typeof intValue === "bigint" ? $BigInt : $Number;
        if (intValue < 0) {
          intValue >>>= 0;
        }
        var rawBytes = [];
        for (var i = 0; i < n; i++) {
          rawBytes[isLittleEndian ? i : n - 1 - i] = $Number(intValue & Z(255));
          intValue >>= Z(8);
        }
        return rawBytes;
      };
    }
  });

  // node_modules/es-abstract/2024/NumericToRawBytes.js
  var require_NumericToRawBytes = __commonJS({
    "node_modules/es-abstract/2024/NumericToRawBytes.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var hasOwnProperty2 = require_HasOwnProperty();
      var ToBigInt64 = require_ToBigInt64();
      var ToBigUint64 = require_ToBigUint64();
      var ToInt16 = require_ToInt16();
      var ToInt32 = require_ToInt32();
      var ToInt8 = require_ToInt8();
      var ToUint16 = require_ToUint16();
      var ToUint32 = require_ToUint32();
      var ToUint8 = require_ToUint8();
      var ToUint8Clamp = require_ToUint8Clamp();
      var valueToFloat32Bytes = require_valueToFloat32Bytes();
      var valueToFloat64Bytes = require_valueToFloat64Bytes();
      var integerToNBytes = require_integerToNBytes();
      var keys = require_object_keys();
      var TypeToSizes = {
        __proto__: null,
        INT8: 1,
        UINT8: 1,
        UINT8C: 1,
        INT16: 2,
        UINT16: 2,
        INT32: 4,
        UINT32: 4,
        BIGINT64: 8,
        BIGUINT64: 8,
        FLOAT32: 4,
        FLOAT64: 8
      };
      var TypeToAO = {
        __proto__: null,
        INT8: ToInt8,
        UINT8: ToUint8,
        UINT8C: ToUint8Clamp,
        INT16: ToInt16,
        UINT16: ToUint16,
        INT32: ToInt32,
        UINT32: ToUint32,
        BIGINT64: ToBigInt64,
        BIGUINT64: ToBigUint64
      };
      module.exports = function NumericToRawBytes(type, value, isLittleEndian) {
        if (typeof type !== "string" || !hasOwnProperty2(TypeToSizes, type)) {
          throw new $TypeError("Assertion failed: `type` must be a TypedArray element type: " + keys(TypeToSizes));
        }
        if (typeof value !== "number" && typeof value !== "bigint") {
          throw new $TypeError("Assertion failed: `value` must be a Number or a BigInt");
        }
        if (typeof isLittleEndian !== "boolean") {
          throw new $TypeError("Assertion failed: `isLittleEndian` must be a Boolean");
        }
        if (type === "FLOAT32") {
          return valueToFloat32Bytes(value, isLittleEndian);
        } else if (type === "FLOAT64") {
          return valueToFloat64Bytes(value, isLittleEndian);
        }
        var n = TypeToSizes[type];
        var convOp = TypeToAO[type];
        var intValue = convOp(value);
        return integerToNBytes(intValue, n, isLittleEndian);
      };
    }
  });

  // node_modules/es-abstract/helpers/forEach.js
  var require_forEach = __commonJS({
    "node_modules/es-abstract/helpers/forEach.js"(exports, module) {
      "use strict";
      module.exports = function forEach(array, callback) {
        for (var i = 0; i < array.length; i += 1) {
          callback(array[i], i, array);
        }
      };
    }
  });

  // node_modules/es-abstract/2024/SetValueInBuffer.js
  var require_SetValueInBuffer = __commonJS({
    "node_modules/es-abstract/2024/SetValueInBuffer.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $Uint8Array = GetIntrinsic("%Uint8Array%", true);
      var isInteger2 = require_isInteger();
      var IsBigIntElementType = require_IsBigIntElementType();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var NumericToRawBytes = require_NumericToRawBytes();
      var isArrayBuffer = require_is_array_buffer();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var has = require_hasown();
      var tableTAO = require_typed_array_objects();
      var defaultEndianness = require_defaultEndianness();
      var forEach = require_forEach();
      module.exports = function SetValueInBuffer(arrayBuffer, byteIndex, type, value, isTypedArray, order) {
        var isSAB = isSharedArrayBuffer(arrayBuffer);
        if (!isArrayBuffer(arrayBuffer) && !isSAB) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must be an ArrayBuffer or a SharedArrayBuffer");
        }
        if (!isInteger2(byteIndex) || byteIndex < 0) {
          throw new $TypeError("Assertion failed: `byteIndex` must be a non-negative integer");
        }
        if (typeof type !== "string" || !has(tableTAO.size, "$" + type)) {
          throw new $TypeError("Assertion failed: `type` must be a Typed Array Element Type");
        }
        if (typeof value !== "number" && typeof value !== "bigint") {
          throw new $TypeError("Assertion failed: `value` must be a Number or a BigInt");
        }
        if (typeof isTypedArray !== "boolean") {
          throw new $TypeError("Assertion failed: `isTypedArray` must be a boolean");
        }
        if (order !== "SEQ-CST" && order !== "UNORDERED" && order !== "INIT") {
          throw new $TypeError('Assertion failed: `order` must be `"SEQ-CST"`, `"UNORDERED"`, or `"INIT"`');
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("Assertion failed: `isLittleEndian` must be a boolean, if present");
        }
        if (IsDetachedBuffer(arrayBuffer)) {
          throw new $TypeError("Assertion failed: ArrayBuffer is detached");
        }
        if (IsBigIntElementType(type) ? typeof value !== "bigint" : typeof value !== "number") {
          throw new $TypeError("Assertion failed: `value` must be a BigInt if type is ~BIGINT64~ or ~BIGUINT64~, otherwise a Number");
        }
        var elementSize = tableTAO.size["$" + type];
        var isLittleEndian = arguments.length > 6 ? arguments[6] : defaultEndianness === "little";
        var rawBytes = NumericToRawBytes(type, value, isLittleEndian);
        if (isSAB) {
          throw new $SyntaxError("SharedArrayBuffer is not supported by this implementation");
        } else {
          var arr = new $Uint8Array(arrayBuffer, byteIndex, elementSize);
          forEach(rawBytes, function(rawByte, i) {
            arr[i] = rawByte;
          });
        }
      };
    }
  });

  // node_modules/es-abstract/2024/ToIntegerOrInfinity.js
  var require_ToIntegerOrInfinity = __commonJS({
    "node_modules/es-abstract/2024/ToIntegerOrInfinity.js"(exports, module) {
      "use strict";
      var ToNumber = require_ToNumber();
      var truncate2 = require_truncate();
      var $isNaN = require_isNaN();
      var $isFinite = require_isFinite();
      module.exports = function ToIntegerOrInfinity(value) {
        var number2 = ToNumber(value);
        if ($isNaN(number2) || number2 === 0) {
          return 0;
        }
        if (!$isFinite(number2)) {
          return number2;
        }
        return truncate2(number2);
      };
    }
  });

  // node_modules/es-abstract/2024/TypedArrayElementSize.js
  var require_TypedArrayElementSize = __commonJS({
    "node_modules/es-abstract/2024/TypedArrayElementSize.js"(exports, module) {
      "use strict";
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var isInteger2 = require_isInteger();
      var whichTypedArray = require_which_typed_array();
      var tableTAO = require_typed_array_objects();
      module.exports = function TypedArrayElementSize(O) {
        var type = whichTypedArray(O);
        if (type === false) {
          throw new $TypeError("Assertion failed: `O` must be a TypedArray");
        }
        var size = tableTAO.size["$" + tableTAO.name["$" + type]];
        if (!isInteger2(size) || size < 0) {
          throw new $SyntaxError("Assertion failed: Unknown TypedArray type `" + type + "`");
        }
        return size;
      };
    }
  });

  // node_modules/es-abstract/2024/TypedArrayElementType.js
  var require_TypedArrayElementType = __commonJS({
    "node_modules/es-abstract/2024/TypedArrayElementType.js"(exports, module) {
      "use strict";
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var whichTypedArray = require_which_typed_array();
      var tableTAO = require_typed_array_objects();
      module.exports = function TypedArrayElementType(O) {
        var type = whichTypedArray(O);
        if (type === false) {
          throw new $TypeError("Assertion failed: `O` must be a TypedArray");
        }
        var result = tableTAO.name["$" + type];
        if (typeof result !== "string") {
          throw new $SyntaxError("Assertion failed: Unknown TypedArray type `" + type + "`");
        }
        return result;
      };
    }
  });

  // node_modules/es-abstract/GetIntrinsic.js
  var require_GetIntrinsic = __commonJS({
    "node_modules/es-abstract/GetIntrinsic.js"(exports, module) {
      "use strict";
      module.exports = require_get_intrinsic();
    }
  });

  // node_modules/es-abstract/helpers/records/property-descriptor.js
  var require_property_descriptor = __commonJS({
    "node_modules/es-abstract/helpers/records/property-descriptor.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var hasOwn = require_hasown();
      var allowed = {
        __proto__: null,
        "[[Configurable]]": true,
        "[[Enumerable]]": true,
        "[[Get]]": true,
        "[[Set]]": true,
        "[[Value]]": true,
        "[[Writable]]": true
      };
      module.exports = function isPropertyDescriptor(Desc) {
        if (!Desc || typeof Desc !== "object") {
          return false;
        }
        for (var key in Desc) {
          if (hasOwn(Desc, key) && !allowed[key]) {
            return false;
          }
        }
        var isData = hasOwn(Desc, "[[Value]]") || hasOwn(Desc, "[[Writable]]");
        var IsAccessor = hasOwn(Desc, "[[Get]]") || hasOwn(Desc, "[[Set]]");
        if (isData && IsAccessor) {
          throw new $TypeError("Property Descriptors may not be both accessor and data descriptors");
        }
        return true;
      };
    }
  });

  // node_modules/es-abstract/helpers/DefineOwnProperty.js
  var require_DefineOwnProperty = __commonJS({
    "node_modules/es-abstract/helpers/DefineOwnProperty.js"(exports, module) {
      "use strict";
      var hasPropertyDescriptors = require_has_property_descriptors();
      var $defineProperty = require_es_define_property();
      var hasArrayLengthDefineBug = hasPropertyDescriptors.hasArrayLengthDefineBug();
      var isArray2 = hasArrayLengthDefineBug && require_IsArray();
      var callBound = require_callBound();
      var $isEnumerable = callBound("Object.prototype.propertyIsEnumerable");
      module.exports = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P3, desc) {
        if (!$defineProperty) {
          if (!IsDataDescriptor(desc)) {
            return false;
          }
          if (!desc["[[Configurable]]"] || !desc["[[Writable]]"]) {
            return false;
          }
          if (P3 in O && $isEnumerable(O, P3) !== !!desc["[[Enumerable]]"]) {
            return false;
          }
          var V = desc["[[Value]]"];
          O[P3] = V;
          return SameValue(O[P3], V);
        }
        if (hasArrayLengthDefineBug && P3 === "length" && "[[Value]]" in desc && isArray2(O) && O.length !== desc["[[Value]]"]) {
          O.length = desc["[[Value]]"];
          return O.length === desc["[[Value]]"];
        }
        $defineProperty(O, P3, FromPropertyDescriptor(desc));
        return true;
      };
    }
  });

  // node_modules/es-abstract/helpers/fromPropertyDescriptor.js
  var require_fromPropertyDescriptor = __commonJS({
    "node_modules/es-abstract/helpers/fromPropertyDescriptor.js"(exports, module) {
      "use strict";
      module.exports = function fromPropertyDescriptor(Desc) {
        if (typeof Desc === "undefined") {
          return Desc;
        }
        var obj = {};
        if ("[[Value]]" in Desc) {
          obj.value = Desc["[[Value]]"];
        }
        if ("[[Writable]]" in Desc) {
          obj.writable = !!Desc["[[Writable]]"];
        }
        if ("[[Get]]" in Desc) {
          obj.get = Desc["[[Get]]"];
        }
        if ("[[Set]]" in Desc) {
          obj.set = Desc["[[Set]]"];
        }
        if ("[[Enumerable]]" in Desc) {
          obj.enumerable = !!Desc["[[Enumerable]]"];
        }
        if ("[[Configurable]]" in Desc) {
          obj.configurable = !!Desc["[[Configurable]]"];
        }
        return obj;
      };
    }
  });

  // node_modules/es-abstract/2024/FromPropertyDescriptor.js
  var require_FromPropertyDescriptor = __commonJS({
    "node_modules/es-abstract/2024/FromPropertyDescriptor.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var isPropertyDescriptor = require_property_descriptor();
      var fromPropertyDescriptor = require_fromPropertyDescriptor();
      module.exports = function FromPropertyDescriptor(Desc) {
        if (typeof Desc !== "undefined" && !isPropertyDescriptor(Desc)) {
          throw new $TypeError("Assertion failed: `Desc` must be a Property Descriptor");
        }
        return fromPropertyDescriptor(Desc);
      };
    }
  });

  // node_modules/es-abstract/2024/IsDataDescriptor.js
  var require_IsDataDescriptor = __commonJS({
    "node_modules/es-abstract/2024/IsDataDescriptor.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var hasOwn = require_hasown();
      var isPropertyDescriptor = require_property_descriptor();
      module.exports = function IsDataDescriptor(Desc) {
        if (typeof Desc === "undefined") {
          return false;
        }
        if (!isPropertyDescriptor(Desc)) {
          throw new $TypeError("Assertion failed: `Desc` must be a Property Descriptor");
        }
        if (!hasOwn(Desc, "[[Value]]") && !hasOwn(Desc, "[[Writable]]")) {
          return false;
        }
        return true;
      };
    }
  });

  // node_modules/es-abstract/2024/ToBoolean.js
  var require_ToBoolean = __commonJS({
    "node_modules/es-abstract/2024/ToBoolean.js"(exports, module) {
      "use strict";
      module.exports = function ToBoolean(value) {
        return !!value;
      };
    }
  });

  // node_modules/es-abstract/2024/IsCallable.js
  var require_IsCallable = __commonJS({
    "node_modules/es-abstract/2024/IsCallable.js"(exports, module) {
      "use strict";
      module.exports = require_is_callable();
    }
  });

  // node_modules/es-abstract/2024/ToPropertyDescriptor.js
  var require_ToPropertyDescriptor = __commonJS({
    "node_modules/es-abstract/2024/ToPropertyDescriptor.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasown();
      var $TypeError = require_type();
      var Type = require_Type2();
      var ToBoolean = require_ToBoolean();
      var IsCallable = require_IsCallable();
      module.exports = function ToPropertyDescriptor(Obj) {
        if (Type(Obj) !== "Object") {
          throw new $TypeError("ToPropertyDescriptor requires an object");
        }
        var desc = {};
        if (hasOwn(Obj, "enumerable")) {
          desc["[[Enumerable]]"] = ToBoolean(Obj.enumerable);
        }
        if (hasOwn(Obj, "configurable")) {
          desc["[[Configurable]]"] = ToBoolean(Obj.configurable);
        }
        if (hasOwn(Obj, "value")) {
          desc["[[Value]]"] = Obj.value;
        }
        if (hasOwn(Obj, "writable")) {
          desc["[[Writable]]"] = ToBoolean(Obj.writable);
        }
        if (hasOwn(Obj, "get")) {
          var getter = Obj.get;
          if (typeof getter !== "undefined" && !IsCallable(getter)) {
            throw new $TypeError("getter must be a function");
          }
          desc["[[Get]]"] = getter;
        }
        if (hasOwn(Obj, "set")) {
          var setter = Obj.set;
          if (typeof setter !== "undefined" && !IsCallable(setter)) {
            throw new $TypeError("setter must be a function");
          }
          desc["[[Set]]"] = setter;
        }
        if ((hasOwn(desc, "[[Get]]") || hasOwn(desc, "[[Set]]")) && (hasOwn(desc, "[[Value]]") || hasOwn(desc, "[[Writable]]"))) {
          throw new $TypeError("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
        }
        return desc;
      };
    }
  });

  // node_modules/es-abstract/2024/DefinePropertyOrThrow.js
  var require_DefinePropertyOrThrow = __commonJS({
    "node_modules/es-abstract/2024/DefinePropertyOrThrow.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var isPropertyDescriptor = require_property_descriptor();
      var DefineOwnProperty = require_DefineOwnProperty();
      var FromPropertyDescriptor = require_FromPropertyDescriptor();
      var IsDataDescriptor = require_IsDataDescriptor();
      var IsPropertyKey = require_IsPropertyKey();
      var SameValue = require_SameValue();
      var ToPropertyDescriptor = require_ToPropertyDescriptor();
      var Type = require_Type2();
      module.exports = function DefinePropertyOrThrow(O, P3, desc) {
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: Type(O) is not Object");
        }
        if (!IsPropertyKey(P3)) {
          throw new $TypeError("Assertion failed: IsPropertyKey(P) is not true");
        }
        var Desc = isPropertyDescriptor(desc) ? desc : ToPropertyDescriptor(desc);
        if (!isPropertyDescriptor(Desc)) {
          throw new $TypeError("Assertion failed: Desc is not a valid Property Descriptor");
        }
        return DefineOwnProperty(
          IsDataDescriptor,
          SameValue,
          FromPropertyDescriptor,
          O,
          P3,
          Desc
        );
      };
    }
  });

  // node_modules/es-abstract/2024/IsConstructor.js
  var require_IsConstructor = __commonJS({
    "node_modules/es-abstract/2024/IsConstructor.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_GetIntrinsic();
      var $construct = GetIntrinsic("%Reflect.construct%", true);
      var DefinePropertyOrThrow = require_DefinePropertyOrThrow();
      try {
        DefinePropertyOrThrow({}, "", { "[[Get]]": function() {
        } });
      } catch (e) {
        DefinePropertyOrThrow = null;
      }
      if (DefinePropertyOrThrow && $construct) {
        isConstructorMarker = {};
        badArrayLike = {};
        DefinePropertyOrThrow(badArrayLike, "length", {
          "[[Get]]": function() {
            throw isConstructorMarker;
          },
          "[[Enumerable]]": true
        });
        module.exports = function IsConstructor(argument) {
          try {
            $construct(argument, badArrayLike);
          } catch (err) {
            return err === isConstructorMarker;
          }
        };
      } else {
        module.exports = function IsConstructor(argument) {
          return typeof argument === "function" && !!argument.prototype;
        };
      }
      var isConstructorMarker;
      var badArrayLike;
    }
  });

  // node_modules/es-abstract/2024/SpeciesConstructor.js
  var require_SpeciesConstructor = __commonJS({
    "node_modules/es-abstract/2024/SpeciesConstructor.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var $species = GetIntrinsic("%Symbol.species%", true);
      var $TypeError = require_type();
      var IsConstructor = require_IsConstructor();
      var Type = require_Type2();
      module.exports = function SpeciesConstructor(O, defaultConstructor) {
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: Type(O) is not Object");
        }
        var C = O.constructor;
        if (typeof C === "undefined") {
          return defaultConstructor;
        }
        if (Type(C) !== "Object") {
          throw new $TypeError("O.constructor is not an Object");
        }
        var S = $species ? C[$species] : void 0;
        if (S == null) {
          return defaultConstructor;
        }
        if (IsConstructor(S)) {
          return S;
        }
        throw new $TypeError("no constructor found");
      };
    }
  });

  // node_modules/es-abstract/helpers/records/typed-array-with-buffer-witness-record.js
  var require_typed_array_with_buffer_witness_record = __commonJS({
    "node_modules/es-abstract/helpers/records/typed-array-with-buffer-witness-record.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasown();
      var isTypedArray = require_is_typed_array();
      var isInteger2 = require_isInteger();
      module.exports = function isTypedArrayWithBufferWitnessRecord(value) {
        return !!value && typeof value === "object" && hasOwn(value, "[[Object]]") && hasOwn(value, "[[CachedBufferByteLength]]") && (isInteger2(value["[[CachedBufferByteLength]]"]) && value["[[CachedBufferByteLength]]"] >= 0 || value["[[CachedBufferByteLength]]"] === "DETACHED") && isTypedArray(value["[[Object]]"]);
      };
    }
  });

  // node_modules/typed-array-byte-offset/index.js
  var require_typed_array_byte_offset = __commonJS({
    "node_modules/typed-array-byte-offset/index.js"(exports, module) {
      "use strict";
      var forEach = require_for_each();
      var callBind = require_call_bind();
      var typedArrays = require_available_typed_arrays()();
      var getters = {};
      var hasProto = require_has_proto()();
      var gOPD = require_gopd();
      var oDP = Object.defineProperty;
      if (gOPD) {
        getByteOffset = function(x) {
          return x.byteOffset;
        };
        forEach(typedArrays, function(typedArray) {
          if (typeof global[typedArray] === "function" || typeof global[typedArray] === "object") {
            var Proto = global[typedArray].prototype;
            var descriptor = gOPD(Proto, "byteOffset");
            if (!descriptor && hasProto) {
              var superProto = Proto.__proto__;
              descriptor = gOPD(superProto, "byteOffset");
            }
            if (descriptor && descriptor.get) {
              getters[typedArray] = callBind(descriptor.get);
            } else if (oDP) {
              var arr = new global[typedArray](2);
              descriptor = gOPD(arr, "byteOffset");
              if (descriptor && descriptor.configurable) {
                oDP(arr, "length", { value: 3 });
              }
              if (arr.length === 2) {
                getters[typedArray] = getByteOffset;
              }
            }
          }
        });
      }
      var getByteOffset;
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var foundOffset;
        forEach(
          getters,
          /** @type {(getter: ByteOffsetGetter) => void} */
          function(getter) {
            if (typeof foundOffset !== "number") {
              try {
                var offset = getter(value);
                if (typeof offset === "number") {
                  foundOffset = offset;
                }
              } catch (e) {
              }
            }
          }
        );
        return foundOffset;
      };
      var isTypedArray = require_is_typed_array();
      module.exports = function typedArrayByteOffset(value) {
        if (!isTypedArray(value)) {
          return false;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // node_modules/typed-array-length/index.js
  var require_typed_array_length = __commonJS({
    "node_modules/typed-array-length/index.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind();
      var forEach = require_for_each();
      var gOPD = require_gopd();
      var hasProto = require_has_proto()();
      var isTypedArray = require_is_typed_array();
      var typedArrays = require_possible_typed_array_names();
      var getters = { __proto__: null };
      var oDP = Object.defineProperty;
      if (gOPD) {
        getLength = /** @type {TypedArrayLengthGetter} */
        function(x) {
          return x.length;
        };
        forEach(
          typedArrays,
          /** @type {(typedArray: import('.').TypedArrayName) => void} */
          function(typedArray) {
            var TA = global[typedArray];
            if (typeof TA === "function" || typeof TA === "object") {
              var Proto = TA.prototype;
              var descriptor = gOPD(Proto, "length");
              if (!descriptor && hasProto) {
                var superProto = Proto.__proto__;
                descriptor = gOPD(superProto, "length");
              }
              if (descriptor && descriptor.get) {
                getters[
                  /** @type {`$${import('.').TypedArrayName}`} */
                  "$" + typedArray
                ] = callBind(descriptor.get);
              } else if (oDP) {
                var arr = new global[typedArray](2);
                descriptor = gOPD(arr, "length");
                if (descriptor && descriptor.configurable) {
                  oDP(arr, "length", { value: 3 });
                }
                if (arr.length === 2) {
                  getters[
                    /** @type {`$${import('.').TypedArrayName}`} */
                    "$" + typedArray
                  ] = getLength;
                }
              }
            }
          }
        );
      }
      var getLength;
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var foundLength;
        forEach(
          getters,
          /** @type {(getter: TypedArrayLengthGetter) => void} */
          function(getter) {
            if (typeof foundLength !== "number") {
              try {
                var length = getter(value);
                if (typeof length === "number") {
                  foundLength = length;
                }
              } catch (e) {
              }
            }
          }
        );
        return foundLength;
      };
      module.exports = function typedArrayLength(value) {
        if (!isTypedArray(value)) {
          return false;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // node_modules/es-abstract/2024/IsTypedArrayOutOfBounds.js
  var require_IsTypedArrayOutOfBounds = __commonJS({
    "node_modules/es-abstract/2024/IsTypedArrayOutOfBounds.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var TypedArrayElementSize = require_TypedArrayElementSize();
      var isTypedArrayWithBufferWitnessRecord = require_typed_array_with_buffer_witness_record();
      var typedArrayBuffer = require_typed_array_buffer();
      var typedArrayByteOffset = require_typed_array_byte_offset();
      var typedArrayLength = require_typed_array_length();
      module.exports = function IsTypedArrayOutOfBounds(taRecord) {
        if (!isTypedArrayWithBufferWitnessRecord(taRecord)) {
          throw new $TypeError("Assertion failed: `taRecord` must be a TypedArray With Buffer Witness Record");
        }
        var O = taRecord["[[Object]]"];
        var bufferByteLength = taRecord["[[CachedBufferByteLength]]"];
        if (IsDetachedBuffer(typedArrayBuffer(O)) && bufferByteLength !== "DETACHED") {
          throw new $TypeError("Assertion failed: typed array is detached only if the byte length is ~DETACHED~");
        }
        if (bufferByteLength === "DETACHED") {
          return true;
        }
        var byteOffsetStart = typedArrayByteOffset(O);
        var byteOffsetEnd;
        var length = typedArrayLength(O);
        if (length === "AUTO") {
          byteOffsetEnd = bufferByteLength;
        } else {
          var elementSize = TypedArrayElementSize(O);
          byteOffsetEnd = byteOffsetStart + length * elementSize;
        }
        if (byteOffsetStart > bufferByteLength || byteOffsetEnd > bufferByteLength) {
          return true;
        }
        return false;
      };
    }
  });

  // node_modules/es-abstract/2024/IsFixedLengthArrayBuffer.js
  var require_IsFixedLengthArrayBuffer = __commonJS({
    "node_modules/es-abstract/2024/IsFixedLengthArrayBuffer.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var callBound = require_callBound();
      var $arrayBufferResizable = callBound("%ArrayBuffer.prototype.resizable%", true);
      var $sharedArrayGrowable = callBound("%SharedArrayBuffer.prototype.growable%", true);
      var isArrayBuffer = require_is_array_buffer();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      module.exports = function IsFixedLengthArrayBuffer(arrayBuffer) {
        var isAB = isArrayBuffer(arrayBuffer);
        var isSAB = isSharedArrayBuffer(arrayBuffer);
        if (!isAB && !isSAB) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must be an ArrayBuffer or SharedArrayBuffer");
        }
        if (isAB && $arrayBufferResizable) {
          return !$arrayBufferResizable(arrayBuffer);
        }
        if (isSAB && $sharedArrayGrowable) {
          return !$sharedArrayGrowable(arrayBuffer);
        }
        return true;
      };
    }
  });

  // node_modules/es-abstract/2024/TypedArrayLength.js
  var require_TypedArrayLength = __commonJS({
    "node_modules/es-abstract/2024/TypedArrayLength.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var floor2 = require_floor();
      var IsFixedLengthArrayBuffer = require_IsFixedLengthArrayBuffer();
      var IsTypedArrayOutOfBounds = require_IsTypedArrayOutOfBounds();
      var TypedArrayElementSize = require_TypedArrayElementSize();
      var isTypedArrayWithBufferWitnessRecord = require_typed_array_with_buffer_witness_record();
      var typedArrayBuffer = require_typed_array_buffer();
      var typedArrayByteOffset = require_typed_array_byte_offset();
      var typedArrayLength = require_typed_array_length();
      module.exports = function TypedArrayLength(taRecord) {
        if (!isTypedArrayWithBufferWitnessRecord(taRecord)) {
          throw new $TypeError("Assertion failed: `taRecord` must be a TypedArray With Buffer Witness Record");
        }
        if (IsTypedArrayOutOfBounds(taRecord)) {
          throw new $TypeError("Assertion failed: `taRecord` is out of bounds");
        }
        var O = taRecord["[[Object]]"];
        var length = typedArrayLength(O);
        if (length !== "AUTO") {
          return length;
        }
        if (IsFixedLengthArrayBuffer(typedArrayBuffer(O))) {
          throw new $TypeError("Assertion failed: array buffer is not fixed length");
        }
        var byteOffset = typedArrayByteOffset(O);
        var elementSize = TypedArrayElementSize(O);
        var byteLength = taRecord["[[CachedBufferByteLength]]"];
        if (byteLength === "DETACHED") {
          throw new $TypeError("Assertion failed: typed array is detached");
        }
        return floor2((byteLength - byteOffset) / elementSize);
      };
    }
  });

  // node_modules/es-abstract/2024/ArrayBufferByteLength.js
  var require_ArrayBufferByteLength = __commonJS({
    "node_modules/es-abstract/2024/ArrayBufferByteLength.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var isArrayBuffer = require_is_array_buffer();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var arrayBufferByteLength = require_array_buffer_byte_length();
      var isGrowable = false;
      module.exports = function ArrayBufferByteLength(arrayBuffer, order) {
        var isSAB = isSharedArrayBuffer(arrayBuffer);
        if (!isArrayBuffer(arrayBuffer) && !isSAB) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must be an ArrayBuffer or a SharedArrayBuffer");
        }
        if (order !== "SEQ-CST" && order !== "UNORDERED") {
          throw new $TypeError("Assertion failed: `order` must be ~SEQ-CST~ or ~UNORDERED~");
        }
        if (isSAB && isGrowable) {
        }
        if (IsDetachedBuffer(arrayBuffer)) {
          throw new $TypeError("Assertion failed: `arrayBuffer` must not be detached");
        }
        return arrayBufferByteLength(arrayBuffer);
      };
    }
  });

  // node_modules/es-abstract/2024/MakeTypedArrayWithBufferWitnessRecord.js
  var require_MakeTypedArrayWithBufferWitnessRecord = __commonJS({
    "node_modules/es-abstract/2024/MakeTypedArrayWithBufferWitnessRecord.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var ArrayBufferByteLength = require_ArrayBufferByteLength();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var isTypedArray = require_is_typed_array();
      var typedArrayBuffer = require_typed_array_buffer();
      module.exports = function MakeTypedArrayWithBufferWitnessRecord(obj, order) {
        if (!isTypedArray(obj)) {
          throw new $TypeError("Assertion failed: `obj` must be a Typed Array");
        }
        if (order !== "SEQ-CST" && order !== "UNORDERED") {
          throw new $TypeError("Assertion failed: `order` must be ~SEQ-CST~ or ~UNORDERED~");
        }
        var buffer = typedArrayBuffer(obj);
        var byteLength = IsDetachedBuffer(buffer) ? "DETACHED" : ArrayBufferByteLength(buffer, order);
        return { "[[Object]]": obj, "[[CachedBufferByteLength]]": byteLength };
      };
    }
  });

  // node_modules/es-abstract/2024/ValidateTypedArray.js
  var require_ValidateTypedArray = __commonJS({
    "node_modules/es-abstract/2024/ValidateTypedArray.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var IsTypedArrayOutOfBounds = require_IsTypedArrayOutOfBounds();
      var MakeTypedArrayWithBufferWitnessRecord = require_MakeTypedArrayWithBufferWitnessRecord();
      var Type = require_Type2();
      var isTypedArray = require_is_typed_array();
      module.exports = function ValidateTypedArray(O, order) {
        if (order !== "SEQ-CST" && order !== "UNORDERED") {
          throw new $TypeError("Assertion failed: `order` must be ~SEQ-CST~ or ~UNORDERED~");
        }
        if (Type(O) !== "Object") {
          throw new $TypeError("Assertion failed: `O` must be an Object");
        }
        if (!isTypedArray(O)) {
          throw new $TypeError("Assertion failed: `O` must be a Typed Array");
        }
        var taRecord = MakeTypedArrayWithBufferWitnessRecord(O, order);
        if (IsTypedArrayOutOfBounds(taRecord)) {
          throw new $TypeError("`O` must be in-bounds and backed by a non-detached buffer");
        }
        return taRecord;
      };
    }
  });

  // node_modules/es-abstract/2024/TypedArrayCreateFromConstructor.js
  var require_TypedArrayCreateFromConstructor = __commonJS({
    "node_modules/es-abstract/2024/TypedArrayCreateFromConstructor.js"(exports, module) {
      "use strict";
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var IsArray = require_IsArray2();
      var IsConstructor = require_IsConstructor();
      var IsTypedArrayOutOfBounds = require_IsTypedArrayOutOfBounds();
      var TypedArrayLength = require_TypedArrayLength();
      var ValidateTypedArray = require_ValidateTypedArray();
      var availableTypedArrays = require_available_typed_arrays()();
      module.exports = function TypedArrayCreateFromConstructor(constructor, argumentList) {
        if (!IsConstructor(constructor)) {
          throw new $TypeError("Assertion failed: `constructor` must be a constructor");
        }
        if (!IsArray(argumentList)) {
          throw new $TypeError("Assertion failed: `argumentList` must be a List");
        }
        if (availableTypedArrays.length === 0) {
          throw new $SyntaxError("Assertion failed: Typed Arrays are not supported in this environment");
        }
        var newTypedArray;
        if (argumentList.length === 0) {
          newTypedArray = new constructor();
        } else if (argumentList.length === 1) {
          newTypedArray = new constructor(argumentList[0]);
        } else if (argumentList.length === 2) {
          newTypedArray = new constructor(argumentList[0], argumentList[1]);
        } else {
          newTypedArray = new constructor(argumentList[0], argumentList[1], argumentList[2]);
        }
        var taRecord = ValidateTypedArray(newTypedArray, "SEQ-CST");
        if (argumentList.length === 1 && typeof argumentList[0] === "number") {
          if (IsTypedArrayOutOfBounds(taRecord)) {
            throw new $TypeError("new Typed Array is out of bounds");
          }
          var length = TypedArrayLength(taRecord);
          if (length < argumentList[0]) {
            throw new $TypeError("`argumentList[0]` must be <= `newTypedArray.length`");
          }
        }
        return newTypedArray;
      };
    }
  });

  // node_modules/es-abstract/helpers/typedArrayConstructors.js
  var require_typedArrayConstructors = __commonJS({
    "node_modules/es-abstract/helpers/typedArrayConstructors.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var constructors = {
        __proto__: null,
        $Int8Array: GetIntrinsic("%Int8Array%", true),
        $Uint8Array: GetIntrinsic("%Uint8Array%", true),
        $Uint8ClampedArray: GetIntrinsic("%Uint8ClampedArray%", true),
        $Int16Array: GetIntrinsic("%Int16Array%", true),
        $Uint16Array: GetIntrinsic("%Uint16Array%", true),
        $Int32Array: GetIntrinsic("%Int32Array%", true),
        $Uint32Array: GetIntrinsic("%Uint32Array%", true),
        $BigInt64Array: GetIntrinsic("%BigInt64Array%", true),
        $BigUint64Array: GetIntrinsic("%BigUint64Array%", true),
        $Float32Array: GetIntrinsic("%Float32Array%", true),
        $Float64Array: GetIntrinsic("%Float64Array%", true)
      };
      module.exports = function getConstructor(kind) {
        return constructors["$" + kind];
      };
    }
  });

  // node_modules/es-abstract/2024/TypedArraySpeciesCreate.js
  var require_TypedArraySpeciesCreate = __commonJS({
    "node_modules/es-abstract/2024/TypedArraySpeciesCreate.js"(exports, module) {
      "use strict";
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var whichTypedArray = require_which_typed_array();
      var availableTypedArrays = require_available_typed_arrays()();
      var IsArray = require_IsArray2();
      var SpeciesConstructor = require_SpeciesConstructor();
      var TypedArrayCreateFromConstructor = require_TypedArrayCreateFromConstructor();
      var getConstructor = require_typedArrayConstructors();
      module.exports = function TypedArraySpeciesCreate(exemplar, argumentList) {
        if (availableTypedArrays.length === 0) {
          throw new $SyntaxError("Assertion failed: Typed Arrays are not supported in this environment");
        }
        var kind = whichTypedArray(exemplar);
        if (!kind) {
          throw new $TypeError("Assertion failed: exemplar must be a TypedArray");
        }
        if (!IsArray(argumentList)) {
          throw new $TypeError("Assertion failed: `argumentList` must be a List");
        }
        var defaultConstructor = getConstructor(kind);
        if (typeof defaultConstructor !== "function") {
          throw new $SyntaxError("Assertion failed: `constructor` of `exemplar` (" + kind + ") must exist. Please report this!");
        }
        var constructor = SpeciesConstructor(exemplar, defaultConstructor);
        return TypedArrayCreateFromConstructor(constructor, argumentList);
      };
    }
  });

  // node_modules/typedarray.prototype.slice/implementation.js
  var require_implementation4 = __commonJS({
    "node_modules/typedarray.prototype.slice/implementation.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var Get = require_Get();
      var GetValueFromBuffer = require_GetValueFromBuffer();
      var IsDetachedBuffer = require_IsDetachedBuffer();
      var max2 = require_max();
      var min2 = require_min();
      var Set2 = require_Set();
      var SetValueInBuffer = require_SetValueInBuffer();
      var ToIntegerOrInfinity = require_ToIntegerOrInfinity();
      var ToString = require_ToString();
      var TypedArrayElementSize = require_TypedArrayElementSize();
      var TypedArrayElementType = require_TypedArrayElementType();
      var TypedArraySpeciesCreate = require_TypedArraySpeciesCreate();
      var ValidateTypedArray = require_ValidateTypedArray();
      var typedArrayBuffer = require_typed_array_buffer();
      var typedArrayByteOffset = require_typed_array_byte_offset();
      module.exports = function slice(start, end) {
        var O = this;
        ValidateTypedArray(O, "SEQ-CST");
        var len = O.length;
        var relativeStart = ToIntegerOrInfinity(start);
        var k;
        if (relativeStart === -Infinity) {
          k = 0;
        } else if (relativeStart < 0) {
          k = max2(len + relativeStart, 0);
        } else {
          k = min2(relativeStart, len);
        }
        var relativeEnd = typeof end === "undefined" ? len : ToIntegerOrInfinity(end);
        var final;
        if (relativeEnd === -Infinity) {
          final = 0;
        } else if (relativeEnd < 0) {
          final = max2(len + relativeEnd, 0);
        } else {
          final = min2(relativeEnd, len);
        }
        var count = max2(final - k, 0);
        var A = TypedArraySpeciesCreate(O, [count]);
        if (count > 0) {
          if (IsDetachedBuffer(typedArrayBuffer(O))) {
            throw new $TypeError("Cannot use a Typed Array with an underlying ArrayBuffer that is detached");
          }
          var srcType = TypedArrayElementType(O);
          var targetType = TypedArrayElementType(A);
          if (srcType === targetType) {
            var srcBuffer = typedArrayBuffer(O);
            var targetBuffer = typedArrayBuffer(A);
            var elementSize = TypedArrayElementSize(O);
            var srcByteOffset = typedArrayByteOffset(O);
            var srcByteIndex = k * elementSize + srcByteOffset;
            var targetByteIndex = typedArrayByteOffset(A);
            var limit = targetByteIndex + count * elementSize;
            while (targetByteIndex < limit) {
              var value = GetValueFromBuffer(srcBuffer, srcByteIndex, "UINT8", true, "UNORDERED");
              SetValueInBuffer(targetBuffer, targetByteIndex, "UINT8", value, true, "UNORDERED");
              srcByteIndex += 1;
              targetByteIndex += 1;
            }
          } else {
            var n = 0;
            while (k < final) {
              var Pk = ToString(k);
              var kValue = Get(O, Pk);
              Set2(A, ToString(n), kValue, true);
              k += 1;
              n += 1;
            }
          }
        }
        return A;
      };
    }
  });

  // node_modules/typedarray.prototype.slice/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/typedarray.prototype.slice/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation4();
      module.exports = function getPolyfill() {
        return typeof Uint8Array === "function" && Uint8Array.prototype.slice || implementation;
      };
    }
  });

  // node_modules/es-abstract/helpers/getProto.js
  var require_getProto = __commonJS({
    "node_modules/es-abstract/helpers/getProto.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var originalGetProto = GetIntrinsic("%Object.getPrototypeOf%", true);
      var hasProto = require_has_proto()();
      module.exports = originalGetProto || (hasProto ? function(O) {
        return O.__proto__;
      } : null);
    }
  });

  // node_modules/typedarray.prototype.slice/shim.js
  var require_shim2 = __commonJS({
    "node_modules/typedarray.prototype.slice/shim.js"(exports, module) {
      "use strict";
      var define2 = require_define_properties();
      var getProto = require_getProto();
      var getPolyfill = require_polyfill2();
      module.exports = function shimTypedArraySlice() {
        if (typeof Uint8Array === "function") {
          var polyfill = getPolyfill();
          var proto = getProto(Uint8Array.prototype);
          define2(
            proto,
            { slice: polyfill },
            { slice: function() {
              return proto.slice !== polyfill;
            } }
          );
        }
        return polyfill;
      };
    }
  });

  // node_modules/typedarray.prototype.slice/index.js
  var require_typedarray_prototype = __commonJS({
    "node_modules/typedarray.prototype.slice/index.js"(exports, module) {
      "use strict";
      var define2 = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation4();
      var getPolyfill = require_polyfill2();
      var shim = require_shim2();
      var bound = callBind(getPolyfill());
      define2(bound, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = bound;
    }
  });

  // node_modules/traverse/index.js
  var require_traverse = __commonJS({
    "node_modules/traverse/index.js"(exports, module) {
      "use strict";
      var whichTypedArray = require_which_typed_array();
      var taSlice = require_typedarray_prototype();
      var gopd = require_gopd();
      function toS(obj) {
        return Object.prototype.toString.call(obj);
      }
      function isDate2(obj) {
        return toS(obj) === "[object Date]";
      }
      function isRegExp2(obj) {
        return toS(obj) === "[object RegExp]";
      }
      function isError(obj) {
        return toS(obj) === "[object Error]";
      }
      function isBoolean2(obj) {
        return toS(obj) === "[object Boolean]";
      }
      function isNumber2(obj) {
        return toS(obj) === "[object Number]";
      }
      function isString2(obj) {
        return toS(obj) === "[object String]";
      }
      var isArray2 = Array.isArray || function isArray3(xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
      function forEach(xs, fn) {
        if (xs.forEach) {
          return xs.forEach(fn);
        }
        for (var i = 0; i < xs.length; i++) {
          fn(xs[i], i, xs);
        }
        return void 0;
      }
      var objectKeys = Object.keys || function keys(obj) {
        var res = [];
        for (var key in obj) {
          res.push(key);
        }
        return res;
      };
      var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      function ownEnumerableKeys(obj) {
        var res = objectKeys(obj);
        if (getOwnPropertySymbols) {
          var symbols = getOwnPropertySymbols(obj);
          for (var i = 0; i < symbols.length; i++) {
            if (propertyIsEnumerable.call(obj, symbols[i])) {
              res.push(symbols[i]);
            }
          }
        }
        return res;
      }
      var hasOwnProperty2 = Object.prototype.hasOwnProperty || function(obj, key) {
        return key in obj;
      };
      function isWritable(object, key) {
        if (typeof gopd !== "function") {
          return true;
        }
        return !gopd(object, key).writable;
      }
      function copy(src, options) {
        if (typeof src === "object" && src !== null) {
          var dst;
          if (isArray2(src)) {
            dst = [];
          } else if (isDate2(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
          } else if (isRegExp2(src)) {
            dst = new RegExp(src);
          } else if (isError(src)) {
            dst = { message: src.message };
          } else if (isBoolean2(src) || isNumber2(src) || isString2(src)) {
            dst = Object(src);
          } else {
            var ta = whichTypedArray(src);
            if (ta) {
              return taSlice(src);
            } else if (Object.create && Object.getPrototypeOf) {
              dst = Object.create(Object.getPrototypeOf(src));
            } else if (src.constructor === Object) {
              dst = {};
            } else {
              var proto = src.constructor && src.constructor.prototype || src.__proto__ || {};
              var T = function T2() {
              };
              T.prototype = proto;
              dst = new T();
            }
          }
          var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
          forEach(iteratorFunction(src), function(key) {
            dst[key] = src[key];
          });
          return dst;
        }
        return src;
      }
      var emptyNull = { __proto__: null };
      function walk(root, cb) {
        var path = [];
        var parents = [];
        var alive = true;
        var options = arguments.length > 2 ? arguments[2] : emptyNull;
        var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
        var immutable = !!options.immutable;
        return function walker(node_) {
          var node = immutable ? copy(node_, options) : node_;
          var modifiers = {};
          var keepGoing = true;
          var state = {
            node,
            node_,
            path: [].concat(path),
            parent: parents[parents.length - 1],
            parents,
            key: path[path.length - 1],
            isRoot: path.length === 0,
            level: path.length,
            circular: null,
            update: function(x, stopHere) {
              if (!state.isRoot) {
                state.parent.node[state.key] = x;
              }
              state.node = x;
              if (stopHere) {
                keepGoing = false;
              }
            },
            delete: function(stopHere) {
              delete state.parent.node[state.key];
              if (stopHere) {
                keepGoing = false;
              }
            },
            remove: function(stopHere) {
              if (isArray2(state.parent.node)) {
                state.parent.node.splice(state.key, 1);
              } else {
                delete state.parent.node[state.key];
              }
              if (stopHere) {
                keepGoing = false;
              }
            },
            keys: null,
            before: function(f) {
              modifiers.before = f;
            },
            after: function(f) {
              modifiers.after = f;
            },
            pre: function(f) {
              modifiers.pre = f;
            },
            post: function(f) {
              modifiers.post = f;
            },
            stop: function() {
              alive = false;
            },
            block: function() {
              keepGoing = false;
            }
          };
          if (!alive) {
            return state;
          }
          function updateState() {
            if (typeof state.node === "object" && state.node !== null) {
              if (!state.keys || state.node_ !== state.node) {
                state.keys = iteratorFunction(state.node);
              }
              state.isLeaf = state.keys.length === 0;
              for (var i = 0; i < parents.length; i++) {
                if (parents[i].node_ === node_) {
                  state.circular = parents[i];
                  break;
                }
              }
            } else {
              state.isLeaf = true;
              state.keys = null;
            }
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
          }
          updateState();
          var ret = cb.call(state, state.node);
          if (ret !== void 0 && state.update) {
            state.update(ret);
          }
          if (modifiers.before) {
            modifiers.before.call(state, state.node);
          }
          if (!keepGoing) {
            return state;
          }
          if (typeof state.node === "object" && state.node !== null && !state.circular) {
            parents.push(state);
            updateState();
            forEach(state.keys, function(key, i) {
              path.push(key);
              if (modifiers.pre) {
                modifiers.pre.call(state, state.node[key], key);
              }
              var child = walker(state.node[key]);
              if (immutable && hasOwnProperty2.call(state.node, key) && !isWritable(state.node, key)) {
                state.node[key] = child.node;
              }
              child.isLast = i === state.keys.length - 1;
              child.isFirst = i === 0;
              if (modifiers.post) {
                modifiers.post.call(state, child);
              }
              path.pop();
            });
            parents.pop();
          }
          if (modifiers.after) {
            modifiers.after.call(state, state.node);
          }
          return state;
        }(root).node;
      }
      function Traverse(obj) {
        this.options = arguments.length > 1 ? arguments[1] : emptyNull;
        this.value = obj;
      }
      Traverse.prototype.get = function(ps) {
        var node = this.value;
        for (var i = 0; node && i < ps.length; i++) {
          var key = ps[i];
          if (!hasOwnProperty2.call(node, key) || !this.options.includeSymbols && typeof key === "symbol") {
            return void 0;
          }
          node = node[key];
        }
        return node;
      };
      Traverse.prototype.has = function(ps) {
        var node = this.value;
        for (var i = 0; node && i < ps.length; i++) {
          var key = ps[i];
          if (!hasOwnProperty2.call(node, key) || !this.options.includeSymbols && typeof key === "symbol") {
            return false;
          }
          node = node[key];
        }
        return true;
      };
      Traverse.prototype.set = function(ps, value) {
        var node = this.value;
        for (var i = 0; i < ps.length - 1; i++) {
          var key = ps[i];
          if (!hasOwnProperty2.call(node, key)) {
            node[key] = {};
          }
          node = node[key];
        }
        node[ps[i]] = value;
        return value;
      };
      Traverse.prototype.map = function(cb) {
        return walk(this.value, cb, { __proto__: null, immutable: true, includeSymbols: !!this.options.includeSymbols });
      };
      Traverse.prototype.forEach = function(cb) {
        this.value = walk(this.value, cb, this.options);
        return this.value;
      };
      Traverse.prototype.reduce = function(cb, init) {
        var skip = arguments.length === 1;
        var acc = skip ? this.value : init;
        this.forEach(function(x) {
          if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
          }
        });
        return acc;
      };
      Traverse.prototype.paths = function() {
        var acc = [];
        this.forEach(function() {
          acc.push(this.path);
        });
        return acc;
      };
      Traverse.prototype.nodes = function() {
        var acc = [];
        this.forEach(function() {
          acc.push(this.node);
        });
        return acc;
      };
      Traverse.prototype.clone = function() {
        var parents = [];
        var nodes = [];
        var options = this.options;
        if (whichTypedArray(this.value)) {
          return taSlice(this.value);
        }
        return function clone3(src) {
          for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
              return nodes[i];
            }
          }
          if (typeof src === "object" && src !== null) {
            var dst = copy(src, options);
            parents.push(src);
            nodes.push(dst);
            var iteratorFunction = options.includeSymbols ? ownEnumerableKeys : objectKeys;
            forEach(iteratorFunction(src), function(key) {
              dst[key] = clone3(src[key]);
            });
            parents.pop();
            nodes.pop();
            return dst;
          }
          return src;
        }(this.value);
      };
      function traverse(obj) {
        var options = arguments.length > 1 ? arguments[1] : emptyNull;
        return new Traverse(obj, options);
      }
      forEach(ownEnumerableKeys(Traverse.prototype), function(key) {
        traverse[key] = function(obj) {
          var args = [].slice.call(arguments, 1);
          var t = new Traverse(obj);
          return t[key].apply(t, args);
        };
      });
      module.exports = traverse;
    }
  });

  // node_modules/@mapbox/extent/index.js
  var require_extent = __commonJS({
    "node_modules/@mapbox/extent/index.js"(exports, module) {
      module.exports = Extent;
      function Extent(bbox) {
        if (!(this instanceof Extent)) {
          return new Extent(bbox);
        }
        this._bbox = bbox || [Infinity, Infinity, -Infinity, -Infinity];
        this._valid = !!bbox;
      }
      Extent.prototype.include = function(ll) {
        this._valid = true;
        this._bbox[0] = Math.min(this._bbox[0], ll[0]);
        this._bbox[1] = Math.min(this._bbox[1], ll[1]);
        this._bbox[2] = Math.max(this._bbox[2], ll[0]);
        this._bbox[3] = Math.max(this._bbox[3], ll[1]);
        return this;
      };
      Extent.prototype.equals = function(_) {
        var other;
        if (_ instanceof Extent) {
          other = _.bbox();
        } else {
          other = _;
        }
        return this._bbox[0] == other[0] && this._bbox[1] == other[1] && this._bbox[2] == other[2] && this._bbox[3] == other[3];
      };
      Extent.prototype.center = function(_) {
        if (!this._valid) return null;
        return [
          (this._bbox[0] + this._bbox[2]) / 2,
          (this._bbox[1] + this._bbox[3]) / 2
        ];
      };
      Extent.prototype.union = function(_) {
        this._valid = true;
        var other;
        if (_ instanceof Extent) {
          other = _.bbox();
        } else {
          other = _;
        }
        this._bbox[0] = Math.min(this._bbox[0], other[0]);
        this._bbox[1] = Math.min(this._bbox[1], other[1]);
        this._bbox[2] = Math.max(this._bbox[2], other[2]);
        this._bbox[3] = Math.max(this._bbox[3], other[3]);
        return this;
      };
      Extent.prototype.bbox = function() {
        if (!this._valid) return null;
        return this._bbox;
      };
      Extent.prototype.contains = function(ll) {
        if (!ll) return this._fastContains();
        if (!this._valid) return null;
        var lon = ll[0], lat = ll[1];
        return this._bbox[0] <= lon && this._bbox[1] <= lat && this._bbox[2] >= lon && this._bbox[3] >= lat;
      };
      Extent.prototype.intersect = function(_) {
        if (!this._valid) return null;
        var other;
        if (_ instanceof Extent) {
          other = _.bbox();
        } else {
          other = _;
        }
        return !(this._bbox[0] > other[2] || this._bbox[2] < other[0] || this._bbox[3] < other[1] || this._bbox[1] > other[3]);
      };
      Extent.prototype._fastContains = function() {
        if (!this._valid) return new Function("return null;");
        var body = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
        return new Function("ll", body);
      };
      Extent.prototype.polygon = function() {
        if (!this._valid) return null;
        return {
          type: "Polygon",
          coordinates: [
            [
              // W, S
              [this._bbox[0], this._bbox[1]],
              // E, S
              [this._bbox[2], this._bbox[1]],
              // E, N
              [this._bbox[2], this._bbox[3]],
              // W, N
              [this._bbox[0], this._bbox[3]],
              // W, S
              [this._bbox[0], this._bbox[1]]
            ]
          ]
        };
      };
    }
  });

  // node_modules/@mapbox/geojson-extent/index.js
  var require_geojson_extent = __commonJS({
    "node_modules/@mapbox/geojson-extent/index.js"(exports, module) {
      var geojsonCoords = require_geojson_coords();
      var traverse = require_traverse();
      var extent2 = require_extent();
      var geojsonTypesByDataAttributes = {
        features: ["FeatureCollection"],
        coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"],
        geometry: ["Feature"],
        geometries: ["GeometryCollection"]
      };
      var dataAttributes = Object.keys(geojsonTypesByDataAttributes);
      module.exports = function(_) {
        return getExtent(_).bbox();
      };
      module.exports.polygon = function(_) {
        return getExtent(_).polygon();
      };
      module.exports.bboxify = function(_) {
        return traverse(_).map(function(value) {
          if (!value) return;
          var isValid = dataAttributes.some(function(attribute) {
            if (value[attribute]) {
              return geojsonTypesByDataAttributes[attribute].indexOf(value.type) !== -1;
            }
            return false;
          });
          if (isValid) {
            value.bbox = getExtent(value).bbox();
            this.update(value);
          }
        });
      };
      function getExtent(_) {
        var ext = extent2(), coords = geojsonCoords(_);
        for (var i = 0; i < coords.length; i++) ext.include(coords[i]);
        return ext;
      }
    }
  });

  // node_modules/typed-function/typed-function.js
  var require_typed_function = __commonJS({
    "node_modules/typed-function/typed-function.js"(exports, module) {
      "use strict";
      (function(root, factory2) {
        if (typeof define === "function" && define.amd) {
          define([], factory2);
        } else if (typeof exports === "object") {
          module.exports = factory2();
        } else {
          root.typed = factory2();
        }
      })(exports, function() {
        function ok() {
          return true;
        }
        function notOk() {
          return false;
        }
        function undef() {
          return void 0;
        }
        function create() {
          var _types = [
            { name: "number", test: function(x) {
              return typeof x === "number";
            } },
            { name: "string", test: function(x) {
              return typeof x === "string";
            } },
            { name: "boolean", test: function(x) {
              return typeof x === "boolean";
            } },
            { name: "Function", test: function(x) {
              return typeof x === "function";
            } },
            { name: "Array", test: Array.isArray },
            { name: "Date", test: function(x) {
              return x instanceof Date;
            } },
            { name: "RegExp", test: function(x) {
              return x instanceof RegExp;
            } },
            { name: "Object", test: function(x) {
              return typeof x === "object" && x !== null && x.constructor === Object;
            } },
            { name: "null", test: function(x) {
              return x === null;
            } },
            { name: "undefined", test: function(x) {
              return x === void 0;
            } }
          ];
          var anyType = {
            name: "any",
            test: ok
          };
          var _ignore = [];
          var _conversions = [];
          var typed2 = {
            types: _types,
            conversions: _conversions,
            ignore: _ignore
          };
          function findTypeByName(typeName) {
            var entry = findInArray(typed2.types, function(entry2) {
              return entry2.name === typeName;
            });
            if (entry) {
              return entry;
            }
            if (typeName === "any") {
              return anyType;
            }
            var hint = findInArray(typed2.types, function(entry2) {
              return entry2.name.toLowerCase() === typeName.toLowerCase();
            });
            throw new TypeError('Unknown type "' + typeName + '"' + (hint ? '. Did you mean "' + hint.name + '"?' : ""));
          }
          function findTypeIndex(type) {
            if (type === anyType) {
              return 999;
            }
            return typed2.types.indexOf(type);
          }
          function findTypeName(value) {
            var entry = findInArray(typed2.types, function(entry2) {
              return entry2.test(value);
            });
            if (entry) {
              return entry.name;
            }
            throw new TypeError("Value has unknown type. Value: " + value);
          }
          function find(fn, signature) {
            if (!fn.signatures) {
              throw new TypeError("Function is no typed-function");
            }
            var arr;
            if (typeof signature === "string") {
              arr = signature.split(",");
              for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim();
              }
            } else if (Array.isArray(signature)) {
              arr = signature;
            } else {
              throw new TypeError("String array or a comma separated string expected");
            }
            var str = arr.join(",");
            var match = fn.signatures[str];
            if (match) {
              return match;
            }
            throw new TypeError("Signature not found (signature: " + (fn.name || "unnamed") + "(" + arr.join(", ") + "))");
          }
          function convert(value, type) {
            var from = findTypeName(value);
            if (type === from) {
              return value;
            }
            for (var i = 0; i < typed2.conversions.length; i++) {
              var conversion = typed2.conversions[i];
              if (conversion.from === from && conversion.to === type) {
                return conversion.convert(value);
              }
            }
            throw new Error("Cannot convert from " + from + " to " + type);
          }
          function stringifyParams(params) {
            return params.map(function(param) {
              var typeNames = param.types.map(getTypeName);
              return (param.restParam ? "..." : "") + typeNames.join("|");
            }).join(",");
          }
          function parseParam(param, conversions) {
            var restParam = param.indexOf("...") === 0;
            var types2 = !restParam ? param : param.length > 3 ? param.slice(3) : "any";
            var typeNames = types2.split("|").map(trim).filter(notEmpty).filter(notIgnore);
            var matchingConversions = filterConversions(conversions, typeNames);
            var exactTypes = typeNames.map(function(typeName) {
              var type = findTypeByName(typeName);
              return {
                name: typeName,
                typeIndex: findTypeIndex(type),
                test: type.test,
                conversion: null,
                conversionIndex: -1
              };
            });
            var convertibleTypes = matchingConversions.map(function(conversion) {
              var type = findTypeByName(conversion.from);
              return {
                name: conversion.from,
                typeIndex: findTypeIndex(type),
                test: type.test,
                conversion,
                conversionIndex: conversions.indexOf(conversion)
              };
            });
            return {
              types: exactTypes.concat(convertibleTypes),
              restParam
            };
          }
          function parseSignature(signature, fn, conversions) {
            var params = [];
            if (signature.trim() !== "") {
              params = signature.split(",").map(trim).map(function(param, index, array) {
                var parsedParam = parseParam(param, conversions);
                if (parsedParam.restParam && index !== array.length - 1) {
                  throw new SyntaxError('Unexpected rest parameter "' + param + '": only allowed for the last parameter');
                }
                return parsedParam;
              });
            }
            if (params.some(isInvalidParam)) {
              return null;
            }
            return {
              params,
              fn
            };
          }
          function hasRestParam(params) {
            var param = last(params);
            return param ? param.restParam : false;
          }
          function hasConversions(param) {
            return param.types.some(function(type) {
              return type.conversion != null;
            });
          }
          function compileTest(param) {
            if (!param || param.types.length === 0) {
              return ok;
            } else if (param.types.length === 1) {
              return findTypeByName(param.types[0].name).test;
            } else if (param.types.length === 2) {
              var test0 = findTypeByName(param.types[0].name).test;
              var test1 = findTypeByName(param.types[1].name).test;
              return function or(x) {
                return test0(x) || test1(x);
              };
            } else {
              var tests = param.types.map(function(type) {
                return findTypeByName(type.name).test;
              });
              return function or(x) {
                for (var i = 0; i < tests.length; i++) {
                  if (tests[i](x)) {
                    return true;
                  }
                }
                return false;
              };
            }
          }
          function compileTests(params) {
            var tests, test0, test1;
            if (hasRestParam(params)) {
              tests = initial(params).map(compileTest);
              var varIndex = tests.length;
              var lastTest = compileTest(last(params));
              var testRestParam = function(args) {
                for (var i = varIndex; i < args.length; i++) {
                  if (!lastTest(args[i])) {
                    return false;
                  }
                }
                return true;
              };
              return function testArgs(args) {
                for (var i = 0; i < tests.length; i++) {
                  if (!tests[i](args[i])) {
                    return false;
                  }
                }
                return testRestParam(args) && args.length >= varIndex + 1;
              };
            } else {
              if (params.length === 0) {
                return function testArgs(args) {
                  return args.length === 0;
                };
              } else if (params.length === 1) {
                test0 = compileTest(params[0]);
                return function testArgs(args) {
                  return test0(args[0]) && args.length === 1;
                };
              } else if (params.length === 2) {
                test0 = compileTest(params[0]);
                test1 = compileTest(params[1]);
                return function testArgs(args) {
                  return test0(args[0]) && test1(args[1]) && args.length === 2;
                };
              } else {
                tests = params.map(compileTest);
                return function testArgs(args) {
                  for (var i = 0; i < tests.length; i++) {
                    if (!tests[i](args[i])) {
                      return false;
                    }
                  }
                  return args.length === tests.length;
                };
              }
            }
          }
          function getParamAtIndex(signature, index) {
            return index < signature.params.length ? signature.params[index] : hasRestParam(signature.params) ? last(signature.params) : null;
          }
          function getExpectedTypeNames(signature, index, excludeConversions) {
            var param = getParamAtIndex(signature, index);
            var types2 = param ? excludeConversions ? param.types.filter(isExactType) : param.types : [];
            return types2.map(getTypeName);
          }
          function getTypeName(type) {
            return type.name;
          }
          function isExactType(type) {
            return type.conversion === null || type.conversion === void 0;
          }
          function mergeExpectedParams(signatures, index) {
            var typeNames = uniq(flatMap(signatures, function(signature) {
              return getExpectedTypeNames(signature, index, false);
            }));
            return typeNames.indexOf("any") !== -1 ? ["any"] : typeNames;
          }
          function createError(name28, args, signatures) {
            var err, expected;
            var _name = name28 || "unnamed";
            var matchingSignatures = signatures;
            var index;
            for (index = 0; index < args.length; index++) {
              var nextMatchingDefs = matchingSignatures.filter(function(signature) {
                var test = compileTest(getParamAtIndex(signature, index));
                return (index < signature.params.length || hasRestParam(signature.params)) && test(args[index]);
              });
              if (nextMatchingDefs.length === 0) {
                expected = mergeExpectedParams(matchingSignatures, index);
                if (expected.length > 0) {
                  var actualType = findTypeName(args[index]);
                  err = new TypeError("Unexpected type of argument in function " + _name + " (expected: " + expected.join(" or ") + ", actual: " + actualType + ", index: " + index + ")");
                  err.data = {
                    category: "wrongType",
                    fn: _name,
                    index,
                    actual: actualType,
                    expected
                  };
                  return err;
                }
              } else {
                matchingSignatures = nextMatchingDefs;
              }
            }
            var lengths = matchingSignatures.map(function(signature) {
              return hasRestParam(signature.params) ? Infinity : signature.params.length;
            });
            if (args.length < Math.min.apply(null, lengths)) {
              expected = mergeExpectedParams(matchingSignatures, index);
              err = new TypeError("Too few arguments in function " + _name + " (expected: " + expected.join(" or ") + ", index: " + args.length + ")");
              err.data = {
                category: "tooFewArgs",
                fn: _name,
                index: args.length,
                expected
              };
              return err;
            }
            var maxLength = Math.max.apply(null, lengths);
            if (args.length > maxLength) {
              err = new TypeError("Too many arguments in function " + _name + " (expected: " + maxLength + ", actual: " + args.length + ")");
              err.data = {
                category: "tooManyArgs",
                fn: _name,
                index: args.length,
                expectedLength: maxLength
              };
              return err;
            }
            err = new TypeError('Arguments of type "' + args.join(", ") + '" do not match any of the defined signatures of function ' + _name + ".");
            err.data = {
              category: "mismatch",
              actual: args.map(findTypeName)
            };
            return err;
          }
          function getLowestTypeIndex(param) {
            var min2 = 999;
            for (var i = 0; i < param.types.length; i++) {
              if (isExactType(param.types[i])) {
                min2 = Math.min(min2, param.types[i].typeIndex);
              }
            }
            return min2;
          }
          function getLowestConversionIndex(param) {
            var min2 = 999;
            for (var i = 0; i < param.types.length; i++) {
              if (!isExactType(param.types[i])) {
                min2 = Math.min(min2, param.types[i].conversionIndex);
              }
            }
            return min2;
          }
          function compareParams(param1, param2) {
            var c;
            c = param1.restParam - param2.restParam;
            if (c !== 0) {
              return c;
            }
            c = hasConversions(param1) - hasConversions(param2);
            if (c !== 0) {
              return c;
            }
            c = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
            if (c !== 0) {
              return c;
            }
            return getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
          }
          function compareSignatures(signature1, signature2) {
            var len = Math.min(signature1.params.length, signature2.params.length);
            var i;
            var c;
            c = signature1.params.some(hasConversions) - signature2.params.some(hasConversions);
            if (c !== 0) {
              return c;
            }
            for (i = 0; i < len; i++) {
              c = hasConversions(signature1.params[i]) - hasConversions(signature2.params[i]);
              if (c !== 0) {
                return c;
              }
            }
            for (i = 0; i < len; i++) {
              c = compareParams(signature1.params[i], signature2.params[i]);
              if (c !== 0) {
                return c;
              }
            }
            return signature1.params.length - signature2.params.length;
          }
          function filterConversions(conversions, typeNames) {
            var matches = {};
            conversions.forEach(function(conversion) {
              if (typeNames.indexOf(conversion.from) === -1 && typeNames.indexOf(conversion.to) !== -1 && !matches[conversion.from]) {
                matches[conversion.from] = conversion;
              }
            });
            return Object.keys(matches).map(function(from) {
              return matches[from];
            });
          }
          function compileArgsPreprocessing(params, fn) {
            var fnConvert = fn;
            if (params.some(hasConversions)) {
              var restParam = hasRestParam(params);
              var compiledConversions = params.map(compileArgConversion);
              fnConvert = function convertArgs() {
                var args = [];
                var last2 = restParam ? arguments.length - 1 : arguments.length;
                for (var i = 0; i < last2; i++) {
                  args[i] = compiledConversions[i](arguments[i]);
                }
                if (restParam) {
                  args[last2] = arguments[last2].map(compiledConversions[last2]);
                }
                return fn.apply(this, args);
              };
            }
            var fnPreprocess = fnConvert;
            if (hasRestParam(params)) {
              var offset = params.length - 1;
              fnPreprocess = function preprocessRestParams() {
                return fnConvert.apply(
                  this,
                  slice(arguments, 0, offset).concat([slice(arguments, offset)])
                );
              };
            }
            return fnPreprocess;
          }
          function compileArgConversion(param) {
            var test0, test1, conversion0, conversion1;
            var tests = [];
            var conversions = [];
            param.types.forEach(function(type) {
              if (type.conversion) {
                tests.push(findTypeByName(type.conversion.from).test);
                conversions.push(type.conversion.convert);
              }
            });
            switch (conversions.length) {
              case 0:
                return function convertArg(arg) {
                  return arg;
                };
              case 1:
                test0 = tests[0];
                conversion0 = conversions[0];
                return function convertArg(arg) {
                  if (test0(arg)) {
                    return conversion0(arg);
                  }
                  return arg;
                };
              case 2:
                test0 = tests[0];
                test1 = tests[1];
                conversion0 = conversions[0];
                conversion1 = conversions[1];
                return function convertArg(arg) {
                  if (test0(arg)) {
                    return conversion0(arg);
                  }
                  if (test1(arg)) {
                    return conversion1(arg);
                  }
                  return arg;
                };
              default:
                return function convertArg(arg) {
                  for (var i = 0; i < conversions.length; i++) {
                    if (tests[i](arg)) {
                      return conversions[i](arg);
                    }
                  }
                  return arg;
                };
            }
          }
          function createSignaturesMap(signatures) {
            var signaturesMap = {};
            signatures.forEach(function(signature) {
              if (!signature.params.some(hasConversions)) {
                splitParams(signature.params, true).forEach(function(params) {
                  signaturesMap[stringifyParams(params)] = signature.fn;
                });
              }
            });
            return signaturesMap;
          }
          function splitParams(params, ignoreConversionTypes) {
            function _splitParams(params2, index, types2) {
              if (index < params2.length) {
                var param = params2[index];
                var filteredTypes = ignoreConversionTypes ? param.types.filter(isExactType) : param.types;
                var typeGroups;
                if (param.restParam) {
                  var exactTypes = filteredTypes.filter(isExactType);
                  typeGroups = exactTypes.length < filteredTypes.length ? [exactTypes, filteredTypes] : [filteredTypes];
                } else {
                  typeGroups = filteredTypes.map(function(type) {
                    return [type];
                  });
                }
                return flatMap(typeGroups, function(typeGroup) {
                  return _splitParams(params2, index + 1, types2.concat([typeGroup]));
                });
              } else {
                var splittedParams = types2.map(function(type, typeIndex) {
                  return {
                    types: type,
                    restParam: typeIndex === params2.length - 1 && hasRestParam(params2)
                  };
                });
                return [splittedParams];
              }
            }
            return _splitParams(params, 0, []);
          }
          function hasConflictingParams(signature1, signature2) {
            var ii = Math.max(signature1.params.length, signature2.params.length);
            for (var i = 0; i < ii; i++) {
              var typesNames1 = getExpectedTypeNames(signature1, i, true);
              var typesNames2 = getExpectedTypeNames(signature2, i, true);
              if (!hasOverlap(typesNames1, typesNames2)) {
                return false;
              }
            }
            var len1 = signature1.params.length;
            var len2 = signature2.params.length;
            var restParam1 = hasRestParam(signature1.params);
            var restParam2 = hasRestParam(signature2.params);
            return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
          }
          function createTypedFunction(name28, signaturesMap) {
            if (Object.keys(signaturesMap).length === 0) {
              throw new SyntaxError("No signatures provided");
            }
            var parsedSignatures = [];
            Object.keys(signaturesMap).map(function(signature) {
              return parseSignature(signature, signaturesMap[signature], typed2.conversions);
            }).filter(notNull).forEach(function(parsedSignature) {
              var conflictingSignature = findInArray(parsedSignatures, function(s) {
                return hasConflictingParams(s, parsedSignature);
              });
              if (conflictingSignature) {
                throw new TypeError('Conflicting signatures "' + stringifyParams(conflictingSignature.params) + '" and "' + stringifyParams(parsedSignature.params) + '".');
              }
              parsedSignatures.push(parsedSignature);
            });
            var signatures = flatMap(parsedSignatures, function(parsedSignature) {
              var params = parsedSignature ? splitParams(parsedSignature.params, false) : [];
              return params.map(function(params2) {
                return {
                  params: params2,
                  fn: parsedSignature.fn
                };
              });
            }).filter(notNull);
            signatures.sort(compareSignatures);
            var ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
            var ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
            var ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
            var ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
            var ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
            var ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
            var allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;
            var tests = signatures.map(function(signature) {
              return compileTests(signature.params);
            });
            var test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
            var test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
            var test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
            var test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
            var test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
            var test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
            var test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
            var test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
            var test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
            var test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
            var test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
            var test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;
            var fns = signatures.map(function(signature) {
              return compileArgsPreprocessing(signature.params, signature.fn);
            });
            var fn0 = ok0 ? fns[0] : undef;
            var fn1 = ok1 ? fns[1] : undef;
            var fn2 = ok2 ? fns[2] : undef;
            var fn3 = ok3 ? fns[3] : undef;
            var fn4 = ok4 ? fns[4] : undef;
            var fn5 = ok5 ? fns[5] : undef;
            var len0 = ok0 ? signatures[0].params.length : -1;
            var len1 = ok1 ? signatures[1].params.length : -1;
            var len2 = ok2 ? signatures[2].params.length : -1;
            var len3 = ok3 ? signatures[3].params.length : -1;
            var len4 = ok4 ? signatures[4].params.length : -1;
            var len5 = ok5 ? signatures[5].params.length : -1;
            var iStart = allOk ? 6 : 0;
            var iEnd = signatures.length;
            var generic = function generic2() {
              "use strict";
              for (var i = iStart; i < iEnd; i++) {
                if (tests[i](arguments)) {
                  return fns[i].apply(this, arguments);
                }
              }
              return typed2.onMismatch(name28, arguments, signatures);
            };
            var fn = function fn6(arg0, arg1) {
              "use strict";
              if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
                return fn0.apply(fn6, arguments);
              }
              if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
                return fn1.apply(fn6, arguments);
              }
              if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
                return fn2.apply(fn6, arguments);
              }
              if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
                return fn3.apply(fn6, arguments);
              }
              if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
                return fn4.apply(fn6, arguments);
              }
              if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
                return fn5.apply(fn6, arguments);
              }
              return generic.apply(fn6, arguments);
            };
            try {
              Object.defineProperty(fn, "name", { value: name28 });
            } catch (err) {
            }
            fn.signatures = createSignaturesMap(signatures);
            return fn;
          }
          function _onMismatch(name28, args, signatures) {
            throw createError(name28, args, signatures);
          }
          function notIgnore(typeName) {
            return typed2.ignore.indexOf(typeName) === -1;
          }
          function trim(str) {
            return str.trim();
          }
          function notEmpty(str) {
            return !!str;
          }
          function notNull(value) {
            return value !== null;
          }
          function isInvalidParam(param) {
            return param.types.length === 0;
          }
          function initial(arr) {
            return arr.slice(0, arr.length - 1);
          }
          function last(arr) {
            return arr[arr.length - 1];
          }
          function slice(arr, start, end) {
            return Array.prototype.slice.call(arr, start, end);
          }
          function contains(array, item) {
            return array.indexOf(item) !== -1;
          }
          function hasOverlap(array1, array2) {
            for (var i = 0; i < array1.length; i++) {
              if (contains(array2, array1[i])) {
                return true;
              }
            }
            return false;
          }
          function findInArray(arr, test) {
            for (var i = 0; i < arr.length; i++) {
              if (test(arr[i])) {
                return arr[i];
              }
            }
            return void 0;
          }
          function uniq(arr) {
            var entries = {};
            for (var i = 0; i < arr.length; i++) {
              entries[arr[i]] = true;
            }
            return Object.keys(entries);
          }
          function flatMap(arr, callback) {
            return Array.prototype.concat.apply([], arr.map(callback));
          }
          function getName(fns) {
            var name28 = "";
            for (var i = 0; i < fns.length; i++) {
              var fn = fns[i];
              if ((typeof fn.signatures === "object" || typeof fn.signature === "string") && fn.name !== "") {
                if (name28 === "") {
                  name28 = fn.name;
                } else if (name28 !== fn.name) {
                  var err = new Error("Function names do not match (expected: " + name28 + ", actual: " + fn.name + ")");
                  err.data = {
                    actual: fn.name,
                    expected: name28
                  };
                  throw err;
                }
              }
            }
            return name28;
          }
          function extractSignatures(fns) {
            var err;
            var signaturesMap = {};
            function validateUnique(_signature, _fn) {
              if (signaturesMap.hasOwnProperty(_signature) && _fn !== signaturesMap[_signature]) {
                err = new Error('Signature "' + _signature + '" is defined twice');
                err.data = { signature: _signature };
                throw err;
              }
            }
            for (var i = 0; i < fns.length; i++) {
              var fn = fns[i];
              if (typeof fn.signatures === "object") {
                for (var signature in fn.signatures) {
                  if (fn.signatures.hasOwnProperty(signature)) {
                    validateUnique(signature, fn.signatures[signature]);
                    signaturesMap[signature] = fn.signatures[signature];
                  }
                }
              } else if (typeof fn.signature === "string") {
                validateUnique(fn.signature, fn);
                signaturesMap[fn.signature] = fn;
              } else {
                err = new TypeError("Function is no typed-function (index: " + i + ")");
                err.data = { index: i };
                throw err;
              }
            }
            return signaturesMap;
          }
          typed2 = createTypedFunction("typed", {
            "string, Object": createTypedFunction,
            "Object": function(signaturesMap) {
              var fns = [];
              for (var signature in signaturesMap) {
                if (signaturesMap.hasOwnProperty(signature)) {
                  fns.push(signaturesMap[signature]);
                }
              }
              var name28 = getName(fns);
              return createTypedFunction(name28, signaturesMap);
            },
            "...Function": function(fns) {
              return createTypedFunction(getName(fns), extractSignatures(fns));
            },
            "string, ...Function": function(name28, fns) {
              return createTypedFunction(name28, extractSignatures(fns));
            }
          });
          typed2.create = create;
          typed2.types = _types;
          typed2.conversions = _conversions;
          typed2.ignore = _ignore;
          typed2.onMismatch = _onMismatch;
          typed2.throwMismatchError = _onMismatch;
          typed2.createError = createError;
          typed2.convert = convert;
          typed2.find = find;
          typed2.addType = function(type, beforeObjectTest) {
            if (!type || typeof type.name !== "string" || typeof type.test !== "function") {
              throw new TypeError("Object with properties {name: string, test: function} expected");
            }
            if (beforeObjectTest !== false) {
              for (var i = 0; i < typed2.types.length; i++) {
                if (typed2.types[i].name === "Object") {
                  typed2.types.splice(i, 0, type);
                  return;
                }
              }
            }
            typed2.types.push(type);
          };
          typed2.addConversion = function(conversion) {
            if (!conversion || typeof conversion.from !== "string" || typeof conversion.to !== "string" || typeof conversion.convert !== "function") {
              throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
            }
            typed2.conversions.push(conversion);
          };
          return typed2;
        }
        return create();
      });
    }
  });

  // node_modules/complex.js/complex.js
  var require_complex = __commonJS({
    "node_modules/complex.js/complex.js"(exports, module) {
      (function(root) {
        "use strict";
        var cosh2 = Math.cosh || function(x) {
          return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
        };
        var sinh2 = Math.sinh || function(x) {
          return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
        };
        var cosm1 = function(x) {
          var b = Math.PI / 4;
          if (-b > x || x > b) {
            return Math.cos(x) - 1;
          }
          var xx = x * x;
          return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
        };
        var hypot2 = function(x, y) {
          var a = Math.abs(x);
          var b = Math.abs(y);
          if (a < 3e3 && b < 3e3) {
            return Math.sqrt(a * a + b * b);
          }
          if (a < b) {
            a = b;
            b = x / y;
          } else {
            b = y / x;
          }
          return a * Math.sqrt(1 + b * b);
        };
        var parser_exit = function() {
          throw SyntaxError("Invalid Param");
        };
        function logHypot(a, b) {
          var _a = Math.abs(a);
          var _b = Math.abs(b);
          if (a === 0) {
            return Math.log(_b);
          }
          if (b === 0) {
            return Math.log(_a);
          }
          if (_a < 3e3 && _b < 3e3) {
            return Math.log(a * a + b * b) * 0.5;
          }
          a = a / 2;
          b = b / 2;
          return 0.5 * Math.log(a * a + b * b) + Math.LN2;
        }
        var parse2 = function(a, b) {
          var z = { "re": 0, "im": 0 };
          if (a === void 0 || a === null) {
            z["re"] = z["im"] = 0;
          } else if (b !== void 0) {
            z["re"] = a;
            z["im"] = b;
          } else
            switch (typeof a) {
              case "object":
                if ("im" in a && "re" in a) {
                  z["re"] = a["re"];
                  z["im"] = a["im"];
                } else if ("abs" in a && "arg" in a) {
                  if (!Number.isFinite(a["abs"]) && Number.isFinite(a["arg"])) {
                    return Complex3["INFINITY"];
                  }
                  z["re"] = a["abs"] * Math.cos(a["arg"]);
                  z["im"] = a["abs"] * Math.sin(a["arg"]);
                } else if ("r" in a && "phi" in a) {
                  if (!Number.isFinite(a["r"]) && Number.isFinite(a["phi"])) {
                    return Complex3["INFINITY"];
                  }
                  z["re"] = a["r"] * Math.cos(a["phi"]);
                  z["im"] = a["r"] * Math.sin(a["phi"]);
                } else if (a.length === 2) {
                  z["re"] = a[0];
                  z["im"] = a[1];
                } else {
                  parser_exit();
                }
                break;
              case "string":
                z["im"] = /* void */
                z["re"] = 0;
                var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
                var plus = 1;
                var minus = 0;
                if (tokens === null) {
                  parser_exit();
                }
                for (var i = 0; i < tokens.length; i++) {
                  var c = tokens[i];
                  if (c === " " || c === "	" || c === "\n") {
                  } else if (c === "+") {
                    plus++;
                  } else if (c === "-") {
                    minus++;
                  } else if (c === "i" || c === "I") {
                    if (plus + minus === 0) {
                      parser_exit();
                    }
                    if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1])) {
                      z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
                      i++;
                    } else {
                      z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
                    }
                    plus = minus = 0;
                  } else {
                    if (plus + minus === 0 || isNaN(c)) {
                      parser_exit();
                    }
                    if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
                      z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
                      i++;
                    } else {
                      z["re"] += parseFloat((minus % 2 ? "-" : "") + c);
                    }
                    plus = minus = 0;
                  }
                }
                if (plus + minus > 0) {
                  parser_exit();
                }
                break;
              case "number":
                z["im"] = 0;
                z["re"] = a;
                break;
              default:
                parser_exit();
            }
          if (isNaN(z["re"]) || isNaN(z["im"])) {
          }
          return z;
        };
        function Complex3(a, b) {
          if (!(this instanceof Complex3)) {
            return new Complex3(a, b);
          }
          var z = parse2(a, b);
          this["re"] = z["re"];
          this["im"] = z["im"];
        }
        Complex3.prototype = {
          "re": 0,
          "im": 0,
          /**
           * Calculates the sign of a complex number, which is a normalized complex
           *
           * @returns {Complex}
           */
          "sign": function() {
            var abs3 = this["abs"]();
            return new Complex3(
              this["re"] / abs3,
              this["im"] / abs3
            );
          },
          /**
           * Adds two complex numbers
           *
           * @returns {Complex}
           */
          "add": function(a, b) {
            var z = new Complex3(a, b);
            if (this["isInfinite"]() && z["isInfinite"]()) {
              return Complex3["NAN"];
            }
            if (this["isInfinite"]() || z["isInfinite"]()) {
              return Complex3["INFINITY"];
            }
            return new Complex3(
              this["re"] + z["re"],
              this["im"] + z["im"]
            );
          },
          /**
           * Subtracts two complex numbers
           *
           * @returns {Complex}
           */
          "sub": function(a, b) {
            var z = new Complex3(a, b);
            if (this["isInfinite"]() && z["isInfinite"]()) {
              return Complex3["NAN"];
            }
            if (this["isInfinite"]() || z["isInfinite"]()) {
              return Complex3["INFINITY"];
            }
            return new Complex3(
              this["re"] - z["re"],
              this["im"] - z["im"]
            );
          },
          /**
           * Multiplies two complex numbers
           *
           * @returns {Complex}
           */
          "mul": function(a, b) {
            var z = new Complex3(a, b);
            if (this["isInfinite"]() && z["isZero"]() || this["isZero"]() && z["isInfinite"]()) {
              return Complex3["NAN"];
            }
            if (this["isInfinite"]() || z["isInfinite"]()) {
              return Complex3["INFINITY"];
            }
            if (z["im"] === 0 && this["im"] === 0) {
              return new Complex3(this["re"] * z["re"], 0);
            }
            return new Complex3(
              this["re"] * z["re"] - this["im"] * z["im"],
              this["re"] * z["im"] + this["im"] * z["re"]
            );
          },
          /**
           * Divides two complex numbers
           *
           * @returns {Complex}
           */
          "div": function(a, b) {
            var z = new Complex3(a, b);
            if (this["isZero"]() && z["isZero"]() || this["isInfinite"]() && z["isInfinite"]()) {
              return Complex3["NAN"];
            }
            if (this["isInfinite"]() || z["isZero"]()) {
              return Complex3["INFINITY"];
            }
            if (this["isZero"]() || z["isInfinite"]()) {
              return Complex3["ZERO"];
            }
            a = this["re"];
            b = this["im"];
            var c = z["re"];
            var d = z["im"];
            var t, x;
            if (0 === d) {
              return new Complex3(a / c, b / c);
            }
            if (Math.abs(c) < Math.abs(d)) {
              x = c / d;
              t = c * x + d;
              return new Complex3(
                (a * x + b) / t,
                (b * x - a) / t
              );
            } else {
              x = d / c;
              t = d * x + c;
              return new Complex3(
                (a + b * x) / t,
                (b - a * x) / t
              );
            }
          },
          /**
           * Calculate the power of two complex numbers
           *
           * @returns {Complex}
           */
          "pow": function(a, b) {
            var z = new Complex3(a, b);
            a = this["re"];
            b = this["im"];
            if (z["isZero"]()) {
              return Complex3["ONE"];
            }
            if (z["im"] === 0) {
              if (b === 0 && a > 0) {
                return new Complex3(Math.pow(a, z["re"]), 0);
              } else if (a === 0) {
                switch ((z["re"] % 4 + 4) % 4) {
                  case 0:
                    return new Complex3(Math.pow(b, z["re"]), 0);
                  case 1:
                    return new Complex3(0, Math.pow(b, z["re"]));
                  case 2:
                    return new Complex3(-Math.pow(b, z["re"]), 0);
                  case 3:
                    return new Complex3(0, -Math.pow(b, z["re"]));
                }
              }
            }
            if (a === 0 && b === 0 && z["re"] > 0 && z["im"] >= 0) {
              return Complex3["ZERO"];
            }
            var arg = Math.atan2(b, a);
            var loh = logHypot(a, b);
            a = Math.exp(z["re"] * loh - z["im"] * arg);
            b = z["im"] * loh + z["re"] * arg;
            return new Complex3(
              a * Math.cos(b),
              a * Math.sin(b)
            );
          },
          /**
           * Calculate the complex square root
           *
           * @returns {Complex}
           */
          "sqrt": function() {
            var a = this["re"];
            var b = this["im"];
            var r = this["abs"]();
            var re, im;
            if (a >= 0) {
              if (b === 0) {
                return new Complex3(Math.sqrt(a), 0);
              }
              re = 0.5 * Math.sqrt(2 * (r + a));
            } else {
              re = Math.abs(b) / Math.sqrt(2 * (r - a));
            }
            if (a <= 0) {
              im = 0.5 * Math.sqrt(2 * (r - a));
            } else {
              im = Math.abs(b) / Math.sqrt(2 * (r + a));
            }
            return new Complex3(re, b < 0 ? -im : im);
          },
          /**
           * Calculate the complex exponent
           *
           * @returns {Complex}
           */
          "exp": function() {
            var tmp = Math.exp(this["re"]);
            if (this["im"] === 0) {
            }
            return new Complex3(
              tmp * Math.cos(this["im"]),
              tmp * Math.sin(this["im"])
            );
          },
          /**
           * Calculate the complex exponent and subtracts one.
           *
           * This may be more accurate than `Complex(x).exp().sub(1)` if
           * `x` is small.
           *
           * @returns {Complex}
           */
          "expm1": function() {
            var a = this["re"];
            var b = this["im"];
            return new Complex3(
              Math.expm1(a) * Math.cos(b) + cosm1(b),
              Math.exp(a) * Math.sin(b)
            );
          },
          /**
           * Calculate the natural log
           *
           * @returns {Complex}
           */
          "log": function() {
            var a = this["re"];
            var b = this["im"];
            if (b === 0 && a > 0) {
            }
            return new Complex3(
              logHypot(a, b),
              Math.atan2(b, a)
            );
          },
          /**
           * Calculate the magnitude of the complex number
           *
           * @returns {number}
           */
          "abs": function() {
            return hypot2(this["re"], this["im"]);
          },
          /**
           * Calculate the angle of the complex number
           *
           * @returns {number}
           */
          "arg": function() {
            return Math.atan2(this["im"], this["re"]);
          },
          /**
           * Calculate the sine of the complex number
           *
           * @returns {Complex}
           */
          "sin": function() {
            var a = this["re"];
            var b = this["im"];
            return new Complex3(
              Math.sin(a) * cosh2(b),
              Math.cos(a) * sinh2(b)
            );
          },
          /**
           * Calculate the cosine
           *
           * @returns {Complex}
           */
          "cos": function() {
            var a = this["re"];
            var b = this["im"];
            return new Complex3(
              Math.cos(a) * cosh2(b),
              -Math.sin(a) * sinh2(b)
            );
          },
          /**
           * Calculate the tangent
           *
           * @returns {Complex}
           */
          "tan": function() {
            var a = 2 * this["re"];
            var b = 2 * this["im"];
            var d = Math.cos(a) + cosh2(b);
            return new Complex3(
              Math.sin(a) / d,
              sinh2(b) / d
            );
          },
          /**
           * Calculate the cotangent
           *
           * @returns {Complex}
           */
          "cot": function() {
            var a = 2 * this["re"];
            var b = 2 * this["im"];
            var d = Math.cos(a) - cosh2(b);
            return new Complex3(
              -Math.sin(a) / d,
              sinh2(b) / d
            );
          },
          /**
           * Calculate the secant
           *
           * @returns {Complex}
           */
          "sec": function() {
            var a = this["re"];
            var b = this["im"];
            var d = 0.5 * cosh2(2 * b) + 0.5 * Math.cos(2 * a);
            return new Complex3(
              Math.cos(a) * cosh2(b) / d,
              Math.sin(a) * sinh2(b) / d
            );
          },
          /**
           * Calculate the cosecans
           *
           * @returns {Complex}
           */
          "csc": function() {
            var a = this["re"];
            var b = this["im"];
            var d = 0.5 * cosh2(2 * b) - 0.5 * Math.cos(2 * a);
            return new Complex3(
              Math.sin(a) * cosh2(b) / d,
              -Math.cos(a) * sinh2(b) / d
            );
          },
          /**
           * Calculate the complex arcus sinus
           *
           * @returns {Complex}
           */
          "asin": function() {
            var a = this["re"];
            var b = this["im"];
            var t1 = new Complex3(
              b * b - a * a + 1,
              -2 * a * b
            )["sqrt"]();
            var t2 = new Complex3(
              t1["re"] - b,
              t1["im"] + a
            )["log"]();
            return new Complex3(t2["im"], -t2["re"]);
          },
          /**
           * Calculate the complex arcus cosinus
           *
           * @returns {Complex}
           */
          "acos": function() {
            var a = this["re"];
            var b = this["im"];
            var t1 = new Complex3(
              b * b - a * a + 1,
              -2 * a * b
            )["sqrt"]();
            var t2 = new Complex3(
              t1["re"] - b,
              t1["im"] + a
            )["log"]();
            return new Complex3(Math.PI / 2 - t2["im"], t2["re"]);
          },
          /**
           * Calculate the complex arcus tangent
           *
           * @returns {Complex}
           */
          "atan": function() {
            var a = this["re"];
            var b = this["im"];
            if (a === 0) {
              if (b === 1) {
                return new Complex3(0, Infinity);
              }
              if (b === -1) {
                return new Complex3(0, -Infinity);
              }
            }
            var d = a * a + (1 - b) * (1 - b);
            var t1 = new Complex3(
              (1 - b * b - a * a) / d,
              -2 * a / d
            ).log();
            return new Complex3(-0.5 * t1["im"], 0.5 * t1["re"]);
          },
          /**
           * Calculate the complex arcus cotangent
           *
           * @returns {Complex}
           */
          "acot": function() {
            var a = this["re"];
            var b = this["im"];
            if (b === 0) {
              return new Complex3(Math.atan2(1, a), 0);
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).atan() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).atan();
          },
          /**
           * Calculate the complex arcus secant
           *
           * @returns {Complex}
           */
          "asec": function() {
            var a = this["re"];
            var b = this["im"];
            if (a === 0 && b === 0) {
              return new Complex3(0, Infinity);
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).acos() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).acos();
          },
          /**
           * Calculate the complex arcus cosecans
           *
           * @returns {Complex}
           */
          "acsc": function() {
            var a = this["re"];
            var b = this["im"];
            if (a === 0 && b === 0) {
              return new Complex3(Math.PI / 2, Infinity);
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).asin() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).asin();
          },
          /**
           * Calculate the complex sinh
           *
           * @returns {Complex}
           */
          "sinh": function() {
            var a = this["re"];
            var b = this["im"];
            return new Complex3(
              sinh2(a) * Math.cos(b),
              cosh2(a) * Math.sin(b)
            );
          },
          /**
           * Calculate the complex cosh
           *
           * @returns {Complex}
           */
          "cosh": function() {
            var a = this["re"];
            var b = this["im"];
            return new Complex3(
              cosh2(a) * Math.cos(b),
              sinh2(a) * Math.sin(b)
            );
          },
          /**
           * Calculate the complex tanh
           *
           * @returns {Complex}
           */
          "tanh": function() {
            var a = 2 * this["re"];
            var b = 2 * this["im"];
            var d = cosh2(a) + Math.cos(b);
            return new Complex3(
              sinh2(a) / d,
              Math.sin(b) / d
            );
          },
          /**
           * Calculate the complex coth
           *
           * @returns {Complex}
           */
          "coth": function() {
            var a = 2 * this["re"];
            var b = 2 * this["im"];
            var d = cosh2(a) - Math.cos(b);
            return new Complex3(
              sinh2(a) / d,
              -Math.sin(b) / d
            );
          },
          /**
           * Calculate the complex coth
           *
           * @returns {Complex}
           */
          "csch": function() {
            var a = this["re"];
            var b = this["im"];
            var d = Math.cos(2 * b) - cosh2(2 * a);
            return new Complex3(
              -2 * sinh2(a) * Math.cos(b) / d,
              2 * cosh2(a) * Math.sin(b) / d
            );
          },
          /**
           * Calculate the complex sech
           *
           * @returns {Complex}
           */
          "sech": function() {
            var a = this["re"];
            var b = this["im"];
            var d = Math.cos(2 * b) + cosh2(2 * a);
            return new Complex3(
              2 * cosh2(a) * Math.cos(b) / d,
              -2 * sinh2(a) * Math.sin(b) / d
            );
          },
          /**
           * Calculate the complex asinh
           *
           * @returns {Complex}
           */
          "asinh": function() {
            var tmp = this["im"];
            this["im"] = -this["re"];
            this["re"] = tmp;
            var res = this["asin"]();
            this["re"] = -this["im"];
            this["im"] = tmp;
            tmp = res["re"];
            res["re"] = -res["im"];
            res["im"] = tmp;
            return res;
          },
          /**
           * Calculate the complex acosh
           *
           * @returns {Complex}
           */
          "acosh": function() {
            var res = this["acos"]();
            if (res["im"] <= 0) {
              var tmp = res["re"];
              res["re"] = -res["im"];
              res["im"] = tmp;
            } else {
              var tmp = res["im"];
              res["im"] = -res["re"];
              res["re"] = tmp;
            }
            return res;
          },
          /**
           * Calculate the complex atanh
           *
           * @returns {Complex}
           */
          "atanh": function() {
            var a = this["re"];
            var b = this["im"];
            var noIM = a > 1 && b === 0;
            var oneMinus = 1 - a;
            var onePlus = 1 + a;
            var d = oneMinus * oneMinus + b * b;
            var x = d !== 0 ? new Complex3(
              (onePlus * oneMinus - b * b) / d,
              (b * oneMinus + onePlus * b) / d
            ) : new Complex3(
              a !== -1 ? a / 0 : 0,
              b !== 0 ? b / 0 : 0
            );
            var temp = x["re"];
            x["re"] = logHypot(x["re"], x["im"]) / 2;
            x["im"] = Math.atan2(x["im"], temp) / 2;
            if (noIM) {
              x["im"] = -x["im"];
            }
            return x;
          },
          /**
           * Calculate the complex acoth
           *
           * @returns {Complex}
           */
          "acoth": function() {
            var a = this["re"];
            var b = this["im"];
            if (a === 0 && b === 0) {
              return new Complex3(0, Math.PI / 2);
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).atanh() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).atanh();
          },
          /**
           * Calculate the complex acsch
           *
           * @returns {Complex}
           */
          "acsch": function() {
            var a = this["re"];
            var b = this["im"];
            if (b === 0) {
              return new Complex3(
                a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
                0
              );
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).asinh() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).asinh();
          },
          /**
           * Calculate the complex asech
           *
           * @returns {Complex}
           */
          "asech": function() {
            var a = this["re"];
            var b = this["im"];
            if (this["isZero"]()) {
              return Complex3["INFINITY"];
            }
            var d = a * a + b * b;
            return d !== 0 ? new Complex3(
              a / d,
              -b / d
            ).acosh() : new Complex3(
              a !== 0 ? a / 0 : 0,
              b !== 0 ? -b / 0 : 0
            ).acosh();
          },
          /**
           * Calculate the complex inverse 1/z
           *
           * @returns {Complex}
           */
          "inverse": function() {
            if (this["isZero"]()) {
              return Complex3["INFINITY"];
            }
            if (this["isInfinite"]()) {
              return Complex3["ZERO"];
            }
            var a = this["re"];
            var b = this["im"];
            var d = a * a + b * b;
            return new Complex3(a / d, -b / d);
          },
          /**
           * Returns the complex conjugate
           *
           * @returns {Complex}
           */
          "conjugate": function() {
            return new Complex3(this["re"], -this["im"]);
          },
          /**
           * Gets the negated complex number
           *
           * @returns {Complex}
           */
          "neg": function() {
            return new Complex3(-this["re"], -this["im"]);
          },
          /**
           * Ceils the actual complex number
           *
           * @returns {Complex}
           */
          "ceil": function(places) {
            places = Math.pow(10, places || 0);
            return new Complex3(
              Math.ceil(this["re"] * places) / places,
              Math.ceil(this["im"] * places) / places
            );
          },
          /**
           * Floors the actual complex number
           *
           * @returns {Complex}
           */
          "floor": function(places) {
            places = Math.pow(10, places || 0);
            return new Complex3(
              Math.floor(this["re"] * places) / places,
              Math.floor(this["im"] * places) / places
            );
          },
          /**
           * Ceils the actual complex number
           *
           * @returns {Complex}
           */
          "round": function(places) {
            places = Math.pow(10, places || 0);
            return new Complex3(
              Math.round(this["re"] * places) / places,
              Math.round(this["im"] * places) / places
            );
          },
          /**
           * Compares two complex numbers
           *
           * **Note:** new Complex(Infinity).equals(Infinity) === false
           *
           * @returns {boolean}
           */
          "equals": function(a, b) {
            var z = new Complex3(a, b);
            return Math.abs(z["re"] - this["re"]) <= Complex3["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex3["EPSILON"];
          },
          /**
           * Clones the actual object
           *
           * @returns {Complex}
           */
          "clone": function() {
            return new Complex3(this["re"], this["im"]);
          },
          /**
           * Gets a string of the actual complex number
           *
           * @returns {string}
           */
          "toString": function() {
            var a = this["re"];
            var b = this["im"];
            var ret = "";
            if (this["isNaN"]()) {
              return "NaN";
            }
            if (this["isInfinite"]()) {
              return "Infinity";
            }
            if (Math.abs(a) < Complex3["EPSILON"]) {
              a = 0;
            }
            if (Math.abs(b) < Complex3["EPSILON"]) {
              b = 0;
            }
            if (b === 0) {
              return ret + a;
            }
            if (a !== 0) {
              ret += a;
              ret += " ";
              if (b < 0) {
                b = -b;
                ret += "-";
              } else {
                ret += "+";
              }
              ret += " ";
            } else if (b < 0) {
              b = -b;
              ret += "-";
            }
            if (1 !== b) {
              ret += b;
            }
            return ret + "i";
          },
          /**
           * Returns the actual number as a vector
           *
           * @returns {Array}
           */
          "toVector": function() {
            return [this["re"], this["im"]];
          },
          /**
           * Returns the actual real value of the current object
           *
           * @returns {number|null}
           */
          "valueOf": function() {
            if (this["im"] === 0) {
              return this["re"];
            }
            return null;
          },
          /**
           * Determines whether a complex number is not on the Riemann sphere.
           *
           * @returns {boolean}
           */
          "isNaN": function() {
            return isNaN(this["re"]) || isNaN(this["im"]);
          },
          /**
           * Determines whether or not a complex number is at the zero pole of the
           * Riemann sphere.
           *
           * @returns {boolean}
           */
          "isZero": function() {
            return this["im"] === 0 && this["re"] === 0;
          },
          /**
           * Determines whether a complex number is not at the infinity pole of the
           * Riemann sphere.
           *
           * @returns {boolean}
           */
          "isFinite": function() {
            return isFinite(this["re"]) && isFinite(this["im"]);
          },
          /**
           * Determines whether or not a complex number is at the infinity pole of the
           * Riemann sphere.
           *
           * @returns {boolean}
           */
          "isInfinite": function() {
            return !(this["isNaN"]() || this["isFinite"]());
          }
        };
        Complex3["ZERO"] = new Complex3(0, 0);
        Complex3["ONE"] = new Complex3(1, 0);
        Complex3["I"] = new Complex3(0, 1);
        Complex3["PI"] = new Complex3(Math.PI, 0);
        Complex3["E"] = new Complex3(Math.E, 0);
        Complex3["INFINITY"] = new Complex3(Infinity, Infinity);
        Complex3["NAN"] = new Complex3(NaN, NaN);
        Complex3["EPSILON"] = 1e-15;
        if (typeof define === "function" && define["amd"]) {
          define([], function() {
            return Complex3;
          });
        } else if (typeof exports === "object") {
          Object.defineProperty(Complex3, "__esModule", { "value": true });
          Complex3["default"] = Complex3;
          Complex3["Complex"] = Complex3;
          module["exports"] = Complex3;
        } else {
          root["Complex"] = Complex3;
        }
      })(exports);
    }
  });

  // node_modules/seedrandom/lib/alea.js
  var require_alea = __commonJS({
    "node_modules/seedrandom/lib/alea.js"(exports, module) {
      (function(global2, module2, define2) {
        function Alea(seed) {
          var me = this, mash = Mash();
          me.next = function() {
            var t = 2091639 * me.s0 + me.c * 23283064365386963e-26;
            me.s0 = me.s1;
            me.s1 = me.s2;
            return me.s2 = t - (me.c = t | 0);
          };
          me.c = 1;
          me.s0 = mash(" ");
          me.s1 = mash(" ");
          me.s2 = mash(" ");
          me.s0 -= mash(seed);
          if (me.s0 < 0) {
            me.s0 += 1;
          }
          me.s1 -= mash(seed);
          if (me.s1 < 0) {
            me.s1 += 1;
          }
          me.s2 -= mash(seed);
          if (me.s2 < 0) {
            me.s2 += 1;
          }
          mash = null;
        }
        function copy(f, t) {
          t.c = f.c;
          t.s0 = f.s0;
          t.s1 = f.s1;
          t.s2 = f.s2;
          return t;
        }
        function impl(seed, opts) {
          var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
          prng.int32 = function() {
            return xg.next() * 4294967296 | 0;
          };
          prng.double = function() {
            return prng() + (prng() * 2097152 | 0) * 11102230246251565e-32;
          };
          prng.quick = prng;
          if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        function Mash() {
          var n = 4022871197;
          var mash = function(data) {
            data = String(data);
            for (var i = 0; i < data.length; i++) {
              n += data.charCodeAt(i);
              var h = 0.02519603282416938 * n;
              n = h >>> 0;
              h -= n;
              h *= n;
              n = h >>> 0;
              h -= n;
              n += h * 4294967296;
            }
            return (n >>> 0) * 23283064365386963e-26;
          };
          return mash;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.alea = impl;
        }
      })(
        exports,
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // node_modules/seedrandom/lib/xor128.js
  var require_xor128 = __commonJS({
    "node_modules/seedrandom/lib/xor128.js"(exports, module) {
      (function(global2, module2, define2) {
        function XorGen(seed) {
          var me = this, strseed = "";
          me.x = 0;
          me.y = 0;
          me.z = 0;
          me.w = 0;
          me.next = function() {
            var t = me.x ^ me.x << 11;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
          };
          if (seed === (seed | 0)) {
            me.x = seed;
          } else {
            strseed += seed;
          }
          for (var k = 0; k < strseed.length + 64; k++) {
            me.x ^= strseed.charCodeAt(k) | 0;
            me.next();
          }
        }
        function copy(f, t) {
          t.x = f.x;
          t.y = f.y;
          t.z = f.z;
          t.w = f.w;
          return t;
        }
        function impl(seed, opts) {
          var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 4294967296;
          };
          prng.double = function() {
            do {
              var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
            } while (result === 0);
            return result;
          };
          prng.int32 = xg.next;
          prng.quick = prng;
          if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.xor128 = impl;
        }
      })(
        exports,
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // node_modules/seedrandom/lib/xorwow.js
  var require_xorwow = __commonJS({
    "node_modules/seedrandom/lib/xorwow.js"(exports, module) {
      (function(global2, module2, define2) {
        function XorGen(seed) {
          var me = this, strseed = "";
          me.next = function() {
            var t = me.x ^ me.x >>> 2;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            me.w = me.v;
            return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
          };
          me.x = 0;
          me.y = 0;
          me.z = 0;
          me.w = 0;
          me.v = 0;
          if (seed === (seed | 0)) {
            me.x = seed;
          } else {
            strseed += seed;
          }
          for (var k = 0; k < strseed.length + 64; k++) {
            me.x ^= strseed.charCodeAt(k) | 0;
            if (k == strseed.length) {
              me.d = me.x << 10 ^ me.x >>> 4;
            }
            me.next();
          }
        }
        function copy(f, t) {
          t.x = f.x;
          t.y = f.y;
          t.z = f.z;
          t.w = f.w;
          t.v = f.v;
          t.d = f.d;
          return t;
        }
        function impl(seed, opts) {
          var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 4294967296;
          };
          prng.double = function() {
            do {
              var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
            } while (result === 0);
            return result;
          };
          prng.int32 = xg.next;
          prng.quick = prng;
          if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.xorwow = impl;
        }
      })(
        exports,
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // node_modules/seedrandom/lib/xorshift7.js
  var require_xorshift7 = __commonJS({
    "node_modules/seedrandom/lib/xorshift7.js"(exports, module) {
      (function(global2, module2, define2) {
        function XorGen(seed) {
          var me = this;
          me.next = function() {
            var X = me.x, i = me.i, t, v, w;
            t = X[i];
            t ^= t >>> 7;
            v = t ^ t << 24;
            t = X[i + 1 & 7];
            v ^= t ^ t >>> 10;
            t = X[i + 3 & 7];
            v ^= t ^ t >>> 3;
            t = X[i + 4 & 7];
            v ^= t ^ t << 7;
            t = X[i + 7 & 7];
            t = t ^ t << 13;
            v ^= t ^ t << 9;
            X[i] = v;
            me.i = i + 1 & 7;
            return v;
          };
          function init(me2, seed2) {
            var j, w, X = [];
            if (seed2 === (seed2 | 0)) {
              w = X[0] = seed2;
            } else {
              seed2 = "" + seed2;
              for (j = 0; j < seed2.length; ++j) {
                X[j & 7] = X[j & 7] << 15 ^ seed2.charCodeAt(j) + X[j + 1 & 7] << 13;
              }
            }
            while (X.length < 8) X.push(0);
            for (j = 0; j < 8 && X[j] === 0; ++j) ;
            if (j == 8) w = X[7] = -1;
            else w = X[j];
            me2.x = X;
            me2.i = 0;
            for (j = 256; j > 0; --j) {
              me2.next();
            }
          }
          init(me, seed);
        }
        function copy(f, t) {
          t.x = f.x.slice();
          t.i = f.i;
          return t;
        }
        function impl(seed, opts) {
          if (seed == null) seed = +/* @__PURE__ */ new Date();
          var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 4294967296;
          };
          prng.double = function() {
            do {
              var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
            } while (result === 0);
            return result;
          };
          prng.int32 = xg.next;
          prng.quick = prng;
          if (state) {
            if (state.x) copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.xorshift7 = impl;
        }
      })(
        exports,
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // node_modules/seedrandom/lib/xor4096.js
  var require_xor4096 = __commonJS({
    "node_modules/seedrandom/lib/xor4096.js"(exports, module) {
      (function(global2, module2, define2) {
        function XorGen(seed) {
          var me = this;
          me.next = function() {
            var w = me.w, X = me.X, i = me.i, t, v;
            me.w = w = w + 1640531527 | 0;
            v = X[i + 34 & 127];
            t = X[i = i + 1 & 127];
            v ^= v << 13;
            t ^= t << 17;
            v ^= v >>> 15;
            t ^= t >>> 12;
            v = X[i] = v ^ t;
            me.i = i;
            return v + (w ^ w >>> 16) | 0;
          };
          function init(me2, seed2) {
            var t, v, i, j, w, X = [], limit = 128;
            if (seed2 === (seed2 | 0)) {
              v = seed2;
              seed2 = null;
            } else {
              seed2 = seed2 + "\0";
              v = 0;
              limit = Math.max(limit, seed2.length);
            }
            for (i = 0, j = -32; j < limit; ++j) {
              if (seed2) v ^= seed2.charCodeAt((j + 32) % seed2.length);
              if (j === 0) w = v;
              v ^= v << 10;
              v ^= v >>> 15;
              v ^= v << 4;
              v ^= v >>> 13;
              if (j >= 0) {
                w = w + 1640531527 | 0;
                t = X[j & 127] ^= v + w;
                i = 0 == t ? i + 1 : 0;
              }
            }
            if (i >= 128) {
              X[(seed2 && seed2.length || 0) & 127] = -1;
            }
            i = 127;
            for (j = 4 * 128; j > 0; --j) {
              v = X[i + 34 & 127];
              t = X[i = i + 1 & 127];
              v ^= v << 13;
              t ^= t << 17;
              v ^= v >>> 15;
              t ^= t >>> 12;
              X[i] = v ^ t;
            }
            me2.w = w;
            me2.X = X;
            me2.i = i;
          }
          init(me, seed);
        }
        function copy(f, t) {
          t.i = f.i;
          t.w = f.w;
          t.X = f.X.slice();
          return t;
        }
        ;
        function impl(seed, opts) {
          if (seed == null) seed = +/* @__PURE__ */ new Date();
          var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 4294967296;
          };
          prng.double = function() {
            do {
              var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
            } while (result === 0);
            return result;
          };
          prng.int32 = xg.next;
          prng.quick = prng;
          if (state) {
            if (state.X) copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.xor4096 = impl;
        }
      })(
        exports,
        // window object or global
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // node_modules/seedrandom/lib/tychei.js
  var require_tychei = __commonJS({
    "node_modules/seedrandom/lib/tychei.js"(exports, module) {
      (function(global2, module2, define2) {
        function XorGen(seed) {
          var me = this, strseed = "";
          me.next = function() {
            var b = me.b, c = me.c, d = me.d, a = me.a;
            b = b << 25 ^ b >>> 7 ^ c;
            c = c - d | 0;
            d = d << 24 ^ d >>> 8 ^ a;
            a = a - b | 0;
            me.b = b = b << 20 ^ b >>> 12 ^ c;
            me.c = c = c - d | 0;
            me.d = d << 16 ^ c >>> 16 ^ a;
            return me.a = a - b | 0;
          };
          me.a = 0;
          me.b = 0;
          me.c = 2654435769 | 0;
          me.d = 1367130551;
          if (seed === Math.floor(seed)) {
            me.a = seed / 4294967296 | 0;
            me.b = seed | 0;
          } else {
            strseed += seed;
          }
          for (var k = 0; k < strseed.length + 20; k++) {
            me.b ^= strseed.charCodeAt(k) | 0;
            me.next();
          }
        }
        function copy(f, t) {
          t.a = f.a;
          t.b = f.b;
          t.c = f.c;
          t.d = f.d;
          return t;
        }
        ;
        function impl(seed, opts) {
          var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 4294967296;
          };
          prng.double = function() {
            do {
              var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
            } while (result === 0);
            return result;
          };
          prng.int32 = xg.next;
          prng.quick = prng;
          if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
              return copy(xg, {});
            };
          }
          return prng;
        }
        if (module2 && module2.exports) {
          module2.exports = impl;
        } else if (define2 && define2.amd) {
          define2(function() {
            return impl;
          });
        } else {
          this.tychei = impl;
        }
      })(
        exports,
        typeof module == "object" && module,
        // present in node.js
        typeof define == "function" && define
        // present with an AMD loader
      );
    }
  });

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/seedrandom/seedrandom.js
  var require_seedrandom = __commonJS({
    "node_modules/seedrandom/seedrandom.js"(exports, module) {
      (function(global2, pool, math) {
        var width = 256, chunks = 6, digits2 = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits2), overflow = significance * 2, mask = width - 1, nodecrypto;
        function seedrandom2(seed, options, callback) {
          var key = [];
          options = options == true ? { entropy: true } : options || {};
          var shortseed = mixkey(flatten2(
            options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
            3
          ), key);
          var arc4 = new ARC4(key);
          var prng = function() {
            var n = arc4.g(chunks), d = startdenom, x = 0;
            while (n < significance) {
              n = (n + x) * width;
              d *= width;
              x = arc4.g(1);
            }
            while (n >= overflow) {
              n /= 2;
              d /= 2;
              x >>>= 1;
            }
            return (n + x) / d;
          };
          prng.int32 = function() {
            return arc4.g(4) | 0;
          };
          prng.quick = function() {
            return arc4.g(4) / 4294967296;
          };
          prng.double = prng;
          mixkey(tostring(arc4.S), pool);
          return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
            if (state) {
              if (state.S) {
                copy(state, arc4);
              }
              prng2.state = function() {
                return copy(arc4, {});
              };
            }
            if (is_math_call) {
              math[rngname] = prng2;
              return seed2;
            } else return prng2;
          })(
            prng,
            shortseed,
            "global" in options ? options.global : this == math,
            options.state
          );
        }
        function ARC4(key) {
          var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
          if (!keylen) {
            key = [keylen++];
          }
          while (i < width) {
            s[i] = i++;
          }
          for (i = 0; i < width; i++) {
            s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
            s[j] = t;
          }
          (me.g = function(count) {
            var t2, r = 0, i2 = me.i, j2 = me.j, s2 = me.S;
            while (count--) {
              t2 = s2[i2 = mask & i2 + 1];
              r = r * width + s2[mask & (s2[i2] = s2[j2 = mask & j2 + t2]) + (s2[j2] = t2)];
            }
            me.i = i2;
            me.j = j2;
            return r;
          })(width);
        }
        function copy(f, t) {
          t.i = f.i;
          t.j = f.j;
          t.S = f.S.slice();
          return t;
        }
        ;
        function flatten2(obj, depth) {
          var result = [], typ = typeof obj, prop;
          if (depth && typ == "object") {
            for (prop in obj) {
              try {
                result.push(flatten2(obj[prop], depth - 1));
              } catch (e) {
              }
            }
          }
          return result.length ? result : typ == "string" ? obj : obj + "\0";
        }
        function mixkey(seed, key) {
          var stringseed = seed + "", smear, j = 0;
          while (j < stringseed.length) {
            key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
          }
          return tostring(key);
        }
        function autoseed() {
          try {
            var out;
            if (nodecrypto && (out = nodecrypto.randomBytes)) {
              out = out(width);
            } else {
              out = new Uint8Array(width);
              (global2.crypto || global2.msCrypto).getRandomValues(out);
            }
            return tostring(out);
          } catch (e) {
            var browser = global2.navigator, plugins = browser && browser.plugins;
            return [+/* @__PURE__ */ new Date(), global2, plugins, global2.screen, tostring(pool)];
          }
        }
        function tostring(a) {
          return String.fromCharCode.apply(0, a);
        }
        mixkey(math.random(), pool);
        if (typeof module == "object" && module.exports) {
          module.exports = seedrandom2;
          try {
            nodecrypto = require_crypto();
          } catch (ex) {
          }
        } else if (typeof define == "function" && define.amd) {
          define(function() {
            return seedrandom2;
          });
        } else {
          math["seed" + rngname] = seedrandom2;
        }
      })(
        // global: `self` in browsers (including strict mode and web workers),
        // otherwise `this` in Node and other environments
        typeof self !== "undefined" ? self : exports,
        [],
        // pool: entropy pool starts empty
        Math
        // math: package containing random, pow, and seedrandom
      );
    }
  });

  // node_modules/seedrandom/index.js
  var require_seedrandom2 = __commonJS({
    "node_modules/seedrandom/index.js"(exports, module) {
      var alea = require_alea();
      var xor128 = require_xor128();
      var xorwow = require_xorwow();
      var xorshift7 = require_xorshift7();
      var xor4096 = require_xor4096();
      var tychei = require_tychei();
      var sr = require_seedrandom();
      sr.alea = alea;
      sr.xor128 = xor128;
      sr.xorwow = xorwow;
      sr.xorshift7 = xorshift7;
      sr.xor4096 = xor4096;
      sr.tychei = tychei;
      module.exports = sr;
    }
  });

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/modes/directModeBezierOverride.js
  var import_mapbox_gl_draw = __toESM(require_mapbox_gl_draw());

  // node_modules/@mapbox/mapbox-gl-draw/src/constants.js
  var constants_exports = {};
  __export(constants_exports, {
    LAT_MAX: () => LAT_MAX,
    LAT_MIN: () => LAT_MIN,
    LAT_RENDERED_MAX: () => LAT_RENDERED_MAX,
    LAT_RENDERED_MIN: () => LAT_RENDERED_MIN,
    LNG_MAX: () => LNG_MAX,
    LNG_MIN: () => LNG_MIN,
    activeStates: () => activeStates,
    classes: () => classes,
    cursors: () => cursors,
    events: () => events,
    geojsonTypes: () => geojsonTypes,
    interactions: () => interactions,
    meta: () => meta,
    modes: () => modes,
    sources: () => sources,
    types: () => types,
    updateActions: () => updateActions
  });
  var classes = {
    CONTROL_BASE: "mapboxgl-ctrl",
    CONTROL_PREFIX: "mapboxgl-ctrl-",
    CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
    CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
    CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
    CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
    CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
    CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
    CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
    CONTROL_GROUP: "mapboxgl-ctrl-group",
    ATTRIBUTION: "mapboxgl-ctrl-attrib",
    ACTIVE_BUTTON: "active",
    BOX_SELECT: "mapbox-gl-draw_boxselect"
  };
  var sources = {
    HOT: "mapbox-gl-draw-hot",
    COLD: "mapbox-gl-draw-cold"
  };
  var cursors = {
    ADD: "add",
    MOVE: "move",
    DRAG: "drag",
    POINTER: "pointer",
    NONE: "none"
  };
  var types = {
    POLYGON: "polygon",
    LINE: "line_string",
    POINT: "point"
  };
  var geojsonTypes = {
    FEATURE: "Feature",
    POLYGON: "Polygon",
    LINE_STRING: "LineString",
    POINT: "Point",
    FEATURE_COLLECTION: "FeatureCollection",
    MULTI_PREFIX: "Multi",
    MULTI_POINT: "MultiPoint",
    MULTI_LINE_STRING: "MultiLineString",
    MULTI_POLYGON: "MultiPolygon"
  };
  var modes = {
    DRAW_LINE_STRING: "draw_line_string",
    DRAW_POLYGON: "draw_polygon",
    DRAW_POINT: "draw_point",
    SIMPLE_SELECT: "simple_select",
    DIRECT_SELECT: "direct_select",
    STATIC: "static"
  };
  var events = {
    CREATE: "draw.create",
    DELETE: "draw.delete",
    UPDATE: "draw.update",
    SELECTION_CHANGE: "draw.selectionchange",
    MODE_CHANGE: "draw.modechange",
    ACTIONABLE: "draw.actionable",
    RENDER: "draw.render",
    COMBINE_FEATURES: "draw.combine",
    UNCOMBINE_FEATURES: "draw.uncombine"
  };
  var updateActions = {
    MOVE: "move",
    CHANGE_COORDINATES: "change_coordinates"
  };
  var meta = {
    FEATURE: "feature",
    MIDPOINT: "midpoint",
    VERTEX: "vertex"
  };
  var activeStates = {
    ACTIVE: "true",
    INACTIVE: "false"
  };
  var interactions = [
    "scrollZoom",
    "boxZoom",
    "dragRotate",
    "dragPan",
    "keyboard",
    "doubleClickZoom",
    "touchZoomRotate"
  ];
  var LAT_MIN = -90;
  var LAT_RENDERED_MIN = -85;
  var LAT_MAX = 90;
  var LAT_RENDERED_MAX = 85;
  var LNG_MIN = -270;
  var LNG_MAX = 270;

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/create_vertex.js
  function create_vertex_default(parentId, coordinates, path, selected) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {
        meta: meta.VERTEX,
        parent: parentId,
        coord_path: path,
        active: selected ? activeStates.ACTIVE : activeStates.INACTIVE
      },
      geometry: {
        type: geojsonTypes.POINT,
        coordinates
      }
    };
  }

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/create_midpoint.js
  function create_midpoint_default(parent, startVertex, endVertex) {
    const startCoord = startVertex.geometry.coordinates;
    const endCoord = endVertex.geometry.coordinates;
    if (startCoord[1] > LAT_RENDERED_MAX || startCoord[1] < LAT_RENDERED_MIN || endCoord[1] > LAT_RENDERED_MAX || endCoord[1] < LAT_RENDERED_MIN) {
      return null;
    }
    const mid = {
      lng: (startCoord[0] + endCoord[0]) / 2,
      lat: (startCoord[1] + endCoord[1]) / 2
    };
    return {
      type: geojsonTypes.FEATURE,
      properties: {
        meta: meta.MIDPOINT,
        parent,
        lng: mid.lng,
        lat: mid.lat,
        coord_path: endVertex.properties.coord_path
      },
      geometry: {
        type: geojsonTypes.POINT,
        coordinates: [mid.lng, mid.lat]
      }
    };
  }

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/create_supplementary_points.js
  function createSupplementaryPoints(geojson, options = {}, basePath = null) {
    const { type, coordinates } = geojson.geometry;
    const featureId = geojson.properties && geojson.properties.id;
    let supplementaryPoints = [];
    if (type === geojsonTypes.POINT) {
      supplementaryPoints.push(create_vertex_default(featureId, coordinates, basePath, isSelectedPath(basePath)));
    } else if (type === geojsonTypes.POLYGON) {
      coordinates.forEach((line, lineIndex) => {
        processLine(line, basePath !== null ? `${basePath}.${lineIndex}` : String(lineIndex));
      });
    } else if (type === geojsonTypes.LINE_STRING) {
      processLine(coordinates, basePath);
    } else if (type.indexOf(geojsonTypes.MULTI_PREFIX) === 0) {
      processMultiGeometry();
    }
    function processLine(line, lineBasePath) {
      let firstPointString = "";
      let lastVertex = null;
      line.forEach((point, pointIndex) => {
        const pointPath = lineBasePath !== void 0 && lineBasePath !== null ? `${lineBasePath}.${pointIndex}` : String(pointIndex);
        const vertex = create_vertex_default(featureId, point, pointPath, isSelectedPath(pointPath));
        if (options.midpoints && lastVertex) {
          const midpoint = create_midpoint_default(featureId, lastVertex, vertex);
          if (midpoint) {
            supplementaryPoints.push(midpoint);
          }
        }
        lastVertex = vertex;
        const stringifiedPoint = JSON.stringify(point);
        if (firstPointString !== stringifiedPoint) {
          supplementaryPoints.push(vertex);
        }
        if (pointIndex === 0) {
          firstPointString = stringifiedPoint;
        }
      });
    }
    function isSelectedPath(path) {
      if (!options.selectedPaths) return false;
      return options.selectedPaths.indexOf(path) !== -1;
    }
    function processMultiGeometry() {
      const subType = type.replace(geojsonTypes.MULTI_PREFIX, "");
      coordinates.forEach((subCoordinates, index) => {
        const subFeature = {
          type: geojsonTypes.FEATURE,
          properties: geojson.properties,
          geometry: {
            type: subType,
            coordinates: subCoordinates
          }
        };
        supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
      });
    }
    return supplementaryPoints;
  }
  var create_supplementary_points_default = createSupplementaryPoints;

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/constrain_feature_movement.js
  var import_geojson_extent = __toESM(require_geojson_extent());
  var {
    LAT_MIN: LAT_MIN2,
    LAT_MAX: LAT_MAX2,
    LAT_RENDERED_MIN: LAT_RENDERED_MIN2,
    LAT_RENDERED_MAX: LAT_RENDERED_MAX2,
    LNG_MIN: LNG_MIN2,
    LNG_MAX: LNG_MAX2
  } = constants_exports;
  function constrain_feature_movement_default(geojsonFeatures, delta) {
    let northInnerEdge = LAT_MIN2;
    let southInnerEdge = LAT_MAX2;
    let northOuterEdge = LAT_MIN2;
    let southOuterEdge = LAT_MAX2;
    let westEdge = LNG_MAX2;
    let eastEdge = LNG_MIN2;
    geojsonFeatures.forEach((feature) => {
      const bounds = (0, import_geojson_extent.default)(feature);
      const featureSouthEdge = bounds[1];
      const featureNorthEdge = bounds[3];
      const featureWestEdge = bounds[0];
      const featureEastEdge = bounds[2];
      if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
      if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
      if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
      if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
      if (featureWestEdge < westEdge) westEdge = featureWestEdge;
      if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
    });
    const constrainedDelta = delta;
    if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX2) {
      constrainedDelta.lat = LAT_RENDERED_MAX2 - northInnerEdge;
    }
    if (northOuterEdge + constrainedDelta.lat > LAT_MAX2) {
      constrainedDelta.lat = LAT_MAX2 - northOuterEdge;
    }
    if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN2) {
      constrainedDelta.lat = LAT_RENDERED_MIN2 - southInnerEdge;
    }
    if (southOuterEdge + constrainedDelta.lat < LAT_MIN2) {
      constrainedDelta.lat = LAT_MIN2 - southOuterEdge;
    }
    if (westEdge + constrainedDelta.lng <= LNG_MIN2) {
      constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
    }
    if (eastEdge + constrainedDelta.lng >= LNG_MAX2) {
      constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
    }
    return constrainedDelta;
  }

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/move_features.js
  function move_features_default(features, delta) {
    const constrainedDelta = constrain_feature_movement_default(features.map((feature) => feature.toGeoJSON()), delta);
    features.forEach((feature) => {
      const currentCoordinates = feature.getCoordinates();
      const moveCoordinate = (coord) => {
        const point = {
          lng: coord[0] + constrainedDelta.lng,
          lat: coord[1] + constrainedDelta.lat
        };
        return [point.lng, point.lat];
      };
      const moveRing = (ring) => ring.map((coord) => moveCoordinate(coord));
      const moveMultiPolygon = (multi) => multi.map((ring) => moveRing(ring));
      let nextCoordinates;
      if (feature.type === geojsonTypes.POINT) {
        nextCoordinates = moveCoordinate(currentCoordinates);
      } else if (feature.type === geojsonTypes.LINE_STRING || feature.type === geojsonTypes.MULTI_POINT) {
        nextCoordinates = currentCoordinates.map(moveCoordinate);
      } else if (feature.type === geojsonTypes.POLYGON || feature.type === geojsonTypes.MULTI_LINE_STRING) {
        nextCoordinates = currentCoordinates.map(moveRing);
      } else if (feature.type === geojsonTypes.MULTI_POLYGON) {
        nextCoordinates = currentCoordinates.map(moveMultiPolygon);
      }
      feature.incomingCoords(nextCoordinates);
    });
  }

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/common_selectors.js
  function isOfMetaType(type) {
    return function(e) {
      const featureTarget = e.featureTarget;
      if (!featureTarget) return false;
      if (!featureTarget.properties) return false;
      return featureTarget.properties.meta === type;
    };
  }
  function isActiveFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === activeStates.ACTIVE && e.featureTarget.properties.meta === meta.FEATURE;
  }
  function isVertex(e) {
    const featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === meta.VERTEX;
  }
  function isShiftDown(e) {
    if (!e.originalEvent) return false;
    return e.originalEvent.shiftKey === true;
  }
  function isEscapeKey(e) {
    return e.keyCode === 27;
  }
  function isEnterKey(e) {
    return e.keyCode === 13;
  }

  // node_modules/@mapbox/mapbox-gl-draw/src/lib/double_click_zoom.js
  var double_click_zoom_default = {
    enable(ctx) {
      setTimeout(() => {
        if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return;
        if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) return;
        ctx.map.doubleClickZoom.enable();
      }, 0);
    },
    disable(ctx) {
      setTimeout(() => {
        if (!ctx.map || !ctx.map.doubleClickZoom) return;
        ctx.map.doubleClickZoom.disable();
      }, 0);
    }
  };

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/dragBezierPoints.js
  function dragBezierPoints(draw3, delta) {
    draw3.getSelected().filter((feature) => feature.properties.bezierGroup).map((feature) => feature.properties.bezierGroup).forEach((bezierGroup) => {
      bezierGroup.bezierCurves.forEach((bezierCurve) => {
        bezierCurve.nodes.forEach((node) => {
          node.coords[0] += delta.lng;
          node.coords[1] += delta.lat;
          if (node.handle) {
            node.handle[0] += delta.lng;
            node.handle[1] += delta.lat;
          }
        });
      });
    });
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/bezierUtils.js
  var mirrorHandle = function(bezierPoint, bezierHandle) {
    return [bezierPoint[0] * 2 - bezierHandle[0], bezierPoint[1] * 2 - bezierHandle[1]];
  };
  var bezierCurve4pts = function(p1, p2, p3, p4, t) {
    const x = Math.pow(1 - t, 3) * p1[0] + 3 * Math.pow(1 - t, 2) * t * p2[0] + 3 * (1 - t) * Math.pow(t, 2) * p3[0] + Math.pow(t, 3) * p4[0];
    const y = Math.pow(1 - t, 3) * p1[1] + 3 * Math.pow(1 - t, 2) * t * p2[1] + 3 * (1 - t) * Math.pow(t, 2) * p3[1] + Math.pow(t, 3) * p4[1];
    return [x, y];
  };

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  // node_modules/mathjs/lib/esm/core/config.js
  var DEFAULT_CONFIG = {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: 1e-12,
    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: "Matrix",
    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: "number",
    // number of significant digits in BigNumbers
    precision: 64,
    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
    // predictable is false, and returns `NaN` when true.
    predictable: false,
    // random seed for seeded pseudo random number generation
    // null = randomly seed
    randomSeed: null
  };

  // node_modules/mathjs/lib/esm/utils/is.js
  function isNumber(x) {
    return typeof x === "number";
  }
  function isBigNumber(x) {
    if (!x || typeof x !== "object" || typeof x.constructor !== "function") {
      return false;
    }
    if (x.isBigNumber === true && typeof x.constructor.prototype === "object" && x.constructor.prototype.isBigNumber === true) {
      return true;
    }
    if (typeof x.constructor.isDecimal === "function" && x.constructor.isDecimal(x) === true) {
      return true;
    }
    return false;
  }
  function isComplex(x) {
    return x && typeof x === "object" && Object.getPrototypeOf(x).isComplex === true || false;
  }
  function isFraction(x) {
    return x && typeof x === "object" && Object.getPrototypeOf(x).isFraction === true || false;
  }
  function isUnit(x) {
    return x && x.constructor.prototype.isUnit === true || false;
  }
  function isString(x) {
    return typeof x === "string";
  }
  var isArray = Array.isArray;
  function isMatrix(x) {
    return x && x.constructor.prototype.isMatrix === true || false;
  }
  function isCollection(x) {
    return Array.isArray(x) || isMatrix(x);
  }
  function isDenseMatrix(x) {
    return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
  }
  function isSparseMatrix(x) {
    return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
  }
  function isRange(x) {
    return x && x.constructor.prototype.isRange === true || false;
  }
  function isIndex(x) {
    return x && x.constructor.prototype.isIndex === true || false;
  }
  function isBoolean(x) {
    return typeof x === "boolean";
  }
  function isResultSet(x) {
    return x && x.constructor.prototype.isResultSet === true || false;
  }
  function isHelp(x) {
    return x && x.constructor.prototype.isHelp === true || false;
  }
  function isFunction(x) {
    return typeof x === "function";
  }
  function isDate(x) {
    return x instanceof Date;
  }
  function isRegExp(x) {
    return x instanceof RegExp;
  }
  function isObject(x) {
    return !!(x && typeof x === "object" && x.constructor === Object && !isComplex(x) && !isFraction(x));
  }
  function isNull(x) {
    return x === null;
  }
  function isUndefined(x) {
    return x === void 0;
  }
  function isAccessorNode(x) {
    return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isArrayNode(x) {
    return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isAssignmentNode(x) {
    return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isBlockNode(x) {
    return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isConditionalNode(x) {
    return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isConstantNode(x) {
    return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isFunctionAssignmentNode(x) {
    return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isFunctionNode(x) {
    return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isIndexNode(x) {
    return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isNode(x) {
    return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isObjectNode(x) {
    return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isOperatorNode(x) {
    return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isParenthesisNode(x) {
    return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isRangeNode(x) {
    return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isSymbolNode(x) {
    return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
  }
  function isChain(x) {
    return x && x.constructor.prototype.isChain === true || false;
  }
  function typeOf(x) {
    var t = typeof x;
    if (t === "object") {
      if (x === null) return "null";
      if (Array.isArray(x)) return "Array";
      if (x instanceof Date) return "Date";
      if (x instanceof RegExp) return "RegExp";
      if (isBigNumber(x)) return "BigNumber";
      if (isComplex(x)) return "Complex";
      if (isFraction(x)) return "Fraction";
      if (isMatrix(x)) return "Matrix";
      if (isUnit(x)) return "Unit";
      if (isIndex(x)) return "Index";
      if (isRange(x)) return "Range";
      if (isResultSet(x)) return "ResultSet";
      if (isNode(x)) return x.type;
      if (isChain(x)) return "Chain";
      if (isHelp(x)) return "Help";
      return "Object";
    }
    if (t === "function") return "Function";
    return t;
  }

  // node_modules/mathjs/lib/esm/utils/object.js
  function clone(x) {
    var type = typeof x;
    if (type === "number" || type === "string" || type === "boolean" || x === null || x === void 0) {
      return x;
    }
    if (typeof x.clone === "function") {
      return x.clone();
    }
    if (Array.isArray(x)) {
      return x.map(function(value) {
        return clone(value);
      });
    }
    if (x instanceof Date) return new Date(x.valueOf());
    if (isBigNumber(x)) return x;
    if (x instanceof RegExp) throw new TypeError("Cannot clone " + x);
    return mapObject(x, clone);
  }
  function mapObject(object, callback) {
    var clone3 = {};
    for (var key in object) {
      if (hasOwnProperty(object, key)) {
        clone3[key] = callback(object[key]);
      }
    }
    return clone3;
  }
  function deepStrictEqual(a, b) {
    var prop, i, len;
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      for (i = 0, len = a.length; i < len; i++) {
        if (!deepStrictEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    } else if (typeof a === "function") {
      return a === b;
    } else if (a instanceof Object) {
      if (Array.isArray(b) || !(b instanceof Object)) {
        return false;
      }
      for (prop in a) {
        if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
          return false;
        }
      }
      for (prop in b) {
        if (!(prop in a)) {
          return false;
        }
      }
      return true;
    } else {
      return a === b;
    }
  }
  function hasOwnProperty(object, property) {
    return object && Object.hasOwnProperty.call(object, property);
  }
  function pickShallow(object, properties) {
    var copy = {};
    for (var i = 0; i < properties.length; i++) {
      var key = properties[i];
      var value = object[key];
      if (value !== void 0) {
        copy[key] = value;
      }
    }
    return copy;
  }

  // node_modules/mathjs/lib/esm/core/function/config.js
  var MATRIX_OPTIONS = ["Matrix", "Array"];
  var NUMBER_OPTIONS = ["number", "BigNumber", "Fraction"];

  // node_modules/mathjs/lib/esm/entry/configReadonly.js
  var config = function config2(options) {
    if (options) {
      throw new Error("The global config is readonly. \nPlease create a mathjs instance if you want to change the default configuration. \nExample:\n\n  import { create, all } from 'mathjs';\n  const mathjs = create(all);\n  mathjs.config({ number: 'BigNumber' });\n");
    }
    return Object.freeze(DEFAULT_CONFIG);
  };
  _extends(config, DEFAULT_CONFIG, {
    MATRIX_OPTIONS,
    NUMBER_OPTIONS
  });

  // node_modules/mathjs/lib/esm/core/function/typed.js
  var import_typed_function = __toESM(require_typed_function(), 1);

  // node_modules/mathjs/lib/esm/utils/number.js
  function isInteger(value) {
    if (typeof value === "boolean") {
      return true;
    }
    return isFinite(value) ? value === Math.round(value) : false;
  }
  var sign = Math.sign || function(x) {
    if (x > 0) {
      return 1;
    } else if (x < 0) {
      return -1;
    } else {
      return 0;
    }
  };
  var log2 = Math.log2 || function log22(x) {
    return Math.log(x) / Math.LN2;
  };
  var log10 = Math.log10 || function log102(x) {
    return Math.log(x) / Math.LN10;
  };
  var log1p = Math.log1p || function(x) {
    return Math.log(x + 1);
  };
  var cbrt = Math.cbrt || function cbrt2(x) {
    if (x === 0) {
      return x;
    }
    var negate = x < 0;
    var result;
    if (negate) {
      x = -x;
    }
    if (isFinite(x)) {
      result = Math.exp(Math.log(x) / 3);
      result = (x / (result * result) + 2 * result) / 3;
    } else {
      result = x;
    }
    return negate ? -result : result;
  };
  var expm1 = Math.expm1 || function expm12(x) {
    return x >= 2e-4 || x <= -2e-4 ? Math.exp(x) - 1 : x + x * x / 2 + x * x * x / 6;
  };
  function formatNumberToBase(n, base, size) {
    var prefixes = {
      2: "0b",
      8: "0o",
      16: "0x"
    };
    var prefix = prefixes[base];
    var suffix = "";
    if (size) {
      if (size < 1) {
        throw new Error("size must be in greater than 0");
      }
      if (!isInteger(size)) {
        throw new Error("size must be an integer");
      }
      if (n > 2 ** (size - 1) - 1 || n < -(2 ** (size - 1))) {
        throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
      }
      if (!isInteger(n)) {
        throw new Error("Value must be an integer");
      }
      if (n < 0) {
        n = n + 2 ** size;
      }
      suffix = "i".concat(size);
    }
    var sign3 = "";
    if (n < 0) {
      n = -n;
      sign3 = "-";
    }
    return "".concat(sign3).concat(prefix).concat(n.toString(base)).concat(suffix);
  }
  function format(value, options) {
    if (typeof options === "function") {
      return options(value);
    }
    if (value === Infinity) {
      return "Infinity";
    } else if (value === -Infinity) {
      return "-Infinity";
    } else if (isNaN(value)) {
      return "NaN";
    }
    var notation = "auto";
    var precision;
    var wordSize;
    if (options) {
      if (options.notation) {
        notation = options.notation;
      }
      if (isNumber(options)) {
        precision = options;
      } else if (isNumber(options.precision)) {
        precision = options.precision;
      }
      if (options.wordSize) {
        wordSize = options.wordSize;
        if (typeof wordSize !== "number") {
          throw new Error('Option "wordSize" must be a number');
        }
      }
    }
    switch (notation) {
      case "fixed":
        return toFixed(value, precision);
      case "exponential":
        return toExponential(value, precision);
      case "engineering":
        return toEngineering(value, precision);
      case "bin":
        return formatNumberToBase(value, 2, wordSize);
      case "oct":
        return formatNumberToBase(value, 8, wordSize);
      case "hex":
        return formatNumberToBase(value, 16, wordSize);
      case "auto":
        return toPrecision(value, precision, options && options).replace(/((\.\d*?)(0+))($|e)/, function() {
          var digits2 = arguments[2];
          var e = arguments[4];
          return digits2 !== "." ? digits2 + e : e;
        });
      default:
        throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function splitNumber(value) {
    var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
    if (!match) {
      throw new SyntaxError("Invalid number " + value);
    }
    var sign3 = match[1];
    var digits2 = match[2];
    var exponent = parseFloat(match[4] || "0");
    var dot = digits2.indexOf(".");
    exponent += dot !== -1 ? dot - 1 : digits2.length - 1;
    var coefficients = digits2.replace(".", "").replace(/^0*/, function(zeros2) {
      exponent -= zeros2.length;
      return "";
    }).replace(/0*$/, "").split("").map(function(d) {
      return parseInt(d);
    });
    if (coefficients.length === 0) {
      coefficients.push(0);
      exponent++;
    }
    return {
      sign: sign3,
      coefficients,
      exponent
    };
  }
  function toEngineering(value, precision) {
    if (isNaN(value) || !isFinite(value)) {
      return String(value);
    }
    var split = splitNumber(value);
    var rounded = roundDigits(split, precision);
    var e = rounded.exponent;
    var c = rounded.coefficients;
    var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
    if (isNumber(precision)) {
      while (precision > c.length || e - newExp + 1 > c.length) {
        c.push(0);
      }
    } else {
      var missingZeros = Math.abs(e - newExp) - (c.length - 1);
      for (var i = 0; i < missingZeros; i++) {
        c.push(0);
      }
    }
    var expDiff = Math.abs(e - newExp);
    var decimalIdx = 1;
    while (expDiff > 0) {
      decimalIdx++;
      expDiff--;
    }
    var decimals = c.slice(decimalIdx).join("");
    var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? "." + decimals : "";
    var str = c.slice(0, decimalIdx).join("") + decimalVal + "e" + (e >= 0 ? "+" : "") + newExp.toString();
    return rounded.sign + str;
  }
  function toFixed(value, precision) {
    if (isNaN(value) || !isFinite(value)) {
      return String(value);
    }
    var splitValue = splitNumber(value);
    var rounded = typeof precision === "number" ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
    var c = rounded.coefficients;
    var p = rounded.exponent + 1;
    var pp = p + (precision || 0);
    if (c.length < pp) {
      c = c.concat(zeros(pp - c.length));
    }
    if (p < 0) {
      c = zeros(-p + 1).concat(c);
      p = 1;
    }
    if (p < c.length) {
      c.splice(p, 0, p === 0 ? "0." : ".");
    }
    return rounded.sign + c.join("");
  }
  function toExponential(value, precision) {
    if (isNaN(value) || !isFinite(value)) {
      return String(value);
    }
    var split = splitNumber(value);
    var rounded = precision ? roundDigits(split, precision) : split;
    var c = rounded.coefficients;
    var e = rounded.exponent;
    if (c.length < precision) {
      c = c.concat(zeros(precision - c.length));
    }
    var first = c.shift();
    return rounded.sign + first + (c.length > 0 ? "." + c.join("") : "") + "e" + (e >= 0 ? "+" : "") + e;
  }
  function toPrecision(value, precision, options) {
    if (isNaN(value) || !isFinite(value)) {
      return String(value);
    }
    var lowerExp = options && options.lowerExp !== void 0 ? options.lowerExp : -3;
    var upperExp = options && options.upperExp !== void 0 ? options.upperExp : 5;
    var split = splitNumber(value);
    var rounded = precision ? roundDigits(split, precision) : split;
    if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
      return toExponential(value, precision);
    } else {
      var c = rounded.coefficients;
      var e = rounded.exponent;
      if (c.length < precision) {
        c = c.concat(zeros(precision - c.length));
      }
      c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0)));
      c = zeros(-e).concat(c);
      var dot = e > 0 ? e : 0;
      if (dot < c.length - 1) {
        c.splice(dot + 1, 0, ".");
      }
      return rounded.sign + c.join("");
    }
  }
  function roundDigits(split, precision) {
    var rounded = {
      sign: split.sign,
      coefficients: split.coefficients,
      exponent: split.exponent
    };
    var c = rounded.coefficients;
    while (precision <= 0) {
      c.unshift(0);
      rounded.exponent++;
      precision++;
    }
    if (c.length > precision) {
      var removed = c.splice(precision, c.length - precision);
      if (removed[0] >= 5) {
        var i = precision - 1;
        c[i]++;
        while (c[i] === 10) {
          c.pop();
          if (i === 0) {
            c.unshift(0);
            rounded.exponent++;
            i++;
          }
          i--;
          c[i]++;
        }
      }
    }
    return rounded;
  }
  function zeros(length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(0);
    }
    return arr;
  }
  function digits(value) {
    return value.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
  }
  var DBL_EPSILON = Number.EPSILON || 2220446049250313e-31;
  function nearlyEqual(x, y, epsilon) {
    if (epsilon === null || epsilon === void 0) {
      return x === y;
    }
    if (x === y) {
      return true;
    }
    if (isNaN(x) || isNaN(y)) {
      return false;
    }
    if (isFinite(x) && isFinite(y)) {
      var diff = Math.abs(x - y);
      if (diff < DBL_EPSILON) {
        return true;
      } else {
        return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
      }
    }
    return false;
  }

  // node_modules/mathjs/lib/esm/utils/bignumber/formatter.js
  function formatBigNumberToBase(n, base, size) {
    var BigNumberCtor = n.constructor;
    var big2 = new BigNumberCtor(2);
    var suffix = "";
    if (size) {
      if (size < 1) {
        throw new Error("size must be in greater than 0");
      }
      if (!isInteger(size)) {
        throw new Error("size must be an integer");
      }
      if (n.greaterThan(big2.pow(size - 1).sub(1)) || n.lessThan(big2.pow(size - 1).mul(-1))) {
        throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
      }
      if (!n.isInteger()) {
        throw new Error("Value must be an integer");
      }
      if (n.lessThan(0)) {
        n = n.add(big2.pow(size));
      }
      suffix = "i".concat(size);
    }
    switch (base) {
      case 2:
        return "".concat(n.toBinary()).concat(suffix);
      case 8:
        return "".concat(n.toOctal()).concat(suffix);
      case 16:
        return "".concat(n.toHexadecimal()).concat(suffix);
      default:
        throw new Error("Base ".concat(base, " not supported "));
    }
  }
  function format2(value, options) {
    if (typeof options === "function") {
      return options(value);
    }
    if (!value.isFinite()) {
      return value.isNaN() ? "NaN" : value.gt(0) ? "Infinity" : "-Infinity";
    }
    var notation = "auto";
    var precision;
    var wordSize;
    if (options !== void 0) {
      if (options.notation) {
        notation = options.notation;
      }
      if (typeof options === "number") {
        precision = options;
      } else if (options.precision) {
        precision = options.precision;
      }
      if (options.wordSize) {
        wordSize = options.wordSize;
        if (typeof wordSize !== "number") {
          throw new Error('Option "wordSize" must be a number');
        }
      }
    }
    switch (notation) {
      case "fixed":
        return toFixed2(value, precision);
      case "exponential":
        return toExponential2(value, precision);
      case "engineering":
        return toEngineering2(value, precision);
      case "bin":
        return formatBigNumberToBase(value, 2, wordSize);
      case "oct":
        return formatBigNumberToBase(value, 8, wordSize);
      case "hex":
        return formatBigNumberToBase(value, 16, wordSize);
      case "auto": {
        var lowerExp = options && options.lowerExp !== void 0 ? options.lowerExp : -3;
        var upperExp = options && options.upperExp !== void 0 ? options.upperExp : 5;
        if (value.isZero()) return "0";
        var str;
        var rounded = value.toSignificantDigits(precision);
        var exp2 = rounded.e;
        if (exp2 >= lowerExp && exp2 < upperExp) {
          str = rounded.toFixed();
        } else {
          str = toExponential2(value, precision);
        }
        return str.replace(/((\.\d*?)(0+))($|e)/, function() {
          var digits2 = arguments[2];
          var e = arguments[4];
          return digits2 !== "." ? digits2 + e : e;
        });
      }
      default:
        throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
    }
  }
  function toEngineering2(value, precision) {
    var e = value.e;
    var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
    var valueWithoutExp = value.mul(Math.pow(10, -newExp));
    var valueStr = valueWithoutExp.toPrecision(precision);
    if (valueStr.indexOf("e") !== -1) {
      valueStr = valueWithoutExp.toString();
    }
    return valueStr + "e" + (e >= 0 ? "+" : "") + newExp.toString();
  }
  function toExponential2(value, precision) {
    if (precision !== void 0) {
      return value.toExponential(precision - 1);
    } else {
      return value.toExponential();
    }
  }
  function toFixed2(value, precision) {
    return value.toFixed(precision);
  }

  // node_modules/mathjs/lib/esm/utils/string.js
  function format3(value, options) {
    if (typeof value === "number") {
      return format(value, options);
    }
    if (isBigNumber(value)) {
      return format2(value, options);
    }
    if (looksLikeFraction(value)) {
      if (!options || options.fraction !== "decimal") {
        return value.s * value.n + "/" + value.d;
      } else {
        return value.toString();
      }
    }
    if (Array.isArray(value)) {
      return formatArray(value, options);
    }
    if (isString(value)) {
      return '"' + value + '"';
    }
    if (typeof value === "function") {
      return value.syntax ? String(value.syntax) : "function";
    }
    if (value && typeof value === "object") {
      if (typeof value.format === "function") {
        return value.format(options);
      } else if (value && value.toString(options) !== {}.toString()) {
        return value.toString(options);
      } else {
        var entries = Object.keys(value).map((key) => {
          return '"' + key + '": ' + format3(value[key], options);
        });
        return "{" + entries.join(", ") + "}";
      }
    }
    return String(value);
  }
  function formatArray(array, options) {
    if (Array.isArray(array)) {
      var str = "[";
      var len = array.length;
      for (var i = 0; i < len; i++) {
        if (i !== 0) {
          str += ", ";
        }
        str += formatArray(array[i], options);
      }
      str += "]";
      return str;
    } else {
      return format3(array, options);
    }
  }
  function looksLikeFraction(value) {
    return value && typeof value === "object" && typeof value.s === "number" && typeof value.n === "number" && typeof value.d === "number" || false;
  }

  // node_modules/mathjs/lib/esm/error/DimensionError.js
  function DimensionError(actual, expected, relation) {
    if (!(this instanceof DimensionError)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this.actual = actual;
    this.expected = expected;
    this.relation = relation;
    this.message = "Dimension mismatch (" + (Array.isArray(actual) ? "[" + actual.join(", ") + "]" : actual) + " " + (this.relation || "!=") + " " + (Array.isArray(expected) ? "[" + expected.join(", ") + "]" : expected) + ")";
    this.stack = new Error().stack;
  }
  DimensionError.prototype = new RangeError();
  DimensionError.prototype.constructor = RangeError;
  DimensionError.prototype.name = "DimensionError";
  DimensionError.prototype.isDimensionError = true;

  // node_modules/mathjs/lib/esm/error/IndexError.js
  function IndexError(index, min2, max2) {
    if (!(this instanceof IndexError)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this.index = index;
    if (arguments.length < 3) {
      this.min = 0;
      this.max = min2;
    } else {
      this.min = min2;
      this.max = max2;
    }
    if (this.min !== void 0 && this.index < this.min) {
      this.message = "Index out of range (" + this.index + " < " + this.min + ")";
    } else if (this.max !== void 0 && this.index >= this.max) {
      this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")";
    } else {
      this.message = "Index out of range (" + this.index + ")";
    }
    this.stack = new Error().stack;
  }
  IndexError.prototype = new RangeError();
  IndexError.prototype.constructor = RangeError;
  IndexError.prototype.name = "IndexError";
  IndexError.prototype.isIndexError = true;

  // node_modules/mathjs/lib/esm/utils/array.js
  function arraySize(x) {
    var s = [];
    while (Array.isArray(x)) {
      s.push(x.length);
      x = x[0];
    }
    return s;
  }
  function _validate(array, size, dim) {
    var i;
    var len = array.length;
    if (len !== size[dim]) {
      throw new DimensionError(len, size[dim]);
    }
    if (dim < size.length - 1) {
      var dimNext = dim + 1;
      for (i = 0; i < len; i++) {
        var child = array[i];
        if (!Array.isArray(child)) {
          throw new DimensionError(size.length - 1, size.length, "<");
        }
        _validate(array[i], size, dimNext);
      }
    } else {
      for (i = 0; i < len; i++) {
        if (Array.isArray(array[i])) {
          throw new DimensionError(size.length + 1, size.length, ">");
        }
      }
    }
  }
  function validate(array, size) {
    var isScalar = size.length === 0;
    if (isScalar) {
      if (Array.isArray(array)) {
        throw new DimensionError(array.length, 0);
      }
    } else {
      _validate(array, size, 0);
    }
  }
  function validateIndex(index, length) {
    if (!isNumber(index) || !isInteger(index)) {
      throw new TypeError("Index must be an integer (value: " + index + ")");
    }
    if (index < 0 || typeof length === "number" && index >= length) {
      throw new IndexError(index, length);
    }
  }
  function resize(array, size, defaultValue) {
    if (!Array.isArray(array) || !Array.isArray(size)) {
      throw new TypeError("Array expected");
    }
    if (size.length === 0) {
      throw new Error("Resizing to scalar is not supported");
    }
    size.forEach(function(value) {
      if (!isNumber(value) || !isInteger(value) || value < 0) {
        throw new TypeError("Invalid size, must contain positive integers (size: " + format3(size) + ")");
      }
    });
    var _defaultValue = defaultValue !== void 0 ? defaultValue : 0;
    _resize(array, size, 0, _defaultValue);
    return array;
  }
  function _resize(array, size, dim, defaultValue) {
    var i;
    var elem;
    var oldLen = array.length;
    var newLen = size[dim];
    var minLen = Math.min(oldLen, newLen);
    array.length = newLen;
    if (dim < size.length - 1) {
      var dimNext = dim + 1;
      for (i = 0; i < minLen; i++) {
        elem = array[i];
        if (!Array.isArray(elem)) {
          elem = [elem];
          array[i] = elem;
        }
        _resize(elem, size, dimNext, defaultValue);
      }
      for (i = minLen; i < newLen; i++) {
        elem = [];
        array[i] = elem;
        _resize(elem, size, dimNext, defaultValue);
      }
    } else {
      for (i = 0; i < minLen; i++) {
        while (Array.isArray(array[i])) {
          array[i] = array[i][0];
        }
      }
      for (i = minLen; i < newLen; i++) {
        array[i] = defaultValue;
      }
    }
  }
  function reshape(array, sizes) {
    var flatArray = flatten(array);
    var currentLength = flatArray.length;
    if (!Array.isArray(array) || !Array.isArray(sizes)) {
      throw new TypeError("Array expected");
    }
    if (sizes.length === 0) {
      throw new DimensionError(0, currentLength, "!=");
    }
    sizes = processSizesWildcard(sizes, currentLength);
    var newLength = product(sizes);
    if (currentLength !== newLength) {
      throw new DimensionError(newLength, currentLength, "!=");
    }
    try {
      return _reshape(flatArray, sizes);
    } catch (e) {
      if (e instanceof DimensionError) {
        throw new DimensionError(newLength, currentLength, "!=");
      }
      throw e;
    }
  }
  function processSizesWildcard(sizes, currentLength) {
    var newLength = product(sizes);
    var processedSizes = sizes.slice();
    var WILDCARD = -1;
    var wildCardIndex = sizes.indexOf(WILDCARD);
    var isMoreThanOneWildcard = sizes.indexOf(WILDCARD, wildCardIndex + 1) >= 0;
    if (isMoreThanOneWildcard) {
      throw new Error("More than one wildcard in sizes");
    }
    var hasWildcard = wildCardIndex >= 0;
    var canReplaceWildcard = currentLength % newLength === 0;
    if (hasWildcard) {
      if (canReplaceWildcard) {
        processedSizes[wildCardIndex] = -currentLength / newLength;
      } else {
        throw new Error("Could not replace wildcard, since " + currentLength + " is no multiple of " + -newLength);
      }
    }
    return processedSizes;
  }
  function product(array) {
    return array.reduce((prev, curr) => prev * curr, 1);
  }
  function _reshape(array, sizes) {
    var tmpArray = array;
    var tmpArray2;
    for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
      var size = sizes[sizeIndex];
      tmpArray2 = [];
      var length = tmpArray.length / size;
      for (var i = 0; i < length; i++) {
        tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
      }
      tmpArray = tmpArray2;
    }
    return tmpArray;
  }
  function unsqueeze(array, dims, outer, size) {
    var s = size || arraySize(array);
    if (outer) {
      for (var i = 0; i < outer; i++) {
        array = [array];
        s.unshift(1);
      }
    }
    array = _unsqueeze(array, dims, 0);
    while (s.length < dims) {
      s.push(1);
    }
    return array;
  }
  function _unsqueeze(array, dims, dim) {
    var i, ii;
    if (Array.isArray(array)) {
      var next = dim + 1;
      for (i = 0, ii = array.length; i < ii; i++) {
        array[i] = _unsqueeze(array[i], dims, next);
      }
    } else {
      for (var d = dim; d < dims; d++) {
        array = [array];
      }
    }
    return array;
  }
  function flatten(array) {
    if (!Array.isArray(array)) {
      return array;
    }
    var flat = [];
    array.forEach(function callback(value) {
      if (Array.isArray(value)) {
        value.forEach(callback);
      } else {
        flat.push(value);
      }
    });
    return flat;
  }
  function getArrayDataType(array, typeOf2) {
    var type;
    var length = 0;
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      var isArray2 = Array.isArray(item);
      if (i === 0 && isArray2) {
        length = item.length;
      }
      if (isArray2 && item.length !== length) {
        return void 0;
      }
      var itemType = isArray2 ? getArrayDataType(item, typeOf2) : typeOf2(item);
      if (type === void 0) {
        type = itemType;
      } else if (type !== itemType) {
        return "mixed";
      } else {
      }
    }
    return type;
  }

  // node_modules/mathjs/lib/esm/utils/factory.js
  function factory(name28, dependencies29, create, meta2) {
    function assertAndCreate(scope) {
      var deps = pickShallow(scope, dependencies29.map(stripOptionalNotation));
      assertDependencies(name28, dependencies29, scope);
      return create(deps);
    }
    assertAndCreate.isFactory = true;
    assertAndCreate.fn = name28;
    assertAndCreate.dependencies = dependencies29.slice().sort();
    if (meta2) {
      assertAndCreate.meta = meta2;
    }
    return assertAndCreate;
  }
  function assertDependencies(name28, dependencies29, scope) {
    var allDefined = dependencies29.filter((dependency) => !isOptionalDependency(dependency)).every((dependency) => scope[dependency] !== void 0);
    if (!allDefined) {
      var missingDependencies = dependencies29.filter((dependency) => scope[dependency] === void 0);
      throw new Error('Cannot create function "'.concat(name28, '", ') + "some dependencies are missing: ".concat(missingDependencies.map((d) => '"'.concat(d, '"')).join(", "), "."));
    }
  }
  function isOptionalDependency(dependency) {
    return dependency && dependency[0] === "?";
  }
  function stripOptionalNotation(dependency) {
    return dependency && dependency[0] === "?" ? dependency.slice(1) : dependency;
  }

  // node_modules/mathjs/lib/esm/utils/customs.js
  function getSafeProperty(object, prop) {
    if (isPlainObject(object) && isSafeProperty(object, prop)) {
      return object[prop];
    }
    if (typeof object[prop] === "function" && isSafeMethod(object, prop)) {
      throw new Error('Cannot access method "' + prop + '" as a property');
    }
    throw new Error('No access to property "' + prop + '"');
  }
  function setSafeProperty(object, prop, value) {
    if (isPlainObject(object) && isSafeProperty(object, prop)) {
      object[prop] = value;
      return value;
    }
    throw new Error('No access to property "' + prop + '"');
  }
  function hasSafeProperty(object, prop) {
    return prop in object;
  }
  function isSafeProperty(object, prop) {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (hasOwnProperty(safeNativeProperties, prop)) {
      return true;
    }
    if (prop in Object.prototype) {
      return false;
    }
    if (prop in Function.prototype) {
      return false;
    }
    return true;
  }
  function isSafeMethod(object, method) {
    if (object === null || object === void 0 || typeof object[method] !== "function") {
      return false;
    }
    if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
      return false;
    }
    if (hasOwnProperty(safeNativeMethods, method)) {
      return true;
    }
    if (method in Object.prototype) {
      return false;
    }
    if (method in Function.prototype) {
      return false;
    }
    return true;
  }
  function isPlainObject(object) {
    return typeof object === "object" && object && object.constructor === Object;
  }
  var safeNativeProperties = {
    length: true,
    name: true
  };
  var safeNativeMethods = {
    toString: true,
    valueOf: true,
    toLocaleString: true
  };

  // node_modules/mathjs/lib/esm/utils/map.js
  var ObjectWrappingMap = class {
    constructor(object) {
      this.wrappedObject = object;
    }
    keys() {
      return Object.keys(this.wrappedObject);
    }
    get(key) {
      return getSafeProperty(this.wrappedObject, key);
    }
    set(key, value) {
      setSafeProperty(this.wrappedObject, key, value);
      return this;
    }
    has(key) {
      return hasSafeProperty(this.wrappedObject, key);
    }
  };
  function isMap(object) {
    if (!object) {
      return false;
    }
    return object instanceof Map || object instanceof ObjectWrappingMap || typeof object.set === "function" && typeof object.get === "function" && typeof object.keys === "function" && typeof object.has === "function";
  }

  // node_modules/mathjs/lib/esm/core/function/typed.js
  var _createTyped2 = function _createTyped() {
    _createTyped2 = import_typed_function.default.create;
    return import_typed_function.default;
  };
  var dependencies = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"];
  var createTyped = /* @__PURE__ */ factory("typed", dependencies, function createTyped2(_ref) {
    var {
      BigNumber: BigNumber2,
      Complex: Complex3,
      DenseMatrix: DenseMatrix2,
      Fraction: Fraction3
    } = _ref;
    var typed2 = _createTyped2();
    typed2.types = [
      {
        name: "number",
        test: isNumber
      },
      {
        name: "Complex",
        test: isComplex
      },
      {
        name: "BigNumber",
        test: isBigNumber
      },
      {
        name: "Fraction",
        test: isFraction
      },
      {
        name: "Unit",
        test: isUnit
      },
      {
        name: "string",
        test: isString
      },
      {
        name: "Chain",
        test: isChain
      },
      {
        name: "Array",
        test: isArray
      },
      {
        name: "Matrix",
        test: isMatrix
      },
      {
        name: "DenseMatrix",
        test: isDenseMatrix
      },
      {
        name: "SparseMatrix",
        test: isSparseMatrix
      },
      {
        name: "Range",
        test: isRange
      },
      {
        name: "Index",
        test: isIndex
      },
      {
        name: "boolean",
        test: isBoolean
      },
      {
        name: "ResultSet",
        test: isResultSet
      },
      {
        name: "Help",
        test: isHelp
      },
      {
        name: "function",
        test: isFunction
      },
      {
        name: "Date",
        test: isDate
      },
      {
        name: "RegExp",
        test: isRegExp
      },
      {
        name: "null",
        test: isNull
      },
      {
        name: "undefined",
        test: isUndefined
      },
      {
        name: "AccessorNode",
        test: isAccessorNode
      },
      {
        name: "ArrayNode",
        test: isArrayNode
      },
      {
        name: "AssignmentNode",
        test: isAssignmentNode
      },
      {
        name: "BlockNode",
        test: isBlockNode
      },
      {
        name: "ConditionalNode",
        test: isConditionalNode
      },
      {
        name: "ConstantNode",
        test: isConstantNode
      },
      {
        name: "FunctionNode",
        test: isFunctionNode
      },
      {
        name: "FunctionAssignmentNode",
        test: isFunctionAssignmentNode
      },
      {
        name: "IndexNode",
        test: isIndexNode
      },
      {
        name: "Node",
        test: isNode
      },
      {
        name: "ObjectNode",
        test: isObjectNode
      },
      {
        name: "OperatorNode",
        test: isOperatorNode
      },
      {
        name: "ParenthesisNode",
        test: isParenthesisNode
      },
      {
        name: "RangeNode",
        test: isRangeNode
      },
      {
        name: "SymbolNode",
        test: isSymbolNode
      },
      {
        name: "Map",
        test: isMap
      },
      {
        name: "Object",
        test: isObject
      }
      // order 'Object' last, it matches on other classes too
    ];
    typed2.conversions = [{
      from: "number",
      to: "BigNumber",
      convert: function convert(x) {
        if (!BigNumber2) {
          throwNoBignumber(x);
        }
        if (digits(x) > 15) {
          throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + x + "). Use function bignumber(x) to convert to BigNumber.");
        }
        return new BigNumber2(x);
      }
    }, {
      from: "number",
      to: "Complex",
      convert: function convert(x) {
        if (!Complex3) {
          throwNoComplex(x);
        }
        return new Complex3(x, 0);
      }
    }, {
      from: "number",
      to: "string",
      convert: function convert(x) {
        return x + "";
      }
    }, {
      from: "BigNumber",
      to: "Complex",
      convert: function convert(x) {
        if (!Complex3) {
          throwNoComplex(x);
        }
        return new Complex3(x.toNumber(), 0);
      }
    }, {
      from: "Fraction",
      to: "BigNumber",
      convert: function convert(x) {
        throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
      }
    }, {
      from: "Fraction",
      to: "Complex",
      convert: function convert(x) {
        if (!Complex3) {
          throwNoComplex(x);
        }
        return new Complex3(x.valueOf(), 0);
      }
    }, {
      from: "number",
      to: "Fraction",
      convert: function convert(x) {
        if (!Fraction3) {
          throwNoFraction(x);
        }
        var f = new Fraction3(x);
        if (f.valueOf() !== x) {
          throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + x + "). Use function fraction(x) to convert to Fraction.");
        }
        return f;
      }
    }, {
      // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
      //  from: 'Fraction',
      //  to: 'number',
      //  convert: function (x) {
      //    return x.valueOf()
      //  }
      // }, {
      from: "string",
      to: "number",
      convert: function convert(x) {
        var n = Number(x);
        if (isNaN(n)) {
          throw new Error('Cannot convert "' + x + '" to a number');
        }
        return n;
      }
    }, {
      from: "string",
      to: "BigNumber",
      convert: function convert(x) {
        if (!BigNumber2) {
          throwNoBignumber(x);
        }
        try {
          return new BigNumber2(x);
        } catch (err) {
          throw new Error('Cannot convert "' + x + '" to BigNumber');
        }
      }
    }, {
      from: "string",
      to: "Fraction",
      convert: function convert(x) {
        if (!Fraction3) {
          throwNoFraction(x);
        }
        try {
          return new Fraction3(x);
        } catch (err) {
          throw new Error('Cannot convert "' + x + '" to Fraction');
        }
      }
    }, {
      from: "string",
      to: "Complex",
      convert: function convert(x) {
        if (!Complex3) {
          throwNoComplex(x);
        }
        try {
          return new Complex3(x);
        } catch (err) {
          throw new Error('Cannot convert "' + x + '" to Complex');
        }
      }
    }, {
      from: "boolean",
      to: "number",
      convert: function convert(x) {
        return +x;
      }
    }, {
      from: "boolean",
      to: "BigNumber",
      convert: function convert(x) {
        if (!BigNumber2) {
          throwNoBignumber(x);
        }
        return new BigNumber2(+x);
      }
    }, {
      from: "boolean",
      to: "Fraction",
      convert: function convert(x) {
        if (!Fraction3) {
          throwNoFraction(x);
        }
        return new Fraction3(+x);
      }
    }, {
      from: "boolean",
      to: "string",
      convert: function convert(x) {
        return String(x);
      }
    }, {
      from: "Array",
      to: "Matrix",
      convert: function convert(array) {
        if (!DenseMatrix2) {
          throwNoMatrix();
        }
        return new DenseMatrix2(array);
      }
    }, {
      from: "Matrix",
      to: "Array",
      convert: function convert(matrix2) {
        return matrix2.valueOf();
      }
    }];
    return typed2;
  });
  function throwNoBignumber(x) {
    throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
  }
  function throwNoComplex(x) {
    throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
  }
  function throwNoMatrix() {
    throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
  }
  function throwNoFraction(x) {
    throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
  }

  // node_modules/decimal.js/decimal.mjs
  var EXP_LIMIT = 9e15;
  var MAX_DIGITS = 1e9;
  var NUMERALS = "0123456789abcdef";
  var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
  var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
  var DEFAULTS = {
    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed at run-time using the `Decimal.config` method.
    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,
    // 1 to MAX_DIGITS
    // The rounding mode used when rounding to `precision`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,
    // 0 to 8
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP         0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN  6 The IEEE 754 remainder function.
    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
    //
    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
    // division (9) are commonly used for the modulus operation. The other rounding modes can also
    // be used, but they may not give useful results.
    modulo: 1,
    // 0 to 9
    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,
    // 0 to -EXP_LIMIT
    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos: 21,
    // 0 to EXP_LIMIT
    // The minimum exponent value, beneath which underflow to zero occurs.
    // JavaScript numbers: -324  (5e-324)
    minE: -EXP_LIMIT,
    // -1 to -EXP_LIMIT
    // The maximum exponent value, above which overflow to Infinity occurs.
    // JavaScript numbers: 308  (1.7976931348623157e+308)
    maxE: EXP_LIMIT,
    // 1 to EXP_LIMIT
    // Whether to use cryptographically-secure random number generation, if available.
    crypto: false
    // true/false
  };
  var inexact;
  var quadrant;
  var external = true;
  var decimalError = "[DecimalError] ";
  var invalidArgument = decimalError + "Invalid argument: ";
  var precisionLimitExceeded = decimalError + "Precision limit exceeded";
  var cryptoUnavailable = decimalError + "crypto unavailable";
  var tag = "[object Decimal]";
  var mathfloor = Math.floor;
  var mathpow = Math.pow;
  var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
  var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
  var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
  var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  var BASE = 1e7;
  var LOG_BASE = 7;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var LN10_PRECISION = LN10.length - 1;
  var PI_PRECISION = PI.length - 1;
  var P = { toStringTag: tag };
  P.absoluteValue = P.abs = function() {
    var x = new this.constructor(this);
    if (x.s < 0) x.s = 1;
    return finalise(x);
  };
  P.ceil = function() {
    return finalise(new this.constructor(this), this.e + 1, 2);
  };
  P.clampedTo = P.clamp = function(min2, max2) {
    var k, x = this, Ctor = x.constructor;
    min2 = new Ctor(min2);
    max2 = new Ctor(max2);
    if (!min2.s || !max2.s) return new Ctor(NaN);
    if (min2.gt(max2)) throw Error(invalidArgument + max2);
    k = x.cmp(min2);
    return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
  };
  P.comparedTo = P.cmp = function(y) {
    var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
    if (!xd || !yd) {
      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }
    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
    if (xs !== ys) return xs;
    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
    xdL = xd.length;
    ydL = yd.length;
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };
  P.cosine = P.cos = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.d) return new Ctor(NaN);
    if (!x.d[0]) return new Ctor(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };
  P.cubeRoot = P.cbrt = function() {
    var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    external = false;
    s = x.s * mathpow(x.s * x, 1 / 3);
    if (!s || Math.abs(s) == 1 / 0) {
      n = digitsToString(x.d);
      e = x.e;
      if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
      s = mathpow(n, 1 / 3);
      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new Ctor(n);
      r.s = x.s;
    } else {
      r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for (; ; ) {
      t = r;
      t3 = t.times(t).times(t);
      t3plusx = t3.plus(x);
      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);
        if (n == "9999" || !rep && n == "4999") {
          if (!rep) {
            finalise(t, e + 1, 0);
            if (t.times(t).times(t).eq(x)) {
              r = t;
              break;
            }
          }
          sd += 4;
          rep = 1;
        } else {
          if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
            finalise(r, e + 1, 1);
            m = !r.times(r).times(r).eq(x);
          }
          break;
        }
      }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  P.decimalPlaces = P.dp = function() {
    var w, d = this.d, n = NaN;
    if (d) {
      w = d.length - 1;
      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
      w = d[w];
      if (w) for (; w % 10 == 0; w /= 10) n--;
      if (n < 0) n = 0;
    }
    return n;
  };
  P.dividedBy = P.div = function(y) {
    return divide(this, new this.constructor(y));
  };
  P.dividedToIntegerBy = P.divToInt = function(y) {
    var x = this, Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };
  P.equals = P.eq = function(y) {
    return this.cmp(y) === 0;
  };
  P.floor = function() {
    return finalise(new this.constructor(this), this.e + 1, 3);
  };
  P.greaterThan = P.gt = function(y) {
    return this.cmp(y) > 0;
  };
  P.greaterThanOrEqualTo = P.gte = function(y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
  };
  P.hyperbolicCosine = P.cosh = function() {
    var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero()) return one;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 32) {
      k = Math.ceil(len / 3);
      n = (1 / tinyPow(4, k)).toString();
    } else {
      k = 16;
      n = "2.3283064365386962890625e-10";
    }
    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
    var cosh2_x, i = k, d8 = new Ctor(8);
    for (; i--; ) {
      cosh2_x = x.times(x);
      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }
    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  P.hyperbolicSine = P.sinh = function() {
    var k, pr, rm, len, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 3) {
      x = taylorSeries(Ctor, 2, x, x, true);
    } else {
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;
      x = x.times(1 / tinyPow(5, k));
      x = taylorSeries(Ctor, 2, x, x, true);
      var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
      for (; k--; ) {
        sinh2_x = x.times(x);
        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
    }
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(x, pr, rm, true);
  };
  P.hyperbolicTangent = P.tanh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(x.s);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;
    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };
  P.inverseCosine = P.acos = function() {
    var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
    if (k !== -1) {
      return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
    }
    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return halfPi.minus(x);
  };
  P.inverseHyperbolicCosine = P.acosh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).minus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  P.inverseHyperbolicSine = P.asinh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).plus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  P.inverseHyperbolicTangent = P.atanh = function() {
    var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();
    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
    Ctor.precision = wpr = xsd - x.e;
    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
    Ctor.precision = pr + 4;
    Ctor.rounding = 1;
    x = x.ln();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(0.5);
  };
  P.inverseSine = P.asin = function() {
    var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
    if (x.isZero()) return new Ctor(x);
    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (k !== -1) {
      if (k === 0) {
        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
        halfPi.s = x.s;
        return halfPi;
      }
      return new Ctor(NaN);
    }
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
  };
  P.inverseTangent = P.atan = function() {
    var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
    if (!x.isFinite()) {
      if (!x.s) return new Ctor(NaN);
      if (pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.5);
        r.s = x.s;
        return r;
      }
    } else if (x.isZero()) {
      return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.25);
      r.s = x.s;
      return r;
    }
    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;
    k = Math.min(28, wpr / LOG_BASE + 2 | 0);
    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
    external = false;
    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;
    for (; i !== -1; ) {
      px = px.times(x2);
      t = r.minus(px.div(n += 2));
      px = px.times(x2);
      r = t.plus(px.div(n += 2));
      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--; ) ;
    }
    if (k) r = r.times(2 << k - 1);
    external = true;
    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  P.isFinite = function() {
    return !!this.d;
  };
  P.isInteger = P.isInt = function() {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = P.isNeg = function() {
    return this.s < 0;
  };
  P.isPositive = P.isPos = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.d && this.d[0] === 0;
  };
  P.lessThan = P.lt = function(y) {
    return this.cmp(y) < 0;
  };
  P.lessThanOrEqualTo = P.lte = function(y) {
    return this.cmp(y) < 1;
  };
  P.logarithm = P.log = function(base) {
    var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
    if (base == null) {
      base = new Ctor(10);
      isBase10 = true;
    } else {
      base = new Ctor(base);
      d = base.d;
      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
      isBase10 = base.eq(10);
    }
    d = arg.d;
    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    }
    if (isBase10) {
      if (d.length > 1) {
        inf = true;
      } else {
        for (k = d[0]; k % 10 === 0; ) k /= 10;
        inf = k !== 1;
      }
    }
    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
    r = divide(num, denominator, sd, 1);
    if (checkRoundingDigits(r.d, k = pr, rm)) {
      do {
        sd += 10;
        num = naturalLogarithm(arg, sd);
        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
        r = divide(num, denominator, sd, 1);
        if (!inf) {
          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }
          break;
        }
      } while (checkRoundingDigits(r.d, k += 10, rm));
    }
    external = true;
    return finalise(r, pr, rm);
  };
  P.minus = P.sub = function(y) {
    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
      if (!x.s || !y.s) y = new Ctor(NaN);
      else if (x.d) y.s = -y.s;
      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
      return y;
    }
    if (x.s != y.s) {
      y.s = -y.s;
      return x.plus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
      if (yd[0]) y.s = -y.s;
      else if (xd[0]) y = new Ctor(x);
      else return new Ctor(rm === 3 ? -0 : 0);
      return external ? finalise(y, pr, rm) : y;
    }
    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);
    xd = xd.slice();
    k = xe - e;
    if (k) {
      xLTy = k < 0;
      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
      if (k > i) {
        k = i;
        d.length = 1;
      }
      d.reverse();
      for (i = k; i--; ) d.push(0);
      d.reverse();
    } else {
      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;
      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }
      k = 0;
    }
    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }
    len = xd.length;
    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
    for (i = yd.length; i > k; ) {
      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }
      xd[i] -= yd[i];
    }
    for (; xd[--len] === 0; ) xd.pop();
    for (; xd[0] === 0; xd.shift()) --e;
    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  P.modulo = P.mod = function(y) {
    var q, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
    if (!y.d || x.d && !x.d[0]) {
      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }
    external = false;
    if (Ctor.modulo == 9) {
      q = divide(x, y.abs(), 0, 3, 1);
      q.s *= y.s;
    } else {
      q = divide(x, y, 0, Ctor.modulo, 1);
    }
    q = q.times(y);
    external = true;
    return x.minus(q);
  };
  P.naturalExponential = P.exp = function() {
    return naturalExponential(this);
  };
  P.naturalLogarithm = P.ln = function() {
    return naturalLogarithm(this);
  };
  P.negated = P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
  };
  P.plus = P.add = function(y) {
    var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
      if (!x.s || !y.s) y = new Ctor(NaN);
      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
      return y;
    }
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
      if (!yd[0]) y = new Ctor(x);
      return external ? finalise(y, pr, rm) : y;
    }
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);
    xd = xd.slice();
    i = k - e;
    if (i) {
      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;
      if (i > len) {
        i = len;
        d.length = 1;
      }
      d.reverse();
      for (; i--; ) d.push(0);
      d.reverse();
    }
    len = xd.length;
    i = yd.length;
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }
    for (carry = 0; i; ) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }
    if (carry) {
      xd.unshift(carry);
      ++e;
    }
    for (len = xd.length; xd[--len] == 0; ) xd.pop();
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  P.precision = P.sd = function(z) {
    var k, x = this;
    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
    if (x.d) {
      k = getPrecision(x.d);
      if (z && x.e + 1 > k) k = x.e + 1;
    } else {
      k = NaN;
    }
    return k;
  };
  P.round = function() {
    var x = this, Ctor = x.constructor;
    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };
  P.sine = P.sin = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = sine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };
  P.squareRoot = P.sqrt = function() {
    var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
    if (s !== 1 || !d || !d[0]) {
      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }
    external = false;
    s = Math.sqrt(+x);
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(d);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for (; ; ) {
      t = r;
      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);
        if (n == "9999" || !rep && n == "4999") {
          if (!rep) {
            finalise(t, e + 1, 0);
            if (t.times(t).eq(x)) {
              r = t;
              break;
            }
          }
          sd += 4;
          rep = 1;
        } else {
          if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
            finalise(r, e + 1, 1);
            m = !r.times(r).eq(x);
          }
          break;
        }
      }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  P.tangent = P.tan = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;
    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };
  P.times = P.mul = function(y) {
    var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
    y.s *= x.s;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
    }
    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--; ) r.push(0);
    for (i = ydL; --i >= 0; ) {
      carry = 0;
      for (k = xdL + i; k > i; ) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }
      r[k] = (r[k] + carry) % BASE | 0;
    }
    for (; !r[--rL]; ) r.pop();
    if (carry) ++e;
    else r.shift();
    y.d = r;
    y.e = getBase10Exponent(r, e);
    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };
  P.toBinary = function(sd, rm) {
    return toStringBinary(this, 2, sd, rm);
  };
  P.toDecimalPlaces = P.toDP = function(dp, rm) {
    var x = this, Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0) return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    return finalise(x, dp + x.e + 1, rm);
  };
  P.toExponential = function(dp, rm) {
    var str, x = this, Ctor = x.constructor;
    if (dp === void 0) {
      str = finiteToString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), dp + 1, rm);
      str = finiteToString(x, true, dp + 1);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
  };
  P.toFixed = function(dp, rm) {
    var str, y, x = this, Ctor = x.constructor;
    if (dp === void 0) {
      str = finiteToString(x);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
      y = finalise(new Ctor(x), dp + x.e + 1, rm);
      str = finiteToString(y, false, dp + y.e + 1);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
  };
  P.toFraction = function(maxD) {
    var d, d0, d1, d2, e, k, n, n0, n12, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
    if (!xd) return new Ctor(x);
    n12 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);
    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
    if (maxD == null) {
      maxD = e > 0 ? d : n12;
    } else {
      n = new Ctor(maxD);
      if (!n.isInt() || n.lt(n12)) throw Error(invalidArgument + n);
      maxD = n.gt(d) ? e > 0 ? d : n12 : n;
    }
    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;
    for (; ; ) {
      q = divide(n, d, 0, 1, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.cmp(maxD) == 1) break;
      d0 = d1;
      d1 = d2;
      d2 = n12;
      n12 = n0.plus(q.times(d2));
      n0 = d2;
      d2 = d;
      d = n.minus(q.times(d2));
      n = d2;
    }
    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n12));
    d0 = d0.plus(d2.times(d1));
    n0.s = n12.s = x.s;
    r = divide(n12, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n12, d1] : [n0, d0];
    Ctor.precision = pr;
    external = true;
    return r;
  };
  P.toHexadecimal = P.toHex = function(sd, rm) {
    return toStringBinary(this, 16, sd, rm);
  };
  P.toNearest = function(y, rm) {
    var x = this, Ctor = x.constructor;
    x = new Ctor(x);
    if (y == null) {
      if (!x.d) return x;
      y = new Ctor(1);
      rm = Ctor.rounding;
    } else {
      y = new Ctor(y);
      if (rm === void 0) {
        rm = Ctor.rounding;
      } else {
        checkInt32(rm, 0, 8);
      }
      if (!x.d) return y.s ? x : y;
      if (!y.d) {
        if (y.s) y.s = x.s;
        return y;
      }
    }
    if (y.d[0]) {
      external = false;
      x = divide(x, y, 0, rm, 1).times(y);
      external = true;
      finalise(x);
    } else {
      y.s = x.s;
      x = y;
    }
    return x;
  };
  P.toNumber = function() {
    return +this;
  };
  P.toOctal = function(sd, rm) {
    return toStringBinary(this, 8, sd, rm);
  };
  P.toPower = P.pow = function(y) {
    var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
    x = new Ctor(x);
    if (x.eq(1)) return x;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (y.eq(1)) return finalise(x, pr, rm);
    e = mathfloor(y.e / LOG_BASE);
    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = intPow(Ctor, x, k, pr);
      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }
    s = x.s;
    if (s < 0) {
      if (e < y.d.length - 1) return new Ctor(NaN);
      if ((y.d[e] & 1) == 0) s = 1;
      if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
        x.s = s;
        return x;
      }
    }
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
    external = false;
    Ctor.rounding = x.s = 1;
    k = Math.min(12, (e + "").length);
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
    if (r.d) {
      r = finalise(r, pr + 5, 1);
      if (checkRoundingDigits(r.d, pr, rm)) {
        e = pr + 10;
        r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
        if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
      }
    }
    r.s = s;
    external = true;
    Ctor.rounding = rm;
    return finalise(r, pr, rm);
  };
  P.toPrecision = function(sd, rm) {
    var str, x = this, Ctor = x.constructor;
    if (sd === void 0) {
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), sd, rm);
      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
  };
  P.toSignificantDigits = P.toSD = function(sd, rm) {
    var x = this, Ctor = x.constructor;
    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    }
    return finalise(new Ctor(x), sd, rm);
  };
  P.toString = function() {
    var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() && !x.isZero() ? "-" + str : str;
  };
  P.truncated = P.trunc = function() {
    return finalise(new this.constructor(this), this.e + 1, 1);
  };
  P.valueOf = P.toJSON = function() {
    var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() ? "-" + str : str;
  };
  function digitsToString(d) {
    var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + "";
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }
      w = d[i];
      ws = w + "";
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return "0";
    }
    for (; w % 10 === 0; ) w /= 10;
    return str + w;
  }
  function checkInt32(i, min2, max2) {
    if (i !== ~~i || i < min2 || i > max2) {
      throw Error(invalidArgument + i);
    }
  }
  function checkRoundingDigits(d, i, rm, repeating) {
    var di, k, r, rd;
    for (k = d[0]; k >= 10; k /= 10) --i;
    if (--i < 0) {
      i += LOG_BASE;
      di = 0;
    } else {
      di = Math.ceil((i + 1) / LOG_BASE);
      i %= LOG_BASE;
    }
    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;
    if (repeating == null) {
      if (i < 3) {
        if (i == 0) rd = rd / 100 | 0;
        else if (i == 1) rd = rd / 10 | 0;
        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
      } else {
        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
      }
    } else {
      if (i < 4) {
        if (i == 0) rd = rd / 1e3 | 0;
        else if (i == 1) rd = rd / 100 | 0;
        else if (i == 2) rd = rd / 10 | 0;
        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
      } else {
        r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
      }
    }
    return r;
  }
  function convertBase(str, baseIn, baseOut) {
    var j, arr = [0], arrL, i = 0, strL = str.length;
    for (; i < strL; ) {
      for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
      arr[0] += NUMERALS.indexOf(str.charAt(i++));
      for (j = 0; j < arr.length; j++) {
        if (arr[j] > baseOut - 1) {
          if (arr[j + 1] === void 0) arr[j + 1] = 0;
          arr[j + 1] += arr[j] / baseOut | 0;
          arr[j] %= baseOut;
        }
      }
    }
    return arr.reverse();
  }
  function cosine(Ctor, x) {
    var k, len, y;
    if (x.isZero()) return x;
    len = x.d.length;
    if (len < 32) {
      k = Math.ceil(len / 3);
      y = (1 / tinyPow(4, k)).toString();
    } else {
      k = 16;
      y = "2.3283064365386962890625e-10";
    }
    Ctor.precision += k;
    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
    for (var i = k; i--; ) {
      var cos2x = x.times(x);
      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }
    Ctor.precision -= k;
    return x;
  }
  var divide = /* @__PURE__ */ function() {
    function multiplyInteger(x, k, base) {
      var temp, carry = 0, i = x.length;
      for (x = x.slice(); i--; ) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
      }
      if (carry) x.unshift(carry);
      return x;
    }
    function compare(a, b, aL, bL) {
      var i, r;
      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return r;
    }
    function subtract2(a, b, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; ) a.shift();
    }
    return function(x, y, pr, rm, dp, base) {
      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign3 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
      if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(
          // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
            // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
            xd && xd[0] == 0 || !yd ? sign3 * 0 : sign3 / 0
          )
        );
      }
      if (base) {
        logBase = 1;
        e = x.e - y.e;
      } else {
        base = BASE;
        logBase = LOG_BASE;
        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
      }
      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign3);
      qd = q.d = [];
      for (i = 0; yd[i] == (xd[i] || 0); i++) ;
      if (yd[i] > (xd[i] || 0)) e--;
      if (pr == null) {
        sd = pr = Ctor.precision;
        rm = Ctor.rounding;
      } else if (dp) {
        sd = pr + (x.e - y.e) + 1;
      } else {
        sd = pr;
      }
      if (sd < 0) {
        qd.push(1);
        more = true;
      } else {
        sd = sd / logBase + 2 | 0;
        i = 0;
        if (yL == 1) {
          k = 0;
          yd = yd[0];
          sd++;
          for (; (i < xL || k) && sd--; i++) {
            t = k * base + (xd[i] || 0);
            qd[i] = t / yd | 0;
            k = t % yd | 0;
          }
          more = k || i < xL;
        } else {
          k = base / (yd[0] + 1) | 0;
          if (k > 1) {
            yd = multiplyInteger(yd, k, base);
            xd = multiplyInteger(xd, k, base);
            yL = yd.length;
            xL = xd.length;
          }
          xi = yL;
          rem = xd.slice(0, yL);
          remL = rem.length;
          for (; remL < yL; ) rem[remL++] = 0;
          yz = yd.slice();
          yz.unshift(0);
          yd0 = yd[0];
          if (yd[1] >= base / 2) ++yd0;
          do {
            k = 0;
            cmp = compare(yd, rem, yL, remL);
            if (cmp < 0) {
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
              k = rem0 / yd0 | 0;
              if (k > 1) {
                if (k >= base) k = base - 1;
                prod = multiplyInteger(yd, k, base);
                prodL = prod.length;
                remL = rem.length;
                cmp = compare(prod, rem, prodL, remL);
                if (cmp == 1) {
                  k--;
                  subtract2(prod, yL < prodL ? yz : yd, prodL, base);
                }
              } else {
                if (k == 0) cmp = k = 1;
                prod = yd.slice();
              }
              prodL = prod.length;
              if (prodL < remL) prod.unshift(0);
              subtract2(rem, prod, remL, base);
              if (cmp == -1) {
                remL = rem.length;
                cmp = compare(yd, rem, yL, remL);
                if (cmp < 1) {
                  k++;
                  subtract2(rem, yL < remL ? yz : yd, remL, base);
                }
              }
              remL = rem.length;
            } else if (cmp === 0) {
              k++;
              rem = [0];
            }
            qd[i++] = k;
            if (cmp && rem[0]) {
              rem[remL++] = xd[xi] || 0;
            } else {
              rem = [xd[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] !== void 0) && sd--);
          more = rem[0] !== void 0;
        }
        if (!qd[0]) qd.shift();
      }
      if (logBase == 1) {
        q.e = e;
        inexact = more;
      } else {
        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
        q.e = i + e * logBase - 1;
        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
      }
      return q;
    };
  }();
  function finalise(x, sd, rm, isTruncated) {
    var digits2, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
    out: if (sd != null) {
      xd = x.d;
      if (!xd) return x;
      for (digits2 = 1, k = xd[0]; k >= 10; k /= 10) digits2++;
      i = sd - digits2;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits2 - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; ) xd.push(0);
            w = rd = 0;
            digits2 = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits2 = 1; k >= 10; k /= 10) digits2++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits2;
          rd = j < 0 ? 0 : w / mathpow(10, digits2 - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits2 - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits2 - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits2 - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10) k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE) xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE) break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; ) xd.pop();
    }
    if (external) {
      if (x.e > Ctor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < Ctor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
    return x;
  }
  function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x);
    var k, e = x.e, str = digitsToString(x.d), len = str.length;
    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + "." + str.slice(1);
      }
      str = str + (x.e < 0 ? "e" : "e+") + x.e;
    } else if (e < 0) {
      str = "0." + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += ".";
        str += getZeroString(k);
      }
    }
    return str;
  }
  function getBase10Exponent(digits2, e) {
    var w = digits2[0];
    for (e *= LOG_BASE; w >= 10; w /= 10) e++;
    return e;
  }
  function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
  }
  function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
  }
  function getPrecision(digits2) {
    var w = digits2.length - 1, len = w * LOG_BASE + 1;
    w = digits2[w];
    if (w) {
      for (; w % 10 == 0; w /= 10) len--;
      for (w = digits2[0]; w >= 10; w /= 10) len++;
    }
    return len;
  }
  function getZeroString(k) {
    var zs = "";
    for (; k--; ) zs += "0";
    return zs;
  }
  function intPow(Ctor, x, n, pr) {
    var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for (; ; ) {
      if (n % 2) {
        r = r.times(x);
        if (truncate(r.d, k)) isTruncated = true;
      }
      n = mathfloor(n / 2);
      if (n === 0) {
        n = r.d.length - 1;
        if (isTruncated && r.d[n] === 0) ++r.d[n];
        break;
      }
      x = x.times(x);
      truncate(x.d, k);
    }
    external = true;
    return r;
  }
  function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
  }
  function maxOrMin(Ctor, args, ltgt) {
    var y, x = new Ctor(args[0]), i = 0;
    for (; ++i < args.length; ) {
      y = new Ctor(args[i]);
      if (!y.s) {
        x = y;
        break;
      } else if (x[ltgt](y)) {
        x = y;
      }
    }
    return x;
  }
  function naturalExponential(x, sd) {
    var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
    if (!x.d || !x.d[0] || x.e > 17) {
      return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    t = new Ctor(0.03125);
    while (x.e > -2) {
      x = x.times(t);
      k += 5;
    }
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow2 = sum2 = new Ctor(1);
    Ctor.precision = wpr;
    for (; ; ) {
      pow2 = finalise(pow2.times(x), wpr, 1);
      denominator = denominator.times(++i);
      t = sum2.plus(divide(pow2, denominator, wpr, 1));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
        j = k;
        while (j--) sum2 = finalise(sum2.times(sum2), wpr, 1);
        if (sd == null) {
          if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += 10;
            denominator = pow2 = t = new Ctor(1);
            i = 0;
            rep++;
          } else {
            return finalise(sum2, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum2;
        }
      }
      sum2 = t;
    }
  }
  function naturalLogarithm(y, sd) {
    var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);
    if (Math.abs(e = x.e) < 15e14) {
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }
      e = x.e;
      if (c0 > 1) {
        x = new Ctor("0." + c);
        e++;
      } else {
        x = new Ctor(c0 + "." + c.slice(1));
      }
    } else {
      t = getLn10(Ctor, wpr + 2, pr).times(e + "");
      x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;
      return sd == null ? finalise(x, pr, rm, external = true) : x;
    }
    x1 = x;
    sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;
    for (; ; ) {
      numerator = finalise(numerator.times(x2), wpr, 1);
      t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
        sum2 = sum2.times(2);
        if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
        sum2 = divide(sum2, new Ctor(n), wpr, 1);
        if (sd == null) {
          if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += guard;
            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = rep = 1;
          } else {
            return finalise(sum2, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum2;
        }
      }
      sum2 = t;
      denominator += 2;
    }
  }
  function nonFiniteToString(x) {
    return String(x.s * x.s / 0);
  }
  function parseDecimal(x, str) {
    var e, i, len;
    if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
    if ((i = str.search(/e/i)) > 0) {
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {
      e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
    str = str.slice(i, len);
    if (str) {
      len -= i;
      x.e = e = e - i - 1;
      x.d = [];
      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;
      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }
      for (; i--; ) str += "0";
      x.d.push(+str);
      if (external) {
        if (x.e > x.constructor.maxE) {
          x.d = null;
          x.e = NaN;
        } else if (x.e < x.constructor.minE) {
          x.e = 0;
          x.d = [0];
        }
      }
    } else {
      x.e = 0;
      x.d = [0];
    }
    return x;
  }
  function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
    if (str.indexOf("_") > -1) {
      str = str.replace(/(\d)_(?=\d)/g, "$1");
      if (isDecimal.test(str)) return parseDecimal(x, str);
    } else if (str === "Infinity" || str === "NaN") {
      if (!+str) x.s = NaN;
      x.e = NaN;
      x.d = null;
      return x;
    }
    if (isHex.test(str)) {
      base = 16;
      str = str.toLowerCase();
    } else if (isBinary.test(str)) {
      base = 2;
    } else if (isOctal.test(str)) {
      base = 8;
    } else {
      throw Error(invalidArgument + str);
    }
    i = str.search(/p/i);
    if (i > 0) {
      p = +str.slice(i + 1);
      str = str.substring(2, i);
    } else {
      str = str.slice(2);
    }
    i = str.indexOf(".");
    isFloat = i >= 0;
    Ctor = x.constructor;
    if (isFloat) {
      str = str.replace(".", "");
      len = str.length;
      i = len - i;
      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }
    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;
    for (i = xe; xd[i] === 0; --i) xd.pop();
    if (i < 0) return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;
    if (isFloat) x = divide(x, divisor, len * 4);
    if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
    external = true;
    return x;
  }
  function sine(Ctor, x) {
    var k, len = x.d.length;
    if (len < 3) {
      return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
    }
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x);
    var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sin2_x = x.times(x);
      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }
    return x;
  }
  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
    external = false;
    x2 = x.times(x);
    u = new Ctor(y);
    for (; ; ) {
      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
      u = isHyperbolic ? y.plus(t) : y.minus(t);
      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
      t = u.plus(y);
      if (t.d[k] !== void 0) {
        for (j = k; t.d[j] === u.d[j] && j--; ) ;
        if (j == -1) break;
      }
      j = u;
      u = y;
      y = t;
      t = j;
      i++;
    }
    external = true;
    t.d.length = k + 1;
    return t;
  }
  function tinyPow(b, e) {
    var n = b;
    while (--e) n *= b;
    return n;
  }
  function toLessThanHalfPi(Ctor, x) {
    var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
    x = x.abs();
    if (x.lte(halfPi)) {
      quadrant = isNeg ? 4 : 1;
      return x;
    }
    t = x.divToInt(pi);
    if (t.isZero()) {
      quadrant = isNeg ? 3 : 2;
    } else {
      x = x.minus(t.times(pi));
      if (x.lte(halfPi)) {
        quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
        return x;
      }
      quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
    }
    return x.minus(pi).abs();
  }
  function toStringBinary(x, baseOut, sd, rm) {
    var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
    if (isExp) {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    } else {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    }
    if (!x.isFinite()) {
      str = nonFiniteToString(x);
    } else {
      str = finiteToString(x);
      i = str.indexOf(".");
      if (isExp) {
        base = 2;
        if (baseOut == 16) {
          sd = sd * 4 - 3;
        } else if (baseOut == 8) {
          sd = sd * 3 - 2;
        }
      } else {
        base = baseOut;
      }
      if (i >= 0) {
        str = str.replace(".", "");
        y = new Ctor(1);
        y.e = str.length - i;
        y.d = convertBase(finiteToString(y), 10, base);
        y.e = y.d.length;
      }
      xd = convertBase(str, 10, base);
      e = len = xd.length;
      for (; xd[--len] == 0; ) xd.pop();
      if (!xd[0]) {
        str = isExp ? "0p+0" : "0";
      } else {
        if (i < 0) {
          e--;
        } else {
          x = new Ctor(x);
          x.d = xd;
          x.e = e;
          x = divide(x, y, sd, rm, 0, base);
          xd = x.d;
          e = x.e;
          roundUp = inexact;
        }
        i = xd[sd];
        k = base / 2;
        roundUp = roundUp || xd[sd + 1] !== void 0;
        roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
        xd.length = sd;
        if (roundUp) {
          for (; ++xd[--sd] > base - 1; ) {
            xd[sd] = 0;
            if (!sd) {
              ++e;
              xd.unshift(1);
            }
          }
        }
        for (len = xd.length; !xd[len - 1]; --len) ;
        for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
        if (isExp) {
          if (len > 1) {
            if (baseOut == 16 || baseOut == 8) {
              i = baseOut == 16 ? 4 : 3;
              for (--len; len % i; len++) str += "0";
              xd = convertBase(str, base, baseOut);
              for (len = xd.length; !xd[len - 1]; --len) ;
              for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
            } else {
              str = str.charAt(0) + "." + str.slice(1);
            }
          }
          str = str + (e < 0 ? "p" : "p+") + e;
        } else if (e < 0) {
          for (; ++e; ) str = "0" + str;
          str = "0." + str;
        } else {
          if (++e > len) for (e -= len; e--; ) str += "0";
          else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
        }
      }
      str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
    }
    return x.s < 0 ? "-" + str : str;
  }
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }
  function abs(x) {
    return new this(x).abs();
  }
  function acos(x) {
    return new this(x).acos();
  }
  function acosh(x) {
    return new this(x).acosh();
  }
  function add(x, y) {
    return new this(x).plus(y);
  }
  function asin(x) {
    return new this(x).asin();
  }
  function asinh(x) {
    return new this(x).asinh();
  }
  function atan(x) {
    return new this(x).atan();
  }
  function atanh(x) {
    return new this(x).atanh();
  }
  function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
    if (!y.s || !x.s) {
      r = new this(NaN);
    } else if (!y.d && !x.d) {
      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
      r.s = y.s;
    } else if (!x.d || y.isZero()) {
      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
      r.s = y.s;
    } else if (!y.d || x.isZero()) {
      r = getPi(this, wpr, 1).times(0.5);
      r.s = y.s;
    } else if (x.s < 0) {
      this.precision = wpr;
      this.rounding = 1;
      r = this.atan(divide(y, x, wpr, 1));
      x = getPi(this, wpr, 1);
      this.precision = pr;
      this.rounding = rm;
      r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
      r = this.atan(divide(y, x, wpr, 1));
    }
    return r;
  }
  function cbrt3(x) {
    return new this(x).cbrt();
  }
  function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
  }
  function clamp(x, min2, max2) {
    return new this(x).clamp(min2, max2);
  }
  function config3(obj) {
    if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
    var i, p, v, useDefaults = obj.defaults === true, ps = [
      "precision",
      1,
      MAX_DIGITS,
      "rounding",
      0,
      8,
      "toExpNeg",
      -EXP_LIMIT,
      0,
      "toExpPos",
      0,
      EXP_LIMIT,
      "maxE",
      0,
      EXP_LIMIT,
      "minE",
      -EXP_LIMIT,
      0,
      "modulo",
      0,
      9
    ];
    for (i = 0; i < ps.length; i += 3) {
      if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
      if ((v = obj[p]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ": " + v);
      }
    }
    if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (v === true || v === false || v === 0 || v === 1) {
        if (v) {
          if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
            this[p] = true;
          } else {
            throw Error(cryptoUnavailable);
          }
        } else {
          this[p] = false;
        }
      } else {
        throw Error(invalidArgument + p + ": " + v);
      }
    }
    return this;
  }
  function cos(x) {
    return new this(x).cos();
  }
  function cosh(x) {
    return new this(x).cosh();
  }
  function clone2(obj) {
    var i, p, ps;
    function Decimal2(v) {
      var e, i2, t, x = this;
      if (!(x instanceof Decimal2)) return new Decimal2(v);
      x.constructor = Decimal2;
      if (isDecimalInstance(v)) {
        x.s = v.s;
        if (external) {
          if (!v.d || v.e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (v.e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = v.e;
            x.d = v.d.slice();
          }
        } else {
          x.e = v.e;
          x.d = v.d ? v.d.slice() : v.d;
        }
        return;
      }
      t = typeof v;
      if (t === "number") {
        if (v === 0) {
          x.s = 1 / v < 0 ? -1 : 1;
          x.e = 0;
          x.d = [0];
          return;
        }
        if (v < 0) {
          v = -v;
          x.s = -1;
        } else {
          x.s = 1;
        }
        if (v === ~~v && v < 1e7) {
          for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
          if (external) {
            if (e > Decimal2.maxE) {
              x.e = NaN;
              x.d = null;
            } else if (e < Decimal2.minE) {
              x.e = 0;
              x.d = [0];
            } else {
              x.e = e;
              x.d = [v];
            }
          } else {
            x.e = e;
            x.d = [v];
          }
          return;
        } else if (v * 0 !== 0) {
          if (!v) x.s = NaN;
          x.e = NaN;
          x.d = null;
          return;
        }
        return parseDecimal(x, v.toString());
      } else if (t !== "string") {
        throw Error(invalidArgument + v);
      }
      if ((i2 = v.charCodeAt(0)) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        if (i2 === 43) v = v.slice(1);
        x.s = 1;
      }
      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }
    Decimal2.prototype = P;
    Decimal2.ROUND_UP = 0;
    Decimal2.ROUND_DOWN = 1;
    Decimal2.ROUND_CEIL = 2;
    Decimal2.ROUND_FLOOR = 3;
    Decimal2.ROUND_HALF_UP = 4;
    Decimal2.ROUND_HALF_DOWN = 5;
    Decimal2.ROUND_HALF_EVEN = 6;
    Decimal2.ROUND_HALF_CEIL = 7;
    Decimal2.ROUND_HALF_FLOOR = 8;
    Decimal2.EUCLID = 9;
    Decimal2.config = Decimal2.set = config3;
    Decimal2.clone = clone2;
    Decimal2.isDecimal = isDecimalInstance;
    Decimal2.abs = abs;
    Decimal2.acos = acos;
    Decimal2.acosh = acosh;
    Decimal2.add = add;
    Decimal2.asin = asin;
    Decimal2.asinh = asinh;
    Decimal2.atan = atan;
    Decimal2.atanh = atanh;
    Decimal2.atan2 = atan2;
    Decimal2.cbrt = cbrt3;
    Decimal2.ceil = ceil;
    Decimal2.clamp = clamp;
    Decimal2.cos = cos;
    Decimal2.cosh = cosh;
    Decimal2.div = div;
    Decimal2.exp = exp;
    Decimal2.floor = floor;
    Decimal2.hypot = hypot;
    Decimal2.ln = ln;
    Decimal2.log = log;
    Decimal2.log10 = log103;
    Decimal2.log2 = log23;
    Decimal2.max = max;
    Decimal2.min = min;
    Decimal2.mod = mod;
    Decimal2.mul = mul;
    Decimal2.pow = pow;
    Decimal2.random = random;
    Decimal2.round = round;
    Decimal2.sign = sign2;
    Decimal2.sin = sin;
    Decimal2.sinh = sinh;
    Decimal2.sqrt = sqrt;
    Decimal2.sub = sub;
    Decimal2.sum = sum;
    Decimal2.tan = tan;
    Decimal2.tanh = tanh;
    Decimal2.trunc = trunc;
    if (obj === void 0) obj = {};
    if (obj) {
      if (obj.defaults !== true) {
        ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
        for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
      }
    }
    Decimal2.config(obj);
    return Decimal2;
  }
  function div(x, y) {
    return new this(x).div(y);
  }
  function exp(x) {
    return new this(x).exp();
  }
  function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
  }
  function hypot() {
    var i, n, t = new this(0);
    external = false;
    for (i = 0; i < arguments.length; ) {
      n = new this(arguments[i++]);
      if (!n.d) {
        if (n.s) {
          external = true;
          return new this(1 / 0);
        }
        t = n;
      } else if (t.d) {
        t = t.plus(n.times(n));
      }
    }
    external = true;
    return t.sqrt();
  }
  function isDecimalInstance(obj) {
    return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
  }
  function ln(x) {
    return new this(x).ln();
  }
  function log(x, y) {
    return new this(x).log(y);
  }
  function log23(x) {
    return new this(x).log(2);
  }
  function log103(x) {
    return new this(x).log(10);
  }
  function max() {
    return maxOrMin(this, arguments, "lt");
  }
  function min() {
    return maxOrMin(this, arguments, "gt");
  }
  function mod(x, y) {
    return new this(x).mod(y);
  }
  function mul(x, y) {
    return new this(x).mul(y);
  }
  function pow(x, y) {
    return new this(x).pow(y);
  }
  function random(sd) {
    var d, e, k, n, i = 0, r = new this(1), rd = [];
    if (sd === void 0) sd = this.precision;
    else checkInt32(sd, 1, MAX_DIGITS);
    k = Math.ceil(sd / LOG_BASE);
    if (!this.crypto) {
      for (; i < k; ) rd[i++] = Math.random() * 1e7 | 0;
    } else if (crypto.getRandomValues) {
      d = crypto.getRandomValues(new Uint32Array(k));
      for (; i < k; ) {
        n = d[i];
        if (n >= 429e7) {
          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
        } else {
          rd[i++] = n % 1e7;
        }
      }
    } else if (crypto.randomBytes) {
      d = crypto.randomBytes(k *= 4);
      for (; i < k; ) {
        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
        if (n >= 214e7) {
          crypto.randomBytes(4).copy(d, i);
        } else {
          rd.push(n % 1e7);
          i += 4;
        }
      }
      i = k / 4;
    } else {
      throw Error(cryptoUnavailable);
    }
    k = rd[--i];
    sd %= LOG_BASE;
    if (k && sd) {
      n = mathpow(10, LOG_BASE - sd);
      rd[i] = (k / n | 0) * n;
    }
    for (; rd[i] === 0; i--) rd.pop();
    if (i < 0) {
      e = 0;
      rd = [0];
    } else {
      e = -1;
      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
      if (k < LOG_BASE) e -= LOG_BASE - k;
    }
    r.e = e;
    r.d = rd;
    return r;
  }
  function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
  }
  function sign2(x) {
    x = new this(x);
    return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
  }
  function sin(x) {
    return new this(x).sin();
  }
  function sinh(x) {
    return new this(x).sinh();
  }
  function sqrt(x) {
    return new this(x).sqrt();
  }
  function sub(x, y) {
    return new this(x).sub(y);
  }
  function sum() {
    var i = 0, args = arguments, x = new this(args[i]);
    external = false;
    for (; x.s && ++i < args.length; ) x = x.plus(args[i]);
    external = true;
    return finalise(x, this.precision, this.rounding);
  }
  function tan(x) {
    return new this(x).tan();
  }
  function tanh(x) {
    return new this(x).tanh();
  }
  function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
  }
  P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
  P[Symbol.toStringTag] = "Decimal";
  var Decimal = P.constructor = clone2(DEFAULTS);
  LN10 = new Decimal(LN10);
  PI = new Decimal(PI);
  var decimal_default = Decimal;

  // node_modules/mathjs/lib/esm/type/bignumber/BigNumber.js
  var name = "BigNumber";
  var dependencies2 = ["?on", "config"];
  var createBigNumberClass = /* @__PURE__ */ factory(name, dependencies2, (_ref) => {
    var {
      on,
      config: config4
    } = _ref;
    var BigNumber2 = decimal_default.clone({
      precision: config4.precision,
      modulo: decimal_default.EUCLID
    });
    BigNumber2.prototype = Object.create(BigNumber2.prototype);
    BigNumber2.prototype.type = "BigNumber";
    BigNumber2.prototype.isBigNumber = true;
    BigNumber2.prototype.toJSON = function() {
      return {
        mathjs: "BigNumber",
        value: this.toString()
      };
    };
    BigNumber2.fromJSON = function(json) {
      return new BigNumber2(json.value);
    };
    if (on) {
      on("config", function(curr, prev) {
        if (curr.precision !== prev.precision) {
          BigNumber2.config({
            precision: curr.precision
          });
        }
      });
    }
    return BigNumber2;
  }, {
    isClass: true
  });

  // node_modules/mathjs/lib/esm/type/complex/Complex.js
  var import_complex = __toESM(require_complex(), 1);
  var name2 = "Complex";
  var dependencies3 = [];
  var createComplexClass = /* @__PURE__ */ factory(name2, dependencies3, () => {
    import_complex.default.prototype.type = "Complex";
    import_complex.default.prototype.isComplex = true;
    import_complex.default.prototype.toJSON = function() {
      return {
        mathjs: "Complex",
        re: this.re,
        im: this.im
      };
    };
    import_complex.default.prototype.toPolar = function() {
      return {
        r: this.abs(),
        phi: this.arg()
      };
    };
    import_complex.default.prototype.format = function(options) {
      var str = "";
      var im = this.im;
      var re = this.re;
      var strRe = format(this.re, options);
      var strIm = format(this.im, options);
      var precision = isNumber(options) ? options : options ? options.precision : null;
      if (precision !== null) {
        var epsilon = Math.pow(10, -precision);
        if (Math.abs(re / im) < epsilon) {
          re = 0;
        }
        if (Math.abs(im / re) < epsilon) {
          im = 0;
        }
      }
      if (im === 0) {
        str = strRe;
      } else if (re === 0) {
        if (im === 1) {
          str = "i";
        } else if (im === -1) {
          str = "-i";
        } else {
          str = strIm + "i";
        }
      } else {
        if (im < 0) {
          if (im === -1) {
            str = strRe + " - i";
          } else {
            str = strRe + " - " + strIm.substring(1) + "i";
          }
        } else {
          if (im === 1) {
            str = strRe + " + i";
          } else {
            str = strRe + " + " + strIm + "i";
          }
        }
      }
      return str;
    };
    import_complex.default.fromPolar = function(args) {
      switch (arguments.length) {
        case 1: {
          var arg = arguments[0];
          if (typeof arg === "object") {
            return (0, import_complex.default)(arg);
          } else {
            throw new TypeError("Input has to be an object with r and phi keys.");
          }
        }
        case 2: {
          var r = arguments[0];
          var phi = arguments[1];
          if (isNumber(r)) {
            if (isUnit(phi) && phi.hasBase("ANGLE")) {
              phi = phi.toNumber("rad");
            }
            if (isNumber(phi)) {
              return new import_complex.default({
                r,
                phi
              });
            }
            throw new TypeError("Phi is not a number nor an angle unit.");
          } else {
            throw new TypeError("Radius r is not a number.");
          }
        }
        default:
          throw new SyntaxError("Wrong number of arguments in function fromPolar");
      }
    };
    import_complex.default.prototype.valueOf = import_complex.default.prototype.toString;
    import_complex.default.fromJSON = function(json) {
      return new import_complex.default(json);
    };
    import_complex.default.compare = function(a, b) {
      if (a.re > b.re) {
        return 1;
      }
      if (a.re < b.re) {
        return -1;
      }
      if (a.im > b.im) {
        return 1;
      }
      if (a.im < b.im) {
        return -1;
      }
      return 0;
    };
    return import_complex.default;
  }, {
    isClass: true
  });

  // node_modules/fraction.js/fraction.js
  var MAX_CYCLE_LEN = 2e3;
  var P2 = {
    "s": 1,
    "n": 0,
    "d": 1
  };
  function assign(n, s) {
    if (isNaN(n = parseInt(n, 10))) {
      throw InvalidParameter();
    }
    return n * s;
  }
  function newFraction(n, d) {
    if (d === 0) {
      throw DivisionByZero();
    }
    var f = Object.create(Fraction.prototype);
    f["s"] = n < 0 ? -1 : 1;
    n = n < 0 ? -n : n;
    var a = gcd(n, d);
    f["n"] = n / a;
    f["d"] = d / a;
    return f;
  }
  function factorize(num) {
    var factors = {};
    var n = num;
    var i = 2;
    var s = 4;
    while (s <= n) {
      while (n % i === 0) {
        n /= i;
        factors[i] = (factors[i] || 0) + 1;
      }
      s += 1 + 2 * i++;
    }
    if (n !== num) {
      if (n > 1)
        factors[n] = (factors[n] || 0) + 1;
    } else {
      factors[num] = (factors[num] || 0) + 1;
    }
    return factors;
  }
  var parse = function(p1, p2) {
    var n = 0, d = 1, s = 1;
    var v = 0, w = 0, x = 0, y = 1, z = 1;
    var A = 0, B = 1;
    var C = 1, D = 1;
    var N = 1e7;
    var M;
    if (p1 === void 0 || p1 === null) {
    } else if (p2 !== void 0) {
      n = p1;
      d = p2;
      s = n * d;
      if (n % 1 !== 0 || d % 1 !== 0) {
        throw NonIntegerParameter();
      }
    } else
      switch (typeof p1) {
        case "object": {
          if ("d" in p1 && "n" in p1) {
            n = p1["n"];
            d = p1["d"];
            if ("s" in p1)
              n *= p1["s"];
          } else if (0 in p1) {
            n = p1[0];
            if (1 in p1)
              d = p1[1];
          } else {
            throw InvalidParameter();
          }
          s = n * d;
          break;
        }
        case "number": {
          if (p1 < 0) {
            s = p1;
            p1 = -p1;
          }
          if (p1 % 1 === 0) {
            n = p1;
          } else if (p1 > 0) {
            if (p1 >= 1) {
              z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
              p1 /= z;
            }
            while (B <= N && D <= N) {
              M = (A + C) / (B + D);
              if (p1 === M) {
                if (B + D <= N) {
                  n = A + C;
                  d = B + D;
                } else if (D > B) {
                  n = C;
                  d = D;
                } else {
                  n = A;
                  d = B;
                }
                break;
              } else {
                if (p1 > M) {
                  A += C;
                  B += D;
                } else {
                  C += A;
                  D += B;
                }
                if (B > N) {
                  n = C;
                  d = D;
                } else {
                  n = A;
                  d = B;
                }
              }
            }
            n *= z;
          } else if (isNaN(p1) || isNaN(p2)) {
            d = n = NaN;
          }
          break;
        }
        case "string": {
          B = p1.match(/\d+|./g);
          if (B === null)
            throw InvalidParameter();
          if (B[A] === "-") {
            s = -1;
            A++;
          } else if (B[A] === "+") {
            A++;
          }
          if (B.length === A + 1) {
            w = assign(B[A++], s);
          } else if (B[A + 1] === "." || B[A] === ".") {
            if (B[A] !== ".") {
              v = assign(B[A++], s);
            }
            A++;
            if (A + 1 === B.length || B[A + 1] === "(" && B[A + 3] === ")" || B[A + 1] === "'" && B[A + 3] === "'") {
              w = assign(B[A], s);
              y = Math.pow(10, B[A].length);
              A++;
            }
            if (B[A] === "(" && B[A + 2] === ")" || B[A] === "'" && B[A + 2] === "'") {
              x = assign(B[A + 1], s);
              z = Math.pow(10, B[A + 1].length) - 1;
              A += 3;
            }
          } else if (B[A + 1] === "/" || B[A + 1] === ":") {
            w = assign(B[A], s);
            y = assign(B[A + 2], 1);
            A += 3;
          } else if (B[A + 3] === "/" && B[A + 1] === " ") {
            v = assign(B[A], s);
            w = assign(B[A + 2], s);
            y = assign(B[A + 4], 1);
            A += 5;
          }
          if (B.length <= A) {
            d = y * z;
            s = /* void */
            n = x + d * v + z * w;
            break;
          }
        }
        default:
          throw InvalidParameter();
      }
    if (d === 0) {
      throw DivisionByZero();
    }
    P2["s"] = s < 0 ? -1 : 1;
    P2["n"] = Math.abs(n);
    P2["d"] = Math.abs(d);
  };
  function modpow(b, e, m) {
    var r = 1;
    for (; e > 0; b = b * b % m, e >>= 1) {
      if (e & 1) {
        r = r * b % m;
      }
    }
    return r;
  }
  function cycleLen(n, d) {
    for (; d % 2 === 0; d /= 2) {
    }
    for (; d % 5 === 0; d /= 5) {
    }
    if (d === 1)
      return 0;
    var rem = 10 % d;
    var t = 1;
    for (; rem !== 1; t++) {
      rem = rem * 10 % d;
      if (t > MAX_CYCLE_LEN)
        return 0;
    }
    return t;
  }
  function cycleStart(n, d, len) {
    var rem1 = 1;
    var rem2 = modpow(10, len, d);
    for (var t = 0; t < 300; t++) {
      if (rem1 === rem2)
        return t;
      rem1 = rem1 * 10 % d;
      rem2 = rem2 * 10 % d;
    }
    return 0;
  }
  function gcd(a, b) {
    if (!a)
      return b;
    if (!b)
      return a;
    while (1) {
      a %= b;
      if (!a)
        return b;
      b %= a;
      if (!b)
        return a;
    }
  }
  function Fraction(a, b) {
    parse(a, b);
    if (this instanceof Fraction) {
      a = gcd(P2["d"], P2["n"]);
      this["s"] = P2["s"];
      this["n"] = P2["n"] / a;
      this["d"] = P2["d"] / a;
    } else {
      return newFraction(P2["s"] * P2["n"], P2["d"]);
    }
  }
  var DivisionByZero = function() {
    return new Error("Division by Zero");
  };
  var InvalidParameter = function() {
    return new Error("Invalid argument");
  };
  var NonIntegerParameter = function() {
    return new Error("Parameters must be integer");
  };
  Fraction.prototype = {
    "s": 1,
    "n": 0,
    "d": 1,
    /**
     * Calculates the absolute value
     *
     * Ex: new Fraction(-4).abs() => 4
     **/
    "abs": function() {
      return newFraction(this["n"], this["d"]);
    },
    /**
     * Inverts the sign of the current fraction
     *
     * Ex: new Fraction(-4).neg() => 4
     **/
    "neg": function() {
      return newFraction(-this["s"] * this["n"], this["d"]);
    },
    /**
     * Adds two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
     **/
    "add": function(a, b) {
      parse(a, b);
      return newFraction(
        this["s"] * this["n"] * P2["d"] + P2["s"] * this["d"] * P2["n"],
        this["d"] * P2["d"]
      );
    },
    /**
     * Subtracts two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
     **/
    "sub": function(a, b) {
      parse(a, b);
      return newFraction(
        this["s"] * this["n"] * P2["d"] - P2["s"] * this["d"] * P2["n"],
        this["d"] * P2["d"]
      );
    },
    /**
     * Multiplies two rational numbers
     *
     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
     **/
    "mul": function(a, b) {
      parse(a, b);
      return newFraction(
        this["s"] * P2["s"] * this["n"] * P2["n"],
        this["d"] * P2["d"]
      );
    },
    /**
     * Divides two rational numbers
     *
     * Ex: new Fraction("-17.(345)").inverse().div(3)
     **/
    "div": function(a, b) {
      parse(a, b);
      return newFraction(
        this["s"] * P2["s"] * this["n"] * P2["d"],
        this["d"] * P2["n"]
      );
    },
    /**
     * Clones the actual object
     *
     * Ex: new Fraction("-17.(345)").clone()
     **/
    "clone": function() {
      return newFraction(this["s"] * this["n"], this["d"]);
    },
    /**
     * Calculates the modulo of two rational numbers - a more precise fmod
     *
     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
     **/
    "mod": function(a, b) {
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      if (a === void 0) {
        return newFraction(this["s"] * this["n"] % this["d"], 1);
      }
      parse(a, b);
      if (0 === P2["n"] && 0 === this["d"]) {
        throw DivisionByZero();
      }
      return newFraction(
        this["s"] * (P2["d"] * this["n"]) % (P2["n"] * this["d"]),
        P2["d"] * this["d"]
      );
    },
    /**
     * Calculates the fractional gcd of two rational numbers
     *
     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
     */
    "gcd": function(a, b) {
      parse(a, b);
      return newFraction(gcd(P2["n"], this["n"]) * gcd(P2["d"], this["d"]), P2["d"] * this["d"]);
    },
    /**
     * Calculates the fractional lcm of two rational numbers
     *
     * Ex: new Fraction(5,8).lcm(3,7) => 15
     */
    "lcm": function(a, b) {
      parse(a, b);
      if (P2["n"] === 0 && this["n"] === 0) {
        return newFraction(0, 1);
      }
      return newFraction(P2["n"] * this["n"], gcd(P2["n"], this["n"]) * gcd(P2["d"], this["d"]));
    },
    /**
     * Calculates the ceil of a rational number
     *
     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
     **/
    "ceil": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Calculates the floor of a rational number
     *
     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
     **/
    "floor": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Rounds a rational number
     *
     * Ex: new Fraction('4.(3)').round() => (4 / 1)
     **/
    "round": function(places) {
      places = Math.pow(10, places || 0);
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
    },
    /**
     * Rounds a rational number to a multiple of another rational number
     *
     * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
     **/
    "roundTo": function(a, b) {
      parse(a, b);
      return newFraction(this["s"] * Math.round(this["n"] * P2["d"] / (this["d"] * P2["n"])) * P2["n"], P2["d"]);
    },
    /**
     * Gets the inverse of the fraction, means numerator and denominator are exchanged
     *
     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
     **/
    "inverse": function() {
      return newFraction(this["s"] * this["d"], this["n"]);
    },
    /**
     * Calculates the fraction to some rational exponent, if possible
     *
     * Ex: new Fraction(-1,2).pow(-3) => -8
     */
    "pow": function(a, b) {
      parse(a, b);
      if (P2["d"] === 1) {
        if (P2["s"] < 0) {
          return newFraction(Math.pow(this["s"] * this["d"], P2["n"]), Math.pow(this["n"], P2["n"]));
        } else {
          return newFraction(Math.pow(this["s"] * this["n"], P2["n"]), Math.pow(this["d"], P2["n"]));
        }
      }
      if (this["s"] < 0) return null;
      var N = factorize(this["n"]);
      var D = factorize(this["d"]);
      var n = 1;
      var d = 1;
      for (var k in N) {
        if (k === "1") continue;
        if (k === "0") {
          n = 0;
          break;
        }
        N[k] *= P2["n"];
        if (N[k] % P2["d"] === 0) {
          N[k] /= P2["d"];
        } else return null;
        n *= Math.pow(k, N[k]);
      }
      for (var k in D) {
        if (k === "1") continue;
        D[k] *= P2["n"];
        if (D[k] % P2["d"] === 0) {
          D[k] /= P2["d"];
        } else return null;
        d *= Math.pow(k, D[k]);
      }
      if (P2["s"] < 0) {
        return newFraction(d, n);
      }
      return newFraction(n, d);
    },
    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "equals": function(a, b) {
      parse(a, b);
      return this["s"] * this["n"] * P2["d"] === P2["s"] * P2["n"] * this["d"];
    },
    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "compare": function(a, b) {
      parse(a, b);
      var t = this["s"] * this["n"] * P2["d"] - P2["s"] * P2["n"] * this["d"];
      return (0 < t) - (t < 0);
    },
    "simplify": function(eps) {
      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return this;
      }
      eps = eps || 1e-3;
      var thisABS = this["abs"]();
      var cont = thisABS["toContinued"]();
      for (var i = 1; i < cont.length; i++) {
        var s = newFraction(cont[i - 1], 1);
        for (var k = i - 2; k >= 0; k--) {
          s = s["inverse"]()["add"](cont[k]);
        }
        if (Math.abs(s["sub"](thisABS).valueOf()) < eps) {
          return s["mul"](this["s"]);
        }
      }
      return this;
    },
    /**
     * Check if two rational numbers are divisible
     *
     * Ex: new Fraction(19.6).divisible(1.5);
     */
    "divisible": function(a, b) {
      parse(a, b);
      return !(!(P2["n"] * this["d"]) || this["n"] * P2["d"] % (P2["n"] * this["d"]));
    },
    /**
     * Returns a decimal representation of the fraction
     *
     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
     **/
    "valueOf": function() {
      return this["s"] * this["n"] / this["d"];
    },
    /**
     * Returns a string-fraction representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
     **/
    "toFraction": function(excludeWhole) {
      var whole, str = "";
      var n = this["n"];
      var d = this["d"];
      if (this["s"] < 0) {
        str += "-";
      }
      if (d === 1) {
        str += n;
      } else {
        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
          str += whole;
          str += " ";
          n %= d;
        }
        str += n;
        str += "/";
        str += d;
      }
      return str;
    },
    /**
     * Returns a latex representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
     **/
    "toLatex": function(excludeWhole) {
      var whole, str = "";
      var n = this["n"];
      var d = this["d"];
      if (this["s"] < 0) {
        str += "-";
      }
      if (d === 1) {
        str += n;
      } else {
        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
          str += whole;
          n %= d;
        }
        str += "\\frac{";
        str += n;
        str += "}{";
        str += d;
        str += "}";
      }
      return str;
    },
    /**
     * Returns an array of continued fraction elements
     *
     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
     */
    "toContinued": function() {
      var t;
      var a = this["n"];
      var b = this["d"];
      var res = [];
      if (isNaN(a) || isNaN(b)) {
        return res;
      }
      do {
        res.push(Math.floor(a / b));
        t = a % b;
        a = b;
        b = t;
      } while (a !== 1);
      return res;
    },
    /**
     * Creates a string representation of a fraction with all digits
     *
     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
     **/
    "toString": function(dec) {
      var N = this["n"];
      var D = this["d"];
      if (isNaN(N) || isNaN(D)) {
        return "NaN";
      }
      dec = dec || 15;
      var cycLen = cycleLen(N, D);
      var cycOff = cycleStart(N, D, cycLen);
      var str = this["s"] < 0 ? "-" : "";
      str += N / D | 0;
      N %= D;
      N *= 10;
      if (N)
        str += ".";
      if (cycLen) {
        for (var i = cycOff; i--; ) {
          str += N / D | 0;
          N %= D;
          N *= 10;
        }
        str += "(";
        for (var i = cycLen; i--; ) {
          str += N / D | 0;
          N %= D;
          N *= 10;
        }
        str += ")";
      } else {
        for (var i = dec; N && i--; ) {
          str += N / D | 0;
          N %= D;
          N *= 10;
        }
      }
      return str;
    }
  };

  // node_modules/mathjs/lib/esm/type/fraction/Fraction.js
  var name3 = "Fraction";
  var dependencies4 = [];
  var createFractionClass = /* @__PURE__ */ factory(name3, dependencies4, () => {
    Fraction.prototype.type = "Fraction";
    Fraction.prototype.isFraction = true;
    Fraction.prototype.toJSON = function() {
      return {
        mathjs: "Fraction",
        n: this.s * this.n,
        d: this.d
      };
    };
    Fraction.fromJSON = function(json) {
      return new Fraction(json);
    };
    return Fraction;
  }, {
    isClass: true
  });

  // node_modules/mathjs/lib/esm/type/matrix/Matrix.js
  var name4 = "Matrix";
  var dependencies5 = [];
  var createMatrixClass = /* @__PURE__ */ factory(name4, dependencies5, () => {
    function Matrix2() {
      if (!(this instanceof Matrix2)) {
        throw new SyntaxError("Constructor must be called with the new operator");
      }
    }
    Matrix2.prototype.type = "Matrix";
    Matrix2.prototype.isMatrix = true;
    Matrix2.prototype.storage = function() {
      throw new Error("Cannot invoke storage on a Matrix interface");
    };
    Matrix2.prototype.datatype = function() {
      throw new Error("Cannot invoke datatype on a Matrix interface");
    };
    Matrix2.prototype.create = function(data, datatype) {
      throw new Error("Cannot invoke create on a Matrix interface");
    };
    Matrix2.prototype.subset = function(index, replacement, defaultValue) {
      throw new Error("Cannot invoke subset on a Matrix interface");
    };
    Matrix2.prototype.get = function(index) {
      throw new Error("Cannot invoke get on a Matrix interface");
    };
    Matrix2.prototype.set = function(index, value, defaultValue) {
      throw new Error("Cannot invoke set on a Matrix interface");
    };
    Matrix2.prototype.resize = function(size, defaultValue) {
      throw new Error("Cannot invoke resize on a Matrix interface");
    };
    Matrix2.prototype.reshape = function(size, defaultValue) {
      throw new Error("Cannot invoke reshape on a Matrix interface");
    };
    Matrix2.prototype.clone = function() {
      throw new Error("Cannot invoke clone on a Matrix interface");
    };
    Matrix2.prototype.size = function() {
      throw new Error("Cannot invoke size on a Matrix interface");
    };
    Matrix2.prototype.map = function(callback, skipZeros) {
      throw new Error("Cannot invoke map on a Matrix interface");
    };
    Matrix2.prototype.forEach = function(callback) {
      throw new Error("Cannot invoke forEach on a Matrix interface");
    };
    Matrix2.prototype[Symbol.iterator] = function() {
      throw new Error("Cannot iterate a Matrix interface");
    };
    Matrix2.prototype.toArray = function() {
      throw new Error("Cannot invoke toArray on a Matrix interface");
    };
    Matrix2.prototype.valueOf = function() {
      throw new Error("Cannot invoke valueOf on a Matrix interface");
    };
    Matrix2.prototype.format = function(options) {
      throw new Error("Cannot invoke format on a Matrix interface");
    };
    Matrix2.prototype.toString = function() {
      throw new Error("Cannot invoke toString on a Matrix interface");
    };
    return Matrix2;
  }, {
    isClass: true
  });

  // node_modules/mathjs/lib/esm/type/matrix/DenseMatrix.js
  var name5 = "DenseMatrix";
  var dependencies6 = ["Matrix"];
  var createDenseMatrixClass = /* @__PURE__ */ factory(name5, dependencies6, (_ref) => {
    var {
      Matrix: Matrix2
    } = _ref;
    function DenseMatrix2(data, datatype) {
      if (!(this instanceof DenseMatrix2)) {
        throw new SyntaxError("Constructor must be called with the new operator");
      }
      if (datatype && !isString(datatype)) {
        throw new Error("Invalid datatype: " + datatype);
      }
      if (isMatrix(data)) {
        if (data.type === "DenseMatrix") {
          this._data = clone(data._data);
          this._size = clone(data._size);
          this._datatype = datatype || data._datatype;
        } else {
          this._data = data.toArray();
          this._size = data.size();
          this._datatype = datatype || data._datatype;
        }
      } else if (data && isArray(data.data) && isArray(data.size)) {
        this._data = data.data;
        this._size = data.size;
        validate(this._data, this._size);
        this._datatype = datatype || data.datatype;
      } else if (isArray(data)) {
        this._data = preprocess(data);
        this._size = arraySize(this._data);
        validate(this._data, this._size);
        this._datatype = datatype;
      } else if (data) {
        throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
      } else {
        this._data = [];
        this._size = [0];
        this._datatype = datatype;
      }
    }
    DenseMatrix2.prototype = new Matrix2();
    DenseMatrix2.prototype.createDenseMatrix = function(data, datatype) {
      return new DenseMatrix2(data, datatype);
    };
    DenseMatrix2.prototype.type = "DenseMatrix";
    DenseMatrix2.prototype.isDenseMatrix = true;
    DenseMatrix2.prototype.getDataType = function() {
      return getArrayDataType(this._data, typeOf);
    };
    DenseMatrix2.prototype.storage = function() {
      return "dense";
    };
    DenseMatrix2.prototype.datatype = function() {
      return this._datatype;
    };
    DenseMatrix2.prototype.create = function(data, datatype) {
      return new DenseMatrix2(data, datatype);
    };
    DenseMatrix2.prototype.subset = function(index, replacement, defaultValue) {
      switch (arguments.length) {
        case 1:
          return _get(this, index);
        // intentional fall through
        case 2:
        case 3:
          return _set(this, index, replacement, defaultValue);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    DenseMatrix2.prototype.get = function(index) {
      if (!isArray(index)) {
        throw new TypeError("Array expected");
      }
      if (index.length !== this._size.length) {
        throw new DimensionError(index.length, this._size.length);
      }
      for (var x = 0; x < index.length; x++) {
        validateIndex(index[x], this._size[x]);
      }
      var data = this._data;
      for (var i = 0, ii = index.length; i < ii; i++) {
        var indexI = index[i];
        validateIndex(indexI, data.length);
        data = data[indexI];
      }
      return data;
    };
    DenseMatrix2.prototype.set = function(index, value, defaultValue) {
      if (!isArray(index)) {
        throw new TypeError("Array expected");
      }
      if (index.length < this._size.length) {
        throw new DimensionError(index.length, this._size.length, "<");
      }
      var i, ii, indexI;
      var size = index.map(function(i2) {
        return i2 + 1;
      });
      _fit(this, size, defaultValue);
      var data = this._data;
      for (i = 0, ii = index.length - 1; i < ii; i++) {
        indexI = index[i];
        validateIndex(indexI, data.length);
        data = data[indexI];
      }
      indexI = index[index.length - 1];
      validateIndex(indexI, data.length);
      data[indexI] = value;
      return this;
    };
    function _get(matrix2, index) {
      if (!isIndex(index)) {
        throw new TypeError("Invalid index");
      }
      var isScalar = index.isScalar();
      if (isScalar) {
        return matrix2.get(index.min());
      } else {
        var size = index.size();
        if (size.length !== matrix2._size.length) {
          throw new DimensionError(size.length, matrix2._size.length);
        }
        var min2 = index.min();
        var max2 = index.max();
        for (var i = 0, ii = matrix2._size.length; i < ii; i++) {
          validateIndex(min2[i], matrix2._size[i]);
          validateIndex(max2[i], matrix2._size[i]);
        }
        return new DenseMatrix2(_getSubmatrix(matrix2._data, index, size.length, 0), matrix2._datatype);
      }
    }
    function _getSubmatrix(data, index, dims, dim) {
      var last = dim === dims - 1;
      var range = index.dimension(dim);
      if (last) {
        return range.map(function(i) {
          validateIndex(i, data.length);
          return data[i];
        }).valueOf();
      } else {
        return range.map(function(i) {
          validateIndex(i, data.length);
          var child = data[i];
          return _getSubmatrix(child, index, dims, dim + 1);
        }).valueOf();
      }
    }
    function _set(matrix2, index, submatrix, defaultValue) {
      if (!index || index.isIndex !== true) {
        throw new TypeError("Invalid index");
      }
      var iSize = index.size();
      var isScalar = index.isScalar();
      var sSize;
      if (isMatrix(submatrix)) {
        sSize = submatrix.size();
        submatrix = submatrix.valueOf();
      } else {
        sSize = arraySize(submatrix);
      }
      if (isScalar) {
        if (sSize.length !== 0) {
          throw new TypeError("Scalar expected");
        }
        matrix2.set(index.min(), submatrix, defaultValue);
      } else {
        if (iSize.length < matrix2._size.length) {
          throw new DimensionError(iSize.length, matrix2._size.length, "<");
        }
        if (sSize.length < iSize.length) {
          var i = 0;
          var outer = 0;
          while (iSize[i] === 1 && sSize[i] === 1) {
            i++;
          }
          while (iSize[i] === 1) {
            outer++;
            i++;
          }
          submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
        }
        if (!deepStrictEqual(iSize, sSize)) {
          throw new DimensionError(iSize, sSize, ">");
        }
        var size = index.max().map(function(i2) {
          return i2 + 1;
        });
        _fit(matrix2, size, defaultValue);
        var dims = iSize.length;
        var dim = 0;
        _setSubmatrix(matrix2._data, index, submatrix, dims, dim);
      }
      return matrix2;
    }
    function _setSubmatrix(data, index, submatrix, dims, dim) {
      var last = dim === dims - 1;
      var range = index.dimension(dim);
      if (last) {
        range.forEach(function(dataIndex, subIndex) {
          validateIndex(dataIndex);
          data[dataIndex] = submatrix[subIndex[0]];
        });
      } else {
        range.forEach(function(dataIndex, subIndex) {
          validateIndex(dataIndex);
          _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
        });
      }
    }
    DenseMatrix2.prototype.resize = function(size, defaultValue, copy) {
      if (!isCollection(size)) {
        throw new TypeError("Array or Matrix expected");
      }
      var sizeArray = size.valueOf().map((value) => {
        return Array.isArray(value) && value.length === 1 ? value[0] : value;
      });
      var m = copy ? this.clone() : this;
      return _resize2(m, sizeArray, defaultValue);
    };
    function _resize2(matrix2, size, defaultValue) {
      if (size.length === 0) {
        var v = matrix2._data;
        while (isArray(v)) {
          v = v[0];
        }
        return v;
      }
      matrix2._size = size.slice(0);
      matrix2._data = resize(matrix2._data, matrix2._size, defaultValue);
      return matrix2;
    }
    DenseMatrix2.prototype.reshape = function(size, copy) {
      var m = copy ? this.clone() : this;
      m._data = reshape(m._data, size);
      var currentLength = m._size.reduce((length, size2) => length * size2);
      m._size = processSizesWildcard(size, currentLength);
      return m;
    };
    function _fit(matrix2, size, defaultValue) {
      var newSize = matrix2._size.slice(0);
      var changed = false;
      while (newSize.length < size.length) {
        newSize.push(0);
        changed = true;
      }
      for (var i = 0, ii = size.length; i < ii; i++) {
        if (size[i] > newSize[i]) {
          newSize[i] = size[i];
          changed = true;
        }
      }
      if (changed) {
        _resize2(matrix2, newSize, defaultValue);
      }
    }
    DenseMatrix2.prototype.clone = function() {
      var m = new DenseMatrix2({
        data: clone(this._data),
        size: clone(this._size),
        datatype: this._datatype
      });
      return m;
    };
    DenseMatrix2.prototype.size = function() {
      return this._size.slice(0);
    };
    DenseMatrix2.prototype.map = function(callback) {
      var me = this;
      var recurse = function recurse2(value, index) {
        if (isArray(value)) {
          return value.map(function(child, i) {
            return recurse2(child, index.concat(i));
          });
        } else {
          return callback(value, index, me);
        }
      };
      var data = recurse(this._data, []);
      var datatype = this._datatype !== void 0 ? getArrayDataType(data, typeOf) : void 0;
      return new DenseMatrix2(data, datatype);
    };
    DenseMatrix2.prototype.forEach = function(callback) {
      var me = this;
      var recurse = function recurse2(value, index) {
        if (isArray(value)) {
          value.forEach(function(child, i) {
            recurse2(child, index.concat(i));
          });
        } else {
          callback(value, index, me);
        }
      };
      recurse(this._data, []);
    };
    DenseMatrix2.prototype[Symbol.iterator] = function* () {
      var recurse = function* recurse2(value, index) {
        if (isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            yield* recurse2(value[i], index.concat(i));
          }
        } else {
          yield {
            value,
            index
          };
        }
      };
      yield* recurse(this._data, []);
    };
    DenseMatrix2.prototype.rows = function() {
      var result = [];
      var s = this.size();
      if (s.length !== 2) {
        throw new TypeError("Rows can only be returned for a 2D matrix.");
      }
      var data = this._data;
      for (var row of data) {
        result.push(new DenseMatrix2([row], this._datatype));
      }
      return result;
    };
    DenseMatrix2.prototype.columns = function() {
      var _this = this;
      var result = [];
      var s = this.size();
      if (s.length !== 2) {
        throw new TypeError("Rows can only be returned for a 2D matrix.");
      }
      var data = this._data;
      var _loop = function _loop2(i2) {
        var col = data.map((row) => [row[i2]]);
        result.push(new DenseMatrix2(col, _this._datatype));
      };
      for (var i = 0; i < s[1]; i++) {
        _loop(i);
      }
      return result;
    };
    DenseMatrix2.prototype.toArray = function() {
      return clone(this._data);
    };
    DenseMatrix2.prototype.valueOf = function() {
      return this._data;
    };
    DenseMatrix2.prototype.format = function(options) {
      return format3(this._data, options);
    };
    DenseMatrix2.prototype.toString = function() {
      return format3(this._data);
    };
    DenseMatrix2.prototype.toJSON = function() {
      return {
        mathjs: "DenseMatrix",
        data: this._data,
        size: this._size,
        datatype: this._datatype
      };
    };
    DenseMatrix2.prototype.diagonal = function(k) {
      if (k) {
        if (isBigNumber(k)) {
          k = k.toNumber();
        }
        if (!isNumber(k) || !isInteger(k)) {
          throw new TypeError("The parameter k must be an integer number");
        }
      } else {
        k = 0;
      }
      var kSuper = k > 0 ? k : 0;
      var kSub = k < 0 ? -k : 0;
      var rows = this._size[0];
      var columns = this._size[1];
      var n = Math.min(rows - kSub, columns - kSuper);
      var data = [];
      for (var i = 0; i < n; i++) {
        data[i] = this._data[i + kSub][i + kSuper];
      }
      return new DenseMatrix2({
        data,
        size: [n],
        datatype: this._datatype
      });
    };
    DenseMatrix2.diagonal = function(size, value, k, defaultValue) {
      if (!isArray(size)) {
        throw new TypeError("Array expected, size parameter");
      }
      if (size.length !== 2) {
        throw new Error("Only two dimensions matrix are supported");
      }
      size = size.map(function(s) {
        if (isBigNumber(s)) {
          s = s.toNumber();
        }
        if (!isNumber(s) || !isInteger(s) || s < 1) {
          throw new Error("Size values must be positive integers");
        }
        return s;
      });
      if (k) {
        if (isBigNumber(k)) {
          k = k.toNumber();
        }
        if (!isNumber(k) || !isInteger(k)) {
          throw new TypeError("The parameter k must be an integer number");
        }
      } else {
        k = 0;
      }
      var kSuper = k > 0 ? k : 0;
      var kSub = k < 0 ? -k : 0;
      var rows = size[0];
      var columns = size[1];
      var n = Math.min(rows - kSub, columns - kSuper);
      var _value;
      if (isArray(value)) {
        if (value.length !== n) {
          throw new Error("Invalid value array length");
        }
        _value = function _value2(i) {
          return value[i];
        };
      } else if (isMatrix(value)) {
        var ms = value.size();
        if (ms.length !== 1 || ms[0] !== n) {
          throw new Error("Invalid matrix length");
        }
        _value = function _value2(i) {
          return value.get([i]);
        };
      } else {
        _value = function _value2() {
          return value;
        };
      }
      if (!defaultValue) {
        defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) : 0;
      }
      var data = [];
      if (size.length > 0) {
        data = resize(data, size, defaultValue);
        for (var d = 0; d < n; d++) {
          data[d + kSub][d + kSuper] = _value(d);
        }
      }
      return new DenseMatrix2({
        data,
        size: [rows, columns]
      });
    };
    DenseMatrix2.fromJSON = function(json) {
      return new DenseMatrix2(json);
    };
    DenseMatrix2.prototype.swapRows = function(i, j) {
      if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
        throw new Error("Row index must be positive integers");
      }
      if (this._size.length !== 2) {
        throw new Error("Only two dimensional matrix is supported");
      }
      validateIndex(i, this._size[0]);
      validateIndex(j, this._size[0]);
      DenseMatrix2._swapRows(i, j, this._data);
      return this;
    };
    DenseMatrix2._swapRows = function(i, j, data) {
      var vi = data[i];
      data[i] = data[j];
      data[j] = vi;
    };
    function preprocess(data) {
      for (var i = 0, ii = data.length; i < ii; i++) {
        var elem = data[i];
        if (isArray(elem)) {
          data[i] = preprocess(elem);
        } else if (elem && elem.isMatrix === true) {
          data[i] = preprocess(elem.valueOf());
        }
      }
      return data;
    }
    return DenseMatrix2;
  }, {
    isClass: true
  });

  // node_modules/mathjs/lib/esm/utils/collection.js
  function deepMap(array, callback, skipZeros) {
    if (array && typeof array.map === "function") {
      return array.map(function(x) {
        return deepMap(x, callback, skipZeros);
      });
    } else {
      return callback(array);
    }
  }

  // node_modules/mathjs/lib/esm/plain/number/arithmetic.js
  var n1 = "number";
  var n2 = "number, number";
  function absNumber(a) {
    return Math.abs(a);
  }
  absNumber.signature = n1;
  function addNumber(a, b) {
    return a + b;
  }
  addNumber.signature = n2;
  function subtractNumber(a, b) {
    return a - b;
  }
  subtractNumber.signature = n2;
  function multiplyNumber(a, b) {
    return a * b;
  }
  multiplyNumber.signature = n2;
  function divideNumber(a, b) {
    return a / b;
  }
  divideNumber.signature = n2;
  function unaryMinusNumber(x) {
    return -x;
  }
  unaryMinusNumber.signature = n1;
  function unaryPlusNumber(x) {
    return x;
  }
  unaryPlusNumber.signature = n1;
  function cbrtNumber(x) {
    return cbrt(x);
  }
  cbrtNumber.signature = n1;
  function ceilNumber(x) {
    return Math.ceil(x);
  }
  ceilNumber.signature = n1;
  function cubeNumber(x) {
    return x * x * x;
  }
  cubeNumber.signature = n1;
  function expNumber(x) {
    return Math.exp(x);
  }
  expNumber.signature = n1;
  function expm1Number(x) {
    return expm1(x);
  }
  expm1Number.signature = n1;
  function fixNumber(x) {
    return x > 0 ? Math.floor(x) : Math.ceil(x);
  }
  fixNumber.signature = n1;
  function floorNumber(x) {
    return Math.floor(x);
  }
  floorNumber.signature = n1;
  function gcdNumber(a, b) {
    if (!isInteger(a) || !isInteger(b)) {
      throw new Error("Parameters in function gcd must be integer numbers");
    }
    var r;
    while (b !== 0) {
      r = a % b;
      a = b;
      b = r;
    }
    return a < 0 ? -a : a;
  }
  gcdNumber.signature = n2;
  function lcmNumber(a, b) {
    if (!isInteger(a) || !isInteger(b)) {
      throw new Error("Parameters in function lcm must be integer numbers");
    }
    if (a === 0 || b === 0) {
      return 0;
    }
    var t;
    var prod = a * b;
    while (b !== 0) {
      t = b;
      b = a % t;
      a = t;
    }
    return Math.abs(prod / a);
  }
  lcmNumber.signature = n2;
  function logNumber(x) {
    return Math.log(x);
  }
  logNumber.signature = n1;
  function log10Number(x) {
    return log10(x);
  }
  log10Number.signature = n1;
  function log2Number(x) {
    return log2(x);
  }
  log2Number.signature = n1;
  function log1pNumber(x) {
    return log1p(x);
  }
  log1pNumber.signature = n1;
  function modNumber(x, y) {
    if (y > 0) {
      return x - y * Math.floor(x / y);
    } else if (y === 0) {
      return x;
    } else {
      throw new Error("Cannot calculate mod for a negative divisor");
    }
  }
  modNumber.signature = n2;
  function nthRootNumber(a, root) {
    var inv = root < 0;
    if (inv) {
      root = -root;
    }
    if (root === 0) {
      throw new Error("Root must be non-zero");
    }
    if (a < 0 && Math.abs(root) % 2 !== 1) {
      throw new Error("Root must be odd when a is negative.");
    }
    if (a === 0) {
      return inv ? Infinity : 0;
    }
    if (!isFinite(a)) {
      return inv ? 0 : a;
    }
    var x = Math.pow(Math.abs(a), 1 / root);
    x = a < 0 ? -x : x;
    return inv ? 1 / x : x;
  }
  nthRootNumber.signature = n2;
  function signNumber(x) {
    return sign(x);
  }
  signNumber.signature = n1;
  function sqrtNumber(x) {
    return Math.sqrt(x);
  }
  sqrtNumber.signature = n1;
  function squareNumber(x) {
    return x * x;
  }
  squareNumber.signature = n1;
  function xgcdNumber(a, b) {
    var t;
    var q;
    var r;
    var x = 0;
    var lastx = 1;
    var y = 1;
    var lasty = 0;
    if (!isInteger(a) || !isInteger(b)) {
      throw new Error("Parameters in function xgcd must be integer numbers");
    }
    while (b) {
      q = Math.floor(a / b);
      r = a - q * b;
      t = x;
      x = lastx - q * x;
      lastx = t;
      t = y;
      y = lasty - q * y;
      lasty = t;
      a = b;
      b = r;
    }
    var res;
    if (a < 0) {
      res = [-a, -lastx, -lasty];
    } else {
      res = [a, a ? lastx : 0, lasty];
    }
    return res;
  }
  xgcdNumber.signature = n2;
  function powNumber(x, y) {
    if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
      return 0;
    }
    return Math.pow(x, y);
  }
  powNumber.signature = n2;
  function roundNumber(value) {
    var decimals = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return parseFloat(toFixed(value, decimals));
  }
  roundNumber.signature = n2;
  function normNumber(x) {
    return Math.abs(x);
  }
  normNumber.signature = n1;

  // node_modules/mathjs/lib/esm/utils/bignumber/nearlyEqual.js
  function nearlyEqual2(x, y, epsilon) {
    if (epsilon === null || epsilon === void 0) {
      return x.eq(y);
    }
    if (x.eq(y)) {
      return true;
    }
    if (x.isNaN() || y.isNaN()) {
      return false;
    }
    if (x.isFinite() && y.isFinite()) {
      var diff = x.minus(y).abs();
      if (diff.isZero()) {
        return true;
      } else {
        var max2 = x.constructor.max(x.abs(), y.abs());
        return diff.lte(max2.times(epsilon));
      }
    }
    return false;
  }

  // node_modules/mathjs/lib/esm/utils/complex.js
  function complexEquals(x, y, epsilon) {
    return nearlyEqual(x.re, y.re, epsilon) && nearlyEqual(x.im, y.im, epsilon);
  }

  // node_modules/mathjs/lib/esm/function/relational/equalScalar.js
  var name6 = "equalScalar";
  var dependencies7 = ["typed", "config"];
  var createEqualScalar = /* @__PURE__ */ factory(name6, dependencies7, (_ref) => {
    var {
      typed: typed2,
      config: config4
    } = _ref;
    return typed2(name6, {
      "boolean, boolean": function booleanBoolean(x, y) {
        return x === y;
      },
      "number, number": function numberNumber(x, y) {
        return nearlyEqual(x, y, config4.epsilon);
      },
      "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
        return x.eq(y) || nearlyEqual2(x, y, config4.epsilon);
      },
      "Fraction, Fraction": function FractionFraction(x, y) {
        return x.equals(y);
      },
      "Complex, Complex": function ComplexComplex(x, y) {
        return complexEquals(x, y, config4.epsilon);
      },
      "Unit, Unit": function UnitUnit(x, y) {
        if (!x.equalBase(y)) {
          throw new Error("Cannot compare units with different base");
        }
        return this(x.value, y.value);
      }
    });
  });
  var createEqualScalarNumber = factory(name6, ["typed", "config"], (_ref2) => {
    var {
      typed: typed2,
      config: config4
    } = _ref2;
    return typed2(name6, {
      "number, number": function numberNumber(x, y) {
        return nearlyEqual(x, y, config4.epsilon);
      }
    });
  });

  // node_modules/mathjs/lib/esm/type/matrix/SparseMatrix.js
  var name7 = "SparseMatrix";
  var dependencies8 = ["typed", "equalScalar", "Matrix"];
  var createSparseMatrixClass = /* @__PURE__ */ factory(name7, dependencies8, (_ref) => {
    var {
      typed: typed2,
      equalScalar: equalScalar2,
      Matrix: Matrix2
    } = _ref;
    function SparseMatrix2(data, datatype) {
      if (!(this instanceof SparseMatrix2)) {
        throw new SyntaxError("Constructor must be called with the new operator");
      }
      if (datatype && !isString(datatype)) {
        throw new Error("Invalid datatype: " + datatype);
      }
      if (isMatrix(data)) {
        _createFromMatrix(this, data, datatype);
      } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
        this._values = data.values;
        this._index = data.index;
        this._ptr = data.ptr;
        this._size = data.size;
        this._datatype = datatype || data.datatype;
      } else if (isArray(data)) {
        _createFromArray(this, data, datatype);
      } else if (data) {
        throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
      } else {
        this._values = [];
        this._index = [];
        this._ptr = [0];
        this._size = [0, 0];
        this._datatype = datatype;
      }
    }
    function _createFromMatrix(matrix2, source, datatype) {
      if (source.type === "SparseMatrix") {
        matrix2._values = source._values ? clone(source._values) : void 0;
        matrix2._index = clone(source._index);
        matrix2._ptr = clone(source._ptr);
        matrix2._size = clone(source._size);
        matrix2._datatype = datatype || source._datatype;
      } else {
        _createFromArray(matrix2, source.valueOf(), datatype || source._datatype);
      }
    }
    function _createFromArray(matrix2, data, datatype) {
      matrix2._values = [];
      matrix2._index = [];
      matrix2._ptr = [];
      matrix2._datatype = datatype;
      var rows = data.length;
      var columns = 0;
      var eq = equalScalar2;
      var zero = 0;
      if (isString(datatype)) {
        eq = typed2.find(equalScalar2, [datatype, datatype]) || equalScalar2;
        zero = typed2.convert(0, datatype);
      }
      if (rows > 0) {
        var j = 0;
        do {
          matrix2._ptr.push(matrix2._index.length);
          for (var i = 0; i < rows; i++) {
            var row = data[i];
            if (isArray(row)) {
              if (j === 0 && columns < row.length) {
                columns = row.length;
              }
              if (j < row.length) {
                var v = row[j];
                if (!eq(v, zero)) {
                  matrix2._values.push(v);
                  matrix2._index.push(i);
                }
              }
            } else {
              if (j === 0 && columns < 1) {
                columns = 1;
              }
              if (!eq(row, zero)) {
                matrix2._values.push(row);
                matrix2._index.push(i);
              }
            }
          }
          j++;
        } while (j < columns);
      }
      matrix2._ptr.push(matrix2._index.length);
      matrix2._size = [rows, columns];
    }
    SparseMatrix2.prototype = new Matrix2();
    SparseMatrix2.prototype.createSparseMatrix = function(data, datatype) {
      return new SparseMatrix2(data, datatype);
    };
    SparseMatrix2.prototype.type = "SparseMatrix";
    SparseMatrix2.prototype.isSparseMatrix = true;
    SparseMatrix2.prototype.getDataType = function() {
      return getArrayDataType(this._values, typeOf);
    };
    SparseMatrix2.prototype.storage = function() {
      return "sparse";
    };
    SparseMatrix2.prototype.datatype = function() {
      return this._datatype;
    };
    SparseMatrix2.prototype.create = function(data, datatype) {
      return new SparseMatrix2(data, datatype);
    };
    SparseMatrix2.prototype.density = function() {
      var rows = this._size[0];
      var columns = this._size[1];
      return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
    };
    SparseMatrix2.prototype.subset = function(index, replacement, defaultValue) {
      if (!this._values) {
        throw new Error("Cannot invoke subset on a Pattern only matrix");
      }
      switch (arguments.length) {
        case 1:
          return _getsubset(this, index);
        // intentional fall through
        case 2:
        case 3:
          return _setsubset(this, index, replacement, defaultValue);
        default:
          throw new SyntaxError("Wrong number of arguments");
      }
    };
    function _getsubset(matrix2, idx) {
      if (!isIndex(idx)) {
        throw new TypeError("Invalid index");
      }
      var isScalar = idx.isScalar();
      if (isScalar) {
        return matrix2.get(idx.min());
      }
      var size = idx.size();
      if (size.length !== matrix2._size.length) {
        throw new DimensionError(size.length, matrix2._size.length);
      }
      var i, ii, k, kk;
      var min2 = idx.min();
      var max2 = idx.max();
      for (i = 0, ii = matrix2._size.length; i < ii; i++) {
        validateIndex(min2[i], matrix2._size[i]);
        validateIndex(max2[i], matrix2._size[i]);
      }
      var mvalues = matrix2._values;
      var mindex = matrix2._index;
      var mptr = matrix2._ptr;
      var rows = idx.dimension(0);
      var columns = idx.dimension(1);
      var w = [];
      var pv = [];
      rows.forEach(function(i2, r) {
        pv[i2] = r[0];
        w[i2] = true;
      });
      var values = mvalues ? [] : void 0;
      var index = [];
      var ptr = [];
      columns.forEach(function(j) {
        ptr.push(index.length);
        for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
          i = mindex[k];
          if (w[i] === true) {
            index.push(pv[i]);
            if (values) {
              values.push(mvalues[k]);
            }
          }
        }
      });
      ptr.push(index.length);
      return new SparseMatrix2({
        values,
        index,
        ptr,
        size,
        datatype: matrix2._datatype
      });
    }
    function _setsubset(matrix2, index, submatrix, defaultValue) {
      if (!index || index.isIndex !== true) {
        throw new TypeError("Invalid index");
      }
      var iSize = index.size();
      var isScalar = index.isScalar();
      var sSize;
      if (isMatrix(submatrix)) {
        sSize = submatrix.size();
        submatrix = submatrix.toArray();
      } else {
        sSize = arraySize(submatrix);
      }
      if (isScalar) {
        if (sSize.length !== 0) {
          throw new TypeError("Scalar expected");
        }
        matrix2.set(index.min(), submatrix, defaultValue);
      } else {
        if (iSize.length !== 1 && iSize.length !== 2) {
          throw new DimensionError(iSize.length, matrix2._size.length, "<");
        }
        if (sSize.length < iSize.length) {
          var i = 0;
          var outer = 0;
          while (iSize[i] === 1 && sSize[i] === 1) {
            i++;
          }
          while (iSize[i] === 1) {
            outer++;
            i++;
          }
          submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
        }
        if (!deepStrictEqual(iSize, sSize)) {
          throw new DimensionError(iSize, sSize, ">");
        }
        var x0 = index.min()[0];
        var y0 = index.min()[1];
        var m = sSize[0];
        var n = sSize[1];
        for (var x = 0; x < m; x++) {
          for (var y = 0; y < n; y++) {
            var v = submatrix[x][y];
            matrix2.set([x + x0, y + y0], v, defaultValue);
          }
        }
      }
      return matrix2;
    }
    SparseMatrix2.prototype.get = function(index) {
      if (!isArray(index)) {
        throw new TypeError("Array expected");
      }
      if (index.length !== this._size.length) {
        throw new DimensionError(index.length, this._size.length);
      }
      if (!this._values) {
        throw new Error("Cannot invoke get on a Pattern only matrix");
      }
      var i = index[0];
      var j = index[1];
      validateIndex(i, this._size[0]);
      validateIndex(j, this._size[1]);
      var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
      if (k < this._ptr[j + 1] && this._index[k] === i) {
        return this._values[k];
      }
      return 0;
    };
    SparseMatrix2.prototype.set = function(index, v, defaultValue) {
      if (!isArray(index)) {
        throw new TypeError("Array expected");
      }
      if (index.length !== this._size.length) {
        throw new DimensionError(index.length, this._size.length);
      }
      if (!this._values) {
        throw new Error("Cannot invoke set on a Pattern only matrix");
      }
      var i = index[0];
      var j = index[1];
      var rows = this._size[0];
      var columns = this._size[1];
      var eq = equalScalar2;
      var zero = 0;
      if (isString(this._datatype)) {
        eq = typed2.find(equalScalar2, [this._datatype, this._datatype]) || equalScalar2;
        zero = typed2.convert(0, this._datatype);
      }
      if (i > rows - 1 || j > columns - 1) {
        _resize2(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
        rows = this._size[0];
        columns = this._size[1];
      }
      validateIndex(i, rows);
      validateIndex(j, columns);
      var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
      if (k < this._ptr[j + 1] && this._index[k] === i) {
        if (!eq(v, zero)) {
          this._values[k] = v;
        } else {
          _remove(k, j, this._values, this._index, this._ptr);
        }
      } else {
        _insert(k, i, j, v, this._values, this._index, this._ptr);
      }
      return this;
    };
    function _getValueIndex(i, top, bottom, index) {
      if (bottom - top === 0) {
        return bottom;
      }
      for (var r = top; r < bottom; r++) {
        if (index[r] === i) {
          return r;
        }
      }
      return top;
    }
    function _remove(k, j, values, index, ptr) {
      values.splice(k, 1);
      index.splice(k, 1);
      for (var x = j + 1; x < ptr.length; x++) {
        ptr[x]--;
      }
    }
    function _insert(k, i, j, v, values, index, ptr) {
      values.splice(k, 0, v);
      index.splice(k, 0, i);
      for (var x = j + 1; x < ptr.length; x++) {
        ptr[x]++;
      }
    }
    SparseMatrix2.prototype.resize = function(size, defaultValue, copy) {
      if (!isCollection(size)) {
        throw new TypeError("Array or Matrix expected");
      }
      var sizeArray = size.valueOf().map((value) => {
        return Array.isArray(value) && value.length === 1 ? value[0] : value;
      });
      if (sizeArray.length !== 2) {
        throw new Error("Only two dimensions matrix are supported");
      }
      sizeArray.forEach(function(value) {
        if (!isNumber(value) || !isInteger(value) || value < 0) {
          throw new TypeError("Invalid size, must contain positive integers (size: " + format3(sizeArray) + ")");
        }
      });
      var m = copy ? this.clone() : this;
      return _resize2(m, sizeArray[0], sizeArray[1], defaultValue);
    };
    function _resize2(matrix2, rows, columns, defaultValue) {
      var value = defaultValue || 0;
      var eq = equalScalar2;
      var zero = 0;
      if (isString(matrix2._datatype)) {
        eq = typed2.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
        zero = typed2.convert(0, matrix2._datatype);
        value = typed2.convert(value, matrix2._datatype);
      }
      var ins = !eq(value, zero);
      var r = matrix2._size[0];
      var c = matrix2._size[1];
      var i, j, k;
      if (columns > c) {
        for (j = c; j < columns; j++) {
          matrix2._ptr[j] = matrix2._values.length;
          if (ins) {
            for (i = 0; i < r; i++) {
              matrix2._values.push(value);
              matrix2._index.push(i);
            }
          }
        }
        matrix2._ptr[columns] = matrix2._values.length;
      } else if (columns < c) {
        matrix2._ptr.splice(columns + 1, c - columns);
        matrix2._values.splice(matrix2._ptr[columns], matrix2._values.length);
        matrix2._index.splice(matrix2._ptr[columns], matrix2._index.length);
      }
      c = columns;
      if (rows > r) {
        if (ins) {
          var n = 0;
          for (j = 0; j < c; j++) {
            matrix2._ptr[j] = matrix2._ptr[j] + n;
            k = matrix2._ptr[j + 1] + n;
            var p = 0;
            for (i = r; i < rows; i++, p++) {
              matrix2._values.splice(k + p, 0, value);
              matrix2._index.splice(k + p, 0, i);
              n++;
            }
          }
          matrix2._ptr[c] = matrix2._values.length;
        }
      } else if (rows < r) {
        var d = 0;
        for (j = 0; j < c; j++) {
          matrix2._ptr[j] = matrix2._ptr[j] - d;
          var k0 = matrix2._ptr[j];
          var k1 = matrix2._ptr[j + 1] - d;
          for (k = k0; k < k1; k++) {
            i = matrix2._index[k];
            if (i > rows - 1) {
              matrix2._values.splice(k, 1);
              matrix2._index.splice(k, 1);
              d++;
            }
          }
        }
        matrix2._ptr[j] = matrix2._values.length;
      }
      matrix2._size[0] = rows;
      matrix2._size[1] = columns;
      return matrix2;
    }
    SparseMatrix2.prototype.reshape = function(sizes, copy) {
      if (!isArray(sizes)) {
        throw new TypeError("Array expected");
      }
      if (sizes.length !== 2) {
        throw new Error("Sparse matrices can only be reshaped in two dimensions");
      }
      sizes.forEach(function(value) {
        if (!isNumber(value) || !isInteger(value) || value <= -2 || value === 0) {
          throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + format3(sizes) + ")");
        }
      });
      var currentLength = this._size[0] * this._size[1];
      sizes = processSizesWildcard(sizes, currentLength);
      var newLength = sizes[0] * sizes[1];
      if (currentLength !== newLength) {
        throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
      }
      var m = copy ? this.clone() : this;
      if (this._size[0] === sizes[0] && this._size[1] === sizes[1]) {
        return m;
      }
      var colIndex = [];
      for (var i = 0; i < m._ptr.length; i++) {
        for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
          colIndex.push(i);
        }
      }
      var values = m._values.slice();
      var rowIndex = m._index.slice();
      for (var _i = 0; _i < m._index.length; _i++) {
        var r1 = rowIndex[_i];
        var c1 = colIndex[_i];
        var flat = r1 * m._size[1] + c1;
        colIndex[_i] = flat % sizes[1];
        rowIndex[_i] = Math.floor(flat / sizes[1]);
      }
      m._values.length = 0;
      m._index.length = 0;
      m._ptr.length = sizes[1] + 1;
      m._size = sizes.slice();
      for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
        m._ptr[_i2] = 0;
      }
      for (var h = 0; h < values.length; h++) {
        var _i3 = rowIndex[h];
        var _j = colIndex[h];
        var v = values[h];
        var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);
        _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
      }
      return m;
    };
    SparseMatrix2.prototype.clone = function() {
      var m = new SparseMatrix2({
        values: this._values ? clone(this._values) : void 0,
        index: clone(this._index),
        ptr: clone(this._ptr),
        size: clone(this._size),
        datatype: this._datatype
      });
      return m;
    };
    SparseMatrix2.prototype.size = function() {
      return this._size.slice(0);
    };
    SparseMatrix2.prototype.map = function(callback, skipZeros) {
      if (!this._values) {
        throw new Error("Cannot invoke map on a Pattern only matrix");
      }
      var me = this;
      var rows = this._size[0];
      var columns = this._size[1];
      var invoke = function invoke2(v, i, j) {
        return callback(v, [i, j], me);
      };
      return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
    };
    function _map(matrix2, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
      var values = [];
      var index = [];
      var ptr = [];
      var eq = equalScalar2;
      var zero = 0;
      if (isString(matrix2._datatype)) {
        eq = typed2.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
        zero = typed2.convert(0, matrix2._datatype);
      }
      var invoke = function invoke2(v, x, y) {
        v = callback(v, x, y);
        if (!eq(v, zero)) {
          values.push(v);
          index.push(x);
        }
      };
      for (var j = minColumn; j <= maxColumn; j++) {
        ptr.push(values.length);
        var k0 = matrix2._ptr[j];
        var k1 = matrix2._ptr[j + 1];
        if (skipZeros) {
          for (var k = k0; k < k1; k++) {
            var i = matrix2._index[k];
            if (i >= minRow && i <= maxRow) {
              invoke(matrix2._values[k], i - minRow, j - minColumn);
            }
          }
        } else {
          var _values = {};
          for (var _k = k0; _k < k1; _k++) {
            var _i4 = matrix2._index[_k];
            _values[_i4] = matrix2._values[_k];
          }
          for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
            var value = _i5 in _values ? _values[_i5] : 0;
            invoke(value, _i5 - minRow, j - minColumn);
          }
        }
      }
      ptr.push(values.length);
      return new SparseMatrix2({
        values,
        index,
        ptr,
        size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
      });
    }
    SparseMatrix2.prototype.forEach = function(callback, skipZeros) {
      if (!this._values) {
        throw new Error("Cannot invoke forEach on a Pattern only matrix");
      }
      var me = this;
      var rows = this._size[0];
      var columns = this._size[1];
      for (var j = 0; j < columns; j++) {
        var k0 = this._ptr[j];
        var k1 = this._ptr[j + 1];
        if (skipZeros) {
          for (var k = k0; k < k1; k++) {
            var i = this._index[k];
            callback(this._values[k], [i, j], me);
          }
        } else {
          var values = {};
          for (var _k2 = k0; _k2 < k1; _k2++) {
            var _i6 = this._index[_k2];
            values[_i6] = this._values[_k2];
          }
          for (var _i7 = 0; _i7 < rows; _i7++) {
            var value = _i7 in values ? values[_i7] : 0;
            callback(value, [_i7, j], me);
          }
        }
      }
    };
    SparseMatrix2.prototype[Symbol.iterator] = function* () {
      if (!this._values) {
        throw new Error("Cannot iterate a Pattern only matrix");
      }
      var columns = this._size[1];
      for (var j = 0; j < columns; j++) {
        var k0 = this._ptr[j];
        var k1 = this._ptr[j + 1];
        for (var k = k0; k < k1; k++) {
          var i = this._index[k];
          yield {
            value: this._values[k],
            index: [i, j]
          };
        }
      }
    };
    SparseMatrix2.prototype.toArray = function() {
      return _toArray(this._values, this._index, this._ptr, this._size, true);
    };
    SparseMatrix2.prototype.valueOf = function() {
      return _toArray(this._values, this._index, this._ptr, this._size, false);
    };
    function _toArray(values, index, ptr, size, copy) {
      var rows = size[0];
      var columns = size[1];
      var a = [];
      var i, j;
      for (i = 0; i < rows; i++) {
        a[i] = [];
        for (j = 0; j < columns; j++) {
          a[i][j] = 0;
        }
      }
      for (j = 0; j < columns; j++) {
        var k0 = ptr[j];
        var k1 = ptr[j + 1];
        for (var k = k0; k < k1; k++) {
          i = index[k];
          a[i][j] = values ? copy ? clone(values[k]) : values[k] : 1;
        }
      }
      return a;
    }
    SparseMatrix2.prototype.format = function(options) {
      var rows = this._size[0];
      var columns = this._size[1];
      var density = this.density();
      var str = "Sparse Matrix [" + format3(rows, options) + " x " + format3(columns, options) + "] density: " + format3(density, options) + "\n";
      for (var j = 0; j < columns; j++) {
        var k0 = this._ptr[j];
        var k1 = this._ptr[j + 1];
        for (var k = k0; k < k1; k++) {
          var i = this._index[k];
          str += "\n    (" + format3(i, options) + ", " + format3(j, options) + ") ==> " + (this._values ? format3(this._values[k], options) : "X");
        }
      }
      return str;
    };
    SparseMatrix2.prototype.toString = function() {
      return format3(this.toArray());
    };
    SparseMatrix2.prototype.toJSON = function() {
      return {
        mathjs: "SparseMatrix",
        values: this._values,
        index: this._index,
        ptr: this._ptr,
        size: this._size,
        datatype: this._datatype
      };
    };
    SparseMatrix2.prototype.diagonal = function(k) {
      if (k) {
        if (isBigNumber(k)) {
          k = k.toNumber();
        }
        if (!isNumber(k) || !isInteger(k)) {
          throw new TypeError("The parameter k must be an integer number");
        }
      } else {
        k = 0;
      }
      var kSuper = k > 0 ? k : 0;
      var kSub = k < 0 ? -k : 0;
      var rows = this._size[0];
      var columns = this._size[1];
      var n = Math.min(rows - kSub, columns - kSuper);
      var values = [];
      var index = [];
      var ptr = [];
      ptr[0] = 0;
      for (var j = kSuper; j < columns && values.length < n; j++) {
        var k0 = this._ptr[j];
        var k1 = this._ptr[j + 1];
        for (var x = k0; x < k1; x++) {
          var i = this._index[x];
          if (i === j - kSuper + kSub) {
            values.push(this._values[x]);
            index[values.length - 1] = i - kSub;
            break;
          }
        }
      }
      ptr.push(values.length);
      return new SparseMatrix2({
        values,
        index,
        ptr,
        size: [n, 1]
      });
    };
    SparseMatrix2.fromJSON = function(json) {
      return new SparseMatrix2(json);
    };
    SparseMatrix2.diagonal = function(size, value, k, defaultValue, datatype) {
      if (!isArray(size)) {
        throw new TypeError("Array expected, size parameter");
      }
      if (size.length !== 2) {
        throw new Error("Only two dimensions matrix are supported");
      }
      size = size.map(function(s) {
        if (isBigNumber(s)) {
          s = s.toNumber();
        }
        if (!isNumber(s) || !isInteger(s) || s < 1) {
          throw new Error("Size values must be positive integers");
        }
        return s;
      });
      if (k) {
        if (isBigNumber(k)) {
          k = k.toNumber();
        }
        if (!isNumber(k) || !isInteger(k)) {
          throw new TypeError("The parameter k must be an integer number");
        }
      } else {
        k = 0;
      }
      var eq = equalScalar2;
      var zero = 0;
      if (isString(datatype)) {
        eq = typed2.find(equalScalar2, [datatype, datatype]) || equalScalar2;
        zero = typed2.convert(0, datatype);
      }
      var kSuper = k > 0 ? k : 0;
      var kSub = k < 0 ? -k : 0;
      var rows = size[0];
      var columns = size[1];
      var n = Math.min(rows - kSub, columns - kSuper);
      var _value;
      if (isArray(value)) {
        if (value.length !== n) {
          throw new Error("Invalid value array length");
        }
        _value = function _value2(i2) {
          return value[i2];
        };
      } else if (isMatrix(value)) {
        var ms = value.size();
        if (ms.length !== 1 || ms[0] !== n) {
          throw new Error("Invalid matrix length");
        }
        _value = function _value2(i2) {
          return value.get([i2]);
        };
      } else {
        _value = function _value2() {
          return value;
        };
      }
      var values = [];
      var index = [];
      var ptr = [];
      for (var j = 0; j < columns; j++) {
        ptr.push(values.length);
        var i = j - kSuper;
        if (i >= 0 && i < n) {
          var v = _value(i);
          if (!eq(v, zero)) {
            index.push(i + kSub);
            values.push(v);
          }
        }
      }
      ptr.push(values.length);
      return new SparseMatrix2({
        values,
        index,
        ptr,
        size: [rows, columns]
      });
    };
    SparseMatrix2.prototype.swapRows = function(i, j) {
      if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
        throw new Error("Row index must be positive integers");
      }
      if (this._size.length !== 2) {
        throw new Error("Only two dimensional matrix is supported");
      }
      validateIndex(i, this._size[0]);
      validateIndex(j, this._size[0]);
      SparseMatrix2._swapRows(i, j, this._size[1], this._values, this._index, this._ptr);
      return this;
    };
    SparseMatrix2._forEachRow = function(j, values, index, ptr, callback) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        callback(index[k], values[k]);
      }
    };
    SparseMatrix2._swapRows = function(x, y, columns, values, index, ptr) {
      for (var j = 0; j < columns; j++) {
        var k0 = ptr[j];
        var k1 = ptr[j + 1];
        var kx = _getValueIndex(x, k0, k1, index);
        var ky = _getValueIndex(y, k0, k1, index);
        if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
          if (values) {
            var v = values[kx];
            values[kx] = values[ky];
            values[ky] = v;
          }
          continue;
        }
        if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
          var vx = values ? values[kx] : void 0;
          index.splice(ky, 0, y);
          if (values) {
            values.splice(ky, 0, vx);
          }
          index.splice(ky <= kx ? kx + 1 : kx, 1);
          if (values) {
            values.splice(ky <= kx ? kx + 1 : kx, 1);
          }
          continue;
        }
        if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
          var vy = values ? values[ky] : void 0;
          index.splice(kx, 0, x);
          if (values) {
            values.splice(kx, 0, vy);
          }
          index.splice(kx <= ky ? ky + 1 : ky, 1);
          if (values) {
            values.splice(kx <= ky ? ky + 1 : ky, 1);
          }
        }
      }
    };
    return SparseMatrix2;
  }, {
    isClass: true
  });

  // node_modules/mathjs/lib/esm/type/number.js
  var name8 = "number";
  var dependencies9 = ["typed"];
  function getNonDecimalNumberParts(input) {
    var nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
    if (nonDecimalWithRadixMatch) {
      var radix = {
        "0b": 2,
        "0o": 8,
        "0x": 16
      }[nonDecimalWithRadixMatch[1]];
      var integerPart = nonDecimalWithRadixMatch[2];
      var fractionalPart = nonDecimalWithRadixMatch[3];
      return {
        input,
        radix,
        integerPart,
        fractionalPart
      };
    } else {
      return null;
    }
  }
  function makeNumberFromNonDecimalParts(parts) {
    var n = parseInt(parts.integerPart, parts.radix);
    var f = 0;
    for (var i = 0; i < parts.fractionalPart.length; i++) {
      var digitValue = parseInt(parts.fractionalPart[i], parts.radix);
      f += digitValue / Math.pow(parts.radix, i + 1);
    }
    var result = n + f;
    if (isNaN(result)) {
      throw new SyntaxError('String "' + parts.input + '" is no valid number');
    }
    return result;
  }
  var createNumber = /* @__PURE__ */ factory(name8, dependencies9, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    var number2 = typed2("number", {
      "": function _() {
        return 0;
      },
      number: function number3(x) {
        return x;
      },
      string: function string(x) {
        if (x === "NaN") return NaN;
        var nonDecimalNumberParts = getNonDecimalNumberParts(x);
        if (nonDecimalNumberParts) {
          return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
        }
        var size = 0;
        var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (wordSizeSuffixMatch) {
          size = Number(wordSizeSuffixMatch[2]);
          x = wordSizeSuffixMatch[1];
        }
        var num = Number(x);
        if (isNaN(num)) {
          throw new SyntaxError('String "' + x + '" is no valid number');
        }
        if (wordSizeSuffixMatch) {
          if (num > 2 ** size - 1) {
            throw new SyntaxError('String "'.concat(x, '" is out of range'));
          }
          if (num >= 2 ** (size - 1)) {
            num = num - 2 ** size;
          }
        }
        return num;
      },
      BigNumber: function BigNumber2(x) {
        return x.toNumber();
      },
      Fraction: function Fraction3(x) {
        return x.valueOf();
      },
      Unit: function Unit(x) {
        throw new Error("Second argument with valueless unit expected");
      },
      null: function _null(x) {
        return 0;
      },
      "Unit, string | Unit": function UnitStringUnit(unit, valuelessUnit) {
        return unit.toNumber(valuelessUnit);
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this);
      }
    });
    number2.fromJSON = function(json) {
      return parseFloat(json.value);
    };
    return number2;
  });

  // node_modules/mathjs/lib/esm/type/bignumber/function/bignumber.js
  var name9 = "bignumber";
  var dependencies10 = ["typed", "BigNumber"];
  var createBignumber = /* @__PURE__ */ factory(name9, dependencies10, (_ref) => {
    var {
      typed: typed2,
      BigNumber: BigNumber2
    } = _ref;
    return typed2("bignumber", {
      "": function _() {
        return new BigNumber2(0);
      },
      number: function number2(x) {
        return new BigNumber2(x + "");
      },
      string: function string(x) {
        var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
        if (wordSizeSuffixMatch) {
          var size = wordSizeSuffixMatch[2];
          var n = BigNumber2(wordSizeSuffixMatch[1]);
          var twoPowSize = new BigNumber2(2).pow(Number(size));
          if (n.gt(twoPowSize.sub(1))) {
            throw new SyntaxError('String "'.concat(x, '" is out of range'));
          }
          var twoPowSizeSubOne = new BigNumber2(2).pow(Number(size) - 1);
          if (n.gte(twoPowSizeSubOne)) {
            return n.sub(twoPowSize);
          } else {
            return n;
          }
        }
        return new BigNumber2(x);
      },
      BigNumber: function BigNumber3(x) {
        return x;
      },
      Fraction: function Fraction3(x) {
        return new BigNumber2(x.n).div(x.d).times(x.s);
      },
      null: function _null(x) {
        return new BigNumber2(0);
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this);
      }
    });
  });

  // node_modules/mathjs/lib/esm/type/fraction/function/fraction.js
  var name10 = "fraction";
  var dependencies11 = ["typed", "Fraction"];
  var createFraction = /* @__PURE__ */ factory(name10, dependencies11, (_ref) => {
    var {
      typed: typed2,
      Fraction: Fraction3
    } = _ref;
    return typed2("fraction", {
      number: function number2(x) {
        if (!isFinite(x) || isNaN(x)) {
          throw new Error(x + " cannot be represented as a fraction");
        }
        return new Fraction3(x);
      },
      string: function string(x) {
        return new Fraction3(x);
      },
      "number, number": function numberNumber(numerator, denominator) {
        return new Fraction3(numerator, denominator);
      },
      null: function _null(x) {
        return new Fraction3(0);
      },
      BigNumber: function BigNumber2(x) {
        return new Fraction3(x.toString());
      },
      Fraction: function Fraction4(x) {
        return x;
      },
      Object: function Object2(x) {
        return new Fraction3(x);
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this);
      }
    });
  });

  // node_modules/mathjs/lib/esm/type/matrix/function/matrix.js
  var name11 = "matrix";
  var dependencies12 = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"];
  var createMatrix = /* @__PURE__ */ factory(name11, dependencies12, (_ref) => {
    var {
      typed: typed2,
      Matrix: Matrix2,
      DenseMatrix: DenseMatrix2,
      SparseMatrix: SparseMatrix2
    } = _ref;
    return typed2(name11, {
      "": function _() {
        return _create([]);
      },
      string: function string(format4) {
        return _create([], format4);
      },
      "string, string": function stringString(format4, datatype) {
        return _create([], format4, datatype);
      },
      Array: function Array2(data) {
        return _create(data);
      },
      Matrix: function Matrix3(data) {
        return _create(data, data.storage());
      },
      "Array | Matrix, string": _create,
      "Array | Matrix, string, string": _create
    });
    function _create(data, format4, datatype) {
      if (format4 === "dense" || format4 === "default" || format4 === void 0) {
        return new DenseMatrix2(data, datatype);
      }
      if (format4 === "sparse") {
        return new SparseMatrix2(data, datatype);
      }
      throw new TypeError("Unknown matrix type " + JSON.stringify(format4) + ".");
    }
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/unaryMinus.js
  var name12 = "unaryMinus";
  var dependencies13 = ["typed"];
  var createUnaryMinus = /* @__PURE__ */ factory(name12, dependencies13, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return typed2(name12, {
      number: unaryMinusNumber,
      Complex: function Complex3(x) {
        return x.neg();
      },
      BigNumber: function BigNumber2(x) {
        return x.neg();
      },
      Fraction: function Fraction3(x) {
        return x.neg();
      },
      Unit: function Unit(x) {
        var res = x.clone();
        res.value = this(x.value);
        return res;
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this, true);
      }
      // TODO: add support for string
    });
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/abs.js
  var name13 = "abs";
  var dependencies14 = ["typed"];
  var createAbs = /* @__PURE__ */ factory(name13, dependencies14, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return typed2(name13, {
      number: absNumber,
      Complex: function Complex3(x) {
        return x.abs();
      },
      BigNumber: function BigNumber2(x) {
        return x.abs();
      },
      Fraction: function Fraction3(x) {
        return x.abs();
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this, true);
      },
      Unit: function Unit(x) {
        return x.abs();
      }
    });
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/addScalar.js
  var name14 = "addScalar";
  var dependencies15 = ["typed"];
  var createAddScalar = /* @__PURE__ */ factory(name14, dependencies15, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return typed2(name14, {
      "number, number": addNumber,
      "Complex, Complex": function ComplexComplex(x, y) {
        return x.add(y);
      },
      "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
        return x.plus(y);
      },
      "Fraction, Fraction": function FractionFraction(x, y) {
        return x.add(y);
      },
      "Unit, Unit": function UnitUnit(x, y) {
        if (x.value === null || x.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
        if (y.value === null || y.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
        if (!x.equalBase(y)) throw new Error("Units do not match");
        var res = x.clone();
        res.value = this(res.value, y.value);
        res.fixPrefix = false;
        return res;
      }
    });
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm14.js
  var name15 = "algorithm14";
  var dependencies16 = ["typed"];
  var createAlgorithm14 = /* @__PURE__ */ factory(name15, dependencies16, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return function algorithm14(a, b, callback, inverse) {
      var adata = a._data;
      var asize = a._size;
      var adt = a._datatype;
      var dt;
      var cf = callback;
      if (typeof adt === "string") {
        dt = adt;
        b = typed2.convert(b, dt);
        cf = typed2.find(callback, [dt, dt]);
      }
      var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];
      return a.createDenseMatrix({
        data: cdata,
        size: clone(asize),
        datatype: dt
      });
    };
    function _iterate(f, level, s, n, av, bv, inverse) {
      var cv = [];
      if (level === s.length - 1) {
        for (var i = 0; i < n; i++) {
          cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
        }
      } else {
        for (var j = 0; j < n; j++) {
          cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
        }
      }
      return cv;
    }
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm01.js
  var name16 = "algorithm01";
  var dependencies17 = ["typed"];
  var createAlgorithm01 = /* @__PURE__ */ factory(name16, dependencies17, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return function algorithm1(denseMatrix, sparseMatrix, callback, inverse) {
      var adata = denseMatrix._data;
      var asize = denseMatrix._size;
      var adt = denseMatrix._datatype;
      var bvalues = sparseMatrix._values;
      var bindex = sparseMatrix._index;
      var bptr = sparseMatrix._ptr;
      var bsize = sparseMatrix._size;
      var bdt = sparseMatrix._datatype;
      if (asize.length !== bsize.length) {
        throw new DimensionError(asize.length, bsize.length);
      }
      if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
        throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
      }
      if (!bvalues) {
        throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      }
      var rows = asize[0];
      var columns = asize[1];
      var dt = typeof adt === "string" && adt === bdt ? adt : void 0;
      var cf = dt ? typed2.find(callback, [dt, dt]) : callback;
      var i, j;
      var cdata = [];
      for (i = 0; i < rows; i++) {
        cdata[i] = [];
      }
      var x = [];
      var w = [];
      for (j = 0; j < columns; j++) {
        var mark = j + 1;
        for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
          i = bindex[k];
          x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
          w[i] = mark;
        }
        for (i = 0; i < rows; i++) {
          if (w[i] === mark) {
            cdata[i][j] = x[i];
          } else {
            cdata[i][j] = adata[i][j];
          }
        }
      }
      return denseMatrix.createDenseMatrix({
        data: cdata,
        size: [rows, columns],
        datatype: dt
      });
    };
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm10.js
  var name17 = "algorithm10";
  var dependencies18 = ["typed", "DenseMatrix"];
  var createAlgorithm10 = /* @__PURE__ */ factory(name17, dependencies18, (_ref) => {
    var {
      typed: typed2,
      DenseMatrix: DenseMatrix2
    } = _ref;
    return function algorithm10(s, b, callback, inverse) {
      var avalues = s._values;
      var aindex = s._index;
      var aptr = s._ptr;
      var asize = s._size;
      var adt = s._datatype;
      if (!avalues) {
        throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
      }
      var rows = asize[0];
      var columns = asize[1];
      var dt;
      var cf = callback;
      if (typeof adt === "string") {
        dt = adt;
        b = typed2.convert(b, dt);
        cf = typed2.find(callback, [dt, dt]);
      }
      var cdata = [];
      var x = [];
      var w = [];
      for (var j = 0; j < columns; j++) {
        var mark = j + 1;
        for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
          var r = aindex[k];
          x[r] = avalues[k];
          w[r] = mark;
        }
        for (var i = 0; i < rows; i++) {
          if (j === 0) {
            cdata[i] = [];
          }
          if (w[i] === mark) {
            cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
          } else {
            cdata[i][j] = b;
          }
        }
      }
      return new DenseMatrix2({
        data: cdata,
        size: [rows, columns],
        datatype: dt
      });
    };
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm13.js
  var name18 = "algorithm13";
  var dependencies19 = ["typed"];
  var createAlgorithm13 = /* @__PURE__ */ factory(name18, dependencies19, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return function algorithm13(a, b, callback) {
      var adata = a._data;
      var asize = a._size;
      var adt = a._datatype;
      var bdata = b._data;
      var bsize = b._size;
      var bdt = b._datatype;
      var csize = [];
      if (asize.length !== bsize.length) {
        throw new DimensionError(asize.length, bsize.length);
      }
      for (var s = 0; s < asize.length; s++) {
        if (asize[s] !== bsize[s]) {
          throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
        }
        csize[s] = asize[s];
      }
      var dt;
      var cf = callback;
      if (typeof adt === "string" && adt === bdt) {
        dt = adt;
        cf = typed2.find(callback, [dt, dt]);
      }
      var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : [];
      return a.createDenseMatrix({
        data: cdata,
        size: csize,
        datatype: dt
      });
    };
    function _iterate(f, level, s, n, av, bv) {
      var cv = [];
      if (level === s.length - 1) {
        for (var i = 0; i < n; i++) {
          cv[i] = f(av[i], bv[i]);
        }
      } else {
        for (var j = 0; j < n; j++) {
          cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
        }
      }
      return cv;
    }
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm03.js
  var name19 = "algorithm03";
  var dependencies20 = ["typed"];
  var createAlgorithm03 = /* @__PURE__ */ factory(name19, dependencies20, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return function algorithm03(denseMatrix, sparseMatrix, callback, inverse) {
      var adata = denseMatrix._data;
      var asize = denseMatrix._size;
      var adt = denseMatrix._datatype;
      var bvalues = sparseMatrix._values;
      var bindex = sparseMatrix._index;
      var bptr = sparseMatrix._ptr;
      var bsize = sparseMatrix._size;
      var bdt = sparseMatrix._datatype;
      if (asize.length !== bsize.length) {
        throw new DimensionError(asize.length, bsize.length);
      }
      if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
        throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
      }
      if (!bvalues) {
        throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
      }
      var rows = asize[0];
      var columns = asize[1];
      var dt;
      var zero = 0;
      var cf = callback;
      if (typeof adt === "string" && adt === bdt) {
        dt = adt;
        zero = typed2.convert(0, dt);
        cf = typed2.find(callback, [dt, dt]);
      }
      var cdata = [];
      for (var z = 0; z < rows; z++) {
        cdata[z] = [];
      }
      var x = [];
      var w = [];
      for (var j = 0; j < columns; j++) {
        var mark = j + 1;
        for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
          var i = bindex[k];
          x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
          w[i] = mark;
        }
        for (var y = 0; y < rows; y++) {
          if (w[y] === mark) {
            cdata[y][j] = x[y];
          } else {
            cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
          }
        }
      }
      return denseMatrix.createDenseMatrix({
        data: cdata,
        size: [rows, columns],
        datatype: dt
      });
    };
  });

  // node_modules/mathjs/lib/esm/type/matrix/utils/algorithm05.js
  var name20 = "algorithm05";
  var dependencies21 = ["typed", "equalScalar"];
  var createAlgorithm05 = /* @__PURE__ */ factory(name20, dependencies21, (_ref) => {
    var {
      typed: typed2,
      equalScalar: equalScalar2
    } = _ref;
    return function algorithm05(a, b, callback) {
      var avalues = a._values;
      var aindex = a._index;
      var aptr = a._ptr;
      var asize = a._size;
      var adt = a._datatype;
      var bvalues = b._values;
      var bindex = b._index;
      var bptr = b._ptr;
      var bsize = b._size;
      var bdt = b._datatype;
      if (asize.length !== bsize.length) {
        throw new DimensionError(asize.length, bsize.length);
      }
      if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
        throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
      }
      var rows = asize[0];
      var columns = asize[1];
      var dt;
      var eq = equalScalar2;
      var zero = 0;
      var cf = callback;
      if (typeof adt === "string" && adt === bdt) {
        dt = adt;
        eq = typed2.find(equalScalar2, [dt, dt]);
        zero = typed2.convert(0, dt);
        cf = typed2.find(callback, [dt, dt]);
      }
      var cvalues = avalues && bvalues ? [] : void 0;
      var cindex = [];
      var cptr = [];
      var xa = cvalues ? [] : void 0;
      var xb = cvalues ? [] : void 0;
      var wa = [];
      var wb = [];
      var i, j, k, k1;
      for (j = 0; j < columns; j++) {
        cptr[j] = cindex.length;
        var mark = j + 1;
        for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
          i = aindex[k];
          cindex.push(i);
          wa[i] = mark;
          if (xa) {
            xa[i] = avalues[k];
          }
        }
        for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
          i = bindex[k];
          if (wa[i] !== mark) {
            cindex.push(i);
          }
          wb[i] = mark;
          if (xb) {
            xb[i] = bvalues[k];
          }
        }
        if (cvalues) {
          k = cptr[j];
          while (k < cindex.length) {
            i = cindex[k];
            var wai = wa[i];
            var wbi = wb[i];
            if (wai === mark || wbi === mark) {
              var va = wai === mark ? xa[i] : zero;
              var vb = wbi === mark ? xb[i] : zero;
              var vc = cf(va, vb);
              if (!eq(vc, zero)) {
                cvalues.push(vc);
                k++;
              } else {
                cindex.splice(k, 1);
              }
            }
          }
        }
      }
      cptr[columns] = cindex.length;
      return a.createSparseMatrix({
        values: cvalues,
        index: cindex,
        ptr: cptr,
        size: [rows, columns],
        datatype: dt
      });
    };
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/multiplyScalar.js
  var name21 = "multiplyScalar";
  var dependencies22 = ["typed"];
  var createMultiplyScalar = /* @__PURE__ */ factory(name21, dependencies22, (_ref) => {
    var {
      typed: typed2
    } = _ref;
    return typed2("multiplyScalar", {
      "number, number": multiplyNumber,
      "Complex, Complex": function ComplexComplex(x, y) {
        return x.mul(y);
      },
      "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
        return x.times(y);
      },
      "Fraction, Fraction": function FractionFraction(x, y) {
        return x.mul(y);
      },
      "number | Fraction | BigNumber | Complex, Unit": function numberFractionBigNumberComplexUnit(x, y) {
        var res = y.clone();
        res.value = res.value === null ? res._normalize(x) : this(res.value, x);
        return res;
      },
      "Unit, number | Fraction | BigNumber | Complex": function UnitNumberFractionBigNumberComplex(x, y) {
        var res = x.clone();
        res.value = res.value === null ? res._normalize(y) : this(res.value, y);
        return res;
      },
      "Unit, Unit": function UnitUnit(x, y) {
        return x.multiply(y);
      }
    });
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/sqrt.js
  var name22 = "sqrt";
  var dependencies23 = ["config", "typed", "Complex"];
  var createSqrt = /* @__PURE__ */ factory(name22, dependencies23, (_ref) => {
    var {
      config: config4,
      typed: typed2,
      Complex: Complex3
    } = _ref;
    return typed2("sqrt", {
      number: _sqrtNumber,
      Complex: function Complex4(x) {
        return x.sqrt();
      },
      BigNumber: function BigNumber2(x) {
        if (!x.isNegative() || config4.predictable) {
          return x.sqrt();
        } else {
          return _sqrtNumber(x.toNumber());
        }
      },
      "Array | Matrix": function ArrayMatrix(x) {
        return deepMap(x, this, true);
      },
      Unit: function Unit(x) {
        return x.pow(0.5);
      }
    });
    function _sqrtNumber(x) {
      if (isNaN(x)) {
        return NaN;
      } else if (x >= 0 || config4.predictable) {
        return Math.sqrt(x);
      } else {
        return new Complex3(x, 0).sqrt();
      }
    }
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/subtract.js
  var name23 = "subtract";
  var dependencies24 = ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix"];
  var createSubtract = /* @__PURE__ */ factory(name23, dependencies24, (_ref) => {
    var {
      typed: typed2,
      matrix: matrix2,
      equalScalar: equalScalar2,
      addScalar: addScalar2,
      unaryMinus: unaryMinus2,
      DenseMatrix: DenseMatrix2
    } = _ref;
    var algorithm01 = createAlgorithm01({
      typed: typed2
    });
    var algorithm03 = createAlgorithm03({
      typed: typed2
    });
    var algorithm05 = createAlgorithm05({
      typed: typed2,
      equalScalar: equalScalar2
    });
    var algorithm10 = createAlgorithm10({
      typed: typed2,
      DenseMatrix: DenseMatrix2
    });
    var algorithm13 = createAlgorithm13({
      typed: typed2
    });
    var algorithm14 = createAlgorithm14({
      typed: typed2
    });
    return typed2(name23, {
      "number, number": function numberNumber(x, y) {
        return x - y;
      },
      "Complex, Complex": function ComplexComplex(x, y) {
        return x.sub(y);
      },
      "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
        return x.minus(y);
      },
      "Fraction, Fraction": function FractionFraction(x, y) {
        return x.sub(y);
      },
      "Unit, Unit": function UnitUnit(x, y) {
        if (x.value === null) {
          throw new Error("Parameter x contains a unit with undefined value");
        }
        if (y.value === null) {
          throw new Error("Parameter y contains a unit with undefined value");
        }
        if (!x.equalBase(y)) {
          throw new Error("Units do not match");
        }
        var res = x.clone();
        res.value = this(res.value, y.value);
        res.fixPrefix = false;
        return res;
      },
      "SparseMatrix, SparseMatrix": function SparseMatrixSparseMatrix(x, y) {
        checkEqualDimensions(x, y);
        return algorithm05(x, y, this);
      },
      "SparseMatrix, DenseMatrix": function SparseMatrixDenseMatrix(x, y) {
        checkEqualDimensions(x, y);
        return algorithm03(y, x, this, true);
      },
      "DenseMatrix, SparseMatrix": function DenseMatrixSparseMatrix(x, y) {
        checkEqualDimensions(x, y);
        return algorithm01(x, y, this, false);
      },
      "DenseMatrix, DenseMatrix": function DenseMatrixDenseMatrix(x, y) {
        checkEqualDimensions(x, y);
        return algorithm13(x, y, this);
      },
      "Array, Array": function ArrayArray(x, y) {
        return this(matrix2(x), matrix2(y)).valueOf();
      },
      "Array, Matrix": function ArrayMatrix(x, y) {
        return this(matrix2(x), y);
      },
      "Matrix, Array": function MatrixArray(x, y) {
        return this(x, matrix2(y));
      },
      "SparseMatrix, any": function SparseMatrixAny(x, y) {
        return algorithm10(x, unaryMinus2(y), addScalar2);
      },
      "DenseMatrix, any": function DenseMatrixAny(x, y) {
        return algorithm14(x, y, this);
      },
      "any, SparseMatrix": function anySparseMatrix(x, y) {
        return algorithm10(y, x, this, true);
      },
      "any, DenseMatrix": function anyDenseMatrix(x, y) {
        return algorithm14(y, x, this, true);
      },
      "Array, any": function ArrayAny(x, y) {
        return algorithm14(matrix2(x), y, this, false).valueOf();
      },
      "any, Array": function anyArray(x, y) {
        return algorithm14(matrix2(y), x, this, true).valueOf();
      }
    });
  });
  function checkEqualDimensions(x, y) {
    var xsize = x.size();
    var ysize = y.size();
    if (xsize.length !== ysize.length) {
      throw new DimensionError(xsize.length, ysize.length);
    }
  }

  // node_modules/mathjs/lib/esm/utils/noop.js
  function noBignumber() {
    throw new Error('No "bignumber" implementation available');
  }
  function noFraction() {
    throw new Error('No "fraction" implementation available');
  }

  // node_modules/mathjs/lib/esm/function/utils/numeric.js
  var name24 = "numeric";
  var dependencies25 = ["number", "?bignumber", "?fraction"];
  var createNumeric = /* @__PURE__ */ factory(name24, dependencies25, (_ref) => {
    var {
      number: _number,
      bignumber: bignumber2,
      fraction: fraction2
    } = _ref;
    var validInputTypes = {
      string: true,
      number: true,
      BigNumber: true,
      Fraction: true
    };
    var validOutputTypes = {
      number: (x) => _number(x),
      BigNumber: bignumber2 ? (x) => bignumber2(x) : noBignumber,
      Fraction: fraction2 ? (x) => fraction2(x) : noFraction
    };
    return function numeric2(value, outputType) {
      var inputType = typeOf(value);
      if (!(inputType in validInputTypes)) {
        throw new TypeError("Cannot convert " + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(", "));
      }
      if (!(outputType in validOutputTypes)) {
        throw new TypeError("Cannot convert " + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(", "));
      }
      if (outputType === inputType) {
        return value;
      } else {
        return validOutputTypes[outputType](value);
      }
    };
  });

  // node_modules/mathjs/lib/esm/function/arithmetic/divideScalar.js
  var name25 = "divideScalar";
  var dependencies26 = ["typed", "numeric"];
  var createDivideScalar = /* @__PURE__ */ factory(name25, dependencies26, (_ref) => {
    var {
      typed: typed2,
      numeric: numeric2
    } = _ref;
    return typed2(name25, {
      "number, number": function numberNumber(x, y) {
        return x / y;
      },
      "Complex, Complex": function ComplexComplex(x, y) {
        return x.div(y);
      },
      "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
        return x.div(y);
      },
      "Fraction, Fraction": function FractionFraction(x, y) {
        return x.div(y);
      },
      "Unit, number | Fraction | BigNumber": function UnitNumberFractionBigNumber(x, y) {
        var res = x.clone();
        var one = numeric2(1, typeOf(y));
        res.value = this(res.value === null ? res._normalize(one) : res.value, y);
        return res;
      },
      "number | Fraction | BigNumber, Unit": function numberFractionBigNumberUnit(x, y) {
        var res = y.clone();
        res = res.pow(-1);
        var one = numeric2(1, typeOf(x));
        res.value = this(x, y.value === null ? y._normalize(one) : y.value);
        return res;
      },
      "Unit, Unit": function UnitUnit(x, y) {
        return x.divide(y);
      }
    });
  });

  // node_modules/mathjs/lib/esm/function/geometry/distance.js
  var name26 = "distance";
  var dependencies27 = ["typed", "addScalar", "subtract", "divideScalar", "multiplyScalar", "unaryMinus", "sqrt", "abs"];
  var createDistance = /* @__PURE__ */ factory(name26, dependencies27, (_ref) => {
    var {
      typed: typed2,
      addScalar: addScalar2,
      subtract: subtract2,
      multiplyScalar: multiplyScalar2,
      divideScalar: divideScalar2,
      unaryMinus: unaryMinus2,
      sqrt: sqrt3,
      abs: abs3
    } = _ref;
    return typed2(name26, {
      "Array, Array, Array": function ArrayArrayArray(x, y, z) {
        if (x.length === 2 && y.length === 2 && z.length === 2) {
          if (!_2d(x)) {
            throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
          }
          if (!_2d(y)) {
            throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
          }
          if (!_2d(z)) {
            throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
          }
          var m = divideScalar2(subtract2(z[1], z[0]), subtract2(y[1], y[0]));
          var xCoeff = multiplyScalar2(multiplyScalar2(m, m), y[0]);
          var yCoeff = unaryMinus2(multiplyScalar2(m, y[0]));
          var constant = x[1];
          return _distancePointLine2D(x[0], x[1], xCoeff, yCoeff, constant);
        } else {
          throw new TypeError("Invalid Arguments: Try again");
        }
      },
      "Object, Object, Object": function ObjectObjectObject(x, y, z) {
        if (Object.keys(x).length === 2 && Object.keys(y).length === 2 && Object.keys(z).length === 2) {
          if (!_2d(x)) {
            throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
          }
          if (!_2d(y)) {
            throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");
          }
          if (!_2d(z)) {
            throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");
          }
          if ("pointX" in x && "pointY" in x && "lineOnePtX" in y && "lineOnePtY" in y && "lineTwoPtX" in z && "lineTwoPtY" in z) {
            var m = divideScalar2(subtract2(z.lineTwoPtY, z.lineTwoPtX), subtract2(y.lineOnePtY, y.lineOnePtX));
            var xCoeff = multiplyScalar2(multiplyScalar2(m, m), y.lineOnePtX);
            var yCoeff = unaryMinus2(multiplyScalar2(m, y.lineOnePtX));
            var constant = x.pointX;
            return _distancePointLine2D(x.pointX, x.pointY, xCoeff, yCoeff, constant);
          } else {
            throw new TypeError("Key names do not match");
          }
        } else {
          throw new TypeError("Invalid Arguments: Try again");
        }
      },
      "Array, Array": function ArrayArray(x, y) {
        if (x.length === 2 && y.length === 3) {
          if (!_2d(x)) {
            throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
          }
          if (!_3d(y)) {
            throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
          }
          return _distancePointLine2D(x[0], x[1], y[0], y[1], y[2]);
        } else if (x.length === 3 && y.length === 6) {
          if (!_3d(x)) {
            throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
          }
          if (!_parametricLine(y)) {
            throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument");
          }
          return _distancePointLine3D(x[0], x[1], x[2], y[0], y[1], y[2], y[3], y[4], y[5]);
        } else if (x.length === y.length && x.length > 0) {
          if (!_containsOnlyNumbers(x)) {
            throw new TypeError("All values of an array should be numbers or BigNumbers");
          }
          if (!_containsOnlyNumbers(y)) {
            throw new TypeError("All values of an array should be numbers or BigNumbers");
          }
          return _euclideanDistance(x, y);
        } else {
          throw new TypeError("Invalid Arguments: Try again");
        }
      },
      "Object, Object": function ObjectObject(x, y) {
        if (Object.keys(x).length === 2 && Object.keys(y).length === 3) {
          if (!_2d(x)) {
            throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
          }
          if (!_3d(y)) {
            throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers");
          }
          if ("pointX" in x && "pointY" in x && "xCoeffLine" in y && "yCoeffLine" in y && "constant" in y) {
            return _distancePointLine2D(x.pointX, x.pointY, y.xCoeffLine, y.yCoeffLine, y.constant);
          } else {
            throw new TypeError("Key names do not match");
          }
        } else if (Object.keys(x).length === 3 && Object.keys(y).length === 6) {
          if (!_3d(x)) {
            throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers");
          }
          if (!_parametricLine(y)) {
            throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers");
          }
          if ("pointX" in x && "pointY" in x && "x0" in y && "y0" in y && "z0" in y && "a" in y && "b" in y && "c" in y) {
            return _distancePointLine3D(x.pointX, x.pointY, x.pointZ, y.x0, y.y0, y.z0, y.a, y.b, y.c);
          } else {
            throw new TypeError("Key names do not match");
          }
        } else if (Object.keys(x).length === 2 && Object.keys(y).length === 2) {
          if (!_2d(x)) {
            throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers");
          }
          if (!_2d(y)) {
            throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers");
          }
          if ("pointOneX" in x && "pointOneY" in x && "pointTwoX" in y && "pointTwoY" in y) {
            return _euclideanDistance([x.pointOneX, x.pointOneY], [y.pointTwoX, y.pointTwoY]);
          } else {
            throw new TypeError("Key names do not match");
          }
        } else if (Object.keys(x).length === 3 && Object.keys(y).length === 3) {
          if (!_3d(x)) {
            throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers");
          }
          if (!_3d(y)) {
            throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers");
          }
          if ("pointOneX" in x && "pointOneY" in x && "pointOneZ" in x && "pointTwoX" in y && "pointTwoY" in y && "pointTwoZ" in y) {
            return _euclideanDistance([x.pointOneX, x.pointOneY, x.pointOneZ], [y.pointTwoX, y.pointTwoY, y.pointTwoZ]);
          } else {
            throw new TypeError("Key names do not match");
          }
        } else {
          throw new TypeError("Invalid Arguments: Try again");
        }
      },
      Array: function Array2(arr) {
        if (!_pairwise(arr)) {
          throw new TypeError("Incorrect array format entered for pairwise distance calculation");
        }
        return _distancePairwise(arr);
      }
    });
    function _isNumber(a) {
      return typeof a === "number" || isBigNumber(a);
    }
    function _2d(a) {
      if (a.constructor !== Array) {
        a = _objectToArray(a);
      }
      return _isNumber(a[0]) && _isNumber(a[1]);
    }
    function _3d(a) {
      if (a.constructor !== Array) {
        a = _objectToArray(a);
      }
      return _isNumber(a[0]) && _isNumber(a[1]) && _isNumber(a[2]);
    }
    function _containsOnlyNumbers(a) {
      if (!Array.isArray(a)) {
        a = _objectToArray(a);
      }
      return a.every(_isNumber);
    }
    function _parametricLine(a) {
      if (a.constructor !== Array) {
        a = _objectToArray(a);
      }
      return _isNumber(a[0]) && _isNumber(a[1]) && _isNumber(a[2]) && _isNumber(a[3]) && _isNumber(a[4]) && _isNumber(a[5]);
    }
    function _objectToArray(o) {
      var keys = Object.keys(o);
      var a = [];
      for (var i = 0; i < keys.length; i++) {
        a.push(o[keys[i]]);
      }
      return a;
    }
    function _pairwise(a) {
      if (a[0].length === 2 && _isNumber(a[0][0]) && _isNumber(a[0][1])) {
        if (a.some((aI) => aI.length !== 2 || !_isNumber(aI[0]) || !_isNumber(aI[1]))) {
          return false;
        }
      } else if (a[0].length === 3 && _isNumber(a[0][0]) && _isNumber(a[0][1]) && _isNumber(a[0][2])) {
        if (a.some((aI) => aI.length !== 3 || !_isNumber(aI[0]) || !_isNumber(aI[1]) || !_isNumber(aI[2]))) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    }
    function _distancePointLine2D(x, y, a, b, c) {
      var num = abs3(addScalar2(addScalar2(multiplyScalar2(a, x), multiplyScalar2(b, y)), c));
      var den = sqrt3(addScalar2(multiplyScalar2(a, a), multiplyScalar2(b, b)));
      return divideScalar2(num, den);
    }
    function _distancePointLine3D(x, y, z, x0, y0, z0, a, b, c) {
      var num = [subtract2(multiplyScalar2(subtract2(y0, y), c), multiplyScalar2(subtract2(z0, z), b)), subtract2(multiplyScalar2(subtract2(z0, z), a), multiplyScalar2(subtract2(x0, x), c)), subtract2(multiplyScalar2(subtract2(x0, x), b), multiplyScalar2(subtract2(y0, y), a))];
      num = sqrt3(addScalar2(addScalar2(multiplyScalar2(num[0], num[0]), multiplyScalar2(num[1], num[1])), multiplyScalar2(num[2], num[2])));
      var den = sqrt3(addScalar2(addScalar2(multiplyScalar2(a, a), multiplyScalar2(b, b)), multiplyScalar2(c, c)));
      return divideScalar2(num, den);
    }
    function _euclideanDistance(x, y) {
      var vectorSize = x.length;
      var result = 0;
      var diff = 0;
      for (var i = 0; i < vectorSize; i++) {
        diff = subtract2(x[i], y[i]);
        result = addScalar2(multiplyScalar2(diff, diff), result);
      }
      return sqrt3(result);
    }
    function _distancePairwise(a) {
      var result = [];
      var pointA = [];
      var pointB = [];
      for (var i = 0; i < a.length - 1; i++) {
        for (var j = i + 1; j < a.length; j++) {
          if (a[0].length === 2) {
            pointA = [a[i][0], a[i][1]];
            pointB = [a[j][0], a[j][1]];
          } else if (a[0].length === 3) {
            pointA = [a[i][0], a[i][1], a[i][2]];
            pointB = [a[j][0], a[j][1], a[j][2]];
          }
          result.push(_euclideanDistance(pointA, pointB));
        }
      }
      return result;
    }
  });

  // node_modules/mathjs/lib/esm/function/probability/util/seededRNG.js
  var import_seedrandom = __toESM(require_seedrandom2(), 1);
  var singletonRandom = /* @__PURE__ */ (0, import_seedrandom.default)(Date.now());
  function createRng(randomSeed) {
    var random3;
    function setSeed(seed) {
      random3 = seed === null ? singletonRandom : (0, import_seedrandom.default)(String(seed));
    }
    setSeed(randomSeed);
    function rng() {
      return random3();
    }
    return rng;
  }

  // node_modules/mathjs/lib/esm/function/probability/util/randomMatrix.js
  function randomMatrix(size, random3) {
    var data = [];
    size = size.slice(0);
    if (size.length > 1) {
      for (var i = 0, length = size.shift(); i < length; i++) {
        data.push(randomMatrix(size, random3));
      }
    } else {
      for (var _i = 0, _length = size.shift(); _i < _length; _i++) {
        data.push(random3());
      }
    }
    return data;
  }

  // node_modules/mathjs/lib/esm/function/probability/random.js
  var name27 = "random";
  var dependencies28 = ["typed", "config", "?on"];
  var createRandom = /* @__PURE__ */ factory(name27, dependencies28, (_ref) => {
    var {
      typed: typed2,
      config: config4,
      on
    } = _ref;
    var rng = createRng(config4.randomSeed);
    if (on) {
      on("config", function(curr, prev) {
        if (curr.randomSeed !== prev.randomSeed) {
          rng = createRng(curr.randomSeed);
        }
      });
    }
    return typed2(name27, {
      "": () => _random(0, 1),
      number: (max2) => _random(0, max2),
      "number, number": (min2, max2) => _random(min2, max2),
      "Array | Matrix": (size) => _randomMatrix(size, 0, 1),
      "Array | Matrix, number": (size, max2) => _randomMatrix(size, 0, max2),
      "Array | Matrix, number, number": (size, min2, max2) => _randomMatrix(size, min2, max2)
    });
    function _randomMatrix(size, min2, max2) {
      var res = randomMatrix(size.valueOf(), () => _random(min2, max2));
      return isMatrix(size) ? size.create(res) : res;
    }
    function _random(min2, max2) {
      return min2 + rng() * (max2 - min2);
    }
  });

  // node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js
  var Complex2 = /* @__PURE__ */ createComplexClass({});
  var BigNumber = /* @__PURE__ */ createBigNumberClass({
    config
  });
  var Matrix = /* @__PURE__ */ createMatrixClass({});
  var Fraction2 = /* @__PURE__ */ createFractionClass({});
  var DenseMatrix = /* @__PURE__ */ createDenseMatrixClass({
    Matrix
  });
  var typed = /* @__PURE__ */ createTyped({
    BigNumber,
    Complex: Complex2,
    DenseMatrix,
    Fraction: Fraction2
  });
  var equalScalar = /* @__PURE__ */ createEqualScalar({
    config,
    typed
  });
  var number = /* @__PURE__ */ createNumber({
    typed
  });
  var multiplyScalar = /* @__PURE__ */ createMultiplyScalar({
    typed
  });
  var fraction = /* @__PURE__ */ createFraction({
    Fraction: Fraction2,
    typed
  });
  var unaryMinus = /* @__PURE__ */ createUnaryMinus({
    typed
  });
  var addScalar = /* @__PURE__ */ createAddScalar({
    typed
  });
  var sqrt2 = /* @__PURE__ */ createSqrt({
    Complex: Complex2,
    config,
    typed
  });
  var random2 = /* @__PURE__ */ createRandom({
    config,
    typed
  });
  var SparseMatrix = /* @__PURE__ */ createSparseMatrixClass({
    Matrix,
    equalScalar,
    typed
  });
  var matrix = /* @__PURE__ */ createMatrix({
    DenseMatrix,
    Matrix,
    SparseMatrix,
    typed
  });
  var abs2 = /* @__PURE__ */ createAbs({
    typed
  });
  var bignumber = /* @__PURE__ */ createBignumber({
    BigNumber,
    typed
  });
  var numeric = /* @__PURE__ */ createNumeric({
    bignumber,
    fraction,
    number
  });
  var subtract = /* @__PURE__ */ createSubtract({
    DenseMatrix,
    addScalar,
    equalScalar,
    matrix,
    typed,
    unaryMinus
  });
  var divideScalar = /* @__PURE__ */ createDivideScalar({
    numeric,
    typed
  });
  var distance = /* @__PURE__ */ createDistance({
    abs: abs2,
    addScalar,
    divideScalar,
    multiplyScalar,
    sqrt: sqrt2,
    subtract,
    typed,
    unaryMinus
  });

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/createBezierPoint.js
  function createBezierControlPoint(parentId, coordinates, path, selected) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {
        meta: meta.VERTEX,
        parent: parentId,
        coord_path: path,
        bezierPoint: true,
        active: selected ? activeStates.ACTIVE : activeStates.INACTIVE
      },
      geometry: {
        type: geojsonTypes.POINT,
        coordinates
      }
    };
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/createBezierHandle.js
  function createBezierHandle(parentId, coordinates, path, selected) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {
        meta: meta.VERTEX,
        meta2: "handle",
        parent: parentId,
        coord_path: path,
        bezierHandle: true,
        active: selected ? activeStates.ACTIVE : activeStates.INACTIVE
      },
      geometry: {
        type: geojsonTypes.POINT,
        coordinates
      }
    };
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/BezierCurve.js
  var BezierCurve = class {
    constructor(nodes = [], closed = false, name28 = "") {
      this.nodes = nodes;
      this.name = name28;
      this.closed = closed;
      this.bezierSteps = 19;
      this.nodesToDelete = [];
      this.nodesToMerge = [];
      this.nodesToSplit = [];
      this.verts = this.vertices;
    }
    get vertices() {
      const verts = [];
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        if (i < this.nodes.length - 1) {
          const nextNode = this.nodes[i + 1];
          verts.push(...this.getVerticesBetweenNodes(node, nextNode));
        } else if (i === this.nodes.length - 1) {
          verts.push(node.coords);
        }
      }
      if (this.closed) {
        const node = this.nodes[this.nodes.length - 1];
        const nextNode = this.nodes[0];
        verts.push(...this.getVerticesBetweenNodes(node, nextNode));
        verts.push(nextNode.coords);
      }
      return verts;
    }
    getVerticesBetweenNodes(node, nextNode) {
      const verts = [];
      verts.push(node.coords);
      if (node.handle || nextNode.handle) {
        const p1 = node.coords;
        let p2;
        let p3;
        const p4 = nextNode.coords;
        if (node.handle) {
          p2 = node.handle;
        } else {
          const nextNodeHandle = nextNode.handle2 ? nextNode.handle2 : mirrorHandle(nextNode.coords, nextNode.handle);
          const p2X = node.coords[0] + (nextNodeHandle[0] - node.coords[0]) * 0.5;
          const p2Y = node.coords[1] + (nextNodeHandle[1] - node.coords[1]) * 0.5;
          p2 = [p2X, p2Y];
        }
        if (nextNode.handle) {
          p3 = nextNode.handle2 ? nextNode.handle2 : mirrorHandle(nextNode.coords, nextNode.handle);
        } else {
          const p3X = nextNode.coords[0] + (node.handle[0] - nextNode.coords[0]) * 0.5;
          const p3Y = nextNode.coords[1] + (node.handle[1] - nextNode.coords[1]) * 0.5;
          p3 = [p3X, p3Y];
        }
        for (let s = 1; s < this.bezierSteps; s++) {
          const t = s / this.bezierSteps;
          const point = bezierCurve4pts(p1, p2, p3, p4, t);
          verts.push(point);
        }
      }
      return verts;
    }
    reverseNodesArray() {
      this.nodes.reverse();
      this.nodes.forEach((node) => {
        if (node.handle && !node.handle2) {
          node.handle = mirrorHandle(node.coords, node.handle);
        } else if (node.handle && node.handle2) {
          const tmpHandle2 = node.handle2;
          node.handle2 = node.handle;
          node.handle = tmpHandle2;
        }
      });
    }
    get geojson() {
      const lineString = {
        type: geojsonTypes.FEATURE,
        properties: { bezierCurve: this },
        geometry: {
          type: geojsonTypes.LINE_STRING,
          coordinates: this.vertices
        }
      };
      return lineString;
    }
    getDistance() {
      return random2(0, 100);
    }
    removeNode(node) {
      this.removeNodes([node]);
    }
    removeNodes(nodes) {
      this.nodes = this.nodes.filter((item) => !nodes.includes(item));
    }
    removeLastNode() {
      this.nodes.pop();
    }
    removeMarkedNodes() {
      this.removeNodes(this.nodesToDelete);
      this.nodesToDelete = [];
    }
    mode_CombineMergeNodesAverage(curveId) {
      const groupOfNodes = this.getGroupOfFollowingNodes(curveId);
      groupOfNodes.forEach((subGroup) => {
        subGroup = subGroup.map((id) => {
          return parseInt(id.split(".")[1]);
        });
        let coordX = 0, coordY = 0;
        let numHandles = 0;
        let coordHandleX = 0, coordHandleY = 0;
        for (let i = 0; i < subGroup.length; i++) {
          const node = this.nodes[subGroup[i]];
          if (node) {
            coordX += node.coords[0];
            coordY += node.coords[1];
            if (node.handle) {
              coordHandleX += node.handle[0];
              coordHandleY += node.handle[1];
              numHandles++;
            }
          }
        }
        coordX = coordX / subGroup.length;
        coordY = coordY / subGroup.length;
        const moveNode = this.nodes[subGroup[0]];
        moveNode.coords = [coordX, coordY];
        if (numHandles > 0) {
          coordHandleX = coordHandleX / numHandles;
          coordHandleY = coordHandleY / numHandles;
          moveNode.handle = [coordHandleX, coordHandleY];
        }
        const nodesToDelete = subGroup.map((id) => {
          return this.nodes[id];
        });
        nodesToDelete.shift();
        this.removeNodes(nodesToDelete);
      });
    }
    getGroupOfFollowingNodes(curveId) {
      const group = [];
      let subGroup = [];
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        let nodeFound = false;
        for (let j = 0; j < this.nodesToMerge.length; j++) {
          const nodeToMerge = this.nodesToMerge[j];
          if (node === nodeToMerge) {
            subGroup.push(`${curveId}.${i}`);
            nodeFound = true;
          }
        }
        if (!nodeFound && subGroup.length > 0) {
          group.push(subGroup);
          subGroup = [];
        }
      }
      if (subGroup.length > 0) {
        group.push(subGroup);
      }
      if (group.length >= 2) {
        const firstSubgroup = group[0];
        const firstId = parseInt(firstSubgroup[0].split(".")[1]);
        const lastSubgroup = group[group.length - 1];
        const lastId = parseInt(lastSubgroup[lastSubgroup.length - 1].split(".")[1]);
        if (firstId === 0 && lastId === this.nodes.length - 1) {
          firstSubgroup.unshift(...lastSubgroup);
          group.pop();
        }
      }
      return group;
    }
    getNodeIndex(node) {
      for (let i = 0; i < this.nodes.length; i++) {
        if (node === this.nodes[i]) {
          return i;
        }
      }
      return -1;
    }
    getRawData() {
      let data = "";
      this.nodes.forEach((node) => {
        let line = "";
        if (node.coords) {
          line += `${node.coords[1]} ${node.coords[0]}`;
        }
        if (node.handle) {
          line += ` ${node.handle[1]} ${node.handle[0]}`;
        }
        if (node.handle2) {
          line += ` ${node.handle2[1]} ${node.handle2[0]}`;
        }
        data += line + "\n";
      });
      if (this.closed) {
        data += "CLOSED\n";
      }
      return data;
    }
    getNodeToSplitIndexes() {
      const splitIndexes = [];
      if (this.nodesToSplit != null) {
        for (let i = 0; i < this.nodesToSplit.length; i++) {
          const node = this.nodesToSplit[i];
          const nodeIndex = this.getNodeIndex(node);
          if (nodeIndex !== 0 && nodeIndex !== this.nodes.length - 1) {
            splitIndexes.push(nodeIndex);
          }
        }
      }
      return splitIndexes;
    }
  };

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/BezierNode.js
  var BezierNode = class {
    constructor(coords = [], handle = null, handle2 = null) {
      this.coords = coords;
      this.handle = handle;
      this.handle2 = handle2;
    }
  };

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/BezierGroup.js
  var BezierGroup = class {
    constructor(bezierCurves = []) {
      const newBezierCurves = [];
      bezierCurves.forEach((bezierCurve) => {
        newBezierCurves.push(new BezierCurve(bezierCurve.nodes, bezierCurve.closed));
      });
      this.bezierCurves = newBezierCurves;
    }
    get vertices() {
      const verts = [];
      if (this.bezierCurves.length === 1) {
        return this.bezierCurves[0].vertices;
      }
      this.bezierCurves.forEach((bezierCurve) => {
        verts.push(bezierCurve.vertices);
      });
      return verts;
    }
    get geojson() {
      const type = this.bezierCurves.length === 1 ? geojsonTypes.LINE_STRING : geojsonTypes.MULTI_LINE_STRING;
      const lineString = {
        type: geojsonTypes.FEATURE,
        properties: { bezierGroup: this },
        geometry: {
          type,
          coordinates: this.vertices
        }
      };
      return lineString;
    }
    removeBezierCurves(bezierCurves) {
      this.bezierCurves = this.bezierCurves.filter((item) => !bezierCurves.includes(item));
    }
    removeMarkedNodes() {
      this.bezierCurves.forEach((bezierCurve) => {
        bezierCurve.removeMarkedNodes();
      });
    }
    refreshFeature(feature, draw3 = null, forceRecreateFeature = false) {
      if (forceRecreateFeature && draw3 != null) {
        const newFeature = draw3.newFeature(this.geojson);
        draw3.addFeature(newFeature);
        newFeature.properties = feature.properties;
        newFeature.properties.bezierGroup = this;
        draw3.select([newFeature.id]);
        draw3.deleteFeature(feature.id, { silent: true });
        return newFeature;
      } else {
        feature.incomingCoords(this.vertices);
        feature.properties.bezierGroup = this;
        return feature;
      }
    }
    getRawData() {
      let data = "BEZIERGROUP\n";
      this.bezierCurves.forEach((bezierCurve) => {
        data += "BEZIERCURVE\n";
        data += bezierCurve.getRawData();
      });
      return data;
    }
    getBezierCurveAndNodeFromCoordPath(coordPath) {
      let bezierCurve;
      let bezierCurveIndex;
      let nodeIndex;
      const split = coordPath.split(".");
      if (this.bezierCurves.length > 1) {
        bezierCurveIndex = parseInt(split[0]);
        bezierCurve = this.bezierCurves[bezierCurveIndex];
        nodeIndex = parseInt(split[1]);
      } else {
        bezierCurveIndex = 0;
        bezierCurve = this.bezierCurves[bezierCurveIndex];
        nodeIndex = parseInt(coordPath);
      }
      const node = bezierCurve.nodes[nodeIndex];
      return { bezierCurve, bezierCurveIndex, node, nodeIndex };
    }
    /////////////////////////////////////////////////////////////////
    ///////// MERGE NODES ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    mergeMarkedNodes() {
      if (!this.TryConnectTwoLimitNodesOnSeparateCurves()) {
        if (!this.TryConnectTwoLimitNodesOnSameCurve()) {
          this.MergeNodesToAverage();
        }
      }
      this.bezierCurves.forEach((bezierCurve) => {
        bezierCurve.nodesToMerge = [];
      });
    }
    TryConnectTwoLimitNodesOnSeparateCurves() {
      let numNodesToMerge = 0;
      const curvesToMerge = [];
      let result = true;
      this.bezierCurves.forEach((bezierCurve) => {
        if (bezierCurve.nodesToMerge) {
          if (bezierCurve.nodesToMerge.length > 1) return result = false;
          if (bezierCurve.nodesToMerge.length === 1 && bezierCurve.closed) return result = false;
          numNodesToMerge += bezierCurve.nodesToMerge.length;
          if (numNodesToMerge > 2) return result = false;
          if (bezierCurve.nodesToMerge.length === 1) {
            curvesToMerge.push(bezierCurve);
          }
        }
      });
      if (!result) return false;
      if (curvesToMerge.length !== 2) return false;
      const c1 = curvesToMerge[0];
      const c2 = curvesToMerge[1];
      const n12 = c1.nodesToMerge[0];
      const n22 = c2.nodesToMerge[0];
      const n1index = c1.getNodeIndex(n12);
      const n2index = c2.getNodeIndex(n22);
      if ((n1index === 0 || n1index === c1.nodes.length - 1) && (n2index === 0 || n2index === c2.nodes.length - 1)) {
        if (n1index === 0) {
          c1.reverseNodesArray();
        }
        if (n2index === c2.nodes.length - 1) {
          c2.reverseNodesArray();
        }
        c2.nodes.forEach((c2Node) => {
          c1.nodes.push(c2Node);
        });
        this.removeBezierCurves([c2]);
        return true;
      }
      return false;
    }
    TryConnectTwoLimitNodesOnSameCurve() {
      let numNodesToMerge = 0;
      let result = true;
      let c = null;
      this.bezierCurves.forEach((bezierCurve) => {
        if (bezierCurve.nodesToMerge && bezierCurve.nodesToMerge.length > 0) {
          if (bezierCurve.nodesToMerge.length !== 2) return result = false;
          if (bezierCurve.nodesToMerge.length === 2 && bezierCurve.closed) return result = false;
          numNodesToMerge += bezierCurve.nodesToMerge.length;
          if (numNodesToMerge > 2) return result = false;
          c = bezierCurve;
        }
      });
      if (!result || c.nodesToMerge.length !== 2 || c === null || c.closed) return false;
      const n12 = c.nodesToMerge[0];
      const n22 = c.nodesToMerge[1];
      const n1index = c.getNodeIndex(n12);
      const n2index = c.getNodeIndex(n22);
      if (n1index === 0 && n2index === c.nodes.length - 1 || n1index === c.nodes.length - 1 && n2index === 0) {
        c.closed = true;
        return true;
      }
      return false;
    }
    MergeNodesToAverage() {
      let curveId = 0;
      this.bezierCurves.forEach((bezierCurve) => {
        bezierCurve.mode_CombineMergeNodesAverage(curveId);
        curveId++;
      });
    }
    /////////////////////////////////////////////////////////////////
    ///////// SPLIT NODES ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    splitMarkedNodes() {
      const newBezierCurves = [];
      this.bezierCurves.forEach((bezierCurve) => {
        if (bezierCurve.nodesToSplit.length > 0 && bezierCurve.closed && bezierCurve.nodes.length >= 2) {
          const node = bezierCurve.nodesToSplit[0];
          const nodeIndex = bezierCurve.getNodeIndex(node);
          for (let i = 0; i < nodeIndex; i++) {
            const nodeToLoop = bezierCurve.nodes[0];
            bezierCurve.nodes.shift();
            bezierCurve.nodes.push(nodeToLoop);
          }
          const newNode = this.getNodeCopy(node);
          bezierCurve.nodes.push(newNode);
          bezierCurve.closed = false;
          bezierCurve.nodesToSplit = bezierCurve.nodesToSplit.filter((item) => ![node].includes(item));
        }
        if (bezierCurve.nodesToSplit.length > 0 && !bezierCurve.closed && bezierCurve.nodes.length > 2) {
          const splitIndexes = bezierCurve.getNodeToSplitIndexes();
          let newNodes = [];
          for (let i = 0; i < bezierCurve.nodes.length; i++) {
            if (splitIndexes.includes(i)) {
              newNodes.push(this.getNodeCopy(bezierCurve.nodes[i]));
              const newBezierCurve = new BezierCurve(newNodes.slice());
              newBezierCurves.push(newBezierCurve);
              newNodes = [];
            }
            newNodes.push(this.getNodeCopy(bezierCurve.nodes[i]));
          }
          if (newNodes.length > 0) {
            const newBezierCurve = new BezierCurve(newNodes.slice());
            newBezierCurves.push(newBezierCurve);
            newNodes = [];
          }
        } else {
          newBezierCurves.push(bezierCurve);
        }
        this.bezierCurves = newBezierCurves;
      });
      this.bezierCurves.forEach((bezierCurve) => {
        bezierCurve.nodesToSplit = [];
      });
    }
    getNodeCopy(node) {
      const newCoords = [node.coords[0], node.coords[1]];
      let newHandle = null;
      if (node.handle) {
        newHandle = [node.handle[0], node.handle[1]];
      }
      let newHandle2 = null;
      if (node.handle2) {
        newHandle2 = [node.handle2[0], node.handle2[1]];
      }
      return new BezierNode(newCoords, newHandle, newHandle2);
    }
  };

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/createBezierHandleLine.js
  function createBezierHandleLine(parentId, coordinates) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {
        meta: meta.LINE_STRING,
        meta2: "handle-line",
        parent: parentId
      },
      geometry: {
        type: geojsonTypes.LINE_STRING,
        coordinates
      }
    };
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/createSupplementaryPointsForBezier.js
  function createSupplementaryPointsForBezier(geojson, options = {}) {
    const { properties } = geojson;
    const bezierGroup = getBezierGroup(properties.user_bezierGroup);
    if (!bezierGroup) return null;
    const supplementaryPoints = [];
    let selectedCoordPaths = [];
    let bezierCurveId = 0;
    if (options.selectedPaths) {
      selectedCoordPaths = options.selectedPaths;
    }
    const featureId = options.featureId;
    bezierGroup.bezierCurves.forEach((bezierCurve) => {
      for (let i = 0; i < bezierCurve.nodes.length; i++) {
        const node = bezierCurve.nodes[i];
        const coord_path = bezierGroup.bezierCurves.length > 1 ? `${bezierCurveId}.${i}` : `${i}`;
        const selected = selectedCoordPaths.includes(coord_path);
        supplementaryPoints.push(createBezierControlPoint(properties.id, node.coords, coord_path, selected));
      }
      bezierCurveId++;
    });
    selectedCoordPaths.forEach((coordPath) => {
      const node = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath).node;
      if (node.handle) {
        const handleVertex = createBezierHandle(properties.id, node.handle, coordPath, false);
        handleVertex.properties.handle = true;
        handleVertex.properties.handleInverse = false;
        supplementaryPoints.push(handleVertex);
      }
      if (node.handle2 || node.handle) {
        const inverseHandleVertex = createBezierHandle(properties.id, node.handle2 ? node.handle2 : mirrorHandle(node.coords, node.handle), coordPath, false);
        inverseHandleVertex.properties.handle = true;
        inverseHandleVertex.properties.handleInverse = true;
        supplementaryPoints.push(inverseHandleVertex);
      }
      if (node.handle) {
        if (node.handle2) {
          supplementaryPoints.push(createBezierHandleLine(properties.id, [node.handle, node.coords, node.handle2]));
        } else {
          supplementaryPoints.push(createBezierHandleLine(properties.id, [node.handle, mirrorHandle(node.coords, node.handle)]));
        }
      }
    });
    if (options.midpoints && featureId) {
      for (let i = 0; i < bezierGroup.bezierCurves.length; i++) {
        const bezierCurve = bezierGroup.bezierCurves[i];
        let vertIndex = 0;
        for (let j = 0; j < bezierCurve.nodes.length; j++) {
          const node = bezierCurve.nodes[j];
          const nextNodeIndex = j < bezierCurve.nodes.length - 1 ? j + 1 : 0;
          if (!bezierCurve.closed && nextNodeIndex === 0) continue;
          const nextNode = bezierCurve.nodes[nextNodeIndex];
          let midPointCoords;
          if (node.handle || !node.handle && nextNode.handle) {
            const nextNodeVerticeIndex = vertIndex + parseInt(bezierCurve.bezierSteps);
            midPointCoords = getMidPointVertex(bezierCurve.verts, vertIndex, nextNodeVerticeIndex);
            vertIndex += bezierCurve.bezierSteps;
          } else if (!node.handle && !nextNode.handle) {
            midPointCoords = [(node.coords[0] + nextNode.coords[0]) / 2, (node.coords[1] + nextNode.coords[1]) / 2];
            vertIndex += 1;
          }
          if (midPointCoords) {
            const mid = { lng: midPointCoords[0], lat: midPointCoords[1] };
            const coordPath = bezierGroup.bezierCurves.length > 1 ? `${i}.${j}` : `${j}`;
            const midPoint = {
              type: geojsonTypes.FEATURE,
              properties: {
                meta: meta.MIDPOINT,
                parent: featureId,
                lng: mid.lng,
                lat: mid.lat,
                coord_path: coordPath
              },
              geometry: {
                type: geojsonTypes.POINT,
                coordinates: [mid.lng, mid.lat]
              }
            };
            supplementaryPoints.push(midPoint);
          }
        }
      }
    }
    return supplementaryPoints;
  }
  function getMidPointVertex(verts, startIndex, endIndex) {
    const pS = verts[startIndex];
    const pE = verts[endIndex];
    let smallestDistDiff = 99999999;
    let midVertexId = -1;
    for (let i = 1; i < endIndex - startIndex - 1; i++) {
      const vIndex = startIndex + i;
      const pI = verts[vIndex];
      const distDiff = abs2(distance(pS, pI) - distance(pE, pI));
      if (distDiff < smallestDistDiff) {
        smallestDistDiff = distDiff;
        midVertexId = vIndex;
      }
    }
    if (midVertexId !== -1) {
      return verts[midVertexId];
    }
    return null;
  }
  function getBezierGroup(bezierGroupFromProps) {
    if (bezierGroupFromProps == null) return null;
    bezierGroupFromProps = new BezierGroup(bezierGroupFromProps.bezierCurves);
    return bezierGroupFromProps;
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/copyBezierGroupToClipboard.js
  function copyBezierGroupToClipboard(selectedFeatures) {
    if (selectedFeatures.length > 0) {
      let copiedText = "";
      selectedFeatures.forEach((feature) => {
        if (feature && feature.properties.bezierGroup) {
          const bezierGroup = new BezierGroup(feature.properties.bezierGroup.bezierCurves);
          copiedText += bezierGroup.getRawData();
        } else {
          console.error("No Bezier Group copied in Memory : feature1 is null or feature1 is not a bezier Group");
        }
      });
      if (copiedText !== "") {
        const el = document.createElement("textarea");
        el.value = copiedText;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        console.log("Selected Bezier Group copied In Memory");
      }
    } else {
      console.error("No Bezier Group copied in Memory : selectedFeatures.length = 0");
    }
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/utils/additional_selectors.js
  function isAltDown(e) {
    if (!e.originalEvent) return false;
    return e.originalEvent.altKey;
  }
  function isCtrlCDown(e) {
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      return true;
    }
    return false;
  }

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/modes/directModeBezierOverride.js
  var DirectModeBezierOverride = import_mapbox_gl_draw.default.modes.direct_select;
  var isVertex2 = isOfMetaType(meta.VERTEX);
  var isMidpoint = isOfMetaType(meta.MIDPOINT);
  var draw = null;
  DirectModeBezierOverride.onSetup = function(opts) {
    const featureId = opts.featureId;
    const feature = this.getFeature(featureId);
    draw = this;
    if (!feature) {
      throw new Error("You must provide a featureId to enter direct_select mode");
    }
    if (feature.type === geojsonTypes.POINT) {
      throw new TypeError("direct_select mode doesn't handle point features");
    }
    const state = {
      featureId,
      feature,
      dragMoveLocation: opts.startPos || null,
      dragMoving: false,
      canDragMove: false,
      selectedCoordPaths: opts.coordPath ? [opts.coordPath] : []
    };
    this.setSelectedCoordinates(this.pathsToCoordinates(featureId, state.selectedCoordPaths));
    this.setSelected(featureId);
    double_click_zoom_default.disable(this);
    this.setActionableState({
      trash: true
    });
    return state;
  };
  DirectModeBezierOverride.onVertex = function(state, e) {
    this.startDragging(state, e);
    const props = e.featureTarget.properties;
    state.handleSelected = 0;
    const coordPath = props.coord_path;
    if (props.bezierPoint || props.bezierHandle) {
      const bezierGroup = getBezierGroup2(state);
      const result = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath);
      const node = result.node;
      if (props.bezierPoint) {
        if (isAltDown(e)) {
          if (node) {
            if (!node.handle) {
              state.createNewHandles = true;
            } else if (node.handle || node.handle2) {
              node.handle = node.handle2 = null;
              bezierGroup.refreshFeature(state.feature);
            }
          }
        }
      }
      if (props.bezierHandle) {
        state.handleSelected = props.handleInverse ? -1 : 1;
        state.selectedCoordPaths = [props.coord_path];
        if (isAltDown(e)) {
          state.breakHandleSymetry = true;
        } else if (isShiftDown(e)) {
          if (node) {
            if (node.handle2) {
              if (state.handleSelected === -1) {
                node.handle = mirrorHandle(node.coords, node.handle2);
              }
              node.handle2 = void 0;
              bezierGroup.refreshFeature(state.feature);
            }
          }
        }
        return;
      }
    }
    const selectedIndex = state.selectedCoordPaths.indexOf(props.coord_path);
    if (!isShiftDown(e) && selectedIndex === -1) {
      state.selectedCoordPaths = [props.coord_path];
    } else if (isShiftDown(e) && selectedIndex === -1) {
      state.selectedCoordPaths.push(props.coord_path);
    }
    const selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
    this.setSelectedCoordinates(selectedCoordinates);
  };
  DirectModeBezierOverride.onMidpoint = function(state, e) {
    const bezierGroup = getBezierGroup2(state);
    if (bezierGroup) {
      this.startDragging(state, e);
      const props = e.featureTarget.properties;
      const result = bezierGroup.getBezierCurveAndNodeFromCoordPath(props.coord_path);
      const bezierCurve = result.bezierCurve;
      const bezierCurveIndex = result.bezierCurveIndex;
      const nodeIndex = result.nodeIndex;
      const newNode = new BezierNode([props.lng, props.lat]);
      const newCoordPath = bezierGroup.bezierCurves.length > 1 ? `${bezierCurveIndex}.${nodeIndex + 1}` : `${nodeIndex + 1}`;
      bezierCurve.nodes.splice(nodeIndex + 1, 0, newNode);
      bezierGroup.refreshFeature(state.feature);
      this.fireUpdate();
      state.selectedCoordPaths = [newCoordPath];
      const selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
      this.setSelectedCoordinates(selectedCoordinates);
    }
  };
  DirectModeBezierOverride.dragFeature = function(state, e, delta) {
    move_features_default(this.getSelected(), delta);
    dragBezierPoints(this, delta);
    state.dragMoveLocation = e.lngLat;
  };
  DirectModeBezierOverride.dragVertex = function(state, e, delta) {
    const bezierGroup = getBezierGroup2(state);
    if (bezierGroup) {
      if (state.createNewHandles) {
        const coordPath = state.selectedCoordPaths[state.selectedCoordPaths.length - 1];
        const node = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath).node;
        if (node) {
          if (!node.handle && !node.handle2) {
            node.handle = [node.coords[0], node.coords[1]];
          }
          state.createNewHandles = false;
          state.handleSelected = 1;
        }
      }
      if (state.handleSelected === 0) {
        state.selectedCoordPaths.forEach((coordPath) => {
          const node = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath).node;
          node.coords[0] += delta.lng;
          node.coords[1] += delta.lat;
          if (node.handle) {
            node.handle[0] += delta.lng;
            node.handle[1] += delta.lat;
          }
          if (node.handle2) {
            node.handle2[0] += delta.lng;
            node.handle2[1] += delta.lat;
          }
        });
      } else {
        const coordPath = state.selectedCoordPaths[state.selectedCoordPaths.length - 1];
        const node = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath).node;
        if (node) {
          if (state.breakHandleSymetry && !node.handle2) {
            state.breakHandleSymetry = false;
            node.handle2 = mirrorHandle(node.coords, node.handle);
          }
          if (!node.handle2) {
            if (node.handle) {
              node.handle[0] += delta.lng * state.handleSelected;
              node.handle[1] += delta.lat * state.handleSelected;
            }
          } else {
            if (state.handleSelected === 1) {
              node.handle[0] += delta.lng;
              node.handle[1] += delta.lat;
            } else if (state.handleSelected === -1) {
              node.handle2[0] += delta.lng;
              node.handle2[1] += delta.lat;
            }
          }
        }
      }
      bezierGroup.refreshFeature(state.feature);
      this.fireUpdate();
    } else {
      const selectedCoords = state.selectedCoordPaths.map((coord_path) => state.feature.getCoordinate(coord_path));
      const selectedCoordPoints = selectedCoords.map((coords) => ({
        type: geojsonTypes.FEATURE,
        properties: {},
        geometry: {
          type: geojsonTypes.POINT,
          coordinates: coords
        }
      }));
      const constrainedDelta = constrain_feature_movement_default(selectedCoordPoints, delta);
      for (let i = 0; i < selectedCoords.length; i++) {
        const coord = selectedCoords[i];
        state.feature.updateCoordinate(state.selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);
      }
    }
  };
  DirectModeBezierOverride.onKeyDown = function(state, e) {
    if (isCtrlCDown(e)) {
      copyBezierGroupToClipboard(this.getSelected());
    }
  };
  DirectModeBezierOverride.onTrash = function(state) {
    const bezierGroup = getBezierGroup2(state);
    state.selectedCoordPaths.forEach((coordPath) => {
      const result = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath);
      const bezierCurve = result.bezierCurve;
      const node = result.node;
      bezierCurve.nodesToDelete.push(node);
    });
    bezierGroup.removeMarkedNodes();
    bezierGroup.refreshFeature(state.feature);
    this.fireUpdate();
    state.selectedCoordPaths = [];
    this.clearSelectedCoordinates();
    this.fireActionable(state);
    if (state.feature.isValid() === false) {
      this.deleteFeature([state.featureId]);
      this.changeMode(modes.SIMPLE_SELECT, {});
    }
  };
  DirectModeBezierOverride.onMouseMove = function(state, e) {
    const isFeature = isActiveFeature(e);
    const onVertex = isVertex2(e);
    const onMidpoint = isMidpoint(e);
    const noCoords = state.selectedCoordPaths.length === 0;
    if (onMidpoint) this.updateUIClasses({ mouse: cursors.ADD });
    else if (isFeature && noCoords) this.updateUIClasses({ mouse: cursors.MOVE });
    else if (onVertex && !noCoords) this.updateUIClasses({ mouse: cursors.MOVE });
    else this.updateUIClasses({ mouse: cursors.NONE });
    this.stopDragging(state);
    return true;
  };
  DirectModeBezierOverride.onMouseOut = function(state) {
    if (state.dragMoving) this.fireUpdate();
    return true;
  };
  DirectModeBezierOverride.onCombineFeatures = function(state) {
    if (state.selectedCoordPaths.length === 0) return;
    const bezierGroup = getBezierGroup2(state);
    state.selectedCoordPaths.forEach((coordPath) => {
      const result = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath);
      const bezierCurve = result.bezierCurve;
      const node = result.node;
      bezierCurve.nodesToMerge.push(node);
    });
    bezierGroup.mergeMarkedNodes();
    const feature = bezierGroup.refreshFeature(state.feature, draw, true);
    state.featureId = feature.id;
    state.feature = feature;
    this.fireUpdate();
    state.selectedCoordPaths = [];
    const selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
    this.setSelectedCoordinates(selectedCoordinates);
    this.fireActionable(state);
    if (state.feature.isValid() === false) {
      this.deleteFeature([state.featureId]);
      this.changeMode(modes.SIMPLE_SELECT, {});
    }
    this.doRender(state.featureId);
  };
  DirectModeBezierOverride.onUncombineFeatures = function(state) {
    if (state.selectedCoordPaths.length === 0) return;
    const bezierGroup = getBezierGroup2(state);
    state.selectedCoordPaths.forEach((coordPath) => {
      const result = bezierGroup.getBezierCurveAndNodeFromCoordPath(coordPath);
      const bezierCurve = result.bezierCurve;
      const node = result.node;
      bezierCurve.nodesToSplit.push(node);
    });
    bezierGroup.splitMarkedNodes();
    const feature = bezierGroup.refreshFeature(state.feature, draw, true);
    state.featureId = feature.id;
    state.feature = feature;
    this.fireUpdate();
    state.selectedCoordPaths = [];
    const selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
    this.setSelectedCoordinates(selectedCoordinates);
    this.fireActionable(state);
    if (state.feature.isValid() === false) {
      this.deleteFeature([state.featureId]);
      this.changeMode(modes.SIMPLE_SELECT, {});
    }
    this.doRender(state.featureId);
  };
  DirectModeBezierOverride.toDisplayFeatures = function(state, geojson, display) {
    if (state.featureId === geojson.properties.id) {
      geojson.properties.active = activeStates.ACTIVE;
      const supplementaryPoints = geojson.properties.user_bezierGroup ? createSupplementaryPointsForBezier(geojson, {
        featureId: state.featureId,
        midpoints: true,
        selectedPaths: state.selectedCoordPaths
      }) : create_supplementary_points_default(geojson, {
        map: this.map,
        midpoints: true,
        selectedPaths: state.selectedCoordPaths
      });
      supplementaryPoints.forEach(display);
      display(geojson);
    } else {
      geojson.properties.active = activeStates.INACTIVE;
      display(geojson);
    }
    this.fireActionable(state);
  };
  function getBezierGroup2(state) {
    let bezierGroupFromProps = state.feature.properties.bezierGroup;
    if (bezierGroupFromProps == null) return null;
    bezierGroupFromProps = new BezierGroup(bezierGroupFromProps.bezierCurves);
    return bezierGroupFromProps;
  }
  var directModeBezierOverride_default = DirectModeBezierOverride;

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/modes/drawBezierCurve.js
  var DrawBezierCurve = {};
  var draw2 = null;
  DrawBezierCurve.onSetup = function(opts) {
    opts = opts || {};
    const featureId = opts.featureId;
    if (featureId) {
      console.log("option featureId is currently ignored on DrawBezierCurve");
    }
    let line;
    let direction = "forward";
    const bezierGroup = new BezierGroup([new BezierCurve()]);
    line = this.newFeature(bezierGroup.geojson);
    this.addFeature(line);
    draw2 = this;
    this.clearSelectedFeatures();
    double_click_zoom_default.disable(this);
    this.updateUIClasses({ mouse: cursors.ADD });
    this.activateUIButton(types.LINE);
    this.setActionableState({
      trash: true
    });
    const lastMouseOverVertexPath = -1;
    const state = {
      line,
      direction,
      lastMouseOverVertexPath
    };
    return state;
  };
  DrawBezierCurve.clickAnywhere = function(state, e) {
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    this.updateUIClasses({ mouse: cursors.ADD });
    const node1 = new BezierNode([e.lngLat.lng, e.lngLat.lat]);
    bezierCurve.nodes.push(node1);
    if (bezierCurve.nodes.length === 1) {
      const node2 = new BezierNode([e.lngLat.lng, e.lngLat.lat]);
      bezierCurve.nodes.push(node2);
    }
    bezierGroup.refreshFeature(state.line);
  };
  DrawBezierCurve.clickOnVertex = function(state, e) {
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    const isFirstVertex = e.featureTarget.properties.coord_path === 0;
    if (isFirstVertex) {
      bezierCurve.closed = true;
    }
    bezierGroup.refreshFeature(state.line);
    return this.changeMode(modes.SIMPLE_SELECT, { featureIds: [state.line.id] });
  };
  DrawBezierCurve.onMouseMove = function(state, e) {
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    this.map.dragPan.enable();
    if (bezierCurve.nodes.length > 0) {
      const lastNode = bezierCurve.nodes[bezierCurve.nodes.length - 1];
      lastNode.coords = [e.lngLat.lng, e.lngLat.lat];
      bezierGroup.refreshFeature(state.line);
    }
    if (isVertex(e)) {
      this.updateUIClasses({ mouse: cursors.POINTER });
      state.lastMouseOverVertexPath = e.featureTarget.properties.coord_path;
    } else {
      state.lastMouseOverVertexPath = -1;
    }
  };
  DrawBezierCurve.onMouseDown = function(state, e) {
    if (isAltDown(e)) {
      this.map.dragPan.disable();
    }
  };
  DrawBezierCurve.onMouseUp = function(state, e) {
    if (state.dragging) {
      DrawBezierCurve.onEndDrag(state, e);
    }
  };
  DrawBezierCurve.onStartDrag = function(state, e) {
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    if (!bezierCurve.closed && isCurveClosable(bezierCurve) && state.lastMouseOverVertexPath === 0) {
      bezierCurve.closed = true;
      bezierCurve.nodes.pop();
      bezierGroup.refreshFeature(state.line);
    }
    state.dragging = true;
    if (bezierCurve.nodes.length === 0) {
      const lnglat = [e.lngLat.lng, e.lngLat.lat];
      const node = new BezierNode(lnglat, lnglat);
      bezierCurve.nodes.push(node);
      bezierGroup.refreshFeature(state.line);
    }
  };
  DrawBezierCurve.onDrag = function(state, e) {
    if (isAltDown(e)) {
      if (!state.dragging) {
        DrawBezierCurve.onStartDrag(state, e);
        return;
      }
      const bezierGroup = getBezierGroup3(state);
      const bezierCurve = bezierGroup.bezierCurves[0];
      const lnglat = [e.lngLat.lng, e.lngLat.lat];
      if (bezierCurve.nodes.length > 0) {
        if (!bezierCurve.closed) {
          const lastNode = bezierCurve.nodes[bezierCurve.nodes.length - 1];
          lastNode.handle = lnglat;
        } else {
          const firstNode = bezierCurve.nodes[0];
          firstNode.handle = lnglat;
        }
        bezierGroup.refreshFeature(state.line);
      }
    }
  };
  DrawBezierCurve.onEndDrag = function(state, e) {
    state.dragging = false;
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    const lnglat = [e.lngLat.lng, e.lngLat.lat];
    if (!bezierCurve.closed) {
      const node = new BezierNode(lnglat);
      bezierCurve.nodes.push(node);
      bezierGroup.refreshFeature(state.line);
    } else {
      bezierCurve.nodes.push(new BezierNode(lnglat));
      bezierGroup.refreshFeature(state.line);
      return draw2.changeMode(modes.SIMPLE_SELECT, { featureIds: [state.line.id] });
    }
  };
  DrawBezierCurve.removeLastNode = function(state, e) {
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    bezierCurve.nodes.pop();
    bezierGroup.refreshFeature(state.line);
  };
  DrawBezierCurve.onTap = DrawBezierCurve.onClick = function(state, e) {
    if (e.originalEvent.button === 2 || e.originalEvent.button === 1) {
      DrawBezierCurve.removeLastNode(state, e);
      return;
    }
    if (isVertex(e)) return this.clickOnVertex(state, e);
    this.clickAnywhere(state, e);
  };
  DrawBezierCurve.onKeyUp = function(state, e) {
    if (isEnterKey(e)) {
      this.changeMode(modes.SIMPLE_SELECT, { featureIds: [state.line.id] });
    } else if (isEscapeKey(e)) {
      this.deleteFeature([state.line.id], { silent: true });
      this.changeMode(modes.SIMPLE_SELECT);
    }
  };
  DrawBezierCurve.onStop = function(state) {
    double_click_zoom_default.enable(this);
    this.activateUIButton();
    if (this.getFeature(state.line.id) === void 0) return;
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    bezierCurve.removeLastNode();
    bezierGroup.refreshFeature(state.line);
    if (state.line.isValid()) {
      this.map.fire(events.CREATE, {
        features: [state.line.toGeoJSON()]
      });
    } else {
      this.deleteFeature([state.line.id], { silent: true });
      this.changeMode(modes.SIMPLE_SELECT, {}, { silent: true });
    }
  };
  DrawBezierCurve.onTrash = function(state) {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode(modes.SIMPLE_SELECT);
  };
  DrawBezierCurve.toDisplayFeatures = function(state, geojson, display) {
    const isActiveLine = geojson.properties.id === state.line.id;
    geojson.properties.active = isActiveLine ? activeStates.ACTIVE : activeStates.INACTIVE;
    if (!isActiveLine) return display(geojson);
    const bezierGroup = getBezierGroup3(state);
    const bezierCurve = bezierGroup.bezierCurves[0];
    if (state.dragging) {
      const node = bezierCurve.closed ? bezierCurve.nodes[0] : bezierCurve.nodes[bezierCurve.nodes.length - 1];
      const path = bezierCurve.nodes.length - 1;
      display(createBezierControlPoint(state.line.id, node.coords, path, false));
      if (node.handle) {
        if (node.handle2) {
          display(createBezierHandleLine(state.line.id, [node.handle, node.coords, node.handle2]));
        } else {
          display(createBezierHandleLine(state.line.id, [node.handle, mirrorHandle(node.coords, node.handle)]));
        }
      }
      if (node.handle) {
        display(createBezierHandle(state.line.id, node.handle, path, false));
        const handle2 = mirrorHandle(node.coords, node.handle);
        display(createBezierHandle(state.line.id, handle2, path, false));
      }
    } else {
      if (bezierCurve.nodes.length < 2) return;
      const penultNode = bezierCurve.nodes[bezierCurve.nodes.length - 2];
      const path = bezierCurve.nodes.length - 1;
      geojson.properties.meta = meta.FEATURE;
      display(create_vertex_default(
        state.line.id,
        //parentId
        penultNode.coords,
        //coordinates
        `${path}`,
        //path
        false
        //selected
      ));
    }
    if (!bezierCurve.closed && isCurveClosable(bezierCurve)) {
      const firstNode = bezierCurve.nodes[0];
      const path = 0;
      display(createBezierControlPoint(state.line.id, firstNode.coords, path, false));
    }
    display(geojson);
  };
  function getBezierGroup3(state) {
    let bezierGroupFromProps = state.line.properties.bezierGroup;
    if (bezierGroupFromProps == null) return null;
    bezierGroupFromProps = new BezierGroup(bezierGroupFromProps.bezierCurves);
    return bezierGroupFromProps;
  }
  function isCurveClosable(bezierCurve) {
    if (bezierCurve.nodes.length < 3) {
      return false;
    }
    if (bezierCurve.nodes.length === 3) {
      const node1 = bezierCurve.nodes[0];
      const node2 = bezierCurve.nodes[1];
      if (!node1.handle && !node2.handle) {
        return false;
      }
    }
    return true;
  }
  var drawBezierCurve_default = DrawBezierCurve;

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/modes/simpleSelectModeBezierOverride.js
  var import_mapbox_gl_draw2 = __toESM(require_mapbox_gl_draw());
  var SimpleSelectModeBezierOverride = import_mapbox_gl_draw2.default.modes.simple_select;
  SimpleSelectModeBezierOverride.dragMove = function(state, e) {
    state.dragMoving = true;
    e.originalEvent.stopPropagation();
    const delta = {
      lng: e.lngLat.lng - state.dragMoveLocation.lng,
      lat: e.lngLat.lat - state.dragMoveLocation.lat
    };
    move_features_default(this.getSelected(), delta);
    dragBezierPoints(this, delta);
    state.dragMoveLocation = e.lngLat;
  };
  SimpleSelectModeBezierOverride.toDisplayFeatures = function(state, geojson, display) {
    geojson.properties.active = this.isSelected(geojson.properties.id) ? activeStates.ACTIVE : activeStates.INACTIVE;
    display(geojson);
    this.fireActionable();
    if (geojson.properties.active !== activeStates.ACTIVE || geojson.geometry.type === geojsonTypes.POINT) return;
    const supplementaryPoints = geojson.properties.user_bezierGroup ? createSupplementaryPointsForBezier(geojson) : create_supplementary_points_default(geojson);
    if (supplementaryPoints) {
      supplementaryPoints.forEach(display);
    }
  };
  SimpleSelectModeBezierOverride.onKeyDown = function(state, e) {
    if (isCtrlCDown(e)) {
      copyBezierGroupToClipboard(this.getSelected());
    }
  };
  SimpleSelectModeBezierOverride.onCombineFeatures = function() {
    const selectedFeatures = this.getSelected();
    if (selectedFeatures.length === 0 || selectedFeatures.length < 2) return;
    const featureType = selectedFeatures[0].type.replace("Multi", "");
    const isBezierGroup = selectedFeatures[0].properties.bezierGroup != null;
    for (let i = 0; i < selectedFeatures.length; i++) {
      const feature = selectedFeatures[i];
      if (feature.type.replace("Multi", "") !== featureType) {
        return;
      }
      if (isBezierGroup !== (feature.properties.bezierGroup != null)) {
        return;
      }
    }
    if (isBezierGroup) {
      return this.onCombineFeaturesBezier();
    } else {
      return this.onCombineFeaturesDefault();
    }
  };
  SimpleSelectModeBezierOverride.onCombineFeaturesBezier = function() {
    const bezierCurves = [];
    const featuresCombined = [];
    const selectedFeatures = this.getSelected();
    for (let i = 0; i < selectedFeatures.length; i++) {
      const feature = selectedFeatures[i];
      const bezierGroup = feature.properties.bezierGroup;
      if (bezierGroup.bezierCurves.length > 1) {
        bezierGroup.bezierCurves.forEach((bezierCurve) => {
          bezierCurves.push(bezierCurve);
        });
      } else {
        bezierCurves.push(bezierGroup.bezierCurves[0]);
      }
      featuresCombined.push(feature.toGeoJSON());
    }
    if (bezierCurves.length > 1) {
      const bezierGroup = new BezierGroup(bezierCurves);
      const multiFeature = this.newFeature(bezierGroup.geojson);
      multiFeature.incomingCoords(bezierGroup.vertices);
      multiFeature.properties.bezierGroup = bezierGroup;
      this.addFeature(multiFeature);
      this.deleteFeature(this.getSelectedIds(), { silent: true });
      this.setSelected([multiFeature.id]);
      this.map.fire(events.COMBINE_FEATURES, {
        createdFeatures: [multiFeature.toGeoJSON()],
        deletedFeatures: featuresCombined
      });
    }
    this.fireActionable();
  };
  SimpleSelectModeBezierOverride.onCombineFeaturesDefault = function() {
    const selectedFeatures = this.getSelected();
    const coordinates = [], featuresCombined = [];
    const featureType = selectedFeatures[0].type.replace("Multi", "");
    for (let i = 0; i < selectedFeatures.length; i++) {
      const feature = selectedFeatures[i];
      if (feature.type.includes("Multi")) {
        feature.getCoordinates().forEach((subcoords) => {
          coordinates.push(subcoords);
        });
      } else {
        coordinates.push(feature.getCoordinates());
      }
      featuresCombined.push(feature.toGeoJSON());
    }
    if (featuresCombined.length > 1) {
      const multiFeature = this.newFeature({
        type: geojsonTypes.FEATURE,
        properties: featuresCombined[0].properties,
        geometry: {
          type: `Multi${featureType}`,
          coordinates
        }
      });
      this.addFeature(multiFeature);
      this.deleteFeature(this.getSelectedIds(), { silent: true });
      this.setSelected([multiFeature.id]);
      this.map.fire(events.COMBINE_FEATURES, {
        createdFeatures: [multiFeature.toGeoJSON()],
        deletedFeatures: featuresCombined
      });
    }
    this.fireActionable();
  };
  SimpleSelectModeBezierOverride.onUncombineFeatures = function() {
    const selectedFeatures = this.getSelected();
    if (selectedFeatures.length === 0) return;
    const createdFeatures = [];
    const featuresUncombined = [];
    for (let i = 0; i < selectedFeatures.length; i++) {
      const feature = selectedFeatures[i];
      const bezierGroup = feature.properties.bezierGroup;
      if (this.isInstanceOf("MultiFeature", feature)) {
        if (bezierGroup) {
          bezierGroup.bezierCurves.forEach((bezierCurve) => {
            const newBezierGroup = new BezierGroup([bezierCurve]);
            const subFeature = this.newFeature(newBezierGroup.geojson);
            this.addFeature(subFeature);
            createdFeatures.push(subFeature.toGeoJSON());
            this.select([subFeature.id]);
          });
          this.deleteFeature(feature.id, { silent: true });
        } else {
          feature.getFeatures().forEach((subFeature) => {
            this.addFeature(subFeature);
            subFeature.properties = feature.properties;
            createdFeatures.push(subFeature.toGeoJSON());
            this.select([subFeature.id]);
          });
          this.deleteFeature(feature.id, { silent: true });
        }
        featuresUncombined.push(feature.toGeoJSON());
      }
    }
    if (createdFeatures.length > 1) {
      this.map.fire(events.UNCOMBINE_FEATURES, {
        createdFeatures,
        deletedFeatures: featuresUncombined
      });
    }
    this.fireActionable();
  };
  var simpleSelectModeBezierOverride_default = SimpleSelectModeBezierOverride;

  // node_modules/mapbox-gl-draw-bezier-curve-mode/src/lib/styles/customStyles.js
  var customStyles = [
    // Bezier Handles Lines
    {
      "id": "gl-draw-bezier-handle-line-active",
      "type": "line",
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "meta2", "handle-line"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fbb03b",
        "line-width": 1
      }
    },
    {
      "id": "gl-draw-polygon-fill-inactive",
      "type": "fill",
      "filter": [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "Polygon"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "fill-color": "#3bb2d0",
        "fill-outline-color": "#3bb2d0",
        "fill-opacity": 0.1
      }
    },
    {
      "id": "gl-draw-polygon-fill-active",
      "type": "fill",
      "filter": [
        "all",
        ["==", "active", "true"],
        ["==", "$type", "Polygon"]
      ],
      "paint": {
        "fill-color": "#fbb03b",
        "fill-outline-color": "#fbb03b",
        "fill-opacity": 0.1
      }
    },
    {
      "id": "gl-draw-polygon-stroke-inactive",
      "type": "line",
      "filter": [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "Polygon"],
        ["!=", "mode", "static"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#3bb2d0",
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-polygon-stroke-active",
      "type": "line",
      "filter": [
        "all",
        ["==", "active", "true"],
        ["==", "$type", "Polygon"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fbb03b",
        "line-dasharray": [0.2, 2],
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-line-inactive",
      "type": "line",
      "filter": [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "LineString"],
        ["!=", "mode", "static"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#3bb2d0",
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-line-active",
      "type": "line",
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "active", "true"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fbb03b",
        "line-dasharray": [0.2, 2],
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-polygon-and-line-vertex-stroke-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "meta", "vertex"],
        ["!=", "meta2", "handle"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 5,
        "circle-color": "#fff"
      }
    },
    // Nodes
    {
      "id": "gl-draw-polygon-and-line-vertex-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "meta", "vertex"],
        ["!=", "meta2", "handle"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
      }
    },
    {
      "id": "gl-draw-point-point-stroke-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "Point"],
        ["==", "meta", "feature"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 5,
        "circle-opacity": 1,
        "circle-color": "#fff"
      }
    },
    {
      "id": "gl-draw-point-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "active", "false"],
        ["==", "$type", "Point"],
        ["==", "meta", "feature"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 3,
        "circle-color": "#3bb2d0"
      }
    },
    // Selected Point in Direct mode
    {
      "id": "gl-draw-point-stroke-active",
      "type": "circle",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["==", "active", "true"],
        ["!=", "meta", "midpoint"]
      ],
      "paint": {
        "circle-radius": 7,
        "circle-color": "#fff"
      }
    },
    {
      "id": "gl-draw-point-active",
      "type": "circle",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["!=", "meta", "midpoint"],
        ["==", "active", "true"]
      ],
      "paint": {
        "circle-radius": 5,
        "circle-color": "#fbb03b"
      }
    },
    {
      "id": "gl-draw-polygon-fill-static",
      "type": "fill",
      "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
      "paint": {
        "fill-color": "#404040",
        "fill-outline-color": "#404040",
        "fill-opacity": 0.1
      }
    },
    {
      "id": "gl-draw-polygon-stroke-static",
      "type": "line",
      "filter": [
        "all",
        ["==", "mode", "static"],
        ["==", "$type", "Polygon"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#404040",
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-line-static",
      "type": "line",
      "filter": [
        "all",
        ["==", "mode", "static"],
        ["==", "$type", "LineString"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#404040",
        "line-width": 2
      }
    },
    {
      "id": "gl-draw-point-static",
      "type": "circle",
      "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
      "paint": {
        "circle-radius": 5,
        "circle-color": "#404040"
      }
    },
    // MID POINTS
    {
      "id": "gl-draw-polygon-midpoint",
      "type": "circle",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["==", "meta", "midpoint"]
      ],
      "paint": {
        "circle-radius": 3,
        "circle-color": "#fbb03b"
      }
    },
    // Bezier Handles
    {
      "id": "gl-draw-bezier-handle-stroke-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "meta", "vertex"],
        ["==", "meta2", "handle"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 5,
        "circle-color": "#fff"
      }
    },
    {
      "id": "gl-draw-bezier-handle-inactive",
      "type": "circle",
      "filter": [
        "all",
        ["==", "meta", "vertex"],
        ["==", "meta2", "handle"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"]
      ],
      "paint": {
        "circle-radius": 4,
        "circle-color": "#fbb03b"
        //fbb03b
      }
    }
  ];
  var customStyles_default = customStyles;

  // main.js
  window.bezier = { SimpleSelectModeBezierOverride: simpleSelectModeBezierOverride_default, DirectModeBezierOverride: directModeBezierOverride_default, DrawBezierCurve: drawBezierCurve_default, customStyles: customStyles_default };
})();
/*! Bundled license information:

complex.js/complex.js:
  (**
   * @license Complex.js v2.1.1 12/05/2020
   *
   * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)

fraction.js/fraction.js:
  (**
   * @license Fraction.js v4.3.7 31/08/2023
   * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
   *
   * Copyright (c) 2023, Robert Eisele (robert@raw.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)
*/
