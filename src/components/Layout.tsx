import React, { PropsWithChildren } from "react";

type Props = {};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      {children}
    </div>
  );
};

export default Layout;
