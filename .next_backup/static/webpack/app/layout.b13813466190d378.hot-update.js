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

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"20bf0ac0b49c\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzM1MTIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIyMGJmMGFjMGI0OWNcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/GlobalStateProvider.tsx":
/*!********************************************!*\
  !*** ./components/GlobalStateProvider.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var _hooks_useCheckLikes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/hooks/useCheckLikes */ \"(app-pages-browser)/./hooks/useCheckLikes.ts\");\n/* harmony import */ var _lib_converters_SchoolCode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/converters/SchoolCode */ \"(app-pages-browser)/./lib/converters/SchoolCode.ts\");\n/* harmony import */ var _lib_converters_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/converters/User */ \"(app-pages-browser)/./lib/converters/User.ts\");\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/store */ \"(app-pages-browser)/./store/store.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction GlobalStateProvider(param) {\n    let { children } = param;\n    var _session_user;\n    _s();\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_7__.useSession)();\n    const { isCommentLiked, isQuestionLiked } = (0,_hooks_useCheckLikes__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const setSchoolCode = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useSchoolCodeStore)((state)=>state.setSchoolCode);\n    const setUserName = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useUserNameStore)((state)=>state.setUserName);\n    const setProfileImage = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useUserNameStore)((state)=>state.setProfileImage);\n    const setSchoolName = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useSchoolNameStore)((state)=>state.setSchoolName);\n    const setHasBankDetails = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore)((state)=>state.setHasBankDetails);\n    const setBsbNumber = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore)((state)=>state.setBsbNumber);\n    const setAccountNumber = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore)((state)=>state.setAccountNumber);\n    const setAccountName = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore)((state)=>state.setAccountName);\n    const setTotalUnreadMessages = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useTotalUnreadMessagesStore)((state)=>state.setTotalUnreadMessages);\n    const setUnreadNotifications = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useUnreadNotificationsStore)((state)=>state.setUnreadNotifications);\n    const notifications = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useNotificationsStore)((state)=>state.notifications);\n    const setNotifications = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useNotificationsStore)((state)=>state.setNotifications);\n    const setItemsLocation = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useItemsLocationStore)((state)=>state.setItemsLocation);\n    const itemsLocation = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useItemsLocationStore)((state)=>state.itemsLocation);\n    const setTopic = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useTopicStore)((state)=>state.setTopic);\n    const topic = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useTopicStore)((state)=>state.topic);\n    const currentChatId = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useCurrentChatStore)((state)=>state.currentChatId);\n    const setHasOptOutNotifications = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useHasOptOutNotificationsStore)((state)=>state.setHasOptOutNotifications);\n    const [chatUnreadCounts, setChatUnreadCounts] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)({});\n    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{\n        var _session_user;\n        if (!(session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id)) return;\n        const chatsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"chats\");\n        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.query)(chatsRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.where)(\"members\", \"array-contains\", session.user.id));\n        const unsubscribeChats = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.onSnapshot)(q, (snapshot)=>{\n            snapshot.docChanges().forEach((change)=>{\n                const chatId = change.doc.id;\n                if (chatId === currentChatId) return;\n                if (change.type === \"added\" || change.type === \"modified\") {\n                    const unreadMessagesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"chats\", chatId, \"messages\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.where)(\"isRead\", \"==\", false), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.where)(\"sender.id\", \"!=\", session.user.id));\n                    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.onSnapshot)(unreadMessagesQuery, (messagesSnapshot)=>{\n                        setChatUnreadCounts((prevCounts)=>({\n                                ...prevCounts,\n                                [chatId]: messagesSnapshot.docs.length\n                            }));\n                    });\n                }\n            });\n        });\n        return ()=>unsubscribeChats();\n    }, [\n        session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id,\n        currentChatId\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{\n        const totalUnread = Object.values(chatUnreadCounts).reduce((total, count)=>total + count, 0);\n        setTotalUnreadMessages(totalUnread);\n        const updateNumberUnreadMessages = async ()=>{\n            if (session === null || session === void 0 ? void 0 : session.user.id) {\n                const docUserRef = (0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_4__.userRef)(session.user.id);\n                await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.updateDoc)(docUserRef, {\n                    unreadMessages: totalUnread\n                });\n            }\n        };\n        updateNumberUnreadMessages();\n    }, [\n        chatUnreadCounts\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{\n        if (!session) return;\n        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.onSnapshot)((0,_lib_converters_User__WEBPACK_IMPORTED_MODULE_4__.userRef)(session.user.id), async (docSnapShot)=>{\n            if (docSnapShot.exists()) {\n                var _docSnapShot_data_bankDetails, _docSnapShot_data_bankDetails1, _docSnapShot_data_bankDetails2, _docSnapShot_data, _docSnapShot_data1, _docSnapShot_data2;\n                if (!docSnapShot.data().schoolCode) return;\n                const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.doc)(_lib_converters_SchoolCode__WEBPACK_IMPORTED_MODULE_3__.codeRef, docSnapShot.data().schoolCode);\n                const schoolDocSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getDoc)(docRef);\n                if (schoolDocSnapshot.exists()) {\n                    setSchoolName(schoolDocSnapshot.data().name);\n                }\n                setSchoolCode(docSnapShot.data().schoolCode);\n                setUserName(docSnapShot.data().name);\n                setProfileImage(docSnapShot.data().image);\n                setHasBankDetails(docSnapShot.data().hasBankDetails);\n                setBsbNumber((_docSnapShot_data_bankDetails = docSnapShot.data().bankDetails) === null || _docSnapShot_data_bankDetails === void 0 ? void 0 : _docSnapShot_data_bankDetails.bsbNumber);\n                setAccountNumber((_docSnapShot_data_bankDetails1 = docSnapShot.data().bankDetails) === null || _docSnapShot_data_bankDetails1 === void 0 ? void 0 : _docSnapShot_data_bankDetails1.accountNumber);\n                setAccountName((_docSnapShot_data_bankDetails2 = docSnapShot.data().bankDetails) === null || _docSnapShot_data_bankDetails2 === void 0 ? void 0 : _docSnapShot_data_bankDetails2.accountName);\n                setItemsLocation(itemsLocation || \"Public\");\n                setTopic(topic || \"All topics\");\n                setUnreadNotifications(((_docSnapShot_data = docSnapShot.data()) === null || _docSnapShot_data === void 0 ? void 0 : _docSnapShot_data.notifications.length) === 0 ? false : true);\n                setNotifications((_docSnapShot_data1 = docSnapShot.data()) === null || _docSnapShot_data1 === void 0 ? void 0 : _docSnapShot_data1.notifications);\n                setHasOptOutNotifications(((_docSnapShot_data2 = docSnapShot.data()) === null || _docSnapShot_data2 === void 0 ? void 0 : _docSnapShot_data2.hasOptOutNotifications) === false ? \"No\" : \"Yes\");\n            } else {\n                console.log(\"No such document!\");\n                setSchoolCode(null);\n                return;\n            }\n        }, (error)=>{\n            console.log(\"Error getting document:\", error);\n        });\n    }, [\n        session,\n        setSchoolCode\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: children\n    }, void 0, false);\n}\n_s(GlobalStateProvider, \"HPWLzzoGkDpp5SD25UiS/I0+yHk=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_7__.useSession,\n        _hooks_useCheckLikes__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useSchoolCodeStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useUserNameStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useUserNameStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useSchoolNameStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useBankDetailsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useTotalUnreadMessagesStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useUnreadNotificationsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useNotificationsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useNotificationsStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useItemsLocationStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useItemsLocationStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useTopicStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useTopicStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useCurrentChatStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_5__.useHasOptOutNotificationsStore\n    ];\n});\n_c = GlobalStateProvider;\n/* harmony default export */ __webpack_exports__[\"default\"] = (GlobalStateProvider);\nvar _c;\n$RefreshReg$(_c, \"GlobalStateProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvR2xvYmFsU3RhdGVQcm92aWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFZ0M7QUFDa0I7QUFDSTtBQUNOO0FBYXpCO0FBU0s7QUFDaUI7QUFDTTtBQUVuRCxTQUFTMEIsb0JBQW9CLEtBQTJDO1FBQTNDLEVBQUVDLFFBQVEsRUFBaUMsR0FBM0M7UUF3RXZCQzs7SUF2RUosTUFBTSxFQUFFQyxNQUFNRCxPQUFPLEVBQUUsR0FBR04sMkRBQVVBO0lBQ3BDLE1BQU0sRUFBRVEsY0FBYyxFQUFFQyxlQUFlLEVBQUUsR0FBRzlCLGdFQUFhQTtJQUV6RCxNQUFNK0IsZ0JBQWdCdkIsZ0VBQWtCQSxDQUFDLENBQUN3QixRQUFVQSxNQUFNRCxhQUFhO0lBQ3ZFLE1BQU1FLGNBQWNwQiw4REFBZ0JBLENBQUMsQ0FBQ21CLFFBQVVBLE1BQU1DLFdBQVc7SUFDakUsTUFBTUMsa0JBQWtCckIsOERBQWdCQSxDQUFDLENBQUNtQixRQUFVQSxNQUFNRSxlQUFlO0lBQ3pFLE1BQU1DLGdCQUFnQjFCLGdFQUFrQkEsQ0FBQyxDQUFDdUIsUUFBVUEsTUFBTUcsYUFBYTtJQUN2RSxNQUFNQyxvQkFBb0JqQyxpRUFBbUJBLENBQzNDLENBQUM2QixRQUFVQSxNQUFNSSxpQkFBaUI7SUFFcEMsTUFBTUMsZUFBZWxDLGlFQUFtQkEsQ0FBQyxDQUFDNkIsUUFBVUEsTUFBTUssWUFBWTtJQUN0RSxNQUFNQyxtQkFBbUJuQyxpRUFBbUJBLENBQzFDLENBQUM2QixRQUFVQSxNQUFNTSxnQkFBZ0I7SUFFbkMsTUFBTUMsaUJBQWlCcEMsaUVBQW1CQSxDQUFDLENBQUM2QixRQUFVQSxNQUFNTyxjQUFjO0lBQzFFLE1BQU1DLHlCQUF5QjdCLHlFQUEyQkEsQ0FDeEQsQ0FBQ3FCLFFBQVVBLE1BQU1RLHNCQUFzQjtJQUV6QyxNQUFNQyx5QkFBeUI3Qix5RUFBMkJBLENBQ3hELENBQUNvQixRQUFVQSxNQUFNUyxzQkFBc0I7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QUFpQmtDLHFCQUFBQSxZQUFZakQsSUFBSSxnQkFBaEJpRCx5Q0FBQUEsbUJBQW9CbkMsYUFBYTtnQkFDbERPLDBCQUNFNEIsRUFBQUEscUJBQUFBLFlBQVlqRCxJQUFJLGdCQUFoQmlELHlDQUFBQSxtQkFBb0JZLHNCQUFzQixNQUFLLFFBQVEsT0FBTztZQUVsRSxPQUFPO2dCQUNMQyxRQUFRQyxHQUFHLENBQUM7Z0JBQ1o1RCxjQUFjO2dCQUNkO1lBQ0Y7UUFDRixHQUNBLENBQUM2RDtZQUNDRixRQUFRQyxHQUFHLENBQUMsMkJBQTJCQztRQUN6QztJQUVKLEdBQUc7UUFBQ2pFO1FBQVNJO0tBQWM7SUFFM0IscUJBQU87a0JBQUdMOztBQUNaO0dBdklTRDs7UUFDbUJKLHVEQUFVQTtRQUNRckIsNERBQWFBO1FBRW5DUSw0REFBa0JBO1FBQ3BCSywwREFBZ0JBO1FBQ1pBLDBEQUFnQkE7UUFDbEJKLDREQUFrQkE7UUFDZE4sNkRBQW1CQTtRQUd4QkEsNkRBQW1CQTtRQUNmQSw2REFBbUJBO1FBR3JCQSw2REFBbUJBO1FBQ1hRLHFFQUEyQkE7UUFHM0JDLHFFQUEyQkE7UUFHcENMLCtEQUFxQkE7UUFDbEJBLCtEQUFxQkE7UUFHckJELCtEQUFxQkE7UUFHeEJBLCtEQUFxQkE7UUFDMUJJLHVEQUFhQTtRQUNoQkEsdURBQWFBO1FBQ0xOLDZEQUFtQkE7UUFDUEMsd0VBQThCQTs7O0tBakN6RG9CO0FBeUlULCtEQUFlQSxtQkFBbUJBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9HbG9iYWxTdGF0ZVByb3ZpZGVyLnRzeD82NjUxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2ZpcmViYXNlXCI7XG5pbXBvcnQgdXNlQ2hlY2tMaWtlcyBmcm9tIFwiQC9ob29rcy91c2VDaGVja0xpa2VzXCI7XG5pbXBvcnQgeyBjb2RlUmVmIH0gZnJvbSBcIkAvbGliL2NvbnZlcnRlcnMvU2Nob29sQ29kZVwiO1xuaW1wb3J0IHsgdXNlclJlZiB9IGZyb20gXCJAL2xpYi9jb252ZXJ0ZXJzL1VzZXJcIjtcbmltcG9ydCB7XG4gIHVzZUJhbmtEZXRhaWxzU3RvcmUsXG4gIHVzZUN1cnJlbnRDaGF0U3RvcmUsXG4gIHVzZUhhc09wdE91dE5vdGlmaWNhdGlvbnNTdG9yZSxcbiAgdXNlSXRlbXNMb2NhdGlvblN0b3JlLFxuICB1c2VOb3RpZmljYXRpb25zU3RvcmUsXG4gIHVzZVNjaG9vbENvZGVTdG9yZSxcbiAgdXNlU2Nob29sTmFtZVN0b3JlLFxuICB1c2VUb3BpY1N0b3JlLFxuICB1c2VUb3RhbFVucmVhZE1lc3NhZ2VzU3RvcmUsXG4gIHVzZVVucmVhZE5vdGlmaWNhdGlvbnNTdG9yZSxcbiAgdXNlVXNlck5hbWVTdG9yZSxcbn0gZnJvbSBcIkAvc3RvcmUvc3RvcmVcIjtcbmltcG9ydCB7XG4gIGNvbGxlY3Rpb24sXG4gIGRvYyxcbiAgZ2V0RG9jLFxuICBvblNuYXBzaG90LFxuICBxdWVyeSxcbiAgdXBkYXRlRG9jLFxuICB3aGVyZSxcbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmZ1bmN0aW9uIEdsb2JhbFN0YXRlUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcbiAgY29uc3QgeyBpc0NvbW1lbnRMaWtlZCwgaXNRdWVzdGlvbkxpa2VkIH0gPSB1c2VDaGVja0xpa2VzKCk7XG5cbiAgY29uc3Qgc2V0U2Nob29sQ29kZSA9IHVzZVNjaG9vbENvZGVTdG9yZSgoc3RhdGUpID0+IHN0YXRlLnNldFNjaG9vbENvZGUpO1xuICBjb25zdCBzZXRVc2VyTmFtZSA9IHVzZVVzZXJOYW1lU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5zZXRVc2VyTmFtZSk7XG4gIGNvbnN0IHNldFByb2ZpbGVJbWFnZSA9IHVzZVVzZXJOYW1lU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5zZXRQcm9maWxlSW1hZ2UpO1xuICBjb25zdCBzZXRTY2hvb2xOYW1lID0gdXNlU2Nob29sTmFtZVN0b3JlKChzdGF0ZSkgPT4gc3RhdGUuc2V0U2Nob29sTmFtZSk7XG4gIGNvbnN0IHNldEhhc0JhbmtEZXRhaWxzID0gdXNlQmFua0RldGFpbHNTdG9yZShcbiAgICAoc3RhdGUpID0+IHN0YXRlLnNldEhhc0JhbmtEZXRhaWxzXG4gICk7XG4gIGNvbnN0IHNldEJzYk51bWJlciA9IHVzZUJhbmtEZXRhaWxzU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5zZXRCc2JOdW1iZXIpO1xuICBjb25zdCBzZXRBY2NvdW50TnVtYmVyID0gdXNlQmFua0RldGFpbHNTdG9yZShcbiAgICAoc3RhdGUpID0+IHN0YXRlLnNldEFjY291bnROdW1iZXJcbiAgKTtcbiAgY29uc3Qgc2V0QWNjb3VudE5hbWUgPSB1c2VCYW5rRGV0YWlsc1N0b3JlKChzdGF0ZSkgPT4gc3RhdGUuc2V0QWNjb3VudE5hbWUpO1xuICBjb25zdCBzZXRUb3RhbFVucmVhZE1lc3NhZ2VzID0gdXNlVG90YWxVbnJlYWRNZXNzYWdlc1N0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0VG90YWxVbnJlYWRNZXNzYWdlc1xuICApO1xuICBjb25zdCBzZXRVbnJlYWROb3RpZmljYXRpb25zID0gdXNlVW5yZWFkTm90aWZpY2F0aW9uc1N0b3JlKFxuICAgIChzdGF0ZSkgPT4gc3RhdGUuc2V0VW5yZWFkTm90aWZpY2F0aW9uc1xuICApO1xuICBjb25zdCBub3RpZmljYXRpb25zID0gdXNlTm90aWZpY2F0aW9uc1N0b3JlKChzdGF0ZSkgPT4gc3RhdGUubm90aWZpY2F0aW9ucyk7XG4gIGNvbnN0IHNldE5vdGlmaWNhdGlvbnMgPSB1c2VOb3RpZmljYXRpb25zU3RvcmUoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5zZXROb3RpZmljYXRpb25zXG4gICk7XG4gIGNvbnN0IHNldEl0ZW1zTG9jYXRpb24gPSB1c2VJdGVtc0xvY2F0aW9uU3RvcmUoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5zZXRJdGVtc0xvY2F0aW9uXG4gICk7XG4gIGNvbnN0IGl0ZW1zTG9jYXRpb24gPSB1c2VJdGVtc0xvY2F0aW9uU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5pdGVtc0xvY2F0aW9uKTtcbiAgY29uc3Qgc2V0VG9waWMgPSB1c2VUb3BpY1N0b3JlKChzdGF0ZSkgPT4gc3RhdGUuc2V0VG9waWMpO1xuICBjb25zdCB0b3BpYyA9IHVzZVRvcGljU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS50b3BpYyk7XG4gIGNvbnN0IGN1cnJlbnRDaGF0SWQgPSB1c2VDdXJyZW50Q2hhdFN0b3JlKChzdGF0ZSkgPT4gc3RhdGUuY3VycmVudENoYXRJZCk7XG4gIGNvbnN0IHNldEhhc09wdE91dE5vdGlmaWNhdGlvbnMgPSB1c2VIYXNPcHRPdXROb3RpZmljYXRpb25zU3RvcmUoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5zZXRIYXNPcHRPdXROb3RpZmljYXRpb25zXG4gICk7XG5cbiAgY29uc3QgW2NoYXRVbnJlYWRDb3VudHMsIHNldENoYXRVbnJlYWRDb3VudHNdID0gdXNlU3RhdGUoe30pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2hhdHNSZWYgPSBjb2xsZWN0aW9uKGRiLCBcImNoYXRzXCIpO1xuICAgIGNvbnN0IHEgPSBxdWVyeShcbiAgICAgIGNoYXRzUmVmLFxuICAgICAgd2hlcmUoXCJtZW1iZXJzXCIsIFwiYXJyYXktY29udGFpbnNcIiwgc2Vzc2lvbi51c2VyLmlkKVxuICAgICk7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZUNoYXRzID0gb25TbmFwc2hvdChxLCAoc25hcHNob3QpID0+IHtcbiAgICAgIHNuYXBzaG90LmRvY0NoYW5nZXMoKS5mb3JFYWNoKChjaGFuZ2UpID0+IHtcbiAgICAgICAgY29uc3QgY2hhdElkID0gY2hhbmdlLmRvYy5pZDtcblxuICAgICAgICBpZiAoY2hhdElkID09PSBjdXJyZW50Q2hhdElkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSBcImFkZGVkXCIgfHwgY2hhbmdlLnR5cGUgPT09IFwibW9kaWZpZWRcIikge1xuICAgICAgICAgIGNvbnN0IHVucmVhZE1lc3NhZ2VzUXVlcnkgPSBxdWVyeShcbiAgICAgICAgICAgIGNvbGxlY3Rpb24oZGIsIFwiY2hhdHNcIiwgY2hhdElkLCBcIm1lc3NhZ2VzXCIpLFxuICAgICAgICAgICAgd2hlcmUoXCJpc1JlYWRcIiwgXCI9PVwiLCBmYWxzZSksXG4gICAgICAgICAgICB3aGVyZShcInNlbmRlci5pZFwiLCBcIiE9XCIsIHNlc3Npb24udXNlci5pZClcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgb25TbmFwc2hvdCh1bnJlYWRNZXNzYWdlc1F1ZXJ5LCAobWVzc2FnZXNTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgICAgc2V0Q2hhdFVucmVhZENvdW50cygocHJldkNvdW50cykgPT4gKHtcbiAgICAgICAgICAgICAgLi4ucHJldkNvdW50cyxcbiAgICAgICAgICAgICAgW2NoYXRJZF06IG1lc3NhZ2VzU25hcHNob3QuZG9jcy5sZW5ndGgsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlQ2hhdHMoKTtcbiAgfSwgW3Nlc3Npb24/LnVzZXI/LmlkLCBjdXJyZW50Q2hhdElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0b3RhbFVucmVhZCA9IE9iamVjdC52YWx1ZXMoY2hhdFVucmVhZENvdW50cykucmVkdWNlKFxuICAgICAgKHRvdGFsOiBudW1iZXIsIGNvdW50OiBhbnkpID0+IHRvdGFsICsgY291bnQsXG4gICAgICAwXG4gICAgKTtcbiAgICBzZXRUb3RhbFVucmVhZE1lc3NhZ2VzKHRvdGFsVW5yZWFkKTtcblxuICAgIGNvbnN0IHVwZGF0ZU51bWJlclVucmVhZE1lc3NhZ2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHNlc3Npb24/LnVzZXIuaWQpIHtcbiAgICAgICAgY29uc3QgZG9jVXNlclJlZiA9IHVzZXJSZWYoc2Vzc2lvbi51c2VyLmlkKTtcbiAgICAgICAgYXdhaXQgdXBkYXRlRG9jKGRvY1VzZXJSZWYsIHtcbiAgICAgICAgICB1bnJlYWRNZXNzYWdlczogdG90YWxVbnJlYWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVOdW1iZXJVbnJlYWRNZXNzYWdlcygpO1xuICB9LCBbY2hhdFVucmVhZENvdW50c10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzZXNzaW9uKSByZXR1cm47XG5cbiAgICByZXR1cm4gb25TbmFwc2hvdChcbiAgICAgIHVzZXJSZWYoc2Vzc2lvbi51c2VyLmlkKSxcbiAgICAgIGFzeW5jIChkb2NTbmFwU2hvdCkgPT4ge1xuICAgICAgICBpZiAoZG9jU25hcFNob3QuZXhpc3RzKCkpIHtcbiAgICAgICAgICBpZiAoIWRvY1NuYXBTaG90LmRhdGEoKS5zY2hvb2xDb2RlKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgZG9jUmVmID0gZG9jKGNvZGVSZWYsIGRvY1NuYXBTaG90LmRhdGEoKS5zY2hvb2xDb2RlKTtcbiAgICAgICAgICBjb25zdCBzY2hvb2xEb2NTbmFwc2hvdCA9IGF3YWl0IGdldERvYyhkb2NSZWYpO1xuICAgICAgICAgIGlmIChzY2hvb2xEb2NTbmFwc2hvdC5leGlzdHMoKSkge1xuICAgICAgICAgICAgc2V0U2Nob29sTmFtZShzY2hvb2xEb2NTbmFwc2hvdC5kYXRhKCkubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFNjaG9vbENvZGUoZG9jU25hcFNob3QuZGF0YSgpLnNjaG9vbENvZGUpO1xuICAgICAgICAgIHNldFVzZXJOYW1lKGRvY1NuYXBTaG90LmRhdGEoKS5uYW1lKTtcbiAgICAgICAgICBzZXRQcm9maWxlSW1hZ2UoZG9jU25hcFNob3QuZGF0YSgpLmltYWdlKTtcbiAgICAgICAgICBzZXRIYXNCYW5rRGV0YWlscyhkb2NTbmFwU2hvdC5kYXRhKCkuaGFzQmFua0RldGFpbHMpO1xuICAgICAgICAgIHNldEJzYk51bWJlcihkb2NTbmFwU2hvdC5kYXRhKCkuYmFua0RldGFpbHM/LmJzYk51bWJlcik7XG4gICAgICAgICAgc2V0QWNjb3VudE51bWJlcihkb2NTbmFwU2hvdC5kYXRhKCkuYmFua0RldGFpbHM/LmFjY291bnROdW1iZXIpO1xuICAgICAgICAgIHNldEFjY291bnROYW1lKGRvY1NuYXBTaG90LmRhdGEoKS5iYW5rRGV0YWlscz8uYWNjb3VudE5hbWUpO1xuICAgICAgICAgIHNldEl0ZW1zTG9jYXRpb24oaXRlbXNMb2NhdGlvbiB8fCBcIlB1YmxpY1wiKTtcbiAgICAgICAgICBzZXRUb3BpYyh0b3BpYyB8fCBcIkFsbCB0b3BpY3NcIik7XG4gICAgICAgICAgc2V0VW5yZWFkTm90aWZpY2F0aW9ucyhcbiAgICAgICAgICAgIGRvY1NuYXBTaG90LmRhdGEoKT8ubm90aWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyBmYWxzZSA6IHRydWVcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldE5vdGlmaWNhdGlvbnMoZG9jU25hcFNob3QuZGF0YSgpPy5ub3RpZmljYXRpb25zKTtcbiAgICAgICAgICBzZXRIYXNPcHRPdXROb3RpZmljYXRpb25zKFxuICAgICAgICAgICAgZG9jU25hcFNob3QuZGF0YSgpPy5oYXNPcHRPdXROb3RpZmljYXRpb25zID09PSBmYWxzZSA/IFwiTm9cIiA6IFwiWWVzXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc3VjaCBkb2N1bWVudCFcIik7XG4gICAgICAgICAgc2V0U2Nob29sQ29kZShudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBnZXR0aW5nIGRvY3VtZW50OlwiLCBlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfSwgW3Nlc3Npb24sIHNldFNjaG9vbENvZGVdKTtcblxuICByZXR1cm4gPD57Y2hpbGRyZW59PC8+O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHbG9iYWxTdGF0ZVByb3ZpZGVyO1xuIl0sIm5hbWVzIjpbImRiIiwidXNlQ2hlY2tMaWtlcyIsImNvZGVSZWYiLCJ1c2VyUmVmIiwidXNlQmFua0RldGFpbHNTdG9yZSIsInVzZUN1cnJlbnRDaGF0U3RvcmUiLCJ1c2VIYXNPcHRPdXROb3RpZmljYXRpb25zU3RvcmUiLCJ1c2VJdGVtc0xvY2F0aW9uU3RvcmUiLCJ1c2VOb3RpZmljYXRpb25zU3RvcmUiLCJ1c2VTY2hvb2xDb2RlU3RvcmUiLCJ1c2VTY2hvb2xOYW1lU3RvcmUiLCJ1c2VUb3BpY1N0b3JlIiwidXNlVG90YWxVbnJlYWRNZXNzYWdlc1N0b3JlIiwidXNlVW5yZWFkTm90aWZpY2F0aW9uc1N0b3JlIiwidXNlVXNlck5hbWVTdG9yZSIsImNvbGxlY3Rpb24iLCJkb2MiLCJnZXREb2MiLCJvblNuYXBzaG90IiwicXVlcnkiLCJ1cGRhdGVEb2MiLCJ3aGVyZSIsInVzZVNlc3Npb24iLCJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiR2xvYmFsU3RhdGVQcm92aWRlciIsImNoaWxkcmVuIiwic2Vzc2lvbiIsImRhdGEiLCJpc0NvbW1lbnRMaWtlZCIsImlzUXVlc3Rpb25MaWtlZCIsInNldFNjaG9vbENvZGUiLCJzdGF0ZSIsInNldFVzZXJOYW1lIiwic2V0UHJvZmlsZUltYWdlIiwic2V0U2Nob29sTmFtZSIsInNldEhhc0JhbmtEZXRhaWxzIiwic2V0QnNiTnVtYmVyIiwic2V0QWNjb3VudE51bWJlciIsInNldEFjY291bnROYW1lIiwic2V0VG90YWxVbnJlYWRNZXNzYWdlcyIsInNldFVucmVhZE5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25zIiwic2V0Tm90aWZpY2F0aW9ucyIsInNldEl0ZW1zTG9jYXRpb24iLCJpdGVtc0xvY2F0aW9uIiwic2V0VG9waWMiLCJ0b3BpYyIsImN1cnJlbnRDaGF0SWQiLCJzZXRIYXNPcHRPdXROb3RpZmljYXRpb25zIiwiY2hhdFVucmVhZENvdW50cyIsInNldENoYXRVbnJlYWRDb3VudHMiLCJ1c2VyIiwiaWQiLCJjaGF0c1JlZiIsInEiLCJ1bnN1YnNjcmliZUNoYXRzIiwic25hcHNob3QiLCJkb2NDaGFuZ2VzIiwiZm9yRWFjaCIsImNoYW5nZSIsImNoYXRJZCIsInR5cGUiLCJ1bnJlYWRNZXNzYWdlc1F1ZXJ5IiwibWVzc2FnZXNTbmFwc2hvdCIsInByZXZDb3VudHMiLCJkb2NzIiwibGVuZ3RoIiwidG90YWxVbnJlYWQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWR1Y2UiLCJ0b3RhbCIsImNvdW50IiwidXBkYXRlTnVtYmVyVW5yZWFkTWVzc2FnZXMiLCJkb2NVc2VyUmVmIiwidW5yZWFkTWVzc2FnZXMiLCJkb2NTbmFwU2hvdCIsImV4aXN0cyIsInNjaG9vbENvZGUiLCJkb2NSZWYiLCJzY2hvb2xEb2NTbmFwc2hvdCIsIm5hbWUiLCJpbWFnZSIsImhhc0JhbmtEZXRhaWxzIiwiYmFua0RldGFpbHMiLCJic2JOdW1iZXIiLCJhY2NvdW50TnVtYmVyIiwiYWNjb3VudE5hbWUiLCJoYXNPcHRPdXROb3RpZmljYXRpb25zIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/GlobalStateProvider.tsx\n"));

/***/ })

});