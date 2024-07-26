/*!
 * PSPDFKit for Web 2024.4.0 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2024 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
'use strict';
(self.webpackChunkPSPDFKit = self.webpackChunkPSPDFKit || []).push([
  [3610],
  {
    74846: (e, t, n) => {
      n.r(t),
        n.d(t, {
          corePool: () => de,
          customFontsPromiseRef: () => we,
          default: () => ke,
          loadModule: () => Pe,
          normalizeCoreOptions: () => me,
          validateStandaloneConfiguration: () => he
        });
      var a = n(96156),
        i = n(35369),
        s = n(15359),
        o = n(75472),
        r = n(72110),
        l = n(68944),
        c = n(17375),
        d = n(51679),
        u = n(34997),
        m = n(19575),
        h = n(87463),
        p = n(69847),
        f = n(21853),
        g = n(7407),
        y = n(33427),
        b = n(87460),
        v = n(65160),
        _ = n(10983),
        F = n(84254),
        k = n(11765),
        w = n(67366),
        P = n(88133),
        S = n(56573),
        A = n(22284),
        C = n(24382);
      const D = ['rollover', 'down'];
      function O(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function I(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? O(Object(n), !0).forEach(function (t) {
                (0, a.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : O(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      class x extends (0, i.WV)({
        alreadyLoadedPages: (0, i.D5)(),
        isLoaded: !1,
        isDestroyed: !1
      }) {}
      const E = {
        skippedPdfObjectIds: [],
        skippedPdfBookmarkIds: [],
        annotations: [],
        bookmarks: [],
        formFieldValues: [],
        formFields: [],
        attachments: {}
      };
      class L {
        constructor(e, t) {
          (0, a.Z)(this, '_state', new x()),
            (0, a.Z)(this, '_formFieldsLoadedPromise', null),
            (0, a.Z)(this, '_objectCreationPromises', (0, i.D5)()),
            (0, a.Z)(this, '_loadBookmarksPromise', null),
            (0, a.Z)(this, '_commentsLoadedPromise', null),
            (0, a.Z)(this, 'canCreateBackendOrphanWidgets', !1),
            (0, a.Z)(this, 'updateTabOrderTimeout', null),
            (0, a.Z)(this, 'pagesTabOrderToUpdate', (0, i.l4)()),
            (this._core = e),
            (this._json = t ? (0, s.H7)(t) : null),
            (this._setReadStateCallbacksPromise = new Promise((e) => {
              this._setReadStateCallbacksPromiseResolve = e;
            }));
        }
        async load() {
          if (
            ((this._state = this._state.set('isLoaded', !0)),
            !this._formFieldCallbacks && (await this._loadFormFieldValues()),
            !this._json)
          )
            return this;
          await this._core.importInstantJSON(I(I({}, E), this._json)), (0, s.kG)(this._json);
          const { annotations: e, attachments: t } = this._json;
          if (this._isDestroyed() || !t || 0 === Object.entries(t).length) return this;
          if (e)
            for (let n = 0; n < e.length; n++) {
              let a = null;
              const i = e[n];
              if ('imageAttachmentId' in i && i.imageAttachmentId) {
                const e = t ? t[i.imageAttachmentId] : null;
                if (e)
                  try {
                    (a = (0, S.Jc)(atob(e.binary), e.contentType)),
                      (0, s.kG)(this._annotationCallbacks),
                      this._annotationCallbacks.createAttachment(i.imageAttachmentId, a);
                  } catch (e) {
                    (0, s.um)(
                      `Skipped attachment with id ${i.imageAttachmentId} from payload because an error occurred while converting the binary image to blob.`
                    ),
                      (0, s.um)(e);
                  }
              }
            }
          return this;
        }
        destroy() {
          (this._state = this._state.set('isDestroyed', !0)),
            (this._annotationCallbacks = null),
            (this._readStateCallbacks = null),
            (this._bookmarkCallbacks = null),
            (this._formFieldCallbacks = null),
            (this._formFieldValueCallbacks = null),
            (this._commentCallbacks = null);
        }
        setReadStateCallbacks(e) {
          var t;
          (this._readStateCallbacks = e),
            null === (t = this._setReadStateCallbacksPromiseResolve) ||
              void 0 === t ||
              t.call(this);
        }
        setAnnotationCallbacks(e) {
          this._annotationCallbacks = e;
        }
        setBookmarkCallbacks(e) {
          this._bookmarkCallbacks = e;
        }
        setFormFieldCallbacks(e) {
          this._formFieldCallbacks = e;
        }
        setFormFieldValueCallbacks(e) {
          this._formFieldValueCallbacks = e;
        }
        setCommentCallbacks(e) {
          this._commentCallbacks = e;
        }
        createComment(e, t, n) {
          return this._core.applyComments(t.map((e) => T(e, n)).toArray());
        }
        updateComment(e, t, n) {
          return this._core.applyComments(t.map((e) => T(e, n)).toArray());
        }
        deleteComment(e, t, n) {
          return this._core.applyComments(t.map((e) => T(e, n)).toArray());
        }
        async loadComments() {
          return (
            this._commentsLoadedPromise || (this._commentsLoadedPromise = this._loadComments()),
            this._commentsLoadedPromise
          );
        }
        async _loadComments() {
          var e, t;
          this._verifyLoaded();
          const n = null !== (e = await this._core.getComments()) && void 0 !== e ? e : [],
            a = (0, i.aV)(
              n.map((e) => {
                let t;
                var n;
                e.pdfObjectId
                  ? (t =
                      e.id ||
                      (null === (n = e.pdfObjectId) || void 0 === n ? void 0 : n.toString()))
                  : (t = (0, y.xc)());
                return (0, k.Mu)(t, e);
              })
            );
          await Promise.all(
            a
              .map(
                (e) =>
                  'number' == typeof e.pageIndex && this.loadAnnotationsForPageIndex(e.pageIndex)
              )
              .filter(Boolean)
              .toArray()
          ),
            null === (t = this._commentCallbacks) || void 0 === t || t.createComments(a, C.y),
            (this._commentsLoadedPromise = Promise.resolve());
        }
        async updateTabOrder(e) {
          (this.pagesTabOrderToUpdate = this.pagesTabOrderToUpdate.add(e)),
            this.updateTabOrderTimeout && clearTimeout(this.updateTabOrderTimeout),
            (this.updateTabOrderTimeout = setTimeout(async () => {
              const e = this.pagesTabOrderToUpdate.toArray();
              if (((this.pagesTabOrderToUpdate = (0, i.l4)()), this._isDestroyed())) return;
              const t = await Promise.all(e.map((e) => this._core.getTabOrder(e)));
              this._isDestroyed() ||
                ((0, s.kG)(this._annotationCallbacks),
                (0, w.dC)(() => {
                  e.forEach((e, n) => {
                    var a;
                    null === (a = this._annotationCallbacks) ||
                      void 0 === a ||
                      a.setPageTabOrder(e, t[n]);
                  });
                }));
            }, 1e3));
        }
        async setTabOrder(e, t) {
          return this._core.setTabOrder(e, t);
        }
        async createAnnotation(e, t) {
          this._verifyLoaded();
          const n = t.find(
              (t, n) => (
                (0, s.kG)('imageAttachmentId' in e, 'Annotation must have imageAttachmentId.'),
                n === e.imageAttachmentId
              )
            ),
            a = await this._core.createAnnotation((0, k.Hs)(e), n ? n.data : null);
          'number' != typeof a ||
            'number' != typeof e.pdfObjectId ||
            e.pdfObjectId === a ||
            this._isDestroyed() ||
            ((0, s.kG)(this._annotationCallbacks),
            this._annotationCallbacks.updateAnnotations((0, i.aV)([e.set('pdfObjectId', a)]))),
            await this.updateTabOrder(e.pageIndex);
        }
        async updateAnnotation(e) {
          this._verifyLoaded(),
            await this._core.updateAnnotation((0, k.Hs)(e)),
            await this.updateTabOrder(e.pageIndex);
        }
        deleteAnnotation(e) {
          return this._verifyLoaded(), this._core.deleteAnnotation((0, k.Hs)(e));
        }
        createBookmark(e) {
          return this._verifyLoaded(), this._core.createBookmark((0, P.a)(e));
        }
        updateBookmark(e) {
          return this._verifyLoaded(), this._core.updateBookmark((0, P.a)(e));
        }
        deleteBookmark(e) {
          return this._verifyLoaded(), this._core.deleteBookmark(e);
        }
        createFormField(e) {
          this._verifyLoaded(), (0, s.kG)(this._readStateCallbacks);
          const t = this._readStateCallbacks.getFormFieldWidgets(e);
          return this._core
            .createFormField((0, k.vD)(e), t.map((e) => (0, k.Hs)(e)).toArray())
            .then(async (e) => {
              (0, w.dC)(() => {
                e.forEach((e, n) => {
                  const a = t.get(n);
                  (0, s.kG)(a),
                    (0, s.kG)(this._annotationCallbacks),
                    'number' != typeof e ||
                      'number' != typeof a.pdfObjectId ||
                      a.pdfObjectId === e ||
                      this._isDestroyed() ||
                      this._annotationCallbacks.updateAnnotations(
                        (0, i.aV)([a.set('pdfObjectId', e)])
                      );
                });
              });
            });
        }
        updateFormField(e) {
          this._verifyLoaded(), (0, s.kG)(this._readStateCallbacks);
          const t = this._readStateCallbacks.getFormFieldWidgets(e);
          return this._core.updateFormField((0, k.vD)(e), t.map((e) => (0, k.Hs)(e)).toArray());
        }
        deleteFormField(e) {
          return this._verifyLoaded(), this._core.deleteFormField((0, k.vD)(e));
        }
        loadFormFields() {
          return (
            this._formFieldsLoadedPromise ||
              (this._formFieldsLoadedPromise = this._loadFormFields()),
            this._formFieldsLoadedPromise
          );
        }
        async _loadFormFields() {
          this._verifyLoaded();
          const e = await this._core.readFormJSONObjects();
          if (this._isDestroyed()) return;
          let t = (0, i.aV)(),
            n = (0, i.aV)().withMutations((n) => {
              e.forEach((e) => {
                const { formField: a, widgets: i, value: o } = e;
                try {
                  let e;
                  e = a.pdfObjectId ? a.pdfObjectId.toString() : (0, y.xc)();
                  const r = (0, k.IN)(e, a);
                  (0, s.kG)(this._readStateCallbacks),
                    this._readStateCallbacks.isFormFieldInState(r.name) ||
                      n.push(r.set('value', o)),
                    i.forEach((e) => {
                      let n;
                      (n = e.pdfObjectId ? e.id || e.pdfObjectId.toString() : (0, y.xc)()),
                        (0, s.kG)(this._readStateCallbacks),
                        (t = t.push((0, k.vH)(n, e)));
                    });
                } catch (e) {
                  (0, s.um)(
                    `Skipped creating form field #${a.pdfObjectId} from payload because an error occurred while deserializing.`
                  ),
                    (0, s.um)(e);
                }
              });
            });
          const a = {},
            o = {};
          t.forEach((e) => {
            o[e.id] || (o[e.id] = []), o[e.id].push(e.pdfObjectId);
          }),
            (t = t.map((e) => {
              var t, i;
              if (
                (o[e.id].filter((t) => t !== e.pdfObjectId).length > 0 &&
                  (null === (t = e.pdfObjectId) || void 0 === t ? void 0 : t.toString()) !==
                    e.id) ||
                (null !== (i = this._readStateCallbacks) &&
                  void 0 !== i &&
                  i.isAnnotationInState(e.id))
              ) {
                const t = (0, y.xc)();
                return (
                  a[e.formFieldName]
                    ? a[e.formFieldName].push({ [e.id]: t })
                    : (a[e.formFieldName] = [{ [e.id]: t }]),
                  (n = n.map((n) =>
                    n.name === e.formFieldName
                      ? n.update('annotationIds', (n) =>
                          null == n ? void 0 : n.map((n) => (n === e.id ? t : n))
                        )
                      : n
                  )),
                  e.set('id', t)
                );
              }
              return e;
            })),
            Object.keys(a).forEach((e) => {
              const a = n.find((t) => t.name === e);
              (0, s.kG)(a);
              const i = t
                .filter((t) => t.formFieldName === e)
                .toArray()
                .map((e) => (0, k.Hs)(e));
              this._core.updateFormField((0, k.vD)(a), i);
            }),
            n.size > 0 &&
              !this._isDestroyed() &&
              ((0, s.kG)(this._formFieldCallbacks),
              this._formFieldCallbacks.createFormFields(n, C.y)),
            await this._loadFormFieldValues(),
            t.size > 0 &&
              !this._isDestroyed() &&
              ((0, s.kG)(this._annotationCallbacks),
              this._annotationCallbacks.createAnnotations(t, (0, i.D5)(), C.y)),
            (this._formFieldsLoadedPromise = Promise.resolve());
        }
        createFormFieldValue(e) {
          return this._verifyLoaded(), this.setFormFieldValue(e);
        }
        setFormFieldValue(e) {
          return this._verifyLoaded(), this._core.setFormFieldValue((0, k.kr)(e));
        }
        deleteFormFieldValue(e) {
          return (
            this._verifyLoaded(),
            this._core.deleteFormFieldValue(e.replace('form-field-value/', ''))
          );
        }
        loadAnnotationsForPageIndex(e) {
          const t = this._state.alreadyLoadedPages.get(e);
          if (t) return t;
          const n = this._loadAnnotationsForPageIndex(e);
          return (this._state = this._state.setIn(['alreadyLoadedPages', e], n)), n;
        }
        async _loadAnnotationsForPageIndex(e) {
          this._verifyLoaded();
          const [t, n] = await Promise.all([
            this._core.annotationsForPageIndex(e),
            this._core.getTabOrder(e)
          ]);
          if (this._isDestroyed()) return;
          const a = [],
            o = [],
            r = t
              .map((e) => {
                let { rollover: t, down: n } = e,
                  i = (0, c.Z)(e, D);
                return (
                  t && 'number' == typeof i.pdfObjectId && a.push(i.pdfObjectId),
                  n && 'number' == typeof i.pdfObjectId && o.push(i.pdfObjectId),
                  i
                );
              })
              .filter((e) => 'number' == typeof e.pageIndex);
          this._formFieldCallbacks && (await this.loadFormFields());
          const l = (0, i.aV)().withMutations((e) => {
            r.filter(
              (e) =>
                !e.id ||
                (this._readStateCallbacks && !this._readStateCallbacks.isAnnotationInState(e.id))
            ).forEach((t) => {
              t.pdfObjectId;
              try {
                var n;
                let a;
                (a = (function (e) {
                  return 'pspdfkit/link' === e.type && 0 === e.pdfObjectId;
                })(t)
                  ? t.id || (0, y.xc)()
                  : t.id || t.pdfObjectId.toString()),
                  (e.some((e) => e.id === a) ||
                    (null !== (n = this._readStateCallbacks) &&
                      void 0 !== n &&
                      n.isAnnotationInState(a))) &&
                    ((a = (0, y.xc)()), (t.id = a), this._core.updateAnnotation(t));
                const i = (0, k.vH)(a, t);
                e.push(i);
              } catch (e) {
                (0, s.um)(
                  `Skipped creating annotation #${t.pdfObjectId} from payload because an error occurred while deserializing.`
                ),
                  (0, s.um)(e);
              }
            });
          });
          (0, w.dC)(() => {
            (0, s.kG)(this._annotationCallbacks),
              l.size > 0 && this._annotationCallbacks.createAnnotations(l, (0, i.D5)(), C.y),
              this._annotationCallbacks.setPageTabOrder(e, n),
              a.length > 0 && this._annotationCallbacks.addAnnotationVariants('rollover', a),
              o.length > 0 && this._annotationCallbacks.addAnnotationVariants('down', o);
          }),
            (this._state = this._state.setIn(['alreadyLoadedPages', e], Promise.resolve()));
        }
        async _loadFormFieldValues() {
          this._verifyLoaded();
          const e = await this._core.getFormValues();
          if (this._isDestroyed()) return;
          const t = (0, i.aV)().withMutations((t) => {
            e.forEach((e) => {
              try {
                t.push((0, k.u9)(e));
              } catch (t) {
                (0, s.um)(
                  `Skipped creating form field value #${e.pdfObjectId} from payload because an error occurred while deserializing.`
                ),
                  (0, s.um)(t);
              }
            });
          });
          t.size > 0 &&
            !this._isDestroyed() &&
            ((0, s.kG)(this._formFieldValueCallbacks),
            this._formFieldValueCallbacks.setFormFieldValues(t));
        }
        async loadBookmarks() {
          this._verifyLoaded();
          const e = await this._core.getBookmarks();
          if (this._isDestroyed()) return;
          const t = (0, i.aV)().withMutations((t) => {
            e.forEach((e) => {
              let n;
              n = e.id ? e.id : e.pdfBookmarkId ? e.pdfBookmarkId : (0, A.A)();
              try {
                t.push((0, P.i)(n, e));
              } catch (e) {
                (0, s.um)(
                  `Skipped creating bookmark #${n} from payload because an error occurred while deserializing.`
                ),
                  (0, s.um)(e);
              }
            });
          });
          t.size > 0 &&
            !this._isDestroyed() &&
            ((0, s.kG)(this._bookmarkCallbacks), this._bookmarkCallbacks.createBookmarks(t, C.y));
        }
        _verifyLoaded() {
          (0, s.kG)(this._state.isLoaded, 'StandaloneProvider not properly initialized.');
        }
        _isDestroyed() {
          return this._state.isDestroyed;
        }
        async syncChanges() {}
      }
      function T(e, t) {
        var n;
        (0, s.kG)(e.rootId, 'A new comment must have `rootId` present');
        const a = t.get(e.rootId);
        return (
          (0, s.kG)(a, 'An annotation must be present linked to the comment to create'),
          (0, k.jA)(
            e,
            (null === (n = a.pdfObjectId) || void 0 === n ? void 0 : n.toString()) === a.id
              ? parseInt(e.rootId)
              : e.rootId
          )
        );
      }
      class j {
        constructor(e, t) {
          (this.identifier = e), (this.callback = t);
        }
        request() {
          return this.callback();
        }
      }
      var R = n(78025),
        B = n(20063);
      class G extends i.WV({
        baseUrl: null,
        baseCoreUrl: null,
        baseProcessorEngineUrl: null,
        licenseKey: null,
        document: null,
        backendPermissions: new R.Z(),
        documentResponse: null,
        disableWebAssemblyStreaming: !1,
        enableAutomaticLinkExtraction: !1,
        overrideMemoryLimit: null,
        features: (0, i.aV)(),
        signatureFeatureAvailability: B.H.NONE,
        documentHandle: null,
        trustedCAsCallback: null,
        signaturesInfoPromise: null,
        customFonts: null,
        fontSubstitutions: null,
        forceLegacySignaturesFeature: !1,
        forceAnnotationsRender: !1,
        appName: null,
        lazyLoadedPages: null,
        productId: null,
        processorEngine: null,
        dynamicFonts: null,
        inlineWorkers: !0
      }) {}
      var N = n(67009),
        U = n(43069),
        V = n(36691),
        M = n(88265),
        K = n(94732),
        W = n(94809),
        J = n(98492),
        H = n(96650),
        z = n(87856),
        $ = n(2282),
        Z = n(67055),
        q = n(45249),
        X = n(44550),
        Y = n(33383),
        Q = n(74311),
        ee = n(74110),
        te = n(15650),
        ne = n(8144),
        ae = n(44077),
        ie = n(86528),
        se = n(46364);
      const oe = ['id'];
      function re(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function le(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? re(Object(n), !0).forEach(function (t) {
                (0, a.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : re(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      let ce;
      ce = n(75472).AO;
      const de = new o.L7(ce);
      class ue extends b.W {
        constructor(e) {
          super(), (0, a.Z)(this, 'type', 'STANDALONE'), (0, a.Z)(this, '_XFDF', null), he(e);
          const {
            baseUrl: t,
            baseCoreUrl: n,
            baseProcessorEngineUrl: i,
            instantJSON: s,
            XFDF: o,
            enableAutomaticLinkExtraction: r,
            overrideMemoryLimit: l,
            trustedCAsCallback: c,
            electronAppName: u,
            appName: m,
            isSharePoint: p,
            isSalesforce: f,
            productId: g,
            processorEngine: y,
            dynamicFonts: b,
            inlineWorkers: v
          } = e;
          'string' == typeof o &&
            (this._XFDF = {
              source: o,
              keepCurrentAnnotations: !0 === e.XFDFKeepCurrentAnnotations,
              ignorePageRotation: !0 === e.XFDFIgnorePageRotation
            }),
            s &&
              s.annotations &&
              (s.annotations = s.annotations.map((e) => {
                var t;
                return (e.id = null === (t = e.id) || void 0 === t ? void 0 : t.toString()), e;
              })),
            (this._instantJSON = s),
            'function' == typeof c && (this._trustedCAsCallback = c);
          const { disableWebAssemblyStreaming: F, customFonts: k, fontSubstitutions: w } = e,
            { standaloneInstancesPoolSize: P } = e;
          void 0 !== P && (de.size = P);
          const S =
            !!e.electronicSignatures &&
            Boolean(e.electronicSignatures.forceLegacySignaturesFeature);
          let A = g || null;
          (!p && !f) || A || (A = p ? Y.x.SharePoint : Y.x.Salesforce),
            (this._state = new G(
              me({
                baseUrl: t,
                baseCoreUrl: n,
                baseProcessorEngineUrl: i,
                licenseKey: e.licenseKey,
                document: e.document,
                disableWebAssemblyStreaming: F,
                enableAutomaticLinkExtraction: r,
                overrideMemoryLimit: l,
                documentHandle: '0',
                customFonts: k,
                fontSubstitutions: w,
                forceLegacySignaturesFeature: S,
                appName: m || u,
                productId: A,
                processorEngine: y || te.l.fasterProcessing,
                dynamicFonts: b,
                inlineWorkers: v
              })
            )),
            (this._requestQueue = new d.g(_.gZ));
          const { object: C, checkIn: D } = de.checkOut();
          (this.client = C),
            (this.checkIn = D),
            (this.corePDFBridge = new ie.V(h.f.createWASMContext(this.client)));
          const O = s
            ? le(
                {
                  annotations: s.annotations || [],
                  formFields: s.formFields || [],
                  formFieldValues: s.formFieldValues || [],
                  skippedPdfObjectIds: s.skippedPdfObjectIds || [],
                  skippedPdfFormFieldIds: s.skippedPdfFormFieldIds || [],
                  attachments: s.attachments || {},
                  bookmarks: s.bookmarks || [],
                  skippedPdfBookmarkIds: s.skippedPdfBookmarkIds || [],
                  comments: s.comments || void 0,
                  skippedComments: s.skippedComments || void 0,
                  format: s.format
                },
                s.pdfId ? { pdfId: s.pdfId } : null
              )
            : null;
          this.provider = new L(this.client, O);
        }
        isUsingInstantProvider() {
          return !1;
        }
        hasClientsPresence() {
          return !1;
        }
        async load() {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            (this._isPDFJavaScriptEnabled = e.isPDFJavaScriptEnabled),
            {
              features: this._state.features,
              signatureFeatureAvailability: this._state.signatureFeatureAvailability,
              hasPassword: !!e.password,
              allowedTileScales: 'all'
            }
          );
        }
        destroy() {
          this.provider && this.provider.destroy(),
            this._requestQueue && this._requestQueue.destroy(),
            this.checkIn();
        }
        async documentInfo() {
          return this._state.documentResponse;
        }
        async lazyLoadPages() {
          if (!this._state.lazyLoadedPages) {
            const e = await this.client.getAllPageInfos(this._state.documentResponse.pageCount);
            this._state = this._state.set('lazyLoadedPages', e);
          }
          return this._state.lazyLoadedPages;
        }
        getDocumentHandle() {
          return this._state.documentHandle;
        }
        getFormJSON() {
          return this.client.getFormJSON();
        }
        permissions() {
          return Promise.resolve(this._state.backendPermissions);
        }
        textForPageIndex(e) {
          let t = !1;
          const n = new j(`${e}-text`, () =>
              t
                ? Promise.reject({ aborted: !0 })
                : this.client
                    .textForPageIndex(e)
                    .then((n) =>
                      t ? Promise.reject({ aborted: !0 }) : (0, v.TH)({ textLines: n }, e)
                    )
            ),
            { promise: a, cancel: i } = this._requestQueue.enqueue(n);
          return {
            promise: a,
            cancel: () => {
              (t = !0), i();
            }
          };
        }
        getContentTreeForPageIndex(e) {
          let t = !1;
          const n = new j(`${e}-text`, () =>
              t
                ? Promise.reject({ aborted: !0 })
                : this.client.contentTreeForPageIndex(e).then((t) => {
                    let n = [],
                      a = 0,
                      s = 0;
                    return (
                      (n = t.reduce((t, n) => {
                        let { nodes: i } = n;
                        const o = (0, v.uv)(i, e, t.length, a, s);
                        return (
                          (a += o.reduce((e, t) => {
                            let { textLines: n } = t;
                            return e + n.size;
                          }, 0)),
                          (s += o.reduce((e, t) => {
                            let { contentElements: n } = t;
                            return e + n.size;
                          }, 0)),
                          t.concat(o)
                        );
                      }, [])),
                      (0, i.aV)(n)
                    );
                  })
            ),
            { promise: a, cancel: s } = this._requestQueue.enqueue(n);
          return {
            promise: a,
            cancel: () => {
              (t = !0), s();
            }
          };
        }
        getTextFromRects(e, t) {
          return this.client.getTextFromRects(e, t.toJS());
        }
        getAvailableFontFaces(e) {
          return this.client.getAvailableFontFaces(e);
        }
        async getSuggestedLineHeightFactor(e) {
          return 'number' != typeof e.pdfObjectId
            ? 1
            : 'number' != typeof e.pageIndex
              ? ((0, s.ZK)('Annotation must have a pageIndex.'), 1)
              : (e.lineHeightFactor &&
                  (0, s.ZK)(`Annotation ${e.id} already has a line height factor.`),
                this.client.getSuggestedLineHeightFactor(e.pdfObjectId, e.pageIndex));
        }
        async getClosestSnapPoint(e) {
          const t = await this.client.getClosestSnapPoint(e.x, e.y);
          return t && 'number' == typeof t[0] && 'number' == typeof t[1]
            ? new ae.E9({ x: t[0], y: t[1] })
            : e;
        }
        configureSnapper(e) {
          return this.client.configureSnapper(e);
        }
        renderAnnotation(e, t, n, a, i, s) {
          if (0 === Math.floor(a) || 0 === Math.floor(i))
            return { promise: Promise.resolve(void 0), cancel: () => {} };
          const o = (0, se.d6)();
          if (e instanceof q.GI) {
            if (
              this.isVisuallyIdenticalStampAnnotationCached({ annotation: e, width: a, height: i })
            )
              return this.cachedStampAnnotationDiscardablePromise(o);
            (0, y.eD)(e) ||
              (this._cachedRenderedAnnotation = {
                index: (0, y.et)(e),
                width: a,
                height: i,
                APStreamPromise: o.promise
              });
          }
          const r = e.id,
            l = new j(r, () =>
              this.client
                .renderAnnotation((0, k.Hs)(e), n, a, i, (0, z.zP)(), s)
                .then((e) =>
                  e
                    ? 'string' == typeof e
                      ? (0, f.ar)(e)
                      : (0, f.R9)({ buffer: e, width: a, height: i })
                    : Promise.resolve(null)
                )
                .then((e) => (o.resolve(e), e))
            );
          return this._requestQueue.enqueue(l, !1);
        }
        async getMeasurementSnappingPoints(e) {
          return this.client.getMeasurementSnappingPoints(e);
        }
        async getSecondaryMeasurementUnit() {
          return await this.client.getSecondaryMeasurementUnit();
        }
        async setSecondaryMeasurementUnit(e) {
          return await this.client.setSecondaryMeasurementUnit(e);
        }
        async compareDocuments(e, t) {
          const n = {
            originalDocument: e.originalDocument,
            changedDocument: e.changedDocument,
            comparisonOperation: (0, p.j)(t)
          };
          return await this.client.compareDocuments(n);
        }
        async renderPageAnnotations(e, t, n) {
          const a = this.provider,
            i = [],
            s = [],
            o = t.some((e) => e instanceof q.x_);
          o && (await a._setReadStateCallbacksPromise);
          const r = t.filter((e) => {
            const t = o ? a._readStateCallbacks.getAnnotationWithFormField(e.id) : null,
              n = null == t ? void 0 : t.formField,
              r = (0, y._R)(e, n);
            if (r && n) {
              i.find((e) => e.name === n.name) || (i.push((0, k.kr)((0, U.CH)(n))), s.push(n));
            }
            return r;
          });
          function l(e, t) {
            if (null != e && e.formFieldName) {
              const n = s.find((t) => t.name === e.formFieldName),
                a = t.find((t) => t.name === e.formFieldName);
              if (!(0, U.BT)(n, a)) return !1;
            }
            return !0;
          }
          const c = new Promise((t, i) => {
            const o = r.filter(
              (e) =>
                0 !== Math.floor(e.boundingBox.width * n) &&
                0 !== Math.floor(e.boundingBox.height * n)
            );
            this.client
              .renderPageAnnotations(
                e,
                o.map((e) => e.pdfObjectId).toArray(),
                o.map((e) => e.boundingBox.width * n).toArray(),
                o.map((e) => e.boundingBox.height * n).toArray(),
                (0, z.zP)()
              )
              .then((e) => {
                const i = s
                    .map((e) => {
                      var t;
                      return null === (t = a._readStateCallbacks) || void 0 === t
                        ? void 0
                        : t.getFormFieldByName(e.name);
                    })
                    .filter(Boolean),
                  r = e.map((e, t) => {
                    const a = o.get(t);
                    return l(a, i) && a && e
                      ? 'string' == typeof e
                        ? (0, f.ar)(e)
                        : (0, f.R9)({
                            buffer: e,
                            width: a.boundingBox.width * n,
                            height: a.boundingBox.height * n
                          })
                      : Promise.resolve(null);
                  });
                Promise.all(r).then((e) => {
                  const i = s
                    .map((e) => {
                      var t;
                      return null === (t = a._readStateCallbacks) || void 0 === t
                        ? void 0
                        : t.getFormFieldByName(e.name);
                    })
                    .filter(Boolean);
                  e.forEach((e, t) => {
                    const a = o.get(t);
                    if (a) {
                      const { formFieldValue: t } = this.getAnnotationFormFieldAndValue(a),
                        s = this.getAnnotationAvailableVariants(a),
                        o = this.annotationAPStreamPromises.get(a.id),
                        r = l(a, i);
                      if (
                        (o &&
                          ((this.annotationAPStreamPromises =
                            this.annotationAPStreamPromises.delete(a.id)),
                          o(r ? e : null)),
                        s.length > 1)
                      ) {
                        const i = { normal: e };
                        e && r && this.cacheAPStream(i, a);
                        const { promise: o } = this.renderAPStream(
                          a,
                          t,
                          null,
                          a.boundingBox.width * n,
                          a.boundingBox.height * n,
                          s
                        );
                        Promise.all(o.map((e) => e.promise)).then((e) => {
                          e.some(Boolean) &&
                            s.forEach((t, n) => {
                              'normal' !== t && e[n] && (i[t] = e[n]);
                            });
                        });
                      } else e && r && this.cacheAPStream(e, a);
                    }
                  }),
                    t();
                });
              })
              .catch(i);
          });
          return (this.pageAPStreamsPromises = this.pageAPStreamsPromises.set(e, c)), c;
        }
        renderDetachedAnnotation(e, t, n, a) {
          if (e.id) throw new s.p2(`Detached annotations should not have an \`id\`: ${e.id}`);
          const i = (0, se.d6)();
          if (e instanceof q.GI) {
            if (
              this.isVisuallyIdenticalStampAnnotationCached({ annotation: e, width: n, height: a })
            )
              return this.cachedStampAnnotationDiscardablePromise(i);
            (0, y.eD)(e) ||
              (this._cachedRenderedAnnotation = {
                index: (0, y.et)(e),
                width: n,
                height: a,
                APStreamPromise: i.promise
              });
          }
          const o = (0, u.SK)(),
            r = new j(o, () =>
              this.client
                .renderDetachedAnnotation((0, k.Hs)(e), t, n, a, (0, z.zP)())
                .then((e) =>
                  e ? (0, f.R9)({ buffer: e, width: n, height: a }) : Promise.resolve(null)
                )
                .then((e) => (i.resolve(e), e))
            ),
            { promise: l, cancel: c } = this._requestQueue.enqueue(r, !1);
          return { promise: l, cancel: c };
        }
        async getAttachment(e) {
          const [t, n] = await this.client.getAttachment(e);
          return new Blob([t], { type: n });
        }
        async parseXFDF(e, t) {
          const {
            errors: n,
            formFieldValues: a,
            annotations: s
          } = await this.client.parseXFDF(e, t);
          return {
            errors:
              null == n ? void 0 : n.map((e) => ({ errorMessage: e.error_message, type: e.type })),
            formFieldValues:
              null == a ? void 0 : a.reduce((e, t) => ((e[t.fqdn] = t.values), e), {}),
            annotations: (0, i.aV)(
              (null == s ? void 0 : s.map((e) => (0, k.vH)((0, y.xc)(), e))) || []
            )
          };
        }
        async search(e, t, n, a) {
          let i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : H.S.TEXT;
          const o = await this.client.search(e, t, n, a, s);
          return (0, F.E)(o.filter((e) => i || !e.isAnnotation));
        }
        async searchAndRedact(e, t, n) {
          const { totalPages: a } = n,
            o = await this.client.search(e, 0, a, t.caseSensitive, t.searchType);
          return (0, i.aV)(
            o
              .filter((e) => t.searchInAnnotations || !e.isAnnotation)
              .map((e) => {
                const a = e.isAnnotation ? [e.annotationRect] : e.rectsOnPage,
                  o = (0, i.aV)(a).map((e) => ((0, s.kG)(e), (0, J.k)(e)));
                return new K.Z(
                  le(
                    le(le({}, (0, y.lx)(n)), t.annotationPreset),
                    {},
                    { pageIndex: e.pageIndex, rects: o, boundingBox: V.Z.union(o) }
                  )
                );
              })
          );
        }
        async exportPDF() {
          let {
              flatten: e = !1,
              incremental: t,
              saveForPrinting: n = !1,
              format: a = 'pdf',
              excludeAnnotations: i = !1,
              preserveInstantJSONChanges: o = !0,
              permissions: r,
              outputFormat: l = !1,
              flattenElectronicSignatures: c = e
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            d = arguments.length > 1 ? arguments[1] : void 0;
          if (e && !c)
            throw new s.p2(
              'Cannot set `flattenElectronicSignatures` to `false` when `flatten` is set to `true`.'
            );
          if (
            (l &&
              'boolean' != typeof l &&
              l.conformance &&
              (0, s.kG)(
                l.conformance && Object.values(Q.w).includes(l.conformance),
                'The supplied PDF/A Conformance type is not valid. Valid Conformance should be one of the following options PSPDFKit.Conformance.' +
                  Object.keys(Q.w).join(', PSPDFKit.Conformance.')
              ),
            void 0 === t)
          )
            if (this._state.features.includes(X.q.DIGITAL_SIGNATURES)) {
              const e = await this.getSignaturesInfo();
              t = !n && Boolean('not_signed' !== e.status);
            } else t = !1;
          return this.client.exportFile(e, t, n, a, i, o, r, d).then(async (e) => {
            let [t, n] = e;
            if (((t.mimeType = n.mimeType), (t.extension = n.extension), l)) {
              const e = 'boolean' != typeof l && l.conformance ? l.conformance : Q.w.PDFA_2B;
              let n;
              try {
                return (n = await this._setupGdPictureClient()), await n.toPdf(t, e);
              } finally {
                var a;
                null === (a = n) || void 0 === a || a.destroy(), (0, ne.Nt)(null);
              }
            }
            return t;
          });
        }
        async exportOffice(e) {
          let t,
            { format: n } = e;
          try {
            const [e] = await this.client.exportFile(!1, !1, !1, 'pdf', !1, !0);
            return (t = await this._setupGdPictureClient()), await t.toOffice(e, n);
          } catch (e) {
            throw new s.p2(`Exporting to ${n} failed: ${e.message}.`);
          } finally {
            var a;
            null === (a = t) || void 0 === a || a.destroy(), (0, ne.Nt)(null);
          }
        }
        async _setupGdPictureClient() {
          let e = (0, ne.xE)();
          return (
            e ||
              ((e = (0, ne.Un)({
                baseUrl: this._state.baseProcessorEngineUrl,
                mainThreadOrigin: this._state.appName || (0, r.$u)() || window.location.origin,
                licenseKey: this._state.licenseKey,
                processorEngine: this._state.processorEngine,
                customFonts: this._state.customFonts,
                dynamicFonts: this._state.dynamicFonts,
                fontSubstitutions: this._state.fontSubstitutions
              })),
              (0, ne.Nt)(e)),
            e
          );
        }
        exportXFDF(e) {
          return this.client.exportXFDF(e);
        }
        exportInstantJSON(e) {
          return this.client.exportInstantJSON(e);
        }
        getPDFURL() {
          let {
            includeComments: e = !0,
            saveForPrinting: t,
            excludeAnnotations: n
          } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.generatePDFObjectURL({
            includeComments: e,
            saveForPrinting: t,
            excludeAnnotations: n
          });
        }
        generatePDFObjectURL() {
          let e,
            {
              includeComments: t = !0,
              saveForPrinting: n,
              excludeAnnotations: a = !1
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            i = !1;
          return {
            promise: new Promise((s) => {
              this.exportPDF({
                flatten: !0,
                includeComments: t,
                saveForPrinting: n,
                excludeAnnotations: a
              }).then((t) => {
                if (i) return;
                const n = new Blob([t], { type: t.mimeType });
                (e = window.URL.createObjectURL(n)), s(e);
              });
            }),
            revoke: () => {
              e && window.URL.revokeObjectURL(e), (i = !0);
            }
          };
        }
        async getDocumentOutline() {
          const e = await this.client.getDocumentOutline();
          return (0, i.aV)(e.map(g.i));
        }
        async setDocumentOutline(e) {
          return this.client.setDocumentOutline(e.map(g.a).toArray());
        }
        async getPageGlyphs(e) {
          const t = await this.client.getPageGlyphs(e);
          return (0, k.Vl)(t);
        }
        async onKeystrokeEvent(e) {
          return await this.client.onKeystrokeEvent(e);
        }
        async evalFormValuesActions(e) {
          return this.client.evalFormValuesActions(e.map(k.kr).toJS());
        }
        async evalScript(e, t, n) {
          return this.client.evalScript(e, t, n);
        }
        async setFormJSONUpdateBatchMode(e) {
          return this.client.setFormJSONUpdateBatchMode(e);
        }
        async getMeasurementScales() {
          const e = await this.client.getMeasurementScales();
          return null == e ? void 0 : e.measurementContentFormats;
        }
        async addMeasurementScale(e) {
          return await this.client.addMeasurementScale(e);
        }
        async removeMeasurementScale(e) {
          return await this.client.removeMeasurementScale(e);
        }
        async getAnnotationsByScale(e) {
          return await this.client.getAnnotationsByScale(e);
        }
        async applyOperationsAndReload(e) {
          try {
            const { processedOperations: t, operationsDocuments: n } = await pe(e);
            await this.client.applyOperations(t, n);
          } catch (e) {
            throw new s.p2(`Applying operations failed: ${e}`);
          }
          return (
            (this.provider._state = this.provider._state.set('alreadyLoadedPages', (0, i.D5)())),
            this.reloadDocument()
          );
        }
        async applyRedactionsAndReload() {
          try {
            await this.client.applyRedactions();
          } catch (e) {
            throw new s.p2(`Applying redactions failed: ${e}`);
          }
          return this.reloadDocument();
        }
        async reloadDocument() {
          try {
            var e;
            null === (e = this.provider) || void 0 === e || e.destroy(),
              (this.provider = new L(this.client, null)),
              (this._state = this._state.set('lazyLoadedPages', null));
            const t = await this.client.reloadDocument();
            return (
              (this._state = this._state
                .set('documentResponse', t)
                .set('documentHandle', (parseInt(this._state.documentHandle) + 1).toString())
                .set('signaturesInfoPromise', null)),
              {
                features: this._state.features,
                signatureFeatureAvailability: this._state.signatureFeatureAvailability,
                hasPassword: !1,
                allowedTileScales: 'all'
              }
            );
          } catch (e) {
            throw new s.p2(`Reloading failed: ${e}`);
          }
        }
        async getEmbeddedFiles() {
          const e = await this.client.getEmbeddedFilesList();
          return (0, i.aV)(
            e.map((e) => {
              let { id: t } = e,
                n = (0, c.Z)(e, oe);
              return (0, Z.i)(t, n, !0);
            })
          );
        }
        async exportPDFWithOperations(e) {
          try {
            const { processedOperations: t, operationsDocuments: n } = await pe(e);
            return this.client.exportPDFWithOperations(t, n);
          } catch (e) {
            throw new s.p2(`Exporting PDF with operations failed: ${e}`);
          }
        }
        async setSignaturesLTV(e) {
          try {
            var t;
            const n = (null != e ? e : []).map((e) =>
                e instanceof ArrayBuffer ? (0, N.sM)(e) : m.Base64.encode(e)
              ),
              a = await this.getRevocationResponses(n);
            if (
              null !==
                (t = (await this.client.setSignaturesLTV(a).then((e) => (0, k.rS)(e)))
                  .signatures) &&
              void 0 !== t &&
              t.find(
                (e) =>
                  e.certificateChainValidationStatus === ee.wk.ok_but_could_not_check_revocation
              )
            )
              throw 'Could not set LTV for all signatures. Check that the OCSP response is valid.';
            return (
              (this._state = this._state.set('signaturesInfoPromise', null)),
              this.getSignaturesInfo()
            );
          } catch (e) {
            throw new s.p2(`Setting signatures LTV failed: ${e}`);
          }
        }
        getSignaturesInfo() {
          try {
            if (this._state.signaturesInfoPromise) return this._state.signaturesInfoPromise;
            const e = this.client.getSignaturesInfo().then((e) => (0, k.rS)(e));
            return (this._state = this._state.set('signaturesInfoPromise', e)), e;
          } catch (e) {
            throw new s.p2(`Getting document signatures info: ${e}`);
          }
        }
        async refreshSignaturesInfo() {
          this._state = this._state.set('signaturesInfoPromise', null);
        }
        async loadCertificates(e) {
          return this.client.loadCertificates(e);
        }
        async getRevocationResponses(e) {
          const t = await this.client.getRevocationRequests(e);
          return await Promise.all(
            t.map(async (e) => {
              let { method: t, url: n, content_type: a, request_data: i, token: s } = e;
              try {
                const e = await fetch(n, {
                    method: t,
                    headers: { 'Content-Type': null != a ? a : 'application/ocsp-request' },
                    body: fe(i)
                  }),
                  o = await e.arrayBuffer();
                return { response_code: e.status, body: (0, N.sM)(o), token: s };
              } catch (e) {
                return { response_code: 0, body: '', token: s, error_message: e.message };
              }
            })
          );
        }
        async signDocumentAndReload(e, t) {
          var n, a, i, o, r, l, c, d, u, h, p, f, g, y, b;
          (0, s.kG)(
            void 0 === t || 'function' == typeof t,
            'On a Standalone deployment, `twoStepSignatureCallbackOrSigningServiceData` must be a function if provided.'
          );
          const v =
            null == e || null === (n = e.signingData) || void 0 === n ? void 0 : n.certificates;
          (0, s.kG)(
            !(null != e && null !== (a = e.signingData) && void 0 !== a && a.signatureType) ||
              (null == e || null === (i = e.signingData) || void 0 === i
                ? void 0
                : i.signatureType) === ee.BG.CMS ||
              (Array.isArray(v) && v.length > 0),
            'For signatures of type `PSPDFKit.SignatureType.CAdES` an `Array` of certificates must be provided in `signaturePreparationData.signingData.certificates`.'
          ),
            (0, s.kG)(
              !(null != e && null !== (o = e.signingData) && void 0 !== o && o.timestamp) ||
                'string' ==
                  typeof (null == e ||
                  null === (r = e.signingData) ||
                  void 0 === r ||
                  null === (r = r.timestamp) ||
                  void 0 === r
                    ? void 0
                    : r.url),
              'The `url` property of `signingData.timestamp` must be a string.'
            ),
            (0, s.kG)(
              !(
                null != e &&
                null !== (l = e.signingData) &&
                void 0 !== l &&
                l.timestamp &&
                null != e &&
                null !== (c = e.signingData) &&
                void 0 !== c &&
                null !== (c = c.timestamp) &&
                void 0 !== c &&
                c.password &&
                'string' !=
                  typeof (null == e ||
                  null === (d = e.signingData) ||
                  void 0 === d ||
                  null === (d = d.timestamp) ||
                  void 0 === d
                    ? void 0
                    : d.password)
              ),
              'The `password` property of `signingData.timestamp` must be a string.'
            ),
            (0, s.kG)(
              !(
                null != e &&
                null !== (u = e.signingData) &&
                void 0 !== u &&
                u.timestamp &&
                null != e &&
                null !== (h = e.signingData) &&
                void 0 !== h &&
                null !== (h = h.timestamp) &&
                void 0 !== h &&
                h.username &&
                'string' !=
                  typeof (null == e ||
                  null === (p = e.signingData) ||
                  void 0 === p ||
                  null === (p = p.timestamp) ||
                  void 0 === p
                    ? void 0
                    : p.username)
              ),
              'The `username` property of `signingData.timestamp` must be a string.'
            ),
            (0, s.kG)(
              void 0 ===
                (null == e || null === (f = e.signingData) || void 0 === f ? void 0 : f.ltv) ||
                'boolean' ==
                  typeof (null == e || null === (g = e.signingData) || void 0 === g
                    ? void 0
                    : g.ltv),
              'The `ltv` property of `signingData` must be a boolean if set.'
            );
          const _ = le(
            le(
              {
                signatureType:
                  (null == e || null === (y = e.signingData) || void 0 === y
                    ? void 0
                    : y.signatureType) ||
                  (Array.isArray(v) && v.length > 0 ? ee.BG.CAdES : ee.BG.CMS)
              },
              (null == e || null === (b = e.signingData) || void 0 === b
                ? void 0
                : b.certificates) && {
                certificates: e.signingData.certificates.map((e) =>
                  e instanceof ArrayBuffer ? (0, N.sM)(e) : m.Base64.encode(e)
                )
              }
            ),
            null != e && e.placeholderSize ? { estimatedSize: e.placeholderSize } : null
          );
          try {
            var F, w, P;
            const {
                hash: n,
                signatureFormFieldName: a,
                file: i,
                fileContents: o,
                dataToBeSigned: r
              } = await this.client.prepareSign(
                (0, k._L)(_),
                null != e && e.signatureMetadata ? (0, k._D)(e.signatureMetadata) : null,
                Boolean(null == e ? void 0 : e.flatten),
                null == e ? void 0 : e.formFieldName,
                (0, k.eE)(null == e ? void 0 : e.position),
                await (0, k.sr)(null == e ? void 0 : e.appearance)
              ),
              l = (function (e) {
                const t = e.trim(),
                  n = t.length / 2,
                  a = new Uint8Array(n);
                for (let e = 0; e < n; e++) a[e] = parseInt(t.substr(2 * e, 2), 16);
                return a;
              })(r);
            let c, d, u;
            if (t) {
              try {
                c = await t({ hash: n, fileContents: o, dataToBeSigned: l });
              } catch (e) {
                throw new s.p2(`\`twoStepSignatureCallback\` threw an error: ${e}`);
              }
              if (!(c instanceof ArrayBuffer))
                throw new s.p2(
                  `The resolved value from \`twoStepSignatureCallback\` should be a an \`ArrayBuffer\` but is of type \`${typeof c}\` instead.`
                );
              u = c;
            } else {
              if (null == e || !e.signingData || !e.signingData.privateKey)
                throw new s.p2(
                  'No `twoStepSignatureCallback` or `signingData.privateKey` was provided.'
                );
              {
                const t = {
                    name: 'RSASSA-PKCS1-v1_5',
                    hash: { name: 'SHA-256' },
                    modulusLength: 2048,
                    extractable: !1,
                    publicExponent: new Uint8Array([1, 0, 1])
                  },
                  n = await globalThis.crypto.subtle.importKey(
                    'pkcs8',
                    (function (e) {
                      const t = e.split('\n');
                      let n = '';
                      for (let e = 0; e < t.length; e++)
                        t[e].trim().length > 0 &&
                          t[e].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
                          t[e].indexOf('-BEGIN PRIVATE KEY-') < 0 &&
                          t[e].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
                          t[e].indexOf('-BEGIN CERTIFICATE-') < 0 &&
                          t[e].indexOf('-END RSA PRIVATE KEY-') < 0 &&
                          t[e].indexOf('-END PRIVATE KEY-') < 0 &&
                          t[e].indexOf('-END RSA PUBLIC KEY-') < 0 &&
                          t[e].indexOf('-END CERTIFICATE-') < 0 &&
                          (n += t[e].trim());
                      return fe(n);
                    })(e.signingData.privateKey),
                    t,
                    !0,
                    ['sign']
                  );
                (d = await globalThis.crypto.subtle.sign(t, n, l)), (u = d);
              }
            }
            const m = (0, N.sM)(u) || '';
            let h = null;
            const p = _.certificates || [];
            let f = [];
            if (
              (null != e &&
                null !== (F = e.signingData) &&
                void 0 !== F &&
                F.ltv &&
                (f = await this.getRevocationResponses(p)),
              null != e && null !== (w = e.signingData) && void 0 !== w && w.timestamp)
            ) {
              const { url: t, username: n = '', password: a = '' } = e.signingData.timestamp,
                i = await this.client.getTimestampRequest(m, { url: t, username: n, password: a }),
                s = {
                  method: i.method,
                  headers: { 'Content-Type': i.contentType || 'application/timestamp-query' },
                  body: fe(i.requestData)
                };
              (i.username || i.password) &&
                (s.headers.Authorization = `Basic ${btoa(`${i.username}:${i.password}`)}`);
              try {
                const e = await fetch(i.url, s),
                  t = await e.arrayBuffer();
                h = { response_code: e.status, body: (0, N.sM)(t), token: i.token };
              } catch (e) {
                h = { response_code: 0, body: '', token: i.token, error_message: e.message };
              }
            }
            const g = await this.client.sign(i, a, n, k.YA[_.signatureType], m, p, h, f);
            return (
              null != e &&
                null !== (P = e.signingData) &&
                void 0 !== P &&
                P.ltv &&
                g.signature.certificateChainValidationStatus ===
                  ee.wk.ok_but_could_not_check_revocation &&
                (0, s.ZK)(
                  "Document signed, but couldn't add certificate revocation information so the signature may not be LTV-enabled."
                ),
              await this.reloadDocument(),
              a
            );
          } catch (e) {
            throw (await this.client.restoreToOriginalState(), e);
          }
        }
        cancelRequests() {
          this._requestQueue.cancelAll();
        }
        async syncChanges() {}
        getDefaultGroup() {}
        isCollaborationPermissionsEnabled() {
          return !1;
        }
        async clearAPStreamCache() {
          return this.client.clearAPStreamCache();
        }
        async setComparisonDocument(e, t) {
          return this.client.setComparisonDocument(e, t);
        }
        async openComparisonDocument(e) {
          return (
            (this._state = this._state.set('forceAnnotationsRender', !1)),
            await this.client.closeDocument(),
            (this._state = this._state.set('forceAnnotationsRender', !0)),
            (await this.client.openComparisonDocument(e)) || this._state.documentResponse
          );
        }
        async documentCompareAndOpen(e) {
          return this.client.documentCompareAndOpen(e);
        }
        async persistOpenDocument(e) {
          return this.client.persistOpenDocument(e);
        }
        async cleanupDocumentComparison() {
          return this.client.cleanupDocumentComparison();
        }
        async runPDFFormattingScripts(e, t) {
          return this.client.runPDFFormattingScripts(e, t);
        }
        async runPDFFormattingScriptsFromWidgets(e, t, n) {
          let a = [];
          if (this._isPDFJavaScriptEnabled) {
            const { withAPStream: i, withoutAPStream: s } = e.reduce(
              (e, a) => {
                if (a instanceof q.x_) {
                  if ((null == t ? void 0 : t.get(a.formFieldName)) instanceof q.Yo) return e;
                  null != n && n(a)
                    ? e.withAPStream.push(a.formFieldName)
                    : e.withoutAPStream.push(a.formFieldName);
                }
                return e;
              },
              { withAPStream: [], withoutAPStream: [] }
            );
            let o = [];
            if (i.length && !s.length) o = await this.runPDFFormattingScripts(i, !0);
            else if (!i.length && s.length) o = await this.runPDFFormattingScripts(s, !1);
            else if (i.length && s.length) {
              const [e, t] = await Promise.all([
                this.runPDFFormattingScripts(i, !0),
                this.runPDFFormattingScripts(s, !1)
              ]);
              o = e.concat(t);
            }
            a = (0, U.gE)(this._initialChanges, o);
          }
          return a;
        }
        setFontSubstitutions(e) {
          return this.client.setFontSubstitutions(e);
        }
        async contentEditorReload() {
          return (
            (0, s.kG)(
              this.provider instanceof L,
              'Standalone can only use standalone annotation provider'
            ),
            (this.provider._state = this.provider._state.set('alreadyLoadedPages', (0, i.D5)())),
            this.reloadDocument()
          );
        }
        getOCGs() {
          return this.client.getOCGs();
        }
        getOCGVisibilityState() {
          return this.client.getOCGVisibilityState();
        }
        setOCGVisibilityState(e) {
          return this.client.setOCGVisibilityState(e);
        }
        updateButtonIcon(e, t, n) {
          return this.client.updateButtonIcon((0, k.Hs)(e), t, n);
        }
      }
      function me(e) {
        return {
          baseUrl: e.baseUrl,
          baseCoreUrl: e.baseCoreUrl,
          baseProcessorEngineUrl: e.baseProcessorEngineUrl,
          licenseKey: e.licenseKey,
          document: e.document,
          disableWebAssemblyStreaming: !!e.disableWebAssemblyStreaming,
          enableAutomaticLinkExtraction: !!e.enableAutomaticLinkExtraction,
          overrideMemoryLimit:
            'number' == typeof e.overrideMemoryLimit ? e.overrideMemoryLimit : null,
          documentHandle: 'number' == typeof e.documentHandle ? e.documentHandle : '0',
          trustedCAsCallback:
            'function' == typeof e.trustedCAsCallback ? e.trustedCAsCallback : null,
          customFonts: Array.isArray(e.customFonts)
            ? e.customFonts.filter((e) => e instanceof $.Z)
            : null,
          forceLegacySignaturesFeature: Boolean(e.forceLegacySignaturesFeature),
          appName: 'string' == typeof e.appName ? e.appName : null,
          productId: e.productId,
          processorEngine: e.processorEngine,
          dynamicFonts: e.dynamicFonts,
          fontSubstitutions: e.fontSubstitutions,
          inlineWorkers: e.inlineWorkers
        };
      }
      function he(e) {
        const {
          licenseKey: t,
          instantJSON: n,
          XFDF: a,
          disableWebAssemblyStreaming: i,
          disableIndexedDBCaching: o,
          enableAutomaticLinkExtraction: r,
          overrideMemoryLimit: l,
          standaloneInstancesPoolSize: c,
          trustedCAsCallback: d,
          baseUrl: u,
          baseCoreUrl: m,
          baseProcessorEngineUrl: h,
          customFonts: p,
          isSharePoint: f,
          isSalesforce: g,
          dynamicFonts: y,
          inlineWorkers: b
        } = e;
        if (
          ((0, s.kG)(
            'string' == typeof u,
            '`baseUrl` is mandatory and must be a valid URL, e.g. `https://example.com/'
          ),
          (0, W.Pn)(u),
          (0, s.kG)(
            !m || 'string' == typeof m,
            '`baseCoreUrl` must be a valid URL if set, e.g. `https://example.com/'
          ),
          m && (0, W.rH)(m),
          (0, s.kG)(
            !h || 'string' == typeof h,
            '`baseProcessorEngineUrl` must be a valid URL if set, e.g. `https://example.com/'
          ),
          h && (0, W.qH)(h),
          (0, s.kG)(
            null == t || 'string' == typeof t,
            'licenseKey must be a string value if provided. Please obtain yours from https://customers.pspdfkit.com.'
          ),
          'string' == typeof t &&
            (0, s.kG)(
              !t.startsWith('TRIAL-'),
              "You're using the npm key instead of the license key. This key is used to download the PSPDFKit for Web package via the node package manager.\n\nLeave out the license key to activate as a trial."
            ),
          (0, s.kG)(void 0 === a || 'string' == typeof a, 'XFDF must be a string'),
          n &&
            ((0, s.Ou)(n), (0, s.kG)(void 0 === a, 'Cannot import from both instantJSON and XFDF')),
          (0, s.kG)(
            void 0 === i || 'boolean' == typeof i,
            'disableWebAssemblyStreaming must be a boolean'
          ),
          (0, s.kG)(
            void 0 === r || 'boolean' == typeof r,
            'enableAutomaticLinkExtraction must be a boolean'
          ),
          (0, s.kG)(void 0 === l || 'number' == typeof l, 'overrideMemoryLimit must be a number'),
          (0, s.kG)(
            void 0 === c || ('number' == typeof c && c >= 0),
            'standaloneInstancesPoolSize must be a non-negative number'
          ),
          (0, s.kG)(
            void 0 === d || 'function' == typeof d,
            'trustedCAsCallback must be a function'
          ),
          (0, s.kG)(
            void 0 === p || (Array.isArray(p) && p.every((e) => e instanceof $.Z)),
            'customFonts must be an array of PSPDFKit.Font instances'
          ),
          (0, s.kG)(
            void 0 === p || p.every((e) => e.callback),
            'All PSPDFKit.Font instances specified on customFonts must have its callback property defined'
          ),
          void 0 !== o &&
            (0, s.a1)(
              'disableIndexedDbCaching has been deprecated and it no longer has effect. It will be removed in a later version.\nBrowsers dropped IndexedDB serialization of Wasm modules in favor of regular HTTP caching.'
            ),
          (f || g) &&
            (0, s.a1)(
              'isSharePoint and isSalesforce configuration properties are deprecated and will be removed in the next major release. Please use the new Configuration#productId property instead. For more information, please check the migration guide.'
            ),
          (0, s.kG)(
            !(f && g),
            'You cannot enable both SharePoint and Salesforce integrations at the same time. Please set either isSharePoint or isSalesforce to true, but not both.'
          ),
          'string' == typeof y)
        )
          try {
            new URL(y);
          } catch (e) {
            throw new s.p2(
              'dynamicFonts must be a valid URL to a JSON file containing the data for fonts to be dynamically loaded.'
            );
          }
        (0, s.kG)(void 0 === b || 'boolean' == typeof b, 'inlineWorkers must be a boolean');
      }
      async function pe(e) {
        const t = new WeakMap(),
          n = {};
        return {
          processedOperations: await Promise.all(
            e.map(async (e, a) => {
              if ('importDocument' === e.type) {
                const { document: i } = e;
                return (
                  (0, s.kG)(
                    i instanceof File || i instanceof Blob,
                    'Wrong `importDocument` operation `document` value: it must be a File or a Blob'
                  ),
                  (0, M.M)(t, n, i, e, a, 'document')
                );
              }
              if ('applyInstantJson' === e.type) {
                const i = e.instantJson;
                (0, s.kG)(
                  'object' == typeof i && null !== i,
                  'Wrong `applyInstantJson` operation `instantJson` value: it must be an object'
                );
                const o = JSON.stringify(i),
                  r = new Blob([o], { type: 'application/json' });
                return (0, M.M)(t, n, r, e, a, 'dataFilePath');
              }
              if ('applyXfdf' === e.type) {
                const i = e.xfdf;
                (0, s.kG)(
                  'string' == typeof i,
                  'Wrong `applyXfdf` operation `xfdf` value: it must be a string'
                );
                const o = new Blob([i], { type: 'application/vnd.adobe.xfdf' });
                return (0, M.M)(t, n, o, e, a, 'dataFilePath');
              }
              return e;
            })
          ),
          operationsDocuments: n
        };
      }
      function fe(e) {
        const t = atob(e),
          n = new Uint8Array(t.length);
        for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
        return n.buffer;
      }
      var ge = n(12705),
        ye = n(95431),
        be = n(8968);
      function ve(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function _e(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ve(Object(n), !0).forEach(function (t) {
                (0, a.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : ve(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      let Fe;
      class ke extends ue {
        constructor(e) {
          const t = e.baseUrl || (0, l.SV)(window.document),
            n = e.baseCoreUrl || t,
            a = e.baseProcessorEngineUrl || t,
            i = _e(_e({}, e), {}, { baseUrl: t, baseCoreUrl: n, baseProcessorEngineUrl: a });
          if ('string' != typeof i.baseUrl)
            throw new s.p2(
              '`baseUrl` is mandatory and must be a valid URL, e.g. `https://example.com/`'
            );
          if ('string' != typeof i.document && !(i.document instanceof ArrayBuffer))
            throw new s.p2(
              'document must be either an URL to a supported document type (PDF and images), e.g. `https://example.com/document.pdf`, or an `ArrayBuffer`'
            );
          if (Fe && Fe !== i.licenseKey)
            throw new s.p2(
              'Trying to re-use instance with a different licenseKey.\nUnfortunately we only allow one licenseKey per instance.\nPlease contact support for further assistance.'
            );
          if ('string' == typeof i.licenseKey && i.licenseKey.startsWith('TRIAL-'))
            throw new s.p2(
              "You're using the npm key instead of the license key. This key is used to download the PSPDFKit for Web package via the node package manager.\n\nLeave out the license key to activate as a trial."
            );
          super(i), (this.destroyed = !1);
        }
        async load() {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = 0.2;
          e.progressCallback && e.progressCallback('loading', t),
            (this._isPDFJavaScriptEnabled = e.isPDFJavaScriptEnabled);
          const n = (0, ye.D4)(
              this._state.baseUrl,
              this._state.document,
              this._state.productId,
              () => {
                (t += 0.3), e.progressCallback && e.progressCallback('loading', t);
              }
            ),
            a = await Pe(this.client, this._state).finally(() => {
              (t += 0.3), e.progressCallback && e.progressCallback('loading', t);
            });
          (0, s.kG)(a);
          const { features: o, signatureFeatureAvailability: l } = a;
          if (
            this._state.productId === Y.x.SharePoint &&
            'string' == typeof this._state.document &&
            Array.isArray(a.afu)
          ) {
            const e = new URL(this._state.document, this._state.baseUrl);
            if (!a.afu.some((t) => e.hostname.match(t)))
              throw new s.p2(`The document origin ${e.hostname} is not authorized.`);
          }
          const c =
            l === B.H.ELECTRONIC_SIGNATURES &&
            (0, ge.Vz)(o) &&
            this._state.forceLegacySignaturesFeature
              ? B.H.LEGACY_SIGNATURES
              : l;
          (this._state = this._state
            .set('features', (0, i.aV)(o))
            .set('signatureFeatureAvailability', c)),
            (Fe = this._state.licenseKey);
          const d = await n;
          let u,
            m = d.slice(0);
          try {
            this.destroyed
              ? ((m = null), (u = await new Promise(() => {})))
              : ((u = await this.client.openDocument(
                  d,
                  e.password,
                  'number' == typeof e.initialPageIndex ? e.initialPageIndex : 0
                )),
                (m = null));
          } catch (t) {
            if (
              ('INVALID_PASSWORD' === t.message &&
                this._state.document instanceof ArrayBuffer &&
                (this._state = this._state.set('document', t.callArgs[0])),
              'IMAGE_DOCUMENTS_NOT_LICENSED' === t.message &&
                (t.message =
                  'The image documents feature is not enabled for your license key. Please contact support or sales to purchase the UI module for your product.'),
              !(
                t instanceof s.p2 &&
                t.message.includes('File not in PDF format or corrupted.') &&
                this._state.productId !== Y.x.Salesforce
              ))
            )
              throw t;
            {
              (0, s.kG)(m);
              let n,
                a = (0, ne.xE)();
              try {
                a ||
                  ((a = (0, ne.Un)({
                    baseUrl: this._state.baseProcessorEngineUrl,
                    mainThreadOrigin: this._state.appName || (0, r.$u)() || window.location.origin,
                    licenseKey: this._state.licenseKey || void 0,
                    customFonts: this._state.customFonts || void 0,
                    dynamicFonts: this._state.dynamicFonts || void 0,
                    fontSubstitutions: this._state.fontSubstitutions,
                    processorEngine: this._state.processorEngine
                  })),
                  (0, ne.Nt)(a)),
                  (n = await a),
                  (0, s.kG)(n);
                const t = await n.toPdf(m);
                u = await this.client.openDocument(
                  t,
                  e.password,
                  'number' == typeof e.initialPageIndex ? e.initialPageIndex : 0
                );
              } catch (e) {
                throw (
                  ('INVALID_PASSWORD' === e.message &&
                    this._state.document instanceof ArrayBuffer &&
                    (this._state = this._state.set('document', t.callArgs[0])),
                  'IMAGE_DOCUMENTS_NOT_LICENSED' === e.message &&
                    (e.message =
                      'The image documents feature is not enabled for your license key. Please contact support or sales to purchase the UI module for your product.'),
                  e)
                );
              } finally {
                var h;
                (m = null), null === (h = n) || void 0 === h || h.destroy(), (0, ne.Nt)(null);
              }
            }
          }
          if (
            (this._isPDFJavaScriptEnabled &&
              (this._initialChanges = await this.client.enablePDFJavaScriptSupport()),
            this._XFDF &&
              (await this.client.importXFDF(
                this._XFDF.source,
                this._XFDF.keepCurrentAnnotations,
                this._XFDF.ignorePageRotation
              )),
            this._instantJSON && this._instantJSON.pdfId && u.ID.permanent)
          ) {
            const e = this._instantJSON.pdfId,
              t = u.ID;
            if (e.permanent !== t.permanent)
              throw new s.p2(
                'Could not instantiate from Instant JSON: Permanent PDF ID mismatch.\nPlease use the same PDF document that was used to create this Instant JSON.\nFor more information, please visit: https://pspdfkit.com/guides/web/current/importing-exporting/instant-json/'
              );
            if (e.changing !== t.changing)
              throw new s.p2(
                'Could not instantiate from Instant JSON: Changing PDF ID mismatch.\nPlease use the same revision of this PDF document that was used to create this Instant JSON.\nFor more information, please visit: https://pspdfkit.com/guides/web/current/importing-exporting/instant-json/'
              );
          }
          if (this._trustedCAsCallback)
            try {
              const e = await this._trustedCAsCallback();
              if (!Array.isArray(e)) throw new s.p2('Certificates response must be an array');
              if (e.some((e) => !(e instanceof ArrayBuffer) && 'string' != typeof e))
                throw new s.p2(
                  'All certificates must be passed as ArrayBuffer (DER) or string (PEM)'
                );
              await this.client.loadCertificates(e.map(N.uF));
            } catch (e) {
              throw new s.p2(
                `Could not retrieve certificates for digital signatures validation: ${e.message}.`
              );
            }
          return (
            (this._state = this._state.set('documentResponse', u)),
            {
              features: this._state.features,
              signatureFeatureAvailability: this._state.signatureFeatureAvailability,
              hasPassword: !!e.password,
              allowedTileScales: 'all',
              evaluation: a.evaluation
            }
          );
        }
        destroy() {
          (this.destroyed = !0), super.destroy();
        }
        getCustomFontsPromise() {
          return we;
        }
      }
      const we = { current: void 0 };
      async function Pe(e, t) {
        we.current = we.current || (t.customFonts ? (0, be.x6)(t.customFonts) : void 0);
        const n = t.appName || (0, r.$u)() || window.location.origin;
        return e
          .loadNativeModule(t.baseCoreUrl, {
            mainThreadOrigin: n,
            disableWebAssemblyStreaming: t.disableWebAssemblyStreaming,
            enableAutomaticLinkExtraction: t.enableAutomaticLinkExtraction,
            overrideMemoryLimit: t.overrideMemoryLimit,
            workerSpawnerFn: () => (0, o.$u)(t.inlineWorkers)
          })
          .then(async () =>
            e.load(
              t.baseCoreUrl,
              t.licenseKey,
              _e(
                _e({ mainThreadOrigin: n }, we.current ? { customFonts: await we.current } : null),
                {},
                { dynamicFonts: t.dynamicFonts, productId: t.productId }
              )
            )
          );
      }
    }
  }
]);
