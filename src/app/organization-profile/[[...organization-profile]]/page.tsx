import { paths } from "@/paths";
import { OrganizationProfile } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <OrganizationProfile
        routing="path"
        path="/organization-profile"
        afterLeaveOrganizationUrl={paths.home()}
      />
    </div>
  );
}
