import { getOrgById } from "@/db/orgs";
import { getAllOrgs } from "@/db/orgs";

export default async function Org({ params }: { params: { id: string } }) {
  const org = await getOrgById(params.id);
  if (!org) return <div>Organization not found</div>;
  console.log(org);

  return (
    <div className="">
      <div className={"flex flex-col space-y-2 font-bold"}>
        <span>{org.name}</span>
        <span>{org.description}</span>
      </div>
    </div>
  );
}
