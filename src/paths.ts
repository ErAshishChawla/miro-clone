import { CreateOrganization } from "@clerk/nextjs";

export const paths = {
  home() {
    return "/";
  },
  CreateOrganization() {
    return "/create-organization";
  },
};
