import React from "react";

import CreateOrganizationButton from "./create-organization-button";
import OrganizationList from "./organization-list";

function Sidebar() {
  return (
    <aside className="bg-blue-950 h-full flex flex-col p-4 gap-y-4">
      <CreateOrganizationButton />
      <OrganizationList />
    </aside>
  );
}

export default Sidebar;
