

export default async function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    const params = await props.params;
    const { company_name } = params;
    console.log('company', company_name);

    return (
        <div>
            Company Detail Page for
            {company_name}
        </div>
    );
}