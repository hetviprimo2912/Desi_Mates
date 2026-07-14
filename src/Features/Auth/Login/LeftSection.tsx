
import {
  UsersIcon,
  ChartBarIcon,

} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Smart User Management",
    description:
      "Manage users, profiles and platform activities from one place.",
    icon: <UsersIcon className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "Community Insights",
    description:
      "Track growth, engagement and analytics with real-time insights.",
    icon: <ChartBarIcon className="w-6 h-6 text-[#2563EB]" />,
  },
  // {
  //   title: "Secure & Reliable",
  //   description:
  //     "Enterprise-grade security to protect your data and platform.",
  //   icon: <ShieldCheckIcon className="w-6 h-6 text-[#2563EB]" />,
  // },
];

const LeftSection = () => {
  return (
    <div className="hidden lg:flex flex-col w-full lg:w-[38%] xl:w-[36%] bg-[linear-gradient(270deg,#E2E8F8_0%,#F3F6FD_40%,#FFFFFF_100%)] lg:p-8 xl:p-12 border-r border-gray-100 overflow-hidden h-screen relative">

      {/* Content */}
      <div className="z-10 max-w-md mx-auto w-full flex-1 flex flex-col pb-[35%]">

        {/* Logo */}
        <div className="mb-10 mt-4">

          <img
            src="/logo/logo.png"
            alt="DesiMates"
            className="h-20 w-auto object-contain"
          />

          <p className="text-sm text-gray-500 mt-3 ml-1">
            Admin Dashboard
          </p>

        </div>

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-[38px] font-extrabold text-gray-900 leading-tight">

            Connect.
            <br />

            <span className="text-[#2563EB]">
              Match. Grow Together.
            </span>

          </h1>

          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Manage users, communities and platform operations
            from one powerful dashboard.
          </p>

        </div>

        {/* Features */}

        <div className="space-y-6">

          {features.map((feature, index) => (

            <div
              key={index}
              className="flex gap-5 items-start"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">

                {feature.icon}

              </div>

              <div>

                <h3 className="font-bold text-gray-900 text-lg">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-6">
                  {feature.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Illustration */}

      <div className="absolute bottom-0 left-0 w-full h-[34%] overflow-hidden">

        {/* Background Circle */}

        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-100 opacity-70" />

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-blue-200 opacity-40" />

        {/* Laptop Mockup */}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

          <div className="w-[280px] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">

            {/* Browser */}

            <div className="h-8 bg-gray-100 flex items-center gap-2 px-3">

              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>

            </div>

            {/* Screen */}

            <div className="p-5">

              <div className="h-3 bg-blue-500 rounded w-28 mb-5"></div>

              <div className="space-y-3">

                <div className="h-3 rounded bg-gray-200"></div>

                <div className="h-3 rounded bg-gray-200 w-5/6"></div>

                <div className="h-3 rounded bg-gray-200 w-2/3"></div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <div className="h-16 rounded-xl bg-blue-100"></div>

                <div className="h-16 rounded-xl bg-blue-50"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LeftSection;