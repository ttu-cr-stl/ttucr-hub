import { getAllOrgs } from "@/db/orgs";
import OrgCard from "./OrgCard";

async function OrgsList() {
  try {
    const orgs = await getAllOrgs();
    return (
      <div className={"flex flex-col space-y-2"}>
        {orgs.map((org) => <OrgCard key={org.id} org={org} />)}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <span>Something went wrong</span>;
  }
}

export default OrgsList;
