export default function OverviewPage() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300">Total Users</h3>
            <p className="text-3xl font-bold text-white">1,234</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300">Total Products</h3>
            <p className="text-3xl font-bold text-white">567</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300">Total Orders</h3>
            <p className="text-3xl font-bold text-white">890</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300">Revenue</h3>
            <p className="text-3xl font-bold text-white">$12,345</p>
          </div>
        </div>
      </div>
    )
  } 