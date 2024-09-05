import Image from "next/image";
import kv from "@vercel/kv";

export default async function Home() {
  // await kv.set("user_1_session", "session_token_value");
  // console.time("kv");
  // const session = await kv.get("user_1_session");
  // console.timeEnd("kv");

  return <div className="">
    {/* {session} */}
  </div>;
}
