import AdminLinks from "@/components/AdminLinks";
import Layout from "@/components/Layout";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Link from "next/link";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales For 2023",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <AdminLinks />
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Dashboard</h1>
          {/* ADD LOADIN & ERROR */}

          <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="card m-5 p-5">
                <p className="text-3xl">$5000 </p>
                <p>Sales</p>
                <Link href="/admin/orders">View sales</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">10000 </p>
                <p>Orders</p>
                <Link href="/admin/orders">View orders</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">10000 </p>
                <p>Products</p>
                <Link href="/admin/products">View products</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">10000 </p>
                <p>Users</p>
                <Link href="/admin/users">View users</Link>
              </div>
            </div>
            <h2 className="text-xl">Sales Report</h2>
            {/* Chart  */}
            <Bar
              options={{
                responsive: true,
                legend: { display: true, position: "right" },
              }}
              data={data}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
Dashboard.auth = { adminOnly: true };

export default Dashboard;
