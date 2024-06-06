export default function Org({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <span>{params.id}</span>
    </div>
  );
}
