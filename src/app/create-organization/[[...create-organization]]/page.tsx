import { paths } from "@/paths";
import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CreateOrganization
        afterCreateOrganizationUrl={paths.home()}
        routing="path"
        path={paths.createOrganization()}
      />
    </div>
  );
}
