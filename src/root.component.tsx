import { routes } from './routes'; 
import { Button } from "@/components/ui/button"

export default function Root() {
  return (
    <div className="flex h-screen font-sans bg-slate-50 text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 shadow-sm flex flex-col">
        <h2 className="mb-6 text-xl font-bold flex items-center gap-2 text-slate-800">
          <span>📋</span> Microfrontends
        </h2>
        <ul className="flex-1 space-y-2">
          {routes.map(route => (
            <li key={route.path}>
              <Button asChild variant="secondary" className="w-full justify-start text-slate-700">
                <a href={route.path}>{route.label}</a>
              </Button>
            </li>
          ))}
        </ul>
      </aside>      <main className="flex-1 p-8 bg-slate-50">
        {/* single-spa will mount microfrontend apps here */}
        <div id="single-spa-application:@mf/shell" />
      </main>
    </div>
  );
}
