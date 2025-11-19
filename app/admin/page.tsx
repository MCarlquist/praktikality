import { InfoIcon } from "lucide-react";


export default function AdminPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is the admin page that you can only see as an authenticated admin
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Here you can manage the application.</p>
      </div>
    </div>
  );
}