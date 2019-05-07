"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nquery locale (\n    $locale: String!\n) {\n    locale (locale: $locale) {\n        locale\n        messages\n    }\n}";