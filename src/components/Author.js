import { Avatar } from "primereact/avatar";

const Author = ({ name, date, avatar }) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar image={avatar} shape="circle" />
      <p>{name},</p>
      <p className="text-gray-500">{date}</p>
    </div>
  );
};

export default Author;
