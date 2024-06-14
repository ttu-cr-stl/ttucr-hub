import { getAllOrgs } from "@/db/orgs";
import OrgCard from "@/components/ui/OrgCard";

async function OrgsList() {
  const orgs = await getAllOrgs();
  return (
    <div>
      {orgs.map((org) => (
        <OrgCard key={org.id} org={org} />
      ))}
    </div>
  );
}

export default OrgsList;

