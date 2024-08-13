import { STUCO } from "@/lib/utils/consts";
import { Badge } from "../ui/shadcn/badge";

const StucoTitle = ({ username }: { username: string }) => {
  const badge = STUCO.find((user) => user.username === username);
  if (!badge) return null;
  
  return (
    <Badge className="bg-blue-500">
      {badge.name}
    </Badge>
  );
};

export default StucoTitle;
