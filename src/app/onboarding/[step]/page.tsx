import OrgsOnboard from "../steps/OrgsOnboard";
import PersonalOnboard from "../steps/PersonalOnboard";

const steps: { [key: string]: JSX.Element } = {
  1: <PersonalOnboard />,
  // 2: <OrgsOnboard user={{
  //   id: 1;
  //   email: string;
  //   name: string | null;
  //   profilePic: string | null;
  //   addres: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  // }} />,
};

export default function Onboarding({ params }: { params: { step: string } }) {
  
  // Do check for @ttu email in onboarding /^[A-Za-z0-9._%+-]+@testdomain\.com$/.test(user.email?.toString() || "")

  return <div className="">{steps[Number(params.step)]}</div>;
}
