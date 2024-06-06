import SubPageLayout from "@/components/layout/SubPageLayout";
import { UpdateProfile } from "@/components/pages/settings/UpdateProfile";

export default function Profile() {
    return (
      <SubPageLayout backHref="/settings">
        <UpdateProfile />
      </SubPageLayout>
    );
}