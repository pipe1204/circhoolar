"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/messages/page",{

/***/ "(app-pages-browser)/./hooks/useFecthChatData.ts":
/*!***********************************!*\
  !*** ./hooks/useFecthChatData.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst useFetchChatData = ()=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();\n    const [chatListData, setChatListData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        const fetchChats = async ()=>{\n            var _session_user;\n            if (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) {\n                const chatsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"chats\");\n                const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(chatsRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"members\", \"array-contains\", session.user.id));\n                const chatDocs = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(q);\n                let totalUnreadCount = 0;\n                const formatDate = (createdAt)=>{\n                    if (!createdAt) return \"\";\n                    let messageDate;\n                    if (typeof createdAt.toDate === \"function\") {\n                        messageDate = createdAt.toDate(); // Convert Firebase Timestamp to Date\n                    } else {\n                        messageDate = new Date(createdAt); // Handle other formats\n                    }\n                    const today = new Date();\n                    const isToday = messageDate.toDateString() === today.toDateString();\n                    return isToday ? messageDate.toLocaleTimeString([], {\n                        hour: \"2-digit\",\n                        minute: \"2-digit\"\n                    }) : messageDate.toLocaleDateString();\n                };\n                const chatDataPromises = chatDocs.docs.map(async (chatDoc)=>{\n                    var _messagesSnapshot_docs__data, _messagesSnapshot_docs_;\n                    const chatData = chatDoc.data();\n                    const [initiatorId, receiverId] = chatData.chatId.split(\"-\");\n                    // Check if the current session user is the initiator or receiver\n                    const otherUserId = session.user.id === initiatorId ? receiverId : initiatorId;\n                    const otherUserDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"users\", otherUserId));\n                    const otherUserData = otherUserDoc.data();\n                    // Fetch post data\n                    const postRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"posts\", chatData.itemId);\n                    const postDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(postRef);\n                    if (!postDoc.exists()) return null;\n                    const postData = postDoc.data();\n                    const messagesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"chats\", chatDoc.id, \"messages\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)(\"timestamp\", \"desc\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.limit)(1));\n                    const messagesSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(messagesQuery);\n                    const lastMessage = ((_messagesSnapshot_docs_ = messagesSnapshot.docs[0]) === null || _messagesSnapshot_docs_ === void 0 ? void 0 : (_messagesSnapshot_docs__data = _messagesSnapshot_docs_.data()) === null || _messagesSnapshot_docs__data === void 0 ? void 0 : _messagesSnapshot_docs__data.text) || \"\";\n                    const unreadMessagesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"chats\", chatDoc.id, \"messages\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"isRead\", \"==\", false), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"sender.id\", \"!=\", session.user.id));\n                    const unreadMessagesSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(unreadMessagesQuery);\n                    const unreadCount = unreadMessagesSnapshot.docs.length;\n                    totalUnreadCount += unreadCount;\n                    return {\n                        author: (otherUserData === null || otherUserData === void 0 ? void 0 : otherUserData.name) || \"Unknown User\",\n                        avatar: (otherUserData === null || otherUserData === void 0 ? void 0 : otherUserData.image) || \"/path/to/default/avatar.jpg\",\n                        title: postData.title,\n                        createdAt: chatData.createdAt,\n                        chatId: chatDoc.id,\n                        lastMessage: lastMessage.length > 50 ? lastMessage.substring(0, 47) + \"...\" : lastMessage,\n                        unreadCount\n                    };\n                });\n                const resolvedChatData = (await Promise.all(chatDataPromises)).filter((data)=>data !== null).map((chat)=>({\n                        ...chat,\n                        createdAt: formatDate(chat.createdAt)\n                    }));\n                setChatListData(resolvedChatData);\n                return totalUnreadCount;\n            }\n        };\n        fetchChats();\n    }, [\n        session\n    ]);\n    return {\n        chatListData,\n        setChatListData\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useFetchChatData);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZUZlY3RoQ2hhdERhdGEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0QztBQUNaO0FBVUo7QUFDaUI7QUFhN0MsTUFBTVksbUJBQW1CO0lBQ3ZCLE1BQU0sRUFBRUMsTUFBTUMsT0FBTyxFQUFFLEdBQUdILDJEQUFVQTtJQUNwQyxNQUFNLENBQUNJLGNBQWNDLGdCQUFnQixHQUFHaEIsK0NBQVFBLENBQWEsRUFBRTtJQUUvREMsZ0RBQVNBLENBQUM7UUFDUixNQUFNZ0IsYUFBYTtnQkFDYkg7WUFBSixJQUFJQSxvQkFBQUEsK0JBQUFBLGdCQUFBQSxRQUFTSSxJQUFJLGNBQWJKLG9DQUFBQSxjQUFlSyxFQUFFLEVBQUU7Z0JBQ3JCLE1BQU1DLFdBQVdqQiw4REFBVUEsQ0FBQ0QseUNBQUVBLEVBQUU7Z0JBQ2hDLE1BQU1tQixJQUFJakIseURBQUtBLENBQ2JnQixVQUNBZix5REFBS0EsQ0FBQyxXQUFXLGtCQUFrQlMsUUFBUUksSUFBSSxDQUFDQyxFQUFFO2dCQUVwRCxNQUFNRyxXQUFXLE1BQU1oQiwyREFBT0EsQ0FBQ2U7Z0JBRS9CLElBQUlFLG1CQUFtQjtnQkFFdkIsTUFBTUMsYUFBYSxDQUFDQztvQkFDbEIsSUFBSSxDQUFDQSxXQUFXLE9BQU87b0JBRXZCLElBQUlDO29CQUNKLElBQUksT0FBT0QsVUFBVUUsTUFBTSxLQUFLLFlBQVk7d0JBQzFDRCxjQUFjRCxVQUFVRSxNQUFNLElBQUkscUNBQXFDO29CQUN6RSxPQUFPO3dCQUNMRCxjQUFjLElBQUlFLEtBQUtILFlBQVksdUJBQXVCO29CQUM1RDtvQkFFQSxNQUFNSSxRQUFRLElBQUlEO29CQUNsQixNQUFNRSxVQUFVSixZQUFZSyxZQUFZLE9BQU9GLE1BQU1FLFlBQVk7b0JBRWpFLE9BQU9ELFVBQ0hKLFlBQVlNLGtCQUFrQixDQUFDLEVBQUUsRUFBRTt3QkFDakNDLE1BQU07d0JBQ05DLFFBQVE7b0JBQ1YsS0FDQVIsWUFBWVMsa0JBQWtCO2dCQUNwQztnQkFFQSxNQUFNQyxtQkFBbUJkLFNBQVNlLElBQUksQ0FBQ0MsR0FBRyxDQUFDLE9BQU9DO3dCQXVCNUJDLDhCQUFBQTtvQkF0QnBCLE1BQU1DLFdBQVdGLFFBQVExQixJQUFJO29CQUM3QixNQUFNLENBQUM2QixhQUFhQyxXQUFXLEdBQUdGLFNBQVNHLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO29CQUV4RCxpRUFBaUU7b0JBQ2pFLE1BQU1DLGNBQ0poQyxRQUFRSSxJQUFJLENBQUNDLEVBQUUsS0FBS3VCLGNBQWNDLGFBQWFEO29CQUNqRCxNQUFNSyxlQUFlLE1BQU1yQywwREFBTUEsQ0FBQ0gsdURBQUdBLENBQUNMLHlDQUFFQSxFQUFFLFNBQVM0QztvQkFDbkQsTUFBTUUsZ0JBQWdCRCxhQUFhbEMsSUFBSTtvQkFFdkMsa0JBQWtCO29CQUNsQixNQUFNb0MsVUFBVTFDLHVEQUFHQSxDQUFDTCx5Q0FBRUEsRUFBRSxTQUFTdUMsU0FBU1MsTUFBTTtvQkFDaEQsTUFBTUMsVUFBVSxNQUFNekMsMERBQU1BLENBQUN1QztvQkFDN0IsSUFBSSxDQUFDRSxRQUFRQyxNQUFNLElBQUksT0FBTztvQkFFOUIsTUFBTUMsV0FBV0YsUUFBUXRDLElBQUk7b0JBRTdCLE1BQU15QyxnQkFBZ0JsRCx5REFBS0EsQ0FDekJELDhEQUFVQSxDQUFDRCx5Q0FBRUEsRUFBRSxTQUFTcUMsUUFBUXBCLEVBQUUsRUFBRSxhQUNwQ1gsMkRBQU9BLENBQUMsYUFBYSxTQUNyQkMseURBQUtBLENBQUM7b0JBRVIsTUFBTStCLG1CQUFtQixNQUFNbEMsMkRBQU9BLENBQUNnRDtvQkFDdkMsTUFBTUMsY0FBY2YsRUFBQUEsMEJBQUFBLGlCQUFpQkgsSUFBSSxDQUFDLEVBQUUsY0FBeEJHLCtDQUFBQSwrQkFBQUEsd0JBQTBCM0IsSUFBSSxnQkFBOUIyQixtREFBQUEsNkJBQWtDZ0IsSUFBSSxLQUFJO29CQUU5RCxNQUFNQyxzQkFBc0JyRCx5REFBS0EsQ0FDL0JELDhEQUFVQSxDQUFDRCx5Q0FBRUEsRUFBRSxTQUFTcUMsUUFBUXBCLEVBQUUsRUFBRSxhQUNwQ2QseURBQUtBLENBQUMsVUFBVSxNQUFNLFFBQ3RCQSx5REFBS0EsQ0FBQyxhQUFhLE1BQU1TLFFBQVFJLElBQUksQ0FBQ0MsRUFBRTtvQkFFMUMsTUFBTXVDLHlCQUF5QixNQUFNcEQsMkRBQU9BLENBQUNtRDtvQkFDN0MsTUFBTUUsY0FBY0QsdUJBQXVCckIsSUFBSSxDQUFDdUIsTUFBTTtvQkFFdERyQyxvQkFBb0JvQztvQkFFcEIsT0FBTzt3QkFDTEUsUUFBUWIsQ0FBQUEsMEJBQUFBLG9DQUFBQSxjQUFlYyxJQUFJLEtBQUk7d0JBQy9CQyxRQUFRZixDQUFBQSwwQkFBQUEsb0NBQUFBLGNBQWVnQixLQUFLLEtBQUk7d0JBQ2hDQyxPQUFPWixTQUFTWSxLQUFLO3dCQUNyQnhDLFdBQVdnQixTQUFTaEIsU0FBUzt3QkFDN0JtQixRQUFRTCxRQUFRcEIsRUFBRTt3QkFDbEJvQyxhQUNFQSxZQUFZSyxNQUFNLEdBQUcsS0FDakJMLFlBQVlXLFNBQVMsQ0FBQyxHQUFHLE1BQU0sUUFDL0JYO3dCQUNOSTtvQkFDRjtnQkFDRjtnQkFFQSxNQUFNUSxtQkFBbUIsQ0FBQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNqQyxpQkFBZ0IsRUFDekRrQyxNQUFNLENBQUMsQ0FBQ3pELE9BQTJDQSxTQUFTLE1BQzVEeUIsR0FBRyxDQUFDLENBQUNpQyxPQUFVO3dCQUNkLEdBQUdBLElBQUk7d0JBQ1A5QyxXQUFXRCxXQUFXK0MsS0FBSzlDLFNBQVM7b0JBQ3RDO2dCQUVGVCxnQkFBZ0JtRDtnQkFDaEIsT0FBTzVDO1lBQ1Q7UUFDRjtRQUVBTjtJQUNGLEdBQUc7UUFBQ0g7S0FBUTtJQUNaLE9BQU87UUFBRUM7UUFBY0M7SUFBZ0I7QUFDekM7QUFFQSwrREFBZUosZ0JBQWdCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2hvb2tzL3VzZUZlY3RoQ2hhdERhdGEudHM/ZWZlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2ZpcmViYXNlXCI7XG5pbXBvcnQge1xuICBjb2xsZWN0aW9uLFxuICBxdWVyeSxcbiAgd2hlcmUsXG4gIGdldERvY3MsXG4gIGRvYyxcbiAgb3JkZXJCeSxcbiAgbGltaXQsXG4gIGdldERvYyxcbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IFBvc3QgfSBmcm9tIFwiQC90eXBlcy9UeXBlc1wiO1xuXG50eXBlIENoYXREYXRhID0ge1xuICBhdXRob3I6IHN0cmluZztcbiAgYXZhdGFyOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICBjaGF0SWQ6IHN0cmluZztcbiAgbGFzdE1lc3NhZ2U6IHN0cmluZztcbiAgdW5yZWFkQ291bnQ6IG51bWJlcjtcbn07XG5cbmNvbnN0IHVzZUZldGNoQ2hhdERhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IHsgZGF0YTogc2Vzc2lvbiB9ID0gdXNlU2Vzc2lvbigpO1xuICBjb25zdCBbY2hhdExpc3REYXRhLCBzZXRDaGF0TGlzdERhdGFdID0gdXNlU3RhdGU8Q2hhdERhdGFbXT4oW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hDaGF0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgICBjb25zdCBjaGF0c1JlZiA9IGNvbGxlY3Rpb24oZGIsIFwiY2hhdHNcIik7XG4gICAgICAgIGNvbnN0IHEgPSBxdWVyeShcbiAgICAgICAgICBjaGF0c1JlZixcbiAgICAgICAgICB3aGVyZShcIm1lbWJlcnNcIiwgXCJhcnJheS1jb250YWluc1wiLCBzZXNzaW9uLnVzZXIuaWQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNoYXREb2NzID0gYXdhaXQgZ2V0RG9jcyhxKTtcblxuICAgICAgICBsZXQgdG90YWxVbnJlYWRDb3VudCA9IDA7XG5cbiAgICAgICAgY29uc3QgZm9ybWF0RGF0ZSA9IChjcmVhdGVkQXQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmICghY3JlYXRlZEF0KSByZXR1cm4gXCJcIjtcblxuICAgICAgICAgIGxldCBtZXNzYWdlRGF0ZTtcbiAgICAgICAgICBpZiAodHlwZW9mIGNyZWF0ZWRBdC50b0RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbWVzc2FnZURhdGUgPSBjcmVhdGVkQXQudG9EYXRlKCk7IC8vIENvbnZlcnQgRmlyZWJhc2UgVGltZXN0YW1wIHRvIERhdGVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZURhdGUgPSBuZXcgRGF0ZShjcmVhdGVkQXQpOyAvLyBIYW5kbGUgb3RoZXIgZm9ybWF0c1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gbWVzc2FnZURhdGUudG9EYXRlU3RyaW5nKCkgPT09IHRvZGF5LnRvRGF0ZVN0cmluZygpO1xuXG4gICAgICAgICAgcmV0dXJuIGlzVG9kYXlcbiAgICAgICAgICAgID8gbWVzc2FnZURhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7XG4gICAgICAgICAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgICAgICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbWVzc2FnZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY2hhdERhdGFQcm9taXNlcyA9IGNoYXREb2NzLmRvY3MubWFwKGFzeW5jIChjaGF0RG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2hhdERhdGEgPSBjaGF0RG9jLmRhdGEoKTtcbiAgICAgICAgICBjb25zdCBbaW5pdGlhdG9ySWQsIHJlY2VpdmVySWRdID0gY2hhdERhdGEuY2hhdElkLnNwbGl0KFwiLVwiKTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBjdXJyZW50IHNlc3Npb24gdXNlciBpcyB0aGUgaW5pdGlhdG9yIG9yIHJlY2VpdmVyXG4gICAgICAgICAgY29uc3Qgb3RoZXJVc2VySWQgPVxuICAgICAgICAgICAgc2Vzc2lvbi51c2VyLmlkID09PSBpbml0aWF0b3JJZCA/IHJlY2VpdmVySWQgOiBpbml0aWF0b3JJZDtcbiAgICAgICAgICBjb25zdCBvdGhlclVzZXJEb2MgPSBhd2FpdCBnZXREb2MoZG9jKGRiLCBcInVzZXJzXCIsIG90aGVyVXNlcklkKSk7XG4gICAgICAgICAgY29uc3Qgb3RoZXJVc2VyRGF0YSA9IG90aGVyVXNlckRvYy5kYXRhKCk7XG5cbiAgICAgICAgICAvLyBGZXRjaCBwb3N0IGRhdGFcbiAgICAgICAgICBjb25zdCBwb3N0UmVmID0gZG9jKGRiLCBcInBvc3RzXCIsIGNoYXREYXRhLml0ZW1JZCk7XG4gICAgICAgICAgY29uc3QgcG9zdERvYyA9IGF3YWl0IGdldERvYyhwb3N0UmVmKTtcbiAgICAgICAgICBpZiAoIXBvc3REb2MuZXhpc3RzKCkpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgY29uc3QgcG9zdERhdGEgPSBwb3N0RG9jLmRhdGEoKSBhcyBQb3N0O1xuXG4gICAgICAgICAgY29uc3QgbWVzc2FnZXNRdWVyeSA9IHF1ZXJ5KFxuICAgICAgICAgICAgY29sbGVjdGlvbihkYiwgXCJjaGF0c1wiLCBjaGF0RG9jLmlkLCBcIm1lc3NhZ2VzXCIpLFxuICAgICAgICAgICAgb3JkZXJCeShcInRpbWVzdGFtcFwiLCBcImRlc2NcIiksXG4gICAgICAgICAgICBsaW1pdCgxKVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZXNTbmFwc2hvdCA9IGF3YWl0IGdldERvY3MobWVzc2FnZXNRdWVyeSk7XG4gICAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBtZXNzYWdlc1NuYXBzaG90LmRvY3NbMF0/LmRhdGEoKT8udGV4dCB8fCBcIlwiO1xuXG4gICAgICAgICAgY29uc3QgdW5yZWFkTWVzc2FnZXNRdWVyeSA9IHF1ZXJ5KFxuICAgICAgICAgICAgY29sbGVjdGlvbihkYiwgXCJjaGF0c1wiLCBjaGF0RG9jLmlkLCBcIm1lc3NhZ2VzXCIpLFxuICAgICAgICAgICAgd2hlcmUoXCJpc1JlYWRcIiwgXCI9PVwiLCBmYWxzZSksXG4gICAgICAgICAgICB3aGVyZShcInNlbmRlci5pZFwiLCBcIiE9XCIsIHNlc3Npb24udXNlci5pZClcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHVucmVhZE1lc3NhZ2VzU25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHVucmVhZE1lc3NhZ2VzUXVlcnkpO1xuICAgICAgICAgIGNvbnN0IHVucmVhZENvdW50ID0gdW5yZWFkTWVzc2FnZXNTbmFwc2hvdC5kb2NzLmxlbmd0aDtcblxuICAgICAgICAgIHRvdGFsVW5yZWFkQ291bnQgKz0gdW5yZWFkQ291bnQ7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXV0aG9yOiBvdGhlclVzZXJEYXRhPy5uYW1lIHx8IFwiVW5rbm93biBVc2VyXCIsXG4gICAgICAgICAgICBhdmF0YXI6IG90aGVyVXNlckRhdGE/LmltYWdlIHx8IFwiL3BhdGgvdG8vZGVmYXVsdC9hdmF0YXIuanBnXCIsXG4gICAgICAgICAgICB0aXRsZTogcG9zdERhdGEudGl0bGUsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IGNoYXREYXRhLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgIGNoYXRJZDogY2hhdERvYy5pZCxcbiAgICAgICAgICAgIGxhc3RNZXNzYWdlOlxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZS5sZW5ndGggPiA1MFxuICAgICAgICAgICAgICAgID8gbGFzdE1lc3NhZ2Uuc3Vic3RyaW5nKDAsIDQ3KSArIFwiLi4uXCJcbiAgICAgICAgICAgICAgICA6IGxhc3RNZXNzYWdlLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzb2x2ZWRDaGF0RGF0YSA9IChhd2FpdCBQcm9taXNlLmFsbChjaGF0RGF0YVByb21pc2VzKSlcbiAgICAgICAgICAuZmlsdGVyKChkYXRhKTogZGF0YSBpcyBOb25OdWxsYWJsZTx0eXBlb2YgZGF0YT4gPT4gZGF0YSAhPT0gbnVsbClcbiAgICAgICAgICAubWFwKChjaGF0KSA9PiAoe1xuICAgICAgICAgICAgLi4uY2hhdCxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogZm9ybWF0RGF0ZShjaGF0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgIHNldENoYXRMaXN0RGF0YShyZXNvbHZlZENoYXREYXRhKTtcbiAgICAgICAgcmV0dXJuIHRvdGFsVW5yZWFkQ291bnQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZldGNoQ2hhdHMoKTtcbiAgfSwgW3Nlc3Npb25dKTtcbiAgcmV0dXJuIHsgY2hhdExpc3REYXRhLCBzZXRDaGF0TGlzdERhdGEgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUZldGNoQ2hhdERhdGE7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJkYiIsImNvbGxlY3Rpb24iLCJxdWVyeSIsIndoZXJlIiwiZ2V0RG9jcyIsImRvYyIsIm9yZGVyQnkiLCJsaW1pdCIsImdldERvYyIsInVzZVNlc3Npb24iLCJ1c2VGZXRjaENoYXREYXRhIiwiZGF0YSIsInNlc3Npb24iLCJjaGF0TGlzdERhdGEiLCJzZXRDaGF0TGlzdERhdGEiLCJmZXRjaENoYXRzIiwidXNlciIsImlkIiwiY2hhdHNSZWYiLCJxIiwiY2hhdERvY3MiLCJ0b3RhbFVucmVhZENvdW50IiwiZm9ybWF0RGF0ZSIsImNyZWF0ZWRBdCIsIm1lc3NhZ2VEYXRlIiwidG9EYXRlIiwiRGF0ZSIsInRvZGF5IiwiaXNUb2RheSIsInRvRGF0ZVN0cmluZyIsInRvTG9jYWxlVGltZVN0cmluZyIsImhvdXIiLCJtaW51dGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJjaGF0RGF0YVByb21pc2VzIiwiZG9jcyIsIm1hcCIsImNoYXREb2MiLCJtZXNzYWdlc1NuYXBzaG90IiwiY2hhdERhdGEiLCJpbml0aWF0b3JJZCIsInJlY2VpdmVySWQiLCJjaGF0SWQiLCJzcGxpdCIsIm90aGVyVXNlcklkIiwib3RoZXJVc2VyRG9jIiwib3RoZXJVc2VyRGF0YSIsInBvc3RSZWYiLCJpdGVtSWQiLCJwb3N0RG9jIiwiZXhpc3RzIiwicG9zdERhdGEiLCJtZXNzYWdlc1F1ZXJ5IiwibGFzdE1lc3NhZ2UiLCJ0ZXh0IiwidW5yZWFkTWVzc2FnZXNRdWVyeSIsInVucmVhZE1lc3NhZ2VzU25hcHNob3QiLCJ1bnJlYWRDb3VudCIsImxlbmd0aCIsImF1dGhvciIsIm5hbWUiLCJhdmF0YXIiLCJpbWFnZSIsInRpdGxlIiwic3Vic3RyaW5nIiwicmVzb2x2ZWRDaGF0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJmaWx0ZXIiLCJjaGF0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useFecthChatData.ts\n"));

/***/ })

});