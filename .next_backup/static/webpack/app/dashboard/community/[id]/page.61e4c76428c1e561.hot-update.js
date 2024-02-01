"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/community/[id]/page",{

/***/ "(app-pages-browser)/./hooks/useCreateComment.ts":
/*!***********************************!*\
  !*** ./hooks/useCreateComment.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var _lib_converters_Questions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/converters/Questions */ \"(app-pages-browser)/./lib/converters/Questions.tsx\");\n/* harmony import */ var _lib_converters_Comments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/converters/Comments */ \"(app-pages-browser)/./lib/converters/Comments.tsx\");\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store/store */ \"(app-pages-browser)/./store/store.ts\");\n/* harmony import */ var _lib_converters_User__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/converters/User */ \"(app-pages-browser)/./lib/converters/User.ts\");\n\n\n\n\n\n\n\n\nconst useCreateAndDeleteComment = ()=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const setCommentCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_6__.useCommentCountStore)((state)=>state.setCommentCount);\n    const onCreateComment = async (commentText, question, setCommentText, commenterIdentity)=>{\n        var _session_user;\n        setLoading(true);\n        if (!(session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) || !commentText) return;\n        const randomNumber = Math.floor(Math.random() * 10000);\n        const commentId = (session === null || session === void 0 ? void 0 : session.user.id) + \"-\" + question.id + \"-\" + randomNumber;\n        const newComment = {\n            id: commentId,\n            commentId: commentId,\n            authorId: session.user.id,\n            author: session.user.name,\n            commenterIdentity: commenterIdentity === \"Name\" ? session.user.name : \"Anonymous\",\n            questionId: question.id,\n            questionTitle: question.title,\n            text: commentText,\n            createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.serverTimestamp)(),\n            numberOfLikes: 0,\n            likedBy: []\n        };\n        try {\n            const docRef = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.addDoc)(_lib_converters_Comments__WEBPACK_IMPORTED_MODULE_5__.commentRef, newComment);\n            console.log(\"Comment created successfully with ID:\", docRef.id);\n        } catch (error) {\n            console.error(\"Error creating post:\", error);\n        }\n        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_lib_converters_Questions__WEBPACK_IMPORTED_MODULE_4__.questionRef, question.id);\n        const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n        if (docSnap.exists()) {\n            const currentComments = docSnap.data().numberOfComments + 1;\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                numberOfComments: currentComments,\n                comments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(commentId),\n                commentedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(commenterIdentity === \"Name\" ? session.user.name : \"Anonymous\")\n            });\n            setCommentCount(currentComments);\n        }\n        //Add notification to author of question\n        const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_7__.userRef)(question.authorId);\n        if (question.authorId !== session.user.id) {\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)({\n                    id: \"\".concat(commentId, \"-\").concat(question.id, \"-\").concat(question.authorId),\n                    text: \"\".concat(commenterIdentity === \"Name\" ? session.user.name : \"Anonymous\", \" commented on your post - \").concat(question.title),\n                    unread: false\n                })\n            });\n        }\n        setLoading(false);\n        setCommentText(\"\");\n    };\n    const onDeleteComment = async (comment)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            try {\n                const commentDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_3__.db, \"comments\", comment.id);\n                await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.deleteDoc)(commentDocRef);\n                console.log(\"Comment deleted successfully\");\n            } catch (error) {\n                console.error(\"Error deleting comment:\", error);\n            }\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_lib_converters_Questions__WEBPACK_IMPORTED_MODULE_4__.questionRef, comment.questionId);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists()) {\n                if (docSnap.data().numberOfComments === 0) {\n                    setCommentCount(0);\n                } else {\n                    const currentComments = docSnap.data().numberOfComments - 1;\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                        numberOfComments: currentComments,\n                        comments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(comment.commentId),\n                        commentedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(comment.commenterIdentity)\n                    });\n                    setCommentCount(currentComments);\n                }\n                //Remove notification from author of question\n                const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_7__.userRef)(docSnap.data().authorId);\n                if (docSnap.data().authorId !== session.user.id) {\n                    const userSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRefUser);\n                    if (userSnap.exists()) {\n                        const notifications = userSnap.data().notifications || [];\n                        const notificationToRemove = notifications.find((notification)=>notification.id === \"\".concat(comment.commentId, \"-\").concat(comment.questionId, \"-\").concat(docSnap.data().authorId));\n                        if (notificationToRemove) {\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(notificationToRemove)\n                            });\n                        }\n                    }\n                }\n            }\n        }\n    };\n    return {\n        onCreateComment,\n        onDeleteComment,\n        loading\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCreateAndDeleteComment);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZUNyZWF0ZUNvbW1lbnQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDaUM7QUFDWTtBQVVqQjtBQUNJO0FBRXlCO0FBQ0Y7QUFDRjtBQUNMO0FBRWhELE1BQU1lLDRCQUE0QjtJQUNoQyxNQUFNLEVBQUVDLE1BQU1DLE9BQU8sRUFBRSxHQUFHaEIsMkRBQVVBO0lBQ3BDLE1BQU0sQ0FBQ2lCLFNBQVNDLFdBQVcsR0FBR25CLCtDQUFRQSxDQUFVO0lBRWhELE1BQU1vQixrQkFBa0JQLGtFQUFvQkEsQ0FDMUMsQ0FBQ1EsUUFBVUEsTUFBTUQsZUFBZTtJQUdsQyxNQUFNRSxrQkFBa0IsT0FDdEJDLGFBQ0FDLFVBQ0FDLGdCQUNBQztZQUdLVDtRQURMRSxXQUFXO1FBQ1gsSUFBSSxFQUFDRixvQkFBQUEsK0JBQUFBLGdCQUFBQSxRQUFTVSxJQUFJLGNBQWJWLG9DQUFBQSxjQUFlVyxFQUFFLEtBQUksQ0FBQ0wsYUFBYTtRQUV4QyxNQUFNTSxlQUFlQyxLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBSztRQUNoRCxNQUFNQyxZQUFZaEIsQ0FBQUEsb0JBQUFBLDhCQUFBQSxRQUFTVSxJQUFJLENBQUNDLEVBQUUsSUFBRyxNQUFNSixTQUFTSSxFQUFFLEdBQUcsTUFBTUM7UUFDL0QsTUFBTUssYUFBYTtZQUNqQk4sSUFBSUs7WUFDSkEsV0FBV0E7WUFDWEUsVUFBVWxCLFFBQVFVLElBQUksQ0FBQ0MsRUFBRTtZQUN6QlEsUUFBUW5CLFFBQVFVLElBQUksQ0FBQ1UsSUFBSTtZQUN6QlgsbUJBQ0VBLHNCQUFzQixTQUFTVCxRQUFRVSxJQUFJLENBQUNVLElBQUksR0FBRztZQUNyREMsWUFBWWQsU0FBU0ksRUFBRTtZQUN2QlcsZUFBZWYsU0FBU2dCLEtBQUs7WUFDN0JDLE1BQU1sQjtZQUNObUIsV0FBV2xDLG1FQUFlQTtZQUMxQm1DLGVBQWU7WUFDZkMsU0FBUyxFQUFFO1FBQ2I7UUFDQSxJQUFJO1lBQ0YsTUFBTUMsU0FBUyxNQUFNM0MsMERBQU1BLENBQUNVLGdFQUFVQSxFQUFFc0I7WUFDeENZLFFBQVFDLEdBQUcsQ0FBQyx5Q0FBeUNGLE9BQU9qQixFQUFFO1FBQ2hFLEVBQUUsT0FBT29CLE9BQU87WUFDZEYsUUFBUUUsS0FBSyxDQUFDLHdCQUF3QkE7UUFDeEM7UUFFQSxNQUFNSCxTQUFTdkMsdURBQUdBLENBQUNLLGtFQUFXQSxFQUFFYSxTQUFTSSxFQUFFO1FBQzNDLE1BQU1xQixVQUFVLE1BQU0xQywwREFBTUEsQ0FBQ3NDO1FBRTdCLElBQUlJLFFBQVFDLE1BQU0sSUFBSTtZQUNwQixNQUFNQyxrQkFBa0JGLFFBQVFqQyxJQUFJLEdBQUdvQyxnQkFBZ0IsR0FBRztZQUMxRCxNQUFNM0MsNkRBQVNBLENBQUNvQyxRQUFRO2dCQUN0Qk8sa0JBQWtCRDtnQkFDbEJFLFVBQVVqRCw4REFBVUEsQ0FBQzZCO2dCQUNyQnFCLGFBQWFsRCw4REFBVUEsQ0FDckJzQixzQkFBc0IsU0FBU1QsUUFBUVUsSUFBSSxDQUFDVSxJQUFJLEdBQUc7WUFFdkQ7WUFDQWpCLGdCQUFnQitCO1FBQ2xCO1FBRUEsd0NBQXdDO1FBQ3hDLE1BQU1JLGFBQWF6Qyw2REFBT0EsQ0FBQ1UsU0FBU1csUUFBUTtRQUM1QyxJQUFJWCxTQUFTVyxRQUFRLEtBQUtsQixRQUFRVSxJQUFJLENBQUNDLEVBQUUsRUFBRTtZQUN6QyxNQUFNbkIsNkRBQVNBLENBQUM4QyxZQUFZO2dCQUMxQkMsZUFBZXBELDhEQUFVQSxDQUFDO29CQUN4QndCLElBQUksR0FBZ0JKLE9BQWJTLFdBQVUsS0FBa0JULE9BQWZBLFNBQVNJLEVBQUUsRUFBQyxLQUFxQixPQUFsQkosU0FBU1csUUFBUTtvQkFDcERNLE1BQU0sR0FFdUJqQixPQUQzQkUsc0JBQXNCLFNBQVNULFFBQVFVLElBQUksQ0FBQ1UsSUFBSSxHQUFHLGFBQ3BELDhCQUEyQyxPQUFmYixTQUFTZ0IsS0FBSztvQkFDM0NpQixRQUFRO2dCQUNWO1lBQ0Y7UUFDRjtRQUNBdEMsV0FBVztRQUNYTSxlQUFlO0lBQ2pCO0lBRUEsTUFBTWlDLGtCQUFrQixPQUFPQztZQUN6QjFDO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1UsSUFBSSxjQUFiVixvQ0FBQUEsY0FBZVcsRUFBRSxFQUFFO1lBQ3JCLElBQUk7Z0JBQ0YsTUFBTWdDLGdCQUFnQnRELHVEQUFHQSxDQUFDSSx5Q0FBRUEsRUFBRSxZQUFZaUQsUUFBUS9CLEVBQUU7Z0JBQ3BELE1BQU12Qiw2REFBU0EsQ0FBQ3VEO2dCQUNoQmQsUUFBUUMsR0FBRyxDQUFDO1lBQ2QsRUFBRSxPQUFPQyxPQUFPO2dCQUNkRixRQUFRRSxLQUFLLENBQUMsMkJBQTJCQTtZQUMzQztZQUNBLE1BQU1ILFNBQVN2Qyx1REFBR0EsQ0FBQ0ssa0VBQVdBLEVBQUVnRCxRQUFRckIsVUFBVTtZQUNsRCxNQUFNVyxVQUFVLE1BQU0xQywwREFBTUEsQ0FBQ3NDO1lBRTdCLElBQUlJLFFBQVFDLE1BQU0sSUFBSTtnQkFDcEIsSUFBSUQsUUFBUWpDLElBQUksR0FBR29DLGdCQUFnQixLQUFLLEdBQUc7b0JBQ3pDaEMsZ0JBQWdCO2dCQUNsQixPQUFPO29CQUNMLE1BQU0rQixrQkFBa0JGLFFBQVFqQyxJQUFJLEdBQUdvQyxnQkFBZ0IsR0FBRztvQkFDMUQsTUFBTTNDLDZEQUFTQSxDQUFDb0MsUUFBUTt3QkFDdEJPLGtCQUFrQkQ7d0JBQ2xCRSxVQUFVbEQsK0RBQVdBLENBQUN3RCxRQUFRMUIsU0FBUzt3QkFDdkNxQixhQUFhbkQsK0RBQVdBLENBQUN3RCxRQUFRakMsaUJBQWlCO29CQUNwRDtvQkFDQU4sZ0JBQWdCK0I7Z0JBQ2xCO2dCQUVBLDZDQUE2QztnQkFDN0MsTUFBTUksYUFBYXpDLDZEQUFPQSxDQUFDbUMsUUFBUWpDLElBQUksR0FBR21CLFFBQVE7Z0JBQ2xELElBQUljLFFBQVFqQyxJQUFJLEdBQUdtQixRQUFRLEtBQUtsQixRQUFRVSxJQUFJLENBQUNDLEVBQUUsRUFBRTtvQkFDL0MsTUFBTWlDLFdBQVcsTUFBTXRELDBEQUFNQSxDQUFDZ0Q7b0JBQzlCLElBQUlNLFNBQVNYLE1BQU0sSUFBSTt3QkFDckIsTUFBTU0sZ0JBQWdCSyxTQUFTN0MsSUFBSSxHQUFHd0MsYUFBYSxJQUFJLEVBQUU7d0JBQ3pELE1BQU1NLHVCQUF1Qk4sY0FBY08sSUFBSSxDQUM3QyxDQUFDQyxlQUNDQSxhQUFhcEMsRUFBRSxLQUNmLEdBQXdCK0IsT0FBckJBLFFBQVExQixTQUFTLEVBQUMsS0FDbkJnQixPQURzQlUsUUFBUXJCLFVBQVUsRUFBQyxLQUUxQyxPQURDVyxRQUFRakMsSUFBSSxHQUFHbUIsUUFBUTt3QkFHN0IsSUFBSTJCLHNCQUFzQjs0QkFDeEIsTUFBTXJELDZEQUFTQSxDQUFDOEMsWUFBWTtnQ0FDMUJDLGVBQWVyRCwrREFBV0EsQ0FBQzJEOzRCQUM3Qjt3QkFDRjtvQkFDRjtnQkFDRjtZQUNGO1FBQ0Y7SUFDRjtJQUVBLE9BQU87UUFBRXhDO1FBQWlCb0M7UUFBaUJ4QztJQUFRO0FBQ3JEO0FBRUEsK0RBQWVILHlCQUF5QkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ob29rcy91c2VDcmVhdGVDb21tZW50LnRzP2M0NTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbnVtYmVyLCBzZXQgfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7XG4gIGFkZERvYyxcbiAgYXJyYXlSZW1vdmUsXG4gIGFycmF5VW5pb24sXG4gIGRlbGV0ZURvYyxcbiAgZG9jLFxuICBnZXREb2MsXG4gIHNlcnZlclRpbWVzdGFtcCxcbiAgdXBkYXRlRG9jLFxufSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2ZpcmViYXNlXCI7XG5pbXBvcnQgeyBDb21tZW50LCBRdWVzdGlvbiB9IGZyb20gXCJAL3R5cGVzL1R5cGVzXCI7XG5pbXBvcnQgeyBxdWVzdGlvblJlZiB9IGZyb20gXCJAL2xpYi9jb252ZXJ0ZXJzL1F1ZXN0aW9uc1wiO1xuaW1wb3J0IHsgY29tbWVudFJlZiB9IGZyb20gXCJAL2xpYi9jb252ZXJ0ZXJzL0NvbW1lbnRzXCI7XG5pbXBvcnQgeyB1c2VDb21tZW50Q291bnRTdG9yZSB9IGZyb20gXCJAL3N0b3JlL3N0b3JlXCI7XG5pbXBvcnQgeyB1c2VyUmVmIH0gZnJvbSBcIkAvbGliL2NvbnZlcnRlcnMvVXNlclwiO1xuXG5jb25zdCB1c2VDcmVhdGVBbmREZWxldGVDb21tZW50ID0gKCkgPT4ge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IHNldENvbW1lbnRDb3VudCA9IHVzZUNvbW1lbnRDb3VudFN0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0Q29tbWVudENvdW50XG4gICk7XG5cbiAgY29uc3Qgb25DcmVhdGVDb21tZW50ID0gYXN5bmMgKFxuICAgIGNvbW1lbnRUZXh0OiBzdHJpbmcsXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uLFxuICAgIHNldENvbW1lbnRUZXh0OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCxcbiAgICBjb21tZW50ZXJJZGVudGl0eTogc3RyaW5nIHwgbnVsbFxuICApID0+IHtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQgfHwgIWNvbW1lbnRUZXh0KSByZXR1cm47XG5cbiAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG4gICAgY29uc3QgY29tbWVudElkID0gc2Vzc2lvbj8udXNlci5pZCArIFwiLVwiICsgcXVlc3Rpb24uaWQgKyBcIi1cIiArIHJhbmRvbU51bWJlcjtcbiAgICBjb25zdCBuZXdDb21tZW50ID0ge1xuICAgICAgaWQ6IGNvbW1lbnRJZCxcbiAgICAgIGNvbW1lbnRJZDogY29tbWVudElkLFxuICAgICAgYXV0aG9ySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgIGF1dGhvcjogc2Vzc2lvbi51c2VyLm5hbWUsXG4gICAgICBjb21tZW50ZXJJZGVudGl0eTpcbiAgICAgICAgY29tbWVudGVySWRlbnRpdHkgPT09IFwiTmFtZVwiID8gc2Vzc2lvbi51c2VyLm5hbWUgOiBcIkFub255bW91c1wiLFxuICAgICAgcXVlc3Rpb25JZDogcXVlc3Rpb24uaWQsXG4gICAgICBxdWVzdGlvblRpdGxlOiBxdWVzdGlvbi50aXRsZSxcbiAgICAgIHRleHQ6IGNvbW1lbnRUZXh0LFxuICAgICAgY3JlYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSxcbiAgICAgIG51bWJlck9mTGlrZXM6IDAsXG4gICAgICBsaWtlZEJ5OiBbXSBhcyBzdHJpbmdbXSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZGREb2MoY29tbWVudFJlZiwgbmV3Q29tbWVudCk7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgY3JlYXRlZCBzdWNjZXNzZnVsbHkgd2l0aCBJRDpcIiwgZG9jUmVmLmlkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNyZWF0aW5nIHBvc3Q6XCIsIGVycm9yKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb2NSZWYgPSBkb2MocXVlc3Rpb25SZWYsIHF1ZXN0aW9uLmlkKTtcbiAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKGRvY1JlZik7XG5cbiAgICBpZiAoZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgY29uc3QgY3VycmVudENvbW1lbnRzID0gZG9jU25hcC5kYXRhKCkubnVtYmVyT2ZDb21tZW50cyArIDE7XG4gICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmLCB7XG4gICAgICAgIG51bWJlck9mQ29tbWVudHM6IGN1cnJlbnRDb21tZW50cyxcbiAgICAgICAgY29tbWVudHM6IGFycmF5VW5pb24oY29tbWVudElkKSxcbiAgICAgICAgY29tbWVudGVkQnk6IGFycmF5VW5pb24oXG4gICAgICAgICAgY29tbWVudGVySWRlbnRpdHkgPT09IFwiTmFtZVwiID8gc2Vzc2lvbi51c2VyLm5hbWUgOiBcIkFub255bW91c1wiXG4gICAgICAgICksXG4gICAgICB9KTtcbiAgICAgIHNldENvbW1lbnRDb3VudChjdXJyZW50Q29tbWVudHMpO1xuICAgIH1cblxuICAgIC8vQWRkIG5vdGlmaWNhdGlvbiB0byBhdXRob3Igb2YgcXVlc3Rpb25cbiAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihxdWVzdGlvbi5hdXRob3JJZCk7XG4gICAgaWYgKHF1ZXN0aW9uLmF1dGhvcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWZVc2VyLCB7XG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5VW5pb24oe1xuICAgICAgICAgIGlkOiBgJHtjb21tZW50SWR9LSR7cXVlc3Rpb24uaWR9LSR7cXVlc3Rpb24uYXV0aG9ySWR9YCxcbiAgICAgICAgICB0ZXh0OiBgJHtcbiAgICAgICAgICAgIGNvbW1lbnRlcklkZW50aXR5ID09PSBcIk5hbWVcIiA/IHNlc3Npb24udXNlci5uYW1lIDogXCJBbm9ueW1vdXNcIlxuICAgICAgICAgIH0gY29tbWVudGVkIG9uIHlvdXIgcG9zdCAtICR7cXVlc3Rpb24udGl0bGV9YCxcbiAgICAgICAgICB1bnJlYWQ6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICBzZXRDb21tZW50VGV4dChcIlwiKTtcbiAgfTtcblxuICBjb25zdCBvbkRlbGV0ZUNvbW1lbnQgPSBhc3luYyAoY29tbWVudDogQ29tbWVudCkgPT4ge1xuICAgIGlmIChzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tbWVudERvY1JlZiA9IGRvYyhkYiwgXCJjb21tZW50c1wiLCBjb21tZW50LmlkKTtcbiAgICAgICAgYXdhaXQgZGVsZXRlRG9jKGNvbW1lbnREb2NSZWYpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgY29tbWVudDpcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgICAgY29uc3QgZG9jUmVmID0gZG9jKHF1ZXN0aW9uUmVmLCBjb21tZW50LnF1ZXN0aW9uSWQpO1xuICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWYpO1xuXG4gICAgICBpZiAoZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgICBpZiAoZG9jU25hcC5kYXRhKCkubnVtYmVyT2ZDb21tZW50cyA9PT0gMCkge1xuICAgICAgICAgIHNldENvbW1lbnRDb3VudCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q29tbWVudHMgPSBkb2NTbmFwLmRhdGEoKS5udW1iZXJPZkNvbW1lbnRzIC0gMTtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmLCB7XG4gICAgICAgICAgICBudW1iZXJPZkNvbW1lbnRzOiBjdXJyZW50Q29tbWVudHMsXG4gICAgICAgICAgICBjb21tZW50czogYXJyYXlSZW1vdmUoY29tbWVudC5jb21tZW50SWQpLFxuICAgICAgICAgICAgY29tbWVudGVkQnk6IGFycmF5UmVtb3ZlKGNvbW1lbnQuY29tbWVudGVySWRlbnRpdHkpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldENvbW1lbnRDb3VudChjdXJyZW50Q29tbWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9SZW1vdmUgbm90aWZpY2F0aW9uIGZyb20gYXV0aG9yIG9mIHF1ZXN0aW9uXG4gICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKGRvY1NuYXAuZGF0YSgpLmF1dGhvcklkKTtcbiAgICAgICAgaWYgKGRvY1NuYXAuZGF0YSgpLmF1dGhvcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICBjb25zdCB1c2VyU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWZVc2VyKTtcbiAgICAgICAgICBpZiAodXNlclNuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSB1c2VyU25hcC5kYXRhKCkubm90aWZpY2F0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblRvUmVtb3ZlID0gbm90aWZpY2F0aW9ucy5maW5kKFxuICAgICAgICAgICAgICAobm90aWZpY2F0aW9uKSA9PlxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5pZCA9PT1cbiAgICAgICAgICAgICAgICBgJHtjb21tZW50LmNvbW1lbnRJZH0tJHtjb21tZW50LnF1ZXN0aW9uSWR9LSR7XG4gICAgICAgICAgICAgICAgICBkb2NTbmFwLmRhdGEoKS5hdXRob3JJZFxuICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvblRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWZVc2VyLCB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczogYXJyYXlSZW1vdmUobm90aWZpY2F0aW9uVG9SZW1vdmUpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgb25DcmVhdGVDb21tZW50LCBvbkRlbGV0ZUNvbW1lbnQsIGxvYWRpbmcgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZUFuZERlbGV0ZUNvbW1lbnQ7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VTZXNzaW9uIiwiYWRkRG9jIiwiYXJyYXlSZW1vdmUiLCJhcnJheVVuaW9uIiwiZGVsZXRlRG9jIiwiZG9jIiwiZ2V0RG9jIiwic2VydmVyVGltZXN0YW1wIiwidXBkYXRlRG9jIiwiZGIiLCJxdWVzdGlvblJlZiIsImNvbW1lbnRSZWYiLCJ1c2VDb21tZW50Q291bnRTdG9yZSIsInVzZXJSZWYiLCJ1c2VDcmVhdGVBbmREZWxldGVDb21tZW50IiwiZGF0YSIsInNlc3Npb24iLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNldENvbW1lbnRDb3VudCIsInN0YXRlIiwib25DcmVhdGVDb21tZW50IiwiY29tbWVudFRleHQiLCJxdWVzdGlvbiIsInNldENvbW1lbnRUZXh0IiwiY29tbWVudGVySWRlbnRpdHkiLCJ1c2VyIiwiaWQiLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb21tZW50SWQiLCJuZXdDb21tZW50IiwiYXV0aG9ySWQiLCJhdXRob3IiLCJuYW1lIiwicXVlc3Rpb25JZCIsInF1ZXN0aW9uVGl0bGUiLCJ0aXRsZSIsInRleHQiLCJjcmVhdGVkQXQiLCJudW1iZXJPZkxpa2VzIiwibGlrZWRCeSIsImRvY1JlZiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImRvY1NuYXAiLCJleGlzdHMiLCJjdXJyZW50Q29tbWVudHMiLCJudW1iZXJPZkNvbW1lbnRzIiwiY29tbWVudHMiLCJjb21tZW50ZWRCeSIsImRvY1JlZlVzZXIiLCJub3RpZmljYXRpb25zIiwidW5yZWFkIiwib25EZWxldGVDb21tZW50IiwiY29tbWVudCIsImNvbW1lbnREb2NSZWYiLCJ1c2VyU25hcCIsIm5vdGlmaWNhdGlvblRvUmVtb3ZlIiwiZmluZCIsIm5vdGlmaWNhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useCreateComment.ts\n"));

/***/ })

});