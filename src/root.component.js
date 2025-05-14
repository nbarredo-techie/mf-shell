import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { routes } from './routes';
import { Button } from 'shared-ui';
export default function Root() {
    return (_jsxs("div", { className: "flex h-screen font-sans bg-slate-50 text-slate-900", children: [_jsxs("aside", { className: "w-64 bg-white border-r border-slate-200 p-6 shadow-sm flex flex-col", children: [_jsxs("h2", { className: "mb-6 text-xl font-bold flex items-center gap-2 text-slate-800", children: [_jsx("span", { children: "\uD83D\uDCCB" }), " Microfrontends"] }), _jsx("ul", { className: "flex-1 space-y-2", children: routes.map(route => (_jsx("li", { children: _jsx(Button, { asChild: true, variant: "secondary", className: "w-full justify-start text-slate-700", children: _jsx("a", { href: route.path, children: route.label }) }) }, route.path))) })] }), "      ", _jsx("main", { className: "flex-1 p-8 bg-slate-50", children: _jsx("div", { id: "single-spa-application:@mf/shell" }) })] }));
}
