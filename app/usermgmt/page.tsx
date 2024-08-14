import UserManagementComponent from "./components/UserManagement";

export const metadata = {
  title: 'User Management',
  description: 'home page description'
}

export default function UserManagement() {
  return (
    <div className="mt-[200px]">

      <h2 className='text-3xl font-bold tracking-wide text-center'>Welcome to User Management Page,</h2>
      <h2 className='text-3xl font-bold tracking-wide text-center mb-8'>Try to move the user tiles around for some fun</h2>
      <UserManagementComponent />
    </div>
  );
}