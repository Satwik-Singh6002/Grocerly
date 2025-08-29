// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiUsers, FiShoppingCart, FiPieChart, 
  FiSettings, FiHelpCircle, FiSearch, FiBell,
  FiUser, FiMenu, FiX, FiBarChart2, FiDollarSign,
  FiTrendingUp, FiUserPlus, FiShoppingBag, FiAlertCircle,
  FiCheckCircle, FiBox, FiList, FiPackage, FiTruck
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Check if user is authenticated as admin
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/adminsignin');
    }
  }, [navigate]);

  // Fetch data on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const mockOrders = [
      { id: 1, customer: 'John Doe', date: '2023-05-15', amount: 125.00, status: 'Delivered' },
      { id: 2, customer: 'Jane Smith', date: '2023-05-14', amount: 89.50, status: 'Processing' },
      { id: 3, customer: 'Robert Johnson', date: '2023-05-14', amount: 210.75, status: 'Shipped' },
      { id: 4, customer: 'Emily Davis', date: '2023-05-13', amount: 56.25, status: 'Pending' },
    ];

    const mockProducts = [
      { id: 1, name: 'Basmati Rice', category: 'Rice', price: 12.99, stock: 45 },
      { id: 2, name: 'Toor Dal', category: 'Dal & Pulses', price: 8.50, stock: 32 },
      { id: 3, name: 'Wheat Flour', category: 'Atta & Flour', price: 6.75, stock: 28 },
      { id: 4, name: 'Olive Oil', category: 'Oil & Ghee', price: 15.25, stock: 18 },
    ];

    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2023-04-12', orders: 5 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2023-05-01', orders: 2 },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joined: '2023-03-22', orders: 8 },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', joined: '2023-05-10', orders: 1 },
    ];

    setOrders(mockOrders);
    setProducts(mockProducts);
    setUsers(mockUsers);
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/adminsignin');
  };

  // Stats data
  const stats = [
    { title: 'Total Users', value: '2,543', icon: <FiUsers />, color: 'bg-blue-500' },
    { title: 'Total Orders', value: '6,721', icon: <FiShoppingCart />, color: 'bg-green-500' },
    { title: 'Total Revenue', value: '$24,300', icon: <FiDollarSign />, color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: '28.5%', icon: <FiTrendingUp />, color: 'bg-yellow-500' }
  ];

  // Recent activity data
  const activities = [
    { 
      icon: <FiUserPlus />, 
      title: 'New user registered', 
      description: 'John Doe signed up for a new account',
      time: '2m ago'
    },
    { 
      icon: <FiShoppingBag />, 
      title: 'New order placed', 
      description: 'Order #4562 for $125.00 was placed',
      time: '15m ago'
    },
    { 
      icon: <FiAlertCircle />, 
      title: 'High traffic alert', 
      description: 'Website traffic increased by 28%',
      time: '1h ago'
    },
    { 
      icon: <FiCheckCircle />, 
      title: 'Server updated', 
      description: 'System maintenance completed successfully',
      time: '3h ago'
    }
  ];

  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'products', label: 'Products', icon: <FiPackage /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingCart /> },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
    { id: 'categories', label: 'Categories', icon: <FiList /> },
    { id: 'analytics', label: 'Analytics', icon: <FiPieChart /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  // Render content based on active page
  const renderContent = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-lg p-3 text-white mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                      <p className="text-gray-500">{stat.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold text-gray-800">Sales Overview</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMenu />
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Sales chart would be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold text-gray-800">Traffic Sources</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMenu />
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Traffic chart would be displayed here</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 mb-5">Recent Activity</h3>
              
              <ul>
                {activities.map((activity, index) => (
                  <li key={index} className="flex items-start py-4 border-b border-gray-100 last:border-0">
                    <div className="bg-gray-100 rounded-lg p-3 mr-4 text-blue-600">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                    </div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case 'products':
        return (
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">Products</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">${product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">Orders</h3>
              <div className="flex space-x-2">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">Users</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joined}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-5">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed md:relative z-50 w-64 bg-blue-600 text-white transition-all duration-300 ${sidebarOpen ? 'left-0' : '-left-64'} md:left-0 h-full`}>
        <div className="p-5 border-b border-blue-500">
          <div className="flex items-center">
            <FiBarChart2 className="text-2xl mr-3" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button className="ml-auto md:hidden" onClick={toggleSidebar}>
              <FiX className="text-xl" />
            </button>
          </div>
        </div>
        
        <nav className="p-3">
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${activePage === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-500">
          <button 
            className="flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleLogout}
          >
            <FiX className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button className="md:hidden" onClick={toggleSidebar}>
              <FiMenu className="text-xl" />
            </button>
            
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="relative p-2 mr-2 text-gray-500 hover:text-gray-700">
                <FiBell className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="hidden md:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{activePage}</h1>
            <div className="text-sm text-gray-500">
              Admin Panel / <span className="text-gray-700 capitalize">{activePage}</span>
            </div>
          </div>
          
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;