import ProfileOveview from "@/features/profile/components/profile-overview";
import { getSession } from "@/lib/getSession";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect(signInPath);
  }

  return <ProfileOveview user={session.user} />;
}
export default ProfilePage;
