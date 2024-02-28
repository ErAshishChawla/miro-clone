import { CreateOrganization } from "@clerk/nextjs";

export const paths = {
  home() {
    return "/";
  },
  createOrganization() {
    return "/create-organization";
  },

  organizationProfile() {
    return "/organization-profile";
  },

  userProfile() {
    return "/user-profile";
  },
  signin() {
    return "/sign-in";
  },
  signup() {
    return "/sign-up";
  },
  dashboard() {
    return "/dashboard";
  },

  board(id: string) {
    return `/board/${id}`;
  },
};
