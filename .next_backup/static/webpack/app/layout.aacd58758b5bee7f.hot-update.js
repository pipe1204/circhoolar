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

/***/ "(app-pages-browser)/./lib/converters/User.ts":
/*!********************************!*\
  !*** ./lib/converters/User.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   userRef: function() { return /* binding */ userRef; },\n/* harmony export */   usersRef: function() { return /* binding */ usersRef; }\n/* harmony export */ });\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n\n\nconst UserConverter = {\n    toFirestore: function(user) {\n        return {\n            ...user\n        };\n    },\n    fromFirestore: function(snapshot, options) {\n        const data = snapshot.data(options);\n        const user = {\n            id: snapshot.id,\n            name: data.name,\n            email: data.email,\n            image: data.image,\n            schoolCode: data.schoolCode,\n            createdAt: data.createdAt,\n            updatedAt: data.updatedAt,\n            posts: data.posts,\n            hasBankDetails: data.hasBankDetails,\n            bankDetails: data.bankDetails,\n            likedQuestions: data.likedQuestions,\n            likedComments: data.likedComments,\n            notifications: data.notifications,\n            unreadMessages: data.unreadMessages,\n            isUnreadMessagesEmailSent: data.isunreadMessagesEmailSent,\n            isUnreadnotificationsEmailSent: data.isunreadnotificationsEmailSent,\n            hasOptOutNotifications: data.hasOptOutNotifications\n        };\n        return user;\n    }\n};\nconst userRef = (userId)=>(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"users\", userId).withConverter(UserConverter);\nconst usersRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"users\").withConverter(UserConverter);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9jb252ZXJ0ZXJzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU80QjtBQUVJO0FBRWhDLE1BQU1HLGdCQUE4QztJQUNsREMsYUFBYSxTQUFVQyxJQUFVO1FBQy9CLE9BQU87WUFBRSxHQUFHQSxJQUFJO1FBQUM7SUFDbkI7SUFDQUMsZUFBZSxTQUNiQyxRQUErQixFQUMvQkMsT0FBd0I7UUFFeEIsTUFBTUMsT0FBT0YsU0FBU0UsSUFBSSxDQUFDRDtRQUUzQixNQUFNSCxPQUFhO1lBQ2pCSyxJQUFJSCxTQUFTRyxFQUFFO1lBQ2ZDLE1BQU1GLEtBQUtFLElBQUk7WUFDZkMsT0FBT0gsS0FBS0csS0FBSztZQUNqQkMsT0FBT0osS0FBS0ksS0FBSztZQUNqQkMsWUFBWUwsS0FBS0ssVUFBVTtZQUMzQkMsV0FBV04sS0FBS00sU0FBUztZQUN6QkMsV0FBV1AsS0FBS08sU0FBUztZQUN6QkMsT0FBT1IsS0FBS1EsS0FBSztZQUNqQkMsZ0JBQWdCVCxLQUFLUyxjQUFjO1lBQ25DQyxhQUFhVixLQUFLVSxXQUFXO1lBQzdCQyxnQkFBZ0JYLEtBQUtXLGNBQWM7WUFDbkNDLGVBQWVaLEtBQUtZLGFBQWE7WUFDakNDLGVBQWViLEtBQUthLGFBQWE7WUFDakNDLGdCQUFnQmQsS0FBS2MsY0FBYztZQUNuQ0MsMkJBQTJCZixLQUFLZ0IseUJBQXlCO1lBQ3pEQyxnQ0FBZ0NqQixLQUFLa0IsOEJBQThCO1lBQ25FQyx3QkFBd0JuQixLQUFLbUIsc0JBQXNCO1FBQ3JEO1FBQ0EsT0FBT3ZCO0lBQ1Q7QUFDRjtBQUVPLE1BQU13QixVQUFVLENBQUNDLFNBQ3RCOUIsdURBQUdBLENBQUNFLHlDQUFFQSxFQUFFLFNBQVM0QixRQUFRQyxhQUFhLENBQUM1QixlQUFlO0FBRWpELE1BQU02QixXQUFXL0IsOERBQVVBLENBQUNDLHlDQUFFQSxFQUFFLFNBQVM2QixhQUFhLENBQUM1QixlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2xpYi9jb252ZXJ0ZXJzL1VzZXIudHM/NTY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBGaXJlc3RvcmVEYXRhQ29udmVydGVyLFxuICBRdWVyeURvY3VtZW50U25hcHNob3QsXG4gIFNuYXBzaG90T3B0aW9ucyxcbiAgRG9jdW1lbnREYXRhLFxuICBkb2MsXG4gIGNvbGxlY3Rpb24sXG59IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiQC90eXBlcy9UeXBlc1wiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9maXJlYmFzZVwiO1xuXG5jb25zdCBVc2VyQ29udmVydGVyOiBGaXJlc3RvcmVEYXRhQ29udmVydGVyPFVzZXI+ID0ge1xuICB0b0ZpcmVzdG9yZTogZnVuY3Rpb24gKHVzZXI6IFVzZXIpOiBEb2N1bWVudERhdGEge1xuICAgIHJldHVybiB7IC4uLnVzZXIgfTtcbiAgfSxcbiAgZnJvbUZpcmVzdG9yZTogZnVuY3Rpb24gKFxuICAgIHNuYXBzaG90OiBRdWVyeURvY3VtZW50U25hcHNob3QsXG4gICAgb3B0aW9uczogU25hcHNob3RPcHRpb25zXG4gICk6IFVzZXIge1xuICAgIGNvbnN0IGRhdGEgPSBzbmFwc2hvdC5kYXRhKG9wdGlvbnMpO1xuXG4gICAgY29uc3QgdXNlcjogVXNlciA9IHtcbiAgICAgIGlkOiBzbmFwc2hvdC5pZCxcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgaW1hZ2U6IGRhdGEuaW1hZ2UsXG4gICAgICBzY2hvb2xDb2RlOiBkYXRhLnNjaG9vbENvZGUsXG4gICAgICBjcmVhdGVkQXQ6IGRhdGEuY3JlYXRlZEF0LFxuICAgICAgdXBkYXRlZEF0OiBkYXRhLnVwZGF0ZWRBdCxcbiAgICAgIHBvc3RzOiBkYXRhLnBvc3RzLFxuICAgICAgaGFzQmFua0RldGFpbHM6IGRhdGEuaGFzQmFua0RldGFpbHMsXG4gICAgICBiYW5rRGV0YWlsczogZGF0YS5iYW5rRGV0YWlscyxcbiAgICAgIGxpa2VkUXVlc3Rpb25zOiBkYXRhLmxpa2VkUXVlc3Rpb25zLFxuICAgICAgbGlrZWRDb21tZW50czogZGF0YS5saWtlZENvbW1lbnRzLFxuICAgICAgbm90aWZpY2F0aW9uczogZGF0YS5ub3RpZmljYXRpb25zLFxuICAgICAgdW5yZWFkTWVzc2FnZXM6IGRhdGEudW5yZWFkTWVzc2FnZXMsXG4gICAgICBpc1VucmVhZE1lc3NhZ2VzRW1haWxTZW50OiBkYXRhLmlzdW5yZWFkTWVzc2FnZXNFbWFpbFNlbnQsXG4gICAgICBpc1VucmVhZG5vdGlmaWNhdGlvbnNFbWFpbFNlbnQ6IGRhdGEuaXN1bnJlYWRub3RpZmljYXRpb25zRW1haWxTZW50LFxuICAgICAgaGFzT3B0T3V0Tm90aWZpY2F0aW9uczogZGF0YS5oYXNPcHRPdXROb3RpZmljYXRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIHVzZXI7XG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgdXNlclJlZiA9ICh1c2VySWQ6IHN0cmluZykgPT5cbiAgZG9jKGRiLCBcInVzZXJzXCIsIHVzZXJJZCkud2l0aENvbnZlcnRlcihVc2VyQ29udmVydGVyKTtcblxuZXhwb3J0IGNvbnN0IHVzZXJzUmVmID0gY29sbGVjdGlvbihkYiwgXCJ1c2Vyc1wiKS53aXRoQ29udmVydGVyKFVzZXJDb252ZXJ0ZXIpO1xuIl0sIm5hbWVzIjpbImRvYyIsImNvbGxlY3Rpb24iLCJkYiIsIlVzZXJDb252ZXJ0ZXIiLCJ0b0ZpcmVzdG9yZSIsInVzZXIiLCJmcm9tRmlyZXN0b3JlIiwic25hcHNob3QiLCJvcHRpb25zIiwiZGF0YSIsImlkIiwibmFtZSIsImVtYWlsIiwiaW1hZ2UiLCJzY2hvb2xDb2RlIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwicG9zdHMiLCJoYXNCYW5rRGV0YWlscyIsImJhbmtEZXRhaWxzIiwibGlrZWRRdWVzdGlvbnMiLCJsaWtlZENvbW1lbnRzIiwibm90aWZpY2F0aW9ucyIsInVucmVhZE1lc3NhZ2VzIiwiaXNVbnJlYWRNZXNzYWdlc0VtYWlsU2VudCIsImlzdW5yZWFkTWVzc2FnZXNFbWFpbFNlbnQiLCJpc1VucmVhZG5vdGlmaWNhdGlvbnNFbWFpbFNlbnQiLCJpc3VucmVhZG5vdGlmaWNhdGlvbnNFbWFpbFNlbnQiLCJoYXNPcHRPdXROb3RpZmljYXRpb25zIiwidXNlclJlZiIsInVzZXJJZCIsIndpdGhDb252ZXJ0ZXIiLCJ1c2Vyc1JlZiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/converters/User.ts\n"));

/***/ })

});