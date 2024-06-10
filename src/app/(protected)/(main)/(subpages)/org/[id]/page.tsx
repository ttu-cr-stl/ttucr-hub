import { getOrgById } from "@/db/orgs";
import { getAllOrgs } from "@/db/orgs";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Org({ params }: { params: { id: string } }) {
  const org = await getOrgById(params.id);

  if (!org) return <div>Organization not found</div>;

  let orgInitials = org.name.split(' ').map((word) => word[0]).join('');

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4 font-bold">
        <div className="relative w-52 h-52 flex items-center justify-center bg-gray-200 rounded-full border-2 border-gray-300 overflow-hidden">
          <Image className="object-cover" src={org.orgPicture ?? ''} alt='' layout="fill" />
          { !org.orgPicture && <span className="absolute text-gray-500 text-4xl">{orgInitials}</span> }
        </div>

        <span className="text-xl text-gray-800">{org.name}</span>
        <span className="text-md text-gray-600 text-justify">{org.description}</span>
        <span className="text-lg text-gray-800 text-center">{org.name}'s Board Members</span>

        <div className="w-full space-y-2 text-center">
          {org.officers.map((member) => (
            <div className="text-sm text-gray-600" key={member?.position}>
              <span>{member?.position}</span>: <br />
              <span className="font-semibold">{member?.email}</span>
            </div>
          ))}
        </div>

        <Button className="mt-4 font-bold py-2 px-4 rounded">
          Ask to join
        </Button>
      </div>
    </div>

  );
}
