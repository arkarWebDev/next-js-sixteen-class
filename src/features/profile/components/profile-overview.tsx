import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileOverview } from "../queries/get-profile-overview";
import { Badge } from "@/components/ui/badge";
import { Crown, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { postsPath } from "@/path";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PremiumUpgradeButton from "./premium-upgrade-button";

interface ProfileOveviewProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

async function ProfileOveview({ user }: ProfileOveviewProps) {
  const {
    isPremium,
    postsCount,
    commentsCount,
    premiumAmount,
    premiumCurrency,
    premiumExpiresAt,
    premiumLastPaymentAt,
  } = await getProfileOverview(user.id);

  const formattedExpiry = premiumExpiresAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumExpiresAt,
      )
    : "N/A";

  const formattedLastPayment = premiumLastPaymentAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumLastPaymentAt,
      )
    : "N/A";

  const formattedPayment =
    premiumAmount && premiumCurrency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: premiumCurrency.toUpperCase(),
        }).format(premiumAmount / 100)
      : "N/A";

  const planLabel = isPremium ? "Premium Member" : "Free Member";

  return (
    <main className="max-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4 border rounded-2xl p-6 justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="text-xl font-semibold">
              {user.name.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              {isPremium && (
                <Badge className="border bg-amber-500 text-black cursor-pointer">
                  <Crown className="mr-1 h-3 w-3" /> Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={postsPath}>View my posts</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Posts</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{postsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Comments</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{commentsCount}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>Membership</CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="text-sm font-medium">{planLabel}</span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm text-muted-foreground">Expired</span>
            <span className="text-sm font-medium">{formattedExpiry}</span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm text-muted-foreground">Last payment</span>
            <span className="text-sm font-medium">{formattedLastPayment}</span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-sm font-medium">{formattedPayment}</span>
          </div>

          {!isPremium ? <PremiumUpgradeButton /> : null}
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfileOveview;
