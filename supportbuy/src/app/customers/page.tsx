import Layout from '../layout'; // Adjust import to reflect the correct path

const Customers: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl font-bold">Customers</h1>
      <p className="mt-4 text-base md:text-lg">Manage your customers here.</p>
    </Layout>
  );
};

export default Customers;
