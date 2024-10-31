import { STUCO } from "@/lib/utils/consts";
import { Badge } from "../ui/badge";

const StucoTitle = ({ username }: { username: string }) => {
  const badge = STUCO.find((user) => user.username === username);
  if (!badge) return null;

  return <Badge className="bg-[#9C4544]">{badge.name}</Badge>;
};

export default StucoTitle;
