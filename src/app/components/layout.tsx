import Header from "./header";

type TProps = { children: React.ReactNode };

function Layout({ children }: TProps) {
  return (
    <div className="layout">
      <div className="layout__inner">
        <div className="layout__body">
          <div className="layout__header">
            <Header />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;