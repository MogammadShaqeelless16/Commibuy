import Layout from '../layout'; // Adjust import to reflect the correct path

const Orders: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl font-bold">Orders</h1>
      <p className="mt-4 text-base md:text-lg">Manage your orders here.</p>
    </Layout>
  );
};

export default Orders;
