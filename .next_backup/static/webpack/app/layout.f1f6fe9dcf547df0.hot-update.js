"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./hooks/useCheckLikes.ts":
/*!********************************!*\
  !*** ./hooks/useCheckLikes.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/store */ \"(app-pages-browser)/./store/store.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var _lib_converters_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/converters/User */ \"(app-pages-browser)/./lib/converters/User.ts\");\n\n\n\n\n\n\nconst useCheckLikes = (question, comment)=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();\n    const [isQuestionLiked, setIsQuestionLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [isCommentLiked, setIsCommentLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const setLikeQuestionCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeQuestionCountStore)((state)=>state.setLikeQuestionCount);\n    const setLikeCommentCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeCommentCountStore)((state)=>state.setLikeCommentCount);\n    const checkIfQuestionLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedQuestions;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedQuestions = docSnap.data().likedQuestions) === null || _docSnap_data_likedQuestions === void 0 ? void 0 : _docSnap_data_likedQuestions.includes(question === null || question === void 0 ? void 0 : question.id))) {\n                setIsQuestionLiked(true);\n            } else {\n                setIsQuestionLiked(false);\n            }\n        }\n    };\n    const checkIfCommentLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedComments;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedComments = docSnap.data().likedComments) === null || _docSnap_data_likedComments === void 0 ? void 0 : _docSnap_data_likedComments.includes(comment === null || comment === void 0 ? void 0 : comment.id))) {\n                setIsCommentLiked(true);\n            } else {\n                setIsCommentLiked(false);\n            }\n        }\n    };\n    const handleQuestionLikeCheck = async (questionId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _session_user1;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists()) {\n                var _userData_likedQuestions;\n                const userData = docSnap.data();\n                //Check if question is already liked and remove it from array\n                if (userData === null || userData === void 0 ? void 0 : (_userData_likedQuestions = userData.likedQuestions) === null || _userData_likedQuestions === void 0 ? void 0 : _userData_likedQuestions.includes(questionId)) {\n                    var _docSnap_data, _docSnap_data1;\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                        likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(questionId)\n                    });\n                    setIsQuestionLiked(false);\n                    const questionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"questions\", questionId);\n                    const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(questionRef);\n                    if (docSnap.exists()) {\n                        var _docSnap_data2;\n                        if (((_docSnap_data2 = docSnap.data()) === null || _docSnap_data2 === void 0 ? void 0 : _docSnap_data2.numberOfLikes) === 0) {\n                            setLikeQuestionCount(0);\n                        } else {\n                            var _session_user2;\n                            const questionData = docSnap.data();\n                            const currentLikes = (questionData === null || questionData === void 0 ? void 0 : questionData.numberOfLikes) - 1;\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                                numberOfLikes: currentLikes,\n                                likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session === null || session === void 0 ? void 0 : (_session_user2 = session.user) === null || _session_user2 === void 0 ? void 0 : _session_user2.name)\n                            });\n                            setLikeQuestionCount(currentLikes);\n                            console.log(\"Question removed from array\");\n                        }\n                    }\n                    //Remove notification from author of question\n                    const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)((_docSnap_data = docSnap.data()) === null || _docSnap_data === void 0 ? void 0 : _docSnap_data.authorId);\n                    if (((_docSnap_data1 = docSnap.data()) === null || _docSnap_data1 === void 0 ? void 0 : _docSnap_data1.authorId) !== session.user.id) {\n                        var _docSnap_data3;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                            notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)({\n                                id: \"\".concat(questionId, \"-\").concat((_docSnap_data3 = docSnap.data()) === null || _docSnap_data3 === void 0 ? void 0 : _docSnap_data3.authorId),\n                                text: \"\".concat(session.user.name, \" liked your post - \").concat(question === null || question === void 0 ? void 0 : question.title),\n                                read: false\n                            })\n                        });\n                    }\n                } else {\n                    var _docSnap_data4, _docSnap_data5;\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                        likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(questionId)\n                    });\n                    setIsQuestionLiked(true);\n                    const questionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"questions\", questionId);\n                    const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(questionRef);\n                    if (docSnap.exists()) {\n                        var _session_user3;\n                        const questionData = docSnap.data();\n                        const currentLikes = (questionData === null || questionData === void 0 ? void 0 : questionData.numberOfLikes) + 1;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                            numberOfLikes: currentLikes,\n                            likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session === null || session === void 0 ? void 0 : (_session_user3 = session.user) === null || _session_user3 === void 0 ? void 0 : _session_user3.name)\n                        });\n                        setLikeQuestionCount(currentLikes);\n                        console.log(\"Question added to array\");\n                    }\n                    //Add notification to author of question\n                    const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)((_docSnap_data4 = docSnap.data()) === null || _docSnap_data4 === void 0 ? void 0 : _docSnap_data4.authorId);\n                    if (((_docSnap_data5 = docSnap.data()) === null || _docSnap_data5 === void 0 ? void 0 : _docSnap_data5.authorId) !== session.user.id) {\n                        var _docSnap_data6;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                            notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)({\n                                id: \"\".concat(questionId, \"-\").concat((_docSnap_data6 = docSnap.data()) === null || _docSnap_data6 === void 0 ? void 0 : _docSnap_data6.authorId),\n                                text: \"\".concat(session.user.name, \" liked your post - \").concat(question === null || question === void 0 ? void 0 : question.title),\n                                unread: true\n                            })\n                        });\n                    }\n                }\n            }\n        }\n    };\n    const handleCommentLikeCheck = async (commentId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const userDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(userDocRef);\n            if (userDocSnap.exists()) {\n                const userData = userDocSnap.data();\n                const commentRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"comments\", commentId);\n                const commentDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(commentRef);\n                if (commentDocSnap.exists()) {\n                    var _commentDocSnap_data, _userData_likedComments, _userData_likedComments1;\n                    if (((_commentDocSnap_data = commentDocSnap.data()) === null || _commentDocSnap_data === void 0 ? void 0 : _commentDocSnap_data.numberOfLikes) === 0) {\n                        setLikeCommentCount(0);\n                    }\n                    const commentData = commentDocSnap.data();\n                    let currentLikes = commentData.numberOfLikes;\n                    if ((_userData_likedComments = userData.likedComments) === null || _userData_likedComments === void 0 ? void 0 : _userData_likedComments.includes(commentId)) {\n                        // If comment is already liked, unlike it\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(commentId)\n                        });\n                        setIsCommentLiked(false);\n                        currentLikes--;\n                        //Remove notification from author of comment\n                        const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                        if (commentData.authorId !== session.user.id) {\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)({\n                                    id: \"\".concat(commentId, \"-\").concat(commentData.authorId),\n                                    text: \"\".concat(session.user.name, \" liked your comment\"),\n                                    read: false\n                                })\n                            });\n                        }\n                    } else {\n                        // If comment is not liked, like it\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(commentId)\n                        });\n                        setIsCommentLiked(true);\n                        currentLikes++;\n                        //Add notification to author of comment\n                        const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                        if (commentData.authorId !== session.user.id) {\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)({\n                                    id: \"\".concat(commentId, \"-\").concat(commentData.authorId),\n                                    text: \"\".concat(session.user.name, \" liked your comment\"),\n                                    unread: true\n                                })\n                            });\n                        }\n                    }\n                    // Update the comment's like count in Firestore\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(commentRef, {\n                        numberOfLikes: currentLikes,\n                        likedBy: ((_userData_likedComments1 = userData.likedComments) === null || _userData_likedComments1 === void 0 ? void 0 : _userData_likedComments1.includes(commentId)) ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session.user.name) : (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session.user.name)\n                    });\n                    // Update local state to reflect the new like count\n                    setLikeCommentCount(currentLikes);\n                }\n            }\n        }\n    };\n    return {\n        checkIfQuestionLiked,\n        checkIfCommentLiked,\n        handleQuestionLikeCheck,\n        handleCommentLikeCheck,\n        isQuestionLiked,\n        isCommentLiked,\n        setIsCommentLiked\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCheckLikes);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZUNoZWNrTGlrZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWlDO0FBSVY7QUFPSztBQUVpQjtBQUNiO0FBQ2dCO0FBRWhELE1BQU1XLGdCQUFnQixDQUFDQyxVQUFxQkM7SUFDMUMsTUFBTSxFQUFFQyxNQUFNQyxPQUFPLEVBQUUsR0FBR1AsMkRBQVVBO0lBRXBDLE1BQU0sQ0FBQ1EsaUJBQWlCQyxtQkFBbUIsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQ2tCLGdCQUFnQkMsa0JBQWtCLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUVyRCxNQUFNb0IsdUJBQXVCbEIsdUVBQXlCQSxDQUNwRCxDQUFDbUIsUUFBVUEsTUFBTUQsb0JBQW9CO0lBRXZDLE1BQU1FLHNCQUFzQnJCLHNFQUF3QkEsQ0FDbEQsQ0FBQ29CLFFBQVVBLE1BQU1DLG1CQUFtQjtJQUd0QyxNQUFNQyx1QkFBdUI7WUFDdkJSO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEsY0FBZVUsRUFBRSxFQUFFO2dCQU1uQkM7WUFMRixNQUFNQyxTQUFTdEIsdURBQUdBLENBQUNJLHlDQUFFQSxFQUFFLFNBQVNNLFFBQVFTLElBQUksQ0FBQ0MsRUFBRTtZQUMvQyxNQUFNQyxVQUFVLE1BQU1wQiwwREFBTUEsQ0FBQ3FCO1lBRTdCLElBQ0VELFFBQVFFLE1BQU0sUUFDZEYsK0JBQUFBLFFBQVFaLElBQUksR0FBR2UsY0FBYyxjQUE3QkgsbURBQUFBLDZCQUErQkksUUFBUSxDQUFDbEIscUJBQUFBLCtCQUFBQSxTQUFVYSxFQUFFLElBQ3BEO2dCQUNBUixtQkFBbUI7WUFDckIsT0FBTztnQkFDTEEsbUJBQW1CO1lBQ3JCO1FBQ0Y7SUFDRjtJQUVBLE1BQU1jLHNCQUFzQjtZQUN0QmhCO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEs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SSxDQUFDaUIsSUFBSSxJQUM3QnJDLDhEQUFVQSxDQUFDVyxRQUFRUyxJQUFJLENBQUNpQixJQUFJO29CQUNsQztvQkFFQSxtREFBbUQ7b0JBQ25EbkIsb0JBQW9CaUI7Z0JBQ3RCO1lBQ0Y7UUFDRjtJQUNGO0lBRUEsT0FBTztRQUNMaEI7UUFDQVE7UUFDQUU7UUFDQWtCO1FBQ0FuQztRQUNBRTtRQUNBQztJQUNGO0FBQ0Y7QUFFQSwrREFBZVIsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ob29rcy91c2VDaGVja0xpa2VzLnRzPzM0ZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIHVzZUxpa2VDb21tZW50Q291bnRTdG9yZSxcbiAgdXNlTGlrZVF1ZXN0aW9uQ291bnRTdG9yZSxcbn0gZnJvbSBcIkAvc3RvcmUvc3RvcmVcIjtcbmltcG9ydCB7XG4gIGFycmF5UmVtb3ZlLFxuICBhcnJheVVuaW9uLFxuICBkb2MsXG4gIGdldERvYyxcbiAgdXBkYXRlRG9jLFxufSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBDb21tZW50LCBRdWVzdGlvbiB9IGZyb20gXCJAL3R5cGVzL1R5cGVzXCI7XG5pbXBvcnQgeyB1c2VTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9yZWFjdFwiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9maXJlYmFzZVwiO1xuaW1wb3J0IHsgdXNlclJlZiB9IGZyb20gXCJAL2xpYi9jb252ZXJ0ZXJzL1VzZXJcIjtcblxuY29uc3QgdXNlQ2hlY2tMaWtlcyA9IChxdWVzdGlvbj86IFF1ZXN0aW9uLCBjb21tZW50PzogQ29tbWVudCkgPT4ge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcblxuICBjb25zdCBbaXNRdWVzdGlvbkxpa2VkLCBzZXRJc1F1ZXN0aW9uTGlrZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNDb21tZW50TGlrZWQsIHNldElzQ29tbWVudExpa2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBzZXRMaWtlUXVlc3Rpb25Db3VudCA9IHVzZUxpa2VRdWVzdGlvbkNvdW50U3RvcmUoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5zZXRMaWtlUXVlc3Rpb25Db3VudFxuICApO1xuICBjb25zdCBzZXRMaWtlQ29tbWVudENvdW50ID0gdXNlTGlrZUNvbW1lbnRDb3VudFN0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0TGlrZUNvbW1lbnRDb3VudFxuICApO1xuXG4gIGNvbnN0IGNoZWNrSWZRdWVzdGlvbkxpa2VkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgY29uc3QgZG9jUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHNlc3Npb24udXNlci5pZCk7XG4gICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKGRvY1JlZik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZG9jU25hcC5leGlzdHMoKSAmJlxuICAgICAgICBkb2NTbmFwLmRhdGEoKS5saWtlZFF1ZXN0aW9ucz8uaW5jbHVkZXMocXVlc3Rpb24/LmlkKVxuICAgICAgKSB7XG4gICAgICAgIHNldElzUXVlc3Rpb25MaWtlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzUXVlc3Rpb25MaWtlZChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrSWZDb21tZW50TGlrZWQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICBjb25zdCBkb2NSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgc2Vzc2lvbi51c2VyLmlkKTtcbiAgICAgIGNvbnN0IGRvY1NuYXAgPSBhd2FpdCBnZXREb2MoZG9jUmVmKTtcblxuICAgICAgaWYgKFxuICAgICAgICBkb2NTbmFwLmV4aXN0cygpICYmXG4gICAgICAgIGRvY1NuYXAuZGF0YSgpLmxpa2VkQ29tbWVudHM/LmluY2x1ZGVzKGNvbW1lbnQ/LmlkKVxuICAgICAgKSB7XG4gICAgICAgIHNldElzQ29tbWVudExpa2VkKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SXNDb21tZW50TGlrZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVRdWVzdGlvbkxpa2VDaGVjayA9IGFzeW5jIChxdWVzdGlvbklkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgXCJ1c2Vyc1wiLCBzZXNzaW9uPy51c2VyPy5pZCk7XG4gICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKGRvY1JlZik7XG5cbiAgICAgIGlmIChkb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gZG9jU25hcC5kYXRhKCk7XG4gICAgICAgIC8vQ2hlY2sgaWYgcXVlc3Rpb24gaXMgYWxyZWFkeSBsaWtlZCBhbmQgcmVtb3ZlIGl0IGZyb20gYXJyYXlcbiAgICAgICAgaWYgKHVzZXJEYXRhPy5saWtlZFF1ZXN0aW9ucz8uaW5jbHVkZXMocXVlc3Rpb25JZCkpIHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmLCB7XG4gICAgICAgICAgICBsaWtlZFF1ZXN0aW9uczogYXJyYXlSZW1vdmUocXVlc3Rpb25JZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0SXNRdWVzdGlvbkxpa2VkKGZhbHNlKTtcbiAgICAgICAgICBjb25zdCBxdWVzdGlvblJlZiA9IGRvYyhkYiwgXCJxdWVzdGlvbnNcIiwgcXVlc3Rpb25JZCk7XG4gICAgICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhxdWVzdGlvblJlZik7XG4gICAgICAgICAgaWYgKGRvY1NuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgIGlmIChkb2NTbmFwLmRhdGEoKT8ubnVtYmVyT2ZMaWtlcyA9PT0gMCkge1xuICAgICAgICAgICAgICBzZXRMaWtlUXVlc3Rpb25Db3VudCgwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uRGF0YSA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TGlrZXMgPSBxdWVzdGlvbkRhdGE/Lm51bWJlck9mTGlrZXMgLSAxO1xuXG4gICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhxdWVzdGlvblJlZiwge1xuICAgICAgICAgICAgICAgIG51bWJlck9mTGlrZXM6IGN1cnJlbnRMaWtlcyxcbiAgICAgICAgICAgICAgICBsaWtlZEJ5OiBhcnJheVJlbW92ZShzZXNzaW9uPy51c2VyPy5uYW1lKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNldExpa2VRdWVzdGlvbkNvdW50KGN1cnJlbnRMaWtlcyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb24gcmVtb3ZlZCBmcm9tIGFycmF5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vUmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIGF1dGhvciBvZiBxdWVzdGlvblxuICAgICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKGRvY1NuYXAuZGF0YSgpPy5hdXRob3JJZCk7XG4gICAgICAgICAgaWYgKGRvY1NuYXAuZGF0YSgpPy5hdXRob3JJZCAhPT0gc2Vzc2lvbi51c2VyLmlkKSB7XG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiBhcnJheVJlbW92ZSh7XG4gICAgICAgICAgICAgICAgaWQ6IGAke3F1ZXN0aW9uSWR9LSR7ZG9jU25hcC5kYXRhKCk/LmF1dGhvcklkfWAsXG4gICAgICAgICAgICAgICAgdGV4dDogYCR7c2Vzc2lvbi51c2VyLm5hbWV9IGxpa2VkIHlvdXIgcG9zdCAtICR7cXVlc3Rpb24/LnRpdGxlfWAsXG4gICAgICAgICAgICAgICAgcmVhZDogZmFsc2UsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWYsIHtcbiAgICAgICAgICAgIGxpa2VkUXVlc3Rpb25zOiBhcnJheVVuaW9uKHF1ZXN0aW9uSWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldElzUXVlc3Rpb25MaWtlZCh0cnVlKTtcbiAgICAgICAgICBjb25zdCBxdWVzdGlvblJlZiA9IGRvYyhkYiwgXCJxdWVzdGlvbnNcIiwgcXVlc3Rpb25JZCk7XG4gICAgICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhxdWVzdGlvblJlZik7XG4gICAgICAgICAgaWYgKGRvY1NuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uRGF0YSA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudExpa2VzID0gcXVlc3Rpb25EYXRhPy5udW1iZXJPZkxpa2VzICsgMTtcblxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHF1ZXN0aW9uUmVmLCB7XG4gICAgICAgICAgICAgIG51bWJlck9mTGlrZXM6IGN1cnJlbnRMaWtlcyxcbiAgICAgICAgICAgICAgbGlrZWRCeTogYXJyYXlVbmlvbihzZXNzaW9uPy51c2VyPy5uYW1lKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0TGlrZVF1ZXN0aW9uQ291bnQoY3VycmVudExpa2VzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb24gYWRkZWQgdG8gYXJyYXlcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9BZGQgbm90aWZpY2F0aW9uIHRvIGF1dGhvciBvZiBxdWVzdGlvblxuICAgICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKGRvY1NuYXAuZGF0YSgpPy5hdXRob3JJZCk7XG4gICAgICAgICAgaWYgKGRvY1NuYXAuZGF0YSgpPy5hdXRob3JJZCAhPT0gc2Vzc2lvbi51c2VyLmlkKSB7XG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiBhcnJheVVuaW9uKHtcbiAgICAgICAgICAgICAgICBpZDogYCR7cXVlc3Rpb25JZH0tJHtkb2NTbmFwLmRhdGEoKT8uYXV0aG9ySWR9YCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBgJHtzZXNzaW9uLnVzZXIubmFtZX0gbGlrZWQgeW91ciBwb3N0IC0gJHtxdWVzdGlvbj8udGl0bGV9YCxcbiAgICAgICAgICAgICAgICB1bnJlYWQ6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbW1lbnRMaWtlQ2hlY2sgPSBhc3luYyAoY29tbWVudElkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IHVzZXJEb2NSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgc2Vzc2lvbi51c2VyLmlkKTtcbiAgICAgIGNvbnN0IHVzZXJEb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHVzZXJEb2NSZWYpO1xuXG4gICAgICBpZiAodXNlckRvY1NuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB1c2VyRG9jU25hcC5kYXRhKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRSZWYgPSBkb2MoZGIsIFwiY29tbWVudHNcIiwgY29tbWVudElkKTtcbiAgICAgICAgY29uc3QgY29tbWVudERvY1NuYXAgPSBhd2FpdCBnZXREb2MoY29tbWVudFJlZik7XG5cbiAgICAgICAgaWYgKGNvbW1lbnREb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgaWYgKGNvbW1lbnREb2NTbmFwLmRhdGEoKT8ubnVtYmVyT2ZMaWtlcyA9PT0gMCkge1xuICAgICAgICAgICAgc2V0TGlrZUNvbW1lbnRDb3VudCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb21tZW50RGF0YSA9IGNvbW1lbnREb2NTbmFwLmRhdGEoKTtcbiAgICAgICAgICBsZXQgY3VycmVudExpa2VzID0gY29tbWVudERhdGEubnVtYmVyT2ZMaWtlcztcblxuICAgICAgICAgIGlmICh1c2VyRGF0YS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50SWQpKSB7XG4gICAgICAgICAgICAvLyBJZiBjb21tZW50IGlzIGFscmVhZHkgbGlrZWQsIHVubGlrZSBpdFxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHVzZXJEb2NSZWYsIHtcbiAgICAgICAgICAgICAgbGlrZWRDb21tZW50czogYXJyYXlSZW1vdmUoY29tbWVudElkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SXNDb21tZW50TGlrZWQoZmFsc2UpO1xuICAgICAgICAgICAgY3VycmVudExpa2VzLS07XG5cbiAgICAgICAgICAgIC8vUmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIGF1dGhvciBvZiBjb21tZW50XG4gICAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihjb21tZW50RGF0YS5hdXRob3JJZCk7XG4gICAgICAgICAgICBpZiAoY29tbWVudERhdGEuYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5UmVtb3ZlKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBgJHtjb21tZW50SWR9LSR7Y29tbWVudERhdGEuYXV0aG9ySWR9YCxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGAke3Nlc3Npb24udXNlci5uYW1lfSBsaWtlZCB5b3VyIGNvbW1lbnRgLFxuICAgICAgICAgICAgICAgICAgcmVhZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBjb21tZW50IGlzIG5vdCBsaWtlZCwgbGlrZSBpdFxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHVzZXJEb2NSZWYsIHtcbiAgICAgICAgICAgICAgbGlrZWRDb21tZW50czogYXJyYXlVbmlvbihjb21tZW50SWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRJc0NvbW1lbnRMaWtlZCh0cnVlKTtcbiAgICAgICAgICAgIGN1cnJlbnRMaWtlcysrO1xuXG4gICAgICAgICAgICAvL0FkZCBub3RpZmljYXRpb24gdG8gYXV0aG9yIG9mIGNvbW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGRvY1JlZlVzZXIgPSB1c2VyUmVmKGNvbW1lbnREYXRhLmF1dGhvcklkKTtcbiAgICAgICAgICAgIGlmIChjb21tZW50RGF0YS5hdXRob3JJZCAhPT0gc2Vzc2lvbi51c2VyLmlkKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWZVc2VyLCB7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczogYXJyYXlVbmlvbih7XG4gICAgICAgICAgICAgICAgICBpZDogYCR7Y29tbWVudElkfS0ke2NvbW1lbnREYXRhLmF1dGhvcklkfWAsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBgJHtzZXNzaW9uLnVzZXIubmFtZX0gbGlrZWQgeW91ciBjb21tZW50YCxcbiAgICAgICAgICAgICAgICAgIHVucmVhZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSBjb21tZW50J3MgbGlrZSBjb3VudCBpbiBGaXJlc3RvcmVcbiAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoY29tbWVudFJlZiwge1xuICAgICAgICAgICAgbnVtYmVyT2ZMaWtlczogY3VycmVudExpa2VzLFxuICAgICAgICAgICAgbGlrZWRCeTogdXNlckRhdGEubGlrZWRDb21tZW50cz8uaW5jbHVkZXMoY29tbWVudElkKVxuICAgICAgICAgICAgICA/IGFycmF5UmVtb3ZlKHNlc3Npb24udXNlci5uYW1lKVxuICAgICAgICAgICAgICA6IGFycmF5VW5pb24oc2Vzc2lvbi51c2VyLm5hbWUpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0YXRlIHRvIHJlZmxlY3QgdGhlIG5ldyBsaWtlIGNvdW50XG4gICAgICAgICAgc2V0TGlrZUNvbW1lbnRDb3VudChjdXJyZW50TGlrZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY2hlY2tJZlF1ZXN0aW9uTGlrZWQsXG4gICAgY2hlY2tJZkNvbW1lbnRMaWtlZCxcbiAgICBoYW5kbGVRdWVzdGlvbkxpa2VDaGVjayxcbiAgICBoYW5kbGVDb21tZW50TGlrZUNoZWNrLFxuICAgIGlzUXVlc3Rpb25MaWtlZCxcbiAgICBpc0NvbW1lbnRMaWtlZCxcbiAgICBzZXRJc0NvbW1lbnRMaWtlZCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNoZWNrTGlrZXM7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VMaWtlQ29tbWVudENvdW50U3RvcmUiLCJ1c2VMaWtlUXVlc3Rpb25Db3VudFN0b3JlIiwiYXJyYXlSZW1vdmUiLCJhcnJheVVuaW9uIiwiZG9jIiwiZ2V0RG9jIiwidXBkYXRlRG9jIiwidXNlU2Vzc2lvbiIsImRiIiwidXNlclJlZiIsInVzZUNoZWNrTGlrZXMiLCJxdWVzdGlvbiIsImNvbW1lbnQiLCJkYXRhIiwic2Vzc2lvbiIsImlzUXVlc3Rpb25MaWtlZCIsInNldElzUXVlc3Rpb25MaWtlZCIsImlzQ29tbWVudExpa2VkIiwic2V0SXNDb21tZW50TGlrZWQiLCJzZXRMaWtlUXVlc3Rpb25Db3VudCIsInN0YXRlIiwic2V0TGlrZUNvbW1lbnRDb3VudCIsImNoZWNrSWZRdWVzdGlvbkxpa2VkIiwidXNlciIsImlkIiwiZG9jU25hcCIsImRvY1JlZiIsImV4aXN0cyIsImxpa2VkUXVlc3Rpb25zIiwiaW5jbHVkZXMiLCJjaGVja0lmQ29tbWVudExpa2VkIiwibGlrZWRDb21tZW50cyIsImhhbmRsZVF1ZXN0aW9uTGlrZUNoZWNrIiwicXVlc3Rpb25JZCIsInVzZXJEYXRhIiwicXVlc3Rpb25SZWYiLCJudW1iZXJPZkxpa2VzIiwicXVlc3Rpb25EYXRhIiwiY3VycmVudExpa2VzIiwibGlrZWRCeSIsIm5hbWUiLCJjb25zb2xlIiwibG9nIiwiZG9jUmVmVXNlciIsImF1dGhvcklkIiwibm90aWZpY2F0aW9ucyIsInRleHQiLCJ0aXRsZSIsInJlYWQiLCJ1bnJlYWQiLCJoYW5kbGVDb21tZW50TGlrZUNoZWNrIiwiY29tbWVudElkIiwidXNlckRvY1JlZiIsInVzZXJEb2NTbmFwIiwiY29tbWVudFJlZiIsImNvbW1lbnREb2NTbmFwIiwiY29tbWVudERhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useCheckLikes.ts\n"));

/***/ })

});