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

/***/ "(app-pages-browser)/./hooks/useCheckLikes.ts":
/*!********************************!*\
  !*** ./hooks/useCheckLikes.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/store */ \"(app-pages-browser)/./store/store.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var _lib_converters_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/converters/User */ \"(app-pages-browser)/./lib/converters/User.ts\");\n\n\n\n\n\n\nconst useCheckLikes = (question, comment)=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();\n    const [isQuestionLiked, setIsQuestionLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [isCommentLiked, setIsCommentLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const setLikeQuestionCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeQuestionCountStore)((state)=>state.setLikeQuestionCount);\n    const setLikeCommentCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeCommentCountStore)((state)=>state.setLikeCommentCount);\n    const checkIfQuestionLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedQuestions;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedQuestions = docSnap.data().likedQuestions) === null || _docSnap_data_likedQuestions === void 0 ? void 0 : _docSnap_data_likedQuestions.includes(question === null || question === void 0 ? void 0 : question.id))) {\n                setIsQuestionLiked(true);\n            } else {\n                setIsQuestionLiked(false);\n            }\n        }\n    };\n    const checkIfCommentLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedComments;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedComments = docSnap.data().likedComments) === null || _docSnap_data_likedComments === void 0 ? void 0 : _docSnap_data_likedComments.includes(comment === null || comment === void 0 ? void 0 : comment.id))) {\n                setIsCommentLiked(true);\n            } else {\n                setIsCommentLiked(false);\n            }\n        }\n    };\n    const handleQuestionLikeCheck = async (questionId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const userDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(userDocRef);\n            if (userDocSnap.exists()) {\n                const userData = userDocSnap.data();\n                const questionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"questions\", questionId);\n                const questionDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(questionRef);\n                if (questionDocSnap.exists()) {\n                    var _userData_likedQuestions;\n                    const questionData = questionDocSnap.data();\n                    const notificationId = \"\".concat(questionId, \"-\").concat(questionData.authorId);\n                    if ((_userData_likedQuestions = userData.likedQuestions) === null || _userData_likedQuestions === void 0 ? void 0 : _userData_likedQuestions.includes(questionId)) {\n                        // Unlike the question\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(questionId)\n                        });\n                        setIsQuestionLiked(false);\n                        let currentLikes = questionData.numberOfLikes;\n                        currentLikes--;\n                        // Remove like notification\n                        if (questionData.authorId !== session.user.id) {\n                            const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(questionData.authorId);\n                            const authorSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRefUser);\n                            if (authorSnap.exists()) {\n                                const notifications = authorSnap.data().notifications || [];\n                                const notificationToRemove = notifications.find((notification)=>notification.id === notificationId);\n                                if (notificationToRemove) {\n                                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                        notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(notificationToRemove)\n                                    });\n                                }\n                            }\n                        }\n                        // Update question like count and likedBy\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                            numberOfLikes: currentLikes,\n                            likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session.user.name)\n                        });\n                        setLikeQuestionCount(currentLikes);\n                    } else {\n                        // Like the question\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(questionId)\n                        });\n                        setIsQuestionLiked(true);\n                        let currentLikes = questionData.numberOfLikes;\n                        currentLikes++;\n                        // Add like notification\n                        if (questionData.authorId !== session.user.id) {\n                            const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(questionData.authorId);\n                            const newNotification = {\n                                id: notificationId,\n                                text: \"\".concat(session.user.name, \" liked your post - \").concat(questionData.title),\n                                unread: true\n                            };\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(newNotification)\n                            });\n                        }\n                        // Update question like count and likedBy\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                            numberOfLikes: currentLikes,\n                            likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session.user.name)\n                        });\n                        setLikeQuestionCount(currentLikes);\n                    }\n                }\n            }\n        }\n    };\n    const handleCommentLikeCheck = async (commentId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const userDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(userDocRef);\n            if (userDocSnap.exists()) {\n                const userData = userDocSnap.data();\n                const commentRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"comments\", commentId);\n                const commentDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(commentRef);\n                if (commentDocSnap.exists()) {\n                    var _userData_likedComments, _userData_likedComments1;\n                    const commentData = commentDocSnap.data();\n                    let currentLikes = commentData.numberOfLikes;\n                    const notificationId = \"\".concat(commentId, \"-\").concat(commentData.authorId);\n                    if ((_userData_likedComments = userData.likedComments) === null || _userData_likedComments === void 0 ? void 0 : _userData_likedComments.includes(commentId)) {\n                        // Unlike the comment\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(commentId)\n                        });\n                        setIsCommentLiked(false);\n                        currentLikes--;\n                        // Remove like notification\n                        if (commentData.authorId !== session.user.id) {\n                            const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                            const authorSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRefUser);\n                            if (authorSnap.exists()) {\n                                const notifications = authorSnap.data().notifications || [];\n                                const notificationToRemove = notifications.find((notification)=>notification.id === notificationId);\n                                if (notificationToRemove) {\n                                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                        notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(notificationToRemove)\n                                    });\n                                }\n                            }\n                        }\n                    } else {\n                        // Like the comment\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(commentId)\n                        });\n                        setIsCommentLiked(true);\n                        currentLikes++;\n                        // Add like notification\n                        if (commentData.authorId !== session.user.id) {\n                            const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                            const newNotification = {\n                                id: notificationId,\n                                text: \"\".concat(session.user.name, \" liked your comment\"),\n                                unread: true\n                            };\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(newNotification)\n                            });\n                        }\n                    }\n                    // Update comment like count and likedBy\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(commentRef, {\n                        numberOfLikes: currentLikes,\n                        likedBy: ((_userData_likedComments1 = userData.likedComments) === null || _userData_likedComments1 === void 0 ? void 0 : _userData_likedComments1.includes(commentId)) ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session.user.name) : (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session.user.name)\n                    });\n                    // Update local state\n                    setLikeCommentCount(currentLikes);\n                }\n            }\n        }\n    };\n    return {\n        checkIfQuestionLiked,\n        checkIfCommentLiked,\n        handleQuestionLikeCheck,\n        handleCommentLikeCheck,\n        isQuestionLiked,\n        isCommentLiked,\n        setIsCommentLiked\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCheckLikes);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZUNoZWNrTGlrZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWlDO0FBSVY7QUFPSztBQUVpQjtBQUNiO0FBQ2dCO0FBRWhELE1BQU1XLGdCQUFnQixDQUFDQyxVQUFxQkM7SUFDMUMsTUFBTSxFQUFFQyxNQUFNQyxPQUFPLEVBQUUsR0FBR1AsMkRBQVVBO0lBRXBDLE1BQU0sQ0FBQ1EsaUJBQWlCQyxtQkFBbUIsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQ2tCLGdCQUFnQkMsa0JBQWtCLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUVyRCxNQUFNb0IsdUJBQXVCbEIsdUVBQXlCQSxDQUNwRCxDQUFDbUIsUUFBVUEsTUFBTUQsb0JBQW9CO0lBRXZDLE1BQU1FLHNCQUFzQnJCLHNFQUF3QkEsQ0FDbEQsQ0FBQ29CLFFBQVVBLE1BQU1DLG1CQUFtQjtJQUd0QyxNQUFNQyx1QkFBdUI7WUFDdkJSO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEsY0FBZVUsRUFBRSxFQUFFO2dCQU1uQkM7WUFMRixNQUFNQyxTQUFTdEIsdURBQUdBLENBQUNJLHlDQUFFQSxFQUFFLFNBQVNNLFFBQVFTLElBQUksQ0FBQ0MsRUFBRTtZQUMvQyxNQUFNQyxVQUFVLE1BQU1wQiwwREFBTUEsQ0FBQ3FCO1lBRTdCLElBQ0VELFFBQVFFLE1BQU0sUUFDZEYsK0JBQUFBLFFBQVFaLElBQUksR0FBR2UsY0FBYyxjQUE3QkgsbURBQUFBLDZCQUErQkksUUFBUSxDQUFDbEIscUJBQUFBLCtCQUFBQSxTQUFVYSxFQUFFLElBQ3BEO2dCQUNBUixtQkFBbUI7WUFDckIsT0FBTztnQkFDTEEsbUJBQW1CO1lBQ3JCO1FBQ0Y7SUFDRjtJQUVBLE1BQU1jLHNCQUFzQjtZQUN0QmhCO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEs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TVcsa0JBQWtCO2dDQUN0QjVCLElBQUlnQjtnQ0FDSmEsTUFBTSxHQUFxQixPQUFsQnZDLFFBQVFTLElBQUksQ0FBQzRCLElBQUksRUFBQztnQ0FDM0JJLFFBQVE7NEJBQ1Y7NEJBQ0EsTUFBTWpELDZEQUFTQSxDQUFDc0MsWUFBWTtnQ0FDMUJFLGVBQWUzQyw4REFBVUEsQ0FBQ2lEOzRCQUM1Qjt3QkFDRjtvQkFDRjtvQkFFQSx3Q0FBd0M7b0JBQ3hDLE1BQU05Qyw2REFBU0EsQ0FBQ29ELFlBQVk7d0JBQzFCZixlQUFlRDt3QkFDZlEsU0FBU2QsRUFBQUEsMkJBQUFBLFNBQVNMLGFBQWEsY0FBdEJLLCtDQUFBQSx5QkFBd0JQLFFBQVEsQ0FBQzRCLGNBQ3RDdkQsK0RBQVdBLENBQUNZLFFBQVFTLElBQUksQ0FBQzRCLElBQUksSUFDN0JoRCw4REFBVUEsQ0FBQ1csUUFBUVMsSUFBSSxDQUFDNEIsSUFBSTtvQkFDbEM7b0JBRUEscUJBQXFCO29CQUNyQjlCLG9CQUFvQnFCO2dCQUN0QjtZQUNGO1FBQ0Y7SUFDRjtJQUVBLE9BQU87UUFDTHBCO1FBQ0FRO1FBQ0FFO1FBQ0F3QjtRQUNBekM7UUFDQUU7UUFDQUM7SUFDRjtBQUNGO0FBRUEsK0RBQWVSLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlQ2hlY2tMaWtlcy50cz8zNGU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICB1c2VMaWtlQ29tbWVudENvdW50U3RvcmUsXG4gIHVzZUxpa2VRdWVzdGlvbkNvdW50U3RvcmUsXG59IGZyb20gXCJAL3N0b3JlL3N0b3JlXCI7XG5pbXBvcnQge1xuICBhcnJheVJlbW92ZSxcbiAgYXJyYXlVbmlvbixcbiAgZG9jLFxuICBnZXREb2MsXG4gIHVwZGF0ZURvYyxcbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgQ29tbWVudCwgUXVlc3Rpb24gfSBmcm9tIFwiQC90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvZmlyZWJhc2VcIjtcbmltcG9ydCB7IHVzZXJSZWYgfSBmcm9tIFwiQC9saWIvY29udmVydGVycy9Vc2VyXCI7XG5cbmNvbnN0IHVzZUNoZWNrTGlrZXMgPSAocXVlc3Rpb24/OiBRdWVzdGlvbiwgY29tbWVudD86IENvbW1lbnQpID0+IHtcbiAgY29uc3QgeyBkYXRhOiBzZXNzaW9uIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgY29uc3QgW2lzUXVlc3Rpb25MaWtlZCwgc2V0SXNRdWVzdGlvbkxpa2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQ29tbWVudExpa2VkLCBzZXRJc0NvbW1lbnRMaWtlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgc2V0TGlrZVF1ZXN0aW9uQ291bnQgPSB1c2VMaWtlUXVlc3Rpb25Db3VudFN0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0TGlrZVF1ZXN0aW9uQ291bnRcbiAgKTtcbiAgY29uc3Qgc2V0TGlrZUNvbW1lbnRDb3VudCA9IHVzZUxpa2VDb21tZW50Q291bnRTdG9yZShcbiAgICAoc3RhdGUpID0+IHN0YXRlLnNldExpa2VDb21tZW50Q291bnRcbiAgKTtcblxuICBjb25zdCBjaGVja0lmUXVlc3Rpb25MaWtlZCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgXCJ1c2Vyc1wiLCBzZXNzaW9uLnVzZXIuaWQpO1xuICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWYpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGRvY1NuYXAuZXhpc3RzKCkgJiZcbiAgICAgICAgZG9jU25hcC5kYXRhKCkubGlrZWRRdWVzdGlvbnM/LmluY2x1ZGVzKHF1ZXN0aW9uPy5pZClcbiAgICAgICkge1xuICAgICAgICBzZXRJc1F1ZXN0aW9uTGlrZWQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc1F1ZXN0aW9uTGlrZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0lmQ29tbWVudExpa2VkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgY29uc3QgZG9jUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHNlc3Npb24udXNlci5pZCk7XG4gICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKGRvY1JlZik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZG9jU25hcC5leGlzdHMoKSAmJlxuICAgICAgICBkb2NTbmFwLmRhdGEoKS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50Py5pZClcbiAgICAgICkge1xuICAgICAgICBzZXRJc0NvbW1lbnRMaWtlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzQ29tbWVudExpa2VkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUXVlc3Rpb25MaWtlQ2hlY2sgPSBhc3luYyAocXVlc3Rpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICBjb25zdCB1c2VyRG9jUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHNlc3Npb24udXNlci5pZCk7XG4gICAgICBjb25zdCB1c2VyRG9jU25hcCA9IGF3YWl0IGdldERvYyh1c2VyRG9jUmVmKTtcblxuICAgICAgaWYgKHVzZXJEb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdXNlckRvY1NuYXAuZGF0YSgpO1xuICAgICAgICBjb25zdCBxdWVzdGlvblJlZiA9IGRvYyhkYiwgXCJxdWVzdGlvbnNcIiwgcXVlc3Rpb25JZCk7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uRG9jU25hcCA9IGF3YWl0IGdldERvYyhxdWVzdGlvblJlZik7XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uRG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uRGF0YSA9IHF1ZXN0aW9uRG9jU25hcC5kYXRhKCk7XG4gICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uSWQgPSBgJHtxdWVzdGlvbklkfS0ke3F1ZXN0aW9uRGF0YS5hdXRob3JJZH1gO1xuXG4gICAgICAgICAgaWYgKHVzZXJEYXRhLmxpa2VkUXVlc3Rpb25zPy5pbmNsdWRlcyhxdWVzdGlvbklkKSkge1xuICAgICAgICAgICAgLy8gVW5saWtlIHRoZSBxdWVzdGlvblxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHVzZXJEb2NSZWYsIHtcbiAgICAgICAgICAgICAgbGlrZWRRdWVzdGlvbnM6IGFycmF5UmVtb3ZlKHF1ZXN0aW9uSWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRJc1F1ZXN0aW9uTGlrZWQoZmFsc2UpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRMaWtlcyA9IHF1ZXN0aW9uRGF0YS5udW1iZXJPZkxpa2VzO1xuICAgICAgICAgICAgY3VycmVudExpa2VzLS07XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBsaWtlIG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uRGF0YS5hdXRob3JJZCAhPT0gc2Vzc2lvbi51c2VyLmlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKHF1ZXN0aW9uRGF0YS5hdXRob3JJZCk7XG4gICAgICAgICAgICAgIGNvbnN0IGF1dGhvclNuYXAgPSBhd2FpdCBnZXREb2MoZG9jUmVmVXNlcik7XG4gICAgICAgICAgICAgIGlmIChhdXRob3JTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9ucyA9IGF1dGhvclNuYXAuZGF0YSgpLm5vdGlmaWNhdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uVG9SZW1vdmUgPSBub3RpZmljYXRpb25zLmZpbmQoXG4gICAgICAgICAgICAgICAgICAobm90aWZpY2F0aW9uKSA9PiBub3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbklkXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uVG9SZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWZVc2VyLCB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5UmVtb3ZlKG5vdGlmaWNhdGlvblRvUmVtb3ZlKSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcXVlc3Rpb24gbGlrZSBjb3VudCBhbmQgbGlrZWRCeVxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHF1ZXN0aW9uUmVmLCB7XG4gICAgICAgICAgICAgIG51bWJlck9mTGlrZXM6IGN1cnJlbnRMaWtlcyxcbiAgICAgICAgICAgICAgbGlrZWRCeTogYXJyYXlSZW1vdmUoc2Vzc2lvbi51c2VyLm5hbWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaWtlUXVlc3Rpb25Db3VudChjdXJyZW50TGlrZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMaWtlIHRoZSBxdWVzdGlvblxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHVzZXJEb2NSZWYsIHtcbiAgICAgICAgICAgICAgbGlrZWRRdWVzdGlvbnM6IGFycmF5VW5pb24ocXVlc3Rpb25JZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldElzUXVlc3Rpb25MaWtlZCh0cnVlKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBxdWVzdGlvbkRhdGEubnVtYmVyT2ZMaWtlcztcbiAgICAgICAgICAgIGN1cnJlbnRMaWtlcysrO1xuXG4gICAgICAgICAgICAvLyBBZGQgbGlrZSBub3RpZmljYXRpb25cbiAgICAgICAgICAgIGlmIChxdWVzdGlvbkRhdGEuYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihxdWVzdGlvbkRhdGEuYXV0aG9ySWQpO1xuICAgICAgICAgICAgICBjb25zdCBuZXdOb3RpZmljYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgaWQ6IG5vdGlmaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgIHRleHQ6IGAke3Nlc3Npb24udXNlci5uYW1lfSBsaWtlZCB5b3VyIHBvc3QgLSAke3F1ZXN0aW9uRGF0YS50aXRsZX1gLFxuICAgICAgICAgICAgICAgIHVucmVhZDogdHJ1ZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZlVzZXIsIHtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiBhcnJheVVuaW9uKG5ld05vdGlmaWNhdGlvbiksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcXVlc3Rpb24gbGlrZSBjb3VudCBhbmQgbGlrZWRCeVxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHF1ZXN0aW9uUmVmLCB7XG4gICAgICAgICAgICAgIG51bWJlck9mTGlrZXM6IGN1cnJlbnRMaWtlcyxcbiAgICAgICAgICAgICAgbGlrZWRCeTogYXJyYXlVbmlvbihzZXNzaW9uLnVzZXIubmFtZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpa2VRdWVzdGlvbkNvdW50KGN1cnJlbnRMaWtlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbW1lbnRMaWtlQ2hlY2sgPSBhc3luYyAoY29tbWVudElkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IHVzZXJEb2NSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgc2Vzc2lvbi51c2VyLmlkKTtcbiAgICAgIGNvbnN0IHVzZXJEb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHVzZXJEb2NSZWYpO1xuXG4gICAgICBpZiAodXNlckRvY1NuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB1c2VyRG9jU25hcC5kYXRhKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRSZWYgPSBkb2MoZGIsIFwiY29tbWVudHNcIiwgY29tbWVudElkKTtcbiAgICAgICAgY29uc3QgY29tbWVudERvY1NuYXAgPSBhd2FpdCBnZXREb2MoY29tbWVudFJlZik7XG5cbiAgICAgICAgaWYgKGNvbW1lbnREb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgY29uc3QgY29tbWVudERhdGEgPSBjb21tZW50RG9jU25hcC5kYXRhKCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaWtlcyA9IGNvbW1lbnREYXRhLm51bWJlck9mTGlrZXM7XG4gICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uSWQgPSBgJHtjb21tZW50SWR9LSR7Y29tbWVudERhdGEuYXV0aG9ySWR9YDtcblxuICAgICAgICAgIGlmICh1c2VyRGF0YS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50SWQpKSB7XG4gICAgICAgICAgICAvLyBVbmxpa2UgdGhlIGNvbW1lbnRcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyh1c2VyRG9jUmVmLCB7XG4gICAgICAgICAgICAgIGxpa2VkQ29tbWVudHM6IGFycmF5UmVtb3ZlKGNvbW1lbnRJZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldElzQ29tbWVudExpa2VkKGZhbHNlKTtcbiAgICAgICAgICAgIGN1cnJlbnRMaWtlcy0tO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgbGlrZSBub3RpZmljYXRpb25cbiAgICAgICAgICAgIGlmIChjb21tZW50RGF0YS5hdXRob3JJZCAhPT0gc2Vzc2lvbi51c2VyLmlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKGNvbW1lbnREYXRhLmF1dGhvcklkKTtcbiAgICAgICAgICAgICAgY29uc3QgYXV0aG9yU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWZVc2VyKTtcbiAgICAgICAgICAgICAgaWYgKGF1dGhvclNuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25zID0gYXV0aG9yU25hcC5kYXRhKCkubm90aWZpY2F0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25Ub1JlbW92ZSA9IG5vdGlmaWNhdGlvbnMuZmluZChcbiAgICAgICAgICAgICAgICAgIChub3RpZmljYXRpb24pID0+IG5vdGlmaWNhdGlvbi5pZCA9PT0gbm90aWZpY2F0aW9uSWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb25Ub1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZlVzZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczogYXJyYXlSZW1vdmUobm90aWZpY2F0aW9uVG9SZW1vdmUpLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIExpa2UgdGhlIGNvbW1lbnRcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyh1c2VyRG9jUmVmLCB7XG4gICAgICAgICAgICAgIGxpa2VkQ29tbWVudHM6IGFycmF5VW5pb24oY29tbWVudElkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SXNDb21tZW50TGlrZWQodHJ1ZSk7XG4gICAgICAgICAgICBjdXJyZW50TGlrZXMrKztcblxuICAgICAgICAgICAgLy8gQWRkIGxpa2Ugbm90aWZpY2F0aW9uXG4gICAgICAgICAgICBpZiAoY29tbWVudERhdGEuYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihjb21tZW50RGF0YS5hdXRob3JJZCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld05vdGlmaWNhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpZDogbm90aWZpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgdGV4dDogYCR7c2Vzc2lvbi51c2VyLm5hbWV9IGxpa2VkIHlvdXIgY29tbWVudGAsXG4gICAgICAgICAgICAgICAgdW5yZWFkOiB0cnVlLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5VW5pb24obmV3Tm90aWZpY2F0aW9uKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVXBkYXRlIGNvbW1lbnQgbGlrZSBjb3VudCBhbmQgbGlrZWRCeVxuICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhjb21tZW50UmVmLCB7XG4gICAgICAgICAgICBudW1iZXJPZkxpa2VzOiBjdXJyZW50TGlrZXMsXG4gICAgICAgICAgICBsaWtlZEJ5OiB1c2VyRGF0YS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50SWQpXG4gICAgICAgICAgICAgID8gYXJyYXlSZW1vdmUoc2Vzc2lvbi51c2VyLm5hbWUpXG4gICAgICAgICAgICAgIDogYXJyYXlVbmlvbihzZXNzaW9uLnVzZXIubmFtZSksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGVcbiAgICAgICAgICBzZXRMaWtlQ29tbWVudENvdW50KGN1cnJlbnRMaWtlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjaGVja0lmUXVlc3Rpb25MaWtlZCxcbiAgICBjaGVja0lmQ29tbWVudExpa2VkLFxuICAgIGhhbmRsZVF1ZXN0aW9uTGlrZUNoZWNrLFxuICAgIGhhbmRsZUNvbW1lbnRMaWtlQ2hlY2ssXG4gICAgaXNRdWVzdGlvbkxpa2VkLFxuICAgIGlzQ29tbWVudExpa2VkLFxuICAgIHNldElzQ29tbWVudExpa2VkLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ2hlY2tMaWtlcztcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUxpa2VDb21tZW50Q291bnRTdG9yZSIsInVzZUxpa2VRdWVzdGlvbkNvdW50U3RvcmUiLCJhcnJheVJlbW92ZSIsImFycmF5VW5pb24iLCJkb2MiLCJnZXREb2MiLCJ1cGRhdGVEb2MiLCJ1c2VTZXNzaW9uIiwiZGIiLCJ1c2VyUmVmIiwidXNlQ2hlY2tMaWtlcyIsInF1ZXN0aW9uIiwiY29tbWVudCIsImRhdGEiLCJzZXNzaW9uIiwiaXNRdWVzdGlvbkxpa2VkIiwic2V0SXNRdWVzdGlvbkxpa2VkIiwiaXNDb21tZW50TGlrZWQiLCJzZXRJc0NvbW1lbnRMaWtlZCIsInNldExpa2VRdWVzdGlvbkNvdW50Iiwic3RhdGUiLCJzZXRMaWtlQ29tbWVudENvdW50IiwiY2hlY2tJZlF1ZXN0aW9uTGlrZWQiLCJ1c2VyIiwiaWQiLCJkb2NTbmFwIiwiZG9jUmVmIiwiZXhpc3RzIiwibGlrZWRRdWVzdGlvbnMiLCJpbmNsdWRlcyIsImNoZWNrSWZDb21tZW50TGlrZWQiLCJsaWtlZENvbW1lbnRzIiwiaGFuZGxlUXVlc3Rpb25MaWtlQ2hlY2siLCJxdWVzdGlvbklkIiwidXNlckRvY1JlZiIsInVzZXJEb2NTbmFwIiwidXNlckRhdGEiLCJxdWVzdGlvblJlZiIsInF1ZXN0aW9uRG9jU25hcCIsInF1ZXN0aW9uRGF0YSIsIm5vdGlmaWNhdGlvbklkIiwiYXV0aG9ySWQiLCJjdXJyZW50TGlrZXMiLCJudW1iZXJPZkxpa2VzIiwiZG9jUmVmVXNlciIsImF1dGhvclNuYXAiLCJub3RpZmljYXRpb25zIiwibm90aWZpY2F0aW9uVG9SZW1vdmUiLCJmaW5kIiwibm90aWZpY2F0aW9uIiwibGlrZWRCeSIsIm5hbWUiLCJuZXdOb3RpZmljYXRpb24iLCJ0ZXh0IiwidGl0bGUiLCJ1bnJlYWQiLCJoYW5kbGVDb21tZW50TGlrZUNoZWNrIiwiY29tbWVudElkIiwiY29tbWVudFJlZiIsImNvbW1lbnREb2NTbmFwIiwiY29tbWVudERhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useCheckLikes.ts\n"));

/***/ })

});