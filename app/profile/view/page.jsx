export default function ProfileViewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#1e293b] flex items-center justify-center px-6">

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div className="bg-[#111827] rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-900">

          
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            A
          </div>

          
          <h2 className="text-white text-xl font-semibold mt-4">Aviraj Sharma</h2>
          <p className="text-blue-400 text-sm">Computer Science</p>

          
          <div className="mt-4 text-sm text-gray-300 text-center space-y-1">
            <p><span className="text-gray-400">College:</span> IIT Dhanbad</p>
            <p><span className="text-gray-400">Email:</span> avirajsharma@gmail.com</p>
          </div>

          
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Edit Profile
          </button>
        </div>

        
        <div className="md:col-span-2 flex flex-col gap-6">

          
          <div className="bg-[#111827] p-6 rounded-xl shadow-xl border border-blue-900">
            <h3 className="text-white font-semibold text-lg mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Tailwind"].map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          
          <div className="bg-[#111827] p-6 rounded-xl shadow-xl border border-blue-900 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Resume</h3>
              <p className="text-gray-400 text-sm">My Resume (PDF)</p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
              View
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
