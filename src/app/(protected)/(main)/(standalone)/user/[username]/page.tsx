export default function User({ params }: { params: { username: string } }) {
  console.log(params.username);
  return <div className="">{params.username}</div>;
}
