import { LineChart } from '@mui/x-charts';

const Home = () => {
  return (
    <div className="flex justify-between h-screen p-2 bg-gray-200 w-[75vw]">
      {/* LEFT */}
      <div className="flex flex-col w-2/3">
        <div className="flex gap-4 p-4">
          <div className="bg-white h-52 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="h-32 w-32 border-[10px] border-blue-400 rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">799</h2>
            </div>
            <h2 className="font-semibold text-xl">Products</h2>
          </div>

          <div className="bg-white h-52 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="h-32 w-32 border-[10px] border-green-800 rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">499</h2>
            </div>
            <h2 className="font-semibold text-xl">Orders</h2>
          </div>

          <div className="bg-white h-52 w-60 shadow-xl rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="h-32 w-32 border-[10px] border-pink-900 rounded-full flex items-center justify-center">
              <h2 className="font-bold text-2xl">200</h2>
            </div>
            <h2 className="font-semibold text-xl">Users</h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white m-5 p-5 rounded-lg">
          <div className="p-6 bg-white rounded-md">
            <h1 className="text-lg font-bold mb-4">Latest Transactions:</h1>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-4">Customer</th>
                  <th className="px-2 py-4">Amount</th>
                  <th className="px-2 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <th className="px-2 py-4">Muskan</th>
                  <th className="px-2 py-4">₹2999</th>
                  <th className="px-2 py-4 text-green-600">Approved</th>
                </tr>

                <tr className="border-b">
                  <th className="px-2 py-4">Bhavya</th>
                  <th className="px-2 py-4">₹1299</th>
                  <th className="px-2 py-4 text-green-600">Approved</th>
                </tr>

                <tr className="border-b">
                  <th className="px-2 py-4">Krishna</th>
                  <th className="px-2 py-4">₹699</th>
                  <th className="px-2 py-4 text-red-500">Decline</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-1/3 bg-white p-5 shadow-xl rounded-lg">
        <div className="bg-gray-50 p-5 mb-5 shadow-xl rounded-lg flex flex-col items-center">
          <h2 className="font-bold text-2xl text-green-800">
            Total Revenue: ₹5,60,000{" "}
          </h2>
        </div>

        <div className="bg-gray-50 p-5 mb-5 shadow-xl rounded-lg flex flex-col items-center">
          <h2 className="font-bold text-2xl text-red-700">Total Losses: ₹0</h2>
        </div>

        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={350}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </div>
  );
};

export default Home;
