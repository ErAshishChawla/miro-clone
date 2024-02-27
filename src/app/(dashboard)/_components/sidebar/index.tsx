import React from "react";

import CreateOrganisationButton from "./create-organisation-button";
import OrganisationList from "./organisation-list";

function Sidebar() {
  return (
    <aside className="bg-blue-950 h-full flex flex-col p-4 gap-y-4">
      <CreateOrganisationButton />
      <OrganisationList />
    </aside>
  );
}

export default Sidebar;
