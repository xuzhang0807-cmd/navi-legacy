import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { SessionProvider, useSession } from "@/features/auth/SessionProvider";
import { EditModeProvider } from "@/features/navigation/EditModeContext";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";
import { ToastProvider } from "@/shared/ui/Toast";
import { SiteLayout } from "./layout/SiteLayout";
import { APP_ROUTES } from "./routes";

/** 编辑模式只在站长视图下可用，由会话状态决定。 */
function EditModeBridge({ children }: { children: ReactNode }) {
  const { isAdmin } = useSession();
  return <EditModeProvider enabled={isAdmin}>{children}</EditModeProvider>;
}

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SessionProvider>
          <EditModeBridge>
            <BrowserRouter>
              <Routes>
                <Route element={<SiteLayout />}>
                  {APP_ROUTES.filter((route) => route.status === "live").map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </EditModeBridge>
        </SessionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
