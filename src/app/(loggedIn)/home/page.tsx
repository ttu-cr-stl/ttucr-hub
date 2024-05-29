import { getAllUsers } from "@/db/users";

export default async function Home() {

  const users = await getAllUsers();

  console.log(users)

  return (
    <div className="flex flex-col pt-12 px-8">
      {users.map((user) => (
        <div key={user.id} className="">
          {user.name}
        </div>
      ))}
    </div>
  );
}
