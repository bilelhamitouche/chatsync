import SettingsTabs from "./components/SettingsTabs";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container justify-center py-8 mx-auto space-y-4 max-w-3xl h-full">
      <h1 className="text-2xl font-bold">Settings</h1>
      <SettingsTabs>{children}</SettingsTabs>
    </div>
  );
}

export default Layout;
