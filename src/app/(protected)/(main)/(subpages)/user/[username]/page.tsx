import UserComponent from '@/components/pages/subpages/user/userProfile';

export default function UserPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <UserComponent username={params.username} />
  );
}
