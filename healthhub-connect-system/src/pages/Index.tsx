
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-health-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  HealthHub Electronic Health Record System
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline healthcare management with our comprehensive
                  electronic health record solution. Secure, efficient, and
                  patient-centered.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/login">
                  <Button className="bg-health-600 hover:bg-health-700">Get Started</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://www.myamericannurse.com/wp-content/uploads/2022/11/shutterstock_1101930905_EHRExperience-scaled.jpg"
                alt="Healthcare splash image"
                className="rounded-lg object-cover shadow-lg"
                width={550}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-health-100 px-3 py-1 text-sm text-health-800 dark:bg-health-800/20 dark:text-health-300">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Comprehensive Healthcare Management
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our electronic health record system streamlines healthcare delivery with intuitive
                features designed for each stakeholder in the healthcare process.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Patient Registration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Quickly register patients with a streamlined process that generates unique IDs for secure identification.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Appointment Scheduling</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Efficiently schedule and manage appointments with automated notifications for both patients and healthcare providers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Medical Records</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Access comprehensive medical histories, including diagnoses, treatments, and test results in a secure environment.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Diagnosis & Treatment</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Create and manage patient diagnoses and treatment plans with specialized tools for healthcare providers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Prescription Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Create, view, and manage prescriptions with dosage information and refill instructions for pharmacies.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-health-100 text-health-700 dark:bg-health-700/20 dark:text-health-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">User Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Comprehensive tools for administrators to manage user accounts, permissions, and system access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-white to-health-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-health-100 px-3 py-1 text-sm text-health-800 dark:bg-health-800/20 dark:text-health-300">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Trusted by Healthcare Professionals
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Don't just take our word for it. See what healthcare professionals have to say about HealthHub.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-6 py-12 md:max-w-4xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
            <div className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://source.unsplash.com/KjFHeSH49Vs"
                  width={40}
                  height={40}
                  alt="Dr. Sarah Johnson"
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Primary Care Physician
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "HealthHub has completely transformed my practice. The intuitive interface and comprehensive record management make patient care more efficient and accurate."
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://source.unsplash.com/QrEKG7_TGBE"
                  width={40}
                  height={40}
                  alt="James Wilson"
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">James Wilson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hospital Administrator
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "The administrative features in HealthHub have streamlined our operations significantly. User management and reporting tools are particularly valuable for our multi-department setup."
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://source.unsplash.com/jgYCXR7MNgk"
                  width={40}
                  height={40}
                  alt="Dr. Michelle Lee"
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">Dr. Michelle Lee</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Specialist Cardiologist
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "As a specialist, I need detailed patient histories and test results. HealthHub delivers with comprehensive records and an excellent referral system that ensures continuity of care."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Healthcare Management?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of healthcare providers who trust HealthHub for their electronic health record needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/login">
                <Button className="bg-health-600 hover:bg-health-700">Get Started Today</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
