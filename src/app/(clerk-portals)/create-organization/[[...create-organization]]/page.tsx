import { paths } from "@/paths";
import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CreateOrganization
        afterCreateOrganizationUrl={paths.home()}
        routing="path"
        path={paths.createOrganization()}
      />
    </div>
  );
}
