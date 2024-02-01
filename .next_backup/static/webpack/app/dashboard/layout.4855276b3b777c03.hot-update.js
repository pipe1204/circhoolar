"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/layout",{

/***/ "(app-pages-browser)/./hooks/useCheckLikes.ts":
/*!********************************!*\
  !*** ./hooks/useCheckLikes.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/store */ \"(app-pages-browser)/./store/store.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var _lib_converters_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/converters/User */ \"(app-pages-browser)/./lib/converters/User.ts\");\n\n\n\n\n\n\nconst useCheckLikes = (question, comment)=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();\n    const [isQuestionLiked, setIsQuestionLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [isCommentLiked, setIsCommentLiked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const setLikeQuestionCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeQuestionCountStore)((state)=>state.setLikeQuestionCount);\n    const setLikeCommentCount = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useLikeCommentCountStore)((state)=>state.setLikeCommentCount);\n    const checkIfQuestionLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedQuestions;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedQuestions = docSnap.data().likedQuestions) === null || _docSnap_data_likedQuestions === void 0 ? void 0 : _docSnap_data_likedQuestions.includes(question === null || question === void 0 ? void 0 : question.id))) {\n                setIsQuestionLiked(true);\n            } else {\n                setIsQuestionLiked(false);\n            }\n        }\n    };\n    const checkIfCommentLiked = async ()=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _docSnap_data_likedComments;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists() && ((_docSnap_data_likedComments = docSnap.data().likedComments) === null || _docSnap_data_likedComments === void 0 ? void 0 : _docSnap_data_likedComments.includes(comment === null || comment === void 0 ? void 0 : comment.id))) {\n                setIsCommentLiked(true);\n            } else {\n                setIsCommentLiked(false);\n            }\n        }\n    };\n    const handleQuestionLikeCheck = async (questionId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            var _session_user1;\n            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.id);\n            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(docRef);\n            if (docSnap.exists()) {\n                var _userData_likedQuestions;\n                const userData = docSnap.data();\n                //Check if question is already liked and remove it from array\n                if (userData === null || userData === void 0 ? void 0 : (_userData_likedQuestions = userData.likedQuestions) === null || _userData_likedQuestions === void 0 ? void 0 : _userData_likedQuestions.includes(questionId)) {\n                    var _docSnap_data, _docSnap_data1;\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                        likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(questionId)\n                    });\n                    setIsQuestionLiked(false);\n                    const questionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"questions\", questionId);\n                    const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(questionRef);\n                    if (docSnap.exists()) {\n                        var _docSnap_data2;\n                        if (((_docSnap_data2 = docSnap.data()) === null || _docSnap_data2 === void 0 ? void 0 : _docSnap_data2.numberOfLikes) === 0) {\n                            setLikeQuestionCount(0);\n                        } else {\n                            var _session_user2;\n                            const questionData = docSnap.data();\n                            const currentLikes = (questionData === null || questionData === void 0 ? void 0 : questionData.numberOfLikes) - 1;\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                                numberOfLikes: currentLikes,\n                                likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session === null || session === void 0 ? void 0 : (_session_user2 = session.user) === null || _session_user2 === void 0 ? void 0 : _session_user2.name)\n                            });\n                            setLikeQuestionCount(currentLikes);\n                            console.log(\"Question removed from array\");\n                        }\n                    }\n                    //Remove notification from author of question\n                    const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)((_docSnap_data = docSnap.data()) === null || _docSnap_data === void 0 ? void 0 : _docSnap_data.authorId);\n                    if (((_docSnap_data1 = docSnap.data()) === null || _docSnap_data1 === void 0 ? void 0 : _docSnap_data1.authorId) !== session.user.id) {\n                        var _docSnap_data3;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                            notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)({\n                                id: \"\".concat(questionId, \"-\").concat((_docSnap_data3 = docSnap.data()) === null || _docSnap_data3 === void 0 ? void 0 : _docSnap_data3.authorId),\n                                text: \"\".concat(session.user.name, \" liked your post - \").concat(question === null || question === void 0 ? void 0 : question.title),\n                                unread:  false || true\n                            })\n                        });\n                    }\n                } else {\n                    var _docSnap_data4, _docSnap_data5;\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\n                        likedQuestions: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(questionId)\n                    });\n                    setIsQuestionLiked(true);\n                    const questionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"questions\", questionId);\n                    const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(questionRef);\n                    if (docSnap.exists()) {\n                        var _session_user3;\n                        const questionData = docSnap.data();\n                        const currentLikes = (questionData === null || questionData === void 0 ? void 0 : questionData.numberOfLikes) + 1;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(questionRef, {\n                            numberOfLikes: currentLikes,\n                            likedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session === null || session === void 0 ? void 0 : (_session_user3 = session.user) === null || _session_user3 === void 0 ? void 0 : _session_user3.name)\n                        });\n                        setLikeQuestionCount(currentLikes);\n                        console.log(\"Question added to array\");\n                    }\n                    //Add notification to author of question\n                    const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)((_docSnap_data4 = docSnap.data()) === null || _docSnap_data4 === void 0 ? void 0 : _docSnap_data4.authorId);\n                    if (((_docSnap_data5 = docSnap.data()) === null || _docSnap_data5 === void 0 ? void 0 : _docSnap_data5.authorId) !== session.user.id) {\n                        var _docSnap_data6;\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                            notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)({\n                                id: \"\".concat(questionId, \"-\").concat((_docSnap_data6 = docSnap.data()) === null || _docSnap_data6 === void 0 ? void 0 : _docSnap_data6.authorId),\n                                text: \"\".concat(session.user.name, \" liked your post - \").concat(question === null || question === void 0 ? void 0 : question.title),\n                                unread: false\n                            })\n                        });\n                    }\n                }\n            }\n        }\n    };\n    const handleCommentLikeCheck = async (commentId)=>{\n        var _session_user;\n        if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n            const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", session.user.id);\n            const userDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(userDocRef);\n            if (userDocSnap.exists()) {\n                const userData = userDocSnap.data();\n                const commentRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"comments\", commentId);\n                const commentDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(commentRef);\n                if (commentDocSnap.exists()) {\n                    var _commentDocSnap_data, _userData_likedComments, _userData_likedComments1;\n                    if (((_commentDocSnap_data = commentDocSnap.data()) === null || _commentDocSnap_data === void 0 ? void 0 : _commentDocSnap_data.numberOfLikes) === 0) {\n                        setLikeCommentCount(0);\n                    }\n                    const commentData = commentDocSnap.data();\n                    let currentLikes = commentData.numberOfLikes;\n                    if ((_userData_likedComments = userData.likedComments) === null || _userData_likedComments === void 0 ? void 0 : _userData_likedComments.includes(commentId)) {\n                        // If comment is already liked, unlike it\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(commentId)\n                        });\n                        setIsCommentLiked(false);\n                        currentLikes--;\n                        //Remove notification from author of comment\n                        const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                        if (commentData.authorId !== session.user.id) {\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)({\n                                    id: \"\".concat(commentId, \"-\").concat(commentData.authorId),\n                                    text: \"\".concat(session.user.name, \" liked your comment\"),\n                                    unread:  false || true\n                                })\n                            });\n                        }\n                    } else {\n                        // If comment is not liked, like it\n                        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(userDocRef, {\n                            likedComments: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(commentId)\n                        });\n                        setIsCommentLiked(true);\n                        currentLikes++;\n                        //Add notification to author of comment\n                        const docRefUser = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_5__.userRef)(commentData.authorId);\n                        if (commentData.authorId !== session.user.id) {\n                            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRefUser, {\n                                notifications: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)({\n                                    id: \"\".concat(commentId, \"-\").concat(commentData.authorId),\n                                    text: \"\".concat(session.user.name, \" liked your comment\"),\n                                    unread: false\n                                })\n                            });\n                        }\n                    }\n                    // Update the comment's like count in Firestore\n                    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(commentRef, {\n                        numberOfLikes: currentLikes,\n                        likedBy: ((_userData_likedComments1 = userData.likedComments) === null || _userData_likedComments1 === void 0 ? void 0 : _userData_likedComments1.includes(commentId)) ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayRemove)(session.user.name) : (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.arrayUnion)(session.user.name)\n                    });\n                    // Update local state to reflect the new like count\n                    setLikeCommentCount(currentLikes);\n                }\n            }\n        }\n    };\n    return {\n        checkIfQuestionLiked,\n        checkIfCommentLiked,\n        handleQuestionLikeCheck,\n        handleCommentLikeCheck,\n        isQuestionLiked,\n        isCommentLiked,\n        setIsCommentLiked\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCheckLikes);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZUNoZWNrTGlrZXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWlDO0FBSVY7QUFPSztBQUVpQjtBQUNiO0FBQ2dCO0FBRWhELE1BQU1XLGdCQUFnQixDQUFDQyxVQUFxQkM7SUFDMUMsTUFBTSxFQUFFQyxNQUFNQyxPQUFPLEVBQUUsR0FBR1AsMkRBQVVBO0lBRXBDLE1BQU0sQ0FBQ1EsaUJBQWlCQyxtQkFBbUIsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQ2tCLGdCQUFnQkMsa0JBQWtCLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUVyRCxNQUFNb0IsdUJBQXVCbEIsdUVBQXlCQSxDQUNwRCxDQUFDbUIsUUFBVUEsTUFBTUQsb0JBQW9CO0lBRXZDLE1BQU1FLHNCQUFzQnJCLHNFQUF3QkEsQ0FDbEQsQ0FBQ29CLFFBQVVBLE1BQU1DLG1CQUFtQjtJQUd0QyxNQUFNQyx1QkFBdUI7WUFDdkJSO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEsY0FBZVUsRUFBRSxFQUFFO2dCQU1uQkM7WUFMRixNQUFNQyxTQUFTdEIsdURBQUdBLENBQUNJLHlDQUFFQSxFQUFFLFNBQVNNLFFBQVFTLElBQUksQ0FBQ0MsRUFBRTtZQUMvQyxNQUFNQyxVQUFVLE1BQU1wQiwwREFBTUEsQ0FBQ3FCO1lBRTdCLElBQ0VELFFBQVFFLE1BQU0sUUFDZEYsK0JBQUFBLFFBQVFaLElBQUksR0FBR2UsY0FBYyxjQUE3QkgsbURBQUFBLDZCQUErQkksUUFBUSxDQUFDbEIscUJBQUFBLCtCQUFBQSxTQUFVYSxFQUFFLElBQ3BEO2dCQUNBUixtQkFBbUI7WUFDckIsT0FBTztnQkFDTEEsbUJBQW1CO1lBQ3JCO1FBQ0Y7SUFDRjtJQUVBLE1BQU1jLHNCQUFzQjtZQUN0QmhCO1FBQUosSUFBSUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU1MsSUFBSSxjQUFiVCxvQ0FBQUEs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K0RBQVdBLENBQUNZLFFBQVFTLElBQUksQ0FBQ2lCLElBQUksSUFDN0JyQyw4REFBVUEsQ0FBQ1csUUFBUVMsSUFBSSxDQUFDaUIsSUFBSTtvQkFDbEM7b0JBRUEsbURBQW1EO29CQUNuRG5CLG9CQUFvQmlCO2dCQUN0QjtZQUNGO1FBQ0Y7SUFDRjtJQUVBLE9BQU87UUFDTGhCO1FBQ0FRO1FBQ0FFO1FBQ0FpQjtRQUNBbEM7UUFDQUU7UUFDQUM7SUFDRjtBQUNGO0FBRUEsK0RBQWVSLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlQ2hlY2tMaWtlcy50cz8zNGU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICB1c2VMaWtlQ29tbWVudENvdW50U3RvcmUsXG4gIHVzZUxpa2VRdWVzdGlvbkNvdW50U3RvcmUsXG59IGZyb20gXCJAL3N0b3JlL3N0b3JlXCI7XG5pbXBvcnQge1xuICBhcnJheVJlbW92ZSxcbiAgYXJyYXlVbmlvbixcbiAgZG9jLFxuICBnZXREb2MsXG4gIHVwZGF0ZURvYyxcbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgQ29tbWVudCwgUXVlc3Rpb24gfSBmcm9tIFwiQC90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvZmlyZWJhc2VcIjtcbmltcG9ydCB7IHVzZXJSZWYgfSBmcm9tIFwiQC9saWIvY29udmVydGVycy9Vc2VyXCI7XG5cbmNvbnN0IHVzZUNoZWNrTGlrZXMgPSAocXVlc3Rpb24/OiBRdWVzdGlvbiwgY29tbWVudD86IENvbW1lbnQpID0+IHtcbiAgY29uc3QgeyBkYXRhOiBzZXNzaW9uIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgY29uc3QgW2lzUXVlc3Rpb25MaWtlZCwgc2V0SXNRdWVzdGlvbkxpa2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQ29tbWVudExpa2VkLCBzZXRJc0NvbW1lbnRMaWtlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgc2V0TGlrZVF1ZXN0aW9uQ291bnQgPSB1c2VMaWtlUXVlc3Rpb25Db3VudFN0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0TGlrZVF1ZXN0aW9uQ291bnRcbiAgKTtcbiAgY29uc3Qgc2V0TGlrZUNvbW1lbnRDb3VudCA9IHVzZUxpa2VDb21tZW50Q291bnRTdG9yZShcbiAgICAoc3RhdGUpID0+IHN0YXRlLnNldExpa2VDb21tZW50Q291bnRcbiAgKTtcblxuICBjb25zdCBjaGVja0lmUXVlc3Rpb25MaWtlZCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGRvYyhkYiwgXCJ1c2Vyc1wiLCBzZXNzaW9uLnVzZXIuaWQpO1xuICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWYpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGRvY1NuYXAuZXhpc3RzKCkgJiZcbiAgICAgICAgZG9jU25hcC5kYXRhKCkubGlrZWRRdWVzdGlvbnM/LmluY2x1ZGVzKHF1ZXN0aW9uPy5pZClcbiAgICAgICkge1xuICAgICAgICBzZXRJc1F1ZXN0aW9uTGlrZWQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc1F1ZXN0aW9uTGlrZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0lmQ29tbWVudExpa2VkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgY29uc3QgZG9jUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHNlc3Npb24udXNlci5pZCk7XG4gICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKGRvY1JlZik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZG9jU25hcC5leGlzdHMoKSAmJlxuICAgICAgICBkb2NTbmFwLmRhdGEoKS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50Py5pZClcbiAgICAgICkge1xuICAgICAgICBzZXRJc0NvbW1lbnRMaWtlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzQ29tbWVudExpa2VkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUXVlc3Rpb25MaWtlQ2hlY2sgPSBhc3luYyAocXVlc3Rpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICBjb25zdCBkb2NSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgc2Vzc2lvbj8udXNlcj8uaWQpO1xuICAgICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhkb2NSZWYpO1xuXG4gICAgICBpZiAoZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgICAvL0NoZWNrIGlmIHF1ZXN0aW9uIGlzIGFscmVhZHkgbGlrZWQgYW5kIHJlbW92ZSBpdCBmcm9tIGFycmF5XG4gICAgICAgIGlmICh1c2VyRGF0YT8ubGlrZWRRdWVzdGlvbnM/LmluY2x1ZGVzKHF1ZXN0aW9uSWQpKSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xuICAgICAgICAgICAgbGlrZWRRdWVzdGlvbnM6IGFycmF5UmVtb3ZlKHF1ZXN0aW9uSWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldElzUXVlc3Rpb25MaWtlZChmYWxzZSk7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25SZWYgPSBkb2MoZGIsIFwicXVlc3Rpb25zXCIsIHF1ZXN0aW9uSWQpO1xuICAgICAgICAgIGNvbnN0IGRvY1NuYXAgPSBhd2FpdCBnZXREb2MocXVlc3Rpb25SZWYpO1xuICAgICAgICAgIGlmIChkb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgICBpZiAoZG9jU25hcC5kYXRhKCk/Lm51bWJlck9mTGlrZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgc2V0TGlrZVF1ZXN0aW9uQ291bnQoMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBxdWVzdGlvbkRhdGEgPSBkb2NTbmFwLmRhdGEoKTtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudExpa2VzID0gcXVlc3Rpb25EYXRhPy5udW1iZXJPZkxpa2VzIC0gMTtcblxuICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MocXVlc3Rpb25SZWYsIHtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkxpa2VzOiBjdXJyZW50TGlrZXMsXG4gICAgICAgICAgICAgICAgbGlrZWRCeTogYXJyYXlSZW1vdmUoc2Vzc2lvbj8udXNlcj8ubmFtZSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzZXRMaWtlUXVlc3Rpb25Db3VudChjdXJyZW50TGlrZXMpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXN0aW9uIHJlbW92ZWQgZnJvbSBhcnJheVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL1JlbW92ZSBub3RpZmljYXRpb24gZnJvbSBhdXRob3Igb2YgcXVlc3Rpb25cbiAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihkb2NTbmFwLmRhdGEoKT8uYXV0aG9ySWQpO1xuICAgICAgICAgIGlmIChkb2NTbmFwLmRhdGEoKT8uYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZlVzZXIsIHtcbiAgICAgICAgICAgICAgbm90aWZpY2F0aW9uczogYXJyYXlSZW1vdmUoe1xuICAgICAgICAgICAgICAgIGlkOiBgJHtxdWVzdGlvbklkfS0ke2RvY1NuYXAuZGF0YSgpPy5hdXRob3JJZH1gLFxuICAgICAgICAgICAgICAgIHRleHQ6IGAke3Nlc3Npb24udXNlci5uYW1lfSBsaWtlZCB5b3VyIHBvc3QgLSAke3F1ZXN0aW9uPy50aXRsZX1gLFxuICAgICAgICAgICAgICAgIHVucmVhZDogZmFsc2UgfHwgdHJ1ZSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1JlZiwge1xuICAgICAgICAgICAgbGlrZWRRdWVzdGlvbnM6IGFycmF5VW5pb24ocXVlc3Rpb25JZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0SXNRdWVzdGlvbkxpa2VkKHRydWUpO1xuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uUmVmID0gZG9jKGRiLCBcInF1ZXN0aW9uc1wiLCBxdWVzdGlvbklkKTtcbiAgICAgICAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHF1ZXN0aW9uUmVmKTtcbiAgICAgICAgICBpZiAoZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgICAgICAgY29uc3QgcXVlc3Rpb25EYXRhID0gZG9jU25hcC5kYXRhKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TGlrZXMgPSBxdWVzdGlvbkRhdGE/Lm51bWJlck9mTGlrZXMgKyAxO1xuXG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MocXVlc3Rpb25SZWYsIHtcbiAgICAgICAgICAgICAgbnVtYmVyT2ZMaWtlczogY3VycmVudExpa2VzLFxuICAgICAgICAgICAgICBsaWtlZEJ5OiBhcnJheVVuaW9uKHNlc3Npb24/LnVzZXI/Lm5hbWUpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaWtlUXVlc3Rpb25Db3VudChjdXJyZW50TGlrZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRdWVzdGlvbiBhZGRlZCB0byBhcnJheVwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL0FkZCBub3RpZmljYXRpb24gdG8gYXV0aG9yIG9mIHF1ZXN0aW9uXG4gICAgICAgICAgY29uc3QgZG9jUmVmVXNlciA9IHVzZXJSZWYoZG9jU25hcC5kYXRhKCk/LmF1dGhvcklkKTtcbiAgICAgICAgICBpZiAoZG9jU25hcC5kYXRhKCk/LmF1dGhvcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhkb2NSZWZVc2VyLCB7XG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5VW5pb24oe1xuICAgICAgICAgICAgICAgIGlkOiBgJHtxdWVzdGlvbklkfS0ke2RvY1NuYXAuZGF0YSgpPy5hdXRob3JJZH1gLFxuICAgICAgICAgICAgICAgIHRleHQ6IGAke3Nlc3Npb24udXNlci5uYW1lfSBsaWtlZCB5b3VyIHBvc3QgLSAke3F1ZXN0aW9uPy50aXRsZX1gLFxuICAgICAgICAgICAgICAgIHVucmVhZDogZmFsc2UsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbW1lbnRMaWtlQ2hlY2sgPSBhc3luYyAoY29tbWVudElkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIGNvbnN0IHVzZXJEb2NSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgc2Vzc2lvbi51c2VyLmlkKTtcbiAgICAgIGNvbnN0IHVzZXJEb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHVzZXJEb2NSZWYpO1xuXG4gICAgICBpZiAodXNlckRvY1NuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB1c2VyRG9jU25hcC5kYXRhKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRSZWYgPSBkb2MoZGIsIFwiY29tbWVudHNcIiwgY29tbWVudElkKTtcbiAgICAgICAgY29uc3QgY29tbWVudERvY1NuYXAgPSBhd2FpdCBnZXREb2MoY29tbWVudFJlZik7XG5cbiAgICAgICAgaWYgKGNvbW1lbnREb2NTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgaWYgKGNvbW1lbnREb2NTbmFwLmRhdGEoKT8ubnVtYmVyT2ZMaWtlcyA9PT0gMCkge1xuICAgICAgICAgICAgc2V0TGlrZUNvbW1lbnRDb3VudCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb21tZW50RGF0YSA9IGNvbW1lbnREb2NTbmFwLmRhdGEoKTtcbiAgICAgICAgICBsZXQgY3VycmVudExpa2VzID0gY29tbWVudERhdGEubnVtYmVyT2ZMaWtlcztcblxuICAgICAgICAgIGlmICh1c2VyRGF0YS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50SWQpKSB7XG4gICAgICAgICAgICAvLyBJZiBjb21tZW50IGlzIGFscmVhZHkgbGlrZWQsIHVubGlrZSBpdFxuICAgICAgICAgICAgYXdhaXQgdXBkYXRlRG9jKHVzZXJEb2NSZWYsIHtcbiAgICAgICAgICAgICAgbGlrZWRDb21tZW50czogYXJyYXlSZW1vdmUoY29tbWVudElkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SXNDb21tZW50TGlrZWQoZmFsc2UpO1xuICAgICAgICAgICAgY3VycmVudExpa2VzLS07XG5cbiAgICAgICAgICAgIC8vUmVtb3ZlIG5vdGlmaWNhdGlvbiBmcm9tIGF1dGhvciBvZiBjb21tZW50XG4gICAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihjb21tZW50RGF0YS5hdXRob3JJZCk7XG4gICAgICAgICAgICBpZiAoY29tbWVudERhdGEuYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5UmVtb3ZlKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBgJHtjb21tZW50SWR9LSR7Y29tbWVudERhdGEuYXV0aG9ySWR9YCxcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGAke3Nlc3Npb24udXNlci5uYW1lfSBsaWtlZCB5b3VyIGNvbW1lbnRgLFxuICAgICAgICAgICAgICAgICAgdW5yZWFkOiBmYWxzZSB8fCB0cnVlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgY29tbWVudCBpcyBub3QgbGlrZWQsIGxpa2UgaXRcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyh1c2VyRG9jUmVmLCB7XG4gICAgICAgICAgICAgIGxpa2VkQ29tbWVudHM6IGFycmF5VW5pb24oY29tbWVudElkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SXNDb21tZW50TGlrZWQodHJ1ZSk7XG4gICAgICAgICAgICBjdXJyZW50TGlrZXMrKztcblxuICAgICAgICAgICAgLy9BZGQgbm90aWZpY2F0aW9uIHRvIGF1dGhvciBvZiBjb21tZW50XG4gICAgICAgICAgICBjb25zdCBkb2NSZWZVc2VyID0gdXNlclJlZihjb21tZW50RGF0YS5hdXRob3JJZCk7XG4gICAgICAgICAgICBpZiAoY29tbWVudERhdGEuYXV0aG9ySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgICAgICAgICBhd2FpdCB1cGRhdGVEb2MoZG9jUmVmVXNlciwge1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IGFycmF5VW5pb24oe1xuICAgICAgICAgICAgICAgICAgaWQ6IGAke2NvbW1lbnRJZH0tJHtjb21tZW50RGF0YS5hdXRob3JJZH1gLFxuICAgICAgICAgICAgICAgICAgdGV4dDogYCR7c2Vzc2lvbi51c2VyLm5hbWV9IGxpa2VkIHlvdXIgY29tbWVudGAsXG4gICAgICAgICAgICAgICAgICB1bnJlYWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbW1lbnQncyBsaWtlIGNvdW50IGluIEZpcmVzdG9yZVxuICAgICAgICAgIGF3YWl0IHVwZGF0ZURvYyhjb21tZW50UmVmLCB7XG4gICAgICAgICAgICBudW1iZXJPZkxpa2VzOiBjdXJyZW50TGlrZXMsXG4gICAgICAgICAgICBsaWtlZEJ5OiB1c2VyRGF0YS5saWtlZENvbW1lbnRzPy5pbmNsdWRlcyhjb21tZW50SWQpXG4gICAgICAgICAgICAgID8gYXJyYXlSZW1vdmUoc2Vzc2lvbi51c2VyLm5hbWUpXG4gICAgICAgICAgICAgIDogYXJyYXlVbmlvbihzZXNzaW9uLnVzZXIubmFtZSksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBVcGRhdGUgbG9jYWwgc3RhdGUgdG8gcmVmbGVjdCB0aGUgbmV3IGxpa2UgY291bnRcbiAgICAgICAgICBzZXRMaWtlQ29tbWVudENvdW50KGN1cnJlbnRMaWtlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjaGVja0lmUXVlc3Rpb25MaWtlZCxcbiAgICBjaGVja0lmQ29tbWVudExpa2VkLFxuICAgIGhhbmRsZVF1ZXN0aW9uTGlrZUNoZWNrLFxuICAgIGhhbmRsZUNvbW1lbnRMaWtlQ2hlY2ssXG4gICAgaXNRdWVzdGlvbkxpa2VkLFxuICAgIGlzQ29tbWVudExpa2VkLFxuICAgIHNldElzQ29tbWVudExpa2VkLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ2hlY2tMaWtlcztcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUxpa2VDb21tZW50Q291bnRTdG9yZSIsInVzZUxpa2VRdWVzdGlvbkNvdW50U3RvcmUiLCJhcnJheVJlbW92ZSIsImFycmF5VW5pb24iLCJkb2MiLCJnZXREb2MiLCJ1cGRhdGVEb2MiLCJ1c2VTZXNzaW9uIiwiZGIiLCJ1c2VyUmVmIiwidXNlQ2hlY2tMaWtlcyIsInF1ZXN0aW9uIiwiY29tbWVudCIsImRhdGEiLCJzZXNzaW9uIiwiaXNRdWVzdGlvbkxpa2VkIiwic2V0SXNRdWVzdGlvbkxpa2VkIiwiaXNDb21tZW50TGlrZWQiLCJzZXRJc0NvbW1lbnRMaWtlZCIsInNldExpa2VRdWVzdGlvbkNvdW50Iiwic3RhdGUiLCJzZXRMaWtlQ29tbWVudENvdW50IiwiY2hlY2tJZlF1ZXN0aW9uTGlrZWQiLCJ1c2VyIiwiaWQiLCJkb2NTbmFwIiwiZG9jUmVmIiwiZXhpc3RzIiwibGlrZWRRdWVzdGlvbnMiLCJpbmNsdWRlcyIsImNoZWNrSWZDb21tZW50TGlrZWQiLCJsaWtlZENvbW1lbnRzIiwiaGFuZGxlUXVlc3Rpb25MaWtlQ2hlY2siLCJxdWVzdGlvbklkIiwidXNlckRhdGEiLCJxdWVzdGlvblJlZiIsIm51bWJlck9mTGlrZXMiLCJxdWVzdGlvbkRhdGEiLCJjdXJyZW50TGlrZXMiLCJsaWtlZEJ5IiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJkb2NSZWZVc2VyIiwiYXV0aG9ySWQiLCJub3RpZmljYXRpb25zIiwidGV4dCIsInRpdGxlIiwidW5yZWFkIiwiaGFuZGxlQ29tbWVudExpa2VDaGVjayIsImNvbW1lbnRJZCIsInVzZXJEb2NSZWYiLCJ1c2VyRG9jU25hcCIsImNvbW1lbnRSZWYiLCJjb21tZW50RG9jU25hcCIsImNvbW1lbnREYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useCheckLikes.ts\n"));

/***/ })

});