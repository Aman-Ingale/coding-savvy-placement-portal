"use client";

export default function StudentProfileView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#1e40af] to-[#38bdf8] flex items-center justify-center p-6">

      <div className="bg-[#0b1220] w-full max-w-sm h-[650px] p-8 rounded-3xl shadow-2xl border border-blue-500/20 flex flex-col items-center space-y-6">

        <img
          src="https://i.pravatar.cc/150?img=32"
          className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-xl"
        />

        <h2 className="text-2xl font-bold text-white">John Doe</h2>
        <p className="text-blue-400 text-sm">Computer Science Student</p>
        <p className="text-blue-300 text-sm">john@gmail.com</p>

        <div className="w-full h-[1px] bg-blue-500/20 my-2"></div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Skills</h3>

          <div className="flex flex-wrap justify-center gap-2">
            {["React", "Node.js", "Python", "SQL", "Tailwind"].map((skill) => (
              <span
                key={skill}
                className="bg-[#1e40af] px-3 py-1 rounded-full text-xs font-semibold text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col gap-3 w-full">
          <button className="bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold w-full">
            Download Resume
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold w-full">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
}
