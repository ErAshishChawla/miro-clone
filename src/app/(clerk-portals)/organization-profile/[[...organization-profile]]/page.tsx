import { paths } from "@/paths";
import { OrganizationProfile } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <OrganizationProfile
        routing="path"
        path="/organization-profile"
        afterLeaveOrganizationUrl={paths.home()}
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            },
            card: {
              width: "100%",
              margin: "0",
              padding: "0",
              maxWidth: "100%",
              borderRadius: "0",
            },
            scrollBox: {
              borderRadius: "0",
            },
          },
        }}
      />
    </div>
  );
}
