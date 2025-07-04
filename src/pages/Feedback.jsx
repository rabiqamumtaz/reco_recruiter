import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";

const Feedback = () => {
  const stats = [
    {
      title: "Total Submissions",
      value: "0",
      subtitle: "All time",
      icon: HiOutlineDocumentReport,
      color: "text-[#78c5d8]",
    },
    {
      title: "Feedback Received",
      value: "4",
      subtitle: "From clients",
      icon: BiMessageDetail,
      color: "text-[#f0b484]",
    },
    {
      title: "Success Rate",
      value: "50%",
      subtitle: "Positive feedback",
      icon: FaChartLine,
      color: "text-[#73b386]",
    },
  ];

  const feedbackItems = [
    {
      name: "Alice Johnson",
      position: "Senior Software Engineer",
      feedback:
        "Excellent candidate! She has very strong technical skills and excellent communication skills. Please submit for additional positions.",
      date: "May 28, 2024 at 2:30 PM",
      from: "Sarah Johnson",
      status: "Positive",
    },
    {
      name: "Bob Smith",
      position: "UX Designer",
      feedback:
        "Good candidate but we are looking for someone with startup experience. Please submit candidates who are familiar with startup environments.",
      date: "May 26, 2024 at 4:15 PM",
      from: "Mike Chen",
      status: "Request for More",
    },
    {
      name: "David Wilson",
      position: "Data Scientist",
      feedback:
        "He has solid technical background and experience. We are interested in candidates with 3+ years of experience.",
      date: "May 25, 2024 at 1:30 PM",
      from: "Lisa Rodriguez",
      status: "Positive",
    },
    {
      name: "Carol Davis",
      position: "UX Designer",
      feedback:
        "Unfortunately, this candidate's portfolio doesn't align with our requirements. Please submit more qualified candidates.",
      date: "May 24, 2024 at 10:45 AM",
      from: "John Martinez",
      status: "Negative",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Positive":
        return "bg-green-100 text-green-800";
      case "Negative":
        return "bg-red-100 text-red-800";
      case "Request for More":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Feedback on Previous Submissions
        </h1>
        <p className="text-gray-600">
          Review feedback from account managers and clients on your candidate
          submissions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white text-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs sm:text-sm opacity-70 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedback */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
          <p className="text-sm text-gray-600 mb-4">
            Latest feedback from account managers and clients
          </p>

          <div className="space-y-4">
            {feedbackItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-3">{item.feedback}</p>

                <div className="flex items-center text-xs text-gray-500">
                  <span>{item.date}</span>
                  <span className="mx-2">•</span>
                  <span>From: {item.from}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Status */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Submission Status</h3>
          <p className="text-sm text-gray-600 mb-4">
            Track the status of your candidate submissions
          </p>

          <div className="space-y-4">
            <div className="text-center py-8">
              <p className="text-gray-500">No submissions yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
