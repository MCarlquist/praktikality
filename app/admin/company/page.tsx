import { DataTable } from "@/components/admin/data-table";
import EmptyArea from "@/components/admin/empty-area";



export default function CompanyAdminPage() {
    return (
        <>
            {/* If there are no companies */}
            <EmptyArea title="No Companies Yet"
                description={"You haven\'t created any companies yet. Get started by creating your first company."}
                cta="Create Company"
            />
            {/* If there are companies, show the data table */}
            <DataTable /> 
        </>
    );
}