import { getAllOrgs } from "@/db/orgs";
import OrgCard from "@/components/ui/OrgCard";

async function OrgsList() {
  try {
    const orgs = await getAllOrgs();
    return orgs.map((org) => <OrgCard key={org.id} org={org} />);
  } catch (error) {
    console.log(error);
    return <span>Something went wrong</span>;
  }
}

export default OrgsList;
