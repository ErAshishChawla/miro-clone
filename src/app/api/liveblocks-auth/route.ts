import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs";

import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_CQHy4q3Gga8BQkyIe7x8HPY3Bdul2HIfmLsklDHO0JZPc-wCLuAtj8U1biQr-L7h",
});

export async function POST(request: Request) {
  const authorization = auth();
  const user = await currentUser();

  // console.log("AUTH_INFO", {
  //   authorization,
  //   user,
  // });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.getBoard, { id: room });

  // console.log("AUTH_INFO", {
  //   room,
  //   board,
  //   boardOrgId: board?.orgId,
  //   userOrgId: authorization.orgId,
  // });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };

  // console.log({ userInfo });

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  // console.log(
  //   {
  //     status,
  //     body,
  //   },
  //   "ALLOWED"
  // );
  return new Response(body, { status });
}
