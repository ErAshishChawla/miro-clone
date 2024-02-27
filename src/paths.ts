import { CreateOrganization } from "@clerk/nextjs";

export const paths = {
  home() {
    return "/";
  },
  createOrganization() {
    return "/create-organization";
  },
};
