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

/***/ "(app-pages-browser)/./lib/converters/User.ts":
/*!********************************!*\
  !*** ./lib/converters/User.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   userRef: function() { return /* binding */ userRef; },\n/* harmony export */   usersRef: function() { return /* binding */ usersRef; }\n/* harmony export */ });\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.ts\");\n\n\nconst UserConverter = {\n    toFirestore: function(user) {\n        return {\n            ...user\n        };\n    },\n    fromFirestore: function(snapshot, options) {\n        const data = snapshot.data(options);\n        const user = {\n            id: snapshot.id,\n            name: data.name,\n            email: data.email,\n            image: data.image,\n            schoolCode: data.schoolCode,\n            createdAt: data.createdAt,\n            updatedAt: data.updatedAt,\n            posts: data.posts,\n            hasBankDetails: data.hasBankDetails,\n            bankDetails: data.bankDetails,\n            likedQuestions: data.likedQuestions,\n            likedComments: data.likedComments,\n            notifications: data.notifications,\n            unreadMessages: data.unreadMessages,\n            isunreadMessagesEmailSent: data.isunreadMessagesEmailSent,\n            hasOptOutNotifications: data.hasOptOutNotifications\n        };\n        return user;\n    }\n};\nconst userRef = (userId)=>(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"users\", userId).withConverter(UserConverter);\nconst usersRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, \"users\").withConverter(UserConverter);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9jb252ZXJ0ZXJzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU80QjtBQUVJO0FBRWhDLE1BQU1HLGdCQUE4QztJQUNsREMsYUFBYSxTQUFVQyxJQUFVO1FBQy9CLE9BQU87WUFBRSxHQUFHQSxJQUFJO1FBQUM7SUFDbkI7SUFDQUMsZUFBZSxTQUNiQyxRQUErQixFQUMvQkMsT0FBd0I7UUFFeEIsTUFBTUMsT0FBT0YsU0FBU0UsSUFBSSxDQUFDRDtRQUUzQixNQUFNSCxPQUFhO1lBQ2pCSyxJQUFJSCxTQUFTRyxFQUFFO1lBQ2ZDLE1BQU1GLEtBQUtFLElBQUk7WUFDZkMsT0FBT0gsS0FBS0csS0FBSztZQUNqQkMsT0FBT0osS0FBS0ksS0FBSztZQUNqQkMsWUFBWUwsS0FBS0ssVUFBVTtZQUMzQkMsV0FBV04sS0FBS00sU0FBUztZQUN6QkMsV0FBV1AsS0FBS08sU0FBUztZQUN6QkMsT0FBT1IsS0FBS1EsS0FBSztZQUNqQkMsZ0JBQWdCVCxLQUFLUyxjQUFjO1lBQ25DQyxhQUFhVixLQUFLVSxXQUFXO1lBQzdCQyxnQkFBZ0JYLEtBQUtXLGNBQWM7WUFDbkNDLGVBQWVaLEtBQUtZLGFBQWE7WUFDakNDLGVBQWViLEtBQUthLGFBQWE7WUFDakNDLGdCQUFnQmQsS0FBS2MsY0FBYztZQUNuQ0MsMkJBQTJCZixLQUFLZSx5QkFBeUI7WUFDekRDLHdCQUF3QmhCLEtBQUtnQixzQkFBc0I7UUFDckQ7UUFDQSxPQUFPcEI7SUFDVDtBQUNGO0FBRU8sTUFBTXFCLFVBQVUsQ0FBQ0MsU0FDdEIzQix1REFBR0EsQ0FBQ0UseUNBQUVBLEVBQUUsU0FBU3lCLFFBQVFDLGFBQWEsQ0FBQ3pCLGVBQWU7QUFFakQsTUFBTTBCLFdBQVc1Qiw4REFBVUEsQ0FBQ0MseUNBQUVBLEVBQUUsU0FBUzBCLGFBQWEsQ0FBQ3pCLGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2NvbnZlcnRlcnMvVXNlci50cz81NjU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEZpcmVzdG9yZURhdGFDb252ZXJ0ZXIsXG4gIFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdCxcbiAgU25hcHNob3RPcHRpb25zLFxuICBEb2N1bWVudERhdGEsXG4gIGRvYyxcbiAgY29sbGVjdGlvbixcbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAL3R5cGVzL1R5cGVzXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2ZpcmViYXNlXCI7XG5cbmNvbnN0IFVzZXJDb252ZXJ0ZXI6IEZpcmVzdG9yZURhdGFDb252ZXJ0ZXI8VXNlcj4gPSB7XG4gIHRvRmlyZXN0b3JlOiBmdW5jdGlvbiAodXNlcjogVXNlcik6IERvY3VtZW50RGF0YSB7XG4gICAgcmV0dXJuIHsgLi4udXNlciB9O1xuICB9LFxuICBmcm9tRmlyZXN0b3JlOiBmdW5jdGlvbiAoXG4gICAgc25hcHNob3Q6IFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdCxcbiAgICBvcHRpb25zOiBTbmFwc2hvdE9wdGlvbnNcbiAgKTogVXNlciB7XG4gICAgY29uc3QgZGF0YSA9IHNuYXBzaG90LmRhdGEob3B0aW9ucyk7XG5cbiAgICBjb25zdCB1c2VyOiBVc2VyID0ge1xuICAgICAgaWQ6IHNuYXBzaG90LmlkLFxuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgZW1haWw6IGRhdGEuZW1haWwsXG4gICAgICBpbWFnZTogZGF0YS5pbWFnZSxcbiAgICAgIHNjaG9vbENvZGU6IGRhdGEuc2Nob29sQ29kZSxcbiAgICAgIGNyZWF0ZWRBdDogZGF0YS5jcmVhdGVkQXQsXG4gICAgICB1cGRhdGVkQXQ6IGRhdGEudXBkYXRlZEF0LFxuICAgICAgcG9zdHM6IGRhdGEucG9zdHMsXG4gICAgICBoYXNCYW5rRGV0YWlsczogZGF0YS5oYXNCYW5rRGV0YWlscyxcbiAgICAgIGJhbmtEZXRhaWxzOiBkYXRhLmJhbmtEZXRhaWxzLFxuICAgICAgbGlrZWRRdWVzdGlvbnM6IGRhdGEubGlrZWRRdWVzdGlvbnMsXG4gICAgICBsaWtlZENvbW1lbnRzOiBkYXRhLmxpa2VkQ29tbWVudHMsXG4gICAgICBub3RpZmljYXRpb25zOiBkYXRhLm5vdGlmaWNhdGlvbnMsXG4gICAgICB1bnJlYWRNZXNzYWdlczogZGF0YS51bnJlYWRNZXNzYWdlcyxcbiAgICAgIGlzdW5yZWFkTWVzc2FnZXNFbWFpbFNlbnQ6IGRhdGEuaXN1bnJlYWRNZXNzYWdlc0VtYWlsU2VudCxcbiAgICAgIGhhc09wdE91dE5vdGlmaWNhdGlvbnM6IGRhdGEuaGFzT3B0T3V0Tm90aWZpY2F0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiB1c2VyO1xuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZXJSZWYgPSAodXNlcklkOiBzdHJpbmcpID0+XG4gIGRvYyhkYiwgXCJ1c2Vyc1wiLCB1c2VySWQpLndpdGhDb252ZXJ0ZXIoVXNlckNvbnZlcnRlcik7XG5cbmV4cG9ydCBjb25zdCB1c2Vyc1JlZiA9IGNvbGxlY3Rpb24oZGIsIFwidXNlcnNcIikud2l0aENvbnZlcnRlcihVc2VyQ29udmVydGVyKTtcbiJdLCJuYW1lcyI6WyJkb2MiLCJjb2xsZWN0aW9uIiwiZGIiLCJVc2VyQ29udmVydGVyIiwidG9GaXJlc3RvcmUiLCJ1c2VyIiwiZnJvbUZpcmVzdG9yZSIsInNuYXBzaG90Iiwib3B0aW9ucyIsImRhdGEiLCJpZCIsIm5hbWUiLCJlbWFpbCIsImltYWdlIiwic2Nob29sQ29kZSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsInBvc3RzIiwiaGFzQmFua0RldGFpbHMiLCJiYW5rRGV0YWlscyIsImxpa2VkUXVlc3Rpb25zIiwibGlrZWRDb21tZW50cyIsIm5vdGlmaWNhdGlvbnMiLCJ1bnJlYWRNZXNzYWdlcyIsImlzdW5yZWFkTWVzc2FnZXNFbWFpbFNlbnQiLCJoYXNPcHRPdXROb3RpZmljYXRpb25zIiwidXNlclJlZiIsInVzZXJJZCIsIndpdGhDb252ZXJ0ZXIiLCJ1c2Vyc1JlZiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/converters/User.ts\n"));

/***/ })

});