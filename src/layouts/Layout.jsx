import { isLogin } from "./Config/isLogin";
import DashboardLayout from "./DashboardLayout";
import MainLayout from "./MainLayout";

export const Layout = isLogin ? DashboardLayout : MainLayout;