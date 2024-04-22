import Card from "./Card";

interface userObj {
  firstName: string;
  lastName: string;
  email: string;
}

const UsersBoard = ({ users }: { users: userObj[] }) => {
  return (
    <Card>
      <div className=''>
        {users.map((user, index) => (
          <div key={index} className='flex justify-between'>
            <h1>{user.firstName + " " + user.lastName}</h1>
            <h1>{user.email}</h1>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UsersBoard;
