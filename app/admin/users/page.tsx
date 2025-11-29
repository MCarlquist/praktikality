/**
 * Renders the Users admin page with a heading and a short description for managing user details.
 *
 * @returns The JSX layout: a container with a "User Page Admin" heading and a paragraph welcoming the user to manage user details.
 */
export default function UsersAdminPage() {
    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            
            <div className="flex flex-col gap-2 items-start">
                <h2 className="font-bold text-2xl mb-4">User Page Admin</h2>
                <p>Welcome to the user page admin. Here you can manage user details.</p>
            </div>
        </div>
    );
}