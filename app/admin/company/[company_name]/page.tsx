

export default async function CompanyDetailPage ( { params }: { params: { company_name: string } } ) {
    const { company_name } = params;
    console.log('company', company_name);
    
    return (
        <div>
            Company Detail Page for
            {company_name}
        </div>
    );
}