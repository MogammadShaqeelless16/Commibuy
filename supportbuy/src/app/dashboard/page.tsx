import Layout from '../layout'; // Adjust import to reflect the correct path

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-base md:text-lg">Welcome to the dashboard.</p>
    </Layout>
  );
};

export default Dashboard;
