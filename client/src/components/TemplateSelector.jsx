export default function TemplateSelector({
  template,
  setTemplate,
}) {
  const templates = [
    {
      id: "modern",
      title: "Modern",
      color: "bg-blue-600",
    },
    {
      id: "classic",
      title: "Classic",
      color: "bg-gray-800",
    },
    {
      id: "creative",
      title: "Creative",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Choose Resume Template
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Select a design layout to preview your content
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((item) => {
          const isSelected = template === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setTemplate(item.id)}
              className={`
                group relative cursor-pointer rounded-2xl border-2 transition-all duration-300 transform overflow-hidden bg-white
                ${
                  isSelected
                    ? "border-blue-600 ring-4 ring-blue-500/10 shadow-xl -translate-y-1"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                }
              `}
            >
              {/* Selected Badge Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white rounded-full p-1 shadow-md">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Enhanced Visual Thumbnail with Mini Resume Content */}
              <div className="bg-slate-100 h-60 p-3 border-b border-slate-100 relative overflow-hidden flex flex-col justify-between select-none">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 h-full flex flex-col justify-between text-[8px] leading-tight transition-transform duration-300 group-hover:scale-[1.02]">
                  
                  {/* --- MODERN LAYOUT --- */}
                  {item.id === "modern" && (
                    <div className="h-full flex flex-col justify-between">
                      {/* Header */}
                      <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                        <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-[9px]`}>
                          JD
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[10px]">John Doe</p>
                          <p className="text-blue-600 text-[8px]">Software Engineer</p>
                        </div>
                      </div>
                      
                      {/* Body */}
                      <div className="grid grid-cols-3 gap-2 my-2 flex-1">
                        <div className="col-span-1 bg-slate-50 p-1.5 rounded space-y-1">
                          <p className="font-bold text-slate-700 text-[7px]">CONTACT</p>
                          <p className="text-slate-400">john@email.com</p>
                          <p className="text-slate-400">+1 234 567</p>
                          <p className="font-bold text-slate-700 text-[7px] pt-1">SKILLS</p>
                          <div className="flex flex-wrap gap-0.5">
                            <span className="bg-blue-100 text-blue-700 px-1 rounded text-[6px]">React</span>
                            <span className="bg-blue-100 text-blue-700 px-1 rounded text-[6px]">Node</span>
                          </div>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                          <p className="font-bold text-slate-700 text-[7px]">EXPERIENCE</p>
                          <div>
                            <p className="font-semibold text-slate-800">Senior Developer</p>
                            <p className="text-slate-400">Tech Corp • 2021 - Present</p>
                            <p className="text-slate-500 line-clamp-2 mt-0.5">Built scalable web apps and led team of 5 engineers...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- CLASSIC LAYOUT --- */}
                  {item.id === "classic" && (
                    <div className="h-full flex flex-col justify-between text-center">
                      {/* Centered Header */}
                      <div className="border-b border-slate-200 pb-1.5">
                        <p className="font-serif font-bold text-slate-900 text-[11px] uppercase tracking-wider">John Doe</p>
                        <p className="text-slate-500 font-serif text-[8px] italic">john@email.com • +1 234 567 • New York, NY</p>
                      </div>

                      {/* Sections */}
                      <div className="text-left space-y-2 my-1 flex-1">
                        <div>
                          <p className="font-serif font-bold text-slate-800 border-b border-slate-200 text-[7px] uppercase tracking-wider mb-1">
                            Professional Summary
                          </p>
                          <p className="text-slate-600 line-clamp-2 text-[7.5px]">
                            Experienced software engineer with 5+ years of experience in full-stack web development...
                          </p>
                        </div>
                        <div>
                          <p className="font-serif font-bold text-slate-800 border-b border-slate-200 text-[7px] uppercase tracking-wider mb-1">
                            Experience
                          </p>
                          <div className="flex justify-between font-semibold text-slate-800 text-[8px]">
                            <span>Lead Full Stack Engineer</span>
                            <span className="text-slate-400 text-[7px]">2020 - Present</span>
                          </div>
                          <p className="text-slate-500 line-clamp-2">Architected high-throughput microservices using Node.js...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- CREATIVE LAYOUT --- */}
                  {item.id === "creative" && (
                    <div className="h-full flex gap-2">
                      {/* Sidebar Banner */}
                      <div className={`${item.color} w-1/3 text-white p-1.5 rounded-l flex flex-col justify-between`}>
                        <div>
                          <div className="w-6 h-6 rounded-full bg-white/20 mx-auto mb-1 flex items-center justify-center font-bold text-[8px]">
                            JD
                          </div>
                          <p className="font-bold text-[9px] text-center">John Doe</p>
                          <p className="text-[7px] text-purple-200 text-center">Designer</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-[6px] text-purple-200 uppercase">Skills</p>
                          <p className="text-[6.5px]">UI/UX Design</p>
                          <p className="text-[6.5px]">Figma • Tailwind</p>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="w-2/3 p-1 flex flex-col justify-between text-left">
                        <div>
                          <p className="font-bold text-purple-900 text-[8px] uppercase tracking-wider mb-1">
                            About Me
                          </p>
                          <p className="text-slate-600 line-clamp-2 text-[7.5px]">
                            Passionate designer creating intuitive visual experiences and modern interfaces...
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-purple-900 text-[8px] uppercase tracking-wider mb-1">
                            Projects
                          </p>
                          <p className="font-semibold text-slate-800">E-Commerce Redesign</p>
                          <p className="text-slate-500 line-clamp-2">Increased user conversion by 25% with new UI flow...</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Template
                  </span>
                </div>

                <button
                  type="button"
                  className={`
                    mt-3.5 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                    ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                        : "bg-slate-900 text-slate-100 hover:bg-slate-800"
                    }
                  `}
                >
                  {isSelected ? (
                    <span>✓ Selected</span>
                  ) : (
                    <span>Select Template</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}